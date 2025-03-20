import type { Metadata } from "next";
import { Fugaz_One, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "./header";
import Logout from "@/components/Logout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fugazOne = Fugaz_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moodle",
  description: "Track your daily mood every day of the year",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"}>
        <h1
          className={"text-base sm:text-lg textGradient " + fugazOne.className}
        >
          Moodle
        </h1>
      </Link>
      <div className="flex items-center justify-between">
        <Logout />
      </div>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 text-center">
      <p className={"text-indigo-500 " + fugazOne.className}>Made with ❤️</p>
    </footer>
  );
  return (
    <html lang="en">
      <Header />
      <AuthProvider>
        <body
          className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
