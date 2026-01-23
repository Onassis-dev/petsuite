import { api, get } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useI18n } from "@/hooks/use-i18n";
import { SubmitButton } from "@/components/custom-buttons";
import { changeUrlSchema } from "@server/routes/websites/websites.schema";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/ui/input-group";

export const CreateWebsite = () => {
  const t = useI18n({
    saveChanges: {
      es: "Guardar",
      en: "Save",
    },
    slugDescription: {
      es: "Elige un slug para comenzar a usar tu sitio web. Debe ser conciso y no usar espacios, este sera el slug publico de tu sitio web.",
      en: "Choose a slug to start using your website. It must be concise and not use spaces, this will be the public slug of your website.",
    },
  });
  const client = useQueryClient();

  const slugForm = useForm<z.infer<typeof changeUrlSchema>>({
    resolver: zodResolver(changeUrlSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async function sendData(
      values: z.infer<typeof changeUrlSchema>
    ) {
      const res = await get(api.websites.slug.$post({ json: values }));
      client.setQueryData(["websites"], res);
    },
  });

  const submit = slugForm.handleSubmit(
    (values: z.infer<typeof changeUrlSchema>) => mutate(values)
  );

  return (
    <Form {...slugForm}>
      <form onSubmit={submit} className="">
        <FormField
          control={slugForm.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>capupet.com/</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder=""
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value.toLowerCase())
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
              <p className="text-sm text-muted-foreground mb-6">
                {t("slugDescription")}
              </p>
            </FormItem>
          )}
        />

        <div className="col-span-full">
          <SubmitButton disabled={isPending}>{t("saveChanges")}</SubmitButton>
        </div>
      </form>
    </Form>
  );
};
