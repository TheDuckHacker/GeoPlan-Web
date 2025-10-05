import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  MessageSquare, 
  Send, 
  ThumbsUp, 
  Users, 
  MapPin, 
  Calendar,
  User,
  Heart,
  Share2,
  Flag,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Community = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newIdea, setNewIdea] = useState('');
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState('ideas');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    setLoading(true);
    try {
      // Datos simulados para la comunidad
      const mockIdeas = [
        {
          id: 1,
          title: 'Más Espacios Verdes',
          description: 'Crear más parques y zonas verdes en barrios con poco acceso a áreas recreativas.',
          author: 'Sofia Ramirez',
          votes: 128,
          comments: 12,
          date: '2024-10-02',
          category: 'Ambiental',
          status: 'En votación'
        },
        {
          id: 2,
          title: 'Movilidad Urbana Sostenible',
          description: 'Implementación de carriles bici y mejora del transporte público para reducir la congestión.',
          author: 'Carlos Mendoza',
          votes: 95,
          comments: 8,
          date: '2024-10-01',
          category: 'Transporte',
          status: 'En votación'
        },
        {
          id: 3,
          title: 'Sistema de Reciclaje Comunitario',
          description: 'Programa integral de reciclaje con puntos de recolección en cada barrio.',
          author: 'Ana García',
          votes: 76,
          comments: 15,
          date: '2024-09-30',
          category: 'Residuos',
          status: 'Planificación'
        }
      ];

      const mockForumPosts = [
        {
          id: 1,
          content: 'Me encanta la idea de más espacios verdes. Sería genial tener un parque cerca de mi casa.',
          author: 'Sofia Ramirez',
          date: '2024-10-02',
          likes: 12,
          replies: 3,
          avatar: '👩'
        },
        {
          id: 2,
          content: 'El transporte público necesita mejoras urgentes. Apoyo totalmente esa iniciativa.',
          author: 'Carlos Mendoza',
          date: '2024-10-03',
          likes: 8,
          replies: 2,
          avatar: '👨'
        },
        {
          id: 3,
          content: '¿Alguien sabe cuándo comenzará el proyecto de reciclaje en el centro?',
          author: 'Miguel Torres',
          date: '2024-10-04',
          likes: 5,
          replies: 1,
          avatar: '👨‍💼'
        }
      ];

      const mockProjects = [
        {
          id: 1,
          name: 'Renovación del Centro Histórico',
          description: 'Mejora de infraestructura y espacios públicos en el centro de Santa Cruz',
          progress: 60,
          status: 'En curso',
          startDate: '2024-01-15',
          endDate: '2024-12-31',
          budget: '2,500,000 BOB',
          participants: 45
        },
        {
          id: 2,
          name: 'Sistema de Reciclaje Comunitario',
          description: 'Implementación de puntos de recolección y educación ambiental',
          progress: 25,
          status: 'Planificación',
          startDate: '2024-11-01',
          endDate: '2025-06-30',
          budget: '800,000 BOB',
          participants: 23
        }
      ];

      setIdeas(mockIdeas);
      setForumPosts(mockForumPosts);
      setProjects(mockProjects);
    } catch (error) {
      console.error('Error fetching community data:', error);
      setError('Error al cargar los datos de la comunidad.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitIdea = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para enviar ideas.');
      return;
    }
    if (!newIdea.trim()) {
      setError('Por favor, escribe una idea.');
      return;
    }

    setLoading(true);
    try {
      // Simular envío de idea
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newIdeaObj = {
        id: Date.now(),
        title: newIdea,
        description: 'Nueva idea propuesta por la comunidad',
        author: user?.name || 'Usuario',
        votes: 0,
        comments: 0,
        date: new Date().toISOString().split('T')[0],
        category: 'General',
        status: 'Nueva'
      };

      setIdeas(prev => [newIdeaObj, ...prev]);
      setNewIdea('');
      setMessage('¡Tu idea ha sido enviada exitosamente!');
      
      // Agregar puntos por actividad
      if (user) {
        await axios.post('/api/gamification/add-points', {
          userId: user.id,
          activityId: 'community_post',
          metadata: { type: 'idea', content: newIdea }
        });
      }
    } catch (error) {
      console.error('Error submitting idea:', error);
      setError('Error al enviar la idea.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para comentar.');
      return;
    }
    if (!newPost.trim()) {
      setError('Por favor, escribe un comentario.');
      return;
    }

    setLoading(true);
    try {
      // Simular envío de comentario
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPostObj = {
        id: Date.now(),
        content: newPost,
        author: user?.name || 'Usuario',
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        replies: 0,
        avatar: '👤'
      };

      setForumPosts(prev => [newPostObj, ...prev]);
      setNewPost('');
      setMessage('¡Tu comentario ha sido publicado!');
      
      // Agregar puntos por actividad
      if (user) {
        await axios.post('/api/gamification/add-points', {
          userId: user.id,
          activityId: 'community_post',
          metadata: { type: 'forum_post', content: newPost }
        });
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      setError('Error al enviar el comentario.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (ideaId) => {
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para votar.');
      return;
    }

    try {
      setIdeas(prev => prev.map(idea => 
        idea.id === ideaId 
          ? { ...idea, votes: idea.votes + 1 }
          : idea
      ));
      
      setMessage('¡Voto registrado exitosamente!');
      
      // Agregar puntos por actividad
      if (user) {
        await axios.post('/api/gamification/add-points', {
          userId: user.id,
          activityId: 'project_vote',
          metadata: { ideaId: ideaId }
        });
      }
    } catch (error) {
      console.error('Error voting:', error);
      setError('Error al registrar el voto.');
    }
  };

  const handleLike = async (postId) => {
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para dar like.');
      return;
    }

    try {
      setForumPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ));
      
      setMessage('¡Like registrado!');
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Error al registrar el like.');
    }
  };

  if (loading && !ideas.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="loading-spinner"></div>
        <p className="ml-3 text-lg text-foreground-light dark:text-foreground-dark">Cargando comunidad...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background-light dark:bg-background-dark min-h-screen font-display text-foreground-light dark:text-foreground-dark">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in-up">Participa en el Futuro de Santa Cruz</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up">
        Tu voz es esencial para construir una ciudad más vibrante y sostenible. Comparte tus ideas, vota por proyectos que te apasionen y sigue el progreso de las iniciativas comunitarias.
      </p>

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

      {/* Tabs de Navegación */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 animate-fade-in-up">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'ideas', name: 'Envía tus Ideas', icon: <MessageSquare className="h-5 w-5" /> },
              { id: 'forum', name: 'Foro Comunitario', icon: <Users className="h-5 w-5" /> },
              { id: 'projects', name: 'Proyectos en Curso', icon: <MapPin className="h-5 w-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Tab: Envía tus Ideas */}
          {activeTab === 'ideas' && (
            <div className="space-y-6">
              {/* Formulario para enviar ideas */}
              <div className="bg-gradient-to-r from-primary to-teal-600 text-white rounded-lg p-6 animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Send className="h-6 w-6 mr-2" />
                  Envía tu Idea
                </h2>
                <form onSubmit={handleSubmitIdea} className="space-y-4">
                  <div>
                    <textarea
                      value={newIdea}
                      onChange={(e) => setNewIdea(e.target.value)}
                      placeholder="Describe tu idea para mejorar Santa Cruz..."
                      className="w-full p-4 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                      rows={4}
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !isAuthenticated}
                    className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Enviar Idea
                      </>
                    )}
                  </button>
                  {!isAuthenticated && (
                    <p className="text-sm text-white/80">
                      Debes iniciar sesión para enviar ideas
                    </p>
                  )}
                </form>
              </div>

              {/* Lista de ideas */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Ideas de la Comunidad
                </h3>
                {ideas.map((idea, index) => (
                  <div
                    key={idea.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in-up hover-lift"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {idea.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {idea.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {idea.author}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {idea.date}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {idea.comments} comentarios
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            idea.status === 'En votación' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200' :
                            idea.status === 'Planificación' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' :
                            'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                          }`}>
                            {idea.status}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 text-center">
                        <button
                          onClick={() => handleVote(idea.id)}
                          disabled={!isAuthenticated}
                          className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <ThumbsUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                          <span className="text-sm font-semibold text-gray-800 dark:text-white mt-1">
                            {idea.votes}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Foro Comunitario */}
          {activeTab === 'forum' && (
            <div className="space-y-6">
              {/* Formulario para comentarios */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 animate-fade-in-up">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2" />
                  Comparte tu opinión
                </h2>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div>
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="¿Qué opinas sobre los proyectos de la ciudad?"
                      className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !isAuthenticated}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Enviar
                      </>
                    )}
                  </button>
                  {!isAuthenticated && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Debes iniciar sesión para comentar
                    </p>
                  )}
                </form>
              </div>

              {/* Lista de comentarios */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Conversaciones Recientes
                </h3>
                {forumPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in-up hover-lift"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{post.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-800 dark:text-white">
                            {post.author}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {post.date}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {post.content}
                        </p>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            disabled={!isAuthenticated}
                            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">{post.replies}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                            <Share2 className="h-4 w-4" />
                            <span className="text-sm">Compartir</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Proyectos en Curso */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Progreso de Iniciativas
              </h3>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in-up hover-lift"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {project.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Estado:</span>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {project.status}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Presupuesto:</span>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {project.budget}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Participantes:</span>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {project.participants}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Fecha límite:</span>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {project.endDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Progreso
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-teal-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;