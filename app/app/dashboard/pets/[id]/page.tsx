"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralInfo } from "./GeneralInfo";

export default function Page() {
  return (
    <>
      <Tabs>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralInfo />
        </TabsContent>
        <TabsContent value="medical">Medical</TabsContent>
        <TabsContent value="notes">Notes</TabsContent>
        <TabsContent value="files">Files</TabsContent>
      </Tabs>
    </>
  );
}
