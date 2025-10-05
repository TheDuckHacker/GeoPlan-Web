import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import { 
  Map, 
  Flame, 
  Thermometer, 
  Droplets, 
  Wind, 
  TreePine,
  Layers,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  AlertTriangle,
  Info,
  Loader2,
  Zap,
  Activity,
  Globe
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
const getMapIcon = (type) => {
  // Retornar null para usar el icono por defecto de Leaflet
  return null;
};

const Maps = () => {
  const [loading, setLoading] = useState(true);
  const [mapData, setMapData] = useState(null);
  const [activeLayers, setActiveLayers] = useState({
    fires: true,
    airQuality: true,
    temperature: true,
    vegetation: false
  });
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const santaCruzCoords = [-17.7863, -63.1812];

  useEffect(() => {
    fetchMapData();
    
    // Auto-refresh cada 60 segundos
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchMapData();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchMapData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/maps/all');
      setMapData(response.data.data);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Error fetching map data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const getFireColor = (riskLevel) => {
    switch (riskLevel) {
      case 'CRÍTICO': return 'red';
      case 'ALTO': return 'orange';
      case 'MEDIO': return 'yellow';
      default: return 'green';
    }
  };

  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return 'green';
    if (aqi <= 100) return 'yellow';
    if (aqi <= 150) return 'orange';
    if (aqi <= 200) return 'red';
    return 'purple';
  };

  const getTemperatureColor = (temp) => {
    if (temp > 35) return 'red';
    if (temp > 30) return 'orange';
    if (temp > 25) return 'yellow';
    if (temp > 20) return 'lightblue';
    return 'blue';
  };

  const getVegetationColor = (ndvi) => {
    if (ndvi > 0.7) return 'darkgreen';
    if (ndvi > 0.5) return 'green';
    if (ndvi > 0.3) return 'lightgreen';
    if (ndvi > 0.1) return 'yellow';
    return 'brown';
  };

  if (loading && !mapData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Cargando mapas de Santa Cruz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-teal-600 text-white p-6 animate-fade-in-up">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 animate-fade-in-left">Mapas Interactivos</h1>
              <p className="text-teal-100 animate-fade-in-right">Datos en tiempo real de Santa Cruz, Bolivia</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  autoRefresh 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                Auto-actualizar
              </button>
              <button
                onClick={fetchMapData}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de Control */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <Layers className="h-6 w-6 text-primary mr-2" />
                Capas del Mapa
              </h2>
              
              <div className="space-y-4">
                {/* Control de Capas */}
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeLayers.fires}
                      onChange={() => toggleLayer('fires')}
                      className="mr-3"
                    />
                    <Flame className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Incendios</span>
                    {mapData?.fires?.data?.totalFires > 0 && (
                      <span className="ml-auto text-sm text-red-500 font-semibold">
                        {mapData.fires.data.totalFires}
                      </span>
                    )}
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeLayers.airQuality}
                      onChange={() => toggleLayer('airQuality')}
                      className="mr-3"
                    />
                    <Wind className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Calidad del Aire</span>
                    {mapData?.airQuality?.data?.stations?.length > 0 && (
                      <span className="ml-auto text-sm text-blue-500 font-semibold">
                        {mapData.airQuality.data.stations.length}
                      </span>
                    )}
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeLayers.temperature}
                      onChange={() => toggleLayer('temperature')}
                      className="mr-3"
                    />
                    <Thermometer className="h-5 w-5 text-orange-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Temperatura</span>
                    {mapData?.temperature?.data?.temperature?.avg && (
                      <span className="ml-auto text-sm text-orange-500 font-semibold">
                        {mapData.temperature.data.temperature.avg.toFixed(1)}°C
                      </span>
                    )}
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeLayers.vegetation}
                      onChange={() => toggleLayer('vegetation')}
                      className="mr-3"
                    />
                    <TreePine className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Vegetación</span>
                    {mapData?.vegetation?.data?.zones?.length > 0 && (
                      <span className="ml-auto text-sm text-green-500 font-semibold">
                        {mapData.vegetation.data.zones.length}
                      </span>
                    )}
                  </label>
                </div>

                {/* Estadísticas Rápidas */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Estadísticas
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Incendios Activos:</span>
                      <span className="font-semibold text-red-500">
                        {mapData?.fires?.data?.totalFires || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Alto Riesgo:</span>
                      <span className="font-semibold text-orange-500">
                        {mapData?.fires?.data?.highRiskFires || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">AQI Promedio:</span>
                      <span className="font-semibold text-blue-500">
                        {mapData?.airQuality?.data?.averageAQI?.toFixed(0) || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Temp. Actual:</span>
                      <span className="font-semibold text-orange-500">
                        {mapData?.temperature?.data?.temperature?.avg?.toFixed(1) || 0}°C
                      </span>
                    </div>
                  </div>
                </div>

                {/* Última Actualización */}
                {lastUpdated && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500">
                      Última actualización: {new Date(lastUpdated).toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
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
                  
                  {/* Marcador de Santa Cruz */}
                  <Marker position={santaCruzCoords}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-lg">Santa Cruz de la Sierra</h3>
                        <p className="text-sm text-gray-600">Bolivia</p>
                        <p className="text-xs text-gray-500">Centro de monitoreo</p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Incendios */}
                  {activeLayers.fires && mapData?.fires?.data?.fires?.map((fire, index) => (
                    <Marker
                      key={fire.id}
                      position={[fire.lat, fire.lon]}
                    >
                      <Popup>
                        <div className="min-w-[200px]">
                          <h3 className="font-bold text-lg text-red-600 mb-2">
                            🔥 Incendio Detectado
                          </h3>
                          <div className="space-y-1 text-sm">
                            <p><strong>Confianza:</strong> {fire.confidence}</p>
                            <p><strong>FRP:</strong> {fire.frp.toFixed(1)} MW</p>
                            <p><strong>Brillo:</strong> {fire.brightness.toFixed(1)} K</p>
                            <p><strong>Riesgo:</strong> 
                              <span className={`ml-1 px-2 py-1 rounded text-xs font-semibold ${
                                fire.riskLevel === 'CRÍTICO' ? 'bg-red-100 text-red-800' :
                                fire.riskLevel === 'ALTO' ? 'bg-orange-100 text-orange-800' :
                                fire.riskLevel === 'MEDIO' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {fire.riskLevel}
                              </span>
                            </p>
                            <p><strong>Satélite:</strong> {fire.satellite}</p>
                            <p><strong>Fecha:</strong> {fire.acq_date}</p>
                            <p><strong>Hora:</strong> {fire.acq_time}</p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* Calidad del Aire */}
                  {activeLayers.airQuality && mapData?.airQuality?.data?.stations?.map((station, index) => (
                    <Marker
                      key={index}
                      position={[station.lat, station.lon]}
                    >
                      <Popup>
                        <div className="min-w-[200px]">
                          <h3 className="font-bold text-lg text-blue-600 mb-2">
                            🌬️ {station.name}
                          </h3>
                          <div className="space-y-1 text-sm">
                            <p><strong>AQI:</strong> {station.aqi.toFixed(0)}</p>
                            <p><strong>Nivel:</strong> 
                              <span className={`ml-1 px-2 py-1 rounded text-xs font-semibold ${
                                station.level === 'BUENO' ? 'bg-green-100 text-green-800' :
                                station.level === 'MODERADO' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {station.level}
                              </span>
                            </p>
                            <p><strong>PM2.5:</strong> {station.pm25.toFixed(1)} μg/m³</p>
                            <p><strong>PM10:</strong> {station.pm10.toFixed(1)} μg/m³</p>
                            <p><strong>O₃:</strong> {station.o3.toFixed(1)} μg/m³</p>
                            <p><strong>NO₂:</strong> {station.no2.toFixed(1)} μg/m³</p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* Mapa de Calor de Temperatura */}
                  {activeLayers.temperature && mapData?.temperature?.data?.heatMap?.map((point, index) => (
                    <Circle
                      key={index}
                      center={[point.lat, point.lon]}
                      radius={1000}
                      color={getTemperatureColor(point.temperature)}
                      fillColor={getTemperatureColor(point.temperature)}
                      fillOpacity={point.intensity * 0.3}
                    />
                  ))}

                  {/* Vegetación */}
                  {activeLayers.vegetation && mapData?.vegetation?.data?.zones?.map((zone, index) => (
                    <Circle
                      key={index}
                      center={[zone.lat, zone.lon]}
                      radius={2000}
                      color={getVegetationColor(zone.ndvi)}
                      fillColor={getVegetationColor(zone.ndvi)}
                      fillOpacity={0.3}
                    >
                      <Popup>
                        <div className="min-w-[200px]">
                          <h3 className="font-bold text-lg text-green-600 mb-2">
                            🌳 {zone.name}
                          </h3>
                          <div className="space-y-1 text-sm">
                            <p><strong>NDVI:</strong> {zone.ndvi.toFixed(3)}</p>
                            <p><strong>Nivel:</strong> {zone.vegetationLevel}</p>
                            <p><strong>Salud:</strong> {zone.healthStatus}</p>
                          </div>
                        </div>
                      </Popup>
                    </Circle>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <button className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up">
            <Flame className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Alertas de Incendios</h3>
            <p className="text-sm opacity-90">Ver alertas activas</p>
          </button>
          
          <button className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Wind className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Calidad del Aire</h3>
            <p className="text-sm opacity-90">Monitoreo en tiempo real</p>
          </button>
          
          <button className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Thermometer className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Temperatura</h3>
            <p className="text-sm opacity-90">Mapa de calor</p>
          </button>
          
          <button className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <TreePine className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Vegetación</h3>
            <p className="text-sm opacity-90">Estado de la vegetación</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Maps;
