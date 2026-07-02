import { useState } from "react";
import testAutoconocimiento from "../data/testAutoconocimiento";
import QuestionCard from "../components/QuestionCard";
const API_URL = import.meta.env.VITE_API_URL;

function TestAutoconocimiento() {
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

  const total = testAutoconocimiento.length;
  const idTest = 1;

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const validarEstudiante = async () => {
    setError("");

    // Validar campos vacíos
    const camposVacios = Object.entries(student).filter(
      ([_, valor]) => !valor.trim()
    );

    if (camposVacios.length > 0) {
      setError("Por favor completá todos los campos.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/tests/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...student,
          idTest,
          respuestas: [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        setStep("test");
      }
    } catch (err) {
      console.error("❌ Error al validar estudiante:", err);
      setError("Error al conectar con el servidor.");
    }
  };

  const handleSelect = (option) => {
    setAnswers({ ...answers, [current]: option });
  };

  const handleNext = async () => {
    if (current < total - 1) {
      setCurrent(current + 1);
    } else {
      // Enviar respuestas al backend
      const respuestasFinales = Object.keys(answers).map((key) => {
        const index = parseInt(key, 10);
        const opcion = answers[index];
        const letra = ["a", "b", "c", "d", "e"][
          testAutoconocimiento[index].options.indexOf(opcion)
        ];
        return letra || "e";
      });

      try {
        const res = await fetch(`${API_URL}/api/tests/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...student,
            idTest,
            respuestas: respuestasFinales,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setDevolucion(data.devolucion);
          setStep("final");
        } else {
          setError(data.error || "No se pudo guardar el test.");
        }
      } catch (err) {
        console.error("❌ Error al validar estudiante:", err);
        setError("Error al enviar el test.");
      }
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="bg-gradient-to-r from-blue-600 to-sky-600 text-white p-6 rounded-xl shadow-md mb-6">
          <h1 className="text-3xl font-bold">Test 1: Autoconocimiento</h1>
          <p className="text-sm mt-1">
            Este test está diseñado para ayudarte a identificar tus intereses,
            habilidades y valores.
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

          <QuestionCard
            question={testAutoconocimiento[current]}
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

export default TestAutoconocimiento;
