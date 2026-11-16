# Portfolio de Alejandro Nicolás

Web personal con mis proyectos, mi trayectoria y mi CV. Hecha con Next.js (exportación estática), React, Tailwind CSS y Motion.

**Web publicada:** https://alejandronicolasdelalamo.github.io

## Cómo se usa

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # genera la carpeta out/ (HTML estático)
npm run deploy   # compila y publica out/ en la rama gh-pages
```

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Datos, textos, historia, proyectos y trayectoria | `src/data/portfolio.ts` |
| Colores y fuentes | `src/app/globals.css` y `src/app/layout.tsx` |
| Capturas de los proyectos | `public/projects/` (WebP) |
| Foto y CV | `public/yo.webp` y `public/CV_Alejandro_Nicolas_del_Alamo.pdf` |

Para añadir un proyecto, copia uno de la lista `PROYECTOS` en `src/data/portfolio.ts` y cambia sus campos. Las tarjetas, la matriz de tecnologías y la lista de enlaces se actualizan solas.

## Publicación

GitHub Pages sirve la rama `gh-pages`. El script `scripts/deploy.mjs` compila el sitio y sube el contenido de `out/` a esa rama.
