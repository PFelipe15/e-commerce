import React from 'react';

interface ErrorCardProps {
  errorText: string;
  onReset: () => void; // Supondo que onReset não receba argumentos e não retorne nada
}

const ErrorCard: React.FC<ErrorCardProps> = ({ errorText, onReset }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Erro:</strong>
      <span className="block sm:inline"> {errorText}</span>
      <button
        onClick={onReset}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Reset</title>
          <path d="M10 2C5.589 2 2 5.589 2 10s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/>
          <path d="M10 5H9v6h6v-1h-5z"/>
        </svg>
      </button>
    </div>
  );
};

export default ErrorCard;
