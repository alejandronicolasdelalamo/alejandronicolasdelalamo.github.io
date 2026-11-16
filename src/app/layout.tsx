import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Syne } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SuitDefs } from "@/components/suit";
import { PERFIL, SITIO } from "@/data/portfolio";

// Fuentes alojadas por Next: sin parpadeo ni saltos de layout.
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["700", "800"], display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });

// La imagen para compartir sale de app/opengraph-image.png y los iconos de app/icon.svg y app/apple-icon.png.
export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: SITIO.titulo,
  description: SITIO.descripcion,
  authors: [{ name: PERFIL.nombreCompleto, url: SITIO.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: PERFIL.nombre,
    title: SITIO.titulo,
    description: "Proyectos de Android, backend, web y juegos, con su código, sus tecnologías y mi CV.",
    locale: "es_ES",
  },
  twitter: { card: "summary_large_image", title: SITIO.titulo, description: SITIO.descripcion },
};

export const viewport: Viewport = { themeColor: "#141724", colorScheme: "dark" };

// Datos estructurados para buscadores: quién soy y dónde están mis perfiles.
const PERSONA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERFIL.nombreCompleto,
  jobTitle: PERFIL.rol,
  url: SITIO.url,
  image: `${SITIO.url}/yo.webp`,
  address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
  alumniOf: ["Ilerna", "4Geeks Academy"],
  sameAs: [PERFIL.github, PERFIL.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${instrument.variable} antialiased`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSONA) }} />
        <SuitDefs />
        <SmoothScroll />
        <a href="#perfil" className="fixed left-3 top-[-60px] z-[100] rounded-md bg-accent px-4 py-2.5 font-semibold text-ink focus:top-3">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
