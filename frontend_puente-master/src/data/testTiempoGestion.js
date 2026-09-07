const testTiempoGestion = [
  // Organización del tiempo
  {
    id: 1,
    text: "¿Con qué frecuencia planificás anticipadamente tu semana?",
    options: [
      "Nunca",
      "Rara vez",
      "A veces",
      "Siempre"
    ],
  },
  {
    id: 2,
    text: "¿Cuando tenés varias tareas pendientes, cómo decidís cuál hacer primero?",
    options: [
      "Empiezo por la que tengo más ganas de hacer",
      "Elijo según la fecha de entrega",
      "Establezco prioridades según su importancia y urgencia",
      "Organizo un plan detallado con tiempos y prioridades para cada tarea"
    ],
  },
  {
    id: 3,
    text: "¿Con qué frecuencia cumplís con los plazos o fechas límite para entregar trabajos o realizar actividades?",
    options: [
      "Casi nunca",
      "Rara vez",
      "La mayoría de las veces",
      "Siempre"
    ],
  },
  {
    id: 4,
    text: "¿Cómo organizás tu tiempo entre las actividades escolares, personales y extracurriculares?",
    options: [
      "Me cuesta organizarme y suelo dejar actividades para último momento",
      "Me organizo según las circunstancias y, a veces, me cuesta llegar con todo",
      "Generalmente logro distribuir bien mi tiempo, aunque en ocasiones me sobrecargo",
      "Organizo mis actividades con anticipación para mantener un buen equilibrio"
    ],
  },
  {
    id: 5,
    text: "¿Utilizás herramientas como agendas, calendarios, aplicaciones o recordatorios para organizar tus actividades?",
    options: [
      "No utilizo ninguna herramienta",
      "Las utilizo solamente cuando tengo muchas actividades",
      "Las utilizo con cierta frecuencia para organizarme",
      "Las utilizo habitualmente y me ayudan a cumplir con mis actividades"
    ],
  },
  {
    id: 6,
    text: "Cuando surge una actividad inesperada que modifica tus planes, ¿cómo reaccionás?",
    options: [
      "Me cuesta reorganizarme y suelo dejar otras actividades pendientes",
      "Intento resolverlo en el momento, aunque a veces me desorganizo",
      "Reorganizo mis actividades y busco mantener las prioridades",
      "Me adapto con facilidad, reorganizo mi planificación y continúo con mis objetivos"
    ],
  },

  // Gestión económica y autonomía
  {
    id: 7,
    text: "¿Con qué frecuencia elaborás un presupuesto para organizar tus gastos?",
    options: [
      "Nunca",
      "Rara vez",
      "A veces",
      "Siempre"
    ],
  },
  {
    id: 8,
    text: "¿Solés ahorrar una parte del dinero que recibís o tenés disponible?",
    options: [
      "Nunca",
      "Rara vez",
      "A veces",
      "Siempre"
    ],
  },
  {
    id: 9,
    text: "Cuando decidís comprar algo, ¿comparás precios y opciones antes de hacerlo?",
    options: [
      "Nunca, generalmente compro lo que quiero en el momento",
      "Rara vez, solo cuando se trata de una compra importante",
      "A veces, especialmente cuando tengo varias opciones",
      "Siempre comparo precios, calidad y opciones antes de decidir"
    ],
  },
  {
    id: 10,
    text: "¿Qué importancia tiene para vos ahorrar para alcanzar metas futuras?",
    options: [
      "No lo considero necesario",
      "Lo considero, pero no suelo planificarlo",
      "Me parece importante y trato de hacerlo cuando puedo",
      "Es una prioridad y suelo establecer metas de ahorro"
    ],
  },
  {
    id: 11,
    text: "Cuando tenés que decidir entre un gasto que querés hacer ahora y guardar ese dinero para una meta futura, ¿qué hacés?",
    options: [
      "Generalmente elijo gastar el dinero en el momento",
      "Depende de cuánto dinero tenga disponible",
      "Intento equilibrar el gasto actual con el ahorro",
      "Priorizo mi meta y evalúo si el gasto es realmente necesario"
    ],
  },
  {
    id: 12,
    text: "¿Qué tan autónomo/a te sentís para administrar el dinero que tenés disponible?",
    options: [
      "Necesito que otra persona me ayude a organizar mis gastos",
      "Puedo administrar algunas cosas, pero todavía me cuesta planificar",
      "Generalmente puedo organizar mis gastos y tomar decisiones",
      "Me siento capaz de administrar mis recursos, establecer prioridades y tomar decisiones responsables"
    ],
  },
];

export default testTiempoGestion;

/*const testTiempoGestion = [
  {
    id: 1,
    text: "¿Con qué frecuencia planificas anticipadamente tu semana?",
    options: [
      "Nunca",
      "Rara vez",
      "A veces",
      "Siempre"
    ],
  },
  {
    id: 2,
    text: "Cuando tienes varias tareas, ¿cómo decides cuál hacer primero?",
    options: [
      "Me dejo llevar por el tiempo",
      "Veo según la fecha de entrega",
      "Uso una lista de prioridades",
      "Hago un plan detallado"
    ],
  },
  {
    id: 3,
    text: "¿Cumples con los plazos o fechas límites para entregar trabajos escolares?",
    options: [
      "Nunca",
      "Rara vez",
      "A veces",
      "Siempre"
    ],
  },
  {
    id: 4,
    text: "¿Qué tan bien manejas el tiempo entre tus actividades escolares y extracurriculares?",
    options: [
      "Muy mal",
      "Regular",
      "Bien, pero a veces me estreso",
      "Muy bien"
    ],
  },
  {
    id: 5,
    text: "¿Utilizas herramientas (como aplicaciones o calendarios) para organizar tu tiempo?",
    options: [
      "No uso nada",
      "Solo en ocasiones particulares",
      "A veces, cuando me acuerdo",
      "Sí, siempre"
    ],
  },
  {
    id: 6,
    text: "¿Con qué frecuencia elaboras un presupuesto para tus gastos?",
    options: [
      "Nunca",
      "Rara vez",
      "A veces",
      "Siempre"
    ],
  },
  {
    id: 7,
    text: "¿Sueles ahorrar una parte de tu dinero?",
    options: [
      "Nunca",
      "Rara vez",
      "A veces",
      "Siempre"
    ],
  },
  {
    id: 8,
    text: "Cuando decides comprar algo, ¿investigas / comparas primero los precios?",
    options: [
      "Nunca",
      "Rara vez",
      "A veces",
      "Siempre"
    ],
  },
  {
    id: 9,
    text: "¿Consideras importante ahorrar para tus metas futuras?",
    options: [
      "No",
      "No sé, no pienso en eso",
      "Un poco",
      "Sí, muy importante"
    ],
  },
  {
    id: 10,
    text: "¿Eres capaz de decir “no” a un gasto innecesario, aunque todos tus amigos digan que vale la pena?",
    options: [
      "Nunca",
      "Rara vez",
      "A veces",
      "Siempre"
    ],
  },
];

export default testTiempoGestion;*/
