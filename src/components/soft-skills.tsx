import { PERFIL } from "@/data/portfolio";

/** Idiomas y habilidades personales, tal y como aparecen en mi CV. */
export function SoftSkills() {
  return (
    <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
      <div>
        <h3 className="font-display text-[1.25rem] font-extrabold text-accent-soft">Idiomas</h3>
        <ul className="mt-4 grid gap-2">
          {PERFIL.idiomas.map(({ idioma, nivel }) => (
            <li key={idioma} className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
              <span className="font-semibold">{idioma}</span>
              <span className="text-muted">{nivel}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-display text-[1.25rem] font-extrabold text-accent-soft">Habilidades personales</h3>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {PERFIL.habilidades.map((h) => (
            <li key={h} className="rounded-card border-2 border-line px-3 py-1.5 text-[0.95rem] font-semibold">
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
