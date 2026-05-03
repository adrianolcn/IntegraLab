import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api, type SandboxResponse } from '../../../lib/api';

type SandboxPreset = {
  method: string;
  path: string;
  headers: { key: string; value: string }[];
  body: string;
};

const presets: Record<string, SandboxPreset> = {
  'primeira-requisicao-get': {
    method: 'GET',
    path: '/products',
    headers: [],
    body: ''
  },
  'post-com-json': {
    method: 'POST',
    path: '/products',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: '{\n  "name": "Produto Demo"\n}'
  },
  'corrija-erro-400': {
    method: 'POST',
    path: '/products',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: '{}'
  },
  'identifique-erro-401': {
    method: 'GET',
    path: '/secure',
    headers: [],
    body: ''
  },
  'status-code-criacao': {
    method: 'POST',
    path: '/products',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: '{\n  "name": "Novo Produto"\n}'
  },
  'fluxo-requisicao-autenticada': {
    method: 'GET',
    path: '/secure',
    headers: [{ key: 'Authorization', value: 'Bearer demo-token' }],
    body: ''
  }
};

const fallbackPreset: SandboxPreset = {
  method: 'GET',
  path: '/products',
  headers: [],
  body: ''
};

interface HttpSandboxPanelProps {
  missionSlug?: string;
}

