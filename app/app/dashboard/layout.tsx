"use client";

import "../globals.css";
import { queryClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { DashboardWrapper } from "./providers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <SidebarProvider>
          <QueryClientProvider client={queryClient}>
            <DashboardWrapper>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-12 shrink-0 items-center border-b gap-2 px-4">
                  <SidebarTrigger />
                  <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-4"
                  />
                  <h1 className="text-base font-medium">Adopters</h1>
                </header>
                <div className="p-4 sm:p-8">{children}</div>
              </SidebarInset>
            </DashboardWrapper>
          </QueryClientProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
