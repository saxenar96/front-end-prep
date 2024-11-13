import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { headers } from "next/headers";
import { kebabToPascalWithSpaces } from "@/utils/cases";
import React from "react";

export const metadata: Metadata = {
  title: "Front-End Prep",
  description: "App to practice problems for Front End interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = headers();
  const pathname = headerList.get('x-current-path');

  let pathFragments: string[] = []
  if (pathname) {
    pathFragments = pathname.split('/').slice(1)
  }

  return (
    <html lang="en">
      <body>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
              {
                pathFragments.map((path, index) => {
                  return (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={`/${pathFragments.slice(0, index + 1).join('/')}`}>
                          { kebabToPascalWithSpaces(path) }
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {
                        index !== pathFragments.length - 1 && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )
                      }
                    </>
                  )
                })
              }
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className=" flex flex-col w-full p-[24px] overflow-hidden">
            {children}
          </main>
      </SidebarInset>
      </SidebarProvider>
      </body>
    </html>
  );
}
