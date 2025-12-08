"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralInfo } from "./GeneralInfo";

export default function Page() {
  return (
    <>
      <Tabs defaultValue="general" className="max-w-2xl mx-auto">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="public">Public</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        <div className="sm:border sm:p-8 pt-8 rounded-2xl">
          <TabsContent value="general">
            <GeneralInfo />
          </TabsContent>
          <TabsContent value="public">Public</TabsContent>
          <TabsContent value="medical">Medical</TabsContent>
          <TabsContent value="notes">Notes</TabsContent>
          <TabsContent value="files">Files</TabsContent>
        </div>
      </Tabs>
    </>
  );
}
