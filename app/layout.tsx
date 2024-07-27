import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Services Portal",
  description: "Digital Services Portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">

      <body className={inter.className}>
        <StoreProvider>
          <Header></Header>

          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
