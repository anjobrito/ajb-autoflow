import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJB AutoFlow",
  description: "Controle sua oficina ou lava-jato pelo celular.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
