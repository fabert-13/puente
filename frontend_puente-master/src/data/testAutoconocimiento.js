const testAutoconocimiento = [
  {
    id: 1,
    text: "¿Cuáles de estas actividades disfrutas más en tu tiempo libre?",
    options: [
      "Aprender sobre un tema que me interesa o investigar algo nuevo.",
      "Construir, reparar o poner en práctica alguna idea.",
      "Crear dibujos, música, videos, fotografías o escribir.",
      "Compartir tiempo con otras personas o participar en actividades grupales.",
      "Depende del momento; me interesan varias opciones.",
    ],
  },
  {
    id: 2,
    text: "¿Qué tipo de contenido consumís con más frecuencia?",
    options: [
      "Videos o lecturas para aprender cosas nuevas.",
      "Tutoriales o contenidos prácticos.",
      "Arte, música, diseño o producciones creativas.",
      "Historias, entrevistas o temas sociales.",
      "Consumo de todo un poco.",
    ],
  },
  {
    id: 3,
    text: "Si en el colegio te proponen un proyecto grupal, ¿qué tarea elegirías?",
    options: [
      "Buscar información y organizar los datos.",
      "Construir o llevar la idea a la práctica.",
      "Diseñar la presentación o crear contenido original.",
      "Coordinar al grupo y distribuir tareas.",
      "Me gustaría participar en distintas tareas.",
    ],
  },
  {
    id: 4,
    text: "¿Cuál de los siguientes aspectos consideras más importante?",
    options: [
      "Conocimiento y aprendizaje.",
      "Salud y bienestar.",
      "Creatividad y autoexpresión.",
      "Amistad y comunidad.",
      "Todos son importantes.",
    ],
  },
  {
    id: 5,
    text: "¿En qué áreas o actividades sentís que sos más habilidoso/a?",
    options: [
      "Resolver desafíos o acertijos.",
      "Armar, reparar o experimentar.",
      "Expresarse mediante alguna actividad artística.",
      "Ayudar, acompañar o conversar con otras personas.",
      "Me siento identificado/a con varias.",
    ],
  },
  {
    id: 6,
    text: "¿Cómo te sentís al hablar en público o exponer ideas?",
    options: [
      "Me siento nervioso/a, pero resuelvo bien.",
      "No me gusta hablar en público, prefiero hacerlo por escrito.",
      "Me siento cómodo al interactuar con otros.",
      "Me gusta y disfruto la atención.",
      "Prefiero no hacerlo.",
    ],
  },
  {
    id: 7,
    text: "¿De qué manera consideras que aprendes mejor?",
    options: [
      "Leyendo e investigando.",
      "Haciendo y practicando.",
      "Creando, dibujando o diseñando.",
      "Intercambiando ideas con otras personas.",
      "Depende del tema.",
    ],
  },
  {
    id: 8,
    text: "Cuando aparece un problema nuevo, generalmente preferís…",
    options: [
      "Analizar la información antes de actuar.",
      "Probar distintas soluciones hasta encontrar una que funcione.",
      "Pensar alternativas originales.",
      "Consultar y trabajar con otras personas.",
      "Depende de la situación.",
    ],
  },
  {
    id: 9,
    text: "¿Cómo te imaginas en 10 años?",
    options: [
      "Trabajando en una oficina o desde casa (home office), haciendo tareas administrativas o técnicas.",
      "Trabajando en un taller, obra en construcción, con un equipo técnico.",
      "Siendo un/a artista, diseñador/a o con mi propio emprendimiento.",
      "En un trabajo donde pueda ayudar a otros, como en salud o educación.",
      "Ninguna de las anteriores / Aún no lo sé.",
    ],
  },
  {
    id: 10,
    text: "¿Cuál de estas actividades te motiva más?",
    options: [
      "Investigar sobre cómo funcionan las cosas y/o temas que me interesan (páginas web, YouTube, TikTok, etc.).",
      "Practicar deportes, trabajos manuales con manejo de herramientas mecánicas, eléctricas o digitales.",
      "Inventar, innovar o participar en un proyecto artístico (dibujo, pintura, danza, teatro, trap, etc.).",
      "Generar impacto positivo en los demás, organizar eventos o actividades con amigos.",
      "Todas me interesan.",
    ],
  },
  {
    id: 11,
    text: "¿Cómo te describes en una palabra?",
    options: [
      "Curioso.",
      "Energético.",
      "Creativo.",
      "Sociable.",
      "Ninguna de las anteriores.",
    ],
  },
  {
    id: 12,
    text: "Si tuvieras recursos ilimitados para desarrollar un proyecto, elegirías...",
    options: [
      "Investigar una enfermedad o un problema científico.",
      "Crear una herramienta o tecnología útil.",
      "Diseñar una obra artística o un emprendimiento creativo.",
      "Crear un proyecto para mejorar la vida de una comunidad.",
      "Todavía no lo tengo claro.",
    ],
  },
];

