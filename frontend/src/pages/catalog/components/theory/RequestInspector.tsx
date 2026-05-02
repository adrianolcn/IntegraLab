import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ConceptText from './ConceptText';

interface RequestInspectorProps {
  glossaryJson?: string;
}

export default function RequestInspector({ glossaryJson }: RequestInspectorProps) {
  const { t } = useTranslation();
  const [active, setActive] = useState<'method' | 'path' | 'query' | 'headers' | 'body' | null>(null);

  const hints: Record<string, string> = {
    method: t('ri.method', 'Se estourar um erro {{405 Method Not Allowed}}, foi aqui que você errou. Tente trocar de POST para GET ou PUT.'),
    path: t('ri.path', 'Erros de digitação aqui geram {{404 Not Found}}. A rota inteira `/api/v1/users` precisa bater com a documentação da {{API}}.'),
    query: t('ri.query', 'Variáveis anexadas na URL para filtrar resultados. Um erro aqui pode trazer dados não desejados ou gerar um {{400 Bad Request}}.'),
    headers: t('ri.headers', 'Metadados logísticos. Se o `Authorization` estiver ausente ou inválido, gera {{401 Unauthorized}}. Se faltar `Content-Type`, gera {{415 Unsupported Media Type}}.'),
    body: t('ri.body', 'A carta real em formato {{JSON}}. Um parêntese ou aspa sobrando quebra o json e gera {{400 Bad Request}}. Valores inválidos (ex: saldo = -100) geram {{422 Unprocessable Entity}}.')
  };

  return (
    <div className="my-8 bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700 flex flex-col md:flex-row">
      <div className="min-w-0 flex-1 break-words p-6 font-mono text-sm leading-loose sm:text-base md:p-8">
        <div className="flex flex-wrap items-center">
          <span 
            onMouseEnter={() => setActive('method')}
            className={`cursor-pointer transition-colors px-1 rounded ${active === 'method' ? 'bg-pink-500/30 text-pink-300' : 'text-pink-400 hover:bg-slate-800'}`}
          >
            POST
          </span>
          <span className="text-slate-500"> </span>
          <span 
            onMouseEnter={() => setActive('path')}
            className={`cursor-pointer break-all transition-colors px-1 rounded ${active === 'path' ? 'bg-sky-500/30 text-sky-300' : 'text-sky-400 hover:bg-slate-800'}`}
          >
            /api/v1/users
          </span>
          <span 
            onMouseEnter={() => setActive('query')}
            className={`cursor-pointer transition-colors px-1 rounded ${active === 'query' ? 'bg-yellow-500/30 text-yellow-300' : 'text-yellow-400 hover:bg-slate-800'}`}
          >
            ?role=admin
          </span>
          <span className="text-slate-500"> HTTP/1.1</span>
        </div>
        
        <div className="mt-2 text-slate-300">
          <div 
            onMouseEnter={() => setActive('headers')}
            className={`cursor-pointer transition-colors px-2 py-1 rounded -ml-2 border-l-2 ${active === 'headers' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200' : 'border-transparent hover:border-slate-700'}`}
          >
            Host: api.integralab.com<br/>
            Authorization: Bearer abc.def.ghi<br/>
            Content-Type: application/json
          </div>
        </div>

        <div className="mt-4 text-slate-300">
          <div 
            onMouseEnter={() => setActive('body')}
            className={`cursor-pointer transition-colors px-2 py-1 rounded -ml-2 border-l-2 ${active === 'body' ? 'bg-indigo-500/10 border-indigo-500 text-indigo-200' : 'border-transparent hover:border-slate-700'}`}
          >
            {`{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "active": true
}`}
          </div>
        </div>
      </div>

      <div className="w-full min-w-0 bg-slate-800 border-l border-slate-700 p-6 flex min-h-[200px] flex-col justify-center md:w-[320px]">
        {active ? (
          <div className="animate-fadeIn">
            <span className={`inline-block rounded px-2 py-1 text-xs font-bold uppercase tracking-[0.08em] mb-3 ${
              active === 'method' ? 'bg-pink-900/50 text-pink-400' :
              active === 'path' ? 'bg-sky-900/50 text-sky-400' :
              active === 'query' ? 'bg-yellow-900/50 text-yellow-400' :
              active === 'headers' ? 'bg-emerald-900/50 text-emerald-400' :
              'bg-indigo-900/50 text-indigo-400'
            }`}>
              Analisando {active}
            </span>
            <p className="text-slate-300 text-sm leading-relaxed">
              <ConceptText text={hints[active]} glossaryJson={glossaryJson} />
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 text-center gap-3">
            <svg className="w-8 h-8 opacity-50 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="text-sm font-medium">Passe o mouse no código para inspecionar</span>
          </div>
        )}
      </div>
    </div>
  );
}
