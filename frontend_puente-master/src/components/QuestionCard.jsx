const QuestionCard = ({ question, onSelect, selectedOption }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <ul className="space-y-2">
        {question.options.map((option, index) => (
          <li key={index}>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => onSelect(option)}
              />
              <span>{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
