const express = require('express');
const router = express.Router();

// Datos de ejemplo para la comunidad
let communityData = {
  ideas: [
    {
      id: 1,
      title: 'Más espacios verdes en el centro',
      description: 'Crear parques y jardines en el centro histórico de Santa Cruz',
      author: 'Sofia Ramirez',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzyiWdHCnadjARHuCLVODP-Es6ko8nXcyxhlMgaS0klwdELk1IDl1h1_HuEF1eFxr4Nk8wZ5tKzqXR2jERVlCIuPhlhiT0QPLqvXowA9gqbDctS36Fq7aNcYz-RhyUSqHc6jLwA7PIGSlD1Y1y4ISb65eht0Iv2QTXFefojTak2qxjzINrRJeX0fdFYIWmUAoldBt1E9-0mjYwjwZBQY2jkI5DLjXj-ARDJblRYHDH8j25T4aoQVC5Wb0hKclftdMrsxY8LlQVQm8',
      votes: 45,
      status: 'active',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'green-spaces'
    },
    {
      id: 2,
      title: 'Mejora del transporte público',
      description: 'Implementar carriles exclusivos para buses y mejorar la frecuencia',
      author: 'Carlos Mendoza',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvDt7rkYmwwtDCWirOPHX5s9FkvbktxHCuFVtv3aUJEeqsIExO5n1Smm35qyNk1oa9hJRuEEPRI3aWUmRuEUdHNNWGSVyGbsJ_rmAm0x3mIULBDf3RhbOt0-rbQdzlxFJwlpgnjBuLlYObEBJvclklbl72j1BQR0o04Sl4KyDzxxdv3f87wbZIL7ccIiQiBfCKU-4SVJpp3biu22q6Ns6S64b8zfmoIIPP6lHu_ChsddaHfmruWlPVzsJ5-4Sr16Mp1Tn0bc6mk-8',
      votes: 32,
      status: 'active',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'transportation'
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Espacios Verdes para Todos',
      description: 'Creación de parques y zonas verdes en barrios con poco acceso a áreas recreativas.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABqejwC1tc0J9eC1QncDeMa_BXWG3L6cal7GLwszWVL2cHNa5sONUMhH8FfxJ9rYdLaTndP-tvzo0Donrsl4VK_lDxVPhOJSXmEH7rSab94NkYj_DGgT2Blzvw_Vv6hFwC2Pu_CJiC5jyLuSYD7XghLdoXA1moHLVgijW09Vtdy0-USUV0xGMut26YsLWnJYumV3JhS8TGPleVbe4ayvbqJtm0axyL5ufY3pZm9XSR4FZODmvdXrYb09M-GwYMdiq0MJe7WxU7Ft4',
      votes: 128,
      status: 'voting',
      category: 'green-spaces',
      budget: 250000,
      timeline: '12 meses'
    },
    {
      id: 2,
      title: 'Movilidad Urbana Sostenible',
      description: 'Implementación de carriles bici y mejora del transporte público para reducir la congestión.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDgED-xR8zGqfev3GQrY2iELmJJ0p8QKKXsR_vgOIrb444vTWer7EEp6YX--XGNM9zQAbOfNWGYGfUBp2dyUyjzmURyXRmSssRb_8IETnFPDXHg2ADEHQXdBumLQ4lo0HcwbvSQoPIGrL5z5KlTiQUHGaf_d-dxs2CGoUVHGOCnWkcxMlbnOCbGPP0sLIokiUYSx6Zm-oUUChpc4NVM3WWRY28CHV04MSWf7Mv3ng28YYmu17tOOPWRDxR1zrF7juVjyQS0rlGpfk',
      votes: 95,
      status: 'voting',
      category: 'transportation',
      budget: 500000,
      timeline: '18 meses'
    }
  ],
  initiatives: [
    {
      id: 1,
      title: 'Renovación del Centro Histórico',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA90yeNU03Gf0S809EuzXZQY4eeDLf7Txyt53ubSkC55w55NRRadFfk3agkuB9Ksp-aoCYuM6oWz_GfT4jPyOoGkShEBJ2SEO5Vt2NTiSF4L805YIEDr47wXqTxDOJNARaWbLAkwiMc7oKRrY_D6S7F37E2e4lfD5CZDZjnjdEyMvtyfW03Ig30mlqXyuKuJs2anlzgws4v_jjAg6chjTGAWhQV-B3Bltwz5fpa4JURVAi69lNY36m98uaG_FGUTLhU8PPrXiixYrQ',
      progress: 60,
      status: 'En curso',
      description: 'Rehabilitación de edificios históricos y mejora de la infraestructura urbana',
      startDate: '2023-01-15',
      expectedEnd: '2024-06-30'
    },
    {
      id: 2,
      title: 'Sistema de Reciclaje Comunitario',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCRTookVRuWEIOJa52Ik2fdfo8VQ9n4Oulh82o7NFAufkzhF1HcDOdA4lDj6fyUEA1dnKew_PYGPtSFkD_UzCIbkQWfJ8hM8x7853x-NF5OH_HN6Uf7sHoUuEuZXknO0anUFFVgBcht_DavoitIWoy3L8V5koqvgN8k_H5P9F4dfDe1tNzI2qF33dZLoZJvaamFoOKUuiAv2pGUcGLBNEgLIqZ8TT6ZQyemW43gPEb2UA2_V2SFvtAxnuEc_uiJ6_7q0y-LVKKSq4',
      progress: 25,
      status: 'Planificación',
      description: 'Implementación de puntos de reciclaje en toda la ciudad',
      startDate: '2024-03-01',
      expectedEnd: '2025-02-28'
    }
  ],
  forum: [
    {
      id: 1,
      author: 'Sofia Ramirez',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzyiWdHCnadjARHuCLVODP-Es6ko8nXcyxhlMgaS0klwdELk1IDl1h1_HuEF1eFxr4Nk8wZ5tKzqXR2jERVlCIuPhlhiT0QPLqvXowA9gqbDctS36Fq7aNcYz-RhyUSqHc6jLwA7PIGSlD1Y1y4ISb65eht0Iv2QTXFefojTak2qxjzINrRJeX0fdFYIWmUAoldBt1E9-0mjYwjwZBQY2jkI5DLjXj-ARDJblRYHDH8j25T4aoQVC5Wb0hKclftdMrsxY8LlQVQm8',
      message: 'Me encanta la idea de más espacios verdes. Sería genial tener un parque cerca de mi casa.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 12,
      replies: 3
    },
    {
      id: 2,
      author: 'Carlos Mendoza',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvDt7rkYmwwtDCWirOPHX5s9FkvbktxHCuFVtv3aUJEeqsIExO5n1Smm35qyNk1oa9hJRuEEPRI3aWUmRuEUdHNNWGSVyGbsJ_rmAm0x3mIULBDf3RhbOt0-rbQdzlxFJwlpgnjBuLlYObEBJvclklbl72j1BQR0o04Sl4KyDzxxdv3f87wbZIL7ccIiQiBfCKU-4SVJpp3biu22q6Ns6S64b8zfmoIIPP6lHu_ChsddaHfmruWlPVzsJ5-4Sr16Mp1Tn0bc6mk-8',
      message: 'El transporte público necesita mejoras urgentes. Apoyo totalmente esa iniciativa.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 8,
      replies: 1
    }
  ]
};

