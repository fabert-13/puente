import React from "react";

export default function QuestionOV({ preguntaObj, selectedOption, onSelect }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">{preguntaObj.texto}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {preguntaObj.opciones.map((opcion, index) => (
          <button
            key={index}
            onClick={() => onSelect(opcion)}
            className={`p-4 rounded-xl border transition-all duration-200 
              ${
                selectedOption === opcion
                  ? "bg-purple-600 text-white border-purple-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-purple-100"
              }`}
          >
            {opcion}
          </button>
        ))}
      </div>
    </div>
  );
}
