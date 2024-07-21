import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ['latin'] })

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gimme Space",
  description: "Arrange the spaces of the paragaph",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
			<link rel="icon" href="/favicon.ico" sizes="any" />
		</head>
      
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
