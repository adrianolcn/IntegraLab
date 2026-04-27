import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ConceptText from './ConceptText';

interface ContentTypeLabProps {
  glossaryJson?: string;
}

export default function ContentTypeLab({ glossaryJson }: ContentTypeLabProps) {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState<'perfect' | 'no_content_type' | 'wrong_content_type' | 'no_auth'>('perfect');

  const scenarios = {
    perfect: {
      label: t('lab.perfect.label', 'Requisição Perfeita'),
      request: `POST /api/users HTTP/1.1\nContent-Type: application/json\nAuthorization: Bearer xyz123\n\n{\n  "name": "Adrian"\n}`,
      responseCode: '201 Created',
      responseColor: 'text-emerald-500',
      explanation: t('lab.perfect.exp', 'O {{Servidor}} olhou para o {{Header}} `Content-Type`, viu que era um {{JSON}}, preparou o interpretador correto, leu o {{Body}} e salvou os dados. Tudo certo!')
    },
    no_content_type: {
      label: t('lab.no_content_type.label', 'Esquecer Content-Type'),
      request: `POST /api/users HTTP/1.1\nAuthorization: Bearer xyz123\n\n{\n  "name": "Adrian"\n}`,
      responseCode: '415 Unsupported Media Type',
      responseColor: 'text-orange-500',
      explanation: t('lab.no_content_type.exp', 'Apesar do {{Body}} ser um {{JSON}} válido, a API não tem obrigação de adivinhar. O erro {{415 Unsupported Media Type}} indica que o {{Servidor}} se recusou a processar o formato desconhecido.')
    },
    wrong_content_type: {
      label: t('lab.wrong_content_type.label', 'Mentir no Content-Type'),
      request: `POST /api/users HTTP/1.1\nContent-Type: application/xml\nAuthorization: Bearer xyz123\n\n{\n  "name": "Adrian"\n}`,
      responseCode: '400 Bad Request',
      responseColor: 'text-red-500',
      explanation: t('lab.wrong_content_type.exp', 'Você prometeu que enviaria XML no {{Header}}, mas mandou um {{JSON}} no {{Body}}. O parser de XML do {{Servidor}} quebrou tentando ler chaves e gerou um {{400 Bad Request}}.')
    },
    no_auth: {
      label: t('lab.no_auth.label', 'Esquecer Authorization'),
      request: `POST /api/users HTTP/1.1\nContent-Type: application/json\n\n{\n  "name": "Adrian"\n}`,
      responseCode: '401 Unauthorized',
      responseColor: 'text-red-500',
      explanation: t('lab.no_auth.exp', 'Você não mandou o {{Bearer Token}} no {{Header}} `Authorization`. A API barrou o {{Request}} antes mesmo de olhar para o {{Body}}.')
    }
  };

  const active = scenarios[scenario];

  return (
    <div className="my-8 bg-surface border border-borderSubtle rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-100 dark:bg-slate-900 border-b border-borderSubtle flex flex-wrap gap-2">
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
              scenario === key 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400'
            }`}
          >
            {scenarios[key].label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 w-full bg-slate-900 rounded-lg p-4 font-mono text-sm shadow-inner overflow-x-auto relative">
          <span className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">
            Request do Cliente
          </span>
          <pre className="text-slate-300 mt-2">{active.request}</pre>
        </div>

        <div className="w-full md:w-16 flex justify-center items-center">
          <svg className="w-8 h-8 text-slate-400 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

        <div className="flex-1 w-full">
          <div className="bg-surface border border-borderSubtle rounded-lg p-5">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Resultado do Servidor
            </span>
            <div className={`font-mono text-2xl font-black mb-4 ${active.responseColor}`}>
              {active.responseCode}
            </div>
            <p className="text-sm text-textMain/90 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-4 rounded border border-borderSubtle">
              <ConceptText text={active.explanation} glossaryJson={glossaryJson} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
