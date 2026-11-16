"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { PERFIL } from "@/data/portfolio";

// Muelle con poca amortiguación: la tarjeta oscila varias veces antes de pararse, como un péndulo.
const PENDULO = { type: "spring", stiffness: 55, damping: 3.4, mass: 1 } as const;
const MAX_GIRO = 65;

const ICONOS = {
  github:
    "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3",
  linkedin:
    "M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zm1.8 13.1H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z",
};

function Red({ href, etiqueta, children }: { href: string; etiqueta: string; children: React.ReactNode }) {
  const externo = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={etiqueta}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener noreferrer" : undefined}
      className="grid size-12 place-items-center rounded-full bg-[#141417] text-white ring-1 ring-white/10 transition-colors hover:bg-accent hover:text-ink"
    >
      {children}
    </a>
  );
}

/**
 * Acreditación colgada de una cinta. Cae y se balancea al aparecer en pantalla, y se puede arrastrar:
 * al soltarla vuelve oscilando como un péndulo. Con "reducir movimiento" queda quieta.
 */
export function Badge() {
  const reduce = useReducedMotion() ?? false;
  const raiz = useRef<HTMLDivElement>(null);
  const visto = useInView(raiz, { once: true, margin: "0px 0px -25% 0px" });
  const angulo = useMotionValue(0);
  const giroY = useTransform(angulo, [-MAX_GIRO, MAX_GIRO], [20, -20]); // un poco de volumen al balancearse
  const arrastrando = useRef(false);
  const [pausada, setPausada] = useState(false);

  // Entrada: aparece ladeada y se balancea hasta quedarse quieta.
  useEffect(() => {
    if (!visto || reduce) return;
    angulo.set(26);
    const control = animate(angulo, 0, PENDULO);
    return () => control.stop();
  }, [visto, reduce, angulo]);

  function alPulsar(e: PointerEvent<HTMLDivElement>) {
    if (reduce || (e.target as HTMLElement).closest("a, button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    arrastrando.current = true;
    angulo.stop();
  }

  function alMover(e: PointerEvent<HTMLDivElement>) {
    if (!arrastrando.current || !raiz.current) return;
    // El ángulo sale de la recta entre el punto de cuelgue (arriba en el centro) y el puntero.
    const r = raiz.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = Math.max(60, e.clientY - r.top);
    const grados = (-Math.atan2(dx, dy) * 180) / Math.PI;
    angulo.set(Math.max(-MAX_GIRO, Math.min(MAX_GIRO, grados)));
  }

  function alSoltar() {
    if (!arrastrando.current) return;
    arrastrando.current = false;
    animate(angulo, 0, { ...PENDULO, velocity: angulo.getVelocity() });
  }

  return (
    <div
      ref={raiz}
      className="relative mx-auto w-[min(340px,74vw)] [perspective:1200px]"
      style={{ "--cuerda": "clamp(118px, 14vw, 176px)" } as CSSProperties}
    >
      {/* Enganche fijo en el borde de la sección de arriba: de aquí cuelga la cinta */}
      <span aria-hidden="true" className="absolute left-1/2 top-0 z-10 h-2 w-16 -translate-x-1/2 rounded-b-md bg-gradient-to-b from-[#3d3d44] to-[#1c1c20]" />

      <motion.div
        role="group"
        aria-label={`Acreditación de ${PERFIL.nombre}`}
        style={{ rotate: angulo, rotateY: giroY, transformOrigin: "50% 0%" }}
        className={`flex touch-pan-y select-none flex-col items-center ${reduce ? "" : "cursor-grab active:cursor-grabbing"}`}
        onPointerDown={alPulsar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
      >
        {/* Cinta tejida */}
        <span
          aria-hidden="true"
          className="block h-(--cuerda) w-[18px] shadow-[inset_-3px_0_4px_rgb(0_0_0/0.45)]"
          style={{ background: "repeating-linear-gradient(90deg, #2a2a30 0 2px, #1b1b1f 2px 4px)" }}
        />
        {/* Mosquetón metálico */}
        <span aria-hidden="true" className="relative z-10 -mt-0.5 block h-6 w-7 rounded-b-md bg-gradient-to-b from-[#a1a1aa] via-[#6b6b73] to-[#3f3f46] shadow-md" />
        <span aria-hidden="true" className="relative z-10 -mt-1 block h-5 w-2.5 rounded-b-full bg-gradient-to-b from-[#8a8a92] to-[#4b4b53]" />

        {/* Tarjeta */}
        <div className="relative -mt-6 aspect-[3/4] w-full overflow-hidden rounded-[32px] bg-[#050507] text-white shadow-[0_40px_70px_-25px_rgb(11_12_20/0.75)]">
          {/* Trama de puntos que se desvanece hacia el centro */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgb(196 181 253 / 0.8) 0 1.2px, transparent 1.7px)",
              backgroundSize: "8px 8px",
              maskImage: "radial-gradient(ellipse 66% 52% at 42% 58%, transparent 30%, #000 78%)",
              WebkitMaskImage: "radial-gradient(ellipse 66% 52% at 42% 58%, transparent 30%, #000 78%)",
            }}
          />
          {/* Barrido oscuro en diagonal, como en el diseño */}
          <div aria-hidden="true" className="absolute -left-1/4 top-[44%] h-[34%] w-[150%] -rotate-[16deg] rounded-[50%] bg-[#050507] opacity-90 blur-xl" />
          <div aria-hidden="true" className="absolute -left-1/4 top-[58%] h-[10%] w-[150%] -rotate-[16deg] rounded-[50%] bg-white/[0.04] blur-md" />

          {/* Ranura de la pinza */}
          <span aria-hidden="true" className="absolute left-1/2 top-[5.5%] h-2.5 w-[40%] -translate-x-1/2 rounded-full bg-paper" />
          <span aria-hidden="true" className="absolute left-1/2 top-[3.2%] size-6 -translate-x-1/2 rounded-full bg-paper" />

          <div className="relative flex h-full flex-col items-center px-[9%] pb-[7%] pt-[17%] text-center">
            <p className="text-[1.6rem] font-semibold leading-tight tracking-[-0.02em]">{PERFIL.nombre}</p>
            <p className="mt-1 text-[0.9rem] text-white/60">Desarrollador multiplataforma</p>

            {/* Foto con un acercamiento lento que se puede pausar */}
            <div className="group relative mt-[7%] aspect-square w-[66%] overflow-hidden rounded-[22px] border-[5px] border-[#8b8b90] bg-surface-2">
              {PERFIL.foto && (
                <Image
                  src={PERFIL.foto}
                  alt={PERFIL.fotoAlt}
                  fill
                  sizes="200px"
                  draggable={false}
                  className="animate-retrato object-cover object-[50%_25%] grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                  style={{ animationPlayState: pausada ? "paused" : "running" }}
                />
              )}
              <button
                type="button"
                onClick={() => setPausada((p) => !p)}
                aria-pressed={pausada}
                aria-label={pausada ? "Reanudar la animación de la foto" : "Pausar la animación de la foto"}
                className="absolute bottom-2 right-2 grid size-11 place-items-center rounded-full bg-black/70 text-white opacity-90 backdrop-blur transition-opacity hover:opacity-100"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                  {pausada ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
                </svg>
              </button>
            </div>

            <div className="mt-auto flex items-center gap-4">
              <Red href={PERFIL.github} etiqueta="GitHub">
                <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true"><path d={ICONOS.github} /></svg>
              </Red>
              <Red href={PERFIL.linkedin} etiqueta="LinkedIn">
                <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true"><path d={ICONOS.linkedin} /></svg>
              </Red>
              <Red href={`mailto:${PERFIL.email}`} etiqueta="Enviar un correo">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </Red>
            </div>
          </div>
        </div>
      </motion.div>

      {!reduce && <p className="mt-4 text-center text-[0.85rem] font-medium text-ink/60">Arrastra la tarjeta</p>}
    </div>
  );
}
