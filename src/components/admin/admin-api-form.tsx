"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type AdminApiFormField = {
  defaultValue?: string | number | boolean;
  helper?: string;
  label: string;
  max?: number;
  min?: number;
  name: string;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  step?: number | string;
  type: "checkbox" | "datetime-local" | "json" | "number" | "select" | "text" | "textarea";
};

type AdminApiFormProps = {
  endpoint: string;
  fields: AdminApiFormField[];
  submitLabel: string;
  successMessage: string;
};

function parseFieldValue(field: AdminApiFormField, formData: FormData) {
  if (field.type === "checkbox") {
    return formData.get(field.name) === "on";
  }

  const value = formData.get(field.name);

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  if (field.type === "number") {
    return Number(trimmed);
  }

  if (field.type === "datetime-local") {
    return new Date(trimmed).toISOString();
  }

  if (field.type === "json") {
    return JSON.parse(trimmed) as unknown;
  }

  return trimmed;
}

function renderField(field: AdminApiFormField) {
  const baseClass =
    "w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-zinc-600 focus:border-red-300/50 focus:bg-black/55 focus:ring-4 focus:ring-red-500/10";

  if (field.type === "checkbox") {
    return (
      <label
        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
        key={field.name}
      >
        <input
          className="mt-1 h-4 w-4 rounded border-white/20 bg-black accent-red-500"
          defaultChecked={Boolean(field.defaultValue)}
          name={field.name}
          type="checkbox"
        />
        <span>
          <span className="block text-xs font-black uppercase tracking-[0.18em] text-zinc-400">
            {field.label}
          </span>
          {field.helper ? (
            <span className="mt-1 block text-xs leading-5 text-zinc-500">{field.helper}</span>
          ) : null}
        </span>
      </label>
    );
  }

  return (
    <label className="block" key={field.name}>
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {field.label}
      </span>
      {field.type === "textarea" || field.type === "json" ? (
        <textarea
          className={`${baseClass} min-h-28 resize-y font-mono`}
          defaultValue={typeof field.defaultValue === "string" ? field.defaultValue : ""}
          name={field.name}
          placeholder={field.placeholder}
          required={field.required}
          rows={field.rows ?? 5}
        />
      ) : field.type === "select" ? (
        <select
          className={baseClass}
          defaultValue={typeof field.defaultValue === "string" ? field.defaultValue : ""}
          name={field.name}
          required={field.required}
        >
          {field.options?.map((option) => (
            <option className="bg-zinc-950 text-white" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={baseClass}
          defaultValue={
            typeof field.defaultValue === "string" || typeof field.defaultValue === "number"
              ? field.defaultValue
              : ""
          }
          max={field.max}
          min={field.min}
          name={field.name}
          placeholder={field.placeholder}
          required={field.required}
          step={field.step}
          type={field.type}
        />
      )}
      {field.helper ? (
        <span className="mt-2 block text-xs leading-5 text-zinc-500">{field.helper}</span>
      ) : null}
    </label>
  );
}

export function AdminApiForm({
  endpoint,
  fields,
  submitLabel,
  successMessage,
}: AdminApiFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(
        fields
          .map((field) => [field.name, parseFieldValue(field, formData)] as const)
          .filter(([, value]) => value !== undefined),
      );

      const response = await fetch(endpoint, {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = (await response.json().catch(() => null)) as
        | { details?: string[]; error?: string; ok?: boolean }
        | null;

      if (!response.ok || !result?.ok) {
        setError(result?.details?.join(" ") || result?.error || "Operatiunea nu a reusit.");
        return;
      }

      formRef.current?.reset();
      setMessage(successMessage);
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Operatiunea nu a reusit.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} ref={formRef}>
      <div className="grid gap-5 lg:grid-cols-2">{fields.map(renderField)}</div>

      {error ? (
        <div className="rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-100">
          {message}
        </div>
      ) : null}

      <button
        className="rounded-2xl border border-red-200/20 bg-red-500 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_18px_55px_rgba(239,68,68,0.24)] transition hover:bg-red-400 hover:shadow-[0_24px_70px_rgba(239,68,68,0.34)] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Se salveaza..." : submitLabel}
      </button>
    </form>
  );
}
