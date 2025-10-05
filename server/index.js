const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting: habilitar solo en producción para evitar validaciones sobre proxy en desarrollo
if (process.env.NODE_ENV === 'production') {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // límite de 100 requests por IP
  });
  app.use(limiter);
} else {
  console.log('Rate limiter deshabilitado en entorno de desarrollo');
}

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/nasa', require('./routes/nasa'));
app.use('/api/maps', require('./routes/maps'));
app.use('/api/simulations', require('./routes/simulations'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/community', require('./routes/community'));
app.use('/api/rewards', require('./routes/rewards'));
app.use('/api/gamification', require('./routes/gamification'));

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'GeoPlan Ciudad Viva API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor GeoPlan ejecutándose en http://${HOST}:${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
