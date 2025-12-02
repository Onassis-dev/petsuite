import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/hooks/use-i18n";

export const SearchInput = ({
  className,
  value,
  onChange,
}: React.ComponentProps<"input">) => {
  const t = useI18n({
    search: {
      es: "Buscar",
      en: "Search",
    },
  });

  return (
    <div className="relative w-full sm:max-w-56 h-full">
      <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
      <Input
        placeholder={t("search")}
        type={"search"}
        className={cn("pl-8 h-9 w-full", className)}
        value={value}
        onChange={(e) => onChange?.(e)}
      />
    </div>
  );
};

SearchInput.displayName = "SearchInput";
