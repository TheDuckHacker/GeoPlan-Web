const express = require('express');
const router = express.Router();
const interactiveMapService = require('../services/interactiveMapService');

// Obtener todos los datos del mapa interactivo
router.get('/all', async (req, res) => {
  try {
    const mapData = await interactiveMapService.getAllMapData();
    
    res.json({
      success: true,
      message: 'Datos del mapa interactivo obtenidos exitosamente',
      data: mapData.data
    });
  } catch (error) {
    console.error('Error en endpoint /all:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos del mapa interactivo',
      error: error.message
    });
  }
});

// Obtener datos de incendios para el mapa
router.get('/fires', async (req, res) => {
  try {
    const fireData = await interactiveMapService.getFireMapData();
    
    res.json({
      success: true,
      message: 'Datos de incendios obtenidos exitosamente',
      data: fireData.data
    });
  } catch (error) {
    console.error('Error en endpoint /fires:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos de incendios',
      error: error.message
    });
  }
});

// Obtener datos de calidad del aire
router.get('/air-quality', async (req, res) => {
  try {
    const airQualityData = await interactiveMapService.getAirQualityData();
    
    res.json({
      success: true,
      message: 'Datos de calidad del aire obtenidos exitosamente',
      data: airQualityData.data
    });
  } catch (error) {
    console.error('Error en endpoint /air-quality:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos de calidad del aire',
      error: error.message
    });
  }
});

// Obtener datos de temperatura superficial
router.get('/temperature', async (req, res) => {
  try {
    const temperatureData = await interactiveMapService.getSurfaceTemperatureData();
    
    res.json({
      success: true,
      message: 'Datos de temperatura superficial obtenidos exitosamente',
      data: temperatureData.data
    });
  } catch (error) {
    console.error('Error en endpoint /temperature:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos de temperatura superficial',
      error: error.message
    });
  }
});

// Obtener datos de vegetación
router.get('/vegetation', async (req, res) => {
  try {
    const vegetationData = await interactiveMapService.getVegetationData();
    
    res.json({
      success: true,
      message: 'Datos de vegetación obtenidos exitosamente',
      data: vegetationData.data
    });
  } catch (error) {
    console.error('Error en endpoint /vegetation:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos de vegetación',
      error: error.message
    });
  }
});

// Obtener estadísticas del mapa
router.get('/stats', async (req, res) => {
  try {
    const mapData = await interactiveMapService.getAllMapData();
    
    if (!mapData.success) {
      throw new Error('Error al obtener datos del mapa');
    }

    const stats = {
      fires: {
        total: mapData.data.fires?.data?.totalFires || 0,
        highRisk: mapData.data.fires?.data?.highRiskFires || 0,
        lastUpdated: mapData.data.fires?.data?.lastUpdated
      },
      airQuality: {
        averageAQI: mapData.data.airQuality?.data?.averageAQI || 0,
        stations: mapData.data.airQuality?.data?.stations?.length || 0,
        lastUpdated: mapData.data.airQuality?.data?.lastUpdated
      },
      temperature: {
        current: mapData.data.temperature?.data?.temperature?.avg || 0,
        max: mapData.data.temperature?.data?.temperature?.max || 0,
        min: mapData.data.temperature?.data?.temperature?.min || 0,
        lastUpdated: mapData.data.temperature?.data?.lastUpdated
      },
      vegetation: {
        averageNDVI: mapData.data.vegetation?.data?.averageNDVI || 0,
        zones: mapData.data.vegetation?.data?.zones?.length || 0,
        lastUpdated: mapData.data.vegetation?.data?.lastUpdated
      },
      lastUpdated: mapData.data.lastUpdated
    };

    res.json({
      success: true,
      message: 'Estadísticas del mapa obtenidas exitosamente',
      data: stats
    });
  } catch (error) {
    console.error('Error en endpoint /stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas del mapa',
      error: error.message
    });
  }
});

module.exports = router;