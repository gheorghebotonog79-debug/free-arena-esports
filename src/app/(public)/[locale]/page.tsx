import { setRequestLocale } from "next-intl/server";
import { ExactWarRoom } from "@/components/home/ExactWarRoom";

export const revalidate = 60;

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ExactWarRoom />
  );
}
