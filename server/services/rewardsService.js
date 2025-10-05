class RewardsService {
  constructor() {
    this.rewards = [
      {
        id: 'fire_spotter',
        name: 'Detector de Incendios',
        description: 'Reporta 5 incendios activos',
        icon: '🔥',
        points: 100,
        category: 'alertas',
        requirement: { type: 'fire_reports', count: 5 },
        unlocked: false
      },
      {
        id: 'climate_guardian',
        name: 'Guardián del Clima',
        description: 'Completa 10 simulaciones ambientales',
        icon: '🌱',
        points: 150,
        category: 'simulaciones',
        requirement: { type: 'simulations', count: 10 },
        unlocked: false
      },
      {
        id: 'community_leader',
        name: 'Líder Comunitario',
        description: 'Publica 20 ideas en la comunidad',
        icon: '👥',
        points: 200,
        category: 'comunidad',
        requirement: { type: 'community_ideas', count: 20 },
        unlocked: false
      },
      {
        id: 'data_analyst',
        name: 'Analista de Datos',
        description: 'Visualiza 50 mapas de la NASA',
        icon: '📊',
        points: 120,
        category: 'datos',
        requirement: { type: 'map_views', count: 50 },
        unlocked: false
      },
      {
        id: 'early_adopter',
        name: 'Pionero',
        description: 'Únete en los primeros 100 usuarios',
        icon: '⭐',
        points: 50,
        category: 'especial',
        requirement: { type: 'early_user', count: 1 },
        unlocked: false
      },
      {
        id: 'weekly_active',
        name: 'Activo Semanal',
        description: 'Usa la plataforma 7 días seguidos',
        icon: '📅',
        points: 75,
        category: 'actividad',
        requirement: { type: 'consecutive_days', count: 7 },
        unlocked: false
      },
      {
        id: 'santa_cruz_expert',
        name: 'Experto en Santa Cruz',
        description: 'Explora todas las zonas de Santa Cruz',
        icon: '🗺️',
        points: 180,
        category: 'exploracion',
        requirement: { type: 'zones_explored', count: 10 },
        unlocked: false
      },
      {
        id: 'nasa_enthusiast',
        name: 'Entusiasta de la NASA',
        description: 'Accede a datos de la NASA 30 veces',
        icon: '🛰️',
        points: 160,
        category: 'nasa',
        requirement: { type: 'nasa_access', count: 30 },
        unlocked: false
      }
    ];

    this.levels = [
      { level: 1, name: 'Principiante', minPoints: 0, color: '#6B7280' },
      { level: 2, name: 'Explorador', minPoints: 100, color: '#10B981' },
      { level: 3, name: 'Analista', minPoints: 300, color: '#3B82F6' },
      { level: 4, name: 'Experto', minPoints: 600, color: '#8B5CF6' },
      { level: 5, name: 'Maestro', minPoints: 1000, color: '#F59E0B' },
      { level: 6, name: 'Leyenda', minPoints: 1500, color: '#EF4444' }
    ];
  }

  // Calcular nivel del usuario basado en puntos
  calculateUserLevel(points) {
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (points >= this.levels[i].minPoints) {
        return this.levels[i];
      }
    }
    return this.levels[0];
  }

  // Verificar si el usuario puede desbloquear una recompensa
  checkRewardEligibility(userStats) {
    const eligibleRewards = [];

    this.rewards.forEach(reward => {
      if (reward.unlocked) return;

      let isEligible = false;
      const requirement = reward.requirement;

      switch (requirement.type) {
        case 'fire_reports':
          isEligible = userStats.fireReports >= requirement.count;
          break;
        case 'simulations':
          isEligible = userStats.simulations >= requirement.count;
          break;
        case 'community_ideas':
          isEligible = userStats.communityIdeas >= requirement.count;
          break;
        case 'map_views':
          isEligible = userStats.mapViews >= requirement.count;
          break;
        case 'early_user':
          isEligible = userStats.userRank <= 100;
          break;
        case 'consecutive_days':
          isEligible = userStats.consecutiveDays >= requirement.count;
          break;
        case 'zones_explored':
          isEligible = userStats.zonesExplored >= requirement.count;
          break;
        case 'nasa_access':
          isEligible = userStats.nasaAccess >= requirement.count;
          break;
      }

      if (isEligible) {
        eligibleRewards.push({
          ...reward,
          unlocked: true,
          unlockedAt: new Date().toISOString()
        });
      }
    });

    return eligibleRewards;
  }

  // Obtener todas las recompensas
  getAllRewards() {
    return this.rewards;
  }

  // Obtener recompensas por categoría
  getRewardsByCategory(category) {
    return this.rewards.filter(reward => reward.category === category);
  }

  // Obtener progreso del usuario
  getUserProgress(userStats) {
    const currentLevel = this.calculateUserLevel(userStats.totalPoints);
    const nextLevel = this.levels.find(level => level.minPoints > userStats.totalPoints);
    
    const progressToNext = nextLevel ? 
      ((userStats.totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 : 100;

    return {
      currentLevel,
      nextLevel,
      progressToNext: Math.min(progressToNext, 100),
      totalPoints: userStats.totalPoints,
      pointsToNext: nextLevel ? nextLevel.minPoints - userStats.totalPoints : 0
    };
  }

  // Obtener estadísticas de recompensas
  getRewardStats() {
    const categories = [...new Set(this.rewards.map(r => r.category))];
    const stats = {};

    categories.forEach(category => {
      const categoryRewards = this.rewards.filter(r => r.category === category);
      stats[category] = {
        total: categoryRewards.length,
        totalPoints: categoryRewards.reduce((sum, r) => sum + r.points, 0),
        rewards: categoryRewards
      };
    });

    return {
      totalRewards: this.rewards.length,
      totalPossiblePoints: this.rewards.reduce((sum, r) => sum + r.points, 0),
      categories: stats,
      levels: this.levels
    };
  }

  // Simular desbloqueo de recompensa
  unlockReward(rewardId, userStats) {
    const reward = this.rewards.find(r => r.id === rewardId);
    if (!reward || reward.unlocked) return null;

    const eligibleRewards = this.checkRewardEligibility(userStats);
    const unlockedReward = eligibleRewards.find(r => r.id === rewardId);
    
    if (unlockedReward) {
      reward.unlocked = true;
      reward.unlockedAt = new Date().toISOString();
      return {
        ...unlockedReward,
        pointsEarned: unlockedReward.points
      };
    }

    return null;
  }

  // Obtener recompensas diarias
  getDailyRewards() {
    return [
      {
        id: 'daily_login',
        name: 'Login Diario',
        description: 'Inicia sesión todos los días',
        icon: '🌅',
        points: 10,
        type: 'daily'
      },
      {
        id: 'daily_exploration',
        name: 'Exploración Diaria',
        description: 'Explora el mapa de Santa Cruz',
        icon: '🗺️',
        points: 15,
        type: 'daily'
      },
      {
        id: 'daily_simulation',
        name: 'Simulación Diaria',
        description: 'Ejecuta una simulación',
        icon: '⚡',
        points: 20,
        type: 'daily'
      }
    ];
  }

  // Verificar recompensas diarias
  checkDailyRewards(userActivity) {
    const today = new Date().toDateString();
    const dailyRewards = this.getDailyRewards();
    const earnedToday = [];

    if (userActivity.lastLogin === today) {
      earnedToday.push(dailyRewards[0]); // Login diario
    }

    if (userActivity.mapViewsToday > 0) {
      earnedToday.push(dailyRewards[1]); // Exploración diaria
    }

    if (userActivity.simulationsToday > 0) {
      earnedToday.push(dailyRewards[2]); // Simulación diaria
    }

    return earnedToday;
  }
}

module.exports = new RewardsService();
