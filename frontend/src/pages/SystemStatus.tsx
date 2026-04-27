import { useState, useEffect } from 'react';
import { api, type HealthResponse } from '../lib/api';
import { useTranslation } from 'react-i18next';

export default function SystemStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function checkHealth() {
      try {
        const data = await api.getHealth();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(t('status.error_msg', 'O backend não está acessível no momento. Verifique se ele está rodando na porta 8080.'));
        setHealth(null);
      } finally {
        setLoading(false);
      }
    }

    checkHealth();
  }, [i18n.language]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textMain">{t('status.title', 'Status do Sistema')}</h1>
        <p className="text-textMuted mt-2">{t('status.subtitle', 'Diagnóstico de conectividade com a API base.')}</p>
      </div>

      <div className="bg-surface p-8 rounded-xl border border-borderSubtle shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-lg font-semibold text-textMain">IntegraLab API</div>
          {loading ? (
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-500"></span>
            </span>
          ) : error ? (
            <span className="flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          ) : (
            <span className="flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          )}
        </div>

        {loading ? (
          <div className="text-textMuted animate-pulse">{t('status.verifying', 'Verificando conectividade...')}</div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/50 p-4 rounded-lg">
            <h4 className="text-red-600 dark:text-red-400 font-bold mb-1">{t('status.fail_title', 'Conexão Falhou')}</h4>
            <p className="text-red-700 dark:text-red-300/80 text-sm">{error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/30 p-4 rounded-lg">
              <h4 className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">{t('status.success_title', 'Sistemas Operacionais')}</h4>
              <p className="text-emerald-700 dark:text-emerald-300/80 text-sm">{t('status.success_msg', 'O backend respondeu com sucesso.')}</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-borderSubtle">
              <h5 className="text-sm font-semibold text-textMuted mb-2">{t('status.payload', 'Payload recebido (/api/health)')}</h5>
              <pre className="text-emerald-600 dark:text-emerald-300 font-mono text-sm overflow-x-auto p-2 bg-slate-100 dark:bg-slate-900 rounded border border-borderSubtle">
                {JSON.stringify(health, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
