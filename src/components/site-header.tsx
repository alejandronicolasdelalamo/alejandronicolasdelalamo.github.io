"use client";

import { useEffect, useState } from "react";

const ENLACES = [
  { id: "perfil", texto: "Perfil" },
  { id: "proyectos", texto: "Proyectos" },
  { id: "trayectoria", texto: "Trayectoria" },
  { id: "dominio", texto: "Qué domino" },
  { id: "enlaces", texto: "Enlaces" },
];

export function SiteHeader() {
  const [activo, setActivo] = useState<string | null>(null);

  // Marca en el menú la sección que está en el centro de la pantalla.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.isIntersecting && setActivo(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ENLACES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-8">
        <a href="#inicio" aria-label="Alejandro Nicolás, inicio" className="inline-flex items-center border-2 border-accent-soft px-2 py-0.5 font-display text-xl font-extrabold tracking-tight text-accent-soft no-underline transition-colors hover:bg-accent-soft hover:text-ink">
          AN
        </a>
        <nav aria-label="Principal" className="flex items-center gap-1">
          {ENLACES.map(({ id, texto }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activo === id ? "true" : undefined}
              className={`hidden border-b-2 px-3 py-2.5 text-[0.95rem] font-semibold no-underline transition-colors md:inline-block ${
                activo === id ? "border-accent-soft text-paper" : "border-transparent text-muted hover:border-accent-soft hover:text-paper"
              }`}
            >
              {texto}
            </a>
          ))}
          <a href="#contacto" className="ml-2 inline-flex min-h-11 items-center rounded-card border-b-2 border-ink bg-accent px-3.5 text-[0.95rem] font-semibold text-ink no-underline transition-colors hover:bg-accent-soft">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
