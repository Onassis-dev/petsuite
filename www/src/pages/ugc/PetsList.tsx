import { useEffect, useState } from "react";
import {
  buttonColor,
  buttonStyle,
  cardStyle,
  listStyle,
} from "./[slug]/styles";

interface Props {
  slug: string;
  locale: string;
  apiOrigin: string;
  style: string;
  color: string;
}

interface Pet {
  id: string;
  name: string;
  image: string | null;
  sex: string;
  count: number;
}

export const PetsList = ({ slug, locale, apiOrigin, style, color }: Props) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [species, setSpecies] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 18;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          slug,
          page: String(page),
        });
        if (species) {
          params.append("species", species);
        }

        const response = await fetch(`${apiOrigin}/public/pets?${params}`);
        if (response.ok) {
          const data = await response.json();
          setPets(data);
          if (data.length > 0) {
            setTotalCount(data[0].count);
          } else {
            setTotalCount(0);
          }
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [slug, page, species, apiOrigin]);

  const handleSpeciesFilter = (selectedSpecies: string | null) => {
    setSpecies(selectedSpecies);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const speciesOptions = ["dog", "cat", "other"];

  return (
    <section>
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleSpeciesFilter(null)}
          className={`
            ${buttonStyle(style)} ${species === null && buttonColor(color)}`}
        >
          Todas
        </button>
        {speciesOptions.map((spec) => (
          <button
            key={spec}
            onClick={() => handleSpeciesFilter(spec)}
            className={`
            ${buttonStyle(style)} ${species === spec && buttonColor(color)}`}
          >
            {spec === "dog" ? "Perros" : spec === "cat" ? "Gatos" : "Otros"}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Cargando mascotas...</div>
        </div>
      )}

      {/* No pets found */}
      {!loading && pets.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No se encontraron mascotas
        </div>
      )}

      {/* Pets Grid */}
      {!loading && pets.length > 0 && (
        <>
          <div className={listStyle(style)}>
            {pets.map((pet) => (
              <div key={pet.id} className={cardStyle(style)}>
                {pet.image ? (
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full aspect-4/3 object-cover"
                  />
                ) : (
                  <div className="w-full aspect-4/3 bg-gray-200 flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{pet.name}</h3>
                  <p className="text-sm text-gray-600">
                    {pet.sex === "male"
                      ? "Macho"
                      : pet.sex === "female"
                        ? "Hembra"
                        : pet.sex}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Anterior
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => {
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      page === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (pageNum === page - 2 || pageNum === page + 2) {
                return (
                  <span key={pageNum} className="px-2 py-2 text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            }
          )}
        </div>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};
