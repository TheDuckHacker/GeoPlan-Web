const express = require('express');
const router = express.Router();
const nasaService = require('../services/nasaService');
const fireDataService = require('../services/fireDataService');
const santaCruzClimateService = require('../services/santaCruzClimateService');
const notificationService = require('../services/notificationService');

// Obtener alertas actuales basadas en datos reales de Santa Cruz
router.get('/current', async (req, res) => {
  try {
    // Obtener datos climáticos actuales de Santa Cruz
    const climateData = await santaCruzClimateService.getCurrentClimateData();
    
    // Obtener alertas de incendios activos
    const fireAlerts = await fireDataService.getActiveFireAlerts();
    
    // Obtener notificaciones no leídas
    const notifications = notificationService.getUnreadNotifications();
    
    // Combinar todas las alertas
    const allAlerts = [];
    
    // Agregar alertas climáticas
    if (climateData.success && climateData.data.alerts) {
      allAlerts.push(...climateData.data.alerts);
    }
    
    // Agregar alertas de incendios
    if (fireAlerts.success && fireAlerts.activeFires.length > 0) {
      allAlerts.push({
        type: 'ALERTA DE INCENDIOS',
        level: fireAlerts.highRisk > 0 ? 'ALTO' : 'MEDIO',
        description: `Se detectaron ${fireAlerts.activeFires.length} incendios activos en Santa Cruz. ${fireAlerts.highRisk} de alto riesgo.`,
        icon: '🔥',
        color: fireAlerts.highRisk > 0 ? 'red' : 'orange',
        active: true,
        firesDetected: fireAlerts.activeFires.length,
        highRiskFires: fireAlerts.highRisk
      });
    }
    
    // Determinar el nivel de riesgo general
    const criticalAlerts = allAlerts.filter(a => a.level === 'ALTO' || a.level === 'CRÍTICO');
    const alertLevel = criticalAlerts.length > 0 ? 'ALTO' : 
                      allAlerts.filter(a => a.level === 'MEDIO').length > 0 ? 'MEDIO' : 'BAJO';
    
    res.json({
      success: true,
      message: 'Alertas de Santa Cruz obtenidas exitosamente',
      data: {
        // Información general
        level: alertLevel,
        totalAlerts: allAlerts.length,
        criticalAlerts: criticalAlerts.length,
        
        // Datos climáticos
        climate: climateData.success ? {
          temperature: climateData.data.temperature,
          humidity: climateData.data.humidity,
          wind: climateData.data.wind,
          solar: climateData.data.solar,
          precipitation: climateData.data.precipitation,
          riskLevel: climateData.data.riskLevel
        } : null,
        
        // Alertas activas
        alerts: allAlerts,
        
        // Recomendaciones
        recommendations: climateData.success ? climateData.data.recommendations : [],
        
        // Notificaciones
        notifications: notifications.slice(0, 5), // Últimas 5 notificaciones
        
        // Metadatos
        lastUpdated: new Date().toISOString(),
        coordinates: { lat: -17.7863, lon: -63.1812 },
        source: 'NASA APIs + Santa Cruz Climate Service'
      }
    });
  } catch (error) {
    console.error('Error en endpoint current:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener alertas actuales',
      error: error.message
    });
  }
});

// Obtener datos históricos de incendios de Santa Cruz
router.get('/santa-cruz-fires', async (req, res) => {
  try {
    const fireData = await fireDataService.getSantaCruzFireData();
    
    res.json({
      success: true,
      message: 'Datos de incendios de Santa Cruz obtenidos exitosamente',
      data: fireData
    });
  } catch (error) {
    console.error('Error en endpoint santa-cruz-fires:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos de incendios de Santa Cruz',
      error: error.message
    });
  }
});

