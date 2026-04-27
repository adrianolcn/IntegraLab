import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../lib/api';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await api.register({ name, email, password });
      login(response.token, response.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-panel-elevated p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-950 dark:text-white">
            {t('auth.create_account')}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
             <div>
              <label className="block text-sm font-medium text-textMuted mb-1">{t('auth.name')}</label>
              <input
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors shadow-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">{t('auth.email')}</label>
              <input
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">{t('auth.password')}</label>
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 dark:bg-primary-600 dark:hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors shadow-sm"
            >
              {isLoading ? '...' : t('auth.register_btn')}
            </button>
          </div>
          <div className="text-sm text-center">
             <span className="text-textMuted">{t('auth.have_account')} </span>
             <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
               {t('auth.login_btn')}
             </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
