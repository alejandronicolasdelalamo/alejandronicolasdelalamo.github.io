"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { PALOS, PERFIL, PROYECTOS, type Proyecto } from "@/data/portfolio";
import { hace } from "@/lib/github";
import { useRepos } from "@/hooks/use-repos";
import { SinImagen, claseImagen } from "./preview-card";
import { Suit } from "./suit";

const TOTAL = PROYECTOS.length;
const ESCALA_ZOOM = 1.4;

/** Los cuatro palos, solo para Barajados, que es el único proyecto que es un juego de cartas. */
function PalosDeLaBaraja() {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-1.5 text-[1.05rem]">
      <Suit name="spade" className="text-ink" />
      <Suit name="heart" className="text-red" />
      <Suit name="diamond" className="text-red" />
      <Suit name="club" className="text-ink" />
    </span>
  );
}

/**
 * Zona de la imagen del proyecto. Al pasar el ratón la imagen se amplía con un muelle
 * y el zoom sigue al cursor, para poder mirar cualquier rincón de la captura.
 */
function ZonaImagen({ project }: { project: Proyecto }) {
  const reduce = useReducedMotion() ?? false;
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const origenX = useSpring(x, { stiffness: 150, damping: 24 });
  const origenY = useSpring(y, { stiffness: 150, damping: 24 });
  const escala = useSpring(1, { stiffness: 140, damping: 22 });

  function alMover(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }

  return (
    <div
      className="relative h-[28%] shrink-0 cursor-zoom-in overflow-hidden border-b-2 border-ink lg:h-auto lg:w-[56%] lg:border-b-0 lg:border-r-2"
      style={{ background: project.fondo }}
      onPointerEnter={(e) => e.pointerType === "mouse" && !reduce && escala.set(ESCALA_ZOOM)}
      onPointerLeave={() => escala.set(1)}
      onPointerMove={alMover}
    >
      <motion.div className="absolute inset-0" style={{ scale: escala, originX: origenX, originY: origenY }}>
        {project.imagen ? (
          <Image
            src={project.imagen.src}
            alt={`Captura de ${project.titulo}`}
            width={project.imagen.ancho}
            height={project.imagen.alto}
            sizes="(min-width: 1024px) 600px, 100vw"
            className={`absolute inset-0 size-full ${claseImagen(project.imagen, "p-4")}`}
          />
        ) : (
          <SinImagen project={project} />
        )}
      </motion.div>
    </div>
  );
}

interface CartaProps {
  project: Proyecto;
  index: number;
  progress: MotionValue<number>;
  actualizado: string | null;
}

/**
 * Cada proyecto es una tarjeta que se queda pegada arriba (position: sticky) y la siguiente cae encima.
 * Con el progreso del scroll, las que quedan debajo se encogen y se oscurecen un poco.
 */
