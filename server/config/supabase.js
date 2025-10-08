const { createSupabaseClient, createSupabaseAdmin, testSupabaseConnection } = require('../lib/supabaseClient');

// --- Cliente Público (para el frontend o tareas no privilegiadas) ---
let supabase;
let supabaseAdmin;

try {
  supabase = createSupabaseClient();
  supabaseAdmin = createSupabaseAdmin();
  console.log('✅ Clientes de Supabase inicializados correctamente');
} catch (error) {
  console.error('❌ Error al inicializar clientes de Supabase:', error.message);
  // Crear clientes dummy para evitar crashes
  supabase = null;
  supabaseAdmin = null;
}

// Función para obtener el cliente público
const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error('Cliente de Supabase no inicializado. Verifica las variables de entorno.');
  }
  return supabase;
};

// Función para obtener el cliente admin
const getSupabaseAdmin = () => {
  if (!supabaseAdmin) {
    throw new Error('Cliente admin de Supabase no inicializado. Verifica las variables de entorno.');
  }
  return supabaseAdmin;
};

// Exportamos los clientes y funciones
module.exports = { 
  supabase, 
  supabaseAdmin,
  getSupabaseClient,
  getSupabaseAdmin,
  testSupabaseConnection
};