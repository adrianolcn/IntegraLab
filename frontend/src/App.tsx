import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Requestia from './pages/Requestia';
import LearningJourney from './pages/LearningJourney';
import SystemStatus from './pages/SystemStatus';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Tracks from './pages/catalog/Tracks';
import TrackDetail from './pages/catalog/TrackDetail';
import MissionDetail from './pages/catalog/MissionDetail';
import LessonDetail from './pages/catalog/LessonDetail';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './i18n';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <div className="app-shell relative min-h-screen flex flex-col">
      <div className="app-background fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="app-background-gradient absolute inset-0" />
        <div className="app-background-pattern absolute inset-0" />
        <div className="app-background-glow absolute inset-0" />
      </div>
      
      <div className="app-content relative z-10 flex-grow flex flex-col">
        <Navbar />
        <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/requestia" element={<Requestia />} />
          <Route path="/jornada" element={<LearningJourney />} />
          <Route path="/roadmap" element={<Navigate to="/jornada" replace />} />
          <Route path="/status" element={<SystemStatus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Catalog / Public (for now, until Phase 2 makes it strictly private) */}
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/tracks/:slug" element={<TrackDetail />} />
          <Route path="/lessons/:lessonId" element={<LessonDetail />} />
          <Route path="/missions/:slug" element={<MissionDetail />} />
          
          {/* Private */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
        </main>
        <footer className="glass-panel py-6 text-center text-textMuted mt-auto rounded-none border-b-0 border-l-0 border-r-0">
          <p>© {new Date().getFullYear()} IntegraLab. Fase 1.</p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