export default function HttpSandboxPanel({ missionSlug }: HttpSandboxPanelProps) {
  const { t } = useTranslation();
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/products');
  const [headers, setHeaders] = useState<{key: string, value: string}[]>([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SandboxResponse | null>(null);
  
  const currentPreset = useMemo(
    () => ((missionSlug && presets[missionSlug]) ? presets[missionSlug] : fallbackPreset),
    [missionSlug]
  );
  const hasPreset = !!(missionSlug && presets[missionSlug]);

  const applyPreset = useCallback((preset: SandboxPreset) => {
    setMethod(preset.method);
    setPath(preset.path);
    setHeaders([...preset.headers]);
    setBody(preset.body);
    setResponse(null);
  }, []);

  useEffect(() => {
    applyPreset(currentPreset);
  }, [applyPreset, currentPreset]);

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleRemoveHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', val: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = val;
    setHeaders(newHeaders);
  };

  const handleRun = async () => {
    setLoading(true);
    setResponse(null);
    
    const headersObj: Record<string, string> = {};
    headers.forEach(h => {
      if (h.key.trim() !== '') {
        headersObj[h.key.trim()] = h.value.trim();
      }
    });

    let parsedBody = null;
    if (body.trim() !== '') {
      try {
        parsedBody = JSON.parse(body);
      } catch {
        setResponse({
          statusCode: 400,
          statusText: 'Bad Request',
          responseBody: { error: t('sandbox.invalidJson') },
          logs: ['Failed to parse JSON body.'],
          hints: ['Check if your JSON is well-formed.']
        });
        setLoading(false);
        return;
      }
    }

    try {
      const res = await api.runSandboxRequest({
        method,
        path,
        headers: headersObj,
        body: parsedBody
      });
      setResponse(res);
    } catch (error) {
      setResponse({
        statusCode: 500,
        statusText: 'Internal Server Error',
        responseBody: { error: error instanceof Error ? error.message : 'Unknown error' },
        logs: ['Network or unexpected error occurred.'],
        hints: []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="sandbox-panel" className="w-full glass-panel-elevated rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row mt-8">
      {/* Configuration Panel */}
      <div className="w-full md:w-1/2 p-6 border-r border-borderSubtle bg-white/50 dark:bg-slate-900/50 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-textPrimary">{t('sandbox.title')}</h3>
          {hasPreset && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-500/50">
              {t('sandbox.presetLoaded', 'Preset carregado')}
            </span>
          )}
        </div>
        <p className="text-sm text-textMuted mb-2">{t('sandbox.subtitle')}</p>
        
        <div className="bg-amber-50 dark:bg-amber-900/10 border-l-2 border-amber-400 p-2 rounded mb-6 text-xs text-amber-700 dark:text-amber-400">
          {t('sandbox.controlledSimulationNotice', 'Simulação controlada: nenhuma chamada externa será feita.')}
        </div>

        {/* Method & Path */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="w-full sm:w-1/3">
            <label className="block text-xs font-bold text-textMuted uppercase mb-1">{t('sandbox.method')}</label>
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border border-borderStrong rounded-md px-3 py-2 text-textPrimary focus:ring-2 focus:ring-primary-500 outline-none transition-colors"
            >
              {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-2/3">
            <label className="block text-xs font-bold text-textMuted uppercase mb-1">{t('sandbox.path')}</label>
            <input 
              type="text" 
              value={path} 
              onChange={(e) => setPath(e.target.value)}
              placeholder="/products"
              className="w-full bg-white dark:bg-slate-800 border border-borderStrong rounded-md px-3 py-2 text-textPrimary focus:ring-2 focus:ring-primary-500 outline-none font-mono transition-colors"
            />
          </div>
        </div>

        {/* Headers */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-bold text-textMuted uppercase">{t('sandbox.headers')}</label>
            <button onClick={handleAddHeader} className="text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium">
              + {t('sandbox.addHeader')}
            </button>
          </div>
          
          <div className="space-y-2 mb-2">
            {headers.map((h, i) => (
              <div key={i} className="flex gap-2">
                <input 
                  type="text" 
                  value={h.key} 
                  onChange={(e) => handleHeaderChange(i, 'key', e.target.value)}
                  placeholder="Key"
                  className="w-1/3 bg-white dark:bg-slate-800 border border-borderStrong rounded-md px-2 py-1.5 text-sm font-mono text-textPrimary outline-none transition-colors"
                />
                <input 
                  type="text" 
                  value={h.value} 
                  onChange={(e) => handleHeaderChange(i, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1 bg-white dark:bg-slate-800 border border-borderStrong rounded-md px-2 py-1.5 text-sm font-mono text-textPrimary outline-none transition-colors"
                />
                <button onClick={() => handleRemoveHeader(i)} className="text-red-500 hover:text-red-600 px-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setHeaders([...headers, { key: 'Authorization', value: 'Bearer demo-token' }])} className="text-[10px] bg-slate-200 dark:bg-slate-700 text-textSecondary px-2 py-1 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
              + {t('sandbox.useDemoToken', 'Use demo token')}
            </button>
            <button onClick={() => setHeaders([...headers, { key: 'Content-Type', value: 'application/json' }])} className="text-[10px] bg-slate-200 dark:bg-slate-700 text-textSecondary px-2 py-1 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
              + {t('sandbox.useJson', 'Use JSON')}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mb-6 flex-1 flex flex-col">
          <label className="block text-xs font-bold text-textMuted uppercase mb-1">{t('sandbox.body')}</label>
          <textarea 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="{\n  \n}"
            className="w-full flex-1 min-h-[120px] bg-white dark:bg-slate-800 border border-borderStrong rounded-md px-3 py-2 text-sm text-textPrimary focus:ring-2 focus:ring-primary-500 outline-none font-mono resize-y transition-colors"
          />
        </div>

        <div className="flex gap-3 mt-auto">
          {hasPreset && (
            <button 
              onClick={() => applyPreset(currentPreset)}
              className="py-3 px-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-md font-bold transition-colors shadow-sm"
              title={t('sandbox.restorePreset', 'Restaurar preset')}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
          )}
          <button 
            onClick={handleRun} 
            disabled={loading}
            className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-md font-bold shadow-md transition-colors"
          >
            {loading ? t('sandbox.loading') : t('sandbox.runRequest')}
          </button>
        </div>
      </div>

      {/* Response Panel */}
      <div className="w-full md:w-1/2 bg-slate-50/50 dark:bg-slate-900/30 p-6 flex flex-col border-l border-borderSubtle">
        {response ? (
          <div className="flex flex-col h-full animate-fadeIn">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-borderStrong">
              <h4 className="text-sm font-bold text-textSecondary uppercase">{t('sandbox.response')}</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-textMuted uppercase">{t('sandbox.status')}</span>
                <span className={`px-2 py-0.5 rounded text-sm font-mono font-bold text-white ${response.statusCode >= 400 ? 'bg-red-500' : 'bg-emerald-500'}`}>
                  {response.statusCode} {response.statusText}
                </span>
              </div>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto pr-2">
              {/* Response Headers */}
              {response.responseHeaders && Object.keys(response.responseHeaders).length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-textMuted mb-1">{t('sandbox.responseHeaders')}</h5>
                  <pre className="text-xs font-mono bg-white dark:bg-slate-900 border border-borderSubtle text-textPrimary p-2 rounded">
                    {Object.entries(response.responseHeaders).map(([k, v]) => `${k}: ${v}`).join('\n')}
                  </pre>
                </div>
              )}

              {/* Response Body */}
              <div>
                <h5 className="text-xs font-bold text-textMuted mb-1">{t('sandbox.responseBody')}</h5>
                <pre className="text-xs font-mono bg-white dark:bg-slate-900 border border-borderSubtle text-textPrimary p-3 rounded overflow-x-auto">
                  {response.responseBody ? JSON.stringify(response.responseBody, null, 2) : t('sandbox.emptyBody')}
                </pre>
              </div>

              {/* Logs */}
              {response.logs && response.logs.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-textMuted mb-1">{t('sandbox.logs')}</h5>
                  <div className="bg-slate-900 dark:bg-black text-emerald-400 p-3 rounded font-mono text-xs space-y-1 shadow-inner">
                    {response.logs.map((log: string, idx: number) => (
                      <div key={idx}><span className="text-slate-500 mr-2">{'>'}</span>{log}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hints */}
              {response.hints && response.hints.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-textMuted mb-1">{t('sandbox.hints')}</h5>
                  <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 p-3 rounded border border-blue-200 dark:border-blue-800 text-sm">
                    <ul className="list-disc pl-4 space-y-1">
                      {response.hints.map((hint: string, idx: number) => (
                        <li key={idx}>{hint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-textMuted">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
            <p className="text-sm font-medium text-center">{t('sandbox.noResponseYet')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
