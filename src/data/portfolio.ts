// Todos los datos del portfolio viven aquí. Para añadir un proyecto, copia uno de PROYECTOS y cambia sus campos:
// las cartas, la matriz de tecnologías y la lista de enlaces se actualizan solas.

export type SuitName = "heart" | "diamond" | "spade" | "club";
export type PaloId = "android" | "backend" | "web" | "juegos";

/** publico: repositorio abierto en GitHub. privado: existe pero no se puede ver. local: aún no está en GitHub. */
export type Visibilidad = "publico" | "privado" | "local";

export interface Proyecto {
  id: string;
  titulo: string;
  corto: string; // nombre abreviado para cabeceras estrechas
  palo: PaloId;
  estado: "Publicado" | "En desarrollo";
  resumen: string;
  tecnologias: string[];
  visibilidad: Visibilidad;
  repo: string | null; // nombre del repositorio en GitHub
  imagen: { src: string; ancho: number; alto: number; ajuste: "cover" | "contain"; posicion: "arriba" | "centro" } | null;
  fondo: string; // color de fondo del hueco de la imagen
  destacado: boolean; // sale en el abanico de la portada
  estilo?: "cartas"; // solo Barajados, que es un juego de cartas: lleva los palos como adorno
}

const USUARIO = "alejandronicolasdelalamo";

export const PERFIL = {
  nombre: "Alejandro Nicolás",
  usuarioGithub: USUARIO,
  email: "alejandronicolasdelalamo@gmail.com",
  github: `https://github.com/${USUARIO}`,
  linkedin: "https://www.linkedin.com/in/alejandro-nicolas-del-alamo/",
  certificado4Geeks: "https://certificate.4geeks.com/f5d4e1b48e48de30a06580e04fce24cdd0f20010",
  cv: "/CV_Alejandro_Nicolas_del_Alamo.pdf",
  // Pon aquí la ruta de tu foto (por ejemplo "/yo.webp", guardada en la carpeta public/). Con null se ve un hueco con tus iniciales.
  foto: "/yo.webp" as string | null,
  fotoAlt: "Retrato de Alejandro Nicolás",
  datos: ["Madrid", "DAM en Ilerna, 2025 hasta hoy", "Inglés avanzado"],
  // Tu historia, un párrafo por elemento. Edítala con tus palabras.
  historia: [
    "Empecé a programar en 2024 con un bootcamp Full Stack en 4Geeks Academy, mientras terminaba el Bachillerato de Ciencias. Allí aprendí JavaScript, React y Python, y descubrí que lo mío es construir cosas que funcionen y se vean bien.",
    "Durante dos años compaginé estudios y trabajo: fui cajero y reponedor en Supeco/Carrefour y en Grupo Dia hasta julio de 2026. Me enseñó a organizarme, a tratar bien al cliente y a ser alguien de confianza cuando hay prisa.",
    "Ahora estudio el grado de Desarrollo de Aplicaciones Multiplataforma (DAM) en Ilerna y aprendo construyendo: una app de hábitos y notas, una sopa de letras en pixel art que funciona sin internet, un roguelite de cartas y mi proyecto de fin de grado, DevSpace, una red social para developers junior.",
    "Fuera del código me gustan el gimnasio, el fútbol y el baloncesto. Busco mis primeras prácticas en un equipo donde pueda seguir aprendiendo de gente que sepa más que yo.",
  ],
  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "Avanzado" },
  ],
  habilidades: ["Resolución de problemas", "Trabajo en equipo", "Aprendizaje rápido", "Comunicación efectiva", "Adaptabilidad"],
  // Repos públicos que no quiero enseñar en la lista de enlaces (los destacados ya se ocultan solos).
  ocultarRepos: ["alejandronicolasdelalamo", "4Geeks", "Trabajo_Subida_de_Nota", "Para-Ti-Mi-Amor", "ProyectoTrenAccesoDatos"],
} as const;

// Cada palo agrupa los proyectos por tipo de plataforma.
export const PALOS: Record<PaloId, { nombre: string }> = {
  android: { nombre: "Android" },
  backend: { nombre: "Backend" },
  web: { nombre: "Web" },
  juegos: { nombre: "Juegos" },
};

