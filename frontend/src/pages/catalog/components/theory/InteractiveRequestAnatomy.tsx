import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ConceptText from './ConceptText';

interface InteractiveRequestAnatomyProps {
  glossaryJson?: string;
}

export default function InteractiveRequestAnatomy({ glossaryJson }: InteractiveRequestAnatomyProps) {
  const { t } = useTranslation();
  const [activePart, setActivePart] = useState<'method' | 'path' | 'headers' | 'body' | 'response' | null>('method');

  const parts = {
    method: {
      title: t('anatomy.method.title', 'Método HTTP'),
      desc: t('anatomy.method.desc', 'O verbo de ação, como {{POST}} ou {{GET}}. Define qual operação o {{Cliente}} deseja realizar.'),
      error: t('anatomy.method.error', 'Usar um método errado pode gerar um {{405 Method Not Allowed}}.')
    },
    path: {
      title: t('anatomy.path.title', 'Endpoint (Caminho)'),
      desc: t('anatomy.path.desc', 'O endereço na URL para onde a requisição vai, ex: `/api/users`. Define o recurso alvo.'),
      error: t('anatomy.path.error', 'Errar o path gera o famoso erro {{404 Not Found}}.')
    },
    headers: {
      title: t('anatomy.headers.title', 'Headers (Cabeçalhos)'),
      desc: t('anatomy.headers.desc', 'Os metadados invisíveis que acompanham o {{Request}}. Servem para enviar {{Autenticação}} e avisar o {{Content-Type}}.'),
      error: t('anatomy.headers.error', 'Esquecer o token de auth gera {{401 Unauthorized}}.')
    },
    body: {
      title: t('anatomy.body.title', 'Body (Corpo)'),
      desc: t('anatomy.body.desc', 'O {{Payload}} principal. Onde os dados grandes (como um {{JSON}} de formulário) viajam.'),
      error: t('anatomy.body.error', 'Errar a sintaxe JSON aqui dentro gera {{400 Bad Request}}.')
    },
    response: {
      title: t('anatomy.response.title', 'Response (A Resposta)'),
      desc: t('anatomy.response.desc', 'O que o servidor devolve. Inclui um {{Status Code}} (ex: 201 Created) e muitas vezes um próprio Body com o resultado da ação.'),
      error: t('anatomy.response.error', 'Não verificar o status code e assumir que tudo deu certo é o maior erro de frontends iniciantes.')
    }
  };

  return (
    <div className="my-8 bg-surface border border-borderSubtle rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
      {/* Code Editor Side */}
      <div className="flex-1 overflow-hidden bg-slate-900 p-6 font-mono text-sm leading-relaxed text-slate-300">
        <div className="mb-4 text-xs text-slate-500 select-none">
          {t('anatomy.hint', 'Clique nas partes do código para entender:')}
        </div>
        
        {/* Request Line */}
        <div className="flex flex-wrap items-center gap-2 cursor-pointer">
          <span 
            className={`font-bold transition-colors ${activePart === 'method' ? 'text-blue-400 bg-blue-400/20 px-1 rounded' : 'text-emerald-400 hover:bg-white/10 px-1 rounded'}`}
            onClick={() => setActivePart('method')}
          >
            POST
          </span>
          <span 
            className={`transition-colors ${activePart === 'path' ? 'text-blue-400 bg-blue-400/20 px-1 rounded' : 'text-orange-300 hover:bg-white/10 px-1 rounded'}`}
            onClick={() => setActivePart('path')}
          >
            /api/users
          </span>
          <span className="text-slate-500">HTTP/1.1</span>
        </div>

        {/* Headers */}
        <div 
          className={`mt-2 break-words pl-4 border-l-2 cursor-pointer transition-colors ${activePart === 'headers' ? 'border-purple-400 bg-purple-400/10' : 'border-slate-700 hover:bg-white/5'}`}
          onClick={() => setActivePart('headers')}
        >
          <div className="text-purple-300">Host: <span className="text-slate-400">api.integralab.com</span></div>
          <div className="text-purple-300">Content-Type: <span className="text-slate-400">application/json</span></div>
          <div className="text-purple-300">Authorization: <span className="text-slate-400">Bearer abc...</span></div>
        </div>

        {/* Empty Line separating Headers from Body */}
        <div className="h-4"></div>

        {/* Body */}
        <div 
          className={`cursor-pointer transition-colors p-2 rounded ${activePart === 'body' ? 'bg-amber-400/10 border border-amber-400/30' : 'hover:bg-white/5 border border-transparent'}`}
          onClick={() => setActivePart('body')}
        >
          <div className="text-amber-200">{"{"}</div>
          <div className="pl-4 text-amber-200"><span className="text-pink-300">"name"</span>: <span className="text-green-300">"Adrian"</span>,</div>
          <div className="pl-4 text-amber-200"><span className="text-pink-300">"role"</span>: <span className="text-green-300">"admin"</span></div>
          <div className="text-amber-200">{"}"}</div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-slate-700/50 relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-[11px] text-slate-500 tracking-[0.06em] select-none">
            {t('anatomy.serverProcess', 'Servidor Processa...')}
          </span>
        </div>

        {/* Response */}
        <div 
          className={`cursor-pointer transition-colors p-2 rounded ${activePart === 'response' ? 'bg-emerald-400/10 border border-emerald-400/30' : 'hover:bg-white/5 border border-transparent'}`}
          onClick={() => setActivePart('response')}
        >
          <div className="flex gap-2 mb-2">
            <span className="text-slate-500">HTTP/1.1</span>
            <span className="text-emerald-400 font-bold">201 Created</span>
          </div>
          <div className="text-purple-300 pl-4 border-l-2 border-slate-700">Location: <span className="text-slate-400">/api/users/99</span></div>
          <div className="mt-2 text-amber-200">{"{"}</div>
          <div className="pl-4 text-amber-200"><span className="text-pink-300">"id"</span>: <span className="text-orange-300">99</span></div>
          <div className="text-amber-200">{"}"}</div>
        </div>

      </div>

      {/* Explanation Side */}
      <div className="flex-1 p-6 md:p-8 bg-surface">
        {activePart ? (
          <div className="h-full flex flex-col justify-center animate-fadeIn">
            <h3 className="text-2xl font-black text-textMain mb-4">
              {parts[activePart].title}
            </h3>
            <div className="space-y-6">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">O que é?</span>
                <p className="text-textMain leading-relaxed">
                  <ConceptText text={parts[activePart].desc} glossaryJson={glossaryJson} />
                </p>
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/50 rounded-lg p-4">
                <span className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 mb-1 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  Erro Comum
                </span>
                <p className="text-sm text-rose-900 dark:text-rose-200">
                  <ConceptText text={parts[activePart].error} glossaryJson={glossaryJson} />
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-textMuted text-center opacity-70">
            <p>{t('anatomy.hintSelect', 'Selecione uma parte do código à esquerda para ver a explicação detalhada.')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
