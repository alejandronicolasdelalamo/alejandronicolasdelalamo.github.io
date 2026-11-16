import Image from "next/image";
import { PALOS, type Proyecto } from "@/data/portfolio";

/** Clases de encuadre de una imagen de proyecto según su ajuste y su posición. */
export function claseImagen(img: NonNullable<Proyecto["imagen"]>, relleno = ""): string {
  if (img.ajuste === "contain") return `object-contain ${relleno}`;
  return img.posicion === "arriba" ? "object-cover object-left-top" : "object-cover object-center";
}

/** Hueco para un proyecto que todavía no tiene captura: su nombre sobre el color del proyecto. */
export function SinImagen({ project }: { project: Proyecto }) {
  return (
    <div className="absolute inset-0 grid place-items-center p-4 text-center font-display text-2xl font-extrabold text-paper" style={{ background: project.fondo }}>
      {project.titulo}
    </div>
  );
}

/** Tarjeta de vista previa del abanico de la portada. Todo se mide con --cw (ancho de la tarjeta). */
export function PreviewCard({ project }: { project: Proyecto }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg border border-accent/45 bg-surface text-paper shadow-[0_22px_44px_-18px_rgb(139_92_246/0.6)]">
      <div className="absolute inset-x-0 top-0 h-[66%] overflow-hidden border-b border-line" style={{ background: project.fondo }}>
        {project.imagen ? (
          <Image src={project.imagen.src} alt="" fill sizes="170px" priority className={claseImagen(project.imagen, "p-1")} />
        ) : (
          <SinImagen project={project} />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 px-[7%] pb-[5%] pt-[4%]">
        <p className="text-[calc(var(--cw)*0.065)] leading-tight text-muted">{PALOS[project.palo].nombre}</p>
        <p className="mt-[2%] font-display text-[calc(var(--cw)*0.088)] font-bold leading-[1.1] tracking-tight">{project.titulo}</p>
      </div>
    </div>
  );
}
