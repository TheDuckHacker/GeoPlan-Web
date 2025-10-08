import axios from 'axios';

// Configuración base de axios para manejar diferentes entornos
const getBaseURL = () => {
  // En desarrollo, usar proxy configurado en package.json
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  // En producción, usar la URL completa de Vercel
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || '';
  }
  
  return '';
};

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
apiClient.interceptors.request.use(
  (config) => {
    // Agregar token si está disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
apiClient.interceptors.response.use(
  (response) => {
    // Log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', response.status, response.config.url);
    }
    
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    
    // Manejar errores específicos
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 500) {
      console.error('Error del servidor:', error.response.data);
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout de la petición');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
