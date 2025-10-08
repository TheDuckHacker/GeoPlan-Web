import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { 
  Map, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  TreePine, 
  Car, 
  Zap, 
  Recycle,
  BarChart3,
  Globe,
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Loader2,
  Award,
  Target,
  Flame,
  Eye,
  Play
} from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [fireData, setFireData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [userProgress, setUserProgress] = useState({
    progress: {
      currentLevel: { level: 1, name: 'Principiante' },
      totalPoints: 0,
      pointsToNext: 100,
      progressToNext: 0,
      nextLevel: { name: 'Explorador' }
    },
    eligibleRewards: []
  });
  const [simulations, setSimulations] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Obtener datos en paralelo
      const [
        alertsResponse,
        fireResponse,
        weatherResponse,
        rewardsResponse,
        progressResponse,
        simulationsResponse
      ] = await Promise.allSettled([
        axios.get('/api/alerts/current'),
        axios.get('/api/alerts/santa-cruz-fires'),
        axios.get('/api/nasa/weather'),
        axios.get('/api/rewards'),
        axios.get('/api/rewards/user/1/progress'),
        axios.get('/api/simulations/strategies')
      ]);

      if (alertsResponse.status === 'fulfilled') {
        setAlerts([alertsResponse.value.data.data]);
      }

      if (fireResponse.status === 'fulfilled') {
        setFireData(fireResponse.value.data.data);
      }

      if (weatherResponse.status === 'fulfilled') {
        setWeatherData(weatherResponse.value.data);
      }

      if (rewardsResponse.status === 'fulfilled') {
        setRewards(rewardsResponse.value.data.data);
      }

      if (progressResponse.status === 'fulfilled') {
        setUserProgress(progressResponse.value.data || {
          progress: {
            currentLevel: { level: 1, name: 'Principiante' },
            totalPoints: 0,
            pointsToNext: 100,
            progressToNext: 0,
            nextLevel: { name: 'Explorador' }
          },
          eligibleRewards: []
        });
      }

      if (simulationsResponse.status === 'fulfilled') {
        setSimulations(simulationsResponse.value.data.data);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertColor = (level) => {
    if (!level) return 'bg-blue-500';
    switch (level) {
      case 'ALTO': return 'bg-red-500';
      case 'MEDIO': return 'bg-yellow-500';
      case 'BAJO': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getAlertIcon = (type) => {
    if (!type || typeof type !== 'string') return <AlertTriangle className="h-5 w-5" />;
    if (type.includes('INCENDIO')) return <Flame className="h-5 w-5" />;
    if (type.includes('CALOR')) return <Thermometer className="h-5 w-5" />;
    if (type.includes('HUMEDAD')) return <Droplets className="h-5 w-5" />;
    if (type.includes('VIENTO')) return <Wind className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Cargando datos de la NASA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header con animación */}
      <div className="bg-gradient-to-r from-primary to-teal-600 text-white p-6 animate-fade-in-up">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 animate-fade-in-left">Dashboard GeoPlan</h1>
          <p className="text-teal-100 animate-fade-in-right">Monitoreo en tiempo real de Santa Cruz, Bolivia</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Banner del Minijuego - Solo para usuarios autenticados */}
        {isAuthenticated && (
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl shadow-lg p-6 text-white animate-fade-in-up hover-lift">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-3 mr-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">🎮 Minijuego: EcoGuardian</h2>
                  <p className="text-purple-100">¡Completa misiones ecológicas y gana puntos para salvar Santa Cruz!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">🏆</div>
                <p className="text-sm text-purple-100">Nivel {userProgress?.progress?.currentLevel?.level || 1}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex space-x-4">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <span className="text-sm">Puntos: {userProgress?.progress?.totalPoints || 0}</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <span className="text-sm">Misiones: 3/5</span>
                </div>
              </div>
              <Link
                to="/minigame"
                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Jugar Ahora
              </Link>
            </div>
          </div>
        )}

        {/* Mensaje para usuarios no autenticados */}
        {!isAuthenticated && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white animate-fade-in-up hover-lift">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-3 mr-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">¡Únete a la Comunidad!</h2>
                  <p className="text-blue-100">Regístrate para acceder a simulaciones, minijuegos y recompensas exclusivas.</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Alertas en tiempo real */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                  Alertas Climáticas
                </h2>
                <span className="text-sm text-gray-500">Tiempo real</span>
              </div>
              
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert?.level || 'BAJO')} border-l-4 animate-fade-in-left`} style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getAlertIcon(alert?.type)}
                          <div className="ml-3">
                            <h3 className="font-semibold text-white">{alert?.type || 'Alerta'}</h3>
                            <p className="text-white/80 text-sm">{alert?.description || 'Sin descripción'}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAlertColor(alert?.level || 'BAJO')} text-white`}>
                          {alert?.level || 'BAJO'}
                        </span>
                      </div>
                      {alert?.firesDetected > 0 && (
                        <div className="mt-2 text-white/80 text-sm">
                          🔥 {alert.firesDetected} incendios detectados
                          {alert.highRiskFires > 0 && ` (${alert.highRiskFires} de alto riesgo)`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Globe className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <p>No hay alertas activas</p>
                </div>
              )}
            </div>
          </div>

          {/* Datos meteorológicos */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Thermometer className="h-6 w-6 text-blue-500 mr-2" />
              Clima Actual
            </h2>
            
            {weatherData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Temperatura</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {weatherData.data?.temperature?.avg?.toFixed(1) || '25.0'}°C
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Humedad</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-800 dark:text-white">
                    {weatherData.data?.humidity?.toFixed(0) || '60'}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wind className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Viento</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-800 dark:text-white">
                    {weatherData.data?.windSpeed?.toFixed(1) || '5.0'} m/s
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <Activity className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                <p>Cargando datos...</p>
              </div>
            )}
          </div>
        </div>

        {/* Datos de incendios de Santa Cruz */}
        {fireData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Flame className="h-6 w-6 text-red-500 mr-2" />
              Incendios en Santa Cruz (2020-2024)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg animate-fade-in-left">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {fireData?.totalFires?.toLocaleString() || '0'}
                </div>
                <div className="text-sm text-red-600 dark:text-red-400">Total de Incendios</div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg animate-fade-in-left" style={{animationDelay: '0.1s'}}>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {fireData?.data?.statistics?.highRiskZones || 0}
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400">Zonas de Alto Riesgo</div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg animate-fade-in-left" style={{animationDelay: '0.2s'}}>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {fireData?.data?.statistics?.averagePerYear?.toFixed(0) || '0'}
                </div>
                <div className="text-sm text-yellow-600 dark:text-yellow-400">Promedio por Año</div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg animate-fade-in-left" style={{animationDelay: '0.3s'}}>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {fireData?.data?.hotspots?.length || 0}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Hotspots Identificados</div>
              </div>
            </div>

            {/* Zonas de riesgo */}
            {fireData?.data?.riskZones && fireData.data.riskZones.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Zonas de Riesgo Identificadas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {fireData.data.riskZones.slice(0, 6).map((zone, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 animate-fade-in-up ${
                      zone.riskLevel === 'ALTO' ? 'bg-red-50 border-red-500 dark:bg-red-900/20' :
                      zone.riskLevel === 'MEDIO' ? 'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/20' :
                      'bg-green-50 border-green-500 dark:bg-green-900/20'
                    }`} style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800 dark:text-white">
                          Zona {index + 1}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          zone.riskLevel === 'ALTO' ? 'bg-red-500 text-white' :
                          zone.riskLevel === 'MEDIO' ? 'bg-yellow-500 text-white' :
                          'bg-green-500 text-white'
                        }`}>
                          {zone.riskLevel}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {zone.count} incendios detectados
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sistema de recompensas - Solo para usuarios autenticados */}
        {isAuthenticated && userProgress && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Award className="h-6 w-6 text-yellow-500 mr-2" />
              Tu Progreso
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Nivel actual */}
              <div className="text-center animate-fade-in-left">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-r from-primary to-teal-500 flex items-center justify-center animate-glow">
                  <span className="text-2xl font-bold text-white">
                    {userProgress?.progress?.currentLevel?.level || 1}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {userProgress?.progress?.currentLevel?.name || 'Principiante'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {userProgress?.progress?.totalPoints || 0} puntos
                </p>
              </div>

              {/* Barra de progreso */}
              <div className="md:col-span-2 animate-fade-in-right">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Progreso al siguiente nivel
                  </span>
                  <span className="text-sm text-gray-500">
                    {userProgress?.progress?.pointsToNext || 0} puntos restantes
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-teal-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${userProgress?.progress?.progressToNext || 0}%` }}
                  ></div>
                </div>
                {userProgress?.progress?.nextLevel && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Siguiente: {userProgress?.progress?.nextLevel?.name}
                  </p>
                )}
              </div>
            </div>

            {/* Recompensas disponibles */}
            {userProgress?.eligibleRewards && userProgress.eligibleRewards.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  ¡Recompensas Disponibles!
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {userProgress?.eligibleRewards?.slice(0, 3).map((reward, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700 animate-bounce-slow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{reward.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">
                              {reward.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              +{reward.points} puntos
                            </p>
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold hover:bg-yellow-600 transition-colors">
                          Reclamar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Simulador rápido */}
        {simulations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Play className="h-6 w-6 text-green-500 mr-2" />
              Simulador Rápido
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {simulations.slice(0, 3).map((strategy, index) => (
                <Link
                  key={strategy.id}
                  to={`/simulator?strategy=${strategy.id}`}
                  className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{strategy.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {strategy.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {strategy.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {strategy.description}
                  </p>
                  <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-semibold">
                    <Play className="h-4 w-4 mr-1" />
                    Simular ahora
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/simulator"
            className="p-6 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up"
          >
            <TreePine className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Simulador</h3>
            <p className="text-sm opacity-90">Estrategias urbanas</p>
          </Link>
          
          <Link
            to="/alerts"
            className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up"
            style={{animationDelay: '0.1s'}}
          >
            <AlertTriangle className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Alertas</h3>
            <p className="text-sm opacity-90">Monitoreo climático</p>
          </Link>
          
          <Link
            to="/community"
            className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up"
            style={{animationDelay: '0.2s'}}
          >
            <Users className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Comunidad</h3>
            <p className="text-sm opacity-90">Participación ciudadana</p>
          </Link>
          
          <Link
            to={isAuthenticated ? "/profile?tab=rewards" : "/login"}
            className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up"
            style={{animationDelay: '0.3s'}}
          >
            <Award className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Recompensas</h3>
            <p className="text-sm opacity-90">Sistema de logros</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;