"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { PERFIL, PROYECTOS } from "@/data/portfolio";
import { PreviewCard } from "./preview-card";

const MANO = PROYECTOS.filter((p) => p.destacado).slice(0, 4);
const ABANICO = [
  { giro: -10, baja: 16 },
  { giro: -3.5, baja: 0 },
  { giro: 3.5, baja: 0 },
  { giro: 10, baja: 16 },
];
const SEPARACION = 0.74; // distancia entre cartas, medida en anchos de carta
const EASE = [0.22, 1, 0.36, 1] as const;

interface CartaProps {
  project: (typeof MANO)[number];
  index: number;
  spread: MotionValue<number>;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  reduce: boolean;
}

/**
 * Una carta tiene tres capas para que sus animaciones no se pisen:
 * 1) reparto inicial (llega volando y se da la vuelta), 2) abanico con el scroll y la inclinación del cursor,
 * 3) elevación al pasar el ratón.
 */
function CartaMano({ project, index, spread, cursorX, cursorY, reduce }: CartaProps) {
  const { giro, baja } = ABANICO[index];
  const x = useTransform(spread, (s) => `calc(var(--cw) * ${(index - 1.5) * SEPARACION * s})`);
  const rotate = useTransform(spread, (s) => giro * s);
  const rotateY = useTransform(cursorX, (v) => v * 16);
  const rotateX = useTransform(cursorY, (v) => v * -12);

  return (
    <motion.div
      className="absolute bottom-0 left-1/2 -ml-[calc(var(--cw)/2)] h-[calc(var(--cw)*1.4)] w-(--cw) [transform-style:preserve-3d]"
      initial={reduce ? false : { x: 420, y: -260, rotate: 35, opacity: 0 }}
      animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.4 + index * 0.18 }}
    >
      <motion.div
        className="relative size-full [transform-style:preserve-3d]"
        style={{ x, y: baja, rotate, rotateX, rotateY, transformOrigin: "50% 150%" }}
      >
        <motion.a
          href={`#proyecto-${project.id}`}
          aria-label={`${project.titulo}, ver en proyectos`}
          className="relative block size-full rounded-card [transform-style:preserve-3d]"
          whileHover={reduce ? undefined : { y: -30, z: 80, scale: 1.05 }}
          whileFocus={reduce ? undefined : { y: -30, z: 80, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <PreviewCard project={project} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;

  // Con el scroll, el abanico se abre y el texto sube un poco más despacio.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const spread = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.7]);
  const textoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);

  // El cursor inclina las cartas (valores de -0.5 a 0.5 suavizados con un muelle).
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const cursorX = useSpring(cx, { stiffness: 110, damping: 18 });
  const cursorY = useSpring(cy, { stiffness: 110, damping: 18 });

  function alMover(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    cx.set((e.clientX - r.left) / r.width - 0.5);
    cy.set((e.clientY - r.top) / r.height - 0.5);
  }
  function alSalir() {
    cx.set(0);
    cy.set(0);
  }

  return (
    <section
      ref={ref}
      onPointerMove={alMover}
      onPointerLeave={alSalir}
      className="flex min-h-[calc(100svh-4rem)] items-center py-[clamp(40px,6vw,72px)]"
    >
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-12 px-4 sm:px-8 xl:grid-cols-[minmax(0,1fr)_620px]">
        <motion.div style={{ y: textoY }}>
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[0.9rem] font-semibold text-paper">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22c55e] opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[#22c55e]" />
            </span>
            Busco prácticas en Madrid o en remoto
          </p>
          <h1 className="font-display text-[clamp(2.2rem,11vw,5.4rem)] font-extrabold leading-[0.9] tracking-[-0.04em] xl:text-[clamp(3.2rem,4.4vw,5rem)]">
            {["Alejandro", "Nicolás"].map((palabra, i) => (
              <motion.span
                key={palabra}
                className="block"
                initial={reduce ? false : { y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 }}
              >
                {palabra}
              </motion.span>
            ))}
          </h1>
          <p className="mt-6 text-[1.25rem] font-semibold leading-snug text-accent-soft">{PERFIL.rol}</p>
          <p className="mt-4 max-w-[46ch] text-[1.15rem] leading-relaxed text-[#d8d4ea]">
            Hago apps Android con Kotlin, backends con Java y Spring Boot y webs con React y TypeScript. Estudio segundo de DAM en Ilerna.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-accent" href="#proyectos">Ver proyectos</a>
            <a className="btn btn-line" href={PERFIL.cv} download>Descargar CV</a>
          </div>
        </motion.div>

        <div>
          <div
            className="relative mx-auto h-[calc(var(--cw)*1.4+70px)] w-full max-w-[620px] [perspective:1400px]"
            style={{ "--cw": "clamp(96px, 25vw, 184px)" } as CSSProperties}
            role="group"
            aria-label="Proyectos destacados"
          >
            {MANO.map((p, i) => (
              <CartaMano key={p.id} project={p} index={i} spread={spread} cursorX={cursorX} cursorY={cursorY} reduce={reduce} />
            ))}
          </div>
          <p className="mt-4 text-center text-[0.9rem] text-muted">Pulsa un proyecto para verlo de cerca</p>
        </div>
      </div>
    </section>
  );
}
