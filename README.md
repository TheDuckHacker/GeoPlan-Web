# GeoPlan

Una aplicación web educativa, participativa y gamificada que busca transformar la relación entre ciudadanía y territorio mediante tecnología, datos satelitales y conciencia ambiental.

## 🎯 Propósito

Diseñar herramientas digitales que permitan:
- Simular estrategias urbanas sostenibles (reforestación, transporte limpio, energía renovable)
- Visualizar el impacto ambiental en tiempo real usando datos satelitales
- Fomentar la participación ciudadana en la construcción de ciudades más verdes y habitables

## 🚀 Características Principales

### 🌱 Simulador de Estrategias
- Simula el impacto de diferentes estrategias urbanas sostenibles
- Visualiza métricas como reducción de CO2, áreas verdes y calidad del aire
- Interfaz intuitiva con controles deslizantes para ajustar intensidad

### 🗺️ Mapas Interactivos
- Visualiza datos ambientales y urbanos en tiempo real
- Integración con datos satelitales de la NASA
- Capas de información sobre calidad del aire, temperatura y vegetación

### ⚠️ Sistema de Alertas Climáticas
- Alertas en tiempo real sobre condiciones climáticas extremas
- Recomendaciones personalizadas para proteger la salud
- Múltiples capas de alertas (calor extremo, riesgo de inundación, contaminación)

### 👥 Participación Ciudadana
- Foro comunitario para compartir ideas y experiencias
- Sistema de votación para proyectos urbanos
- Seguimiento del progreso de iniciativas comunitarias

### 🎓 Educación Ambiental
- Contenido educativo sobre sostenibilidad urbana
- Gamificación para incentivar la participación
- Sistema de puntos y niveles para usuarios activos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **React Router DOM** - Enrutamiento del lado del cliente
- **Tailwind CSS** - Framework de CSS utilitario
- **Axios** - Cliente HTTP para peticiones API
- **Context API** - Gestión de estado global

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **CORS** - Middleware para manejo de CORS
- **dotenv** - Gestión de variables de entorno

### Herramientas de Desarrollo
- **Concurrently** - Ejecución simultánea de scripts
- **Nodemon** - Reinicio automático del servidor en desarrollo

## 📁 Estructura del Proyecto

```
GeoPlan-Web/
├── client/                 # Aplicación React
│   ├── public/            # Archivos públicos
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   │   └── Layout/    # Componentes de layout
│   │   ├── contexts/      # Contextos de React
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── App.js         # Componente principal
│   │   └── index.js       # Punto de entrada
│   ├── package.json       # Dependencias del cliente
│   └── tailwind.config.js # Configuración de Tailwind
├── server/                # Servidor Node.js
│   ├── routes/           # Rutas de la API
│   ├── index.js          # Servidor principal
│   └── package.json      # Dependencias del servidor
├── package.json          # Configuración del workspace
└── README.md            # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd GeoPlan-Web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Supabase**
   - Ve a tu proyecto: https://supabase.com/dashboard/project/fxqzuwdacqzgwnupyczb
   - Ejecuta el esquema SQL desde `database/schema.sql`
   - Sigue las instrucciones en `setup-supabase.md`

4. **Configurar variables de entorno (opcional)**
   ```bash
   cp server/config.example.js server/config.js
   ```
   
   Las credenciales ya están configuradas en `server/config.js`:
   - ✅ NASA API Key configurada
   - ✅ Supabase URL y API Key configurados

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   Esto iniciará:
   - Servidor backend en `http://localhost:5000`
   - Aplicación frontend en `http://localhost:3000`

### Scripts Disponibles

- `npm run dev` - Ejecuta cliente y servidor en modo desarrollo
- `npm run client` - Ejecuta solo el cliente React
- `npm run server` - Ejecuta solo el servidor Node.js
- `npm start` - Ejecuta el servidor en modo producción

## 🌐 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/logout` - Cerrar sesión

### Simulaciones
- `GET /api/simulations/strategies` - Obtener estrategias disponibles
- `POST /api/simulations/simulate` - Ejecutar simulación

### Alertas
- `GET /api/alerts/current` - Obtener alerta actual
- `GET /api/alerts/layers` - Obtener capas de alertas
- `GET /api/alerts/recommendations` - Obtener recomendaciones

### Comunidad
- `GET /api/community/forum` - Obtener posts del foro
- `GET /api/community/projects` - Obtener proyectos comunitarios
- `GET /api/community/initiatives` - Obtener iniciativas
- `POST /api/community/ideas` - Enviar nueva idea

### Mapas
- `GET /api/maps` - Obtener datos de mapas

### NASA
- `GET /api/nasa/earthdata` - Obtener datos de NASA EarthData

## 🎨 Diseño y UX

La aplicación utiliza un diseño moderno y responsivo con:
- **Modo oscuro/claro** - Tema adaptable según preferencias del usuario
- **Diseño responsivo** - Optimizado para dispositivos móviles y desktop
- **Iconografía consistente** - Uso de Material Symbols y Lucide React
- **Paleta de colores** - Colores que reflejan la naturaleza y sostenibilidad

## 🔧 Configuración de Tailwind CSS

El proyecto utiliza Tailwind CSS con configuración personalizada:

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#11a4d4',
        'background-light': '#ffffff',
        'background-dark': '#0f172a',
        'foreground-light': '#1e293b',
        'foreground-dark': '#f1f5f9',
        'muted-light': '#64748b',
        'muted-dark': '#94a3b8',
        'subtle-light': '#e2e8f0',
        'subtle-dark': '#334155'
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  }
}
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas o sugerencias sobre el proyecto, por favor contacta al equipo de desarrollo.

---

**GeoPlan Ciudad Viva** - Transformando ciudades a través de la participación ciudadana y la tecnología sostenible.
