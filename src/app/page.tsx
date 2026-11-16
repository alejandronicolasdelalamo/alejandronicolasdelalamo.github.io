import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Links } from "@/components/links";
import { Marquee } from "@/components/marquee";
import { Profile } from "@/components/profile";
import { Projects } from "@/components/projects";
import { SectionHead } from "@/components/section-head";
import { SiteHeader } from "@/components/site-header";
import { SoftSkills } from "@/components/soft-skills";
import { StackMatrix } from "@/components/stack-matrix";
import { Timeline } from "@/components/timeline";
import { PERFIL } from "@/data/portfolio";

const SECCION = "py-[clamp(64px,9vw,112px)]";
const BANDA = "border-y border-line bg-surface";
const CONTENEDOR = "mx-auto max-w-[1180px] px-4 sm:px-8";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="inicio">
        <Hero />
        <Marquee />

        <section id="perfil" aria-labelledby="t-perfil" className={SECCION}>
          <div className={CONTENEDOR}>
            <SectionHead id="t-perfil" title="Perfil" />
            <Profile />
          </div>
        </section>

        <Projects />

        <section id="trayectoria" aria-labelledby="t-tray" className={`${SECCION} ${BANDA}`}>
          <div className={CONTENEDOR}>
            <SectionHead id="t-tray" title="Trayectoria">
              Estudios, trabajo y proyectos, con las fechas de mi CV.
            </SectionHead>
            <Timeline />
          </div>
        </section>

        <section id="dominio" aria-labelledby="t-dominio" className={SECCION}>
          <div className={CONTENEDOR}>
            <SectionHead id="t-dominio" title="Qué domino">
              Cada fila es una tecnología y cada columna un proyecto. El cuadrado violeta marca dónde la he usado.
            </SectionHead>
            <StackMatrix />
            <SoftSkills />
          </div>
        </section>

        <section id="enlaces" aria-labelledby="t-enlaces" className={`${SECCION} ${BANDA}`}>
          <div className={CONTENEDOR}>
            <SectionHead id="t-enlaces" title="Enlaces">
              Las direcciones de los proyectos que he hecho, con un botón para copiarlas.
            </SectionHead>
            <Links />
          </div>
        </section>

        <Contact />
      </main>

      <footer className="bg-ink text-[0.9rem] text-muted">
        <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-x-6 gap-y-2 px-4 py-[22px] sm:px-8">
          <span>© {new Date().getFullYear()} {PERFIL.nombre}</span>
          <span>Hecho con Next.js, Tailwind y Motion.</span>
        </div>
      </footer>
    </>
  );
}
