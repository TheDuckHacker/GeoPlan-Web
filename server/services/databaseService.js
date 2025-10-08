const { supabase, supabaseAdmin } = require('../config/supabase');

// Este servicio ahora usará el cliente ADMIN para todas las operaciones.
class DatabaseService {

  // Usuarios
  async createUser(userData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error.message };
    }
  }

  async getUserById(id) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting user:', error);
      return { success: false, error: error.message };
    }
  }

  async getUserByEmail(email) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        // This is not a critical error if the user is not found during login check
        return { success: false, error: 'User not found' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Error getting user by email:', error);
      return { success: false, error: error.message };
    }
  }

  async updateUser(id, userData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .update(userData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  }

  // El resto de las funciones también usarán supabaseAdmin para consistencia

  async createSimulation(simulationData) {
    try {
      const { data, error } = await supabaseAdmin.from('simulations').insert([simulationData]).select().single();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating simulation:', error);
      return { success: false, error: error.message };
    }
  }

  async getSimulationsByUser(userId, limit = 10) {
    try {
      const { data, error } = await supabaseAdmin.from('simulations').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(limit);
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting simulations:', error);
      return { success: false, error: error.message };
    }
  }

  async createClimateAlert(alertData) {
    try {
      const { data, error } = await supabaseAdmin.from('climate_alerts').insert([alertData]).select().single();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating climate alert:', error);
      return { success: false, error: error.message };
    }
  }

  async getActiveAlerts() {
    try {
      const { data, error } = await supabaseAdmin.from('climate_alerts').select('*').eq('active', true).order('created_at', { ascending: false });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting active alerts:', error);
      return { success: false, error: error.message };
    }
  }

  async createCommunityProject(projectData) {
    try {
      const { data, error } = await supabaseAdmin.from('community_projects').insert([projectData]).select().single();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating community project:', error);
      return { success: false, error: error.message };
    }
  }

  async getCommunityProjects(limit = 10) {
    try {
      const { data, error } = await supabaseAdmin.from('community_projects').select('*').order('created_at', { ascending: false }).limit(limit);
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting community projects:', error);
      return { success: false, error: error.message };
    }
  }

  async voteForProject(projectId) {
    try {
      const { data, error } = await supabaseAdmin.rpc('increment_project_votes', { project_id: projectId });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error voting for project:', error);
      return { success: false, error: error.message };
    }
  }

  async createCommunityIdea(ideaData) {
    try {
      const { data, error } = await supabaseAdmin.from('community_ideas').insert([ideaData]).select().single();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating community idea:', error);
      return { success: false, error: error.message };
    }
  }

  async getCommunityIdeas(limit = 10) {
    try {
      const { data, error } = await supabaseAdmin.from('community_ideas').select('*').order('created_at', { ascending: false }).limit(limit);
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting community ideas:', error);
      return { success: false, error: error.message };
    }
  }

  async createForumPost(postData) {
    try {
      const { data, error } = await supabaseAdmin.from('forum_posts').insert([postData]).select().single();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating forum post:', error);
      return { success: false, error: error.message };
    }
  }

  async getForumPosts(limit = 10) {
    try {
      const { data, error } = await supabaseAdmin.from('forum_posts').select('*, users:user_id(name, avatar_url)').order('created_at', { ascending: false }).limit(limit);
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting forum posts:', error);
      return { success: false, error: error.message };
    }
  }

  async cacheSatelliteData(dataType, coordinates, data, date) {
    try {
      const satelliteData = { data_type: dataType, coordinates: `POINT(${coordinates.lon} ${coordinates.lat})`, data, date };
      const { data: result, error } = await supabaseAdmin.from('satellite_data').insert([satelliteData]).select().single();
      if (error) throw error;
      return { success: true, data: result };
    } catch (error) {
      console.error('Error caching satellite data:', error);
      return { success: false, error: error.message };
    }
  }

  async getCachedSatelliteData(dataType, coordinates, date) {
    try {
      const { data, error } = await supabaseAdmin.from('satellite_data').select('*').eq('data_type', dataType).eq('date', date).single();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting cached satellite data:', error);
      return { success: false, error: error.message };
    }
  }

  async getStats() {
    try {
      const [usersResult, simulationsResult, projectsResult, ideasResult] = await Promise.all([
        supabaseAdmin.from('users').select('id', { count: 'exact' }),
        supabaseAdmin.from('simulations').select('id', { count: 'exact' }),
        supabaseAdmin.from('community_projects').select('id', { count: 'exact' }),
        supabaseAdmin.from('community_ideas').select('id', { count: 'exact' })
      ]);

      return {
        success: true,
        data: {
          totalUsers: usersResult.count || 0,
          totalSimulations: simulationsResult.count || 0,
          totalProjects: projectsResult.count || 0,
          totalIdeas: ideasResult.count || 0
        }
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new DatabaseService();