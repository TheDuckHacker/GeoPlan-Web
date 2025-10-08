import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Gamepad2, User, Lock, ArrowRight } from 'lucide-react';

const AuthRequired = ({ feature = "esta función" }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return null; // Si está autenticado, no mostrar nada
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background-light to-background-light dark:from-primary/20 dark:via-background-dark dark:to-background-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Acceso Restringido
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Necesitas tener una cuenta para acceder a {feature}. 
            Crea tu cuenta gratis y únete a la comunidad de GeoPlan.
          </p>

          {/* Benefits */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              ¿Por qué crear una cuenta?
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Acceso completo a todas las funciones
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Guarda tus simulaciones y progreso
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Participa en la comunidad
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Gana puntos y recompensas
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              to="/register"
              className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
            >
              <User className="w-5 h-5" />
              <span>Crear cuenta gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              to="/login"
              className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Ya tengo cuenta</span>
            </Link>
          </div>

          {/* Feature-specific info */}
          {feature.includes('minijuego') && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-blue-700 dark:text-blue-300">
                <Gamepad2 className="w-5 h-5" />
                <span className="text-sm font-medium">
                  ¡El minijuego EcoGuardia te espera!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthRequired;
