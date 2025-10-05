import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import { 
  Map, 
  BarChart2, 
  Zap, 
  Leaf, 
  Car, 
  Recycle, 
  Lightbulb, 
  Droplet, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  TrendingUp,
  Target,
  Layers,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix para iconos de Leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Usar iconos por defecto de Leaflet para evitar errores
const getStrategyIcon = (strategyId) => {
  // Retornar null para usar el icono por defecto de Leaflet
  return null;
};

const Simulator = () => {
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [intensity, setIntensity] = useState(50);
  const [simulationResults, setSimulationResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showMap, setShowMap] = useState(true);

  // Coordenadas de Santa Cruz de la Sierra
  const santaCruzCoords = [-17.7863, -63.1812];
  
  // Zonas de implementación simuladas en Santa Cruz
  const implementationZones = [
    {
      id: 'centro',
      name: 'Centro Histórico',
      coords: [-17.7863, -63.1812],
      area: 'Zona comercial y residencial',
      population: 45000
    },
    {
      id: 'norte',
      name: 'Zona Norte',
      coords: [-17.7500, -63.1500],
      area: 'Zona residencial',
      population: 32000
    },
    {
      id: 'sur',
      name: 'Zona Sur',
      coords: [-17.8200, -63.2000],
      area: 'Zona industrial',
      population: 28000
    },
    {
      id: 'este',
      name: 'Zona Este',
      coords: [-17.7800, -63.1200],
      area: 'Zona residencial',
      population: 35000
    },
    {
      id: 'oeste',
      name: 'Zona Oeste',
      coords: [-17.7900, -63.2500],
      area: 'Zona mixta',
      population: 25000
    }
  ];

  useEffect(() => {
    fetchStrategies();
  }, []);

  const fetchStrategies = async () => {
    setLoading(true);
    try {
      console.log('Cargando estrategias de simulación...');
      const response = await axios.get('/api/simulations/strategies');
      console.log('Estrategias cargadas:', response.data);
      
      setStrategies(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedStrategy(response.data.data[0]);
        setIntensity(Math.max(10, Math.min(100, response.data.data[0].defaultIntensity || 50)));
        console.log('Estrategia seleccionada:', response.data.data[0].name);
      }
    } catch (err) {
      console.error('Error fetching strategies:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError('No se pudieron cargar las estrategias de simulación. Verifica que el servidor esté funcionando.');
    } finally {
      setLoading(false);
    }
  };

  const handleStrategyChange = (e) => {
    const strategyId = e.target.value;
    const strategy = strategies.find(s => s.id === strategyId);
    setSelectedStrategy(strategy);
    setIntensity(strategy ? Math.max(10, Math.min(100, strategy.defaultIntensity || 50)) : 50);
    setSimulationResults(null);
    setError('');
  };

  const handleIntensityChange = (e) => {
    const newIntensity = parseInt(e.target.value);
    setIntensity(Math.max(10, Math.min(100, newIntensity)));
  };

  const runSimulation = async () => {
    if (!selectedStrategy) {
      setError('Por favor, selecciona una estrategia para simular.');
      return;
    }

    if (intensity < 10 || intensity > 100) {
      setError('La intensidad debe estar entre 10% y 100%.');
      return;
    }
    
    setIsSimulating(true);
    setError('');
    setSimulationResults(null);

    try {
      console.log('Iniciando simulación con:', {
        strategyId: selectedStrategy.id,
        intensity: intensity,
        strategyName: selectedStrategy.name
      });

      // Simular tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await axios.post('/api/simulations/simulate', {
        strategyId: selectedStrategy.id,
        intensity: intensity,
        userId: 'demo-user' // En un sistema real, esto vendría del usuario autenticado
      });
      
      console.log('Respuesta de simulación:', response.data);
      setSimulationResults(response.data.data);
    } catch (err) {
      console.error('Error running simulation:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      let errorMessage = 'Error al ejecutar la simulación.';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message === 'Network Error') {
        errorMessage = 'Error de conexión. Verifica que el servidor esté funcionando.';
      } else if (err.response?.status === 400) {
        errorMessage = 'Datos inválidos. Verifica la intensidad (10-100%).';
      } else if (err.response?.status === 500) {
        errorMessage = 'Error interno del servidor. Intenta nuevamente.';
      }
      
      setError(errorMessage);
    } finally {
      setIsSimulating(false);
    }
  };

  const getStrategyIcon = (id) => {
    switch (id) {
      case 'reforestation': return <Leaf className="h-6 w-6 text-green-500" />;
      case 'sustainable_transport': return <Car className="h-6 w-6 text-blue-500" />;
      case 'renewable_energy': return <Lightbulb className="h-6 w-6 text-yellow-500" />;
      case 'waste_management': return <Recycle className="h-6 w-6 text-purple-500" />;
      case 'water_conservation': return <Droplet className="h-6 w-6 text-cyan-500" />;
      default: return <BarChart2 className="h-6 w-6 text-gray-500" />;
    }
  };

  const getImpactColor = (impact) => {
    if (impact > 80) return 'text-green-600';
    if (impact > 60) return 'text-blue-600';
    if (impact > 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-8 bg-background-light dark:bg-background-dark min-h-screen font-display text-foreground-light dark:text-foreground-dark">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in-up">Simulador de Estrategias Urbanas</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up">
        Simula el impacto de diferentes estrategias sostenibles en Santa Cruz de la Sierra
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Panel de Control */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 animate-fade-in-up hover-lift">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <BarChart2 className="h-7 w-7 text-primary mr-3" />
              Configuración
            </h2>

            {loading && !strategies.length ? (
              <div className="flex items-center justify-center py-10">
                <div className="loading-spinner"></div>
                <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">Cargando estrategias...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-4" role="alert">
                <p className="font-bold">Error:</p>
                <p>{error}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Selección de Estrategia */}
                <div>
                  <label htmlFor="strategy-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estrategia Urbana
                  </label>
                  <select
                    id="strategy-select"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={selectedStrategy?.id || ''}
                    onChange={handleStrategyChange}
                  >
                    {strategies.map(strategy => (
                      <option key={strategy.id} value={strategy.id}>
                        {strategy.name}
                      </option>
                    ))}
                  </select>
                  {selectedStrategy && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center mb-2">
                        {getStrategyIcon(selectedStrategy.id)}
                        <span className="ml-2 font-semibold text-gray-800 dark:text-white">
                          {selectedStrategy.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {selectedStrategy.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Control de Intensidad */}
                <div>
                  <label htmlFor="intensity-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Intensidad de Implementación: <span className="font-bold text-primary">{intensity}%</span>
                  </label>
                  <input
                    type="range"
                    id="intensity-range"
                    min="10"
                    max={selectedStrategy?.maxIntensity || 100}
                    value={intensity}
                    onChange={handleIntensityChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Botón de Simulación */}
                <div className="pt-4">
                  <button
                    onClick={runSimulation}
                    disabled={loading || !selectedStrategy || isSimulating}
                    className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover-lift hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    {isSimulating ? (
                      <>
                        <div className="loading-spinner mr-2"></div>
                        Simulando...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Ejecutar Simulación
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Resultados de la Simulación */}
          {simulationResults && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                Resultados
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                    Impacto Ambiental
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Reducción CO₂:</span>
                      <span className="font-semibold text-green-600">
                        {simulationResults.results?.co2Reduction?.value || 0} {simulationResults.results?.co2Reduction?.unit || 't'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calidad del Aire:</span>
                      <span className="font-semibold text-green-600">
                        +{simulationResults.results?.airQuality?.value || 0} {simulationResults.results?.airQuality?.unit || '%'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    Cronograma
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Duración: {simulationResults.results?.timeline?.durationMonths || 0} meses
                  </p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                    Viabilidad
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    ROI: {simulationResults.results?.viability?.roi || '0%'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mapa de Santa Cruz */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                  <Map className="h-6 w-6 text-primary mr-2" />
                  Mapa de Santa Cruz de la Sierra
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {showMap ? 'Ocultar' : 'Mostrar'} Mapa
                  </button>
                </div>
              </div>
            </div>
            
            {showMap && (
              <div className="h-96 lg:h-[600px]">
                <MapContainer
                  center={santaCruzCoords}
                  zoom={11}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Marcador principal de Santa Cruz */}
                  <Marker position={santaCruzCoords}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-lg">Santa Cruz de la Sierra</h3>
                        <p className="text-sm text-gray-600">Bolivia</p>
                        <p className="text-xs text-gray-500">Centro de simulación urbana</p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Zonas de implementación */}
                  {implementationZones.map((zone, index) => (
                    <Marker
                      key={zone.id}
                      position={zone.coords}
                    >
                      <Popup>
                        <div className="min-w-[200px]">
                          <h3 className="font-bold text-lg text-primary mb-2">
                            {zone.name}
                          </h3>
                          <div className="space-y-1 text-sm">
                            <p><strong>Área:</strong> {zone.area}</p>
                            <p><strong>Población:</strong> {zone.population.toLocaleString()}</p>
                            {selectedStrategy && (
                              <>
                                <p><strong>Estrategia:</strong> {selectedStrategy.name}</p>
                                <p><strong>Intensidad:</strong> {intensity}%</p>
                                <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                  <p className="text-xs text-gray-600 dark:text-gray-300">
                                    Impacto estimado en esta zona
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* Círculos de impacto si hay simulación */}
                  {simulationResults && selectedStrategy && (
                    implementationZones.map((zone, index) => {
                      const impactRadius = (intensity / 100) * 2000; // Radio basado en intensidad
                      return (
                        <Circle
                          key={`impact-${zone.id}`}
                          center={zone.coords}
                          radius={impactRadius}
                          color={getImpactColor(intensity)}
                          fillColor={getImpactColor(intensity)}
                          fillOpacity={0.2}
                        />
                      );
                    })
                  )}
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-8 bg-gradient-to-r from-primary to-teal-600 text-white rounded-xl p-6 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4">¿Cómo funciona el simulador?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Target className="h-12 w-12 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">1. Selecciona una Estrategia</h3>
            <p className="text-sm opacity-90">
              Elige entre reforestación, transporte sostenible, energías renovables, gestión de residuos o conservación del agua.
            </p>
          </div>
          <div className="text-center">
            <Settings className="h-12 w-12 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">2. Ajusta la Intensidad</h3>
            <p className="text-sm opacity-90">
              Define qué tan intensiva será la implementación de la estrategia en Santa Cruz.
            </p>
          </div>
          <div className="text-center">
            <BarChart2 className="h-12 w-12 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">3. Ve el Impacto</h3>
            <p className="text-sm opacity-90">
              Observa cómo la estrategia afectaría diferentes zonas de la ciudad en el mapa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;