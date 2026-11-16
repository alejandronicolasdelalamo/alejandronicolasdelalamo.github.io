import { PROYECTOS, STACK } from "@/data/portfolio";

/**
 * Tecnologías por área. Cada una enseña en qué proyectos la he usado, que es la prueba de que la domino.
 */
export function Skills() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {STACK.map((g) => (
        <section key={g.grupo} aria-labelledby={`g-${g.grupo}`} className="rounded-card border border-line bg-surface p-6">
          <h3 id={`g-${g.grupo}`} className="text-[1.05rem] font-bold text-accent-soft">
            {g.grupo}
          </h3>
          <ul className="mt-4 grid gap-3">
            {g.items.map((tec) => {
              const usos = PROYECTOS.filter((p) => p.tecnologias.includes(tec));
              return (
                <li key={tec} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-line pb-3 last:border-0 last:pb-0">
                  <span className="font-semibold">{tec}</span>
                  <span className="text-[0.85rem] text-muted">{usos.length ? usos.map((p) => p.corto).join(", ") : "Formación"}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
