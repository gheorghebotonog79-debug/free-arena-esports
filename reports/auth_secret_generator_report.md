# Auth Secret Generator Report

Date: 2026-05-22

## Implemented

- Added `scripts/generate-auth-secret.mjs`.
- Added `npm run auth:generate-secret`.
- Updated the launch checklist with the auth secret generation step.

## Usage

Generate an `AUTH_SECRET` for Vercel or private local env:

```bash
npm run auth:generate-secret
```

Generate only the raw secret:

```bash
npm run auth:generate-secret -- --plain
```

Validate the generator without printing a real secret:

```bash
npm run auth:generate-secret -- --check
```

## Safety

- The script does not write secrets to disk.
- Generated values must not be committed.
- Use the generated value only in Vercel ENV or a private local env file.
