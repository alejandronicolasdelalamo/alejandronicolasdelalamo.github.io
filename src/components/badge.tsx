"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { PERFIL } from "@/data/portfolio";

// Muelle con poca amortiguación: al soltarla, la tarjeta oscila como un péndulo antes de pararse.
const PENDULO = { type: "spring", stiffness: 55, damping: 3.4, mass: 1 } as const;
const MAX_GIRO = 65;

const ICONOS = {
  github:
    "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.300-5.5-5.900 0-1.300.5-2.400 1.200-3.200-.1-.3-.5-1.500.1-3.200 0 0 1-.3 3.300 1.200a11.500 11.500 0 0 1 6 0C17.300 4.700 18.300 5 18.300 5c.6 1.700.2 2.900.1 3.200.8.8 1.200 1.900 1.200 3.200 0 4.600-2.800 5.600-5.500 5.900.4.4.8 1.100.8 2.200v3.300c0 .3.2.7.8.6A12 12 0 0 0 12 .3",
  linkedin:
    "M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zm1.8 13.1H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z",
};

/**
 * Fondo animado de la tarjeta: una superficie ondulada como seda oscura, dibujada con una trama de puntos.
 * Cada punto crece y se aclara donde la "tela" recibe luz, y los pliegues avanzan despacio en diagonal.
 * Se dibuja en un canvas; se detiene fuera de pantalla y queda fijo con "reducir movimiento".
 */
function TramaOndulada() {
  const lienzo = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = lienzo.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const PASO = 6; // separación entre puntos, en px
    let ancho = 0;
    let alto = 0;
    let marco = 0;
    let visible = true;
    const inicio = performance.now();

    function medir() {
      const r = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = r.width;
      alto = r.height;
      canvas!.width = Math.round(ancho * dpr);
      canvas!.height = Math.round(alto * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Luz de la tela en un punto (0 = pliegue en sombra, 1 = cresta iluminada).
    function luz(x: number, y: number, t: number) {
      const X = x / ancho;
      const Y = y / ancho;
      const fase = X * 2.1 + Y * 2.9 + 0.55 * Math.sin(X * 2.2 - Y * 1.4 + t * 0.22);
      const pliegue = Math.sin(fase * 2.3 - t * 0.55);
      const onda = Math.sin(X * 3.4 - Y * 2.1 + t * 0.33);
      const bruto = 0.5 + 0.5 * (0.78 * pliegue + 0.22 * onda);
      const recortado = Math.min(1, Math.max(0, (bruto - 0.46) / 0.48));
      // Menos trama en el centro (nombre y foto) para que se lea bien, como en el diseño.
      const d = Math.hypot((x - ancho / 2) / ancho, (y - alto * 0.4) / alto);
      const centro = Math.min(1, Math.max(0.2, (d - 0.16) / 0.26));
      return recortado * recortado * centro;
    }

    function pintar(ahora: number) {
      const t = quieto ? 0 : (ahora - inicio) / 1000;
      ctx!.clearRect(0, 0, ancho, alto);
      for (let y = PASO / 2; y < alto; y += PASO) {
        for (let x = PASO / 2; x < ancho; x += PASO) {
          const l = luz(x, y, t);
          if (l < 0.03) continue;
          ctx!.globalAlpha = 0.18 + 0.72 * l;
          ctx!.beginPath();
          ctx!.arc(x, y, 0.4 + l * PASO * 0.24, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function bucle(ahora: number) {
      pintar(ahora);
      if (!quieto && visible) marco = requestAnimationFrame(bucle);
    }

    medir();
    ctx.fillStyle = "#cfd2dc";
    bucle(performance.now());

    const alCambiarTamano = new ResizeObserver(() => {
      medir();
      ctx.fillStyle = "#cfd2dc";
      pintar(performance.now());
    });
    alCambiarTamano.observe(canvas);

    // Solo se anima mientras se ve: ahorra batería y CPU.
    const observador = new IntersectionObserver(([e]) => {
      const antes = visible;
      visible = e.isIntersecting;
      if (visible && !antes && !quieto) marco = requestAnimationFrame(bucle);
      if (!visible) cancelAnimationFrame(marco);
    });
    observador.observe(canvas);

    return () => {
      cancelAnimationFrame(marco);
      alCambiarTamano.disconnect();
      observador.disconnect();
    };
  }, []);

  return <canvas ref={lienzo} aria-hidden="true" className="absolute inset-0 size-full" />;
}

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
 * Acreditación colgada de una cinta. Cuelga quieta con su fondo animado; se puede arrastrar
 * y al soltarla vuelve oscilando como un péndulo. Con "reducir movimiento" no se mueve.
 */
export function Badge() {
  const reduce = useReducedMotion() ?? false;
  const raiz = useRef<HTMLDivElement>(null);
  const angulo = useMotionValue(0);
  const giroY = useTransform(angulo, [-MAX_GIRO, MAX_GIRO], [20, -20]); // un poco de volumen al balancearse
  const arrastrando = useRef(false);

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
        <div className="relative -mt-6 aspect-[3/4] w-full overflow-hidden rounded-[32px] bg-[#030304] text-white shadow-[0_40px_70px_-25px_rgb(11_12_20/0.75)]">
          <TramaOndulada />

          {/* Ranura de la pinza */}
          <span aria-hidden="true" className="absolute left-1/2 top-[5.5%] h-2.5 w-[40%] -translate-x-1/2 rounded-full bg-white" />
          <span aria-hidden="true" className="absolute left-1/2 top-[3.2%] size-6 -translate-x-1/2 rounded-full bg-white" />

          <div className="relative flex h-full flex-col items-center px-[9%] pb-[7%] pt-[17%] text-center">
            <p className="text-[1.6rem] font-semibold leading-tight tracking-[-0.02em] [text-shadow:0_2px_12px_rgb(0_0_0/0.9)]">{PERFIL.nombre}</p>
            <p className="mt-1 text-[0.9rem] text-white/65 [text-shadow:0_2px_10px_rgb(0_0_0/0.9)]">Desarrollador multiplataforma</p>

            <div className="relative mt-[7%] aspect-square w-[66%] overflow-hidden rounded-[22px] border-[5px] border-[#8b8b90] bg-surface-2">
              {PERFIL.foto && (
                <Image
                  src={PERFIL.foto}
                  alt={PERFIL.fotoAlt}
                  fill
                  sizes="220px"
                  draggable={false}
                  className="object-cover object-[50%_25%]"
                />
              )}
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
