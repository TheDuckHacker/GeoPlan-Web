const databaseService = require('./databaseService');

class GamificationService {
  constructor() {
    // Sistema de niveles con certificados de la NASA
    this.levels = [
      { 
        level: 1, 
        name: 'Explorador Espacial', 
        pointsRequired: 0,
        description: 'Comienza tu viaje hacia la sostenibilidad urbana',
        badge: '🚀',
        color: 'gray'
      },
      { 
        level: 2, 
        name: 'Analista Climático', 
        pointsRequired: 100,
        description: 'Has demostrado interés en los datos climáticos',
        badge: '🌡️',
        color: 'blue',
        certificate: 'NASA Climate Data Analyst'
      },
      { 
        level: 3, 
        name: 'Especialista en Incendios', 
        pointsRequired: 250,
        description: 'Experto en detección y prevención de incendios',
        badge: '🔥',
        color: 'orange',
        certificate: 'NASA Fire Detection Specialist'
      },
      { 
        level: 4, 
        name: 'Científico Ambiental', 
        pointsRequired: 500,
        description: 'Dominas el análisis ambiental urbano',
        badge: '🌍',
        color: 'green',
        certificate: 'NASA Environmental Scientist'
      },
      { 
        level: 5, 
        name: 'Experto en Sostenibilidad Urbana', 
        pointsRequired: 1000,
        description: 'El más alto nivel de expertise en sostenibilidad',
        badge: '🏆',
        color: 'gold',
        certificate: 'NASA Urban Sustainability Expert'
      }
    ];

    // Recompensas especiales
    this.specialRewards = [
      {
        id: 'nasa_certificate_1',
        name: 'Certificado NASA - Analista Climático',
        description: 'Certificación oficial de la NASA en análisis de datos climáticos',
        points: 0,
        type: 'certificate',
        level: 2,
        icon: '🌡️',
        color: 'blue',
        requirements: {
          simulations: 5,
          alerts_reported: 3,
          community_posts: 2
        }
      },
      {
        id: 'nasa_certificate_2',
        name: 'Certificado NASA - Especialista en Incendios',
        description: 'Certificación oficial de la NASA en detección de incendios',
        points: 0,
        type: 'certificate',
        level: 3,
        icon: '🔥',
        color: 'orange',
        requirements: {
          simulations: 10,
          fire_alerts_reported: 5,
          maps_analyzed: 8
        }
      },
      {
        id: 'nasa_certificate_3',
        name: 'Certificado NASA - Científico Ambiental',
        description: 'Certificación oficial de la NASA en ciencias ambientales',
        points: 0,
        type: 'certificate',
        level: 4,
        icon: '🌍',
        color: 'green',
        requirements: {
          simulations: 20,
          community_leader: true,
          environmental_projects: 3
        }
      },
      {
        id: 'nasa_certificate_4',
        name: 'Certificado NASA - Experto en Sostenibilidad Urbana',
        description: 'La máxima certificación de la NASA en sostenibilidad urbana',
        points: 0,
        type: 'certificate',
        level: 5,
        icon: '🏆',
        color: 'gold',
        requirements: {
          simulations: 50,
          mentor_status: true,
          city_impact: 'high'
        }
      }
    ];

    // Actividades que otorgan puntos
    this.activities = {
      daily_login: { points: 5, description: 'Inicio de sesión diario' },
      simulation_completed: { points: 20, description: 'Simulación completada' },
      alert_reported: { points: 15, description: 'Alerta climática reportada' },
      community_post: { points: 10, description: 'Publicación en comunidad' },
      map_analysis: { points: 8, description: 'Análisis de mapa realizado' },
      fire_detection: { points: 25, description: 'Detección de incendio reportada' },
      environmental_tip: { points: 12, description: 'Consejo ambiental compartido' },
      project_vote: { points: 5, description: 'Voto en proyecto comunitario' },
      streak_7_days: { points: 50, description: 'Racha de 7 días' },
      streak_30_days: { points: 200, description: 'Racha de 30 días' },
      mentor_help: { points: 30, description: 'Ayuda a otro usuario' },
      city_impact: { points: 100, description: 'Impacto positivo en la ciudad' }
    };
  }

