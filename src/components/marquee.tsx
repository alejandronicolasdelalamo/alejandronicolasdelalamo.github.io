"use client";

import { useState } from "react";

const TECNOLOGIAS = ["Kotlin", "Java", "React", "Spring Boot", "Jetpack Compose", "TypeScript", "Python", "Flask", "MySQL", "Lua", "Tailwind", "Docker"];

function Fila() {
  return TECNOLOGIAS.map((t) => (
    <li key={t} className="flex items-center gap-6">
      <span>{t}</span>
      <span className="size-3 bg-ink" />
    </li>
  ));
}

/**
 * Banda de tecnologías. La cinta es solo adorno (se oculta a los lectores de pantalla),
 * pero se mueve sola, así que lleva un botón para pausarla.
 */
export function Marquee() {
  const [pausada, setPausada] = useState(false);

  return (
    <div className="relative">
      <div aria-hidden="true" className="-rotate-1 scale-[1.03] overflow-hidden border-y-2 border-ink bg-accent py-4 text-ink shadow-[0_8px_0_var(--color-shade)]">
        <ul
          className="flex w-max animate-marquee gap-6 font-display text-[clamp(1.6rem,4vw,2.6rem)] font-extrabold leading-none"
          style={{ animationPlayState: pausada ? "paused" : "running" }}
        >
          <Fila />
          <Fila />
        </ul>
      </div>
      <button
        type="button"
        aria-pressed={pausada}
        aria-label="Pausar la animación de tecnologías"
        onClick={() => setPausada((p) => !p)}
        className="absolute bottom-[-18px] right-4 z-10 grid size-11 place-items-center border-2 border-ink bg-paper text-ink shadow-[3px_3px_0_var(--color-shade)] transition-transform hover:-translate-y-0.5 sm:right-8"
      >
        <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true" focusable="false">
          {pausada ? <path d="M7 4l13 8-13 8z" /> : <path d="M6 4h4v16H6zM14 4h4v16h-4z" />}
        </svg>
      </button>
    </div>
  );
}
