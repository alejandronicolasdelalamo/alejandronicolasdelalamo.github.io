// Todos los datos del portfolio viven aquí. Para añadir un proyecto, copia uno de PROYECTOS y cambia sus campos:
// las tarjetas, la sección "Qué domino" y la lista de enlaces se actualizan solas.

export type SuitName = "heart" | "diamond" | "spade" | "club";
export type PaloId = "android" | "backend" | "web" | "juegos";

/** publico: repositorio abierto en GitHub. privado: existe pero no se puede ver. local: aún no está en GitHub. */
export type Visibilidad = "publico" | "privado" | "local";
export type Estado = "Publicado" | "En desarrollo" | "Uso privado";

export interface Proyecto {
  id: string;
  titulo: string;
  corto: string; // nombre abreviado para listas estrechas
  palo: PaloId;
  estado: Estado;
  resumen: string; // una frase: qué es
  logros: string[]; // dos o tres hechos concretos y comprobables
  tecnologias: string[];
  visibilidad: Visibilidad;
  repo: string | null; // nombre del repositorio en GitHub
  demo?: string; // dirección donde se puede usar la app en línea
  imagen: { src: string; ancho: number; alto: number; ajuste: "cover" | "contain"; posicion: "arriba" | "centro" } | null;
  fondo: string; // color de fondo del hueco de la imagen
  destacado: boolean; // sale en el abanico de la portada
  estilo?: "cartas"; // solo Barajados, que es un juego de cartas: lleva los palos como adorno
}

const USUARIO = "alejandronicolasdelalamo";

export const SITIO = {
  url: "https://alejandronicolasdelalamo.github.io",
  titulo: "Alejandro Nicolás, desarrollador multiplataforma",
  descripcion:
    "Portfolio de Alejandro Nicolás, desarrollador multiplataforma en formación en Madrid. Apps Android con Kotlin, backends con Java y Spring Boot y webs con React.",
};

export const PERFIL = {
  nombre: "Alejandro Nicolás",
  nombreCompleto: "Alejandro Nicolás del Álamo",
  rol: "Desarrollador multiplataforma en formación",
  usuarioGithub: USUARIO,
  email: "alejandronicolasdelalamo@gmail.com",
  github: `https://github.com/${USUARIO}`,
  linkedin: "https://www.linkedin.com/in/alejandro-nicolas-del-alamo/",
  certificado4Geeks: "https://certificate.4geeks.com/f5d4e1b48e48de30a06580e04fce24cdd0f20010",
  cv: "/CV_Alejandro_Nicolas_del_Alamo.pdf",
  // Ruta de tu foto dentro de public/. Con null se ve un hueco con tus iniciales.
  foto: "/yo.webp" as string | null,
  fotoAlt: "Retrato de Alejandro Nicolás",
  // Tu historia, un párrafo por elemento. El primero se muestra más grande.
  historia: [
    "Soy desarrollador multiplataforma en formación. Me gusta construir aplicaciones completas, del backend a la interfaz, y cuidar que funcionen bien y se vean bien.",
    "Empecé en 2024 con el bootcamp Full Stack de 4Geeks Academy mientras terminaba el Bachillerato de Ciencias. Entre 2025 y 2026 compaginé los estudios con un trabajo en tienda, en Supeco/Carrefour y Grupo Dia, donde aprendí a organizarme y a responder cuando hay prisa.",
    "Ahora curso segundo de DAM en Ilerna y aprendo construyendo proyectos de verdad. Fuera del código me encontrarás en el gimnasio o jugando al fútbol y al baloncesto.",
  ],
  // Datos clave para quien te quiera contratar.
  datos: [
    { etiqueta: "Ubicación", valor: "Madrid" },
    { etiqueta: "Estudios", valor: "2.º de DAM en Ilerna" },
    { etiqueta: "Idiomas", valor: "Español nativo, inglés avanzado" },
    { etiqueta: "Disponibilidad", valor: "Prácticas desde la primavera de 2027" },
  ],
  habilidades: ["Resolución de problemas", "Trabajo en equipo", "Aprendizaje rápido", "Comunicación", "Adaptabilidad"],
} as const;

export const PALOS: Record<PaloId, { nombre: string }> = {
  android: { nombre: "Android" },
  backend: { nombre: "Backend" },
  web: { nombre: "Web" },
  juegos: { nombre: "Juegos" },
};