// Obtener ideas de la comunidad
router.get('/ideas', (req, res) => {
  try {
    const { category, status = 'active', limit = 10 } = req.query;
    
    let ideas = communityData.ideas;
    
    if (category) {
      ideas = ideas.filter(idea => idea.category === category);
    }
    
    if (status) {
      ideas = ideas.filter(idea => idea.status === status);
    }
    
    ideas = ideas.slice(0, parseInt(limit));

    res.json({
      success: true,
      data: ideas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener ideas',
      error: error.message
    });
  }
});

// Enviar nueva idea
router.post('/ideas', (req, res) => {
  try {
    const { title, description, category, author, authorAvatar } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Título, descripción y categoría son requeridos'
      });
    }

    const newIdea = {
      id: communityData.ideas.length + 1,
      title,
      description,
      author: author || 'Usuario Anónimo',
      authorAvatar: authorAvatar || 'https://via.placeholder.com/40',
      votes: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      category
    };

    communityData.ideas.unshift(newIdea);

    res.status(201).json({
      success: true,
      data: newIdea,
      message: 'Idea enviada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al enviar idea',
      error: error.message
    });
  }
});

// Votar por una idea
router.post('/ideas/:id/vote', (req, res) => {
  try {
    const { id } = req.params;
    const idea = communityData.ideas.find(i => i.id === parseInt(id));

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea no encontrada'
      });
    }

    idea.votes += 1;

    res.json({
      success: true,
      data: { votes: idea.votes },
      message: 'Voto registrado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al votar',
      error: error.message
    });
  }
});

