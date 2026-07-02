// components/Question.jsx
const Question = ({ preguntaObj, onSelect, selectedOption }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{preguntaObj.pregunta}</h2>
      <ul className="space-y-2">
        {preguntaObj.opciones.map((opcion, index) => (
          <li key={index}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={preguntaObj.pregunta}
                value={opcion}
                checked={selectedOption === opcion}
                onChange={() => onSelect(opcion)}
                className="accent-purple-600"
              />
              <span>{opcion}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
