const express = require('express');
const router = express.Router();
const nasaService = require('../services/nasaService');

// Obtener datos de la NASA para una ubicación específica
router.get('/earthdata', async (req, res) => {
  try {
    const { lat, lon, startDate, endDate } = req.query;
    
    // Valores por defecto para Santa Cruz, Bolivia
    const defaultLat = lat || -17.7863;
    const defaultLon = lon || -63.1812;
    const defaultStartDate = startDate || '2024-01-01';
    const defaultEndDate = endDate || '2024-12-31';

    const earthData = await nasaService.getEarthData(
      defaultLat, 
      defaultLon, 
      defaultStartDate, 
      defaultEndDate
    );

    res.json({
      success: true,
      message: 'Datos de la NASA obtenidos exitosamente',
      data: earthData
    });
  } catch (error) {
    console.error('Error en endpoint earthdata:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos de la NASA',
      error: error.message
    });
  }
});

// Obtener imágenes EPIC de la NASA
router.get('/epic', async (req, res) => {
  try {
    const { date } = req.query;
    
    const epicData = await nasaService.getEPICImages(date);

    res.json({
      success: true,
      message: 'Imágenes EPIC obtenidas exitosamente',
      data: epicData
    });
  } catch (error) {
    console.error('Error en endpoint epic:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener imágenes EPIC',
      error: error.message
    });
  }
});

// Obtener datos reales de incendios 2018-2024
router.get('/fires-real', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const defaultStartDate = startDate || '2018-01-01';
    const defaultEndDate = endDate || '2024-12-31';

    const fireData = await nasaService.getRealFireData(defaultStartDate, defaultEndDate);

    res.json({
      success: true,
      message: 'Datos reales de incendios obtenidos exitosamente',
      data: fireData
    });
  } catch (error) {
    console.error('Error en endpoint fires-real:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos reales de incendios',
      error: error.message
    });
  }
});

// Obtener datos de vegetación
router.get('/vegetation', async (req, res) => {
  try {
    const { lat, lon, date } = req.query;
    
    const defaultLat = lat || -17.7863;
    const defaultLon = lon || -63.1812;
    const defaultDate = date || new Date().toISOString().split('T')[0];

    const vegetationData = await nasaService.getVegetationData(
      defaultLat, 
      defaultLon, 
      defaultDate, 
      defaultDate
    );

    res.json({
      success: true,
      message: 'Datos de vegetación obtenidos exitosamente',
      data: vegetationData
    });
  } catch (error) {
    console.error('Error en endpoint vegetation:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos de vegetación',
      error: error.message
    });
  }
});

// Obtener datos meteorológicos
router.get('/weather', async (req, res) => {
  try {
    const { lat, lon, startDate, endDate } = req.query;
    
    const defaultLat = lat || -17.7863;
    const defaultLon = lon || -63.1812;
    const defaultStartDate = startDate || '2024-01-01';
    const defaultEndDate = endDate || '2024-01-31';

    const weatherData = await nasaService.getPowerData(
      defaultLat, 
      defaultLon, 
      defaultStartDate, 
      defaultEndDate
    );

    res.json({
      success: true,
      message: 'Datos meteorológicos obtenidos exitosamente',
      data: weatherData
    });
  } catch (error) {
    console.error('Error en endpoint weather:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos meteorológicos',
      error: error.message
    });
  }
});

// Obtener alertas de incendios
router.get('/fires', async (req, res) => {
  try {
    const { lat, lon, startDate, endDate } = req.query;
    
    const defaultLat = lat || -17.7863;
    const defaultLon = lon || -63.1812;
    const defaultStartDate = startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const defaultEndDate = endDate || new Date().toISOString().split('T')[0];

    const fireData = await nasaService.getFireData(
      defaultLat, 
      defaultLon, 
      defaultStartDate, 
      defaultEndDate
    );

    res.json({
      success: true,
      message: 'Datos de incendios obtenidos exitosamente',
      data: fireData
    });
  } catch (error) {
    console.error('Error en endpoint fires:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos de incendios',
      error: error.message
    });
  }
});

// Obtener imágenes satelitales
router.get('/satellite-images', async (req, res) => {
  try {
    const { lat, lon, date } = req.query;
    
    const defaultLat = lat || -17.7863;
    const defaultLon = lon || -63.1812;
    const defaultDate = date || new Date().toISOString().split('T')[0];

    const imageData = await nasaService.getSatelliteImages(
      defaultLat, 
      defaultLon, 
      defaultDate
    );

    res.json({
      success: true,
      message: 'Imágenes satelitales obtenidas exitosamente',
      data: imageData
    });
  } catch (error) {
    console.error('Error en endpoint satellite-images:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener imágenes satelitales',
      error: error.message
    });
  }
});

// Obtener datos de asteroides (bonus)
router.get('/asteroids', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const defaultStartDate = startDate || new Date().toISOString().split('T')[0];
    const defaultEndDate = endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const asteroidData = await nasaService.getAsteroids(
      defaultStartDate, 
      defaultEndDate
    );

    res.json({
      success: true,
      message: 'Datos de asteroides obtenidos exitosamente',
      data: asteroidData
    });
  } catch (error) {
    console.error('Error en endpoint asteroids:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener datos de asteroides',
      error: error.message
    });
  }
});

module.exports = router;