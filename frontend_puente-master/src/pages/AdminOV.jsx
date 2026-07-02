const API_URL = import.meta.env.VITE_API_URL;
import React, { useEffect, useState } from "react";
import orientacionVocacional from "../data/testOrientacionVocacional";

export default function ResultadosOV() {
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dni, setDni] = useState("");
  const [filtradas, setFiltradas] = useState([]);
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tests/orientacion-vocacional`);
      const data = await response.json();
      setRespuestas(data);
      setFiltradas(data);
    } catch (error) {
      console.error("Error al obtener respuestas:", error);
    } finally {
      setLoading(false);
    }
  };

   const handleBuscar = () => {
    if (!dni) {
      setFiltradas(respuestas);
    } else {
      const filtrado = respuestas.filter(r => r.dni.includes(dni));
      setFiltradas(filtrado);
    }
  };

  // 🔹 Función que obtiene todas las respuestas con sus preguntas y categorías
  const obtenerDetallePreguntas = (respuestasJSON) => {
    const preguntasMapeadas = [];

    Object.entries(respuestasJSON).forEach(([clave, valor]) => {
      const [categoria, idStr] = clave.split("-");
      const id = parseInt(idStr);

      orientacionVocacional.categorias.forEach(cat => {
        const pregunta = cat.preguntas.find(p => p.id === id);
        if (pregunta) {
          preguntasMapeadas.push({
            categoria: cat.nombre,
            texto: pregunta.texto,
            respuesta: valor,
          });
        }
      });
    });

    // 🔹 Ordenar por categoría en el mismo orden del archivo original
    const ordenCategorias = orientacionVocacional.categorias.map(c => c.nombre);
    preguntasMapeadas.sort((a, b) => {
      const iA = ordenCategorias.indexOf(a.categoria);
      const iB = ordenCategorias.indexOf(b.categoria);
      if (iA !== iB) return iA - iB;
      // dentro de la misma categoría, orden por ID (extraído del texto)
      const numA = parseInt(a.texto.split(".")[0]);
      const numB = parseInt(b.texto.split(".")[0]);
      return numA - numB;
    });

    return preguntasMapeadas;
  };

  // 🔹 Exportar los datos (con todas las respuestas) a CSV
  const exportarCSV = () => {
    if (!filtradas.length) {
      alert("No hay datos para exportar.");
      return;
    }

    const encabezados = [
      "Nombre",
      "Apellido",
      "DNI",
      "Email",
      "Categoría",
      "Pregunta",
      "Respuesta",
      "Fecha de creación",
    ];

    let filas = [];

    filtradas.forEach((r) => {
      const detalle = obtenerDetallePreguntas(r.respuestas);
      detalle.forEach((p) => {
        filas.push([
          r.nombre,
          r.apellido,
          r.dni,
          r.email,
          p.categoria,
          p.texto.replace(/;/g, ","), // evita romper CSV
          p.respuesta,
          new Date(r.created_at).toLocaleString("es-AR"),
        ]);
      });
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [encabezados.join(";"), ...filas.map(f => f.join(";"))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "resultados_orientacion_vocacional_completo.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">
          Respuestas - Test de Orientación Vocacional
        </h1>

        {/* 🔍 Buscador y botón de exportar */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />
          <button
            onClick={handleBuscar}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Buscar
          </button>
          <button
            onClick={exportarCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Exportar CSV
          </button>
        </div>

        {/* 🧾 Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border">
            <thead className="bg-purple-100 text-gray-700 uppercase">
              <tr>
                <th className="p-3 border">Nombre</th>
                <th className="p-3 border">Apellido</th>
                <th className="p-3 border">DNI</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Categorías destacadas</th>
                <th className="p-3 border">Fecha</th>
                <th className="p-3 border">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.length > 0 ? (
                filtradas.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{r.nombre}</td>
                    <td className="p-3 border">{r.apellido}</td>
                    <td className="p-3 border">{r.dni}</td>
                    <td className="p-3 border">{r.email}</td>
                    <td className="p-3 border">
                      {r.categorias_destacadas?.length
                        ? r.categorias_destacadas.join(", ")
                        : "—"}
                    </td>
                    <td className="p-3 border">
                      {new Date(r.created_at).toLocaleDateString("es-AR")}
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => setDetalle(r)}
                        className="text-blue-600 hover:underline"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No se encontraron resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🟣 Modal de detalle */}
      {detalle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-700">
                Respuestas de {detalle.nombre} {detalle.apellido}
              </h2>
              <button
                onClick={() => setDetalle(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </div>

            {detalle.respuestas ? (
              // 🔹 Agrupar respuestas por categoría
              orientacionVocacional.categorias.map((cat) => {
                const preguntasCat = obtenerDetallePreguntas(detalle.respuestas).filter(
                  (p) => p.categoria === cat.nombre
                );
                if (preguntasCat.length === 0) return null;
                return (
                  <div key={cat.nombre} className="mb-4">
                    <h3 className="text-lg font-bold text-purple-700 mb-2 border-b">
                      {cat.nombre}
                    </h3>
                    {preguntasCat.map((p, i) => (
                      <div key={i} className="border-b py-2">
                        <p className="font-medium text-gray-800">{p.texto}</p>
                        <p className="text-purple-700 font-semibold">
                          Respuesta: {p.respuesta}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })
            ) : (
              <p>No hay respuestas registradas.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}