  // Obtener progreso del usuario
  async getUserProgress(userId) {
    try {
      const user = await databaseService.getUserById(userId);
      if (!user) {
        return this.getDefaultProgress();
      }

      const totalPoints = user.points || 0;
      const currentLevel = this.getCurrentLevel(totalPoints);
      const nextLevel = this.getNextLevel(totalPoints);
      const progressToNext = this.calculateProgressToNext(totalPoints, currentLevel, nextLevel);

      // Verificar certificados obtenidos
      const certificates = await this.getUserCertificates(userId, totalPoints);
      
      // Verificar recompensas disponibles
      const availableRewards = await this.getAvailableRewards(userId, totalPoints);

      return {
        currentLevel,
        nextLevel,
        totalPoints,
        progressToNext,
        certificates,
        availableRewards,
        activities: await this.getUserActivities(userId),
        achievements: await this.getUserAchievements(userId),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting user progress:', error);
      return this.getDefaultProgress();
    }
  }

  // Obtener nivel actual basado en puntos
  getCurrentLevel(points) {
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (points >= this.levels[i].pointsRequired) {
        return this.levels[i];
      }
    }
    return this.levels[0];
  }

  // Obtener siguiente nivel
  getNextLevel(points) {
    for (let i = 0; i < this.levels.length; i++) {
      if (points < this.levels[i].pointsRequired) {
        return this.levels[i];
      }
    }
    return null; // Ya es el nivel máximo
  }

  // Calcular progreso hacia el siguiente nivel
  calculateProgressToNext(points, currentLevel, nextLevel) {
    if (!nextLevel) return 100;
    
    const currentPoints = points - currentLevel.pointsRequired;
    const totalNeeded = nextLevel.pointsRequired - currentLevel.pointsRequired;
    
    return Math.min(100, Math.max(0, (currentPoints / totalNeeded) * 100));
  }

  // Obtener certificados del usuario
  async getUserCertificates(userId, totalPoints) {
    const certificates = [];
    
    for (const cert of this.specialRewards) {
      if (totalPoints >= cert.level * 100) { // Simplificado: cada nivel requiere 100 puntos más
        const isObtained = await this.isCertificateObtained(userId, cert.id);
        certificates.push({
          ...cert,
          obtained: isObtained,
          obtainedAt: isObtained ? new Date().toISOString() : null
        });
      }
    }
    
    return certificates;
  }

  // Verificar si un certificado fue obtenido
  async isCertificateObtained(userId, certificateId) {
    try {
      // En un sistema real, esto consultaría la base de datos
      // Por ahora, simulamos basado en puntos
      const user = await databaseService.getUserById(userId);
      if (!user) return false;
      
      const certificate = this.specialRewards.find(c => c.id === certificateId);
      if (!certificate) return false;
      
      return (user.points || 0) >= certificate.level * 100;
    } catch (error) {
      console.error('Error checking certificate:', error);
      return false;
    }
  }

  // Obtener recompensas disponibles
  async getAvailableRewards(userId, totalPoints) {
    const rewards = [];
    
    // Recompensas por actividades
    for (const [activityId, activity] of Object.entries(this.activities)) {
      rewards.push({
        id: activityId,
        name: activity.description,
        points: activity.points,
        type: 'activity',
        icon: this.getActivityIcon(activityId),
        available: true
      });
    }
    
    return rewards;
  }

  // Obtener actividades del usuario
  async getUserActivities(userId) {
    try {
      // En un sistema real, esto consultaría la base de datos de actividades
      // Por ahora, simulamos algunas actividades
      return [
        { activity: 'daily_login', count: 15, lastDate: new Date().toISOString() },
        { activity: 'simulation_completed', count: 8, lastDate: new Date().toISOString() },
        { activity: 'alert_reported', count: 3, lastDate: new Date().toISOString() },
        { activity: 'community_post', count: 5, lastDate: new Date().toISOString() }
      ];
    } catch (error) {
      console.error('Error getting user activities:', error);
      return [];
    }
  }

  // Obtener logros del usuario
  async getUserAchievements(userId) {
    try {
      const activities = await this.getUserActivities(userId);
      const achievements = [];
      
      // Logros basados en actividades
      const totalSimulations = activities.find(a => a.activity === 'simulation_completed')?.count || 0;
      const totalLogins = activities.find(a => a.activity === 'daily_login')?.count || 0;
      
      if (totalSimulations >= 5) {
        achievements.push({
          id: 'simulation_master',
          name: 'Maestro de Simulaciones',
          description: 'Has completado 5 simulaciones',
          icon: '🎯',
          obtained: true
        });
      }
      
      if (totalLogins >= 30) {
        achievements.push({
          id: 'dedicated_user',
          name: 'Usuario Dedicado',
          description: 'Has iniciado sesión 30 días seguidos',
          icon: '🔥',
          obtained: true
        });
      }
      
      return achievements;
    } catch (error) {
      console.error('Error getting user achievements:', error);
      return [];
    }
  }

