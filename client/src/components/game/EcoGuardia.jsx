import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import MessageModal from './MessageModal';
import { cards as cardData } from '../../data/game/cards';
import { messages } from '../../data/game/messages';

const EcoGuardia = () => {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [checking, setChecking] = useState(false);
  const [revealSeconds, setRevealSeconds] = useState(0);
  const revealTimerRef = useRef(null);
  const [levelSeconds, setLevelSeconds] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const levelTimerRef = useRef(null);
  const checkTimeoutRef = useRef(null);

  const levelConfig = {
    1: { pairs: 5, time: 5 },
    2: { pairs: 6, time: 5 },
    3: { pairs: 6, time: 4 },
    4: { pairs: 7, time: 5 },
    5: { pairs: 7, time: 4 },
    6: { pairs: 8, time: 5 },
    7: { pairs: 8, time: 4 },
    8: { pairs: 9, time: 5 },
    9: { pairs: 9, time: 4 },
    10: { pairs: 10, time: 4 },
  };

  useEffect(() => {
    if (gameStarted && !gameFinished) {
      setupLevel();
    }
  }, [level, gameStarted, gameFinished]);

  useEffect(() => {
    return () => {
      if (levelTimerRef.current) clearInterval(levelTimerRef.current);
      if (revealTimerRef.current) clearInterval(revealTimerRef.current);
    };
  }, []);

  const setupLevel = () => {
    const { pairs, time } = levelConfig[level];
    const selectedCards = cardData.slice(0, pairs);
    const gameCards = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    setCards(gameCards);
    // Mostrar todas las cartas brevemente al inicio
    setFlippedCards(gameCards.map(c => c.uniqueId));
    setMatchedCards([]);

    // Visible countdown for the reveal
    setRevealSeconds(time);
    if (revealTimerRef.current) clearInterval(revealTimerRef.current);
    revealTimerRef.current = setInterval(() => {
      setRevealSeconds(s => {
        if (s <= 1) {
          clearInterval(revealTimerRef.current);
          setFlippedCards([]);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    // Level timer: base time scaled down as level increases (game speeds up)
  const base = 25; // base seconds for level 1 (reduced for faster gameplay)
  const secondsForLevel = Math.max(6, Math.round(base - (level - 1) * 2));
    setLevelSeconds(secondsForLevel);
    setTimeUp(false);
    if (levelTimerRef.current) clearInterval(levelTimerRef.current);
    levelTimerRef.current = setInterval(() => {
      setLevelSeconds(s => {
        if (s <= 1) {
          clearInterval(levelTimerRef.current);
          setTimeUp(true);
          setMessage('Se acabó el tiempo. ¡Intenta de nuevo este nivel!');
          setShowModal(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const handleCardClick = (card) => {
    if (checking || flippedCards.length === 2 || matchedCards.includes(card.uniqueId) || flippedCards.includes(card.uniqueId)) {
      return;
    }
    const newFlippedCards = [...flippedCards, card.uniqueId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setChecking(true);
      const firstCard = cards.find(c => c.uniqueId === newFlippedCards[0]);
      const secondCard = cards.find(c => c.uniqueId === newFlippedCards[1]);

      if (firstCard.id === secondCard.id) {
        // match
          if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
          checkTimeoutRef.current = setTimeout(() => {
            setMatchedCards(prev => [...prev, firstCard.uniqueId, secondCard.uniqueId]);
            setFlippedCards([]);
            setChecking(false);
            checkTimeoutRef.current = null;
          }, 300);
      } else {
        // not match
          if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
          checkTimeoutRef.current = setTimeout(() => {
            setFlippedCards([]);
            setChecking(false);
            checkTimeoutRef.current = null;
          }, 700);
      }
    }
  };

  useEffect(() => {
    if (gameStarted && cards.length > 0 && matchedCards.length === cards.length && !timeUp) {
      // deterministic: choose message based on level to ensure a concientización message each level
      const idx = (level - 1) % messages.length;
      const selected = messages[idx];
      setMessage(selected);
      setShowModal(true);
    }
  }, [matchedCards, cards, gameStarted, level, timeUp]);

  const handleNextLevel = () => {
    // clean timers and prepare next level
    clearTimers();
    setShowModal(false);
    setFlippedCards([]);
    setMatchedCards([]);
    if (level < 10) {
      setLevel(prev => prev + 1);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestartFromTimeout = () => {
    clearTimers();
    setShowModal(false);
    setLevel(1);
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setGameStarted(true);
    setTimeUp(false);
  };

  const resetGame = () => {
    clearTimers();
    setLevel(1);
    setGameStarted(false);
    setGameFinished(false);
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setShowModal(false);
  };

  const clearTimers = () => {
    if (revealTimerRef.current) {
      clearInterval(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (levelTimerRef.current) {
      clearInterval(levelTimerRef.current);
      levelTimerRef.current = null;
    }
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
      checkTimeoutRef.current = null;
    }
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">
          <h1 className="text-5xl font-extrabold mb-4">EcoGuardia 🌎</h1>
          <p className="text-gray-600 mb-6">Encuentra las parejas y aprende acciones para cuidar el planeta.</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setGameStarted(true)}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-full font-semibold shadow-md"
            >
              Comenzar
            </button>
            <button onClick={resetGame} className="px-5 py-3 border rounded-full text-gray-700">Reiniciar</button>
          </div>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#d4f8d4]">
        <h1 className="text-4xl font-bold text-center mb-8 font-['Poppins']">
          ¡Excelente! Has demostrado ser un verdadero EcoGuardia 🌎.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex flex-col items-center font-['Nunito']">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">EcoGuardia</h2>
            <p className="text-sm text-gray-500">Nivel {level} • Parejas: {matchedCards.length / 2} / {cards.length / 2}</p>
            <p className="text-xs text-gray-400 mt-1">Revelado: {revealSeconds > 0 ? `${revealSeconds}s` : 'Jugando'}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Tiempo restante: <span className="font-semibold">{levelSeconds}s</span></div>
            <button onClick={resetGame} className="px-4 py-2 border rounded-full text-sm hover-lift">Reiniciar</button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Encuentra las parejas</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-center">
          {cards.map((card, idx) => (
            <Card
              key={card.uniqueId}
              index={idx}
              card={card}
              isFlipped={flippedCards.includes(card.uniqueId) || matchedCards.includes(card.uniqueId)}
              isMatched={matchedCards.includes(card.uniqueId)}
              disabled={checking}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <MessageModal
          message={message}
          onNextLevel={handleNextLevel}
          level={level}
          timeUp={timeUp}
          onRestart={handleRestartFromTimeout}
        />
      )}
    </div>
  );
};

export default EcoGuardia;