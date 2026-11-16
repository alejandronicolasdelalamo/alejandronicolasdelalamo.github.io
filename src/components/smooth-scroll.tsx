"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Scroll suave con inercia. Se desactiva si la persona prefiere menos movimiento. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -84 } });
    return () => lenis.destroy();
  }, []);
  return null;
}
