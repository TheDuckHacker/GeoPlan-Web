const express = require('express');
const router = express.Router();
const gamificationService = require('../services/gamificationService');

// Obtener progreso del usuario
router.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await gamificationService.getUserProgress(userId);
    
    res.json({
      success: true,
      message: 'Progreso del usuario obtenido exitosamente',
      data: progress
    });
  } catch (error) {
    console.error('Error en endpoint progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener progreso del usuario',
      error: error.message
    });
  }
});

// Agregar puntos al usuario
router.post('/add-points', async (req, res) => {
  try {
    const { userId, activityId, metadata } = req.body;
    
    if (!userId || !activityId) {
      return res.status(400).json({
        success: false,
        message: 'Faltan parámetros: userId o activityId'
      });
    }

    const result = await gamificationService.addPoints(userId, activityId, metadata);
    
    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    console.error('Error en endpoint add-points:', error);
    res.status(500).json({
      success: false,
      message: 'Error al agregar puntos',
      error: error.message
    });
  }
});

// Obtener certificados del usuario
router.get('/certificates/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await gamificationService.getUserProgress(userId);
    
    res.json({
      success: true,
      message: 'Certificados obtenidos exitosamente',
      data: progress.certificates
    });
  } catch (error) {
    console.error('Error en endpoint certificates:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener certificados',
      error: error.message
    });
  }
});

// Generar certificado
router.post('/generate-certificate', async (req, res) => {
  try {
    const { userId, certificateId } = req.body;
    
    if (!userId || !certificateId) {
      return res.status(400).json({
        success: false,
        message: 'Faltan parámetros: userId o certificateId'
      });
    }

    const result = await gamificationService.generateCertificate(userId, certificateId);
    
    res.json({
      success: true,
      message: result.message,
      data: result.certificate
    });
  } catch (error) {
    console.error('Error en endpoint generate-certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Error al generar certificado',
      error: error.message
    });
  }
});

// Obtener ranking de usuarios
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const result = await gamificationService.getLeaderboard(limit);
    
    res.json({
      success: true,
      message: 'Ranking obtenido exitosamente',
      data: result
    });
  } catch (error) {
    console.error('Error en endpoint leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener ranking',
      error: error.message
    });
  }
});

// Obtener actividades disponibles
router.get('/activities', async (req, res) => {
  try {
    const activities = gamificationService.activities;
    
    res.json({
      success: true,
      message: 'Actividades obtenidas exitosamente',
      data: activities
    });
  } catch (error) {
    console.error('Error en endpoint activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener actividades',
      error: error.message
    });
  }
});

// Obtener niveles disponibles
router.get('/levels', async (req, res) => {
  try {
    const levels = gamificationService.levels;
    
    res.json({
      success: true,
      message: 'Niveles obtenidos exitosamente',
      data: levels
    });
  } catch (error) {
    console.error('Error en endpoint levels:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener niveles',
      error: error.message
    });
  }
});

// Obtener logros del usuario
router.get('/achievements/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await gamificationService.getUserProgress(userId);
    
    res.json({
      success: true,
      message: 'Logros obtenidos exitosamente',
      data: progress.achievements
    });
  } catch (error) {
    console.error('Error en endpoint achievements:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener logros',
      error: error.message
    });
  }
});

// Obtener estadísticas del usuario
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await gamificationService.getUserProgress(userId);
    
    const stats = {
      totalPoints: progress.totalPoints,
      currentLevel: progress.currentLevel,
      certificatesObtained: progress.certificates.filter(c => c.obtained).length,
      totalCertificates: progress.certificates.length,
      achievementsObtained: progress.achievements.filter(a => a.obtained).length,
      totalActivities: progress.activities.length,
      progressToNextLevel: progress.progressToNext,
      nextLevel: progress.nextLevel,
      lastUpdated: progress.lastUpdated
    };
    
    res.json({
      success: true,
      message: 'Estadísticas obtenidas exitosamente',
      data: stats
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

module.exports = router;
