import type { Metadata } from "next";
import "./globals.css";
import "./neoStyles.css";

import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import NavbarWrapper from "@/src/wrappers/NavbarWrappert/NavbarWrapper";

export const metadata: Metadata = {
  title: "Barghe No",
  description: "Barghe No",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <NavbarWrapper />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
