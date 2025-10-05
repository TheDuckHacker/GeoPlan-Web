import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Map, Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Partículas de fondo */}
      <div className="absolute inset-0">
        <div className="particle w-2 h-2 top-1/4 left-1/4"></div>
        <div className="particle w-3 h-3 top-3/4 left-1/3"></div>
        <div className="particle w-2 h-2 top-1/2 right-1/4"></div>
        <div className="particle w-4 h-4 top-1/3 right-1/3"></div>
        <div className="particle w-2 h-2 bottom-1/4 left-1/2"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-6 animate-float">
            <Map className="h-8 w-8 text-primary animate-pulse-slow" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2 animate-fade-in-up">GeoPlan</h2>
          <p className="text-teal-100 text-lg animate-fade-in-up">Inicia sesión en tu cuenta</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg animate-fade-in-up">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="animate-fade-in-left">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 hover:bg-white/20"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="animate-fade-in-right">
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 hover:bg-white/20"
                    placeholder="Tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-primary py-3 px-4 rounded-lg font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </div>

            <div className="text-center animate-fade-in-up">
              <p className="text-white/80">
                ¿No tienes cuenta?{' '}
                <Link
                  to="/register"
                  className="text-white font-semibold hover:text-teal-200 transition-colors hover-glow"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="text-center animate-fade-in-up">
          <p className="text-white/60 text-sm">
            Conectando con datos reales de la NASA
          </p>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;