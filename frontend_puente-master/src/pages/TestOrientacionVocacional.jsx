
import React, { useState, useEffect } from "react";
import QuestionOV from "../components/QuestionOV";
import orientacionVocacional from "../data/testOrientacionVocacional.js";
import { devolucionesAutoconocimiento } from "../data/devolucionesOV.js";

const API_URL = import.meta.env.VITE_API_URL;

export default function TestOrientacionVocacional() {
  const [step, setStep] = useState("datos");
  const [student, setStudent] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoriaIndex, setCategoriaIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [categoriasDestacadas, setCategoriasDestacadas] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const categorias = orientacionVocacional.categorias;
  const categoriaActual = categorias[categoriaIndex];

  const totalPreguntas = categorias.reduce(
    (total, categoria) => total + categoria.preguntas.length,
    0
  );

  const totalRespondidas = Object.keys(answers).length;

  const porcentajeProgreso =
    totalPreguntas > 0
      ? (totalRespondidas / totalPreguntas) * 100
      : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoriaIndex, step]);

  // -------------------------------------
  // DATOS DEL ESTUDIANTE
  // -------------------------------------

  const handleChange = (e) => {
    setStudent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validarEstudiante = async () => {
    if (loading) return;

    const camposVacios = Object.entries(student).filter(
      ([_, valor]) => !valor.trim()
    );

    if (camposVacios.length > 0) {
      setError("Por favor completá todos los campos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/tests/orientacion-vocacional?dni=${encodeURIComponent(
          student.dni
        )}`
      );

      if (!response.ok) {
        throw new Error("Error al verificar el estudiante.");
      }

      const data = await response.json();

      if (data && data.existe) {
        setError("Ya has respondido a este test.");
        return;
      }

      setStep("test");
    } catch (err) {
      console.error("Error al validar el estudiante:", err);
      setError(
        "No se pudo verificar si ya respondiste el test."
      );
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------
  // RESPUESTAS
  // -------------------------------------

  const handleSelect = (preguntaId, respuesta) => {
    setAnswers((prev) => ({
      ...prev,
      [`${categoriaActual.nombre}-${preguntaId}`]: respuesta,
    }));
  };

  // -------------------------------------
  // CÁLCULO DE RESULTADOS
  // -------------------------------------

  const calcularDevolucion = () => {
    const categoriasConInteres = [];

    categorias.forEach((cat) => {
      const respuestasCategoria = cat.preguntas.map(
        (pregunta) =>
          answers[`${cat.nombre}-${pregunta.id}`]
      );

      const respuestasValidas = respuestasCategoria.filter(
        (respuesta) =>
          respuesta === "Me interesa" ||
          respuesta === "No me disgusta"
      );

      const porcentaje =
        (respuestasValidas.length / cat.preguntas.length) * 100;

      if (porcentaje >= 70) {
        categoriasConInteres.push(cat.nombre);
      }
    });

    return categoriasConInteres;
  };

  // -------------------------------------
  // NAVEGACIÓN ENTRE CATEGORÍAS
  // -------------------------------------

  const handleNext = () => {
    const categoriaCompleta = categoriaActual.preguntas.every(
      (pregunta) =>
        answers[`${categoriaActual.nombre}-${pregunta.id}`]
    );

    if (!categoriaCompleta) {
      setError(
        "Respondé todas las preguntas antes de continuar."
      );
      return;
    }

    setError("");

    if (categoriaIndex < categorias.length - 1) {
      setCategoriaIndex((prev) => prev + 1);
    } else {
      const categoriasDetectadas = calcularDevolucion();
      setCategoriasDestacadas(categoriasDetectadas);
      setStep("final");
    }
  };

  // -------------------------------------
  // GUARDAR RESULTADOS
  // -------------------------------------

  const enviarResultados = async () => {
    if (enviando || guardado) return;

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
      setError("");

      const response = await fetch(
        `${API_URL}/api/tests/orientacion-vocacional`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        console.log("Resultados guardados:", data);
        setGuardado(true);
      } else {
        setError(
          data.error || "Error al guardar el test."
        );
      }
    } catch (err) {
      console.error("Error al enviar resultados:", err);
      setError(
        "No se pudo guardar el test. Revisá la conexión con el servidor."
      );
    } finally {
      setEnviando(false);
    }
  };

  // -------------------------------------
  // PANTALLA 1: DATOS DEL ESTUDIANTE
  // -------------------------------------

  if (step === "datos") {
    return (
      <div className="min-h-screen flex flex-col pt-12 items-center bg-gray-100 p-4">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-md w-full">

          <h2 className="text-xl font-bold mb-4 text-center">
            Datos del Estudiante
          </h2>

          <div className="space-y-3">
            {["nombre", "apellido", "dni", "email"].map(
              (field) => (
                <input
                  key={field}
                  type={
                    field === "email" ? "email" : "text"
                  }
                  name={field}
                  placeholder={
                    field.charAt(0).toUpperCase() +
                    field.slice(1)
                  }
                  value={student[field]}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              )
            )}

            {error && (
              <p className="text-red-600 text-sm">
                {error}
              </p>
            )}

            <button
              className={`w-full text-white px-4 py-2 rounded transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-sky-600"
              }`}
              onClick={validarEstudiante}
              disabled={loading}
            >
              {loading
                ? "Verificando..."
                : "Comenzar test"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------
  // PANTALLA 2: TEST VOCACIONAL
  // -------------------------------------

  if (step === "test") {
    const respondidasCategoria =
      categoriaActual.preguntas.filter(
        (pregunta) =>
          answers[
            `${categoriaActual.nombre}-${pregunta.id}`
          ]
      ).length;

    const puedeContinuar =
      respondidasCategoria ===
      categoriaActual.preguntas.length;

    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">

          {/* ENCABEZADO */}

          <header className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-6 rounded-xl shadow-md mb-6">

            <h1 className="text-3xl font-bold">
              Test de Orientación Vocacional
            </h1>

            <p className="text-lg font-semibold mt-3">
              ¡Te damos la bienvenida a tu evaluación de intereses vocacionales!
            </p>

            <p className="text-sm mt-3 leading-relaxed">
              Las siguientes frases hacen referencia a
              intereses y preferencias relacionadas con
              distintas áreas de estudio y de trabajo.
              Para completar el test debes leer
              cuidadosamente cada afirmación y seleccionar
              la opción que más se ajuste a tus intereses.
            </p>

            <div className="mt-4">
              <p className="text-sm font-bold mb-2">
                Instrucciones:
              </p>

              <p className="text-sm mb-3">
                Seleccioná una de las siguientes opciones
                para cada afirmación:
              </p>

              <ul className="text-sm space-y-2 list-disc pl-5 leading-relaxed">

                <li>
                  <strong>Me interesa:</strong>{" "}
                  si te gusta o atrae la actividad mencionada.
                </li>

                <li>
                  <strong>No me disgusta:</strong>{" "}
                  si NO tenés una opinión negativa sobre
                  la actividad.
                </li>

                <li>
                  <strong>No me interesa:</strong>{" "}
                  si NO sentís afinidad o interés por
                  la actividad.
                </li>

              </ul>
            </div>

            <p className="text-sm mt-4 font-semibold">
              ¡Respondé con sinceridad y disfrutá esta experiencia de autoconocimiento!
            </p>
          </header>

          {/* CONTENEDOR DE PREGUNTAS */}

          <div className="bg-white p-6 rounded-xl shadow-md">

            {/* CATEGORÍA ACTUAL */}

            <div className="mb-5">

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {categoriaActual.nombre}
              </h2>

              <p className="text-sm text-gray-600">
                Categoría {categoriaIndex + 1} de{" "}
                {categorias.length}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {respondidasCategoria} de{" "}
                {categoriaActual.preguntas.length} preguntas
                respondidas en esta categoría.
              </p>

            </div>

            {/* PROGRESO GENERAL */}

            <div className="mb-6">

              <div className="flex justify-between items-center mb-2">

                <span className="text-sm font-medium text-gray-600">
                  Progreso del test
                </span>

                <span className="text-sm font-semibold text-purple-600">
                  {totalRespondidas} de {totalPreguntas}
                </span>

              </div>

              <div
                className="w-full bg-gray-200 h-2 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={totalRespondidas}
                aria-valuemin={0}
                aria-valuemax={totalPreguntas}
              >
                <div
                  className="h-2 rounded-full bg-purple-600 transition-all duration-300"
                  style={{
                    width: `${porcentajeProgreso}%`,
                  }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-2 text-right">
                {Math.round(porcentajeProgreso)}% completado
              </p>

            </div>

            {/* PREGUNTAS */}

            <div className="grid gap-8">

              {categoriaActual.preguntas.map((pregunta) => (
                <QuestionOV
                  key={pregunta.id}
                  preguntaObj={pregunta}
                  selectedOption={
                    answers[
                      `${categoriaActual.nombre}-${pregunta.id}`
                    ]
                  }
                  onSelect={(respuesta) =>
                    handleSelect(pregunta.id, respuesta)
                  }
                />
              ))}

            </div>

            {/* ERRORES */}

            {error && (
              <p className="text-red-600 text-sm mt-4">
                {error}
              </p>
            )}

            {/* BOTÓN SIGUIENTE */}

            <div className="flex justify-end mt-8">

              <button
                className={`px-6 py-2 rounded-full text-white transition ${
                  puedeContinuar
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
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

  // -------------------------------------
  // PANTALLA 3: RESULTADOS
  // -------------------------------------

  if (step === "final") {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">

          {/* ENCABEZADO DE RESULTADOS */}

          <header className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-6 rounded-xl shadow-md mb-6">

            <h1 className="text-3xl font-bold">
              Resultados del Test de Orientación Vocacional
            </h1>

            <p className="text-lg font-semibold mt-3">
              ¡Gracias por completar el test!
            </p>

          </header>

          {/* CONTENEDOR DE DEVOLUCIONES */}

          <div className="bg-white p-6 rounded-xl shadow-md space-y-6">

            {/* RETROALIMENTACIÓN GLOBAL */}

            <div>

              <h2 className="text-2xl font-bold text-purple-600 mb-4">
                Retroalimentación
              </h2>

              <div className="text-gray-700 text-justify space-y-4 leading-relaxed">

                <p className="font-semibold">
                  ¡Felicitaciones por haber completado el test!
                </p>

                <p>
                  Este proceso es un paso importante para
                  descubrir qué áreas profesionales podrían
                  ser más adecuadas para ti según tus
                  intereses, aptitudes y preferencias.
                  Este test, en conjunto con los anteriores,
                  te permitirán reflexionar sobre tus
                  fortalezas y posibles cambios para
                  explorar en el futuro.
                </p>

                <p>
                  Recuerda que este cuestionario es sólo
                  un punto de partida. Las decisiones
                  vocacionales pueden cambiar con el tiempo
                  y las experiencias en el camino también
                  tendrán influencia en tus intereses y
                  elecciones profesionales.
                </p>

                <p className="font-semibold text-purple-600">
                  ¡Buena suerte en tu camino hacia un futuro
                  lleno de oportunidades y descubrimientos!
                </p>

              </div>
            </div>

            {/* ÁREAS DE INTERÉS DETECTADAS */}

            {categoriasDestacadas.length > 0 ? (

              <div className="space-y-6 border-t pt-6">

                <h2 className="text-xl font-bold text-gray-800">
                  Áreas de interés detectadas
                </h2>

                <p className="text-sm text-gray-600">
                  A continuación, encontrarás información
                  sobre las áreas que se destacaron según
                  tus respuestas.
                </p>

                {categoriasDestacadas.map((cat) => {

                  const key = cat
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                  const textoDevolucion =
                    devolucionesAutoconocimiento[key];

                  return (
                    <div
                      key={cat}
                      className="border-t pt-4"
                    >

                      <h3 className="text-lg font-bold text-orange-700 mb-3">
                        {cat}
                      </h3>

                      <p className="whitespace-pre-line text-gray-700 text-justify leading-relaxed">
                        {textoDevolucion ||
                          "No hay devolución específica para esta categoría."}
                      </p>

                    </div>
                  );
                })}

              </div>

            ) : (

              <div className="border-t pt-6">

                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Exploración de intereses
                </h2>

                <p className="text-gray-700 leading-relaxed">
                  No se detectó un interés marcado en
                  ninguna categoría. Te recomendamos
                  explorar distintas áreas para descubrir
                  tus preferencias.
                </p>

              </div>

            )}

            {/* GUARDAR RESULTADOS */}

            <div className="pt-6 border-t">

              {error && (
                <p className="text-red-600 text-sm mb-4">
                  {error}
                </p>
              )}

              {!guardado ? (

                <button
                  className={`px-6 py-2 rounded-full text-white transition ${
                    enviando
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                  onClick={enviarResultados}
                  disabled={enviando}
                >
                  {enviando
                    ? "Guardando..."
                    : "Guardar resultados"}
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

  return null;
}

