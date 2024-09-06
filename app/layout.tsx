import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
 

import StoreProvider from "./StoreProvider";
 

const inter = Inter({ subsets: ["latin"] });
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    <html lang="en" dir="rtl">

      <body >
      <ToastContainer autoClose={4000}   />
        <StoreProvider>
     
      
          {children}
          
        </StoreProvider>
      </body>
    </html>
  );
}
