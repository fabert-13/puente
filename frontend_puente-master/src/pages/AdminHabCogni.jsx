import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminResultadosHabCogni() {
  const [respuestas, setRespuestas] = useState([]);
  const [error, setError] = useState("");
  const [modalContent, setModalContent] = useState(""); // Para la devolución completa
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRespuestas();
  }, []);

  const fetchRespuestas = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/respuestasHabCogni`);
      const data = await res.json();
      if (res.ok) setRespuestas(data);
      else setError(data.error || "Error al obtener respuestas.");
    } catch (err) {
      console.error("❌ Error:", err);
      setError("No se pudo conectar con el servidor.");
    }
  };

  const exportarCSV = () => {
    if (respuestas.length === 0) return;

    const totalPreguntas = respuestas[0]?.respuestas
      ? Object.keys(respuestas[0].respuestas).length
      : 0;

    const encabezado = [
      "Nombre",
      "Apellido",
      "DNI",
      "Email",
      ...Array.from({ length: totalPreguntas }, (_, i) => `R${i + 1}`),
      "Devolución",
    ];

    const filas = respuestas.map((r) => {
      const respuestasArray = Object.values(r.respuestas);
      return [
        r.nombre,
        r.apellido,
        r.dni,
        r.email,
        ...respuestasArray,
        r.devoluciones?.replace(/\n/g, " ") || "",
      ];
    });

    const csvContent = [encabezado, ...filas]
      .map((fila) =>
        fila
          .map((valor) => `"${String(valor).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `respuestas_hab_cogni.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const abrirModal = (texto) => {
    setModalContent(texto);
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setModalContent("");
    setIsModalOpen(false);
  };

  // Función para recortar la devolución a un resumen corto
  const resumen = (texto, maxLength = 100) => {
    if (!texto) return "";
    return texto.length > maxLength ? texto.slice(0, maxLength) + "..." : texto;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Respuestas Test Habilidades Cognitivas</h1>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={exportarCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Exportar CSV
          </button>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        {respuestas.length > 0 && (
          <div className="overflow-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Apellido</th>
                  <th className="p-2 border">DNI</th>
                  <th className="p-2 border">Email</th>
                  {Object.keys(respuestas[0].respuestas).map((_, i) => (
                    <th key={i} className="p-2 border">R{i + 1}</th>
                  ))}
                  <th className="p-2 border w-[300px]">Devolución</th>
                </tr>
              </thead>

              <tbody>
                {respuestas.map((r, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2 border">{r.nombre}</td>
                    <td className="p-2 border">{r.apellido}</td>
                    <td className="p-2 border">{r.dni}</td>
                    <td className="p-2 border">{r.email}</td>
                    {Object.values(r.respuestas).map((resp, i) => (
                      <td key={i} className="p-2 border">{resp}</td>
                    ))}
                    <td
                      className="p-2 border whitespace-pre-line text-left align-top w-[300px] cursor-pointer overflow-hidden max-h-16"
                      onClick={() => abrirModal(r.devoluciones)}
                      title="Click para ver completo"
                    >
                      {resumen(r.devoluciones, 100)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full relative">
            <button
              onClick={cerrarModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-500 font-bold text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Devolución completa</h2>
            <p className="whitespace-pre-line">{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}
