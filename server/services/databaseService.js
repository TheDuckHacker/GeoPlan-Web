const supabase = require('../config/supabase');

class DatabaseService {
  constructor() {
    this.supabase = supabase;
  }

  // Usuarios
  async createUser(userData) {
    try {
      // Usar el cliente de Supabase con permisos de service role para bypass RLS
      const { createClient } = require('@supabase/supabase-js');
      const serviceRoleClient = createClient(
        'https://fxqzuwdacqzgwnupyczb.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cXp1d2RhY3F6Z3dudXB5Y3piIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYwOTg1MCwiZXhwIjoyMDc1MTg1ODUwfQ.placeholder' // Necesitarás la service role key
      );

      const { data, error } = await serviceRoleClient
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
      const { data, error } = await this.supabase
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
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting user by email:', error);
      return { success: false, error: error.message };
    }
  }

  async updateUser(id, userData) {
    try {
      const { data, error } = await this.supabase
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

  // Simulaciones
  async createSimulation(simulationData) {
    try {
      const { data, error } = await this.supabase
        .from('simulations')
        .insert([simulationData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating simulation:', error);
      return { success: false, error: error.message };
    }
  }

  async getSimulationsByUser(userId, limit = 10) {
    try {
      const { data, error } = await this.supabase
        .from('simulations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting simulations:', error);
      return { success: false, error: error.message };
    }
  }

  // Alertas climáticas
  async createClimateAlert(alertData) {
    try {
      const { data, error } = await this.supabase
        .from('climate_alerts')
        .insert([alertData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating climate alert:', error);
      return { success: false, error: error.message };
    }
  }

  async getActiveAlerts() {
    try {
      const { data, error } = await this.supabase
        .from('climate_alerts')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting active alerts:', error);
      return { success: false, error: error.message };
    }
  }

  // Proyectos comunitarios
  async createCommunityProject(projectData) {
    try {
      const { data, error } = await this.supabase
        .from('community_projects')
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating community project:', error);
      return { success: false, error: error.message };
    }
  }

  async getCommunityProjects(limit = 10) {
    try {
      const { data, error } = await this.supabase
        .from('community_projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting community projects:', error);
      return { success: false, error: error.message };
    }
  }

  async voteForProject(projectId) {
    try {
      const { data, error } = await this.supabase
        .from('community_projects')
        .update({ votes: this.supabase.raw('votes + 1') })
        .eq('id', projectId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error voting for project:', error);
      return { success: false, error: error.message };
    }
  }

  // Ideas comunitarias
  async createCommunityIdea(ideaData) {
    try {
      const { data, error } = await this.supabase
        .from('community_ideas')
        .insert([ideaData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating community idea:', error);
      return { success: false, error: error.message };
    }
  }

  async getCommunityIdeas(limit = 10) {
    try {
      const { data, error } = await this.supabase
        .from('community_ideas')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting community ideas:', error);
      return { success: false, error: error.message };
    }
  }

  // Posts del foro
  async createForumPost(postData) {
    try {
      const { data, error } = await this.supabase
        .from('forum_posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating forum post:', error);
      return { success: false, error: error.message };
    }
  }

  async getForumPosts(limit = 10) {
    try {
      const { data, error } = await this.supabase
        .from('forum_posts')
        .select(`
          *,
          users:user_id (
            name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting forum posts:', error);
      return { success: false, error: error.message };
    }
  }

  // Datos satelitales (cache)
  async cacheSatelliteData(dataType, coordinates, data, date) {
    try {
      const satelliteData = {
        data_type: dataType,
        coordinates: `POINT(${coordinates.lon} ${coordinates.lat})`,
        data: data,
        date: date
      };

      const { data: result, error } = await this.supabase
        .from('satellite_data')
        .insert([satelliteData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data: result };
    } catch (error) {
      console.error('Error caching satellite data:', error);
      return { success: false, error: error.message };
    }
  }

  async getCachedSatelliteData(dataType, coordinates, date) {
    try {
      const { data, error } = await this.supabase
        .from('satellite_data')
        .select('*')
        .eq('data_type', dataType)
        .eq('date', date)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting cached satellite data:', error);
      return { success: false, error: error.message };
    }
  }

  // Estadísticas generales
  async getStats() {
    try {
      const [usersResult, simulationsResult, projectsResult, ideasResult] = await Promise.all([
        this.supabase.from('users').select('id', { count: 'exact' }),
        this.supabase.from('simulations').select('id', { count: 'exact' }),
        this.supabase.from('community_projects').select('id', { count: 'exact' }),
        this.supabase.from('community_ideas').select('id', { count: 'exact' })
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
