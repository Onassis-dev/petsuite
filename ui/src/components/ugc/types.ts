export type StylesTypes = "modern" | "minimalist" | "friendly";

export type Lang = "es" | "en";

export type Website = {
  title: string;
  description: string;
  image: string;
  lang: Lang;
  style: StylesTypes;
  color: string;
};
