import { useState } from "react";
import testTiempoGestion from "../data/testTiempoGestion";
import QuestionCard from "../components/QuestionCard";

const API_URL = import.meta.env.VITE_API_URL;

function TestTiempoGestion() {
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

  const total = testTiempoGestion.length;
  const idTest = 2;

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

const validarEstudiante = async () => {
  setError("");

  const camposVacios = Object.entries(student).filter(
    ([_, valor]) => !valor.trim()
  );

  if (camposVacios.length > 0) {
    setError("Por favor completá todos los campos.");
    return;
  }

  try {
    // Paso 1: verificar si hizo el test 1
    const verificarRes = await fetch(`${API_URL}/api/tests/verificar-test1`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dni: student.dni, email: student.email }),
    });

    const verificarData = await verificarRes.json();

    if (!verificarRes.ok) {
      setError(verificarData.error || "No podés hacer este test aún.");
      return;
    }

    // Paso 2: enviar validación como en test 1 (sin respuestas aún)
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
      setError(data.error || "Error en la validación.");
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
      const respuestasFinales = Object.keys(answers).map((key) => {
        const index = parseInt(key, 10);
        const opcion = answers[index];
        const letra = ["a", "b", "c", "d", "e"][
          testTiempoGestion[index].options.indexOf(opcion)
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
        console.error("❌ Error al enviar test:", err);
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
        <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-xl shadow-md mb-6">
          <h1 className="text-3xl font-bold">Test 2: Organización del Tiempo y Gestión Económica</h1>
          <p className="text-sm mt-1">
            Este test evalúa tus hábitos de planificación, organización y uso
            del tiempo.
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
            question={testTiempoGestion[current]}
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

export default TestTiempoGestion;
