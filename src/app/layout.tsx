import type { Metadata } from "next";
import localFont from "next/font/local";
import { assetPath } from "@/lib/assets";
import "./globals.css";

const belgianoSerif = localFont({
  src: "../../public/belgiano_serif/Belgiano Serif 2.ttf",
  variable: "--font-belgiano-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cássia Victória | Portfólio",
  description:
    "Portfólio de arquitetura e urbanismo de Cássia Victória — projetos residenciais, urbanos e de interiores com design contemporâneo e funcional.",
  keywords: ["arquitetura", "design", "interiores", "urbanismo", "portfólio", "Cássia Victória"],
  icons: {
    icon: assetPath("/Cassie-logo.svg"),
  },
  openGraph: {
    title: "Cássia Victória | Portfólio",
    description: "Transformo espaços em experiências com arquitetura contemporânea, sensível e integrada ao contexto urbano.",
    type: "website",
    locale: "pt_BR",
    siteName: "Cássia Victória | Portfólio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`h-full antialiased ${belgianoSerif.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
