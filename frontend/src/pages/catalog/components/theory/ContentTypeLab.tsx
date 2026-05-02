import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import type { ReactNode } from 'react';
import ConceptText from './ConceptText';

interface ContentTypeLabProps {
  glossaryJson?: string;
}

export default function ContentTypeLab({ glossaryJson }: ContentTypeLabProps) {
  const { t } = useTranslation();
  type ScenarioKey = 'perfect' | 'no_content_type' | 'wrong_content_type' | 'no_auth';
  type AccentKey = 'emerald' | 'amber' | 'rose' | 'indigo';

  const [scenario, setScenario] = useState<ScenarioKey>('perfect');

  const scenarios: Record<ScenarioKey, {
    label: string;
    shortDescription: string;
    request: string;
    responseCode: string;
    responseColor: string;
    accent: AccentKey;
    explanation: string;
  }> = {
    perfect: {
      label: t('lab.perfect.label', 'Requisição Perfeita'),
      shortDescription: t('lab.perfect.short', 'Headers e body corretos.'),
      request: `POST /api/users HTTP/1.1\nContent-Type: application/json\nAuthorization: Bearer xyz123\n\n{\n  "name": "Adrian"\n}`,
      responseCode: '201 Created',
      responseColor: 'text-emerald-500',
      accent: 'emerald',
      explanation: t('lab.perfect.exp', 'O {{Servidor}} olhou para o {{Header}} `Content-Type`, viu que era um {{JSON}}, preparou o interpretador correto, leu o {{Body}} e salvou os dados. Tudo certo!')
    },
    no_content_type: {
      label: t('lab.no_content_type.label', 'Esquecer Content-Type'),
      shortDescription: t('lab.no_content_type.short', 'Body enviado sem informar o formato.'),
      request: `POST /api/users HTTP/1.1\nAuthorization: Bearer xyz123\n\n{\n  "name": "Adrian"\n}`,
      responseCode: '415 Unsupported Media Type',
      responseColor: 'text-orange-500',
      accent: 'amber',
      explanation: t('lab.no_content_type.exp', 'Apesar do {{Body}} ser um {{JSON}} válido, a API não tem obrigação de adivinhar. O erro {{415 Unsupported Media Type}} indica que o {{Servidor}} se recusou a processar o formato desconhecido.')
    },
    wrong_content_type: {
      label: t('lab.wrong_content_type.label', 'Mentir no Content-Type'),
      shortDescription: t('lab.wrong_content_type.short', 'Header diz uma coisa, body entrega outra.'),
      request: `POST /api/users HTTP/1.1\nContent-Type: application/xml\nAuthorization: Bearer xyz123\n\n{\n  "name": "Adrian"\n}`,
      responseCode: '400 Bad Request',
      responseColor: 'text-red-500',
      accent: 'rose',
      explanation: t('lab.wrong_content_type.exp', 'Você prometeu que enviaria XML no {{Header}}, mas mandou um {{JSON}} no {{Body}}. O parser de XML do {{Servidor}} quebrou tentando ler chaves e gerou um {{400 Bad Request}}.')
    },
    no_auth: {
      label: t('lab.no_auth.label', 'Esquecer Authorization'),
      shortDescription: t('lab.no_auth.short', 'Endpoint protegido sem token.'),
      request: `POST /api/users HTTP/1.1\nContent-Type: application/json\n\n{\n  "name": "Adrian"\n}`,
      responseCode: '401 Unauthorized',
      responseColor: 'text-red-500',
      accent: 'indigo',
      explanation: t('lab.no_auth.exp', 'Você não mandou o {{Bearer Token}} no {{Header}} `Authorization`. A API barrou o {{Request}} antes mesmo de olhar para o {{Body}}.')
    }
  };

  const scenarioOrder: ScenarioKey[] = ['perfect', 'no_content_type', 'wrong_content_type', 'no_auth'];
  const active = scenarios[scenario];

  const getStatusParts = (status: string) => {
    const [code, ...labelParts] = status.split(' ');
    return {
      code,
      label: labelParts.join(' ')
    };
  };

  const accentClasses = {
    emerald: {
      icon: 'text-emerald-600 dark:text-emerald-300',
      iconSurface: 'bg-emerald-100 dark:bg-emerald-500/15',
      active: 'border-emerald-400/80 bg-emerald-50 dark:bg-emerald-500/10 shadow-[0_14px_28px_-20px_rgba(16,185,129,0.75)]',
      ring: 'ring-emerald-500/30',
      badge: 'border-emerald-200/80 bg-emerald-50/90 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200'
    },
    amber: {
      icon: 'text-amber-600 dark:text-amber-300',
      iconSurface: 'bg-amber-100 dark:bg-amber-500/15',
      active: 'border-amber-400/80 bg-amber-50 dark:bg-amber-500/10 shadow-[0_14px_28px_-20px_rgba(245,158,11,0.75)]',
      ring: 'ring-amber-500/30',
      badge: 'border-amber-200/80 bg-amber-50/90 text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-200'
    },
    rose: {
      icon: 'text-rose-600 dark:text-rose-300',
      iconSurface: 'bg-rose-100 dark:bg-rose-500/15',
      active: 'border-rose-400/80 bg-rose-50 dark:bg-rose-500/10 shadow-[0_14px_28px_-20px_rgba(244,63,94,0.75)]',
      ring: 'ring-rose-500/30',
      badge: 'border-rose-200/80 bg-rose-50/90 text-rose-800 dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-200'
    },
    indigo: {
      icon: 'text-indigo-600 dark:text-indigo-300',
      iconSurface: 'bg-indigo-100 dark:bg-indigo-500/15',
      active: 'border-indigo-400/80 bg-indigo-50 dark:bg-indigo-500/10 shadow-[0_14px_28px_-20px_rgba(99,102,241,0.75)]',
      ring: 'ring-indigo-500/30',
      badge: 'border-indigo-200/80 bg-indigo-50/90 text-indigo-800 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-200'
    }
  } as const;

  const scenarioIcons: Record<ScenarioKey, ReactNode> = {
    perfect: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
      </svg>
    ),
    no_content_type: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
      </svg>
    ),
    wrong_content_type: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 9l6 6m0-6l-6 6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
      </svg>
    ),
    no_auth: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 11V7a4 4 0 10-8 0v4m14 0H6a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2z" />
      </svg>
    )
  };

  return (
    <div className="my-8 bg-surface border border-borderSubtle rounded-xl overflow-hidden shadow-sm">
      <div className="border-b border-borderSubtle bg-slate-50/80 dark:bg-slate-950/70 px-4 py-5 md:px-6">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-textMuted">
            {t('lab.chooseScenarioTitle', 'Escolha um cenário')}
          </p>
          <p className="mt-1 text-sm text-textMain/75">
            {t('lab.chooseScenarioDescription', 'Teste como headers e autenticação mudam a resposta da API.')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:[grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {scenarioOrder.map((key) => {
            const item = scenarios[key];
            const accent = accentClasses[item.accent];
            const isActive = scenario === key;
            const status = getStatusParts(item.responseCode);

            return (
              <button
                key={key}
                type="button"
                onClick={() => setScenario(key)}
                aria-pressed={isActive}
                className={`group flex h-full min-h-[168px] flex-col rounded-xl border px-4 py-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 ${accent.ring} ${
                  isActive
                    ? `${accent.active} border-opacity-100`
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-slate-700 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accent.iconSurface} ${accent.icon}`}>
                    {scenarioIcons[key]}
                  </div>
                  <div className={`min-w-[52px] rounded-full border px-3 py-2 text-center shadow-sm ${accent.badge}`}>
                    <div className="text-lg font-black leading-none tracking-[-0.02em]">
                      {status.code}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="mt-5 text-center text-sm font-extrabold text-textMain">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-center text-xs leading-relaxed text-textMain/70">
                    {item.shortDescription}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
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
