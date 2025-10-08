import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import EcoGuardia from '../components/game/EcoGuardia';
import AuthRequired from '../components/AuthRequired';

const Minigame = () => {
  const { isAuthenticated, user } = useAuth();

  // Debug: Log para verificar el estado de autenticación
  console.log('Minigame - isAuthenticated:', isAuthenticated);
  console.log('Minigame - user:', user);

  // Si no está autenticado, mostrar página de acceso restringido
  if (!isAuthenticated || !user) {
    console.log('Usuario no autenticado - mostrando AuthRequired');
    return <AuthRequired feature="el minijuego EcoGuardia" />;
  }

  // Si está autenticado, mostrar el minijuego
  console.log('Usuario autenticado - mostrando EcoGuardia');
  return <EcoGuardia />;
};

export default Minigame;