"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Instancia única para poder pausar el scroll suave cuando hay un menú o un visor abierto.
let lenis: Lenis | null = null;

/** Bloquea el scroll de la página (menú móvil, visor de imágenes). */
export function bloquearScroll() {
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

/** Devuelve el scroll de la página a la normalidad. */
export function liberarScroll() {
  document.documentElement.style.overflow = "";
  lenis?.start();
}

/** Lleva a una sección por su id, con o sin scroll suave. */
export function irA(id: string) {
  const destino = document.getElementById(id);
  if (!destino) return;
  if (lenis) lenis.scrollTo(destino);
  else destino.scrollIntoView({ block: "start" });
}

/** Scroll suave con inercia. Se desactiva si la persona prefiere menos movimiento. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true }); // el hueco de la cabecera ya lo da scroll-padding-top
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
