import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

import StoreProvider from "./StoreProvider";
import { UserProfile } from "@/config/user.modal";
import { useAppDispatch } from "@/store/hooks";
import { getUser } from "@/services/userprofile";
import { setUser } from "@/store/userSlice";

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


  let user:UserProfile | null =null;
  try {
    user = await getUser();
  //  dispatch(setUser(user));
    
  } catch (err) {
    console.error("Failed to fetch user", err);
  }

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
