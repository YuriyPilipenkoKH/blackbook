import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import {dark} from '@clerk/themes'
import "modern-normalize"
import "./globals.css";
import Container from "@/components/Container/Container";
import NavBar from "@/components/NavBar";
import { Toaster } from "react-hot-toast";
import { options } from "@/lib/hotToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blackbook",
  description: "Generated by Yuriy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          <Container>
          <NavBar/>
              {children}
              <Toaster 
                position="top-center" 
                toastOptions={options} 
                gutter={24} />
          </Container>
        </body>
      </html>
    </ClerkProvider>
  );
}
