import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Award, 
  Trophy, 
  Star, 
  Settings, 
  Edit, 
  Save, 
  X,
  Activity,
  Target,
  Medal,
  FileText,
  Users,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    interests: []
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      // Obtener perfil del usuario
      const profileResponse = await axios.get(`/api/gamification/progress/${user.id}`);
      const statsResponse = await axios.get(`/api/gamification/stats/${user.id}`);
      
      setUserProfile(profileResponse.data.data);
      setUserStats(statsResponse.data.data);
      
      // Inicializar formulario de edición
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || 'Santa Cruz, Bolivia',
        interests: user.interests || ['Sostenibilidad', 'Medio Ambiente', 'Tecnología']
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Error al cargar el perfil del usuario.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setMessage('');
    setError('');
  };

  const handleCancel = () => {
    setEditing(false);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      bio: user.bio || '',
      location: user.location || 'Santa Cruz, Bolivia',
      interests: user.interests || ['Sostenibilidad', 'Medio Ambiente', 'Tecnología']
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Actualizar perfil del usuario
      await updateUser(editForm);
      setEditing(false);
      setMessage('Perfil actualizado exitosamente.');
      fetchUserProfile(); // Recargar datos
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error al actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setEditForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="p-8 bg-background-light dark:bg-background-dark min-h-screen font-display text-foreground-light dark:text-foreground-dark">
        <div className="bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-4 mb-4 rounded-lg" role="alert">
          <p className="font-bold">Acceso Denegado:</p>
          <p>Por favor, inicia sesión para ver tu perfil.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="loading-spinner"></div>
        <p className="ml-3 text-lg text-foreground-light dark:text-foreground-dark">Cargando perfil...</p>
      </div>
    );
  }

  const currentLevel = userProfile?.currentLevel || { level: 1, name: 'Explorador Espacial', badge: '🚀' };
  const totalPoints = userProfile?.totalPoints || 0;
  const certificates = userProfile?.certificates || [];
  const achievements = userProfile?.achievements || [];

  return (
    <div className="p-8 bg-background-light dark:bg-background-dark min-h-screen font-display text-foreground-light dark:text-foreground-dark">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in-up">Mi Perfil</h1>

      {message && (
        <div className="bg-green-100 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-4 mb-6 rounded-lg animate-fade-in-up" role="alert">
          <p>{message}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6 rounded-lg animate-fade-in-up" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Panel Principal - Información del Usuario */}
        <div className="lg:col-span-2">
          {/* Información Personal */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 animate-fade-in-up hover-lift">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
                <User className="h-7 w-7 text-primary mr-3" />
                Información Personal
              </h2>
              {!editing ? (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white font-semibold">
                    {user.name || 'Usuario'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white font-semibold">
                    {user.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ubicación
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white font-semibold flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {user.location || 'Santa Cruz, Bolivia'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Miembro desde
                </label>
                <p className="text-gray-800 dark:text-white font-semibold flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Biografía
              </label>
              {editing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Cuéntanos sobre ti..."
                />
              ) : (
                <p className="text-gray-800 dark:text-white">
                  {user.bio || 'Apasionado por la sostenibilidad urbana y el cuidado del medio ambiente.'}
                </p>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Intereses
              </label>
              {editing ? (
                <div className="flex flex-wrap gap-2">
                  {['Sostenibilidad', 'Medio Ambiente', 'Tecnología', 'Transporte', 'Energía', 'Reciclaje'].map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        editForm.interests.includes(interest)
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(user.interests || ['Sostenibilidad', 'Medio Ambiente', 'Tecnología']).map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Estadísticas del Usuario */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <BarChart3 className="h-7 w-7 text-purple-500 mr-3" />
              Mis Estadísticas
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-primary to-teal-500 flex items-center justify-center">
                  <span className="text-2xl">{currentLevel.badge}</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Nivel</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{currentLevel.name}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Puntos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{totalPoints.toLocaleString()}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Certificados</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{certificates.filter(c => c.obtained).length}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                  <Medal className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Logros</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{achievements.filter(a => a.obtained).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Nivel Actual */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
              Mi Nivel
            </h2>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-r from-primary to-teal-500 flex items-center justify-center animate-glow">
                <span className="text-3xl">{currentLevel.badge}</span>
              </div>
              <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                Nivel {currentLevel.level}
              </h3>
              <h4 className="font-bold text-lg text-gray-700 dark:text-gray-300">
                {currentLevel.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {currentLevel.description}
              </p>
            </div>
          </div>

          {/* Certificados Obtenidos */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <FileText className="h-6 w-6 text-blue-500 mr-2" />
              Certificados NASA
            </h2>
            
            <div className="space-y-3">
              {certificates.filter(c => c.obtained).map((cert, index) => (
                <div
                  key={cert.id}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{cert.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Nivel {cert.level}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {certificates.filter(c => c.obtained).length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Aún no tienes certificados
                </p>
              )}
            </div>
          </div>

          {/* Logros Recientes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up hover-lift">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Medal className="h-6 w-6 text-purple-500 mr-2" />
              Logros Recientes
            </h2>
            
            <div className="space-y-3">
              {achievements.filter(a => a.obtained).slice(0, 3).map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700 animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300 text-sm">
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {achievements.filter(a => a.obtained).length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Aún no tienes logros
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;