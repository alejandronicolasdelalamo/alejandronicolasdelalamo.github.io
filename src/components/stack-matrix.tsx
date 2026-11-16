"use client";

import { Fragment, useState } from "react";
import { PROYECTOS, STACK } from "@/data/portfolio";

/**
 * Cada fila es una tecnología y cada columna un proyecto. El cuadrado dorado marca dónde la uso.
 * Pulsa (o enfoca con el teclado) el nombre de una tecnología o de un proyecto para resaltar su fila o columna.
 */
export function StackMatrix() {
  const [fila, setFila] = useState<string | null>(null);
  const [columna, setColumna] = useState<string | null>(null);

  const alternarFila = (tec: string) => setFila((actual) => (actual === tec ? null : tec));
  const alternarColumna = (id: string) => setColumna((actual) => (actual === id ? null : id));

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] border-collapse text-left">
        <caption className="sr-only">Tecnologías usadas en cada proyecto. Pulsa un nombre para resaltar su fila o columna.</caption>
        <thead>
          <tr>
            <td className="w-[34%]" />
            {PROYECTOS.map((p) => (
              <th key={p.id} scope="col" className="h-28 align-bottom text-center">
                <button
                  type="button"
                  aria-pressed={columna === p.id}
                  onClick={() => alternarColumna(p.id)}
                  className={`min-h-11 min-w-9 font-display text-[0.95rem] font-bold transition-colors hover:text-accent-soft ${columna === p.id ? "text-accent-soft" : "text-paper"}`}
                >
                  <span className="inline-block rotate-180 [writing-mode:vertical-rl]">{p.corto}</span>
                </button>
              </th>
            ))}
            <th scope="col" className="w-14 align-bottom text-right text-[0.9rem] font-medium text-muted">Total</th>
          </tr>
        </thead>
        <tbody>
          {STACK.map((g) => (
            <Fragment key={g.grupo}>
              <tr>
                <th scope="rowgroup" colSpan={PROYECTOS.length + 2} className="pb-1 pt-6 text-left font-display text-[1.15rem] font-extrabold text-accent-soft">
                  {g.grupo}
                </th>
              </tr>
              {g.items.map((tec) => {
                const usos = PROYECTOS.filter((p) => p.tecnologias.includes(tec)).length;
                return (
                  <tr key={tec} className={`border-t border-line transition-colors ${fila === tec ? "bg-surface-2" : ""}`}>
                    <th scope="row" className="py-0.5 pr-3 text-[0.98rem] font-semibold">
                      <button type="button" aria-pressed={fila === tec} onClick={() => alternarFila(tec)} className="min-h-11 w-full text-left hover:text-accent-soft">
                        {tec}
                      </button>
                    </th>
                    {PROYECTOS.map((p) => (
                      <td key={p.id} className={`text-center transition-colors ${columna === p.id ? "bg-surface-2/70" : ""}`}>
                        {p.tecnologias.includes(tec) ? (
                          <span className="mx-auto block size-4 bg-accent">
                            <span className="sr-only">Usada en {p.titulo}</span>
                          </span>
                        ) : (
                          <span aria-hidden="true" className="mx-auto block size-1.5 bg-line" />
                        )}
                      </td>
                    ))}
                    <td className="text-right text-[1rem] font-semibold tabular-nums text-accent-soft">{usos}</td>
                  </tr>
                );
              })}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
