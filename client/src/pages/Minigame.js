import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Star, 
  Play, 
  Home, 
  RotateCcw,
  Smile,
  Frown,
  Zap,
  Droplet,
  Utensils,
  Moon,
  Sun
} from 'lucide-react';

const Minigame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [pou, setPou] = useState({
    name: "EcoPou",
    happiness: 100,
    hunger: 100,
    energy: 100,
    hygiene: 100,
    level: 1,
    experience: 0,
    coins: 0
  });
  const [currentMemory, setCurrentMemory] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [gamePhase, setGamePhase] = useState('waiting'); // waiting, showing, playing, result
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lastAction, setLastAction] = useState('');

  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const actions = [
    { id: 'feed', icon: Utensils, name: 'Alimentar', stat: 'hunger', value: 20, cost: 5 },
    { id: 'play', icon: Star, name: 'Jugar', stat: 'happiness', value: 15, cost: 3 },
    { id: 'sleep', icon: Moon, name: 'Dormir', stat: 'energy', value: 25, cost: 0 },
    { id: 'clean', icon: Droplet, name: 'Limpiar', stat: 'hygiene', value: 20, cost: 2 }
  ];

  // Degradación automática de stats
  useEffect(() => {
    if (!gameStarted) return;
    
    const interval = setInterval(() => {
      setPou(prev => ({
        ...prev,
        happiness: Math.max(0, prev.happiness - 1),
        hunger: Math.max(0, prev.hunger - 1),
        energy: Math.max(0, prev.energy - 0.5),
        hygiene: Math.max(0, prev.hygiene - 0.5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  // Generar secuencia de memoria
  const generateMemorySequence = () => {
    const sequence = [];
    for (let i = 0; i < round; i++) {
      sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    setCurrentMemory(sequence);
    setPlayerSequence([]);
    setGamePhase('showing');
    setIsShowing(true);
    
    // Mostrar secuencia
    let index = 0;
    const showInterval = setInterval(() => {
      if (index < sequence.length) {
        // Aquí se podría agregar animación visual
        index++;
      } else {
        clearInterval(showInterval);
        setIsShowing(false);
        setGamePhase('playing');
      }
    }, 800);
  };

  const startGame = () => {
    setGameStarted(true);
    setRound(1);
    setScore(0);
    setGameOver(false);
    setGamePhase('waiting');
    generateMemorySequence();
  };

  const handleColorClick = (color) => {
    if (gamePhase !== 'playing') return;
    
    const newSequence = [...playerSequence, color];
    setPlayerSequence(newSequence);
    
    // Verificar si la secuencia es correcta
    if (newSequence[newSequence.length - 1] !== currentMemory[newSequence.length - 1]) {
      setGameOver(true);
      return;
    }
    
    // Si la secuencia está completa
    if (newSequence.length === currentMemory.length) {
      setScore(score + round * 10);
      setPou(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 10),
        coins: prev.coins + round * 5
      }));
      setRound(round + 1);
      setLastAction('¡Correcto! +' + (round * 10) + ' puntos');
      setTimeout(() => {
        setLastAction('');
        generateMemorySequence();
      }, 1500);
    }
  };

  const performAction = (action) => {
    if (pou.coins < action.cost) {
      setLastAction('¡No tienes suficientes monedas!');
      setTimeout(() => setLastAction(''), 2000);
      return;
    }
    
    setPou(prev => ({
      ...prev,
      [action.stat]: Math.min(100, prev[action.stat] + action.value),
      coins: prev.coins - action.cost
    }));
    
    setLastAction(`${action.name} +${action.value}`);
    setTimeout(() => setLastAction(''), 2000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setRound(1);
    setScore(0);
    setGameOver(false);
    setGamePhase('waiting');
    setPou({
      name: "EcoPou",
      happiness: 100,
      hunger: 100,
      energy: 100,
      hygiene: 100,
      level: 1,
      experience: 0,
      coins: 0
    });
  };

  const getPouMood = () => {
    const avg = (pou.happiness + pou.hunger + pou.energy + pou.hygiene) / 4;
    if (avg >= 80) return { icon: Smile, color: 'text-green-500', mood: 'Feliz' };
    if (avg >= 60) return { icon: Smile, color: 'text-yellow-500', mood: 'Contento' };
    if (avg >= 40) return { icon: Frown, color: 'text-orange-500', mood: 'Triste' };
    return { icon: Frown, color: 'text-red-500', mood: 'Muy Triste' };
  };

  const getStatColor = (value) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    if (value >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🐾</div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              EcoPou
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              ¡Cuida a tu mascota virtual y juega el juego de memoria!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-semibold text-red-700 dark:text-red-300">Felicidad</h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <Utensils className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">Hambre</h3>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Energía</h3>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <Droplet className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-green-700 dark:text-green-300">Higiene</h3>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-xl font-bold text-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              <Play className="h-6 w-6 inline mr-2" />
              ¡Comenzar Juego!
            </button>
            
            <Link
              to="/dashboard"
              className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-8 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Home className="h-5 w-5 inline mr-2" />
              Volver al Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-orange-500 to-yellow-600 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">😢</div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              ¡EcoPou está triste!
            </h1>
            <p className="text-2xl font-semibold text-red-600">
              Puntuación: {score} puntos
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Ronda alcanzada: {round}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">Ronda</h3>
              <p className="text-2xl font-bold">{round}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <Star className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-green-700 dark:text-green-300">Puntos</h3>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Monedas</h3>
              <p className="text-2xl font-bold">{pou.coins}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-xl font-bold text-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              <Play className="h-6 w-6 inline mr-2" />
              ¡Jugar de Nuevo!
            </button>
            
            <Link
              to="/dashboard"
              className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-8 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Home className="h-5 w-5 inline mr-2" />
              Volver al Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pouMood = getPouMood();
  const MoodIcon = pouMood.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header del juego */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🐾</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {pou.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 flex items-center">
                  <MoodIcon className={`h-4 w-4 mr-1 ${pouMood.color}`} />
                  {pouMood.mood}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-500">Puntos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{round}</div>
                <div className="text-sm text-gray-500">Ronda</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{pou.coins}</div>
                <div className="text-sm text-gray-500">Monedas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de EcoPou */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">🐾</div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {pou.name}
                </h2>
                <p className={`text-lg ${pouMood.color}`}>
                  {pouMood.mood}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Felicidad</span>
                    <span className="text-gray-800 dark:text-white">{Math.round(pou.happiness)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${getStatColor(pou.happiness)}`} style={{width: `${pou.happiness}%`}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Hambre</span>
                    <span className="text-gray-800 dark:text-white">{Math.round(pou.hunger)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${getStatColor(pou.hunger)}`} style={{width: `${pou.hunger}%`}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Energía</span>
                    <span className="text-gray-800 dark:text-white">{Math.round(pou.energy)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${getStatColor(pou.energy)}`} style={{width: `${pou.energy}%`}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Higiene</span>
                    <span className="text-gray-800 dark:text-white">{Math.round(pou.hygiene)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${getStatColor(pou.hygiene)}`} style={{width: `${pou.hygiene}%`}}></div>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Cuidar a EcoPou
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {actions.map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => performAction(action)}
                        disabled={pou.coins < action.cost}
                        className={`p-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          pou.coins < action.cost
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40'
                        }`}
                      >
                        <IconComponent className="h-4 w-4 mx-auto mb-1" />
                        <div>{action.name}</div>
                        <div className="text-xs">-{action.cost}💰</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {lastAction && (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
                  <p className="text-green-700 dark:text-green-300 font-semibold">
                    {lastAction}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Juego de Memoria */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Juego de Memoria
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {gamePhase === 'showing' && '¡Observa la secuencia!'}
                  {gamePhase === 'playing' && '¡Repite la secuencia!'}
                  {gamePhase === 'waiting' && 'Preparándose...'}
                </p>
              </div>

              {/* Tablero de colores */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorClick(color)}
                    disabled={gamePhase !== 'playing'}
                    className={`w-20 h-20 rounded-xl border-4 transition-all duration-300 transform hover:scale-105 ${
                      gamePhase === 'playing'
                        ? `bg-${color}-500 hover:bg-${color}-600 border-${color}-600`
                        : `bg-${color}-300 border-${color}-400 cursor-not-allowed`
                    }`}
                  />
                ))}
              </div>

              {/* Secuencia actual */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Secuencia del jugador:
                </p>
                <div className="flex justify-center space-x-2">
                  {playerSequence.map((color, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full bg-${color}-500 border-2 border-${color}-600`}
                    />
                  ))}
                </div>
              </div>

              {/* Botón para siguiente ronda */}
              {gamePhase === 'waiting' && (
                <div className="text-center mt-6">
                  <button
                    onClick={generateMemorySequence}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-8 rounded-xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <Play className="h-5 w-5 inline mr-2" />
                    Siguiente Ronda
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Minigame;
