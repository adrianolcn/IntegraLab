import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ConceptText from './ConceptText';
import FlowControls from './FlowControls';

interface DebugFlowPlayerProps {
  glossaryJson?: string;
}

export default function DebugFlowPlayer({ glossaryJson }: DebugFlowPlayerProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: t('debug.s1.title', 'Identificar o Status Code'),
      desc: t('debug.s1.desc', 'Comece sempre pelo {{Status Code}}. Ele diz se o problema é do Cliente (4xx) ou do Servidor (5xx).'),
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: t('debug.s2.title', 'Ler Response Body'),
      desc: t('debug.s2.desc', 'A {{Response}} costuma trazer um {{JSON}} com a mensagem de erro específica. Não ignore o que a API está tentando te dizer!'),
      icon: 'M4 6h16M4 10h16M4 14h16M4 18h16'
    },
    {
      title: t('debug.s3.title', 'Conferir Método HTTP'),
      desc: t('debug.s3.desc', 'Você tentou fazer um GET onde deveria ser POST? Isso gera um erro {{405 Method Not Allowed}}.'),
      icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
    },
    {
      title: t('debug.s4.title', 'Conferir Endpoint/Path'),
      desc: t('debug.s4.desc', 'Erros de digitação no {{Path}} (ex: `/usrs` em vez de `/users`) retornam {{404 Not Found}}.'),
      icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
    },
    {
      title: t('debug.s5.title', 'Conferir Query Params'),
      desc: t('debug.s5.desc', 'Parâmetros de busca ({{Query Params}}) estão corretos na URL? Ex: `?page=1&sort=asc`.'),
      icon: 'M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: t('debug.s6.title', 'Conferir Headers'),
      desc: t('debug.s6.desc', 'Os metadados como {{Content-Type}} estão presentes? Esquecer isso costuma gerar um erro {{415 Unsupported Media Type}}.'),
      icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
    },
    {
      title: t('debug.s7.title', 'Conferir Body/Payload'),
      desc: t('debug.s7.desc', 'Seu {{JSON}} no {{Body}} tem erros de sintaxe ({{400 Bad Request}}) ou viola regras de negócio ({{422 Unprocessable Entity}})?'),
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
    },
    {
      title: t('debug.s8.title', 'Conferir Authorization'),
      desc: t('debug.s8.desc', 'O {{Bearer Token}} foi enviado no {{Header}} de {{Authorization}}? Se não, espere um {{401 Unauthorized}}.'),
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
    },
    {
      title: t('debug.s9.title', 'Verificar Logs/Correlation ID'),
      desc: t('debug.s9.desc', 'Se for um {{500 Internal Server Error}}, copie o {{Correlation ID}} e busque os rastros no {{Log}} do servidor.'),
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      title: t('debug.s10.title', 'Formular Hipótese'),
      desc: t('debug.s10.desc', 'Junte as evidências (Status + Mensagem + Logs) e defina qual o componente que está falhando no {{Debug}}.'),
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    },
    {
      title: t('debug.s11.title', 'Corrigir e Testar Novamente'),
      desc: t('debug.s11.desc', 'Altere a {{Request}} e dispare. Se o erro mudar, você está progredindo no {{Debug}}!'),
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
    }
  ];
  const totalSteps = steps.length;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (step < totalSteps - 1) {
          setStep(s => s + 1);
        } else {
          setIsPlaying(false);
        }
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, totalSteps]);

  const togglePlay = () => {
    if (step === totalSteps - 1) setStep(0);
    setIsPlaying(!isPlaying);
  };

  const current = steps[step];

  return (
    <div className="my-8 bg-surface border border-borderSubtle rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="h-64 bg-slate-900 p-6 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Step Counter Bubble */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-2 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
          <span className="text-white font-black">{step + 1}</span>
          <span className="text-slate-400 text-xs mt-1 absolute -bottom-4">/ {totalSteps}</span>
        </div>

        {/* Central Icon */}
        <div className="w-24 h-24 bg-indigo-900/50 rounded-full flex items-center justify-center border border-indigo-500/50 mb-6 transition-all duration-500 ease-in-out transform scale-100">
          <svg className="w-12 h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={current.icon} />
          </svg>
        </div>

        {/* Path/Timeline indicators */}
        <div className="w-full max-w-md flex justify-between absolute bottom-4 px-4 opacity-50">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 mx-0.5 rounded-full ${i <= step ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
        <FlowControls 
          isPlaying={isPlaying}
          canGoBack={step > 0}
          canGoForward={step < totalSteps - 1}
          onBack={() => { setIsPlaying(false); setStep(Math.max(0, step - 1)); }}
          onNext={() => { setIsPlaying(false); setStep(Math.min(totalSteps - 1, step + 1)); }}
          onPlayPause={togglePlay}
          onRestart={() => { setIsPlaying(false); setStep(0); }}
          showRestart={step === totalSteps - 1}
        />

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-black text-textMain mb-2">
            {current.title}
          </h3>
          <p className="text-textMain/80 leading-relaxed text-sm md:text-base">
            <ConceptText text={current.desc} glossaryJson={glossaryJson} />
          </p>
        </div>
      </div>
    </div>
  );
}
