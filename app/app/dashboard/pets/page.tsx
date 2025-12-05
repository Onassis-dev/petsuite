"use client";

import { useFilter } from "@/hooks/use-filter";
import { usePagination } from "@/hooks/use-pagination";
import { api, get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import PaginationMenu from "@/components/PaginationMenu";
import { OptionsGrid } from "@/components/ui/grids";
import { SearchInput } from "@/components/ui/search-input";
import { CrudTable } from "@/components/CrudTable";
import { useSelectedRow } from "@/hooks/use-selected-row";
import { useState } from "react";
import DeleteDialog from "@/components/DeleteDialog";
import { useI18n } from "@/hooks/use-i18n";
import { PetsForm } from "./PetsForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const t = useI18n({
    name: {
      es: "Nombre",
      en: "Name",
    },
    species: {
      es: "Especie",
      en: "Species",
    },
    sex: {
      es: "Sexo",
      en: "Sex",
    },
    deleteTitle: {
      es: "Eliminar mascota",
      en: "Delete Pet",
    },
    deleteText: {
      es: "¿Estás seguro de querer eliminar esta mascota?",
      en: "Are you sure you want to delete this pet?",
    },
    deleteSuccessMessage: {
      es: "Mascota eliminada correctamente",
      en: "Pet deleted successfully",
    },
  });

  const { page, setPage } = usePagination();
  const { filter, setFilter, debouncedFilter } = useFilter(() => setPage(1));
  const { selectedRow, setSelectedRow } = useSelectedRow();
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  const { data, status } = useQuery({
    queryKey: ["pets", debouncedFilter, page],
    queryFn: () =>
      get(
        api.pets.$get({
          query: { name: debouncedFilter, page: String(page) },
        })
      ),
  });

  return (
    <>
      <OptionsGrid>
        <SearchInput
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <PetsForm />
      </OptionsGrid>

      <CrudTable
        onRowClick={(row) => {
          router.push(`/dashboard/pets/${row.id}`);
        }}
        rows={data?.rows}
        status={status}
        columns={[
          { key: "name", title: t("name") },
          { key: "species", title: t("species"), hide: true },
          { key: "sex", title: t("sex"), hide: true },
        ]}
        selectRow={setSelectedRow}
        setOpenDelete={setOpenDelete}
      />

      <PaginationMenu
        page={Number(page)}
        setPage={setPage}
        count={data?.count}
      />

      <DeleteDialog
        title={t("deleteTitle")}
        action="delete"
        text={t("deleteText")}
        open={openDelete}
        setOpen={setOpenDelete}
        queryKey="pets"
        deleteFunction={() =>
          get(api.pets.$delete({ json: { id: Number(selectedRow?.id) } }))
        }
        successMessage={t("deleteSuccessMessage")}
      />
    </>
  );
}
