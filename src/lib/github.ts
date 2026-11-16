// Lee los repositorios públicos desde la API de GitHub. La respuesta se guarda en memoria y 10 minutos en sessionStorage
// para no gastar el límite de peticiones y para que varias tarjetas compartan una sola llamada.

export interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  fork: boolean;
}

const TTL = 10 * 60 * 1000;
let enCurso: Promise<Repo[]> | null = null;

async function pedir(usuario: string): Promise<Repo[]> {
  const clave = `gh-repos:${usuario}`;
  try {
    const guardado = JSON.parse(sessionStorage.getItem(clave) ?? "null") as { t: number; datos: Repo[] } | null;
    if (guardado && Date.now() - guardado.t < TTL) return guardado.datos;
  } catch {
    /* sin almacenamiento: seguimos */
  }
  const r = await fetch(`https://api.github.com/users/${usuario}/repos?per_page=100&sort=pushed`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!r.ok) throw new Error(`GitHub respondió ${r.status}`);
  const datos = ((await r.json()) as Repo[]).filter((x) => !x.fork);
  try {
    sessionStorage.setItem(clave, JSON.stringify({ t: Date.now(), datos }));
  } catch {
    /* ignorar */
  }
  return datos;
}

export function cargarRepos(usuario: string): Promise<Repo[]> {
  enCurso ??= pedir(usuario).catch((e) => {
    enCurso = null; // permite reintentar si falló
    throw e;
  });
  return enCurso;
}

const UNIDADES: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

/** Tiempo relativo en español: "hace 3 días". */
export function hace(fechaIso: string): string {
  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
  const seg = (new Date(fechaIso).getTime() - Date.now()) / 1000;
  for (const [unidad, tam] of UNIDADES) if (Math.abs(seg) >= tam) return rtf.format(Math.round(seg / tam), unidad);
  return "ahora mismo";
}
