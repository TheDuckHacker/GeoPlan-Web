const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

// Leer desde variables de entorno si están disponibles, sino usar config por defecto
const supabaseUrl = process.env.SUPABASE_URL || config.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || config.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	console.warn('Supabase URL o ANON KEY no configurados. Revisa tus variables de entorno.');
}

// Crear cliente de Supabase (anon/public key)
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
