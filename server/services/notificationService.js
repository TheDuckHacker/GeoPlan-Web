const EventEmitter = require('events');

class NotificationService extends EventEmitter {
  constructor() {
    super();
    this.notifications = [];
    this.subscribers = new Map();
    this.startRealTimeMonitoring();
  }

  // Iniciar monitoreo en tiempo real
  startRealTimeMonitoring() {
    // Simular notificaciones cada 30 segundos
    setInterval(() => {
      this.generateRealTimeNotifications();
    }, 30000);

    // Simular alertas críticas cada 2 minutos
    setInterval(() => {
      this.generateCriticalAlerts();
    }, 120000);
  }

  // Generar notificaciones en tiempo real
  generateRealTimeNotifications() {
    const notifications = [
      {
        id: Date.now(),
        type: 'weather_update',
        title: 'Actualización Climática',
        message: 'Los datos climáticos de Santa Cruz han sido actualizados',
        timestamp: new Date().toISOString(),
        priority: 'info',
        icon: '🌡️',
        read: false
      },
      {
        id: Date.now() + 1,
        type: 'fire_alert',
        title: 'Nuevo Incendio Detectado',
        message: 'Se ha detectado un nuevo foco de incendio en la zona norte de Santa Cruz',
        timestamp: new Date().toISOString(),
        priority: 'high',
        icon: '🔥',
        read: false
      },
      {
        id: Date.now() + 2,
        type: 'air_quality',
        title: 'Calidad del Aire',
        message: 'La calidad del aire ha mejorado en el centro de la ciudad',
        timestamp: new Date().toISOString(),
        priority: 'medium',
        icon: '🌬️',
        read: false
      },
      {
        id: Date.now() + 3,
        type: 'temperature_alert',
        title: 'Alerta de Temperatura',
        message: 'Temperatura superando los 35°C en varias zonas de Santa Cruz',
        timestamp: new Date().toISOString(),
        priority: 'high',
        icon: '🌡️',
        read: false
      },
      {
        id: Date.now() + 4,
        type: 'rain_forecast',
        title: 'Pronóstico de Lluvia',
        message: 'Se esperan lluvias intensas en las próximas 2 horas',
        timestamp: new Date().toISOString(),
        priority: 'medium',
        icon: '🌧️',
        read: false
      }
    ];

    // Seleccionar una notificación aleatoria
    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    this.addNotification(randomNotification);
  }

  // Generar alertas críticas
  generateCriticalAlerts() {
    const criticalAlerts = [
      {
        id: Date.now(),
        type: 'extreme_heat',
        title: 'OLA DE CALOR EXTREMO',
        message: 'Temperaturas superiores a 40°C detectadas en Santa Cruz. Evite actividades al aire libre.',
        timestamp: new Date().toISOString(),
        priority: 'critical',
        icon: '🌡️',
        read: false,
        action: 'Ver recomendaciones'
      },
      {
        id: Date.now() + 1,
        type: 'fire_emergency',
        title: 'EMERGENCIA DE INCENDIO',
        message: 'Múltiples focos de incendio activos. Zona de alto riesgo identificada.',
        timestamp: new Date().toISOString(),
        priority: 'critical',
        icon: '🔥',
        read: false,
        action: 'Ver mapa de incendios'
      },
      {
        id: Date.now() + 2,
        type: 'air_pollution',
        title: 'CONTAMINACIÓN ATMOSFÉRICA',
        message: 'Niveles de contaminación superando límites seguros en el centro de la ciudad',
        timestamp: new Date().toISOString(),
        priority: 'critical',
        icon: '☁️',
        read: false,
        action: 'Ver datos de calidad del aire'
      }
    ];

    // 30% de probabilidad de generar una alerta crítica
    if (Math.random() < 0.3) {
      const randomAlert = criticalAlerts[Math.floor(Math.random() * criticalAlerts.length)];
      this.addNotification(randomAlert);
    }
  }

  // Agregar notificación
  addNotification(notification) {
    this.notifications.unshift(notification);
    
    // Mantener solo las últimas 50 notificaciones
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
    }

    // Emitir evento a todos los suscriptores
    this.emit('newNotification', notification);
    
    return notification;
  }

  // Obtener todas las notificaciones
  getNotifications(limit = 20) {
    return this.notifications.slice(0, limit);
  }

  // Obtener notificaciones no leídas
  getUnreadNotifications() {
    return this.notifications.filter(n => !n.read);
  }

  // Marcar notificación como leída
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.emit('notificationRead', notification);
      return true;
    }
    return false;
  }

  // Marcar todas como leídas
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.emit('allNotificationsRead');
    return true;
  }

  // Eliminar notificación
  deleteNotification(notificationId) {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      const deleted = this.notifications.splice(index, 1)[0];
      this.emit('notificationDeleted', deleted);
      return deleted;
    }
    return null;
  }

  // Suscribirse a notificaciones en tiempo real
  subscribe(userId, callback) {
    this.subscribers.set(userId, callback);
    return () => this.subscribers.delete(userId);
  }

  // Obtener estadísticas de notificaciones
  getStats() {
    const total = this.notifications.length;
    const unread = this.notifications.filter(n => !n.read).length;
    const critical = this.notifications.filter(n => n.priority === 'critical').length;
    const high = this.notifications.filter(n => n.priority === 'high').length;
    const medium = this.notifications.filter(n => n.priority === 'medium').length;
    const info = this.notifications.filter(n => n.priority === 'info').length;

    return {
      total,
      unread,
      byPriority: {
        critical,
        high,
        medium,
        info
      },
      lastUpdated: new Date().toISOString()
    };
  }

  // Generar notificación personalizada
  createCustomNotification(type, title, message, priority = 'medium', icon = '📢') {
    const notification = {
      id: Date.now(),
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      priority,
      icon,
      read: false
    };

    return this.addNotification(notification);
  }

  // Simular notificación de datos de la NASA
  simulateNASAUpdate() {
    const nasaNotifications = [
      {
        type: 'nasa_update',
        title: 'Datos NASA Actualizados',
        message: 'Nuevos datos satelitales de Santa Cruz disponibles',
        priority: 'info',
        icon: '🛰️'
      },
      {
        type: 'fire_detection',
        title: 'Detección de Incendios',
        message: 'NASA FIRMS detectó 3 nuevos incendios en Santa Cruz',
        priority: 'high',
        icon: '🔥'
      },
      {
        type: 'weather_data',
        title: 'Datos Meteorológicos',
        message: 'NASA Power actualizó los datos climáticos de la región',
        priority: 'medium',
        icon: '🌡️'
      }
    ];

    const randomNotification = nasaNotifications[Math.floor(Math.random() * nasaNotifications.length)];
    return this.createCustomNotification(
      randomNotification.type,
      randomNotification.title,
      randomNotification.message,
      randomNotification.priority,
      randomNotification.icon
    );
  }

  // Obtener notificaciones por tipo
  getNotificationsByType(type) {
    return this.notifications.filter(n => n.type === type);
  }

  // Obtener notificaciones por prioridad
  getNotificationsByPriority(priority) {
    return this.notifications.filter(n => n.priority === priority);
  }

  // Limpiar notificaciones antiguas
  cleanOldNotifications(daysOld = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    const initialLength = this.notifications.length;
    this.notifications = this.notifications.filter(n => 
      new Date(n.timestamp) > cutoffDate
    );
    
    const removedCount = initialLength - this.notifications.length;
    if (removedCount > 0) {
      this.emit('notificationsCleaned', removedCount);
    }
    
    return removedCount;
  }
}

module.exports = new NotificationService();
