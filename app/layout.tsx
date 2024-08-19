import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

import StoreProvider from "./StoreProvider";
import Breadcrumbs from "@/components/breadcrumb";

const inter = Inter({ subsets: ["latin"] });
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/footer";

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
        <ToastContainer autoClose={4000}   />
          <Header></Header>
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
