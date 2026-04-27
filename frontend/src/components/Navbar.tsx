import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { LogOut, Sun, Moon, Laptop, Globe } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const links = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.requestia'), path: '/requestia' },
    { name: t('nav.tracks'), path: '/tracks' },
    { name: t('nav.roadmap'), path: '/jornada' },
    { name: t('nav.status'), path: '/status' },
  ];

  if (user) {
    links.push({ name: t('nav.dashboard'), path: '/dashboard' });
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleLang = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 rounded-none border-t-0 border-l-0 border-r-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 font-bold text-xl tracking-tight text-primary-500">
              IntegraLab
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-blue-100 text-blue-700 dark:bg-primary-900/50 dark:text-white'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={toggleLang} className="text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center transition-colors" title="Toggle Language">
               <Globe className="h-5 w-5 mr-1" />
               <span className="text-xs uppercase font-bold">{i18n.language}</span>
            </button>
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded p-1">
              <button onClick={() => setTheme('light')} className={`p-1 rounded transition-colors ${theme === 'light' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}><Sun className="h-4 w-4" /></button>
              <button onClick={() => setTheme('system')} className={`p-1 rounded transition-colors ${theme === 'system' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}><Laptop className="h-4 w-4" /></button>
              <button onClick={() => setTheme('dark')} className={`p-1 rounded transition-colors ${theme === 'dark' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}><Moon className="h-4 w-4" /></button>
            </div>
            
            {!user ? (
              <>
                <Link to="/login" className="text-slate-700 hover:text-blue-700 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white px-3 py-2 text-sm font-medium rounded-md transition-colors">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-primary-600 dark:hover:bg-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                  {t('nav.register')}
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-1 text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  {t('nav.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
