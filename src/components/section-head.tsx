/** Cabecera de sección: título a la izquierda y una línea de apoyo opcional a la derecha. */
export function SectionHead({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
      <h2 id={id} className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-none tracking-[-0.02em]">
        {title}
      </h2>
      {children && <p className="max-w-[46ch] text-muted">{children}</p>}
    </div>
  );
}