// Obtener proyectos para votar
router.get('/projects', (req, res) => {
  try {
    const { status = 'voting', limit = 10 } = req.query;
    
    let projects = communityData.projects;
    
    if (status) {
      projects = projects.filter(project => project.status === status);
    }
    
    projects = projects.slice(0, parseInt(limit));

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener proyectos',
      error: error.message
    });
  }
});

// Votar por un proyecto
router.post('/projects/:id/vote', (req, res) => {
  try {
    const { id } = req.params;
    const project = communityData.projects.find(p => p.id === parseInt(id));

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    project.votes += 1;

    res.json({
      success: true,
      data: { votes: project.votes },
      message: 'Voto registrado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al votar',
      error: error.message
    });
  }
});

// Obtener iniciativas en progreso
router.get('/initiatives', (req, res) => {
  try {
    const { status, limit = 10 } = req.query;
    
    let initiatives = communityData.initiatives;
    
    if (status) {
      initiatives = initiatives.filter(initiative => 
        initiative.status.toLowerCase().includes(status.toLowerCase())
      );
    }
    
    initiatives = initiatives.slice(0, parseInt(limit));

    res.json({
      success: true,
      data: initiatives
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener iniciativas',
      error: error.message
    });
  }
});

// Obtener foro comunitario
router.get('/forum', (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const forum = communityData.forum.slice(0, parseInt(limit));

    res.json({
      success: true,
      data: forum
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener foro',
      error: error.message
    });
  }
});

// Enviar mensaje al foro
router.post('/forum', (req, res) => {
  try {
    const { message, author, avatar } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Mensaje es requerido'
      });
    }

    const newMessage = {
      id: communityData.forum.length + 1,
      author: author || 'Usuario Anónimo',
      avatar: avatar || 'https://via.placeholder.com/40',
      message,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: 0
    };

    communityData.forum.unshift(newMessage);

    res.status(201).json({
      success: true,
      data: newMessage,
      message: 'Mensaje enviado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al enviar mensaje',
      error: error.message
    });
  }
});

// Obtener estadísticas de la comunidad
router.get('/stats', (req, res) => {
  try {
    const stats = {
      totalIdeas: communityData.ideas.length,
      activeIdeas: communityData.ideas.filter(i => i.status === 'active').length,
      totalVotes: communityData.ideas.reduce((sum, idea) => sum + idea.votes, 0) +
                  communityData.projects.reduce((sum, project) => sum + project.votes, 0),
      activeProjects: communityData.projects.filter(p => p.status === 'voting').length,
      initiativesInProgress: communityData.initiatives.filter(i => i.status === 'En curso').length,
      forumMessages: communityData.forum.length
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
});

module.exports = router;
