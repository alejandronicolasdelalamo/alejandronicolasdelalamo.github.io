"use client";

import { useEffect, useRef, useState } from "react";
import { PERFIL } from "@/data/portfolio";
import { bloquearScroll, irA, liberarScroll } from "./smooth-scroll";

const ENLACES = [
  { id: "perfil", texto: "Perfil" },
  { id: "proyectos", texto: "Proyectos" },
  { id: "trayectoria", texto: "Trayectoria" },
  { id: "dominio", texto: "Qué domino" },
  { id: "enlaces", texto: "Enlaces" },
];

export function SiteHeader() {
  const [activo, setActivo] = useState<string | null>(null);
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Marca en el menú la sección que está en el centro de la pantalla.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.isIntersecting && setActivo(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    [...ENLACES.map((e) => e.id), "contacto"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Menú móvil: bloquea el scroll, lleva el foco al primer enlace y se cierra con Escape.
  useEffect(() => {
    if (!abierto) return;
    bloquearScroll();
    panel.current?.querySelector("a")?.focus();
    const alPulsar = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alPulsar);
    const botonMenu = boton.current;
    return () => {
      window.removeEventListener("keydown", alPulsar);
      liberarScroll();
      botonMenu?.focus();
    };
  }, [abierto]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-8">
        <a
          href="#inicio"
          aria-label={`${PERFIL.nombre}, inicio`}
          className="inline-flex items-center rounded-md border-2 border-accent-soft px-2 py-0.5 font-display text-xl font-extrabold tracking-tight text-accent-soft no-underline transition-colors hover:bg-accent-soft hover:text-ink"
        >
          AN
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {ENLACES.map(({ id, texto }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activo === id ? "location" : undefined}
              className={`rounded-md px-3 py-2.5 text-[0.95rem] font-semibold no-underline transition-colors ${
                activo === id ? "bg-surface-2 text-paper" : "text-muted hover:text-paper"
              }`}
            >
              {texto}
            </a>
          ))}
          <a href="#contacto" className="btn btn-accent btn-sm ml-2 no-underline">
            Contacto
          </a>
        </nav>

        <button
          ref={boton}
          type="button"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto((a) => !a)}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-3 text-[0.95rem] font-semibold md:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
          {abierto ? "Cerrar" : "Menú"}
        </button>
      </div>

      {abierto && (
        <div ref={panel} id="menu-movil" data-lenis-prevent className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-canvas/97 px-4 pb-10 pt-6 backdrop-blur md:hidden">
          <nav aria-label="Menú móvil">
            <ul className="grid gap-1">
              {[...ENLACES, { id: "contacto", texto: "Contacto" }].map(({ id, texto }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      // Primero se cierra el menú (y se libera el scroll); después se va a la sección.
                      e.preventDefault();
                      setAbierto(false);
                      setTimeout(() => irA(id), 50);
                    }}
                    className="flex min-h-14 items-center justify-between border-b border-line font-display text-[1.6rem] font-extrabold tracking-[-0.02em] no-underline"
                  >
                    {texto}
                    <span aria-hidden="true" className={activo === id ? "size-2.5 rounded-full bg-accent" : ""} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn btn-accent mt-8 w-full" href={PERFIL.cv} download>
            Descargar CV
          </a>
        </div>
      )}
    </header>
  );
}
