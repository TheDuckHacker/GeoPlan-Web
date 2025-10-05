import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  AlertTriangle, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  CloudRain,
  Flame,
  Bell,
  Settings,
  Layers,
  Info,
  RefreshCw,
  Loader2,
  CheckCircle,
  X,
  Eye,
  MapPin,
  TrendingUp,
  Activity,
  Zap
} from 'lucide-react';

const Alerts = () => {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [climateData, setClimateData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchAlertsData();
    
    // Auto-refresh cada 30 segundos
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchAlertsData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchAlertsData = async () => {
    setLoading(true);
    try {
      const [alertsResponse, notificationsResponse] = await Promise.allSettled([
        axios.get('/api/alerts/current'),
        axios.get('/api/alerts/notifications?limit=10')
      ]);

      if (alertsResponse.status === 'fulfilled') {
        setAlerts(alertsResponse.value.data.data.alerts || []);
        setClimateData(alertsResponse.value.data.data.climate);
      }

      if (notificationsResponse.status === 'fulfilled') {
        setNotifications(notificationsResponse.value.data.data.notifications || []);
      }

      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Error fetching alerts data:', error);
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.put(`/api/alerts/notifications/${notificationId}/read`);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`/api/alerts/notifications/${notificationId}`);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getAlertColor = (level) => {
    switch (level) {
      case 'ALTO': return 'bg-red-500';
      case 'MEDIO': return 'bg-yellow-500';
      case 'BAJO': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getAlertIcon = (type) => {
    if (type.includes('INCENDIO')) return <Flame className="h-5 w-5" />;
    if (type.includes('CALOR')) return <Thermometer className="h-5 w-5" />;
    if (type.includes('HUMEDAD')) return <Droplets className="h-5 w-5" />;
    if (type.includes('VIENTO')) return <Wind className="h-5 w-5" />;
    if (type.includes('LLUVIA')) return <CloudRain className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const filteredAlerts = selectedLayer === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type.toLowerCase().includes(selectedLayer.toLowerCase()));

  const layers = [
    { id: 'all', name: 'Todas', icon: <Layers className="h-4 w-4" /> },
    { id: 'fire', name: 'Incendios', icon: <Flame className="h-4 w-4" /> },
    { id: 'heat', name: 'Temperatura', icon: <Thermometer className="h-4 w-4" /> },
    { id: 'humidity', name: 'Humedad', icon: <Droplets className="h-4 w-4" /> },
    { id: 'wind', name: 'Viento', icon: <Wind className="h-4 w-4" /> },
    { id: 'rain', name: 'Lluvia', icon: <CloudRain className="h-4 w-4" /> }
  ];

  if (loading && alerts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Cargando alertas de Santa Cruz...</p>
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
              <h1 className="text-3xl font-bold mb-2 animate-fade-in-left">Alertas Climáticas</h1>
              <p className="text-teal-100 animate-fade-in-right">Monitoreo en tiempo real de Santa Cruz, Bolivia</p>
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
                onClick={fetchAlertsData}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Resumen de Riesgo */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                  Resumen de Riesgo Climático
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {lastUpdated ? `Actualizado: ${new Date(lastUpdated).toLocaleTimeString()}` : ''}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nivel de Riesgo */}
                <div className="text-center">
                  <div className={`w-24 h-24 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    climateData?.riskLevel === 'ALTO' ? 'bg-red-500' :
                    climateData?.riskLevel === 'MEDIO' ? 'bg-yellow-500' : 'bg-green-500'
                  } animate-pulse-slow`}>
                    <span className="text-2xl font-bold text-white">
                      {climateData?.riskLevel || 'BAJO'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Nivel de Riesgo</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {climateData?.riskLevel === 'ALTO' ? 'Condiciones extremas' :
                     climateData?.riskLevel === 'MEDIO' ? 'Condiciones moderadas' : 'Condiciones normales'}
                  </p>
                </div>

                {/* Datos Climáticos */}
                <div className="space-y-3">
                  {climateData && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">Temperatura</span>
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {climateData.temperature?.current?.toFixed(1)}°C
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">Humedad</span>
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {climateData.humidity?.value?.toFixed(0)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Wind className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">Viento</span>
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {climateData.wind?.speed?.toFixed(1)} m/s
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Bell className="h-5 w-5 text-blue-500 mr-2" />
              Notificaciones
            </h2>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 animate-fade-in-up ${
                      notification.priority === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                      notification.priority === 'high' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                      notification.priority === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                      'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="text-lg mr-2">{notification.icon}</span>
                          <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                            {notification.title}
                          </h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.read && (
                          <button
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No hay notificaciones</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Capas de Datos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <Layers className="h-6 w-6 text-primary mr-2" />
            Capas de Datos
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedLayer === layer.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {layer.icon}
                <span className="ml-2">{layer.name}</span>
              </button>
            ))}
          </div>

          {/* Alertas Activas */}
          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-l-4 animate-fade-in-up ${
                    alert.level === 'ALTO' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                    alert.level === 'MEDIO' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                    'border-green-500 bg-green-50 dark:bg-green-900/20'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-gray-800 dark:text-white mr-3">
                            {alert.type}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAlertColor(alert.level)} text-white`}>
                            {alert.level}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {alert.description}
                        </p>
                        {alert.firesDetected && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <Flame className="h-4 w-4 mr-1 text-red-500" />
                            {alert.firesDetected} incendios detectados
                            {alert.highRiskFires > 0 && ` (${alert.highRiskFires} de alto riesgo)`}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Info className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <p>No hay alertas activas en esta categoría</p>
              </div>
            )}
          </div>
        </div>

        {/* Recomendaciones */}
        {climateData && climateData.recommendations && climateData.recommendations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Info className="h-6 w-6 text-blue-500 mr-2" />
              Recomendaciones para Hoy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {climateData.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border animate-fade-in-up ${
                    recommendation.priority === 'high' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' :
                    recommendation.priority === 'medium' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20' :
                    'border-blue-200 bg-blue-50 dark:bg-blue-900/20'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{recommendation.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                        {recommendation.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {recommendation.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Acciones Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up">
            <Flame className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Mapa de Incendios</h3>
            <p className="text-sm opacity-90">Ver incendios activos</p>
          </button>
          
          <button className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Thermometer className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Pronóstico</h3>
            <p className="text-sm opacity-90">Ver pronóstico del tiempo</p>
          </button>
          
          <button className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Activity className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Historial</h3>
            <p className="text-sm opacity-90">Ver datos históricos</p>
          </button>
          
          <button className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <Settings className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-2">Configurar</h3>
            <p className="text-sm opacity-90">Ajustar alertas</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;