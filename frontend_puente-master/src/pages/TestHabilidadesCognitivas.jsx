import { useState } from "react";
import testHabilidadesCognitivas from "../data/testHabilidadesCognitivas.js";
import Question from "../components/Question";
const API_URL = import.meta.env.VITE_API_URL;


function TestHabilidadesCognitivas() {
  const [step, setStep] = useState("datos"); // "datos" | "test" | "final"
  const [student, setStudent] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
  });
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [devolucion, setDevolucion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Mapear preguntas en un array plano
  const preguntas = Object.entries(testHabilidadesCognitivas[0]).flatMap(
    ([categoria, items]) =>
      items.map((item, idx) => ({
        ...item,
        categoria,
        id: `${categoria}-${idx}`,
      }))
  );

  const total = preguntas.length;

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const validarEstudiante = () => {
    const camposVacios = Object.entries(student).filter(
      ([_, valor]) => !valor.trim()
    );

    if (camposVacios.length > 0) {
      setError("Por favor completá todos los campos.");
      return;
    }
    setError("");
    setStep("test"); // 🔹 sin validar en backend
  };

  const handleSelect = (option) => {
    setAnswers({ ...answers, [current]: option });
  };

  // 🔹 Las claves deben coincidir EXACTAMENTE con las categorías de data/testHabilidadesCognitivas.js
  const devoluciones = {
    "Razonamiento lógico":
      `¡Muy bien! Tenés buenas habilidades en razonamiento lógico, esto es una gran ventaja, ya que te permite abordar problemas de manera estructurada y eficiente. Las personas con potencial de razonamiento lógico tienden a ser excelentes para identificar patrones, resolver problemas complejos y tomar decisiones bien fundamentadas.
Si disfrutas de desafíos que requieren análisis y deducción, el razonamiento lógico te puede ser muy útil en campos que exigen toma de decisiones, análisis de datos o estrategias.`,
    "Comprensión verbal":
      `¡Excelente! Tenés una muy buena capacidad para entender y procesar información escrita y oral, lo que es fundamental en áreas donde se requiere interpretar y comunicar ideas de manera efectiva. La comprensión verbal es la capacidad para entender, analizar y organizar la información presentada a través del lenguaje. Esto incluye habilidades como la lectura crítica, la comprensión de textos complejos, el análisis de discursos y la capacidad para expresarse con claridad. Esta cualidad es clave en áreas que requieren de una comunicación efectiva, tanto oral como escrita.`,
    "Resolución de problemas":
      `¡Felicidades! Tenés muy buena capacidad de resolución de problemas. Esta habilidad es fundamental en muchas áreas profesionales y refleja una capacidad para abordar situaciones complejas, pensar de manera crítica y encontrar soluciones efectivas, lo cual es altamente valorado en el mundo laboral.`,
    "Atención y concentración":
      `¡Muy bien! Se destaca tu nivel de atención y concentración. Logras mantenerte enfocado en una tarea durante períodos prolongados, y eso es una habilidad muy valiosa. Te permite profundizar en temas complejos y realizar trabajos de precisión sin distraerte. Las profesiones que requieren atención al detalle y la capacidad de mantenerse inmerso en proyectos de largo plazo podrían ser una excelente opción para vos.`,
    "Memoria de trabajo":
      `¡Excelente! Tenés una muy buena memoria de trabajo. Esta habilidad es esencial para poder retener y procesar información de manera simultánea. La memoria de trabajo te permite organizar pensamientos, resolver problemas complejos y conectar ideas rápidamente. Esto te hace apto para enfrentar tareas que implican la solución de problemas, especialmente cuando se manejan múltiples variables al mismo tiempo.`,
    "Comprensión numérica":
      `¡Buen trabajo! Tenés una muy buena capacidad de comprensión numérica. Esta habilidad es fundamental en muchas áreas del conocimiento y se refiere a tu capacidad para trabajar con números, comprender relaciones matemáticas, identificar patrones numéricos y resolver problemas que involucren operaciones y datos.`,
    "Razonamiento lógico abstracto":
      `¡Bien hecho! Tu razonamiento lógico abstracto es destacable. Esto se refiere a la facilidad para pensar de manera estructurada, identificar patrones y resolver problemas sin necesidad de contar con ejemplos concretos o detalles específicos. Las personas con esta fortaleza suelen comprender conceptos complejos, analizar situaciones desde diferentes perspectivas y desarrollar soluciones creativas frente a distintos desafíos. Este tipo de razonamiento es fundamental para el desarrollo del pensamiento matemático, la resolución de problemas y la toma de decisiones en contextos ambiguos o poco definidos.`,
    "Creatividad":
      `¡Excelente! Tenés una muy buena habilidad creativa. La creatividad es una cualidad valiosa que puede abrir muchas puertas en diversas áreas profesionales. No solo se refiere a la habilidad de hacer arte o diseñar cosas visualmente atractivas, sino que implica la capacidad de encontrar soluciones originales a los problemas que se puedan presentar, es pensar de manera diferente y ver el mundo desde perspectivas nuevas e innovadoras. La creatividad puede manifestarse en diferentes campos, tanto en áreas artísticas como en sectores más técnicos y científicos.`,
    "Pensamiento crítico":
      `¡Bien hecho! Demostraste buenas habilidades de pensamiento crítico. Este es un talento muy valioso, ya que se trata de la capacidad de analizar información, evaluar diferentes perspectivas y llegar a conclusiones fundamentadas y bien argumentadas. Tener un pensamiento crítico sólido puede ser de gran utilidad en cualquier ámbito de la vida profesional, y abre una amplia variedad de opciones de carrera.`,
    "Capacidad de Planificación":
      `Presentás una muy buena capacidad de planificación. Tenés facilidad para organizar y estructurar tus tareas, establecer objetivos y pensar estrategias para alcanzarlos. Esta fortaleza puede ayudarte a sostener proyectos a largo plazo y avanzar de manera ordenada hacia tus metas. ¡Muy bien! ¡Seguí así!`,
  };

  const handleNext = async () => {
    if (loading) return; // 🔹 evita múltiples envíos

    if (current < total - 1) {
      setCurrent(current + 1);
      return;
    }

    setLoading(true);
    setError("");

    // 🔹 Evaluar devoluciones solo de categorías completamente correctas
    const devolucionesPorCategoria = [];

    for (const [categoria, items] of Object.entries(testHabilidadesCognitivas[0])) {
      const todasCorrectas = items.every((item) => {
        const preguntaIndex = preguntas.findIndex(
          (q) => q.categoria === categoria && q.pregunta === item.pregunta
        );
        return answers[preguntaIndex] === item.respuesta_correcta;
      });

      if (todasCorrectas) {
        devolucionesPorCategoria.push(`✅ ${devoluciones[categoria]}`);
      }
    }

    const devolucionGeneral =
      `¡Felicitaciones por completar el test!
Este resultado puede ser una oportunidad para detenerte y conocerte un poco más. Las habilidades cognitivas que exploraste forman parte de los recursos que utilizas para aprender, resolver situaciones, comprender información y desenvolverte en diferentes contextos.
Más que pensar en los resultados como “buenos” o “malos”, la propuesta es que puedas reconocer aquellas habilidades que hoy sentís más desarrolladas y también aquellas que quizás necesiten un poco más de práctica. Todo esto forma parte de un proceso de aprendizaje y crecimiento: las capacidades pueden desarrollarse y fortalecerse con el tiempo, la experiencia y la práctica.
A la hora de pensar en tu futuro académico y profesional, es importante mirar este resultado junto con otros aspectos tuyos: tus intereses, valores, motivaciones, experiencias, preferencias y aquello que te entusiasma o te genera curiosidad. Todo esto aporta información para conocerte y explorar diferentes posibilidades.
Recordá que un test no define quién sos ni determina qué podés o no podés hacer. Es simplemente una herramienta que te ofrece algunas pistas para seguir explorando y reflexionando sobre tus recursos y posibilidades.
Tomá este resultado como un punto de partida, no como una etiqueta.`;

    const devolucionFinal = [
      devolucionGeneral,
      ...devolucionesPorCategoria,
    ].join("\n\n");

    setDevolucion(devolucionFinal);

    // 🔹 Llamada a la API
    try {
      const res = await fetch(`${API_URL}/api/tests/submitHabCogni`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: student.nombre,
          apellido: student.apellido,
          dni: student.dni,
          email: student.email,
          respuestas: answers,
          devoluciones: devolucionFinal, // guardamos todo en un solo campo
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStep("final");
      } else {
        setError(data.error || "No se pudo guardar el test. Intentá de nuevo.");
      }
    } catch (err) {
      console.error("❌ Error al enviar el test:", err);
      setError("Error al enviar el test. Revisá tu conexión e intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };



  // 🔹 Paso de datos del estudiante
  if (step === "datos") {
    return (
      <div className="min-h-screen flex flex-col pt-12 items-center bg-gray-100 p-4">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 text-center">
            Datos del Estudiante
          </h2>
          <div className="space-y-3">
            {["nombre", "apellido", "dni", "email"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={student[field]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            ))}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              className="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-sky-600"
              onClick={validarEstudiante}
            >
              Comenzar test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Paso final con devolución
  if (step === "final") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">
            ¡Gracias por completar el test!
          </h2>
          <p className="text-gray-700 whitespace-pre-line text-justify">
            {devolucion}
          </p>
        </div>
      </div>
    );
  }

  // 🔹 Paso del test
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-6 rounded-xl shadow-md mb-6">
          <h1 className="text-3xl font-bold">Test de Habilidades Cognitivas</h1>
          <p className="text-lg font-semibold mt-3">
            ¡Te damos la bienvenida a la evaluación de tus habilidades!
          </p>
          <p className="text-sm mt-2">
            El objetivo de este test es identificar y valorar tus capacidades cognitivas, tales como la atención, el razonamiento lógico, la memoria y la comprensión verbal. Reconocer tus fortalezas intelectuales es un paso fundamental para descubrir en qué áreas académicas y profesionales podés desenvolverte con mayor efectividad y satisfacción.
          </p>
          <p className="text-sm mt-2">
            <span className="font-semibold">Instrucciones:</span> Cada pregunta cuenta con 4 opciones de respuesta, pero solo una es la correcta. Tómate tu tiempo para analizar cada enunciado y responder con calma.
          </p>
          <p className="text-sm mt-2 font-semibold">
            ¡Mucho éxito en esta experiencia!
          </p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="mb-4 text-sm text-gray-600">
            Pregunta {current + 1} de {total}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
            <div
              className="h-2 rounded-full bg-purple-600"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>

          <Question
            preguntaObj={preguntas[current]}
            selectedOption={answers[current]}
            onSelect={handleSelect}
          />

          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

          <button
            className={`mt-6 px-6 py-2 rounded-full text-white flex items-center justify-center gap-2 transition ${
              !answers[current] || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            onClick={handleNext}
            disabled={!answers[current] || loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018 8H4z"
                  />
                </svg>
                Enviando...
              </>
            ) : current === total - 1 ? (
              "Finalizar"
            ) : (
              "Siguiente"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestHabilidadesCognitivas;
