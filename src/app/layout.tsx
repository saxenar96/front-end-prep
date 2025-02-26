import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, SidebarHeaderSelectionProps } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { PROBLEM_TYPES } from "@/types/problem";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

export const metadata: Metadata = {
  title: "Web Arena",
  description: "App to practice problems for Front End interviews",
};

export const problemSetOptions: SidebarHeaderSelectionProps[] = [
  {
    text: 'All Problems',
    value: PROBLEM_TYPES.All,
    iconName: 'Globe'
  },
  {
    text: 'JavaScript',
    value: PROBLEM_TYPES.Javascript,
    iconName: 'Code'
  },
  {
    text: 'React',
    value: PROBLEM_TYPES.React,
    iconName: 'Atom'
  }
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerProps = {
    selectionSet: {
      options: problemSetOptions,
      default: 0
    }
  }

  return (
    <html lang="en">
      <body className="w-full h-[100vh] overflow-hidden">
        <SidebarProvider defaultOpen={false}>
          <AppSidebar headerProps={headerProps}/>
          <SidebarInset className="content">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <AppBreadcrumb />
            </header>
            <main className="primary flex flex-1 flex-col w-full p-2 overflow-auto">
              {children}
            </main>
        </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
