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
    setStep("test"); // 🔹 sin validar en backend
  };

  const handleSelect = (option) => {
    setAnswers({ ...answers, [current]: option });
  };

  const devoluciones = {
    "Razonamiento lógico":
      `Tenés buenas habilidades en razonamiento lógico, esto es una gran ventaja, ya que te permite abordar problemas de manera estructurada y eficiente. Las personas con habilidades de razonamiento lógico tienden a ser excelentes para identificar patrones, resolver problemas complejos y tomar decisiones bien fundamentadas. Si disfrutas de desafíos que requieren análisis y deducción, el razonamiento lógico te puede ser muy útil en campos que exigen toma de decisiones, análisis de datos o estrategias.`,
    "Comprensión verbal":
      `Tenés una muy buena capacidad para entender y procesar información escrita y oral, lo cual es fundamental en áreas donde se requiere interpretar y comunicar ideas de manera efectiva. La comprensión verbal es la capacidad para entender, analizar y organizar la información presentada a través del lenguaje. Esto incluye habilidades como la lectura crítica, la comprensión de textos complejos, el análisis de discursos y la capacidad para expresarse con claridad. Esta habilidad es clave en áreas que requieren de una comunicación efectiva, tanto oral como escrita.`,
    "Resolución de problemas":
      `Felicidades, tenés muy buena capacidad de resolución de problemas. Esta habilidad es fundamental en muchas áreas profesionales y refleja una capacidad para abordar situaciones complejas, pensar de manera crítica y encontrar soluciones efectivas, lo cual es altamente valorado en el mundo laboral.`,
    "Atención y concentración":
      `Tenés muy buena capacidad de atención y concentración. Tu capacidad para mantenerte enfocado y concentrado en una tarea por largos períodos de tiempo es una habilidad muy valiosa. Esto te permite profundizar en temas complejos y realizar trabajos de precisión sin distracciones. Profesiones que requieren atención al detalle y la capacidad de mantenerse inmerso en proyectos de largo plazo podrían ser una excelente opción.`,
    "Memoria de trabajo":
      `¡Excelente! Tenés una muy buena memoria de trabajo. Esta habilidad es esencial para poder retener y procesar información de manera simultánea. La memoria de trabajo te permite organizar pensamientos, resolver problemas complejos y conectar ideas rápidamente. Esto te hace apto para enfrentar tareas que implican la solución de problemas, especialmente cuando se manejan múltiples variables al mismo tiempo.`,
    "Comprensión numérica":
      `¡Buen trabajo! Tenés una muy buena capacidad de comprensión numérica. Esta habilidad es fundamental en muchas áreas del conocimiento y se refiere a tu capacidad para trabajar con números, comprender relaciones matemáticas, identificar patrones numéricos y resolver problemas que involucren operaciones y datos.`,
    "Razonamiento lógico abstracto":
      `Tu capacidad de razonamiento lógico abstracto es muy buena. Se refiere a la capacidad de pensar de manera estructurada, identificar patrones y resolver problemas sin necesidad de tener al frente ejemplos concretos o detalles específicos. Las personas con este tipo de habilidad tienen facilidad para entender conceptos complejos, analizar situaciones desde diversas perspectivas y desarrollar soluciones creativas para desafíos. Esta habilidad es fundamental en el desarrollo del pensamiento matemático, la resolución de problemas y la toma de decisiones en contextos ambiguos o poco definidos.`,
    Creatividad: 
      `¡Excelente! Tenés una muy buena habilidad creativa. La creatividad es una cualidad valiosa que puede abrir muchas puertas en diversas áreas profesionales. No solo se refiere a la habilidad de hacer arte o diseñar cosas visualmente atractivas, sino que implica la capacidad de encontrar soluciones originales a los problemas que se puedan presentar, es pensar de manera diferente y ver el mundo desde perspectivas nuevas e innovadoras. La creatividad puede manifestarse en diferentes campos, tanto en áreas artísticas como en sectores más técnicos y científicos.`,
    "Pensamiento crítico":
      `¡Bien hecho! Demuestras buenas habilidades de pensamiento crítico. Este es un talento muy valioso, ya que se trata de la capacidad de analizar información, evaluar diferentes perspectivas y llegar a conclusiones fundamentadas y bien argumentadas. Tener un pensamiento crítico sólido puede ser de gran utilidad en cualquier ámbito de la vida profesional, y abre una amplia variedad de opciones de carrera.`,
    Planificación: 
      ` Presentas una muy buena capacidad de planificación. Esta habilidad indica que tienes un talento natural para organizar, estructurar y coordinar tareas a largo plazo. Las personas con buena capacidad de planificación son excelentes para establecer objetivos, diseñar estrategias para alcanzarlos y llevar a cabo un seguimiento constante para asegurar que todo se cumpla dentro de los plazos establecidos. ¡Bien hecho sigue así!`,
  };

 const handleNext = async () => {
  if (current < total - 1) {
    setCurrent(current + 1);
    return;
  }

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
    `Te felicitamos por haber terminado el test. Este tipo de herramientas te ofrece una visión más clara tanto de las áreas en las que destacas como en las que podrías mejorar.
Te muestra tus potenciales, capacidades, intereses y fortalezas lo que puede ayudarte a tomar decisiones sobre tu vida y futuro profesional.
Recuerda que las habilidades cognitivas son solo una parte del todo. Los intereses personales, valores y motivaciones también influyen en las decisiones vocacionales.
Es importante que puedas tener presente que el test es solo una guía, pero te proporciona una base sobre la que puedes construir tu futuro.`;

  const devolucionFinal = [
    devolucionGeneral,
    ...devolucionesPorCategoria,
  ].join("\n\n");

  setDevolucion(devolucionFinal);

  // 🔹 Llamada a la API
  try {
    await fetch(`${API_URL}/api/tests/submitHabCogni`, {
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
  } catch (error) {
    console.error("Error guardando el test:", error);
  }

  setStep("final");
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
          <p className="text-sm mt-1">
            Este test de orientación vocacional se centra en evaluar tus habilidades cognitivas, como el razonamiento lógico, la memoria, la atención, la comprensión verbal, etc. Estas habilidades son esenciales para la vida en general como para diversas profesiones y conocerlas te permitirá identificar en qué áreas podrías desempeñarte con mayor eficacia y satisfacción.
A cada pregunta se le asignan 4 posibles respuestas, de las cuales solo una es la correcta. 
¡Mucho éxito en esta exploración de tus habilidades!

          </p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="bold">Lee cuidadosamente cada pregunta y elige la opción que consideres correcta. Trata de responder lo más rápido que puedas sin sacrificar la precisión.</p>
          <br />
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

          <button
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
            onClick={handleNext}
            disabled={!answers[current]}
          >
            {current === total - 1 ? "Finalizar" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestHabilidadesCognitivas;
