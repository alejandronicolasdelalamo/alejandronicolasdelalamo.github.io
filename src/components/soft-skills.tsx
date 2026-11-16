import { PERFIL } from "@/data/portfolio";

/** Habilidades personales, tal y como aparecen en mi CV. */
export function SoftSkills() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
      <h3 className="text-[1.05rem] font-bold text-accent-soft">Habilidades personales</h3>
      <ul className="flex flex-wrap gap-2">
        {PERFIL.habilidades.map((h) => (
          <li key={h} className="rounded-md border border-line px-3 py-1.5 text-[0.9rem] font-medium">
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}
