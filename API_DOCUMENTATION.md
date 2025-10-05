# 📡 API Documentation - GeoPlan

## 🌍 NASA APIs Integradas

### API Key
```
nx7g3SfAkjtcMBjS8oQFxUhSnL7gWkH2j2nBL5Ze
```

### Endpoints Disponibles

## 🗺️ **Maps API**

### `GET /api/maps`
Obtiene datos completos de mapas para una ubicación específica.

**Parámetros:**
- `lat` (opcional): Latitud (default: -17.7863)
- `lon` (opcional): Longitud (default: -63.1812)
- `date` (opcional): Fecha en formato YYYY-MM-DD

**Respuesta:**
```json
{
  "success": true,
  "message": "Datos de mapas obtenidos exitosamente",
  "data": {
    "location": {
      "name": "Santa Cruz, Bolivia",
      "coordinates": [-17.7863, -63.1812]
    },
    "date": "2024-01-15",
    "vegetation": { ... },
    "weather": { ... },
    "fires": { ... },
    "layers": [...]
  }
}
```

### `GET /api/maps/vegetation`
Obtiene datos específicos de vegetación.

### `GET /api/maps/temperature`
Obtiene datos de temperatura.

### `GET /api/maps/fires`
Obtiene datos de incendios activos.

### `GET /api/maps/satellite-images`
Obtiene imágenes satelitales.

## ⚠️ **Alerts API**

### `GET /api/alerts/current`
Obtiene alertas actuales basadas en datos reales de la NASA.

**Parámetros:**
- `lat` (opcional): Latitud
- `lon` (opcional): Longitud

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "level": "ALTO",
    "type": "ALERTA DE INCENDIOS",
    "description": "Se detectaron 3 incendios activos...",
    "temperature": 32,
    "humidity": 45,
    "firesDetected": 3,
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

### `GET /api/alerts/layers`
Obtiene capas de alertas disponibles.

### `GET /api/alerts/recommendations`
Obtiene recomendaciones basadas en el tipo de alerta.

### `GET /api/alerts/history`
Obtiene historial de alertas.

## 🛰️ **NASA API**

### `GET /api/nasa/earthdata`
Obtiene datos completos de la NASA para una ubicación.

**Parámetros:**
- `lat` (opcional): Latitud
- `lon` (opcional): Longitud
- `startDate` (opcional): Fecha de inicio
- `endDate` (opcional): Fecha de fin

### `GET /api/nasa/vegetation`
Obtiene datos de vegetación de NASA EarthData.

### `GET /api/nasa/weather`
Obtiene datos meteorológicos de NASA Power.

### `GET /api/nasa/fires`
Obtiene alertas de incendios de NASA FIRMS.

### `GET /api/nasa/satellite-images`
Obtiene imágenes satelitales de NASA Earth Imagery.

### `GET /api/nasa/asteroids`
Obtiene datos de asteroides (bonus).

## 🔧 **NASA Services Integrados**

### 1. **NASA EarthData**
- **URL**: `https://api.nasa.gov/planetary/earth/assets`
- **Uso**: Datos de vegetación y cobertura terrestre
- **Datos**: NDVI, cobertura vegetal, cambios en el uso del suelo

### 2. **NASA Power**
- **URL**: `https://power.larc.nasa.gov/api/temporal/daily/point`
- **Uso**: Datos meteorológicos diarios
- **Datos**: Temperatura, humedad, precipitación, radiación solar

### 3. **NASA FIRMS**
- **URL**: `https://firms.modaps.eosdis.nasa.gov/api/country/csv`
- **Uso**: Alertas de incendios forestales en tiempo real
- **Datos**: Ubicación de incendios, intensidad, fecha/hora

### 4. **NASA Earth Imagery**
- **URL**: `https://api.nasa.gov/planetary/earth/imagery`
- **Uso**: Imágenes satelitales de alta resolución
- **Datos**: Imágenes RGB, infrarrojas, multiespectrales

## 📊 **Ejemplos de Uso**

### Obtener alertas actuales para Santa Cruz:
```bash
curl "http://localhost:5000/api/alerts/current?lat=-17.7863&lon=-63.1812"
```

### Obtener datos de incendios de los últimos 7 días:
```bash
curl "http://localhost:5000/api/nasa/fires?lat=-17.7863&lon=-63.1812&startDate=2024-01-08&endDate=2024-01-15"
```

### Obtener datos meteorológicos:
```bash
curl "http://localhost:5000/api/nasa/weather?lat=-17.7863&lon=-63.1812&startDate=2024-01-01&endDate=2024-01-31"
```

### Obtener imagen satelital:
```bash
curl "http://localhost:5000/api/nasa/satellite-images?lat=-17.7863&lon=-63.1812&date=2024-01-15"
```

## 🚀 **Características**

- ✅ **Datos en tiempo real** de la NASA
- ✅ **Alertas automáticas** basadas en incendios y temperatura
- ✅ **Múltiples fuentes** de datos satelitales
- ✅ **Filtrado geográfico** por ubicación
- ✅ **Cache inteligente** para optimizar requests
- ✅ **Manejo de errores** robusto
- ✅ **Documentación completa** de APIs

## 🔑 **Límites de la API**

- **NASA API**: 1000 requests por hora
- **Rate limiting**: Implementado en el servidor
- **Cache**: 1 hora para datos meteorológicos, 6 horas para imágenes

## 🛠️ **Configuración**

Las APIs están configuradas para usar:
- **Coordenadas por defecto**: Santa Cruz, Bolivia (-17.7863, -63.1812)
- **Radio de búsqueda**: 50km para incendios
- **Período por defecto**: Últimos 7 días para alertas
- **Formato de fecha**: YYYY-MM-DD
