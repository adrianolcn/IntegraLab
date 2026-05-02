import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';
import FlowControls from './FlowControls';

export interface FlowStep {
  id: string;
  title: string;
  description: string;
  details: string;
  importance: string;
  example: string;
  relatedTerms: string[];
  nextStepIds: string[];
}

interface InteractiveFlowPlayerProps {
  flowJson: string;
  glossaryJson?: string;
}

type ToneKey = 'sky' | 'amber' | 'emerald' | 'violet';
type PhaseKey = 'request' | 'processing' | 'response';

function stripStepNumber(title: string) {
  return title.replace(/^\d+\.\s*/, '');
}

function resolveStepVisual(stepId: string): {
  iconPath: string;
  tone: ToneKey;
  phase: PhaseKey;
} {
  switch (stepId) {
    case 'client':
      return {
        iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        tone: 'sky',
        phase: 'request'
      };
    case 'request':
      return {
        iconPath: 'M8 9l4-4 4 4m0 6l-4 4-4-4M5 12h14',
        tone: 'amber',
        phase: 'request'
      };
    case 'endpoint':
      return {
        iconPath: 'M10 14L21 3m-6 0h6v6M5 10H4a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2v-1',
        tone: 'amber',
        phase: 'request'
      };
    case 'api':
      return {
        iconPath: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
        tone: 'emerald',
        phase: 'processing'
      };
    case 'server':
      return {
        iconPath: 'M4 6h16M4 12h16M4 18h16',
        tone: 'emerald',
        phase: 'processing'
      };
    case 'db':
      return {
        iconPath: 'M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m-16 0v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7m-16 5c0 2.21 3.582 4 8 4s8-1.79 8-4',
        tone: 'emerald',
        phase: 'processing'
      };
    case 'response':
      return {
        iconPath: 'M16 15l4-4m0 0l-4-4m4 4H8m-4 0H4m0 0l4 4m-4-4l4-4',
        tone: 'violet',
        phase: 'response'
      };
    case 'interface':
      return {
        iconPath: 'M4 6h16v10H4zM8 20h8',
        tone: 'violet',
        phase: 'response'
      };
    default:
      return {
        iconPath: 'M12 4v16m8-8H4',
        tone: 'sky',
        phase: 'request'
      };
  }
}

