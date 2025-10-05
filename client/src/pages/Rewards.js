import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, Trophy, Gift, Star, CheckCircle, Clock, Zap, Crown, Target, Users, Medal, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Rewards = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchGamificationData();
    } else {
      setLoading(false);
      setError('Debes iniciar sesión para ver tus recompensas.');
    }
  }, [user]);

  const fetchGamificationData = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const [progressResponse, leaderboardResponse, certificatesResponse, achievementsResponse] = await Promise.allSettled([
        axios.get(`/api/gamification/progress/${user.id}`),
        axios.get('/api/gamification/leaderboard?limit=5'),
        axios.get(`/api/gamification/certificates/${user.id}`),
        axios.get(`/api/gamification/achievements/${user.id}`)
      ]);

      if (progressResponse.status === 'fulfilled') {
        setUserProgress(progressResponse.value.data.data);
      }

      if (leaderboardResponse.status === 'fulfilled') {
        setLeaderboard(leaderboardResponse.value.data.data.leaderboard);
      }

      if (certificatesResponse.status === 'fulfilled') {
        setCertificates(certificatesResponse.value.data.data);
      }

      if (achievementsResponse.status === 'fulfilled') {
        setAchievements(achievementsResponse.value.data.data);
      }

    } catch (err) {
      console.error('Error fetching gamification data:', err);
      setError('Error al cargar los datos de gamificación.');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimDailyReward = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await axios.post('/api/gamification/add-points', {
        userId: user.id,
        activityId: 'daily_login',
        metadata: { date: new Date().toISOString() }
      });
      
      setMessage(response.data.message);
      fetchGamificationData(); // Recargar datos para actualizar el progreso
    } catch (err) {
      console.error('Error claiming daily reward:', err);
      setError(err.response?.data?.message || 'Error al reclamar la recompensa diaria.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCertificate = async (certificateId) => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await axios.post('/api/gamification/generate-certificate', {
        userId: user.id,
        certificateId: certificateId
      });
      
      setMessage(`¡${response.data.message}! Tu certificado está listo para descargar.`);
      fetchGamificationData();
    } catch (err) {
      console.error('Error generating certificate:', err);
      setError(err.response?.data?.message || 'Error al generar certificado.');
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 1: return 'from-gray-400 to-gray-600';
      case 2: return 'from-blue-400 to-blue-600';
      case 3: return 'from-orange-400 to-orange-600';
      case 4: return 'from-green-400 to-green-600';
      case 5: return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getCertificateColor = (color) => {
    switch (color) {
      case 'blue': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'orange': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'green': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'gold': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="loading-spinner"></div>
        <p className="ml-3 text-lg text-foreground-light dark:text-foreground-dark">Cargando sistema de gamificación...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-background-light dark:bg-background-dark min-h-screen font-display text-foreground-light dark:text-foreground-dark">
        <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-4 rounded-lg" role="alert">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 bg-background-light dark:bg-background-dark min-h-screen font-display text-foreground-light dark:text-foreground-dark">
        <div className="bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-4 mb-4 rounded-lg" role="alert">
          <p className="font-bold">Acceso Denegado:</p>
          <p>Por favor, inicia sesión para ver tu sistema de gamificación.</p>
        </div>
      </div>
    );
  }

  const currentLevel = userProgress?.currentLevel || { level: 1, name: 'Explorador Espacial', badge: '🚀' };
  const totalPoints = userProgress?.totalPoints || 0;
  const progressToNext = userProgress?.progressToNext || 0;
  const nextLevel = userProgress?.nextLevel;

  return (
    <div className="p-8 bg-background-light dark:bg-background-dark min-h-screen font-display text-foreground-light dark:text-foreground-dark">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in-up">Sistema de Gamificación NASA</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up">
        ¡Conquista los niveles y obtén certificados oficiales de la NASA!
      </p>

      {message && (
        <div className="bg-green-100 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-4 mb-6 rounded-lg animate-fade-in-up" role="alert">
          <p>{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Panel Principal - Progreso del Usuario */}
        <div className="lg:col-span-2">
          {/* Nivel Actual */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 animate-fade-in-up hover-lift">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Trophy className="h-7 w-7 text-yellow-500 mr-3" />
              Tu Nivel Actual
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Nivel actual */}
              <div className="text-center animate-fade-in-left">
                <div className={`w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-r ${getLevelColor(currentLevel.level)} flex items-center justify-center animate-glow`}>
                  <span className="text-3xl">{currentLevel.badge}</span>
                </div>
                <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                  Nivel {currentLevel.level}
                </h3>
                <h4 className="font-bold text-lg text-gray-700 dark:text-gray-300">
                  {currentLevel.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {currentLevel.description}
                </p>
              </div>

              {/* Puntos y Progreso */}
              <div className="md:col-span-2 animate-fade-in-right">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      Puntos Totales
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {totalPoints.toLocaleString()}
                    </span>
                  </div>
                  
                  {nextLevel && (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Progreso al siguiente nivel
                        </span>
                        <span className="text-sm text-gray-500">
                          {nextLevel.pointsRequired - totalPoints} puntos restantes
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div 
                          className="bg-gradient-to-r from-primary to-teal-500 h-4 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${progressToNext}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Siguiente: <span className="font-bold">{nextLevel.name}</span>
                      </p>
                    </>
                  )}
                  
                  {!nextLevel && (
                    <div className="text-center py-4">
                      <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                      <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                        ¡Has alcanzado el nivel máximo!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Certificados NASA */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 animate-fade-in-up hover-lift">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <FileText className="h-7 w-7 text-blue-500 mr-3" />
              Certificados NASA
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className={`p-4 rounded-lg border-2 ${getCertificateColor(cert.color)} animate-fade-in-up`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <span className="text-3xl mr-3">{cert.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {cert.description}
                        </p>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            cert.obtained ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}>
                            {cert.obtained ? 'Obtenido' : 'Disponible'}
                          </span>
                          {cert.obtained && (
                            <span className="ml-2 text-xs text-gray-500">
                              {new Date(cert.obtainedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {cert.obtained && (
                      <button
                        onClick={() => handleGenerateCertificate(cert.id)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Descargar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logros */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Medal className="h-7 w-7 text-purple-500 mr-3" />
              Logros Obtenidos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700 animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">{achievement.icon}</span>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Recompensa Diaria */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Gift className="h-6 w-6 text-green-500 mr-2" />
              Recompensa Diaria
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              ¡Reclama tus puntos diarios por mantenerte activo!
            </p>
            <button
              onClick={handleClaimDailyReward}
              disabled={loading}
              className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover-lift hover:bg-green-700 transition duration-300 ease-in-out flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Zap className="h-5 w-5 mr-2 animate-spin-slow" />
                  Reclamando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Reclamar Recompensa Diaria
                </>
              )}
            </button>
          </div>

          {/* Ranking */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Users className="h-6 w-6 text-blue-500 mr-2" />
              Ranking Global
            </h2>
            
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{player.badge}</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white text-sm">
                        {player.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Nivel {player.level}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-sm">
                      {player.points.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      #{player.rank}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actividades Disponibles */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Target className="h-6 w-6 text-orange-500 mr-2" />
              Actividades
            </h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Simulación completada:</span>
                <span className="font-semibold text-green-600">+20 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Alerta reportada:</span>
                <span className="font-semibold text-green-600">+15 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Publicación en comunidad:</span>
                <span className="font-semibold text-green-600">+10 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Análisis de mapa:</span>
                <span className="font-semibold text-green-600">+8 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Detección de incendio:</span>
                <span className="font-semibold text-green-600">+25 pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;