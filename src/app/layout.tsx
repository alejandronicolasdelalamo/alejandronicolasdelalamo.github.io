import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Syne } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SuitDefs } from "@/components/suit";

// Fuentes alojadas por Next: sin parpadeo ni saltos de layout.
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["600", "700", "800"], display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  title: "Alejandro Nicolás, desarrollador multiplataforma",
  description:
    "Portfolio de Alejandro Nicolás, desarrollador multiplataforma en formación. Apps Android con Kotlin, backends con Java y Spring Boot y webs con React.",
  openGraph: {
    title: "Alejandro Nicolás, desarrollador multiplataforma",
    description: "Proyectos de Android, backend, web y juegos, con su código y sus tecnologías.",
    locale: "es_ES",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#141724" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${instrument.variable} antialiased`}>
      <body>
        <SuitDefs />
        <SmoothScroll />
        <a href="#perfil" className="fixed left-3 top-[-60px] z-[100] bg-accent px-4 py-2.5 font-semibold text-ink focus:top-3">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
