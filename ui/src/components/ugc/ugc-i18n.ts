import { Lang } from "./types";

const texts = {
  all: {
    es: "Todos",
    en: "All",
  },
  dog: {
    es: "Perros",
    en: "Dogs",
  },
  cat: {
    es: "Gatos",
    en: "Cats",
  },
  previous: {
    es: "Anterior",
    en: "Previous",
  },
  next: {
    es: "Siguiente",
    en: "Next",
  },
  other: {
    es: "Otros",
    en: "Others",
  },
  noImage: {
    es: "Sin imagen",
    en: "No image",
  },
  male: {
    es: "Macho",
    en: "Male",
  },
  female: {
    es: "Hembra",
    en: "Female",
  },
  loading: {
    es: "Cargando...",
    en: "Loading...",
  },
  noPetsFound: {
    es: "No se encontraron mascotas",
    en: "No pets found",
  },
} as const satisfies Record<string, Record<Lang, string>>;

export const ugcI18n = (language: Lang) => {
  return (key: keyof typeof texts) => texts[key]?.[language];
};
