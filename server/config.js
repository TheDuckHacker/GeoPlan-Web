module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  
  // Supabase
  SUPABASE_URL: 'https://fxqzuwdacqzgwnupyczb.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cXp1d2RhY3F6Z3dudXB5Y3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDk4NTAsImV4cCI6MjA3NTE4NTg1MH0.BjcuP9qXr6YVxj2szuWRleCT-rtAQpIUjFZ_2-RfQio',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || 'tu_supabase_service_role_key_aqui',
  
  // JWT Secret
  JWT_SECRET: process.env.JWT_SECRET || 'tu_jwt_secret_super_seguro_aqui',
  
  // NASA API
  NASA_API_KEY: 'nx7g3SfAkjtcMBjS8oQFxUhSnL7gWkH2j2nBL5Ze',
  
  // OpenWeatherMap API (para datos climáticos)
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || 'tu_openweather_api_key_aqui',
  
  // Configuración de archivos
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 10485760,
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads'
};
