import { ChevronsUpDown } from "lucide-react";
import { Button } from "@workspace/ui/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/ui/popover";
import { useState } from "react";
import { useLanguage } from "@/hooks/use-i18n";

const countries = [
  { flag: "🇲🇽", es: "México", en: "Mexico", code: "MX", dial: "+52" },
  {
    flag: "🇺🇸",
    es: "Estados Unidos",
    en: "United States",
    code: "US",
    dial: "+1",
  },
  {
    flag: "🇦🇷",
    es: "Argentina",
    en: "Argentina",
    code: "AR",
    dial: "+54",
  },
  {
    flag: "🇨🇱",
    es: "Chile",
    en: "Chile",
    code: "CL",
    dial: "+56",
  },
  {
    flag: "🇨🇴",
    es: "Colombia",
    en: "Colombia",
    code: "CO",
    dial: "+57",
  },
  { flag: "🇵🇪", es: "Perú", en: "Peru", code: "PE", dial: "+51" },
  {
    flag: "🇻🇪",
    es: "Venezuela",
    en: "Venezuela",
    code: "VE",
    dial: "+58",
  },
  {
    flag: "🇪🇸",
    es: "España",
    en: "Spain",
    code: "ES",
    dial: "+34",
  },
  {
    flag: "🇬🇧",
    es: "Reino Unido",
    en: "United Kingdom",
    code: "GB",
    dial: "+44",
  },
  {
    flag: "🇨🇦",
    es: "Canadá",
    en: "Canada",
    code: "CA",
    dial: "+1",
  },
  {
    flag: "🇦🇺",
    es: "Australia",
    en: "Australia",
    code: "AU",
    dial: "+61",
  },
  {
    flag: "🇳🇿",
    es: "Nueva Zelanda",
    en: "New Zealand",
    code: "NZ",
    dial: "+64",
  },
];

const PhoneInput = ({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={className}
        >
          {value}
          <ChevronsUpDown className="opacity-50 size-3.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Seleccionar país..." className="h-9" />
          <CommandList>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.dial}
                  keywords={[
                    country.es.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    country.en.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    country.dial,
                  ]}
                  onSelect={(currentValue: string) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <span className="mr-1">{country.flag}</span>
                  {language === "es" ? country.es : country.en}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {country.dial}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PhoneInput;
