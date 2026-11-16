import Image from "next/image";
import { PERFIL } from "@/data/portfolio";

/** Retrato. Si todavía no hay foto, se ven las iniciales. */
function Retrato() {
  return (
    <figure className="mx-auto w-full max-w-[260px] md:mx-0 md:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-2 shadow-[0_30px_60px_-30px_rgb(139_92_246/0.7)] ring-1 ring-accent/40">
        {PERFIL.foto ? (
          <Image src={PERFIL.foto} alt={PERFIL.fotoAlt} fill sizes="(min-width: 768px) 300px, 260px" className="object-cover" />
        ) : (
          <div aria-hidden="true" className="grid size-full place-items-center">
            <span className="rounded-md border-2 border-accent-soft px-5 py-3 font-display text-5xl font-extrabold text-accent-soft">AN</span>
          </div>
        )}
      </div>
    </figure>
  );
}

export function Profile() {
  const [intro, ...resto] = PERFIL.historia;
  return (
    <div className="grid items-start gap-10 md:grid-cols-[300px_minmax(0,1fr)] md:gap-16">
      <Retrato />
      <div>
        <p className="max-w-[58ch] text-[1.3rem] font-medium leading-relaxed text-paper">{intro}</p>
        <div className="mt-5 grid max-w-[62ch] gap-4 leading-relaxed text-[#d8d4ea]">
          {resto.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <dl className="mt-8 grid max-w-[62ch] gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
          {PERFIL.datos.map(({ etiqueta, valor }) => (
            <div key={etiqueta}>
              <dt className="text-[0.85rem] text-muted">{etiqueta}</dt>
              <dd className="mt-0.5 font-semibold">{valor}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <a className="btn btn-accent" href={PERFIL.cv} download>Descargar CV en PDF</a>
          <a className="btn btn-line" href={PERFIL.linkedin} target="_blank" rel="noopener noreferrer">Ver LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
