"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { PALOS, PROYECTOS, urlCodigo, type Estado, type Proyecto } from "@/data/portfolio";
import { hace } from "@/lib/github";
import { useRepos } from "@/hooks/use-repos";
import { SinImagen, claseImagen } from "./preview-card";
import { bloquearScroll, liberarScroll } from "./smooth-scroll";
import { Suit } from "./suit";

const TOTAL = PROYECTOS.length;
const ESCALA_ZOOM = 1.4;

// Variantes explícitas del indicador de estado.
const PUNTO_ESTADO: Record<Estado, string> = {
  Publicado: "before:bg-[#1f9d55]",
  "En desarrollo": "before:animate-blink before:bg-[#d97706]",
  "Uso privado": "before:bg-accent-deep",
};

/** Los cuatro palos, solo para Barajados, que es el único proyecto que es un juego de cartas. */
function PalosDeLaBaraja() {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-1.5 text-[1rem]">
      <Suit name="spade" className="text-ink" />
      <Suit name="heart" className="text-red" />
      <Suit name="diamond" className="text-red" />
      <Suit name="club" className="text-ink" />
    </span>
  );
}

/**
 * Zona de la imagen del proyecto. Al pasar el ratón la imagen se amplía con un muelle y el zoom sigue al cursor.
 * Al pulsarla se abre el visor a pantalla completa.
 */
function ZonaImagen({ project, onAbrir }: { project: Proyecto; onAbrir: () => void }) {
  const reduce = useReducedMotion() ?? false;
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const origenX = useSpring(x, { stiffness: 150, damping: 24 });
  const origenY = useSpring(y, { stiffness: 150, damping: 24 });
  const escala = useSpring(1, { stiffness: 140, damping: 22 });

  function alMover(e: PointerEvent<HTMLButtonElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }

  return (
    <button
      type="button"
      onClick={onAbrir}
      aria-label={`Ver la captura de ${project.titulo} en grande`}
      className="relative h-[30%] shrink-0 cursor-zoom-in overflow-hidden border-b border-ink/10 lg:h-auto lg:w-[56%] lg:border-b-0 lg:border-r"
      style={{ background: project.fondo }}
      onPointerEnter={(e) => e.pointerType === "mouse" && !reduce && escala.set(ESCALA_ZOOM)}
      onPointerLeave={() => escala.set(1)}
      onPointerMove={alMover}
    >
      <motion.div className="absolute inset-0" style={{ scale: escala, originX: origenX, originY: origenY }}>
        {project.imagen ? (
          <Image
            src={project.imagen.src}
            alt=""
            width={project.imagen.ancho}
            height={project.imagen.alto}
            sizes="(min-width: 1024px) 620px, 100vw"
            className={`absolute inset-0 size-full ${claseImagen(project.imagen, "p-4")}`}
          />
        ) : (
          <SinImagen project={project} />
        )}
      </motion.div>
    </button>
  );
}

/** Visor a pantalla completa con la captura entera. Se cierra con Escape, con el botón o pulsando fuera. */
function Visor({ project, onCerrar }: { project: Proyecto | null; onCerrar: () => void }) {
  const dialogo = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (project && !d.open) {
      d.showModal();
      bloquearScroll();
    }
    if (!project && d.open) d.close();
  }, [project]);

  return (
    <dialog
      ref={dialogo}
      data-lenis-prevent
      aria-label={project ? `Captura de ${project.titulo}` : undefined}
      onClose={() => {
        liberarScroll();
        onCerrar();
      }}
      onClick={(e) => e.target === e.currentTarget && dialogo.current?.close()}
      className="m-auto max-h-[92svh] w-[min(1100px,94vw)] overflow-hidden rounded-card border border-line bg-surface p-0 text-paper backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {project?.imagen && (
        <figure>
          <div className="relative h-[min(78svh,820px)] w-full" style={{ background: project.fondo }}>
            <Image src={project.imagen.src} alt={`Captura de ${project.titulo}`} fill sizes="94vw" className="object-contain" />
          </div>
          <figcaption className="flex items-center justify-between gap-4 border-t border-line px-5 py-3">
            <span className="font-semibold">{project.titulo}</span>
            <button type="button" onClick={() => dialogo.current?.close()} className="btn btn-line btn-sm" autoFocus>
              Cerrar
            </button>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}

interface TarjetaProps {
  project: Proyecto;
  index: number;
  progress: MotionValue<number>;
  actualizado: string | null;
  onAbrir: () => void;
}

/**
 * Cada proyecto es una tarjeta que se queda pegada arriba (position: sticky) y la siguiente cae encima.
 * Con el progreso del scroll, las que quedan debajo se encogen y se oscurecen un poco.
 */