function TarjetaProyecto({ project, index, progress, actualizado }: CartaProps) {
  const reduce = useReducedMotion() ?? false;
  const esUltima = index === TOTAL - 1;
  const inicio = index / TOTAL;
  const escalaFinal = reduce ? 1 : 1 - (TOTAL - 1 - index) * 0.045;
  const scale = useTransform(progress, [inicio, 1], [1, escalaFinal]);
  const sombra = useTransform(progress, [inicio, 1], [0, esUltima || reduce ? 0 : 0.5]);

  // Cuando la tarjeta siguiente ya la tapa, la desactivamos (inert) para que el teclado y los lectores
  // de pantalla no entren en enlaces que no se ven.
  const [cubierta, setCubierta] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setCubierta(!esUltima && v >= (index + 1) / (TOTAL - 1) - 0.02));

  return (
    <div
      id={`proyecto-${project.id}`}
      className="sticky top-0 flex h-screen items-start justify-center px-3 sm:px-8"
      style={{ paddingTop: `calc(84px + ${index * 18}px)` }}
    >
      <motion.article
        aria-labelledby={`t-${project.id}`}
        inert={cubierta}
        style={{ scale, transformOrigin: "top center" }}
        className="relative flex h-[min(80vh,640px)] w-full max-w-[1100px] flex-col overflow-hidden rounded-card border-2 border-ink bg-paper text-ink shadow-[10px_12px_0_var(--color-shade)]"
      >
        <header className="flex items-center justify-between gap-3 border-b-2 border-ink px-4 py-2.5">
          <span className="inline-flex items-center gap-3 text-[0.95rem] font-semibold">
            {PALOS[project.palo].nombre}
            {project.estilo === "cartas" && <PalosDeLaBaraja />}
          </span>
          <span
            className={`inline-flex items-center gap-2 text-[0.85rem] font-semibold before:size-[9px] before:content-[''] ${
              project.estado === "Publicado" ? "before:bg-[#1f9d55]" : "before:animate-blink before:bg-red"
            }`}
          >
            {project.estado}
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <ZonaImagen project={project} />

          {/* @container: el tamaño del título depende del ancho real de esta columna, para que el nombre siempre quepa entero */}
          <div className="@container relative flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4 lg:gap-4 lg:p-8">
            <h3 id={`t-${project.id}`} className="font-display text-[clamp(1.5rem,8cqw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              {project.titulo}
            </h3>
            <p className="text-[0.92rem] leading-snug max-lg:line-clamp-6 lg:text-[1.02rem] lg:leading-relaxed">{project.resumen}</p>
            <ul className="flex flex-wrap gap-1.5">
              {project.tecnologias.slice(0, 6).map((t) => (
                <li key={t} className="rounded-md bg-ink/[0.07] px-2.5 py-1 text-[0.8rem] font-medium text-ink/80">
                  {t}
                </li>
              ))}
              {project.tecnologias.length > 6 && (
                <li className="rounded-md bg-ink/[0.07] px-2.5 py-1 text-[0.8rem] font-medium text-ink/80">+{project.tecnologias.length - 6}</li>
              )}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
              {project.visibilidad === "publico" && project.repo ? (
                <a className="btn btn-accent btn-sm" href={`https://github.com/${PERFIL.usuarioGithub}/${project.repo}`} target="_blank" rel="noopener noreferrer">
                  Ver código
                </a>
              ) : (
                <span className="text-[0.88rem] font-semibold text-[#4b5068]">
                  {project.visibilidad === "privado" ? "Repositorio privado" : "Todavía sin repositorio público"}
                </span>
              )}
              {actualizado && <span className="text-[0.82rem] text-[#4b5068]">Actualizado {actualizado}</span>}
            </div>
          </div>
        </div>

        <motion.div aria-hidden="true" style={{ opacity: sombra }} className="pointer-events-none absolute inset-0 bg-surface" />
      </motion.article>
    </div>
  );
}

export function Projects() {
  const mesa = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mesa, offset: ["start start", "end end"] });
  const repos = useRepos();
  const fechas = repos.estado === "listo" ? new Map(repos.repos.map((r) => [r.name, r.pushed_at])) : null;

  return (
    <section id="proyectos" aria-labelledby="t-proyectos">
      <div className="mx-auto max-w-[1180px] px-4 pb-10 pt-[clamp(64px,9vw,112px)] sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <h2 id="t-proyectos" className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-none tracking-[-0.02em]">
            Proyectos
          </h2>
          <p className="max-w-[46ch] text-muted">
            {PROYECTOS.length} proyectos. Baja para ir viéndolos uno a uno, o salta directamente a uno. Pasa el ratón por una imagen para ampliarla.
          </p>
        </div>
        <ul className="mt-7 flex flex-wrap gap-2.5">
          {PROYECTOS.map((p) => (
            <li key={p.id}>
              <a
                href={`#proyecto-${p.id}`}
                className="inline-flex min-h-11 items-center rounded-card border-2 border-paper/35 px-4 py-2 text-[0.95rem] font-semibold no-underline transition-[border-color,transform] hover:-translate-y-0.5 hover:border-paper"
              >
                {p.corto}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div ref={mesa} className="relative">
        {PROYECTOS.map((p, i) => (
          <TarjetaProyecto
            key={p.id}
            project={p}
            index={i}
            progress={scrollYProgress}
            actualizado={p.repo && fechas?.get(p.repo) ? hace(fechas.get(p.repo)!) : null}
          />
        ))}
      </div>
    </section>
  );
}