  // Agregar puntos al usuario
  async addPoints(userId, activityId, metadata = {}) {
    try {
      const activity = this.activities[activityId];
      if (!activity) {
        throw new Error('Actividad no válida');
      }

      const user = await databaseService.getUserById(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const newPoints = (user.points || 0) + activity.points;
      
      // Actualizar puntos del usuario
      await databaseService.updateUser(userId, { 
        points: newPoints,
        last_activity: new Date().toISOString(),
        last_activity_type: activityId
      });

      // Registrar actividad
      await this.recordActivity(userId, activityId, activity.points, metadata);

      // Verificar si subió de nivel
      const oldLevel = this.getCurrentLevel(user.points || 0);
      const newLevel = this.getCurrentLevel(newPoints);
      
      const levelUp = newLevel.level > oldLevel.level;
      
      return {
        success: true,
        pointsAdded: activity.points,
        newTotalPoints: newPoints,
        levelUp,
        newLevel: levelUp ? newLevel : null,
        message: levelUp ? 
          `¡Felicidades! Has alcanzado el nivel ${newLevel.level}: ${newLevel.name}` :
          `Has ganado ${activity.points} puntos por ${activity.description}`
      };
    } catch (error) {
      console.error('Error adding points:', error);
      throw error;
    }
  }

  // Registrar actividad del usuario
  async recordActivity(userId, activityId, points, metadata) {
    try {
      // En un sistema real, esto guardaría en la base de datos
      console.log(`Usuario ${userId} realizó actividad ${activityId} y ganó ${points} puntos`);
    } catch (error) {
      console.error('Error recording activity:', error);
    }
  }

  // Obtener icono de actividad
  getActivityIcon(activityId) {
    const icons = {
      daily_login: '🌅',
      simulation_completed: '🎯',
      alert_reported: '🚨',
      community_post: '💬',
      map_analysis: '🗺️',
      fire_detection: '🔥',
      environmental_tip: '💡',
      project_vote: '🗳️',
      streak_7_days: '🔥',
      streak_30_days: '🏆',
      mentor_help: '🤝',
      city_impact: '🌍'
    };
    return icons[activityId] || '⭐';
  }

  // Obtener progreso por defecto
  getDefaultProgress() {
    return {
      currentLevel: this.levels[0],
      nextLevel: this.levels[1],
      totalPoints: 0,
      progressToNext: 0,
      certificates: [],
      availableRewards: [],
      activities: [],
      achievements: [],
      lastUpdated: new Date().toISOString()
    };
  }

  // Generar certificado PDF (simulado)
  async generateCertificate(userId, certificateId) {
    try {
      const certificate = this.specialRewards.find(c => c.id === certificateId);
      if (!certificate) {
        throw new Error('Certificado no encontrado');
      }

      const user = await databaseService.getUserById(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // En un sistema real, esto generaría un PDF real
      const certificateData = {
        id: `CERT-${Date.now()}`,
        userId: userId,
        userName: user.name,
        certificateName: certificate.name,
        certificateDescription: certificate.description,
        level: certificate.level,
        badge: certificate.badge,
        color: certificate.color,
        issuedAt: new Date().toISOString(),
        issuedBy: 'NASA - GeoPlan Platform',
        verificationCode: `NASA-${userId}-${certificate.level}-${Date.now()}`
      };

      return {
        success: true,
        certificate: certificateData,
        downloadUrl: `/api/gamification/certificate/${certificateData.id}/download`,
        message: 'Certificado generado exitosamente'
      };
    } catch (error) {
      console.error('Error generating certificate:', error);
      throw error;
    }
  }

  // Obtener ranking de usuarios
  async getLeaderboard(limit = 10) {
    try {
      // En un sistema real, esto consultaría la base de datos
      // Por ahora, simulamos un ranking
      const mockLeaderboard = [
        { rank: 1, name: 'Ana García', points: 1250, level: 5, badge: '🏆' },
        { rank: 2, name: 'Carlos Mendoza', points: 980, level: 4, badge: '🌍' },
        { rank: 3, name: 'Sofia Ramirez', points: 750, level: 3, badge: '🔥' },
        { rank: 4, name: 'Miguel Torres', points: 520, level: 3, badge: '🔥' },
        { rank: 5, name: 'Laura Jiménez', points: 480, level: 2, badge: '🌡️' }
      ];

      return {
        success: true,
        leaderboard: mockLeaderboard.slice(0, limit),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      throw error;
    }
  }
}

module.exports = new GamificationService();
