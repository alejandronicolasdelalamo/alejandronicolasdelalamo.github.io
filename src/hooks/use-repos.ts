"use client";

import { useEffect, useState } from "react";
import { cargarRepos, type Repo } from "@/lib/github";
import { PERFIL } from "@/data/portfolio";

export type EstadoRepos = { estado: "cargando" } | { estado: "error" } | { estado: "listo"; repos: Repo[] };

export function useRepos(): EstadoRepos {
  const [valor, setValor] = useState<EstadoRepos>({ estado: "cargando" });

  useEffect(() => {
    let activo = true;
    cargarRepos(PERFIL.usuarioGithub)
      .then((repos) => activo && setValor({ estado: "listo", repos }))
      .catch(() => activo && setValor({ estado: "error" }));
    return () => {
      activo = false;
    };
  }, []);

  return valor;
}
