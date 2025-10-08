const express = require('express');
const router = express.Router();
const { testSupabaseConnection, getSupabaseClient } = require('../config/supabase');

// Probar conexión a la base de datos
router.get('/test-connection', async (req, res) => {
  try {
    console.log('🔍 Probando conexión a Supabase...');
    const result = await testSupabaseConnection();
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Conexión a Supabase exitosa',
        data: {
          connected: true,
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error de conexión a Supabase',
        error: result.error,
        data: {
          connected: false,
          timestamp: new Date().toISOString()
        }
      });
    }
  } catch (error) {
    console.error('❌ Error en test de conexión:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno al probar conexión',
      error: error.message,
      data: {
        connected: false,
        timestamp: new Date().toISOString()
      }
    });
  }
});

// Obtener información de la base de datos
router.get('/info', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    
    // Intentar obtener información básica
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(5);
    
    if (tablesError) {
      console.error('Error al obtener tablas:', tablesError);
    }
    
    res.json({
      success: true,
      message: 'Información de base de datos obtenida',
      data: {
        supabaseUrl: process.env.SUPABASE_URL ? 'Configurada' : 'No configurada',
        supabaseKey: process.env.SUPABASE_ANON_KEY ? 'Configurada' : 'No configurada',
        tables: tablesError ? 'Error al obtener tablas' : (tables || []).map(t => t.table_name),
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Error al obtener info de BD:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener información de base de datos',
      error: error.message
    });
  }
});

// Probar operación CRUD básica
router.post('/test-crud', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    
    // Intentar crear un usuario de prueba (si la tabla existe)
    const testUser = {
      name: 'Usuario Test',
      email: `test-${Date.now()}@example.com`,
      level: 'Principiante',
      points: 0
    };
    
    const { data, error } = await supabase
      .from('users')
      .insert([testUser])
      .select();
    
    if (error) {
      console.error('Error en test CRUD:', error);
      return res.status(500).json({
        success: false,
        message: 'Error en operación CRUD',
        error: error.message
      });
    }
    
    // Si se creó exitosamente, eliminarlo
    if (data && data[0]) {
      await supabase
        .from('users')
        .delete()
        .eq('id', data[0].id);
    }
    
    res.json({
      success: true,
      message: 'Operación CRUD exitosa',
      data: {
        test: 'CRUD funcionando correctamente',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Error en test CRUD:', error);
    res.status(500).json({
      success: false,
      message: 'Error en test CRUD',
      error: error.message
    });
  }
});

module.exports = router;
