import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "Front-End Prep",
  description: "App to practice problems for Front End interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <SidebarProvider>
        <AppSidebar />
        <main className=" flex flex-col w-full p-[24px] overflow-hidden">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
      </body>
    </html>
  );
}