export default function InteractiveFlowPlayer({ flowJson, glossaryJson }: InteractiveFlowPlayerProps) {
  const { t } = useTranslation();
  const [steps, setSteps] = useState<FlowStep[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    try {
      const parsed = JSON.parse(flowJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setSteps(parsed);
        setCurrentIndex(0);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Failed to parse interactive flow', error);
    }
  }, [flowJson]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPlaying && steps.length > 0) {
      timer = setTimeout(() => {
        setCurrentIndex((previous) => {
          if (previous >= steps.length - 1) {
            setIsPlaying(false);
            return previous;
          }

          return previous + 1;
        });
      }, 3600);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, steps.length]);

  if (steps.length === 0) {
    return null;
  }

  const currentStep = steps[currentIndex];
  const currentVisual = resolveStepVisual(currentStep.id);
  const responseStartIndex = steps.findIndex((step) => step.id === 'response');
  const safeResponseStartIndex = responseStartIndex >= 0 ? responseStartIndex : Math.max(steps.length - 2, 1);
  const currentPhase = currentIndex >= safeResponseStartIndex ? 'response' : 'request';
  const progressPercent = steps.length > 1 ? (currentIndex / (steps.length - 1)) * 100 : 100;
  const nextSteps = currentStep.nextStepIds
    .map((nextStepId) => steps.find((step) => step.id === nextStepId))
    .filter((step): step is FlowStep => Boolean(step));

  const toneClasses = {
    sky: {
      badge: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
      iconSurface: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
      cardActive: 'border-sky-400/80 bg-sky-50 dark:bg-sky-500/10 shadow-[0_18px_40px_-24px_rgba(14,165,233,0.8)]',
      ring: 'ring-sky-500/30',
      progress: 'from-sky-500 via-indigo-500 to-emerald-500',
      pulse: 'bg-sky-500'
    },
    amber: {
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
      iconSurface: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
      cardActive: 'border-amber-400/80 bg-amber-50 dark:bg-amber-500/10 shadow-[0_18px_40px_-24px_rgba(245,158,11,0.8)]',
      ring: 'ring-amber-500/30',
      progress: 'from-sky-500 via-amber-500 to-emerald-500',
      pulse: 'bg-amber-500'
    },
    emerald: {
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
      iconSurface: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
      cardActive: 'border-emerald-400/80 bg-emerald-50 dark:bg-emerald-500/10 shadow-[0_18px_40px_-24px_rgba(16,185,129,0.8)]',
      ring: 'ring-emerald-500/30',
      progress: 'from-amber-500 via-emerald-500 to-violet-500',
      pulse: 'bg-emerald-500'
    },
    violet: {
      badge: 'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300',
      iconSurface: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
      cardActive: 'border-violet-400/80 bg-violet-50 dark:bg-violet-500/10 shadow-[0_18px_40px_-24px_rgba(139,92,246,0.8)]',
      ring: 'ring-violet-500/30',
      progress: 'from-emerald-500 via-violet-500 to-fuchsia-500',
      pulse: 'bg-violet-500'
    }
  } as const;

  const controlsLabels = {
    play: t('flow.run', 'Executar fluxo'),
    pause: t('flow.pause', 'Pausar'),
    back: t('flow.previousStep', 'Passo anterior'),
    next: t('flow.nextStep', 'Próximo passo'),
    restart: t('flow.restart', 'Reiniciar')
  };

  const currentTone = toneClasses[currentVisual.tone];

  const handleNext = () => {
    setIsPlaying(false);
    if (currentIndex < steps.length - 1) {
      setCurrentIndex((value) => value + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentIndex > 0) {
      setCurrentIndex((value) => value - 1);
    }
  };

  const handlePlayPause = () => {
    if (currentIndex >= steps.length - 1) {
      setCurrentIndex(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((value) => !value);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="mb-12 overflow-hidden rounded-2xl border border-borderSubtle bg-surface shadow-xl">
      <div className="border-b border-borderSubtle bg-slate-50/90 px-5 py-5 dark:bg-slate-900/70 sm:px-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm dark:bg-indigo-500/15 dark:text-indigo-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-indigo-500 dark:text-indigo-300">
                {t('interactiveFlow.kicker', 'Fluxo guiado')}
              </p>
              <h3 className="mt-1 text-2xl font-black text-textMain">
                {t('interactiveFlow.title', 'O ciclo Request e Response')}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-textMain/75">
                {t(
                  'interactiveFlow.subtitle',
                  'Avance etapa por etapa e acompanhe como a mensagem sai do cliente, passa pela API e volta pronta para a interface.'
                )}
              </p>
            </div>
          </div>

          <FlowControls
            isPlaying={isPlaying}
            canGoBack={currentIndex > 0}
            canGoForward={currentIndex < steps.length - 1}
            onBack={handlePrev}
            onNext={handleNext}
            onPlayPause={handlePlayPause}
            onRestart={handleRestart}
            showRestart={currentIndex >= steps.length - 1}
            labels={controlsLabels}
          />
        </div>
      </div>

      <div className="border-b border-borderSubtle bg-slate-50/70 px-5 py-5 dark:bg-slate-950/70 sm:px-6">
        <div className="hidden flex-wrap items-center gap-2 text-xs font-bold text-textMuted xl:flex">
          {steps.map((step, index) => (
            <div key={`${step.id}-chain`} className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 ${toneClasses[resolveStepVisual(step.id).tone].badge}`}>
                {stripStepNumber(step.title)}
              </span>
              {index < steps.length - 1 && (
                <svg className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div
          className="mt-0 grid grid-cols-1 gap-3 md:mt-5 md:[grid-template-columns:repeat(auto-fit,minmax(240px,1fr))] 2xl:[grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]"
        >
          {steps.map((step, index) => {
            const visual = resolveStepVisual(step.id);
            const tone = toneClasses[visual.tone];
            const isCurrent = index === currentIndex;
            const isCompleted = index < currentIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`flex h-full min-h-[180px] flex-col rounded-2xl border p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 ${tone.ring} ${
                  isCurrent
                    ? tone.cardActive
                    : isCompleted
                      ? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80'
                      : 'border-slate-200/80 bg-white/80 opacity-80 hover:opacity-100 dark:border-slate-800 dark:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone.iconSurface}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={visual.iconPath} />
                    </svg>
                  </div>

                  <span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${
                    isCurrent
                      ? tone.badge
                      : isCompleted
                        ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {isCurrent
                      ? t('interactiveFlow.currentState', 'Agora')
                      : isCompleted
                        ? t('interactiveFlow.completedState', 'Concluído')
                      : t('interactiveFlow.upcomingState', 'Próxima')}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-textMuted">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.06em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {t('interactiveFlow.stepShort', 'Etapa')} {index + 1}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold tracking-[0.02em] text-slate-600 dark:bg-slate-800 dark:text-slate-300 break-words">
                    {visual.phase === 'request'
                      ? t('interactiveFlow.requestPhase', 'Request')
                      : visual.phase === 'processing'
                        ? t('interactiveFlow.processingPhase', 'Processamento')
                        : t('interactiveFlow.responsePhase', 'Response')}
                  </span>
                </div>

                <h4 className="mt-3 min-h-[3.5rem] text-base font-black leading-snug text-textMain sm:text-[17px]">
                  {stripStepNumber(step.title)}
                </h4>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-textMain/70">
                  {step.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-borderSubtle bg-white/90 p-4 shadow-sm dark:bg-slate-900/80">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-textMuted">
                {currentPhase === 'request'
                  ? t('interactiveFlow.requestLaneTitle', 'Trilha da Request')
                  : t('interactiveFlow.responseLaneTitle', 'Trilha da Response')}
              </p>
              <h4 className="mt-1 text-lg font-black text-textMain">
                {currentPhase === 'request'
                  ? t('interactiveFlow.requestLaneLead', 'A pergunta está entrando no sistema.')
                  : t('interactiveFlow.responseLaneLead', 'A resposta está voltando para a interface.')}
              </h4>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-textMain/70">
                {currentPhase === 'request'
                  ? t(
                      'interactiveFlow.requestLaneDescription',
                      'Primeiro o cliente monta a intenção, escolhe o endpoint e entrega a mensagem para a API validar e processar.'
                    )
                  : t(
                      'interactiveFlow.responseLaneDescription',
                      'Depois do processamento, o servidor monta a resposta HTTP e a interface traduz o resultado técnico em algo visual para a pessoa usuária.'
                    )}
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-borderSubtle bg-slate-50 px-4 py-3 text-left dark:bg-slate-950/60 lg:text-right">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-textMuted">
                {t('interactiveFlow.stepCounterLabel', 'Progresso')}
              </p>
              <p className="mt-1 text-lg font-black text-textMain">
                {t('interactiveFlow.stepCounter', {
                  defaultValue: 'Etapa {{current}} de {{total}}',
                  current: currentIndex + 1,
                  total: steps.length
                })}
              </p>
              <p className="text-sm text-textMain/70">
                {stripStepNumber(currentStep.title)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="relative h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${currentTone.progress} transition-all duration-500`}
                style={{ width: `${Math.max(progressPercent, 8)}%` }}
              />
              <div
                className={`absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-4 border-white shadow-lg transition-all duration-500 dark:border-slate-950 ${currentTone.pulse}`}
                style={{ left: `calc(${progressPercent}% - 12px)` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-indigo-500 dark:text-indigo-300">
                {t('interactiveFlow.activeStageLabel', 'Etapa ativa')}
              </p>
              <h2 className="mt-2 text-3xl font-black text-textMain">
                {stripStepNumber(currentStep.title)}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-textMain/80">
                <ConceptText text={currentStep.description} glossaryJson={glossaryJson} />
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-borderSubtle bg-slate-50/80 p-5 dark:bg-slate-900/60">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-textMuted">
                  {t('interactiveFlow.whatHappensTitle', 'O que acontece aqui?')}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-textMain/85">
                  <ConceptText text={currentStep.details} glossaryJson={glossaryJson} />
                </p>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/80 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-indigo-600 dark:text-indigo-300">
                  {t('interactiveFlow.whyMattersTitle', 'Por que isso importa?')}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-indigo-950 dark:text-indigo-100/90">
                  <ConceptText text={currentStep.importance} glossaryJson={glossaryJson} />
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner dark:border-slate-800 dark:bg-[#141a2f]">
              <div className="border-b border-slate-200 bg-slate-200/80 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                {t('interactiveFlow.exampleTitle', 'Exemplo prático')}
              </div>
              <div className="p-4">
                <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-800 dark:text-emerald-300">
                  {currentStep.example}
                </pre>
              </div>
            </div>

            <div className="rounded-2xl border border-borderSubtle bg-white p-5 shadow-sm dark:bg-slate-900/70">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-textMuted">
                {t('interactiveFlow.relatedTermsTitle', 'Termos relacionados')}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {currentStep.relatedTerms.map((term) => (
                  <span key={term} className="rounded-full border border-borderSubtle bg-slate-50 px-3 py-1.5 text-xs font-semibold text-textMain dark:bg-slate-950/60">
                    <ConceptText text={`{{${term}}}`} glossaryJson={glossaryJson} />
                  </span>
                ))}
              </div>
            </div>

            {nextSteps.length > 0 && (
              <div className="rounded-2xl border border-borderSubtle bg-slate-50/90 p-5 dark:bg-slate-900/60">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-textMuted">
                  {t('interactiveFlow.nextStepsTitle', 'Próximos checkpoints')}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {nextSteps.map((step) => (
                    <span key={step.id} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-textMain shadow-sm dark:bg-slate-950/70">
                      {stripStepNumber(step.title)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