// Orden: de más completo a más sencillo. Los cuatro primeros con destacado salen en la portada.
export const PROYECTOS: Proyecto[] = [
  {
    id: "onmi",
    titulo: "ONMi",
    corto: "ONMi",
    palo: "web",
    estado: "Publicado",
    resumen: "App de productividad que reúne hábitos, notas, proyectos, metas, ánimo y tiempo de enfoque, con web instalable y app móvil.",
    logros: [
      "Frontend en React y TypeScript sobre una API en Flask con PostgreSQL",
      "146 tests de backend con un 95 % de cobertura y 39 pruebas E2E con Playwright",
      "Acceso con passkeys, Docker e integración continua con GitHub Actions",
    ],
    tecnologias: ["React", "TypeScript", "Tailwind", "Flask", "Python", "PostgreSQL", "React Native", "Docker", "GitHub Actions", "Playwright", "Git y GitHub"],
    visibilidad: "publico",
    repo: "onmi",
    demo: "https://onmi-z9vl.onrender.com/",
    imagen: { src: "/projects/onmi-dark.webp", ancho: 1100, alto: 688, ajuste: "cover", posicion: "arriba" },
    fondo: "#1b2433",
    destacado: true,
  },
  {
    id: "devspace",
    titulo: "DevSpace",
    corto: "DevSpace",
    palo: "web",
    estado: "En desarrollo",
    resumen: "Red social y bolsa de empleo para developers junior, con perfil y CV, ofertas, eventos en un mapa y mensajes. Es mi proyecto de fin de grado.",
    logros: [
      "API REST con Spring Boot, JWT y roles para developers, empresas y administración",
      "167 pruebas de integración que pasan contra el servidor real",
      "App Android en Kotlin con Jetpack Compose y un servicio en Python que sincroniza eventos",
    ],
    tecnologias: ["Java", "Spring Boot", "MySQL", "JavaScript", "HTML y CSS", "Kotlin", "Jetpack Compose", "Python", "Git y GitHub"],
    visibilidad: "local",
    repo: null,
    imagen: { src: "/projects/devspace.webp", ancho: 1000, alto: 880, ajuste: "cover", posicion: "centro" },
    fondo: "#1d1a38",
    destacado: true,
  },
  {
    id: "sopaventura",
    titulo: "SopaVentura",
    corto: "SopaVentura",
    palo: "juegos",
    estado: "Publicado",
    resumen: "Sopa de letras en pixel art con mapa de islas, cinco modos de juego y partidas para dos jugadores en directo.",
    logros: [
      "Se instala como app y funciona sin conexión, con sincronización en Supabase",
      "Arte y sonido generados por código, sin archivos con copyright",
      "64 tests con Vitest y pruebas en navegador con Puppeteer",
    ],
    tecnologias: ["TypeScript", "PWA", "Supabase", "PostgreSQL", "Vitest", "Python", "Git y GitHub"],
    visibilidad: "privado",
    repo: "sopaventura",
    demo: "https://sopaventura.alejandronicolasdelalamo.workers.dev/",
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
    resumen: "Roguelite de cartas en pixel art: juegas al Punto Banco contra metas cada vez más altas.",
    logros: [
      "8 mesas con jefes que cambian las reglas y 44 reliquias que modifican los pagos",
      "Tienda entre rondas con tres opciones, inspirada en Balatro",
      "Partidas reproducibles a partir de una semilla",
    ],
    tecnologias: ["Lua", "LÖVE2D"],
    visibilidad: "local",
    repo: null,
    imagen: { src: "/projects/barajados.webp", ancho: 1000, alto: 880, ajuste: "cover", posicion: "centro" },
    estilo: "cartas",
    fondo: "#1d1a38",
    destacado: true,
  },
  {
    id: "universo",
    titulo: "Mi Universo Entero",
    corto: "Universo",
    palo: "web",
    estado: "Publicado",
    resumen: "Escena 3D interactiva para el 21 de septiembre: más de 20 000 estrellas que se juntan hasta formar un girasol del tamaño de una galaxia.",
    logros: [
      "Sombreadores GLSL propios: la animación de entrada y el centelleo se calculan en la GPU",
      "Cámara orbital hecha a mano con ratón, táctil, rueda y teclado, sin OrbitControls",
      "Calidad adaptativa por fps y galería accesible si no hay WebGL o JavaScript",
    ],
    tecnologias: ["JavaScript", "Three.js", "WebGL", "HTML y CSS", "Git y GitHub"],
    visibilidad: "publico",
    repo: "21-de-septiembre",
    demo: "https://alejandronicolasdelalamo.github.io/21-de-septiembre/",
    imagen: { src: "/projects/girasol-galaxia.webp", ancho: 1000, alto: 880, ajuste: "cover", posicion: "centro" },
    fondo: "#120b3a",
    destacado: false,
  },
  {
    id: "san-valentin",
    titulo: "Para Ti, Mi Amor",
    corto: "San Valentín",
    palo: "web",
    estado: "Publicado",
    resumen: "Carta animada de San Valentín: tocas un corazón, cae como una semilla y de él crece un árbol entero de corazones.",
    logros: [
      "Árbol procedural dibujado en Canvas 2D a partir de un generador aleatorio con semilla",
      "Cientos de hojas con viento, caída y rebrote, y ráfagas al mover el ratón",
      "Cero dependencias y sin paso de compilación",
    ],
    tecnologias: ["JavaScript", "Canvas", "HTML y CSS", "Git y GitHub"],
    visibilidad: "publico",
    repo: "Para-Ti-Mi-Amor",
    demo: "https://alejandronicolasdelalamo.github.io/Para-Ti-Mi-Amor/",
    imagen: { src: "/projects/arbol-corazones.webp", ancho: 1000, alto: 880, ajuste: "cover", posicion: "centro" },
    fondo: "#2a0f22",
    destacado: false,
  },
  {
    id: "login",
    titulo: "Login con Compose",
    corto: "Login",
    palo: "android",
    estado: "Publicado",
    resumen: "Pantallas de acceso y bienvenida para Android con Jetpack Compose y Material 3.",
    logros: [
      "Transición animada entre pantallas con AnimatedContent",
      "Validación del correo al escribir y bloqueo temporal tras varios fallos",
      "Se adapta a móvil y tablet, en modo claro y oscuro",
    ],
    tecnologias: ["Kotlin", "Jetpack Compose", "Material 3", "Git y GitHub"],
    visibilidad: "publico",
    repo: "Login_compose",
    imagen: { src: "/projects/login-compose.webp", ancho: 1000, alto: 880, ajuste: "cover", posicion: "centro" },
    fondo: "#1d1a38",
    destacado: false,
  },
  {
    id: "tres-ds",
    titulo: "Nintendo 3DS en Compose",
    corto: "3DS",
    palo: "android",
    estado: "Publicado",
    resumen: "Una consola Nintendo 3DS dibujada solo con código en Jetpack Compose, sin una sola imagen.",
    logros: [
      "Diseño previo en Figma traducido a componentes reutilizables",
      "Escala propia que adapta la consola a cualquier pantalla sin deformarla",
    ],
    tecnologias: ["Kotlin", "Jetpack Compose", "Material 3", "Figma", "Git y GitHub"],
    visibilidad: "publico",
    repo: "3DS",
    imagen: { src: "/projects/3ds.webp", ancho: 801, alto: 756, ajuste: "contain", posicion: "centro" },
    fondo: "#1c1c1e",
    destacado: false,
  },
];

