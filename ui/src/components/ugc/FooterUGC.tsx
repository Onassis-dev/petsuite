import { ugcI18n } from "./ugc-i18n";
import { Website } from "./types";

interface Props {
  website: Website;
  slug: string;
}

export const FooterUGC = ({ website, slug }: Props) => {
  const t = ugcI18n(website.lang);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t mt-auto">
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center text-sm text-neutral-600">
          <p>
            © {currentYear} {website.title}
          </p>
          <a
            href={`/ugc/${slug}`}
            className="text-neutral-600 hover:text-neutral-900 transition-colors underline underline-offset-4"
          >
            {t("back")}
          </a>
        </div>
      </div>
    </footer>
  );
};
