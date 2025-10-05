# 🗄️ Configuración de Supabase para GeoPlan

## 📋 Pasos para configurar la base de datos

### 1. **Acceder a tu proyecto de Supabase**
- Ve a: https://supabase.com/dashboard/project/fxqzuwdacqzgwnupyczb
- Inicia sesión con tu cuenta

### 2. **Ejecutar el esquema de base de datos**
- Ve a **"SQL Editor"** en el panel lateral
- Haz clic en **"New query"**
- Copia y pega el contenido completo del archivo `database/schema.sql`
- Haz clic en **"Run"** para ejecutar el esquema

### 3. **Verificar que las tablas se crearon**
- Ve a **"Table Editor"** en el panel lateral
- Deberías ver las siguientes tablas:
  - ✅ `users`
  - ✅ `simulations`
  - ✅ `climate_alerts`
  - ✅ `community_projects`
  - ✅ `community_ideas`
  - ✅ `forum_posts`
  - ✅ `satellite_data`

### 4. **Configurar Row Level Security (RLS)**
- Ve a **"Authentication" > "Policies"**
- Verifica que las políticas de seguridad estén activas
- Las políticas ya están incluidas en el esquema SQL

### 5. **Probar la conexión**
- Ve a **"Settings" > "API"**
- Verifica que tu URL y API Key sean:
  - **URL**: `https://fxqzuwdacqzgwnupyczb.supabase.co`
  - **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cXp1d2RhY3F6Z3dudXB5Y3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDk4NTAsImV4cCI6MjA3NTE4NTg1MH0.BjcuP9qXr6YVxj2szuWRleCT-rtAQpIUjFZ_2-RfQio`

## 🧪 **Probar la API**

### Registro de usuario:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Test",
    "email": "test@ejemplo.com",
    "password": "123456"
  }'
```

### Inicio de sesión:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ejemplo.com",
    "password": "123456"
  }'
```

### Verificar token:
```bash
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

## 🔧 **Configuración adicional**

### Variables de entorno (opcional):
Crea un archivo `.env` en la carpeta `server/`:
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
SUPABASE_URL=https://fxqzuwdacqzgwnupyczb.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cXp1d2RhY3F6Z3dudXB5Y3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDk4NTAsImV4cCI6MjA3NTE4NTg1MH0.BjcuP9qXr6YVxj2szuWRleCT-rtAQpIUjFZ_2-RfQio
NASA_API_KEY=nx7g3SfAkjtcMBjS8oQFxUhSnL7gWkH2j2nBL5Ze
```

## ✅ **Verificación final**

Una vez configurado, deberías poder:
1. ✅ Registrar nuevos usuarios
2. ✅ Iniciar sesión
3. ✅ Crear simulaciones
4. ✅ Enviar ideas comunitarias
5. ✅ Crear posts en el foro
6. ✅ Obtener datos de la NASA
7. ✅ Recibir alertas climáticas

## 🚨 **Solución de problemas**

### Error de conexión:
- Verifica que la URL de Supabase sea correcta
- Asegúrate de que el proyecto esté activo

### Error de permisos:
- Verifica que RLS esté configurado correctamente
- Revisa las políticas de seguridad

### Error de esquema:
- Asegúrate de ejecutar todo el esquema SQL
- Verifica que no haya errores en la consola de Supabase

¡Tu base de datos Supabase estará lista para GeoPlan! 🚀
