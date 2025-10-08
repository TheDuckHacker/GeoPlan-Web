const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

// --- Cliente Público (para el frontend o tareas no privilegiadas) ---
const supabaseUrl = config.SUPABASE_URL;
const supabaseAnonKey = config.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL o ANON KEY públicos no configurados en config.js');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);


// --- Cliente de Servicio (para el backend con privilegios de administrador) ---
const supabaseServiceRoleKey = config.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Exportamos ambos clientes
module.exports = { supabase, supabaseAdmin };