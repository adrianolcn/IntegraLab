import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ConceptText from './ConceptText';

interface SecureEndpointLabProps {
  glossaryJson?: string;
}

export default function SecureEndpointLab({ glossaryJson }: SecureEndpointLabProps) {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState<'no_token' | 'invalid_token' | 'valid_token' | 'forbidden'>('valid_token');

  const scenarios = {
    no_token: {
      label: t('sel.no_token.label', 'Sem Token'),
      req: `GET /secure HTTP/1.1\nHost: api.integralab.com\n// Nenhum header de Authorization...`,
      code: '401 Unauthorized',
      color: 'text-orange-500',
      border: 'border-orange-500',
      desc: t('sel.no_token.desc', 'A porta nem abre. Como não há {{Header}} `Authorization`, o {{Servidor}} imediatamente recusa o acesso anônimo ao {{Endpoint protegido}}.')
    },
    invalid_token: {
      label: t('sel.invalid.label', 'Token Inválido'),
      req: `GET /secure HTTP/1.1\nHost: api.integralab.com\nAuthorization: Bearer abcd123_modificado`,
      code: '401 Unauthorized',
      color: 'text-orange-500',
      border: 'border-orange-500',
      desc: t('sel.invalid.desc', 'A porta é batida na sua cara. O {{Servidor}} notou que o {{Token}} foi forjado, expirou ou não possui a assinatura criptográfica original do {{JWT}}.')
    },
    valid_token: {
      label: t('sel.valid.label', 'Token Válido (Sucesso)'),
      req: `GET /secure HTTP/1.1\nHost: api.integralab.com\nAuthorization: Bearer demo-token`,
      code: '200 OK',
      color: 'text-emerald-500',
      border: 'border-emerald-500',
      desc: t('sel.valid.desc', 'Acesso VIP! O {{Servidor}} verificou a assinatura, confirmou quem é você e te entregou a {{Response}} com os dados sigilosos solicitados.')
    },
    forbidden: {
      label: t('sel.forbidden.label', 'Token Válido (Sem Permissão)'),
      req: `GET /admin-dashboard HTTP/1.1\nHost: api.integralab.com\nAuthorization: Bearer demo-token`,
      code: '403 Forbidden',
      color: 'text-rose-600',
      border: 'border-rose-600',
      desc: t('sel.forbidden.desc', 'O segurança sabe que você é um morador do prédio ({{Autenticação}} 200 OK), mas você tentou abrir a porta da casa de máquinas do elevador ({{Autorização}} falhou).')
    }
  };

  const active = scenarios[scenario];

  return (
    <div className="my-8 bg-surface border border-borderSubtle rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-100 dark:bg-slate-900 border-b border-borderSubtle grid grid-cols-2 md:grid-cols-4 gap-2">
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            className={`px-2 py-2 rounded text-xs font-bold transition-all h-full ${
              scenario === key 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
            }`}
          >
            {scenarios[key].label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
        {/* Request */}
        <div className="flex-1 bg-slate-900 rounded-lg p-4 font-mono text-xs sm:text-sm shadow-inner relative">
          <span className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">
            Request
          </span>
          <pre className="text-slate-300 mt-4 whitespace-pre-wrap">{active.req}</pre>
        </div>

        {/* Visual Connector */}
        <div className="flex items-center justify-center">
          <svg className="w-8 h-8 text-slate-300 dark:text-slate-600 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </div>

        {/* Response */}
        <div className={`flex-1 bg-surface border-2 rounded-lg p-5 flex flex-col justify-center ${active.border} transition-colors`}>
          <span className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-textMuted">
            Response
          </span>
          <div className={`font-mono text-2xl font-black mb-3 ${active.color}`}>
            {active.code}
          </div>
          <p className="text-sm text-textMain/90 leading-relaxed">
            <ConceptText text={active.desc} glossaryJson={glossaryJson} />
          </p>
        </div>
      </div>
    </div>
  );
}
