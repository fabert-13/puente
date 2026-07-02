import { useEffect, useState } from "react";
import { devolucionesAutoconocimiento } from "../data/devoluciones";
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminResultados() {
  const [idTest, setIdTest] = useState("");
  const [respuestas, setRespuestas] = useState([]);
  const [error, setError] = useState("");
  const [filtroDevolucion, setFiltroDevolucion] = useState("");

  const exportarCSV = () => {
    if (respuestasFiltradas.length === 0) return;

    const encabezado = [
      "Nombre",
      "Apellido",
      "DNI",
      "Email",
      ...Array.from({ length: 10 }, (_, i) => `Respuesta${i + 1}`),
      "Devolución",
    ];

    const filas = respuestasFiltradas.map((r) => [
      r.nombre,
      r.apellido,
      r.dni,
      r.email,
      r.respuesta1,
      r.respuesta2,
      r.respuesta3,
      r.respuesta4,
      r.respuesta5,
      r.respuesta6,
      r.respuesta7,
      r.respuesta8,
      r.respuesta9,
      r.respuesta10,
      r.devolucion.replace(/\n/g, " "), // quitar saltos de línea
    ]);

    const csvContent = [encabezado, ...filas]
      .map((fila) =>
        fila
          .map(
            (valor) => `"${String(valor).replace(/"/g, '""')}"` // escapado de comillas
          )
          .join(",")
      )
      .join("\n");

    const BOM = "\uFEFF"; // BOM: Byte Order Mark
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `respuestas_test_${idTest}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchRespuestas = async () => {
    if (!idTest) return;

    try {
      const res = await fetch(
        `${API_URL}/api/admin/respuestas/${idTest}`
      );
      const data = await res.json();

      if (res.ok) {
        setRespuestas(data);
        setError("");
      } else {
        setError(data.error || "Error al obtener respuestas.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError("No se pudo conectar con el servidor.");
    }
  };

  const respuestasFiltradas = filtroDevolucion
    ? respuestas.filter(
        (r) =>
          r.devolucion.trim() === devolucionesAutoconocimiento[filtroDevolucion]
      )
    : respuestas;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Respuestas por Test</h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="number"
            placeholder="ID del test (ej. 1)"
            value={idTest}
            onChange={(e) => setIdTest(e.target.value)}
            className="border rounded px-3 py-2 w-48"
          />
          <button
            onClick={fetchRespuestas}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {respuestas.length > 0 && (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
              <p className="text-sm text-gray-700">
                Total de respuestas:{" "}
                <strong>{respuestasFiltradas.length}</strong>
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm">Filtrar por devolución:</label>
                <select
                  value={filtroDevolucion}
                  onChange={(e) => setFiltroDevolucion(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Todas</option>
                  <option value="a">Devolución A</option>
                  <option value="b">Devolución B</option>
                  <option value="c">Devolución C</option>
                  <option value="d">Devolución D</option>
                  <option value="e">Devolución E</option>
                </select>

                <button
                  onClick={exportarCSV}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Exportar CSV
                </button>
              </div>
            </div>
          </>
        )}

        {respuestas.length > 0 && (
          <div className="overflow-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Apellido</th>
                  <th className="p-2 border">DNI</th>
                  <th className="p-2 border">Email</th>
                  {[...Array(10)].map((_, i) => (
                    <th key={i} className="p-2 border">
                      R{i + 1}
                    </th>
                  ))}
                  <th className="p-2 border w-[300px]">Devolución</th>{" "}
                  {/* más ancho */}
                </tr>
              </thead>

              <tbody>
                {respuestasFiltradas.map((r, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2 border">{r.nombre}</td>
                    <td className="p-2 border">{r.apellido}</td>
                    <td className="p-2 border">{r.dni}</td>
                    <td className="p-2 border">{r.email}</td>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <td key={i} className="p-2 border">
                        {r[`respuesta${i + 1}`]}
                      </td>
                    ))}
                    <td className="p-2 border whitespace-pre-line text-left align-top w-[300px]">
                      {r.devolucion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
