// Configuración de entorno para el cliente
const getApiBaseUrl = () => {
  // En desarrollo, usar proxy configurado en package.json
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  // En producción, usar la URL de la aplicación
  if (process.env.NODE_ENV === 'production') {
    // Si tenemos una URL específica configurada, usarla
    if (process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    }
    
    // Si no, usar la URL actual (Vercel)
    return window.location.origin;
  }
  
  return '';
};

const config = {
  API_BASE_URL: getApiBaseUrl(),
  NODE_ENV: process.env.NODE_ENV,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development'
};

// Log de configuración en desarrollo
if (config.IS_DEVELOPMENT) {
  console.log('Configuración del cliente:', config);
}

export default config;
