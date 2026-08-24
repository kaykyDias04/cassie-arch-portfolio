import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const belgianoSerif = localFont({
  src: "../../public/belgiano_serif/Belgiano Serif 2.ttf",
  variable: "--font-belgiano-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cássia Victória | Portfólio",
  description:
    "Escritório de arquitetura especializado em projetos residenciais, comerciais e urbanismo. Transformamos espaços com design contemporâneo e funcional.",
  keywords: ["arquitetura", "design", "interiores", "urbanismo", "portfólio"],
  icons: {
    icon: "/Cássia-logo.svg",
  },
  openGraph: {
    title: "Cássia Victória | Portfólio",
    description: "Transformamos espaços com design contemporâneo e funcional.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`h-full antialiased ${belgianoSerif.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
