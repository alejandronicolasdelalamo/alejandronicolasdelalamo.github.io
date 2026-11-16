"use client";

import { useState } from "react";
import { PALOS, PERFIL, PROYECTOS } from "@/data/portfolio";
import { hace } from "@/lib/github";
import { useRepos } from "@/hooks/use-repos";

const quitarProtocolo = (url: string) => url.replace(/^https?:\/\//, "");

function Copiar({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* sin portapapeles: la URL sigue visible para copiarla a mano */
    }
  }

  return (
    <button type="button" onClick={copiar} aria-label={`Copiar ${texto}`} className="min-h-11 min-w-[5.5rem] rounded-card border-2 border-line px-3 text-[0.9rem] font-semibold transition-colors hover:border-accent-soft hover:text-accent-soft">
      <span aria-live="polite">{copiado ? "Copiado" : "Copiar"}</span>
    </button>
  );
}

interface FilaProps {
  nombre: React.ReactNode;
  url: string | null;
  nota?: string;
}

/** Una fila: nombre, la URL completa (o el motivo por el que no hay) y un botón para copiarla. */
function Fila({ nombre, url, nota }: FilaProps) {
  return (
    <li className="grid items-center gap-x-6 gap-y-1 border-b-2 border-line py-3.5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto]">
      <span className="font-display text-[1.1rem] font-bold">{nombre}</span>
      {url ? (
        <a href={url} target={url.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer" className="min-w-0 break-all text-[0.95rem] text-accent-soft underline-offset-4 hover:underline">
          {quitarProtocolo(url)}
        </a>
      ) : (
        <span className="text-[0.95rem] text-muted">{nota}</span>
      )}
      {url ? <Copiar texto={url} /> : <span className="hidden sm:block" />}
    </li>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mb-12 last:mb-0">
      <h3 className="mb-2 font-display text-[1.35rem] font-extrabold text-accent-soft">{titulo}</h3>
      <ul className="border-t-2 border-line">{children}</ul>
    </div>
  );
}

const OCULTOS = new Set<string>([...PROYECTOS.flatMap((p) => (p.repo ? [p.repo] : [])), ...PERFIL.ocultarRepos]);
const SIN_URL: Record<string, string> = { privado: "Repositorio privado", local: "Todavía sin repositorio público" };

export function Links() {
  const datos = useRepos();
  const otros = datos.estado === "listo" ? datos.repos.filter((r) => !OCULTOS.has(r.name)).slice(0, 6) : [];

  return (
    <div>
      <Grupo titulo="Mis proyectos">
        {PROYECTOS.map((p) => {
          const palo = PALOS[p.palo];
          return (
            <Fila
              key={p.id}
              nombre={
                <span>
                  {p.titulo}
                  <span className="mt-0.5 block text-[0.82rem] font-normal text-muted">{palo.nombre}</span>
                </span>
              }
              url={p.visibilidad === "publico" && p.repo ? `${PERFIL.github}/${p.repo}` : null}
              nota={SIN_URL[p.visibilidad]}
            />
          );
        })}
      </Grupo>

      <Grupo titulo="Más repositorios en GitHub">
        {datos.estado === "cargando" &&
          [0, 1, 2].map((i) => (
            <li key={i} className="border-b-2 border-line py-4">
              <div className="h-5 w-3/5 animate-pulse bg-surface-2" />
            </li>
          ))}
        {datos.estado === "error" && (
          <li className="border-b-2 border-line py-4 text-muted">
            No he podido leer GitHub ahora mismo. Mira mis repositorios en{" "}
            <a className="text-accent-soft underline underline-offset-4" href={PERFIL.github} target="_blank" rel="noopener noreferrer">mi perfil</a>.
          </li>
        )}
        {datos.estado === "listo" &&
          otros.map((r) => (
            <Fila
              key={r.name}
              nombre={
                <span>
                  {r.name}
                  <span className="mt-0.5 block text-[0.82rem] font-normal text-muted">
                    {[r.language, `actualizado ${hace(r.pushed_at)}`].filter(Boolean).join(", ")}
                  </span>
                </span>
              }
              url={r.html_url}
            />
          ))}
      </Grupo>

      <Grupo titulo="Perfiles, CV y certificado">
        <Fila nombre="GitHub" url={PERFIL.github} />
        <Fila nombre="LinkedIn" url={PERFIL.linkedin} />
        <Fila nombre="Certificado Full Stack de 4Geeks" url={PERFIL.certificado4Geeks} />
        <li className="grid items-center gap-x-6 gap-y-1 border-b-2 border-line py-3.5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto]">
          <span className="font-display text-[1.1rem] font-bold">Mi CV</span>
          <span className="text-[0.95rem] text-muted">Documento PDF de una página</span>
          <a className="btn btn-accent btn-sm" href={PERFIL.cv} download>Descargar</a>
        </li>
      </Grupo>
    </div>
  );
}
