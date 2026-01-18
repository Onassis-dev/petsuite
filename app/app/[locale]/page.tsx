import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "./Header";
import { serverI18n } from "@/lib/i18n-server";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  if (locale !== "es" && locale !== "en") {
    redirect("/");
  }

  const t = serverI18n(locale, {
    title: {
      es: "La plataforma #1 para refugios de animales",
      en: "The #1 platform for animal shelters",
    },
    description: {
      es: "Gestiona y publica a todos tus animales sin costo alguno.",
      en: "Manage and publish all your animals without any cost.",
    },
    getStarted: {
      es: "Comienza gratis",
      en: "Get started for free",
    },
    stillHaveQuestions: {
      es: "¿Aún tienes preguntas?",
      en: "Still have questions?",
    },
    cantFindAnswer: {
      es: "¿No encuentras la respuesta que buscas? Habla con nuestro equipo.",
      en: "Can't find the answer you're looking for? Please chat to our friendly team.",
    },
    getInTouch: {
      es: "Contáctanos",
      en: "Get in touch",
    },
    madeInMexico: {
      es: "Hecho en México",
      en: "Made in Mexico",
    },
    signIn: {
      es: "Iniciar sesión",
      en: "Sign in",
    },
    start: {
      es: "Comenzar",
      en: "Get started",
    },
  });

  return (
    <html>
      <body className={manrope.className}>
        <Header signInText={t("signIn")} startText={t("start")} />
        <main className="pt-20">
          <section className="flex flex-col max-w-5xl mx-auto mt-28 text-center items-center">
            <h1 className="text-6xl font-bold leading-tight max-w-2xl">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-xl">
              {t("description")}
            </p>
            <Button className="mt-7" size="lg" asChild>
              <Link href="/signup">{t("getStarted")}</Link>
            </Button>

            <img
              src="/hero.png"
              alt="Capupet"
              className="w-full border-8 min-h-[500px] rounded-3xl mt-16"
            />
          </section>

          <section className="flex flex-col max-w-5xl mx-auto mt-28 text-center items-center">
            <div className="bg-secondary rounded-3xl py-16 px-8 w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold">{t("stillHaveQuestions")}</h2>
              <p className="text-muted-foreground mt-2">
                {t("cantFindAnswer")}
              </p>
              <Button className="mt-6" size="lg">
                {t("getInTouch")}
              </Button>
            </div>
          </section>
        </main>

        <footer className="bg-foreground w-full py-10 mt-20 text-background items-center">
          <div className="max-w-5xl w-full mx-auto flex justify-between gap-2">
            <span className="font-semibold text-2xl">Capupet</span>
            <span className="flex items-center gap-2 font-semibold">
              <img src="/icons/mx.svg" className="h-5" alt="Mexico" />
              {t("madeInMexico")}
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
