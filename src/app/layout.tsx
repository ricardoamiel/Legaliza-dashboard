import type { Metadata } from "next";
import { Gloock, Outfit } from "next/font/google";
import "@/styles/globals.css";
import DashboardLayout from "@/Components/layout/dashboard/layout";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth.context";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
});

const outfit = Outfit({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Legaliza",
  description: "Dashboard legaliza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${gloock.variable} ${outfit.variable} `}>
        <AuthProvider>
          <DashboardLayout>{children}</DashboardLayout>
          <Toaster richColors={true} position="top-right" closeButton={true} />
        </AuthProvider>
      </body>
    </html>
  );
}
