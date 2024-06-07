import React from 'react';

const Question = ({ question }) => {
  return (
    <div className="max-w-[85%] mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow mt-8">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
        <p className="text-gray-600 mb-4">{question.category}</p>
        <p className="text-gray-500">Company: {question.company}</p>
      </div>
    </div>
  );
}

export default Question;
