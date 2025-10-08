import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import EcoGuardia from '../components/game/EcoGuardia';
import AuthRequired from '../components/AuthRequired';

const Minigame = () => {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, mostrar página de acceso restringido
  if (!isAuthenticated) {
    return <AuthRequired feature="el minijuego EcoGuardia" />;
  }

  // Si está autenticado, mostrar el minijuego
  return <EcoGuardia />;
};

export default Minigame;