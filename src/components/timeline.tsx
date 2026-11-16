"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ESTADOS_TRAY, TRAYECTORIA, type EstadoTray } from "@/data/portfolio";

// Variantes explícitas por estado: el cuadrado y la fecha cambian según si está hecho, en curso o por venir.
const CUADRADO: Record<EstadoTray, string> = {
  hecho: "border-accent-soft bg-accent",
  ahora: "animate-blink border-red bg-red",
  luego: "border-dashed border-accent-soft bg-transparent",
};
const FECHA: Record<EstadoTray, string> = {
  hecho: "text-accent-soft",
  ahora: "text-[#ff8a8a]",
  luego: "text-muted",
};

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progreso = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <ol ref={ref} className="relative max-w-[760px]">
      <span aria-hidden="true" className="absolute bottom-2 left-2 top-2 w-0.5 bg-line" />
      <motion.span aria-hidden="true" className="absolute bottom-2 left-2 top-2 w-0.5 origin-top bg-accent" style={{ scaleY: reduce ? 1 : progreso }} />
      {TRAYECTORIA.map((t) => (
        <li key={t.titulo} className="relative pb-10 pl-12 last:pb-0">
          <span aria-hidden="true" className={`absolute left-0 top-1 size-[18px] border-2 ${CUADRADO[t.estado]}`} />
          <p className={`mb-1.5 flex flex-wrap items-center gap-x-3 text-[0.95rem] font-semibold ${FECHA[t.estado]}`}>
            {t.fecha}
            {t.estado !== "hecho" && (
              <span className="border border-current px-1.5 text-[0.8rem] leading-5">{ESTADOS_TRAY[t.estado]}</span>
            )}
          </p>
          <h3 className="font-display text-[1.45rem] font-extrabold leading-tight tracking-[-0.01em]">{t.titulo}</h3>
          <p className="mt-0.5 font-semibold text-muted">{t.lugar}</p>
          <p className="mt-2 max-w-[56ch] text-[#dcd8ee]">{t.texto}</p>
        </li>
      ))}
    </ol>
  );
}
