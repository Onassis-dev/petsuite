import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod/v4";
import { api, get } from "@/lib/api";
import { useI18n } from "@/hooks/use-i18n";
import { ModalForm } from "@/components/ModalForm";
import { changeUrlSchema } from "@server/routes/websites/websites.schema";
import { TriangleAlertIcon } from "lucide-react";
import { Alert, AlertTitle } from "@workspace/ui/components/ui/alert";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from "@workspace/ui/components/ui/input-group";

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const defaultValues: z.infer<typeof changeUrlSchema> = {
  slug: "",
};

export const ChangeUrl = ({ open, setOpen }: props) => {
  const client = useQueryClient();

  const t = useI18n({
    title: {
      es: "Actualizar slug",
      en: "Update slug",
    },
    alert: {
      es: "Cambiar el slug tiene los siguientes efectos:",
      en: "Changing the slug has the following effects:",
    },
  });

  const slugForm = useForm<z.infer<typeof changeUrlSchema>>({
    resolver: zodResolver(changeUrlSchema),
    defaultValues: defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async function sendData(
      values: z.infer<typeof changeUrlSchema>
    ) {
      await get(api.websites.slug.$put({ json: { ...values } }));

      client.setQueryData(["websites"], (old: object) => ({
        ...old,
        slug: values.slug,
      }));
      setOpen(false);
    },
  });

  const submit = slugForm.handleSubmit(
    (values: z.infer<typeof changeUrlSchema>) => mutate(values)
  );

  return (
    <ModalForm
      open={open}
      setOpen={setOpen}
      title={t("title")}
      submit={submit}
      isPending={isPending}
      reset={() => slugForm.reset(defaultValues)}
    >
      <Form {...slugForm}>
        <form onSubmit={submit}>
          <Alert variant="destructive">
            <TriangleAlertIcon strokeWidth={1.8} />
            <AlertTitle>{t("alert")}</AlertTitle>
          </Alert>

          <FormField
            control={slugForm.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("title")}</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>.capu.pet</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      className="pl-3"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(e.target.value.toLowerCase())
                      }
                    />
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ModalForm>
  );
};
