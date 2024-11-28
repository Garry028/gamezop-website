import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gamezop",
  description: "On Gamezop you can play the best free online games. Gamezop has the best online games selection of multiplayer games and single-player games. Play Chess, Ludo King, Pool, Carrom, cricket games, shooting games, racing games online on Gamezop!",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="bg-gray-100 ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
