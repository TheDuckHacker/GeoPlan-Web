import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Map, 
  BarChart3, 
  AlertTriangle, 
  Users, 
  Satellite, 
  Leaf,
  ArrowRight,
  Play
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Map,
      title: 'Visualización de Datos',
      description: 'Explora mapas interactivos con datos satelitales de la NASA para Santa Cruz',
      color: 'text-blue-500'
    },
    {
      icon: BarChart3,
      title: 'Simulador de Estrategias',
      description: 'Simula el impacto de estrategias urbanas sostenibles en tiempo real',
      color: 'text-green-500'
    },
    {
      icon: AlertTriangle,
      title: 'Alertas Climáticas',
      description: 'Recibe alertas en tiempo real sobre condiciones climáticas extremas',
      color: 'text-orange-500'
    },
    {
      icon: Users,
      title: 'Participación Ciudadana',
      description: 'Participa en la planificación urbana y vota por proyectos comunitarios',
      color: 'text-purple-500'
    }
  ];

  const stats = [
    { label: 'Datos Satelitales', value: '2018-2024', icon: Satellite },
    { label: 'Estrategias Disponibles', value: '4+', icon: Leaf },
    { label: 'Usuarios Activos', value: '1,200+', icon: Users },
    { label: 'Proyectos Comunitarios', value: '42', icon: Map }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background-light to-background-light dark:from-primary/20 dark:via-background-dark dark:to-background-dark">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" 
             style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVXzr8Nb2aUB5XFEBxXDmKrT4Oh2_MXI0g8rrrmehkAqf1B7jBMT5SUIF20MXfuWJQfJzq4MC2K7XPATyg7-weGuT6VDRJQvHc6MrsIREzPQuQlSLHTup1boD7gyw7fUAocaRuuVBHFCZ1aNhyTsHNJ72Be8oc0AozlEnsWT8WSWSzc9clzD2MfjJL3njHp5S4ibESXE4YT--ItcWy2t-bnCjSulSwIIeRnvu94lYYAPKSvZ8ayrkZ7CXzyQ4B-YSsjsehqQH4ZRg')" }}>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              GeoPlan{' '}
              <span className="text-gradient">Ciudad Viva</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Explora la dinámica urbana de Santa Cruz con datos satelitales de la NASA. 
              Visualiza el crecimiento, analiza tendencias y planifica un futuro sostenible.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-3 flex items-center justify-center">
                  <Map className="w-5 h-5 mr-2" />
                  Ir al Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary text-lg px-8 py-3 flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Comenzar
                  </Link>
                  <Link to="/about" className="btn-secondary text-lg px-8 py-3 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Conocer más
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Características Principales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Herramientas digitales para transformar la relación entre ciudadanía y territorio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-12 h-12 ${feature.color} mb-4`}>
                    <Icon className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Datos en Tiempo Real
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Información actualizada constantemente desde fuentes confiables
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para Explorar Santa Cruz?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a la comunidad y participa en la construcción de una ciudad más sostenible
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg">
                Registrarse Gratis
              </Link>
              <Link to="/login" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors text-lg">
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
