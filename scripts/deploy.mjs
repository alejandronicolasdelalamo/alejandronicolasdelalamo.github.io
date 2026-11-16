// Compila el sitio y publica la carpeta out/ en la rama gh-pages del repositorio `origin`.
// Uso: npm run deploy
import { execSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const ejecutar = (comando, opciones = {}) => execSync(comando, { stdio: "inherit", ...opciones });
const leer = (comando) => execSync(comando, { encoding: "utf8" }).trim();

const origen = leer("git remote get-url origin");
const out = path.resolve("out");

console.log("Compilando…");
ejecutar("npm run build");
if (!existsSync(out)) throw new Error("No se generó la carpeta out/.");

// .nojekyll evita que GitHub Pages ignore las carpetas que empiezan por guion bajo (como _next).
writeFileSync(path.join(out, ".nojekyll"), "");

// Se crea un repositorio nuevo dentro de out/ solo con lo que hay que publicar.
rmSync(path.join(out, ".git"), { recursive: true, force: true });
ejecutar("git init -q -b gh-pages", { cwd: out });
ejecutar("git add -A", { cwd: out });
ejecutar('git commit -q -m "Publicar el portfolio"', { cwd: out });
ejecutar(`git push -f "${origen}" gh-pages`, { cwd: out });
rmSync(path.join(out, ".git"), { recursive: true, force: true });

console.log("Publicado en la rama gh-pages.");
