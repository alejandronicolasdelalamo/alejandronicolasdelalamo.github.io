import type { SuitName } from "@/data/portfolio";

/** Los cuatro palos de la baraja. Se declaran una vez y se usan con <Suit name="..."/>. */
export function SuitDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <symbol id="s-heart" viewBox="0 0 24 24">
        <path d="M12 22C6 17.500 2 13.800 2 9.200a5 5 0 0 1 10-1.600A5 5 0 0 1 22 9.200c0 4.600-4 8.300-10 12.800z" />
      </symbol>
      <symbol id="s-diamond" viewBox="0 0 24 24">
        <path d="M12 1.500 21 12l-9 10.500L3 12z" />
      </symbol>
      <symbol id="s-spade" viewBox="0 0 24 24">
        <path d="M12 1.500C9.500 6.500 3 9.500 3 14.500a4.700 4.700 0 0 0 8.200 3.100C11 20 10.200 21.200 8.500 22.500h7c-1.700-1.300-2.500-2.500-2.700-4.900A4.700 4.700 0 0 0 21 14.500c0-5-6.500-8-9-13z" />
      </symbol>
      <symbol id="s-club" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4.600" />
        <circle cx="6.800" cy="14.200" r="4.600" />
        <circle cx="17.200" cy="14.200" r="4.600" />
        <path d="M12 12l-1.500 6-2 4.500h7l-2-4.500z" />
      </symbol>
    </svg>
  );
}

/** Icono de palo: mide 1em y toma el color del texto. */
export function Suit({ name, className = "" }: { name: SuitName; className?: string }) {
  return (
    <svg className={`size-[1em] shrink-0 fill-current ${className}`} aria-hidden="true" focusable="false">
      <use href={`#s-${name}`} />
    </svg>
  );
}

/** Color tradicional de cada palo sobre papel: rojos los corazones y diamantes, negros los demás. */
export function suitTone(name: SuitName): string {
  return name === "heart" || name === "diamond" ? "text-red" : "text-ink";
}
