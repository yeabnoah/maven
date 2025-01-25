import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
// import Navbar from "./components/navbar";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Maven Chat",
  description: "A modern chat application",
};

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Navbar /> */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
