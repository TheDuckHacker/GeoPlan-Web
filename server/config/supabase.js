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
// ¡¡¡ADVERTENCIA: Clave secreta hardcodeada solo para PRUEBAS!!!
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cXp1d2RhY3F6Z3dudXB5Y3piIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYwOTg1MCwiZXhwIjoyMDc1MTg1ODUwfQ.2i3_1CfgJXZeExWft8onOpJm4fxQu-x9pR4mXQ4jW9c';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Exportamos ambos clientes
module.exports = { supabase, supabaseAdmin };