import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Simulator from './pages/Simulator';
import Alerts from './pages/Alerts';
import Community from './pages/Community';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Rewards from './pages/Rewards';
import Maps from './pages/Maps';
import Minigame from './pages/Minigame';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Rutas con layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="simulator" element={<Simulator />} />
                    <Route path="alerts" element={<Alerts />} />
                    <Route path="maps" element={<Maps />} />
                    <Route path="community" element={<Community />} />
                    <Route path="rewards" element={<Rewards />} />
                    <Route path="minigame" element={<Minigame />} />
                    <Route path="about" element={<About />} />
                    <Route path="profile" element={<Profile />} />
              </Route>
              
              {/* Ruta 404 */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
