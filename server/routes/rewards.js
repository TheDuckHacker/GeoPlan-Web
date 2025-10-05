const express = require('express');
const router = express.Router();
const rewardsService = require('../services/rewardsService');

// Obtener todas las recompensas disponibles
router.get('/', (req, res) => {
  try {
    const rewards = rewardsService.getAllRewards();
    res.json({
      success: true,
      message: 'Recompensas obtenidas exitosamente',
      data: rewards
    });
  } catch (error) {
    console.error('Error getting rewards:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener recompensas',
      error: error.message
    });
  }
});

// Obtener recompensas por categoría
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const rewards = rewardsService.getRewardsByCategory(category);
    
    res.json({
      success: true,
      message: `Recompensas de ${category} obtenidas exitosamente`,
      data: rewards
    });
  } catch (error) {
    console.error('Error getting rewards by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener recompensas por categoría',
      error: error.message
    });
  }
});

// Obtener progreso del usuario
router.get('/user/:userId/progress', (req, res) => {
  try {
    const { userId } = req.params;
    
    // Simular estadísticas del usuario (en producción vendría de la base de datos)
    const userStats = {
      totalPoints: 450,
      fireReports: 3,
      simulations: 8,
      communityIdeas: 12,
      mapViews: 25,
      userRank: 45,
      consecutiveDays: 5,
      zonesExplored: 6,
      nasaAccess: 18
    };
    
    const progress = rewardsService.getUserProgress(userStats);
    const eligibleRewards = rewardsService.checkRewardEligibility(userStats);
    
    res.json({
      success: true,
      message: 'Progreso del usuario obtenido exitosamente',
      data: {
        userId,
        progress,
        eligibleRewards,
        userStats
      }
    });
  } catch (error) {
    console.error('Error getting user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener progreso del usuario',
      error: error.message
    });
  }
});

// Desbloquear recompensa
router.post('/unlock', (req, res) => {
  try {
    const { userId, rewardId } = req.body;
    
    if (!userId || !rewardId) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y ID de recompensa son requeridos'
      });
    }
    
    // Simular estadísticas del usuario
    const userStats = {
      totalPoints: 450,
      fireReports: 3,
      simulations: 8,
      communityIdeas: 12,
      mapViews: 25,
      userRank: 45,
      consecutiveDays: 5,
      zonesExplored: 6,
      nasaAccess: 18
    };
    
    const unlockedReward = rewardsService.unlockReward(rewardId, userStats);
    
    if (unlockedReward) {
      res.json({
        success: true,
        message: '¡Recompensa desbloqueada!',
        data: unlockedReward
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'No cumples con los requisitos para esta recompensa'
      });
    }
  } catch (error) {
    console.error('Error unlocking reward:', error);
    res.status(500).json({
      success: false,
      message: 'Error al desbloquear recompensa',
      error: error.message
    });
  }
});

// Obtener recompensas diarias
router.get('/daily', (req, res) => {
  try {
    const dailyRewards = rewardsService.getDailyRewards();
    
    res.json({
      success: true,
      message: 'Recompensas diarias obtenidas exitosamente',
      data: dailyRewards
    });
  } catch (error) {
    console.error('Error getting daily rewards:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener recompensas diarias',
      error: error.message
    });
  }
});

// Verificar recompensas diarias del usuario
router.get('/user/:userId/daily', (req, res) => {
  try {
    const { userId } = req.params;
    
    // Simular actividad del usuario
    const userActivity = {
      lastLogin: new Date().toDateString(),
      mapViewsToday: 5,
      simulationsToday: 2
    };
    
    const earnedToday = rewardsService.checkDailyRewards(userActivity);
    
    res.json({
      success: true,
      message: 'Recompensas diarias del usuario obtenidas exitosamente',
      data: {
        userId,
        earnedToday,
        userActivity
      }
    });
  } catch (error) {
    console.error('Error getting user daily rewards:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener recompensas diarias del usuario',
      error: error.message
    });
  }
});

// Obtener estadísticas de recompensas
router.get('/stats', (req, res) => {
  try {
    const stats = rewardsService.getRewardStats();
    
    res.json({
      success: true,
      message: 'Estadísticas de recompensas obtenidas exitosamente',
      data: stats
    });
  } catch (error) {
    console.error('Error getting reward stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas de recompensas',
      error: error.message
    });
  }
});

// Obtener niveles disponibles
router.get('/levels', (req, res) => {
  try {
    const stats = rewardsService.getRewardStats();
    
    res.json({
      success: true,
      message: 'Niveles obtenidos exitosamente',
      data: stats.levels
    });
  } catch (error) {
    console.error('Error getting levels:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener niveles',
      error: error.message
    });
  }
});

module.exports = router;
