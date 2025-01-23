import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
// import Navbar from "./components/navbar";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-theme="coffee"
        className={` ${spaceGrotesk.className} antialiased max-h-screen overflow-y-scroll bg-white`}
      >
        {/* <Navbar /> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
