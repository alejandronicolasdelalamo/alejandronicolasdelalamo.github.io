import Image from "next/image";
import { PERFIL } from "@/data/portfolio";

/** Retrato enmarcado. Si todavía no hay foto, se ven las iniciales. */
function Retrato() {
  return (
    <figure className="mx-auto w-full max-w-[320px] md:mx-0">
      <div className="relative aspect-[4/5] -rotate-2 rounded-card border-2 border-ink bg-paper p-3 shadow-[8px_8px_0_var(--color-shade)] transition-transform duration-500 hover:rotate-0">
        <div className="relative size-full overflow-hidden border-2 border-ink bg-surface-2">
          {PERFIL.foto ? (
            <Image src={PERFIL.foto} alt={PERFIL.fotoAlt} fill sizes="320px" className="object-cover" priority />
          ) : (
            <div
              aria-hidden="true"
              className="grid size-full place-items-center"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent 0 9px, rgb(139 92 246 / .35) 9px 11px), repeating-linear-gradient(-45deg, transparent 0 9px, rgb(139 92 246 / .35) 9px 11px)",
              }}
            >
              <span className="border-2 border-accent-soft bg-surface px-5 py-3 font-display text-5xl font-extrabold text-accent-soft">AN</span>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}

export function Profile() {
  const [intro, ...resto] = PERFIL.historia;
  return (
    <div className="grid items-start gap-10 md:grid-cols-[320px_minmax(0,1fr)] md:gap-16">
      <Retrato />
      <div>
        <p className="max-w-[60ch] text-[1.25rem] leading-relaxed text-paper">{intro}</p>
        <div className="mt-5 grid max-w-[60ch] gap-4 leading-relaxed text-[#dcd8ee]">
          {resto.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <ul className="mt-7 flex flex-wrap gap-2.5">
          {PERFIL.datos.map((d) => (
            <li key={d} className="rounded-card border-2 border-line px-3.5 py-1.5 text-[0.95rem] font-semibold">
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3.5">
          <a className="btn btn-accent" href={PERFIL.cv} download>Descargar CV en PDF</a>
          <a className="btn btn-line" href={PERFIL.linkedin} target="_blank" rel="noopener noreferrer">Ver LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
