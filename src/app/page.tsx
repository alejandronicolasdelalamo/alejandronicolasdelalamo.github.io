import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Links } from "@/components/links";
import { Profile } from "@/components/profile";
import { Projects } from "@/components/projects";
import { SectionHead } from "@/components/section-head";
import { SiteHeader } from "@/components/site-header";
import { Skills } from "@/components/skills";
import { SoftSkills } from "@/components/soft-skills";
import { Timeline } from "@/components/timeline";
import { PERFIL } from "@/data/portfolio";

const SECCION = "py-[clamp(72px,9vw,120px)]";
const BANDA = "border-y border-line bg-surface";
const CONTENEDOR = "mx-auto max-w-[1180px] px-4 sm:px-8";

export default function Home() {
  return (
    <>
      <SiteHeader />
      {/* overflow-x-clip: el abanico de la portada entra volando desde fuera; clip (no hidden) no rompe el sticky */}
      <main id="inicio" className="overflow-x-clip">
        <Hero />

        <section id="perfil" aria-labelledby="t-perfil" className={`${SECCION} ${BANDA}`}>
          <div className={CONTENEDOR}>
            <SectionHead id="t-perfil" title="Perfil" />
            <Profile />
          </div>
        </section>

        <Projects />

        <section id="trayectoria" aria-labelledby="t-tray" className={`${SECCION} ${BANDA}`}>
          <div className={CONTENEDOR}>
            <SectionHead id="t-tray" title="Trayectoria">
              De lo más reciente a lo más antiguo, con las fechas de mi CV.
            </SectionHead>
            <Timeline />
          </div>
        </section>

        <section id="dominio" aria-labelledby="t-dominio" className={SECCION}>
          <div className={CONTENEDOR}>
            <SectionHead id="t-dominio" title="Qué domino">
              Tecnologías que he usado en proyectos reales, con el proyecto donde se puede ver cada una.
            </SectionHead>
            <Skills />
            <SoftSkills />
          </div>
        </section>

        <section id="enlaces" aria-labelledby="t-enlaces" className={`${SECCION} ${BANDA}`}>
          <div className={CONTENEDOR}>
            <SectionHead id="t-enlaces" title="Enlaces">
              Las direcciones de mis proyectos y perfiles, con un botón para copiarlas.
            </SectionHead>
            <Links />
          </div>
        </section>

        <Contact />
      </main>

      <footer className="bg-ink text-[0.9rem] text-muted">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 sm:px-8">
          <span>© {new Date().getFullYear()} {PERFIL.nombreCompleto}</span>
          <span>
            Código de esta web en{" "}
            <a className="text-accent-soft underline-offset-4 hover:underline" href={`${PERFIL.github}/alejandronicolasdelalamo.github.io`} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
