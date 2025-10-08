const { createClient } = require('@supabase/supabase-js');

// Función para crear cliente de Supabase con manejo de errores
const createSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variables de entorno de Supabase no configuradas:');
    console.error('SUPABASE_URL:', supabaseUrl ? '✅ Configurada' : '❌ No configurada');
    console.error('SUPABASE_ANON_KEY:', supabaseKey ? '✅ Configurada' : '❌ No configurada');
    throw new Error('Variables de entorno de Supabase no configuradas correctamente');
  }
  
  console.log('✅ Conectando a Supabase:', supabaseUrl);
  
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: false
    }
  });
  
  return supabase;
};

// Función para crear cliente de servicio (admin)
const createSupabaseAdmin = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Variables de entorno de Supabase Admin no configuradas');
    throw new Error('Variables de entorno de Supabase Admin no configuradas');
  }
  
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  return supabaseAdmin;
};

// Función para probar la conexión
const testSupabaseConnection = async () => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error('❌ Error al conectar con Supabase:', error.message);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Conexión a Supabase exitosa');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error de conexión a Supabase:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  createSupabaseClient,
  createSupabaseAdmin,
  testSupabaseConnection
};