// El nombre de cada tecnología debe coincidir con el que usan los proyectos de arriba.
export const STACK: { grupo: string; items: string[] }[] = [
  { grupo: "Backend", items: ["Java", "Spring Boot", "Python", "Flask", "MySQL", "PostgreSQL", "Supabase"] },
  { grupo: "Web", items: ["TypeScript", "JavaScript", "React", "Tailwind", "HTML y CSS", "PWA", "Three.js", "WebGL", "Canvas"] },
  { grupo: "Móvil", items: ["Kotlin", "Jetpack Compose", "Material 3", "React Native"] },
  { grupo: "Calidad y despliegue", items: ["Git y GitHub", "GitHub Actions", "Docker", "Vitest", "Playwright"] },
  { grupo: "Diseño y juegos", items: ["Figma", "Lua", "LÖVE2D"] },
];

export type EstadoTray = "hecho" | "ahora" | "luego";
export const ESTADOS_TRAY: Record<EstadoTray, string> = { hecho: "Hecho", ahora: "En curso", luego: "Próximo" };

// Fechas tomadas de mi CV.
export const TRAYECTORIA: { estado: EstadoTray; fecha: string; titulo: string; lugar: string; texto: string }[] = [
  {
    estado: "luego",
    fecha: "Primavera de 2027",
    titulo: "Prácticas en empresa",
    lugar: "Formación en Centros de Trabajo (FCT)",
    texto: "500 horas en empresa dentro del ciclo de DAM.",
  },
  {
    estado: "ahora",
    fecha: "2026",
    titulo: "DevSpace, proyecto de fin de grado",
    lugar: "Proyecto propio",
    texto: "Red social y bolsa de empleo para developers junior, con API en Spring Boot, web y app Android.",
  },
  {
    estado: "ahora",
    fecha: "2025 hasta hoy",
    titulo: "Desarrollo de Aplicaciones Multiplataforma (DAM)",
    lugar: "Ilerna",
    texto: "Java, bases de datos con MySQL, Spring Boot, apps Android con Kotlin y Python.",
  },
  {
    estado: "hecho",
    fecha: "Mayo de 2025 a julio de 2026",
    titulo: "Cajero y reponedor",
    lugar: "Supeco/Carrefour y Grupo Dia",
    texto: "Caja, reposición y rotación, apertura y cierre de tienda. Compaginado con los estudios.",
  },
  {
    estado: "hecho",
    fecha: "2024 a 2025",
    titulo: "Full Stack Software Developer",
    lugar: "4Geeks Academy, Madrid",
    texto: "Formación intensiva en desarrollo web con JavaScript, React y Python. Certificado verificable en línea.",
  },
  {
    estado: "hecho",
    fecha: "2023 a 2025",
    titulo: "Bachillerato de Ciencias",
    lugar: "IES Rey Pastor",
    texto: "Rama de ciencias.",
  },
];
