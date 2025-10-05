import React from 'react';

const MessageModal = ({ message, onNextLevel, level, timeUp, onRestart }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl text-center max-w-lg mx-4 transform transition-transform duration-300 animate-fade-in-up">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-green-400 to-teal-400 w-20 h-20 rounded-full flex items-center justify-center shadow-lg animate-glow">
            <span className="text-4xl">🎉</span>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">¡Nivel {level} Completado!</h2>
        <p className="text-md md:text-lg text-gray-700 mb-6">{message}</p>

        <div className="flex items-center justify-center gap-4">
          {!timeUp ? (
            <button
              onClick={onNextLevel}
              className="px-5 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-full font-semibold shadow-md hover-lift"
            >
              Siguiente Nivel
            </button>
          ) : (
            <button
              onClick={onRestart}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold shadow-md hover-lift"
            >
              Reiniciar desde Nivel 1
            </button>
          )}

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 hover-lift"
          >
            Jugar de Nuevo
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;