export default testAutoconocimiento;

/*const testAutoconocimiento = [
  {
    id: 1,
    text: "¿Cuáles de estas actividades disfrutas más en tu tiempo libre?",
    options: [
      "Leer libros, ver documentales, mirar streaming o seguir canales en YouTube.",
      "Practicar deportes, utilizar herramientas y tecnología.",
      "Crear contenido como dibujar, pintar, tomar fotos, editar imágenes o videos.",
      "Compartir tiempo con amigos, socializar y organizar reuniones.",
      "Ninguna de las anteriores.",
    ],
  },
  {
    id: 2,
    text: "Cuando enfrentas un desafío, ¿cómo sueles reaccionar?",
    options: [
      "Busco información y analizo la situación.",
      "Me esfuerzo y trabajo duro para superarlo.",
      "Pienso en soluciones creativas.",
      "Pido ayuda a otros y colaboro en lo que puedo.",
      "No sé cómo reaccionar.",
    ],
  },
  {
    id: 3,
    text: "¿Qué tipo de ambiente de trabajo te parece más atractivo?",
    options: [
      "Un lugar tranquilo y ordenado.",
      "Un entorno dinámico y activo.",
      "Un espacio donde pueda expresarme libremente.",
      "Un lugar donde pueda interactuar con muchas personas.",
      "Otro.",
    ],
  },
  {
    id: 4,
    text: "¿Cuál de los siguientes valores consideras más importantes?",
    options: [
      "Conocimiento y aprendizaje.",
      "Salud y bienestar.",
      "Creatividad y autoexpresión.",
      "Amistad y comunidad.",
      "Ninguno de los anteriores.",
    ],
  },
  {
    id: 5,
    text: "¿En qué áreas o actividades sentís que sos bueno/a o estás más preparado/a?",
    options: [
      "Resolviendo problemas concretos o juegos de estrategias online.",
      "Organizando y planeando proyectos o eventos, liderando grupos.",
      "Creando y expresándome en actividades artísticas.",
      "Comunicándome con los demás y trabajando en equipo.",
      "Otros.",
    ],
  },
  {
    id: 6,
    text: "¿Cómo te sentís al hablar en público o exponer ideas?",
    options: [
      "Me siento nervioso/a, pero resuelvo bien.",
      "No me gusta hablar en público, prefiero hacerlo por escrito.",
      "Me siento cómodo al interactuar con otros.",
      "Me gusta y disfruto la atención.",
      "Prefiero no hacerlo.",
    ],
  },
  {
    id: 7,
    text: "¿De qué manera consideras que aprendes mejor?",
    options: [
      "Leyendo libros, artículos en línea o buscando información.",
      "Poniendo en práctica lo que veo en tutoriales.",
      "Experimentando a través de pintura, dibujo o videos.",
      "Haciendo trabajos en grupo o participando en foros.",
      "Otra / no lo sé.",
    ],
  },
  {
    id: 8,
    text: "¿Cómo te imaginas en 10 años?",
    options: [
      "Trabajando en oficina o home office en tareas administrativas o técnicas.",
      "Trabajando en un taller, obra en construcción, con un equipo técnico.",
      "Siendo artista, diseñador/a o con un emprendimiento propio.",
      "En un trabajo donde pueda ayudar a otros, como en salud o educación.",
      "Ninguna de las anteriores / Aún no lo sé.",
    ],
  },
  {
    id: 9,
    text: "¿Cuál de estas actividades te motiva más?",
    options: [
      "Investigar sobre temas que me interesan en Internet.",
      "Practicar deportes o usar herramientas mecánicas o digitales.",
      "Participar en un proyecto artístico.",
      "Organizar eventos o actividades con amigos.",
      "Ninguna de las anteriores.",
    ],
  },
  {
    id: 10,
    text: "¿Cómo te describes en una palabra?",
    options: [
      "Curioso.",
      "Energético.",
      "Creativo.",
      "Sociable.",
      "Ninguna de las anteriores.",
    ],
  },
];

export default testAutoconocimiento;*/