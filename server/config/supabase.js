const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://fxqzuwdacqzgwnupyczb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cXp1d2RhY3F6Z3dudXB5Y3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDk4NTAsImV4cCI6MjA3NTE4NTg1MH0.BjcuP9qXr6YVxj2szuWRleCT-rtAQpIUjFZ_2-RfQio';

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
