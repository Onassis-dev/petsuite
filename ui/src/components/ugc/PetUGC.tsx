import { listedInformationStyle, iconColor } from "./styles";
import { LayoutUGC } from "./LayoutUGC";
import { ugcI18n } from "./ugc-i18n";
import { Website } from "./types";
import { Calendar, Mars, Ruler, Scale } from "lucide-react";

interface Props {
  website: Website;
  pet: Pet;
}

interface Pet {
  id: string;
  name: string;
  image: string | null;
  images?: string[];
  description: string | null;
  species: string;
  sex: string;
  bornDate: string;
  weight: number;
  size: string;
  measurement: string;
}

export const PetUGC = ({ website, pet }: Props) => {
  const t = ugcI18n(website.lang);

  return (
    <LayoutUGC website={website}>
      <>
        <header></header>

        <main className="w-full max-w-xl mx-auto px-4 py-16">
          <section className="flex items-center gap-4 pb-5 flex-col sm:flex-row">
            <img
              src={pet?.image || "no Image"}
              alt={pet.name}
              className="size-40 aspect-square object-cover rounded-full "
            />
            <h1 className="text-3xl font-bold">{pet.name}</h1>
          </section>

          {/* Listed information */}
          <section className="grid grid-cols-2 gap-3 pt-5">
            <div className={listedInformationStyle(website.style)}>
              <Calendar className={iconColor(website.color)} />
              <div className="flex flex-col">
                <span className="text-sm text-neutral-500 font-medium">
                  Edad
                </span>
                <span>{pet.bornDate}</span>
              </div>
            </div>
            <div className={listedInformationStyle(website.style)}>
              <Scale className={iconColor(website.color)} />
              <div className="flex flex-col">
                <span className="text-sm text-neutral-500 font-medium">
                  Peso
                </span>
                <span>
                  {pet.weight} {pet.measurement}
                </span>
              </div>
            </div>
            <div className={listedInformationStyle(website.style)}>
              <Mars className={iconColor(website.color)} />
              <div className="flex flex-col">
                <span className="text-sm text-neutral-500 font-medium">
                  Sexo
                </span>
                <span>{pet.sex}</span>
              </div>
            </div>
            <div className={listedInformationStyle(website.style)}>
              <Ruler className={iconColor(website.color)} />
              <div className="flex flex-col">
                <span className="text-sm text-neutral-500 font-medium">
                  Tamaño
                </span>
                <span>{pet.size}</span>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="mt-10 ">
            <h2 className="text-xl font-bold">Sobre {pet.name}</h2>
            <p className="mt-2">{pet.description}</p>
          </section>

          {/* Gallery */}
          {pet.images && pet.images.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold mb-4">Galería</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {pet.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        <footer></footer>
      </>
    </LayoutUGC>
  );
};
