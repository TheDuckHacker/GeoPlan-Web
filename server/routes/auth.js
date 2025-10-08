const express = require('express');
const router = express.Router();
const databaseService = require('../services/databaseService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Leer el secreto JWT desde las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones básicas
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await databaseService.getUserByEmail(email);
    if (existingUser.success) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe con este email'
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const userData = {
      name,
      email,
      password: hashedPassword,
      level: 'Principiante',
      points: 0,
      avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=11a4d4&color=fff`
    };

    const result = await databaseService.createUser(userData);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error al crear el usuario',
        error: result.error
      });
    }

    // Generar JWT token
    const token = jwt.sign(
      { userId: result.data.id, email: result.data.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remover contraseña de la respuesta
    const { password: _, ...userWithoutPassword } = result.data;

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Buscar usuario
    const result = await databaseService.getUserByEmail(email);
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const user = result.data;

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Generar JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remover contraseña de la respuesta
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// Verificar token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Obtener usuario
    const result = await databaseService.getUserById(decoded.userId);
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const { password: _, ...userWithoutPassword } = result.data;

    res.json({
      success: true,
      message: 'Token válido',
      data: {
        user: userWithoutPassword
      }
    });

  } catch (error) {
    console.error('Error en verificación:', error);
    res.status(401).json({
      success: false,
      message: 'Token inválido',
      error: error.message
    });
  }
});

// Cerrar sesión
router.post('/logout', (req, res) => {
  // En JWT, el logout se maneja en el cliente eliminando el token
  res.json({
    success: true,
    message: 'Sesión cerrada exitosamente'
  });
});

// Actualizar perfil
router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    const { name, avatar_url } = req.body;

    // Actualizar usuario
    const updateData = {};
    if (name) updateData.name = name;
    if (avatar_url) updateData.avatar_url = avatar_url;

    const result = await databaseService.updateUser(decoded.userId, updateData);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar perfil',
        error: result.error
      });
    }

    const { password: _, ...userWithoutPassword } = result.data;

    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: {
        user: userWithoutPassword
      }
    });

  } catch (error) {
    console.error('Error en actualización de perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// Cambiar contraseña
router.put('/change-password', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Contraseña actual y nueva contraseña son requeridas'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La nueva contraseña debe tener al menos 6 caracteres'
      });
    }

    // Obtener usuario
    const userResult = await databaseService.getUserById(decoded.userId);
    if (!userResult.success) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar contraseña actual
    const isValidPassword = await bcrypt.compare(currentPassword, userResult.data.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña actual incorrecta'
      });
    }

    // Hash de la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    const result = await databaseService.updateUser(decoded.userId, {
      password: hashedNewPassword
    });
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error al cambiar contraseña',
        error: result.error
      });
    }

    res.json({
      success: true,
      message: 'Contraseña cambiada exitosamente'
    });

  } catch (error) {
    console.error('Error en cambio de contraseña:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

module.exports = router;
