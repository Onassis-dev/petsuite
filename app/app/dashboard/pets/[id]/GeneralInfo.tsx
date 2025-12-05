import { useParams } from "next/navigation";
import { api, get } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { petGeneralInfoSchema } from "@server/routes/pets/pets.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { showSuccess } from "@/lib/toast";
import { useI18n, useLanguage } from "@/hooks/use-i18n";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/DatePicker";
import { SubmitButton } from "@/components/ui/custom-buttons";
import { useEffect } from "react";

export const GeneralInfo = () => {
  const { language } = useLanguage();
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
    savedInfo: {
      es: "Información guardada",
      en: "Info saved",
    },
    dog: {
      es: "Perro",
      en: "Dog",
    },
    cat: {
      es: "Gato",
      en: "Cat",
    },
    other: {
      es: "Otro",
      en: "Other",
    },
    male: {
      es: "Macho",
      en: "Male",
    },
    female: {
      es: "Hembra",
      en: "Female",
    },
    unknown: {
      es: "Desconocido",
      en: "Unknown",
    },
    admissionDate: {
      es: "Fecha de ingreso",
      en: "Admission date",
    },
    saveChanges: {
      es: "Guardar cambios",
      en: "Save changes",
    },
  });
  const { id } = useParams();
  const client = useQueryClient();

  const petsForm = useForm<z.infer<typeof petGeneralInfoSchema>>({
    resolver: zodResolver(petGeneralInfoSchema),
    defaultValues: {
      id: 0,
      name: "",
      species: undefined,
      sex: undefined,
      admissionDate: "",
    },
  });

  const { data, status } = useQuery({
    queryKey: ["pets", "general", id],
    queryFn: () => get(api.pets.general.$get({ query: { id: String(id) } })),
  });

  useEffect(() => {
    if (data) petsForm.reset(data);
  }, [data, petsForm]);

  const { mutate, isPending } = useMutation({
    mutationFn: async function sendData(
      values: z.infer<typeof petGeneralInfoSchema>
    ) {
      await get(api.pets.general.$put({ json: values }));
      showSuccess(t("savedInfo"));
      client.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const submit = petsForm.handleSubmit(
    (values: z.infer<typeof petGeneralInfoSchema>) => mutate(values)
  );

  return (
    <Form {...petsForm}>
      <form onSubmit={submit}>
        <FormField
          control={petsForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={petsForm.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("species")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dog">{t("dog")}</SelectItem>
                  <SelectItem value="cat">{t("cat")}</SelectItem>
                  <SelectItem value="other">{t("other")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={petsForm.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("sex")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">{t("male")}</SelectItem>
                  <SelectItem value="female">{t("female")}</SelectItem>
                  <SelectItem value="unknown">{t("unknown")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={petsForm.control}
          name="admissionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("admissionDate")}</FormLabel>
              <FormControl>
                <DatePicker field={field} locale={language} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton disabled={isPending}>{t("saveChanges")}</SubmitButton>
      </form>
    </Form>
  );
};
