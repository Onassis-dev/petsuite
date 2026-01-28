import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/ui/tabs";
import { useI18n } from "@/hooks/use-i18n";
import { PageWrapper } from "@/components/PageWrapper";
import { Organization } from "./Organization";
import { Account } from "./Account";
import { Users } from "./Users";

export default function SettingsPage() {
  const t = useI18n({
    title: {
      es: "Configuración",
      en: "Settings",
    },
    organization: {
      es: "Organización",
      en: "Organization",
    },
    account: {
      es: "Cuenta",
      en: "Account",
    },
    users: {
      es: "Usuarios",
      en: "Users",
    },
  });

  return (
    <PageWrapper title={t("title")} size="sm">
      <Tabs defaultValue="org" className="">
        <TabsList className="mb-6 w-full text-sm sm:text-base flex justify-start gap-2">
          <TabsTrigger className="flex-none" value="org">
            {t("organization")}
          </TabsTrigger>
          <TabsTrigger className="flex-none" value="account">
            {t("account")}
          </TabsTrigger>
          <TabsTrigger className="flex-none" value="users">
            {t("users")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="org">
          <Organization />
        </TabsContent>

        <TabsContent value="account">
          <Account />
        </TabsContent>

        <TabsContent value="users">
          <Users />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
