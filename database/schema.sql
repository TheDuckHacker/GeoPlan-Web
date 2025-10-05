-- Esquema de base de datos para GeoPlan con Supabase

-- Tabla de usuarios
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  level VARCHAR(50) DEFAULT 'Principiante',
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de simulaciones
CREATE TABLE simulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  strategy_id VARCHAR(100) NOT NULL,
  intensity INTEGER NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de alertas climáticas
CREATE TABLE climate_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  level VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  coordinates POINT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Tabla de proyectos comunitarios
CREATE TABLE community_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  votes INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'Propuesto',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de ideas comunitarias
CREATE TABLE community_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  idea TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'Pendiente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de posts del foro
CREATE TABLE forum_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de datos satelitales (cache de NASA)
CREATE TABLE satellite_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data_type VARCHAR(100) NOT NULL,
  coordinates POINT NOT NULL,
  data JSONB NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX idx_simulations_user_id ON simulations(user_id);
CREATE INDEX idx_simulations_created_at ON simulations(created_at);
CREATE INDEX idx_climate_alerts_active ON climate_alerts(active);
CREATE INDEX idx_climate_alerts_coordinates ON climate_alerts USING GIST(coordinates);
CREATE INDEX idx_community_projects_status ON community_projects(status);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at);
CREATE INDEX idx_satellite_data_coordinates ON satellite_data USING GIST(coordinates);
CREATE INDEX idx_satellite_data_type_date ON satellite_data(data_type, date);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at en users
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Políticas de seguridad (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios pueden ver y editar solo sus propios datos
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Política: Los usuarios pueden ver todas las simulaciones pero solo editar las suyas
CREATE POLICY "Users can view all simulations" ON simulations
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own simulations" ON simulations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden ver todas las ideas pero solo editar las suyas
CREATE POLICY "Users can view all ideas" ON community_ideas
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own ideas" ON community_ideas
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden ver todos los posts del foro
CREATE POLICY "Users can view all forum posts" ON forum_posts
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own forum posts" ON forum_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);
