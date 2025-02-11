import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { headers } from "next/headers";
import { kebabToPascalWithSpaces } from "@/utils/cases";
import React, { useState } from "react";
import { Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Web Arena",
  description: "App to practice problems for Front End interviews",
};

export const problemSetOptions = [
  {
    value: 'All Problems',
    icon: 'code'
  },
  {
    value: 'JavaScript',
    icon: 'js'
  },
  {
    value: 'React',
    icon: 'react'
  }
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = headers();
  const pathname = headerList.get('x-current-path');
  const headerProps = {
    selectionSet: {
      options: problemSetOptions,
      default: 0
    }
  }

  let pathFragments: string[] = []
  if (pathname) {
    pathFragments = pathname.split('/').slice(1)
  }

  return (
    <html lang="en">
      <body>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar headerProps={headerProps}/>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
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
          <main className=" flex flex-col w-full p-[24px] overflow-hidden h-full">
            {children}
          </main>
      </SidebarInset>
      </SidebarProvider>
      </body>
    </html>
  );
}
