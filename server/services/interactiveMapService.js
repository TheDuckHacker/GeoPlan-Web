const axios = require('axios');

class InteractiveMapService {
  constructor() {
    this.nasaApiKey = 'nx7g3SfAkjtcMBjS8oQFxUhSnL7gWkH2j2nBL5Ze';
    this.santaCruzCoords = {
      lat: -17.7863,
      lon: -63.1812
    };
  }

  // Obtener datos de incendios para el mapa
  async getFireMapData() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      // NASA FIRMS API para incendios
      const response = await axios.get('https://firms.modaps.eosdis.nasa.gov/api/country/csv', {
        params: {
          country: 'BOL', // Bolivia
          source: 'MODIS_NRT',
          start_date: yesterdayStr,
          end_date: today,
          api_key: this.nasaApiKey
        },
        timeout: 10000
      });

      if (response.data) {
        const lines = response.data.trim().split('\n');
        const headers = lines[0].split(',');
        const fireData = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim() || '';
            return obj;
          }, {});
        });

        // Filtrar por proximidad a Santa Cruz (200km)
        const santaCruzFires = fireData.filter(fire => {
          if (!fire.latitude || !fire.longitude) return false;
          const distance = this.calculateDistance(
            this.santaCruzCoords.lat, this.santaCruzCoords.lon,
            parseFloat(fire.latitude), parseFloat(fire.longitude)
          );
          return distance <= 200;
        });

        return {
          success: true,
          data: {
            fires: santaCruzFires.map(fire => ({
              id: fire.latitude + '_' + fire.longitude,
              lat: parseFloat(fire.latitude),
              lon: parseFloat(fire.longitude),
              confidence: fire.confidence || 'unknown',
              frp: parseFloat(fire.frp) || 0,
              brightness: parseFloat(fire.brightness) || 0,
              scan: parseFloat(fire.scan) || 0,
              track: parseFloat(fire.track) || 0,
              acq_date: fire.acq_date,
              acq_time: fire.acq_time,
              satellite: fire.satellite || 'unknown',
              riskLevel: this.calculateFireRisk(parseFloat(fire.frp) || 0)
            })),
            totalFires: santaCruzFires.length,
            highRiskFires: santaCruzFires.filter(f => parseFloat(f.frp) > 50).length,
            lastUpdated: new Date().toISOString()
          }
        };
      } else {
        throw new Error('No data received from NASA FIRMS');
      }
    } catch (error) {
      console.error('Error fetching fire map data:', error);
      
      // Datos simulados para desarrollo
      return this.getSimulatedFireData();
    }
  }

  // Obtener datos de calidad del aire
  async getAirQualityData() {
    try {
      // Para datos reales de calidad del aire, necesitarías una API específica
      // Por ahora, generaremos datos basados en patrones de Santa Cruz
      const airQualityStations = [
        { name: 'Centro', lat: -17.7863, lon: -63.1812, aqi: 65 + Math.random() * 20 },
        { name: 'Norte', lat: -17.7500, lon: -63.1500, aqi: 70 + Math.random() * 15 },
        { name: 'Sur', lat: -17.8200, lon: -63.2000, aqi: 60 + Math.random() * 25 },
        { name: 'Este', lat: -17.7800, lon: -63.1200, aqi: 55 + Math.random() * 30 },
        { name: 'Oeste', lat: -17.7900, lon: -63.2500, aqi: 75 + Math.random() * 10 }
      ];

      return {
        success: true,
        data: {
          stations: airQualityStations.map(station => ({
            ...station,
            pm25: station.aqi * 0.8,
            pm10: station.aqi * 1.2,
            o3: station.aqi * 0.6,
            no2: station.aqi * 0.4,
            so2: station.aqi * 0.3,
            co: station.aqi * 0.1,
            level: this.getAirQualityLevel(station.aqi),
            lastUpdated: new Date().toISOString()
          })),
          averageAQI: airQualityStations.reduce((sum, s) => sum + s.aqi, 0) / airQualityStations.length,
          lastUpdated: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      return { success: false, error: error.message };
    }
  }

  // Obtener datos de temperatura superficial
  async getSurfaceTemperatureData() {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const startDate = yesterday.toISOString().split('T')[0];
      const endDate = today.toISOString().split('T')[0];

      // NASA Power API para temperatura superficial
      const response = await axios.get('https://power.larc.nasa.gov/api/temporal/daily/point', {
        params: {
          parameters: 'T2M_MAX,T2M_MIN,T2M',
          community: 'RE',
          longitude: this.santaCruzCoords.lon,
          latitude: this.santaCruzCoords.lat,
          start: startDate,
          end: endDate,
          format: 'JSON'
        },
        timeout: 10000
      });

      if (response.data && response.data.properties && response.data.properties.parameter) {
        const params = response.data.properties.parameter;
        const firstDate = Object.keys(params.T2M || {})[0];
        
        const temperatureData = {
          max: params.T2M_MAX ? params.T2M_MAX[firstDate] : null,
          min: params.T2M_MIN ? params.T2M_MIN[firstDate] : null,
          avg: params.T2M ? params.T2M[firstDate] : null,
          date: firstDate
        };

        // Generar mapa de calor basado en la temperatura
        const heatMapData = this.generateHeatMapData(temperatureData.avg || 25);

        return {
          success: true,
          data: {
            temperature: temperatureData,
            heatMap: heatMapData,
            lastUpdated: new Date().toISOString()
          }
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching surface temperature data:', error);
      
      // Datos simulados
      const avgTemp = 25 + Math.random() * 10;
      return {
        success: true,
        data: {
          temperature: {
            max: avgTemp + 5,
            min: avgTemp - 5,
            avg: avgTemp,
            date: new Date().toISOString().split('T')[0]
          },
          heatMap: this.generateHeatMapData(avgTemp),
          lastUpdated: new Date().toISOString(),
          source: 'Simulated data'
        }
      };
    }
  }

  // Obtener datos de vegetación (NDVI)
  async getVegetationData() {
    try {
      // Para datos reales de NDVI, necesitarías acceso a datos satelitales específicos
      // Por ahora, generaremos datos basados en patrones conocidos de Santa Cruz
      const vegetationZones = [
        { name: 'Parque Urbano', lat: -17.7863, lon: -63.1812, ndvi: 0.7 + Math.random() * 0.2 },
        { name: 'Zona Norte', lat: -17.7500, lon: -63.1500, ndvi: 0.5 + Math.random() * 0.3 },
        { name: 'Zona Sur', lat: -17.8200, lon: -63.2000, ndvi: 0.6 + Math.random() * 0.2 },
        { name: 'Zona Este', lat: -17.7800, lon: -63.1200, ndvi: 0.4 + Math.random() * 0.4 },
        { name: 'Zona Oeste', lat: -17.7900, lon: -63.2500, ndvi: 0.3 + Math.random() * 0.3 }
      ];

      return {
        success: true,
        data: {
          zones: vegetationZones.map(zone => ({
            ...zone,
            vegetationLevel: this.getVegetationLevel(zone.ndvi),
            healthStatus: this.getVegetationHealth(zone.ndvi),
            lastUpdated: new Date().toISOString()
          })),
          averageNDVI: vegetationZones.reduce((sum, z) => sum + z.ndvi, 0) / vegetationZones.length,
          lastUpdated: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error fetching vegetation data:', error);
      return { success: false, error: error.message };
    }
  }

  // Calcular distancia entre dos puntos
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Calcular nivel de riesgo de incendio
  calculateFireRisk(frp) {
    if (frp > 100) return 'CRÍTICO';
    if (frp > 50) return 'ALTO';
    if (frp > 20) return 'MEDIO';
    return 'BAJO';
  }

  // Obtener nivel de calidad del aire
  getAirQualityLevel(aqi) {
    if (aqi <= 50) return 'BUENO';
    if (aqi <= 100) return 'MODERADO';
    if (aqi <= 150) return 'INSALUBRE PARA GRUPOS SENSIBLES';
    if (aqi <= 200) return 'INSALUBRE';
    if (aqi <= 300) return 'MUY INSALUBRE';
    return 'PELIGROSO';
  }

  // Generar datos de mapa de calor
  generateHeatMapData(baseTemp) {
    const points = [];
    const centerLat = this.santaCruzCoords.lat;
    const centerLon = this.santaCruzCoords.lon;
    
    // Generar puntos alrededor de Santa Cruz
    for (let i = 0; i < 50; i++) {
      const lat = centerLat + (Math.random() - 0.5) * 0.1;
      const lon = centerLon + (Math.random() - 0.5) * 0.1;
      const temp = baseTemp + (Math.random() - 0.5) * 10;
      
      points.push({
        lat,
        lon,
        temperature: temp,
        intensity: Math.max(0, Math.min(1, (temp - 15) / 25)) // Normalizar entre 0 y 1
      });
    }
    
    return points;
  }

  // Obtener nivel de vegetación
  getVegetationLevel(ndvi) {
    if (ndvi > 0.7) return 'MUY ALTA';
    if (ndvi > 0.5) return 'ALTA';
    if (ndvi > 0.3) return 'MEDIA';
    if (ndvi > 0.1) return 'BAJA';
    return 'MUY BAJA';
  }

  // Obtener estado de salud de la vegetación
  getVegetationHealth(ndvi) {
    if (ndvi > 0.6) return 'EXCELENTE';
    if (ndvi > 0.4) return 'BUENO';
    if (ndvi > 0.2) return 'REGULAR';
    return 'POBRE';
  }

  // Datos simulados de incendios
  getSimulatedFireData() {
    const fires = [];
    const centerLat = this.santaCruzCoords.lat;
    const centerLon = this.santaCruzCoords.lon;
    
    // Generar algunos incendios simulados
    for (let i = 0; i < 5 + Math.floor(Math.random() * 10); i++) {
      const lat = centerLat + (Math.random() - 0.5) * 0.2;
      const lon = centerLon + (Math.random() - 0.5) * 0.2;
      const frp = Math.random() * 100;
      
      fires.push({
        id: `sim_${i}`,
        lat,
        lon,
        confidence: Math.random() > 0.5 ? 'high' : 'medium',
        frp,
        brightness: frp * (300 + Math.random() * 200),
        scan: Math.random() * 2,
        track: Math.random() * 2,
        acq_date: new Date().toISOString().split('T')[0],
        acq_time: Math.floor(Math.random() * 24 * 60),
        satellite: 'MODIS',
        riskLevel: this.calculateFireRisk(frp)
      });
    }

    return {
      success: true,
      data: {
        fires,
        totalFires: fires.length,
        highRiskFires: fires.filter(f => f.frp > 50).length,
        lastUpdated: new Date().toISOString(),
        source: 'Simulated data based on Santa Cruz patterns'
      }
    };
  }

  // Obtener todos los datos del mapa
  async getAllMapData() {
    try {
      const [fireData, airQualityData, temperatureData, vegetationData] = await Promise.allSettled([
        this.getFireMapData(),
        this.getAirQualityData(),
        this.getSurfaceTemperatureData(),
        this.getVegetationData()
      ]);

      return {
        success: true,
        data: {
          fires: fireData.status === 'fulfilled' ? fireData.value : null,
          airQuality: airQualityData.status === 'fulfilled' ? airQualityData.value : null,
          temperature: temperatureData.status === 'fulfilled' ? temperatureData.value : null,
          vegetation: vegetationData.status === 'fulfilled' ? vegetationData.value : null,
          lastUpdated: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error fetching all map data:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new InteractiveMapService();
