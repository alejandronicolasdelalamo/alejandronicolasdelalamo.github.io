"use client";

import { useState } from "react";
import { PALOS, PERFIL, PROYECTOS, type Visibilidad } from "@/data/portfolio";

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
    <button
      type="button"
      onClick={copiar}
      aria-label={`Copiar ${texto}`}
      className="min-h-11 min-w-[5.5rem] rounded-md border border-line px-3 text-[0.9rem] font-semibold transition-colors hover:border-accent-soft hover:text-accent-soft"
    >
      <span aria-live="polite">{copiado ? "Copiado" : "Copiar"}</span>
    </button>
  );
}

interface FilaProps {
  nombre: string;
  detalle?: string;
  url: string | null;
  nota?: string;
}

/** Una fila: nombre, la URL completa (o el motivo por el que no hay) y un botón para copiarla. */
function Fila({ nombre, detalle, url, nota }: FilaProps) {
  return (
    <li className="grid items-center gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto]">
      <span className="font-semibold">
        {nombre}
        {detalle && <span className="mt-0.5 block text-[0.82rem] font-normal text-muted">{detalle}</span>}
      </span>
      {url ? (
        <a
          href={url}
          target={url.startsWith("/") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="min-w-0 break-all text-[0.95rem] text-accent-soft underline-offset-4 hover:underline"
        >
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
    <div>
      <h3 className="mb-2 text-[1.05rem] font-bold text-accent-soft">{titulo}</h3>
      <ul className="border-t border-line">{children}</ul>
    </div>
  );
}

const SIN_URL: Record<Visibilidad, string> = {
  publico: "",
  privado: "Código en un repositorio privado",
  local: "Código aún no publicado",
};

export function Links() {
  return (
    <div className="grid gap-12">
      <Grupo titulo="Proyectos">
        {PROYECTOS.map((p) => (
          <Fila
            key={p.id}
            nombre={p.titulo}
            detalle={PALOS[p.palo].nombre}
            url={p.visibilidad === "publico" && p.repo ? `${PERFIL.github}/${p.repo}` : null}
            nota={SIN_URL[p.visibilidad]}
          />
        ))}
      </Grupo>

      <Grupo titulo="Perfiles, CV y certificado">
        <Fila nombre="GitHub" detalle="Todos mis repositorios" url={PERFIL.github} />
        <Fila nombre="LinkedIn" url={PERFIL.linkedin} />
        <Fila nombre="Certificado Full Stack" detalle="4Geeks Academy" url={PERFIL.certificado4Geeks} />
        <li className="grid items-center gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto]">
          <span className="font-semibold">Currículum</span>
          <span className="text-[0.95rem] text-muted">PDF de una página</span>
          <a className="btn btn-accent btn-sm" href={PERFIL.cv} download>
            Descargar
          </a>
        </li>
      </Grupo>
    </div>
  );
}
