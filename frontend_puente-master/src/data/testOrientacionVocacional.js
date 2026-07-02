const orientacionVocacional = {
  categorias: [
    {
      nombre: "Ciencias Naturales",
      preguntas: [
        { id: 1, texto: "1.	Estudiar los efectos de las sustancias químicas en el medio ambiente.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 2, texto: "2.	Analizar el comportamiento de los animales en su hábitat natural.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 3, texto: "3.	Investigar sobre los cambios climáticos y sus efectos en el planeta.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 4, texto: "4.	Realizar experimentos científicos en un laboratorio para comprobar teorías.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 5, texto: "5.	Estudiar el cuerpo humano y sus sistemas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 6, texto: "6.	Analizar la evolución de las especies y su adaptación al medio.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 7, texto: "7.	Investigar sobre las energías renovables y su impacto en la conservación de los ecosistemas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 8, texto: "8.	Realizar estudios sobre la genética y las enfermedades hereditarias.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 9, texto: "9.	Investigar sobre los fenómenos meteorológicos y cómo predecirlos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 10, texto: "10.	Explorar las propiedades de los materiales y sus usos en la vida cotidiana.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] }
      ]
    },
    {
      nombre: "Ciencias de la Salud",
      preguntas: [
        { id: 11, texto: "1.	Estudiar cómo funciona el cuerpo humano y sus sistemas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 12, texto: "2.	Analizar cómo influyen los medicamentos en el cuerpo humano y sus efectos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 13, texto: "3.	Ayudar a otras personas a sentirse mejor, tanto emocional como físicamente.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 14, texto: "4.	Trabajar en clínicas, hospitales o centros de salud.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 15, texto: "5.	Te preocupan las enfermedades y cómo se pueden prevenir.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 16, texto: "6.	Conocer las diferentes alternativas utilizadas para tratar problemas de salud mental.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 17, texto: "7.	Estudiar de qué forma los vínculos familiares y sociales influyen en el desarrollo de trastornos psicológicos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 18, texto: "8.	Investigar de qué manera se pueden diagnosticar enfermedades utilizando tecnología médica avanzada.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 19, texto: "9.	Participar en actividades relacionadas con la salud, como primeros auxilios prevención de enfermedad, etc.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 20, texto: "10.	Explorar de qué manera la salud mental afecta el desempeño académico y laboral.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] }
      ]
    },
    {
      nombre: "Ciencias Sociales",
      preguntas: [
        { id: 21, texto: "1.	Estudiar la historia de las civilizaciones antiguas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 22, texto: "2.	Analizar las causas y efectos de los conflictos sociales y políticos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 23, texto: "3.	Investigar sobre las tradiciones y costumbres de diferentes culturas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 24, texto: "4.	Analizar la historia y como el pasado moldea el presente.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 25, texto: "5.	Estudiar las diferentes culturas. ", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 26, texto: "6.	Analizar los sistemas políticos y sus implicaciones en la vida de los ciudadanos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 27, texto: "7.	Realizar investigaciones sobre la economía y su impacto social.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 28, texto: "8.	Saber sobre derechos humanos y leyes.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 29, texto: "9.	Te interesa entender cómo piensan y se comportan las personas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 30, texto: "10.	Trabajar en proyectos que busquen mejorar la sociedad.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] }
      ]
    },
    {
      nombre: "Ciencias Exactas",
      preguntas: [
        { id: 31, texto: "1.	Resolver ecuaciones matemáticas complejas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 32, texto: "2.	Estudiar y aplicar las leyes de la física en diversas situaciones.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 33, texto: "3.	Analizar datos para hacer predicciones sobre fenómenos matemáticos o físicos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 34, texto: "4.	Realizar investigaciones que impliquen el uso de la matemática.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 35, texto: "5.	Resolver problemas de geometría y matemáticas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 36, texto: "6.	Estudiar la teoría de la probabilidad y su aplicación en la vida.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 37, texto: "7.	Aplicar fórmulas matemáticas a la ingeniería o a la arquitectura.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 38, texto: "8.	Investigar sobre las leyes que rigen el universo, como la relatividad o la mecánica cuántica.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 39, texto: "9.	Desarrollar modelos matemáticos para resolver problemas reales.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 40, texto: "10.	Planificar y organizar proyectos en los que sea necesario la precisión y el detalle.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] }
      ]
    },
    {
      nombre: "Ciencias Económicas",
      preguntas: [
        { id: 41, texto: "1.	Estudiar la economía y su impacto en la vida cotidiana.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 42, texto: "2.	Analizar las políticas fiscales y económicas de los gobiernos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 43, texto: "3.	Estudiar cómo es la creación de empresas o emprendimientos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 44, texto: "4.	Estudiar las inversiones y los mercados financieros.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 45, texto: "5.	Realizar estudios sobre el comportamiento del mercado y su influencia en el consumidor.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 46, texto: "6.	Analizar los ciclos económicos y su impacto global.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 47, texto: "7.	Desarrollar estrategias para mejorar la eficiencia en las empresas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 48, texto: "8.	Asesorar a personas o empresas sobre sus finanzas personales.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 49, texto: "9.	Investigar sobre el impacto de las políticas económicas en la sociedad.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 50, texto: "10.	Colaborar en la creación de políticas públicas relacionadas con la economía.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] }
      ]
    },
    {
      nombre: "Diseño Gráfico",
      preguntas: [
        { id: 51, texto: "1.	Crear logotipos y marcas visuales para empresas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 52, texto: "2.	Diseñar materiales publicitarios como folletos, carteles o anuncios.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 53, texto: "3.	Crear imágenes digitales y gráficos para proyectos web o aplicaciones.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 54, texto: "4.	Combinar colores, formas y tipografías para transmitir mensajes. creativos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 55, texto: "5.	Desarrollar conceptos visuales para campañas publicitarias.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 56, texto: "6.	Colaborar con otros en proyectos de diseño multimedia.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 57, texto: "7.	Crear ilustraciones para libros, revistas o medios digitales.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 58, texto: "8.	Aprender a usar herramientas de diseño como Photoshop.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 59, texto: "9.	Experimentar con tipografías y composiciones visuales en proyectos creativos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 60, texto: "10.	Estudiar la teoría del color y cómo usarla en el diseño.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] }
      ]
    },
    {
      nombre: "Tecnología",
      preguntas: [
        { id: 61, texto: "1.	Programar software y desarrollar aplicaciones para dispositivos móviles o computadoras.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 62, texto: "2.	Trabajar con inteligencia artificial y aprender sobre sus aplicaciones.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 63, texto: "3.	Estudiar ciberseguridad para proteger datos y sistemas informáticos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 64, texto: "4.	Desarrollar videojuegos y aplicaciones interactivas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 65, texto: "5.	Trabajar en el diseño de hardware y dispositivos tecnológicos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 66, texto: "6.	Aprender sobre las últimas innovaciones tecnológicas en la industria.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 67, texto: "7.	Realizar pruebas y experimentos con nuevos dispositivos tecnológicos.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 68, texto: "8.	Trabajar en el desarrollo de sistemas operativos y plataformas informáticas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 69, texto: "9.	Colaborar en proyectos tecnológicos que impliquen trabajo en equipo e innovación.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] },
        { id: 70, texto: "10.	Resolver problemas técnicos, como arreglar dispositivos electrónicos o trabajar con máquinas.", opciones: ["Me interesa", "No me disgusta", "No me interesa"] }
      ]
    }
  ]
};

export default orientacionVocacional;
