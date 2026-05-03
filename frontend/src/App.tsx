import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './i18n';

const Requestia = lazy(() => import('./pages/Requestia'));
const LearningJourney = lazy(() => import('./pages/LearningJourney'));
const SystemStatus = lazy(() => import('./pages/SystemStatus'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Tracks = lazy(() => import('./pages/catalog/Tracks'));
const TrackDetail = lazy(() => import('./pages/catalog/TrackDetail'));
const MissionDetail = lazy(() => import('./pages/catalog/MissionDetail'));
const LessonDetail = lazy(() => import('./pages/catalog/LessonDetail'));

function RouteLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="glass-panel-elevated flex w-full max-w-md flex-col items-center gap-4 rounded-3xl p-8 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-primary-600 dark:text-primary-300">
            IntegraLab
          </p>
          <p className="mt-2 text-base font-medium text-textMuted">
            Carregando a próxima experiência...
          </p>
        </div>
      </div>
    </div>
  );
}

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
          <Suspense fallback={<RouteLoading />}>
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
          </Suspense>
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
