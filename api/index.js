// Archivo principal para las rutas de API en Vercel
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware de seguridad
app.use(helmet());

// Configuración de CORS más permisiva para Vercel
app.use(cors({
  origin: true, // Permitir todos los orígenes en Vercel
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with']
}));

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Log de variables de entorno para debugging
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'NOT SET',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
      NASA_API_KEY: process.env.NASA_API_KEY ? 'SET' : 'NOT SET',
      JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET'
    });
  }
  next();
});

// Rutas
app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/nasa', require('../server/routes/nasa'));
app.use('/api/maps', require('../server/routes/maps'));
app.use('/api/simulations', require('../server/routes/simulations'));
app.use('/api/alerts', require('../server/routes/alerts'));
app.use('/api/community', require('../server/routes/community'));
app.use('/api/rewards', require('../server/routes/rewards'));
app.use('/api/gamification', require('../server/routes/gamification'));
app.use('/api/database', require('../server/routes/database'));

// Ruta de salud mejorada
app.get('/api/health', (req, res) => {
  const healthCheck = {
    status: 'OK',
    message: 'GeoPlan Ciudad Viva API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    variables: {
      supabase: !!process.env.SUPABASE_URL,
      nasa: !!process.env.NASA_API_KEY,
      jwt: !!process.env.JWT_SECRET
    }
  };
  res.json(healthCheck);
});

// Ruta de test para variables de entorno
app.get('/api/test-env', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_URL: process.env.SUPABASE_URL ? 'CONFIGURADA' : 'NO CONFIGURADA',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'CONFIGURADA' : 'NO CONFIGURADA',
    NASA_API_KEY: process.env.NASA_API_KEY ? 'CONFIGURADA' : 'NO CONFIGURADA',
    JWT_SECRET: process.env.JWT_SECRET ? 'CONFIGURADA' : 'NO CONFIGURADA',
    VERCEL_URL: process.env.VERCEL_URL || 'NO DISPONIBLE'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
  });
});

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Exportar la app para Vercel
module.exports = app;