function TarjetaProyecto({ project, index, progress, actualizado, onAbrir }: TarjetaProps) {
  const reduce = useReducedMotion() ?? false;
  const esUltima = index === TOTAL - 1;
  const inicio = index / TOTAL;
  const escalaFinal = reduce ? 1 : 1 - (TOTAL - 1 - index) * 0.04;
  const scale = useTransform(progress, [inicio, 1], [1, escalaFinal]);
  const sombra = useTransform(progress, [inicio, 1], [0, esUltima || reduce ? 0 : 0.55]);

  // Cuando la tarjeta siguiente ya la tapa, la desactivamos (inert) para que el teclado y los lectores
  // de pantalla no entren en enlaces que no se ven.
  const [cubierta, setCubierta] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setCubierta(!esUltima && v >= (index + 1) / (TOTAL - 1) - 0.02));

  return (
    <div
      id={`proyecto-${project.id}`}
      className="sticky top-0 flex h-screen items-start justify-center px-3 sm:px-8"
      style={{ paddingTop: `calc(84px + ${index * 16}px)` }}
    >
      <motion.article
        aria-labelledby={`t-${project.id}`}
        inert={cubierta}
        style={{ scale, transformOrigin: "top center" }}
        className="relative flex h-[min(82svh,660px)] w-full max-w-[1100px] flex-col overflow-hidden rounded-card bg-paper text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.85)] ring-1 ring-ink/10"
      >
        <header className="flex items-center justify-between gap-3 border-b border-ink/10 px-5 py-3">
          <span className="inline-flex items-center gap-3 text-[0.9rem] font-semibold text-ink/70">
            {PALOS[project.palo].nombre}
            {project.estilo === "cartas" && <PalosDeLaBaraja />}
          </span>
          <span className={`inline-flex items-center gap-2 text-[0.85rem] font-semibold before:size-2 before:rounded-full before:content-[''] ${PUNTO_ESTADO[project.estado]}`}>
            {project.estado}
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <ZonaImagen project={project} onAbrir={onAbrir} />

          {/* @container: el título se dimensiona con el ancho real de esta columna, así el nombre siempre cabe */}
          <div className="@container relative flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-5 lg:gap-4 lg:p-8 [&>*]:shrink-0">
            <h3 id={`t-${project.id}`} className="font-display text-[clamp(1.5rem,8cqw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              {project.titulo}
            </h3>
            <p className="text-[0.95rem] leading-snug text-ink/80 max-lg:line-clamp-3 lg:text-[1.02rem] lg:leading-relaxed">{project.resumen}</p>
            <ul className="grid gap-2 text-[0.9rem] leading-snug lg:text-[0.95rem] max-sm:[&>li:nth-child(n+3)]:hidden">
              {project.logros.map((l) => (
                <li key={l} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-3 shrink-0 rounded-full bg-accent" />
                  {l}
                </li>
              ))}
            </ul>
            <ul aria-label="Tecnologías" className="flex flex-wrap gap-1.5 pt-1 max-sm:hidden">
              {project.tecnologias.slice(0, 6).map((t) => (
                <li key={t} className="rounded-md bg-ink/[0.07] px-2.5 py-1 text-[0.78rem] font-medium text-ink/75">
                  {t}
                </li>
              ))}
              {project.tecnologias.length > 6 && (
                <li className="rounded-md bg-ink/[0.07] px-2.5 py-1 text-[0.78rem] font-medium text-ink/75">+{project.tecnologias.length - 6}</li>
              )}
            </ul>
            {/* Acción principal: abrir la app si está en línea; si no, ver el código */}
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
              {project.demo && (
                <a className="btn btn-accent btn-sm" href={project.demo} target="_blank" rel="noopener noreferrer">
                  Abrir la app
                </a>
              )}
              {project.visibilidad === "publico" && project.repo ? (
                <a
                  className={`btn btn-sm ${project.demo ? "btn-paper" : "btn-accent"}`}
                  href={urlCodigo(project)!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver código
                </a>
              ) : (
                <span className="rounded-md border border-ink/15 px-3 py-2 text-[0.85rem] font-semibold text-ink/65">
                  {project.visibilidad === "privado" ? "Código privado" : "Código aún no publicado"}
                </span>
              )}
              {actualizado && <span className="text-[0.82rem] text-ink/60">Actualizado {actualizado}</span>}
            </div>
          </div>
        </div>

        <motion.div aria-hidden="true" style={{ opacity: sombra }} className="pointer-events-none absolute inset-0 bg-canvas" />
      </motion.article>
    </div>
  );
}

export function Projects() {
  const mesa = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mesa, offset: ["start start", "end end"] });
  const repos = useRepos();
  const fechas = repos.estado === "listo" ? new Map(repos.repos.map((r) => [r.name, r.pushed_at])) : null;
  const [enVisor, setEnVisor] = useState<Proyecto | null>(null);

  return (
    <section id="proyectos" aria-labelledby="t-proyectos">
      <div className="mx-auto max-w-[1180px] px-4 pb-10 pt-[clamp(64px,9vw,112px)] sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <h2 id="t-proyectos" className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-none tracking-[-0.02em]">
            Proyectos
          </h2>
          <p className="max-w-[46ch] text-muted">Ordenados de más completo a más sencillo. Pulsa una imagen para verla en grande.</p>
        </div>
        <ul className="mt-7 flex flex-wrap gap-2">
          {PROYECTOS.map((p) => (
            <li key={p.id}>
              <a
                href={`#proyecto-${p.id}`}
                className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-[0.95rem] font-semibold no-underline transition-colors hover:border-accent-soft hover:text-accent-soft"
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
            onAbrir={() => setEnVisor(p)}
          />
        ))}
      </div>

      <Visor project={enVisor} onCerrar={() => setEnVisor(null)} />
    </section>
  );
}
