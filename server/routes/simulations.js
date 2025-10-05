const express = require('express');
const router = express.Router();
const simulationService = require('../services/simulationService');

// Obtener todas las estrategias disponibles
router.get('/strategies', (req, res) => {
  try {
    const strategies = simulationService.getStrategies();
    res.json({
      success: true,
      message: 'Estrategias de simulación obtenidas exitosamente',
      data: strategies
    });
  } catch (error) {
    console.error('Error getting strategies:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estrategias',
      error: error.message
    });
  }
});

// Obtener una estrategia específica
router.get('/strategies/:id', (req, res) => {
  try {
    const strategy = simulationService.getStrategy(req.params.id);
    if (!strategy) {
      return res.status(404).json({
        success: false,
        message: 'Estrategia no encontrada'
      });
    }
    
    res.json({
      success: true,
      message: 'Estrategia obtenida exitosamente',
      data: strategy
    });
  } catch (error) {
    console.error('Error getting strategy:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estrategia',
      error: error.message
    });
  }
});

// Ejecutar simulación
router.post('/simulate', async (req, res) => {
  try {
    const { strategyId, intensity, duration } = req.body;
    
    if (!strategyId) {
      return res.status(400).json({
        success: false,
        message: 'ID de estrategia es requerido'
      });
    }
    
    if (!intensity || intensity < 10 || intensity > 100) {
      return res.status(400).json({
        success: false,
        message: 'La intensidad debe estar entre 10% y 100%'
      });
    }
    
    const simulation = await simulationService.runSimulation(strategyId, intensity, duration);
    
    res.json({
      success: true,
      message: 'Simulación ejecutada exitosamente',
      data: simulation
    });
  } catch (error) {
    console.error('Error running simulation:', error);
    res.status(500).json({
      success: false,
      message: 'Error al ejecutar simulación',
      error: error.message
    });
  }
});

// Obtener datos de Santa Cruz para contexto
router.get('/santa-cruz-data', (req, res) => {
  try {
    const santaCruzData = simulationService.getSantaCruzData();
    res.json({
      success: true,
      message: 'Datos de Santa Cruz obtenidos exitosamente',
      data: santaCruzData
    });
  } catch (error) {
    console.error('Error getting Santa Cruz data:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos de Santa Cruz',
      error: error.message
    });
  }
});

// Obtener simulación por ID (para historial)
router.get('/:id', async (req, res) => {
  try {
    // Aquí podrías implementar la lógica para obtener una simulación específica de la base de datos
    res.json({
      success: true,
      message: 'Simulación obtenida exitosamente',
      data: {
        id: req.params.id,
        message: 'Funcionalidad de historial en desarrollo'
      }
    });
  } catch (error) {
    console.error('Error getting simulation:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener simulación',
      error: error.message
    });
  }
});

// Obtener historial de simulaciones del usuario
router.get('/user/:userId/history', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10, offset = 0 } = req.query;
    
    // Aquí implementarías la lógica para obtener el historial de la base de datos
    res.json({
      success: true,
      message: 'Historial de simulaciones obtenido exitosamente',
      data: {
        userId,
        simulations: [],
        total: 0,
        limit: parseInt(limit),
        offset: parseInt(offset),
        message: 'Funcionalidad de historial en desarrollo'
      }
    });
  } catch (error) {
    console.error('Error getting user simulation history:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener historial de simulaciones',
      error: error.message
    });
  }
});

// Guardar simulación
router.post('/save', async (req, res) => {
  try {
    const { userId, simulationData } = req.body;
    
    if (!userId || !simulationData) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y datos de simulación son requeridos'
      });
    }
    
    // Aquí implementarías la lógica para guardar en la base de datos
    const savedSimulation = {
      id: Date.now().toString(),
      userId,
      ...simulationData,
      savedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: 'Simulación guardada exitosamente',
      data: savedSimulation
    });
  } catch (error) {
    console.error('Error saving simulation:', error);
    res.status(500).json({
      success: false,
      message: 'Error al guardar simulación',
      error: error.message
    });
  }
});

// Comparar simulaciones
router.post('/compare', async (req, res) => {
  try {
    const { simulationIds } = req.body;
    
    if (!simulationIds || !Array.isArray(simulationIds) || simulationIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Se requieren al menos 2 IDs de simulación para comparar'
      });
    }
    
    // Aquí implementarías la lógica para comparar simulaciones
    res.json({
      success: true,
      message: 'Comparación de simulaciones completada',
      data: {
        simulations: simulationIds,
        comparison: {
          message: 'Funcionalidad de comparación en desarrollo'
        }
      }
    });
  } catch (error) {
    console.error('Error comparing simulations:', error);
    res.status(500).json({
      success: false,
      message: 'Error al comparar simulaciones',
      error: error.message
    });
  }
});

// Obtener estadísticas de simulaciones
router.get('/stats/overview', async (req, res) => {
  try {
    // Aquí implementarías la lógica para obtener estadísticas generales
    res.json({
      success: true,
      message: 'Estadísticas obtenidas exitosamente',
      data: {
        totalSimulations: 0,
        mostPopularStrategy: 'reforestation',
        averageIntensity: 65,
        totalImpact: {
          co2Reduction: 0,
          treesPlanted: 0,
          energyGenerated: 0
        },
        message: 'Estadísticas en desarrollo'
      }
    });
  } catch (error) {
    console.error('Error getting simulation stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
});

module.exports = router;