import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ConceptText from './ConceptText';
import FlowControls from './FlowControls';

interface AuthFlowPlayerProps {
  glossaryJson?: string;
}

export default function AuthFlowPlayer({ glossaryJson }: AuthFlowPlayerProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: t('authflow.s1.title', 'Credenciais'),
      desc: t('authflow.s1.desc', 'O {{Cliente}} envia login e senha no {{Body}} de um {{POST}}.'),
      from: 'client', to: 'server', label: 'POST /login', activeObj: 'credentials'
    },
    {
      title: t('authflow.s2.title', 'Validação'),
      desc: t('authflow.s2.desc', 'O {{Servidor}} checa as {{Credenciais}} no banco de dados.'),
      from: 'server', to: 'server', label: 'Check DB', activeObj: 'none'
    },
    {
      title: t('authflow.s3.title', 'Emissão do Token'),
      desc: t('authflow.s3.desc', 'Aprovado! O {{Servidor}} devolve um {{Token}} (ex: {{JWT}}) na {{Response}}.'),
      from: 'server', to: 'client', label: '200 OK + Token', activeObj: 'token'
    },
    {
      title: t('authflow.s4.title', 'Armazenamento'),
      desc: t('authflow.s4.desc', 'O {{Cliente}} guarda o {{Token}} temporariamente (na memória ou cache local).'),
      from: 'client', to: 'client', label: 'Save Token', activeObj: 'none'
    },
    {
      title: t('authflow.s5.title', 'Endpoint Protegido'),
      desc: t('authflow.s5.desc', 'O {{Cliente}} quer acessar uma rota bloqueada, como `/meus-pedidos`.'),
      from: 'client', to: 'server', label: 'GET /meus-pedidos', activeObj: 'request'
    },
    {
      title: t('authflow.s6.title', 'O Header Authorization'),
      desc: t('authflow.s6.desc', 'A mágica acontece: o {{Cliente}} injeta o {{Token}} no {{Header}} `Authorization` usando o prefixo `Bearer`.'),
      from: 'client', to: 'server', label: 'Header: Bearer token...', activeObj: 'token'
    },
    {
      title: t('authflow.s7.title', 'Validação do Token'),
      desc: t('authflow.s7.desc', 'O {{Servidor}} inspeciona o {{Header}}, valida a assinatura criptográfica do {{Token}} e a data de expiração.'),
      from: 'server', to: 'server', label: 'Verify Signature', activeObj: 'none'
    },
    {
      title: t('authflow.s8.title', 'Acesso Concedido'),
      desc: t('authflow.s8.desc', 'Identidade comprovada. O {{Servidor}} envia os dados ({{Response}} 200) ou nega ({{401 Unauthorized}} / {{403 Forbidden}}).'),
      from: 'server', to: 'client', label: '200 OK + Dados', activeObj: 'data'
    }
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (step < steps.length - 1) {
          setStep(s => s + 1);
        } else {
          setIsPlaying(false);
        }
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step]);

  const togglePlay = () => {
    if (step === steps.length - 1) setStep(0);
    setIsPlaying(!isPlaying);
  };

  const current = steps[step];

  return (
    <div className="my-8 bg-surface border border-borderSubtle rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Visual Animation Area */}
      <div className="min-h-[220px] bg-slate-900 p-4 sm:p-6 flex flex-col justify-center relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 sm:gap-4 w-full max-w-xl mx-auto relative z-10 min-w-0">
          
          {/* Client Node */}
          <div className="flex shrink-0 flex-col items-center min-w-0">
            <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-lg flex items-center justify-center border-2 transition-colors ${current.from === 'client' || current.to === 'client' ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-slate-800 border-slate-700'}`}>
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <span className="mt-2 text-center text-xs font-bold text-slate-300 sm:text-sm">{t('authflow.client', 'Cliente')}</span>
          </div>

          {/* Connection Path */}
          <div className="relative mx-1 flex h-12 min-w-0 flex-1 items-center justify-center sm:mx-4">
            {/* The line */}
            <div className="absolute w-full border-t border-slate-700 border-dashed top-1/2"></div>
            
            {/* The animated payload */}
            {current.from !== current.to && (
              <div 
                className="absolute z-10 max-w-full rounded bg-amber-400 px-2.5 py-1 text-center text-[10px] font-bold leading-tight text-slate-900 transition-all duration-1000 ease-in-out sm:max-w-[200px]"
                style={{
                  left: current.from === 'client' ? '10%' : '80%',
                  transform: 'translateX(-50%)'
                }}
                title={current.label}
              >
                {current.label}
              </div>
            )}

            {/* Self processing */}
            {current.from === current.to && (
              <div className={`absolute z-10 max-w-full rounded px-2.5 py-1 text-center text-[10px] font-bold leading-tight ${current.from === 'server' ? 'right-0 bg-emerald-500 text-slate-900' : 'left-0 bg-indigo-500 text-white'}`} title={current.label}>
                {current.label}
              </div>
            )}
          </div>

          {/* Server Node */}
          <div className="flex shrink-0 flex-col items-center min-w-0">
            <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-full flex items-center justify-center border-2 transition-colors ${current.from === 'server' || current.to === 'server' ? 'bg-emerald-600 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-800 border-slate-700'}`}>
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            </div>
            <span className="mt-2 text-center text-xs font-bold text-slate-300 sm:text-sm">{t('authflow.server', 'Servidor')}</span>
          </div>

        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 flex">
        {steps.map((_, i) => (
          <div key={i} className={`flex-1 ${i <= step ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
        ))}
      </div>

      {/* Explanation Area */}
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
        
        <FlowControls 
          isPlaying={isPlaying}
          canGoBack={step > 0}
          canGoForward={step < steps.length - 1}
          onBack={() => { setIsPlaying(false); setStep(Math.max(0, step - 1)); }}
          onNext={() => { setIsPlaying(false); setStep(Math.min(steps.length - 1, step + 1)); }}
          onPlayPause={togglePlay}
          onRestart={() => { setIsPlaying(false); setStep(0); }}
          showRestart={step === steps.length - 1}
        />

        <div className="min-w-0 flex-1">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-indigo-600 dark:text-indigo-400">
            Passo {step + 1} de {steps.length}
          </div>
          <h3 className="mb-2 text-xl font-black text-textMain break-words">
            {current.title}
          </h3>
          <p className="break-words text-sm leading-relaxed text-textMain/80 md:text-base">
            <ConceptText text={current.desc} glossaryJson={glossaryJson} />
          </p>
        </div>

      </div>
    </div>
  );
}