// Obtener datos climáticos históricos de Santa Cruz
router.get('/climate-history', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const historicalData = await santaCruzClimateService.getHistoricalData(days);
    
    res.json({
      success: true,
      message: `Datos climáticos históricos de ${days} días obtenidos exitosamente`,
      data: historicalData
    });
  } catch (error) {
    console.error('Error en endpoint climate-history:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos climáticos históricos',
      error: error.message
    });
  }
});

// Obtener pronóstico del tiempo para Santa Cruz
router.get('/weather-forecast', async (req, res) => {
  try {
    const forecast = await santaCruzClimateService.getWeatherForecast();
    
    res.json({
      success: true,
      message: 'Pronóstico del tiempo obtenido exitosamente',
      data: forecast
    });
  } catch (error) {
    console.error('Error en endpoint weather-forecast:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener pronóstico del tiempo',
      error: error.message
    });
  }
});

// Obtener notificaciones en tiempo real
router.get('/notifications', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const notifications = notificationService.getNotifications(limit);
    const stats = notificationService.getStats();
    
    res.json({
      success: true,
      message: 'Notificaciones obtenidas exitosamente',
      data: {
        notifications,
        stats,
        unreadCount: stats.unread
      }
    });
  } catch (error) {
    console.error('Error en endpoint notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener notificaciones',
      error: error.message
    });
  }
});

// Marcar notificación como leída
router.put('/notifications/:id/read', async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id);
    const success = notificationService.markAsRead(notificationId);
    
    if (success) {
      res.json({
        success: true,
        message: 'Notificación marcada como leída'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Notificación no encontrada'
      });
    }
  } catch (error) {
    console.error('Error en endpoint notifications read:', error);
    res.status(500).json({
      success: false,
      message: 'Error al marcar notificación como leída',
      error: error.message
    });
  }
});

// Marcar todas las notificaciones como leídas
router.put('/notifications/read-all', async (req, res) => {
  try {
    notificationService.markAllAsRead();
    
    res.json({
      success: true,
      message: 'Todas las notificaciones marcadas como leídas'
    });
  } catch (error) {
    console.error('Error en endpoint notifications read-all:', error);
    res.status(500).json({
      success: false,
      message: 'Error al marcar todas las notificaciones como leídas',
      error: error.message
    });
  }
});

// Eliminar notificación
router.delete('/notifications/:id', async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id);
    const deleted = notificationService.deleteNotification(notificationId);
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Notificación eliminada exitosamente'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Notificación no encontrada'
      });
    }
  } catch (error) {
    console.error('Error en endpoint notifications delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar notificación',
      error: error.message
    });
  }
});

// Obtener estadísticas de alertas
router.get('/stats', async (req, res) => {
  try {
    const notificationStats = notificationService.getStats();
    const fireData = await fireDataService.getSantaCruzFireData();
    const climateData = await santaCruzClimateService.getCurrentClimateData();
    
    res.json({
      success: true,
      message: 'Estadísticas de alertas obtenidas exitosamente',
      data: {
        notifications: notificationStats,
        fires: {
          total: fireData.success ? fireData.totalFires : 0,
          active: fireData.success ? fireData.data?.statistics?.highRiskZones || 0 : 0
        },
        climate: {
          riskLevel: climateData.success ? climateData.data.riskLevel : 'DESCONOCIDO',
          temperature: climateData.success ? climateData.data.temperature.current : null,
          alerts: climateData.success ? climateData.data.alerts.length : 0
        },
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error en endpoint stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
});

// Generar notificación de prueba
router.post('/test-notification', async (req, res) => {
  try {
    const { type, title, message, priority } = req.body;
    
    const notification = notificationService.createCustomNotification(
      type || 'test',
      title || 'Notificación de Prueba',
      message || 'Esta es una notificación de prueba',
      priority || 'medium',
      '🧪'
    );
    
    res.json({
      success: true,
      message: 'Notificación de prueba creada exitosamente',
      data: notification
    });
  } catch (error) {
    console.error('Error en endpoint test-notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear notificación de prueba',
      error: error.message
    });
  }
});

module.exports = router;