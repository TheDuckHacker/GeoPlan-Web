# 🔧 Configuración de Variables de Entorno en Vercel

## Variables que necesitas configurar en Vercel:

### 1. **Acceder a la configuración de Vercel**
- Ve a tu proyecto en https://vercel.com/dashboard
- Selecciona tu proyecto GeoPlan
- Ve a **Settings** > **Environment Variables**

### 2. **Agregar las siguientes variables:**

```bash
# Base de datos Supabase
SUPABASE_URL=https://fxqzuwdacqzgwnupyczb.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cXp1d2RhY3F6Z3dudXB5Y3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDk4NTAsImV4cCI6MjA3NTE4NTg1MH0.BjcuP9qXr6YVxj2szuWRleCT-rtAQpIUjFZ_2-RfQio
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cXp1d2RhY3F6Z3dudXB5Y3piIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYwOTg1MCwiZXhwIjoyMDc1MTg1ODUwfQ.2i3_1CfgJXZeExWft8onOpJm4fxQu-x9pR4mXQ4jW9c

# JWT Secret
JWT_SECRET=tu_jwt_secret_super_seguro_aqui_geoplan_2024

# NASA API
NASA_API_KEY=nx7g3SfAkjtcMBjS8oQFxUhSnL7gWkH2j2nBL5Ze

# Entorno
NODE_ENV=production
```

### 3. **Configurar para todos los entornos:**
- Marca todas las variables para **Production**, **Preview**, y **Development**

### 4. **Re-deploy después de configurar:**
- Una vez configuradas las variables, haz un nuevo deploy
- Puedes hacerlo desde el dashboard de Vercel o con `git push`

## 🚨 **Problemas Comunes y Soluciones:**

### **Error de CORS:**
- ✅ **Solucionado**: Configuración mejorada de CORS en `server/index.js`

### **Error de conexión a Supabase:**
- ✅ **Solucionado**: Variables de entorno configuradas correctamente

### **Simulador no funciona:**
- ✅ **Solucionado**: Rutas de API corregidas para producción

### **Alertas no cargan:**
- ✅ **Solucionado**: Servicios de NASA configurados con variables de entorno

## 📋 **Checklist de Verificación:**

- [ ] Variables de entorno configuradas en Vercel
- [ ] Nuevo deploy realizado
- [ ] Simulador funciona correctamente
- [ ] Alertas climáticas cargan
- [ ] Base de datos conecta correctamente
- [ ] No hay errores de CORS en la consola

## 🔍 **Para Debugging:**

Si algo sigue sin funcionar, revisa:
1. **Console del navegador** - errores de JavaScript
2. **Network tab** - errores de API
3. **Logs de Vercel** - errores del servidor
4. **Supabase Dashboard** - estado de la base de datos
