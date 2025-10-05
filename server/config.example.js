module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  
  // Supabase
  SUPABASE_URL: process.env.SUPABASE_URL || 'tu_supabase_url_aqui',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'tu_supabase_anon_key_aqui',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || 'tu_supabase_service_role_key_aqui',
  
  // JWT Secret
  JWT_SECRET: process.env.JWT_SECRET || 'tu_jwt_secret_super_seguro_aqui',
  
  // NASA API
  NASA_API_KEY: process.env.NASA_API_KEY || 'tu_nasa_api_key_aqui',
  
  // OpenWeatherMap API (para datos climáticos)
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || 'tu_openweather_api_key_aqui',
  
  // Configuración de archivos
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 10485760,
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads'
};
