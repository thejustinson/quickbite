import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/components/SolanaProvider";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickBite",
  description: "Take a quick bite on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} bg-neutral-100`}>
        <SolanaProvider>{children}</SolanaProvider>
      </body>
    </html>
  );
}
