import React, { useState, useEffect } from "react";
import QuestionOV from "../components/QuestionOV";
import orientacionVocacional from "../data/testOrientacionVocacional.js";
import { devolucionesAutoconocimiento } from "../data/devolucionesOV.js";
const API_URL = import.meta.env.VITE_API_URL;

export default function TestOrientacionVocacional() {
  const [step, setStep] = useState("datos"); // "datos" | "test" | "final"
  const [student, setStudent] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
  });
  const [error, setError] = useState("");

  const [categoriaIndex, setCategoriaIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [categoriasDestacadas, setCategoriasDestacadas] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoriaIndex]);

  const categorias = orientacionVocacional.categorias;
  const categoriaActual = categorias[categoriaIndex];

  // --- 🔹 Manejo del formulario inicial
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const validarEstudiante = async () => {
  const camposVacios = Object.entries(student).filter(
    ([_, valor]) => !valor.trim()
  );
  if (camposVacios.length > 0) {
    setError("Por favor completá todos los campos.");
    return;
  }

  try {
    // Llamada GET para verificar si ya existe el estudiante
    const response = await fetch(
      `${API_URL}/api/tests/orientacion-vocacional?dni=${student.dni}`
    );

    if (!response.ok) {
      throw new Error("Error al verificar el estudiante.");
    }

    const data = await response.json();

    // Si el backend devuelve algo (ya existe el test)
    if (data && data.existe) {
      setError("Ya has respondido a este test.");
      return;
    }

    // Si no existe, puede continuar al test
    setError("");
    setStep("test");
  } catch (err) {
    console.error("Error al validar el estudiante:", err);
    setError("No se pudo verificar si ya respondiste el test.");
  }
};


  const handleSelect = (preguntaId, respuesta) => {
    setAnswers((prev) => ({
      ...prev,
      [`${categoriaActual.nombre}-${preguntaId}`]: respuesta,
    }));
  };

  const handleNext = () => {
    if (categoriaIndex < categorias.length - 1) {
      setCategoriaIndex((prev) => prev + 1);
    } else {
      const categoriasDetectadas = calcularDevolucion();
      setCategoriasDestacadas(categoriasDetectadas);
      setFinished(true);
      setStep("final");
    }
  };

  const calcularDevolucion = () => {
    const categoriasConInteres = [];
    categorias.forEach((cat) => {
      const respuestasCategoria = cat.preguntas.map(
        (p) => answers[`${cat.nombre}-${p.id}`]
      );
      const respuestasValidas = respuestasCategoria.filter(
        (r) => r === "Me interesa" || r === "No me disgusta"
      );
      const porcentaje =
        (respuestasValidas.length / cat.preguntas.length) * 100;
      if (porcentaje >= 70) categoriasConInteres.push(cat.nombre);
    });
    return categoriasConInteres;
  };

  const enviarResultados = async () => {
    const payload = {
      nombre: student.nombre,
      apellido: student.apellido,
      dni: student.dni,
      email: student.email,
      respuestas: answers,
      categoriasDestacadas,
    };

    try {
      setEnviando(true);
      const response = await fetch(`${API_URL}/api/tests/orientacion-vocacional`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Guardado en base de datos:", data);
        setGuardado(true);
      } else {
        alert(data.error || "Error al guardar el test.");
      }
    } catch (err) {
      console.error("❌ Error al conectar con el servidor:", err);
      alert("No se pudo guardar el test. Revisá la conexión con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

  // --- 🔹 Paso 1: Datos del estudiante
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
                placeholder={
                  field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={student[field]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            ))}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={validarEstudiante}
            >
              Comenzar test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 🔹 Paso 2: Test vocacional (sin cambios)
  if (step === "test") {
    const totalRespondidas = categoriaActual.preguntas.filter(
      (p) => answers[`${categoriaActual.nombre}-${p.id}`]
    ).length;

    const puedeContinuar =
      totalRespondidas === categoriaActual.preguntas.length;

    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <header className="bg-gradient-to-r from-sky-600 to-blue-600 text-white p-6 rounded-xl shadow-md mb-6">
            <h1 className="text-3xl font-bold">Test Vocacional</h1>
            <p className="text-sm mt-2">
              Las siguientes frases hacen referencia a intereses y preferencias relacionadas con distintas áreas de estudio y de trabajo. Para completar el test debes leer cuidadosamente cada afirmación y seleccionar la opción que más se ajuste a tus intereses.
<br />
<br />Selecciona:
<br />●	Me interesa: si te gusta o atrae la actividad mencionada. 
<br />●	No me disgusta: si NO tenés una opinión negativa sobre la actividad.
<br />●	No me interesa: si NO sentís afinidad o interés por la actividad.

            </p>
          </header>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-sm text-gray-600 mb-4">
              Categoría: <strong>{categoriaActual.nombre}</strong> —{" "}
              {totalRespondidas}/{categoriaActual.preguntas.length} respondidas
            </div>

            <div className="grid gap-8">
              {categoriaActual.preguntas.map((pregunta) => (
                <QuestionOV
                  key={pregunta.id}
                  preguntaObj={pregunta}
                  selectedOption={
                    answers[`${categoriaActual.nombre}-${pregunta.id}`]
                  }
                  onSelect={(respuesta) => handleSelect(pregunta.id, respuesta)}
                />
              ))}
            </div>

            <div className="flex justify-end mt-8">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full disabled:opacity-50"
                onClick={handleNext}
                disabled={!puedeContinuar}
              >
                {categoriaIndex === categorias.length - 1
                  ? "Finalizar test"
                  : "Siguiente categoría"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 🔹 Paso 3: Resultados (sin cambios)
  if (step === "final") {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <header className="bg-gradient-to-r from-sky-600 to-blue-600 text-white p-6 rounded-xl shadow-md mb-6">
            <h1 className="text-3xl font-bold">Resultados del Test Vocacional</h1>
          </header>

          <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
            <p className="text-gray-800 text-lg">
              🎓 <strong>Devolución general:</strong> ¡Felicitaciones por haber completado el test!
Este proceso es un paso importante para descubrir qué áreas profesionales podrían ser más adecuadas para ti según tus intereses, aptitudes y preferencias. Este test, en conjunto con los anteriores, te permitirán reflexionar sobre tus fortalezas y posibles cambios para explorar en el futuro.
Recuerda que este cuestionario es sólo un punto de partida. Las decisiones vocacionales pueden cambiar con el tiempo y las experiencias en el camino también tendrán influencia en tus intereses y elecciones profesionales. 
¡Buena suerte en tu camino hacia un futuro lleno de oportunidades y descubrimientos!

            </p>

            {categoriasDestacadas.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  Áreas de interés detectadas:
                </h2>
                {categoriasDestacadas.map((cat, i) => {
                  const key = cat
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                  const textoDevolucion = devolucionesAutoconocimiento[key];
                  return (
                    <div key={i} className="border-t pt-4">
                      <h3 className="text-lg font-bold text-orange-700 mb-2">
                        {cat}
                      </h3>
                      <p className="whitespace-pre-line text-gray-800">
                        {textoDevolucion ||
                          "No hay devolución específica para esta categoría."}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="mt-4 text-gray-700">
                No se detectó un interés marcado en ninguna categoría. Te
                recomendamos explorar distintas áreas para descubrir tus
                preferencias.
              </p>
            )}

            <div className="pt-6 border-t">
              {!guardado ? (
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full disabled:opacity-50"
                  onClick={enviarResultados}
                  disabled={enviando}
                >
                  {enviando ? "Guardando..." : "Guardar resultados"}
                </button>
              ) : (
                <p className="text-green-600 font-semibold">
                  ✅ Tus resultados se guardaron correctamente.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
