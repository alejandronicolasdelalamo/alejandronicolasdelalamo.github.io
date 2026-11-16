"use client";

import { useState } from "react";
import { PERFIL } from "@/data/portfolio";

export function Contact() {
  const [aviso, setAviso] = useState("");

  async function copiar() {
    let mensaje = "Correo copiado";
    try {
      await navigator.clipboard.writeText(PERFIL.email);
    } catch {
      mensaje = "No se pudo copiar. Selecciónalo y cópialo a mano.";
    }
    setAviso(mensaje);
    setTimeout(() => setAviso(""), 2400);
  }

  return (
    <section id="contacto" aria-labelledby="t-contacto" className="bg-accent-soft py-[clamp(72px,10vw,128px)] text-ink">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        <h2 id="t-contacto" className="max-w-[18ch] font-display text-[clamp(1.9rem,6.4vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
          Busco mis primeras prácticas como desarrollador en Madrid o en remoto.
        </h2>
        <p className="mt-5 max-w-[46ch] text-[1.2rem]">
          Si tienes una vacante, un proyecto o una duda sobre alguno de los que ves aquí, escríbeme.
        </p>
        <a
          href={`mailto:${PERFIL.email}`}
          className="mt-8 inline-block max-w-full break-all font-display text-[clamp(1.1rem,4.6vw,2.2rem)] sm:break-normal font-extrabold leading-tight tracking-[-0.02em] text-ink underline decoration-4 underline-offset-[7px] transition-[text-decoration-color] hover:decoration-accent-deep"
        >
          {PERFIL.email}
        </a>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="btn btn-ink" onClick={copiar}>Copiar correo</button>
          <a className="btn btn-paper" href={PERFIL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn btn-paper" href={PERFIL.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <p role="status" aria-live="polite" className={`fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-md border border-accent-soft/60 bg-ink px-[18px] py-3 font-semibold text-paper shadow-lg transition-opacity ${aviso ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        {aviso}
      </p>
    </section>
  );
}
