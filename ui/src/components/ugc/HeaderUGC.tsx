import { ChevronLeft } from "lucide-react";
import { ugcI18n } from "./ugc-i18n";
import { Website } from "./types";

interface Props {
  website: Website;
  slug: string;
}

export const HeaderUGC = ({ website, slug }: Props) => {
  const t = ugcI18n(website.lang);

  return (
    <header className="w-full sticky top-0 bg-background border-b z-10">
      <div className="flex items-center max-w-xl mx-auto px-4 py-3 justify-center relative">
        <a href={`/ugc/${slug}`} className="cursor-pointer absolute left-4">
          <ChevronLeft />
        </a>
        <h1 className="text-xl font-bold px-6 overflow-hidden text-ellipsis whitespace-nowrap">
          {website.title}
        </h1>
      </div>
    </header>
  );
};