export const PROYECTOS: Proyecto[] = [
  {
    id: "onmi",
    titulo: "ONMi",
    corto: "ONMi",
    palo: "web",
    estado: "Publicado",
    resumen:
      "Notas, hábitos, proyectos, metas, ánimo y tiempo de enfoque en un solo sitio. Interfaz en React, API en Flask protegida y pruebas de principio a fin.",
    tecnologias: ["React", "TypeScript", "Tailwind", "Flask", "Python", "Docker", "GitHub Actions", "Git y GitHub"],
    visibilidad: "publico",
    repo: "onmi",
    imagen: { src: "/projects/onmi-dark.webp", ancho: 1100, alto: 688, ajuste: "cover", posicion: "arriba" },
    fondo: "#1b2433",
    destacado: true,
  },
  {
    id: "sopaventura",
    titulo: "SopaVentura",
    corto: "SopaVentura",
    palo: "juegos",
    estado: "Publicado",
    resumen:
      "Sopa de letras en pixel art que funciona sin internet. Mapa de islas, cinco modos de juego, pintar por números con conversor de foto a pixel art y modo para dos jugadores en directo. Todo el arte y el sonido se generan por código.",
    tecnologias: ["TypeScript", "PWA", "Supabase", "PostgreSQL", "Vitest", "Python", "Git y GitHub"],
    visibilidad: "privado",
    repo: "sopaventura",
    imagen: { src: "/projects/sopaventura.webp", ancho: 1000, alto: 880, ajuste: "cover", posicion: "centro" },
    fondo: "#1d1a38",
    destacado: true,
  },
  {
    id: "barajados",
    titulo: "Barajados",
    corto: "Barajados",
    palo: "juegos",
    estado: "En desarrollo",
    resumen:
      "Roguelite de cartas en pixel art. Juegas al Punto Banco contra metas cada vez más altas: ocho mesas, jefes con reglas propias, tienda entre rondas y 44 reliquias que cambian cómo se pagan las apuestas. Hecho con LÖVE y Lua.",
    tecnologias: ["Lua", "LÖVE2D"],
    visibilidad: "local",
    repo: null,
    imagen: { src: "/projects/barajados.webp", ancho: 1000, alto: 880, ajuste: "cover", posicion: "centro" },
    estilo: "cartas",
    fondo: "#1d1a38",
    destacado: true,
  },
  {
    id: "login",
    titulo: "Login con Compose",
    corto: "Login",
    palo: "android",
    estado: "Publicado",
    resumen:
      "Pantallas de acceso y bienvenida con Material 3. La bienvenida entra con animación, el correo se valida al escribir y el botón se bloquea unos segundos tras varios fallos. Funciona en móvil y tablet, en claro y oscuro.",
    tecnologias: ["Kotlin", "Jetpack Compose", "Material 3", "Git y GitHub"],
    visibilidad: "publico",
    repo: "Login_compose",
    imagen: { src: "/projects/login-compose.webp", ancho: 1000, alto: 880, ajuste: "cover", posicion: "centro" },
    fondo: "#1d1a38",
    destacado: true,
  },
  {
    id: "tres-ds",
    titulo: "Nintendo 3DS en Compose",
    corto: "3DS",
    palo: "android",
    estado: "Publicado",
    resumen:
      "Una consola 3DS dibujada solo con código, sin una imagen: pantallas, bisagra y botones. Se escala a cualquier pantalla. La diseñé antes en Figma.",
    tecnologias: ["Kotlin", "Jetpack Compose", "Material 3", "Figma", "Git y GitHub"],
    visibilidad: "publico",
    repo: "3DS",
    imagen: { src: "/projects/3ds.webp", ancho: 801, alto: 756, ajuste: "contain", posicion: "centro" },
    fondo: "#1c1c1e",
    destacado: false,
  },
  {
    id: "devspace",
    titulo: "DevSpace",
    corto: "DevSpace",
    palo: "web",
    estado: "En desarrollo",
    resumen:
      "Red social y bolsa de empleo para developers junior: perfil con portfolio y CV, ofertas, becas, eventos en un mapa y mensajes. Es mi proyecto de fin de grado, con API en Spring Boot, web y app Android.",
    tecnologias: ["Java", "Spring Boot", "MySQL", "JavaScript", "HTML y CSS", "Kotlin", "Python"],
    visibilidad: "local",
    repo: null,
    imagen: { src: "/projects/devspace.webp", ancho: 1000, alto: 880, ajuste: "cover", posicion: "centro" },
    fondo: "#1d1a38",
    destacado: false,
  },
];

// El nombre de cada tecnología debe coincidir con el que usan los proyectos de arriba.
export const STACK: { grupo: string; items: string[] }[] = [
  { grupo: "Móvil", items: ["Kotlin", "Jetpack Compose", "Material 3"] },
  { grupo: "Backend", items: ["Java", "Spring Boot", "MySQL", "PostgreSQL", "Supabase", "Python", "Flask"] },
  { grupo: "Web", items: ["JavaScript", "TypeScript", "React", "PWA", "Tailwind", "HTML y CSS"] },
  { grupo: "Juegos", items: ["Lua", "LÖVE2D"] },
  { grupo: "Herramientas", items: ["Git y GitHub", "GitHub Actions", "Docker", "Figma", "Vitest"] },
];

export type EstadoTray = "hecho" | "ahora" | "luego";
export const ESTADOS_TRAY: Record<EstadoTray, string> = { hecho: "Hecho", ahora: "En curso", luego: "Próximo" };

// Fechas tomadas de mi CV.
export const TRAYECTORIA: { estado: EstadoTray; fecha: string; titulo: string; lugar: string; texto: string }[] = [
  {
    estado: "hecho",
    fecha: "2023 a 2025",
    titulo: "Bachillerato de Ciencias",
    lugar: "IES Rey Pastor",
    texto: "Terminé el Bachillerato mientras empezaba a programar por mi cuenta.",
  },
  {
    estado: "hecho",
    fecha: "2024 a 2025",
    titulo: "Full Stack Software Developer",
    lugar: "4Geeks Academy, Madrid",
    texto: "Formación intensiva en programación Full Stack con JavaScript, React y Python. Certificado verificable en línea.",
  },
  {
    estado: "hecho",
    fecha: "Mayo de 2025 a julio de 2026",
    titulo: "Cajero y reponedor",
    lugar: "Supeco/Carrefour y Grupo Dia",
    texto: "Reposición, rotación y caja, además de abrir y cerrar la tienda y organizar los puestos. Compaginé el trabajo con los estudios.",
  },
  {
    estado: "ahora",
    fecha: "2025 hasta hoy",
    titulo: "Desarrollo de Aplicaciones Multiplataforma (DAM)",
    lugar: "Ilerna",
    texto: "Java, bases de datos con MySQL, Spring Boot, apps Android con Kotlin y Python.",
  },
  {
    estado: "ahora",
    fecha: "2026",
    titulo: "DevSpace, mi proyecto de fin de grado",
    lugar: "Proyecto propio",
    texto: "Una red social y bolsa de empleo para developers junior, con API, web y app Android.",
  },
  {
    estado: "luego",
    fecha: "Primavera de 2027",
    titulo: "Prácticas en empresa",
    lugar: "Pendiente de confirmar",
    texto: "500 horas de prácticas del ciclo.",
  },
];
