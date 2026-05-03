import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';
import FlowControls from './FlowControls';

interface RequestResponseCyclePlayerProps {
  glossaryJson?: string;
}

type StageId = 'client' | 'request' | 'api' | 'server' | 'response' | 'interface';

export default function RequestResponseCyclePlayer({ glossaryJson }: RequestResponseCyclePlayerProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      id: 'client-click',
      stage: 'client' as StageId,
      title: t('rrCycle.steps.clientClick.title'),
      desc: t('rrCycle.steps.clientClick.desc'),
      packet: t('rrCycle.steps.clientClick.packet'),
      actor: t('rrCycle.steps.clientClick.actor'),
      debug: t('rrCycle.steps.clientClick.debug'),
      phase: t('rrCycle.requestPhase')
    },
    {
      id: 'request-assembled',
      stage: 'request' as StageId,
      title: t('rrCycle.steps.requestAssembled.title'),
      desc: t('rrCycle.steps.requestAssembled.desc'),
      packet: t('rrCycle.steps.requestAssembled.packet'),
      actor: t('rrCycle.steps.requestAssembled.actor'),
      debug: t('rrCycle.steps.requestAssembled.debug'),
      phase: t('rrCycle.requestPhase')
    },
    {
      id: 'api-validation',
      stage: 'api' as StageId,
      title: t('rrCycle.steps.apiValidation.title'),
      desc: t('rrCycle.steps.apiValidation.desc'),
      packet: t('rrCycle.steps.apiValidation.packet'),
      actor: t('rrCycle.steps.apiValidation.actor'),
      debug: t('rrCycle.steps.apiValidation.debug'),
      phase: t('rrCycle.processingPhase')
    },
    {
      id: 'server-processing',
      stage: 'server' as StageId,
      title: t('rrCycle.steps.serverProcessing.title'),
      desc: t('rrCycle.steps.serverProcessing.desc'),
      packet: t('rrCycle.steps.serverProcessing.packet'),
      actor: t('rrCycle.steps.serverProcessing.actor'),
      debug: t('rrCycle.steps.serverProcessing.debug'),
      phase: t('rrCycle.processingPhase')
    },
    {
      id: 'response-built',
      stage: 'response' as StageId,
      title: t('rrCycle.steps.responseBuilt.title'),
      desc: t('rrCycle.steps.responseBuilt.desc'),
      packet: t('rrCycle.steps.responseBuilt.packet'),
      actor: t('rrCycle.steps.responseBuilt.actor'),
      debug: t('rrCycle.steps.responseBuilt.debug'),
      phase: t('rrCycle.responsePhase')
    },
    {
      id: 'interface-rendered',
      stage: 'interface' as StageId,
      title: t('rrCycle.steps.interfaceRendered.title'),
      desc: t('rrCycle.steps.interfaceRendered.desc'),
      packet: t('rrCycle.steps.interfaceRendered.packet'),
      actor: t('rrCycle.steps.interfaceRendered.actor'),
      debug: t('rrCycle.steps.interfaceRendered.debug'),
      phase: t('rrCycle.responsePhase')
    }
  ];

  const stageOrder: Array<{
    id: StageId;
    label: string;
    iconPath: string;
  }> = [
    {
      id: 'client',
      label: t('rrCycle.stages.client'),
      iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      id: 'request',
      label: t('rrCycle.stages.request'),
      iconPath: 'M8 9l4-4 4 4m0 6l-4 4-4-4M5 12h14'
    },
    {
      id: 'api',
      label: t('rrCycle.stages.api'),
      iconPath: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2'
    },
    {
      id: 'server',
      label: t('rrCycle.stages.server'),
      iconPath: 'M4 6h16M4 12h16M4 18h16'
    },
    {
      id: 'response',
      label: t('rrCycle.stages.response'),
      iconPath: 'M16 15l4-4m0 0l-4-4m4 4H8'
    },
    {
      id: 'interface',
      label: t('rrCycle.stages.interface'),
      iconPath: 'M4 6h16v10H4zM8 20h8'
    }
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPlaying) {
      timer = setTimeout(() => {
        if (step < steps.length - 1) {
          setStep((value) => value + 1);
        } else {
          setIsPlaying(false);
        }
      }, 3200);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, step, steps.length]);

  const current = steps[step];
  const currentStageIndex = stageOrder.findIndex((stage) => stage.id === current.stage);

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-borderSubtle bg-surface shadow-sm">
      <div className="border-b border-borderSubtle bg-slate-50/80 px-5 py-5 dark:bg-slate-950/70 md:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-500 dark:text-indigo-300">
              {t('rrCycle.kicker')}
            </p>
            <h3 className="mt-1 text-2xl font-black text-textMain">
              {t('rrCycle.title')}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-textMain/75">
              {t('rrCycle.subtitle')}
            </p>
          </div>

          <FlowControls
            isPlaying={isPlaying}
            canGoBack={step > 0}
            canGoForward={step < steps.length - 1}
            onBack={() => {
              setIsPlaying(false);
              setStep(Math.max(0, step - 1));
            }}
            onNext={() => {
              setIsPlaying(false);
              setStep(Math.min(steps.length - 1, step + 1));
            }}
            onPlayPause={() => {
              if (step === steps.length - 1) {
                setStep(0);
                setIsPlaying(true);
                return;
              }
              setIsPlaying((value) => !value);
            }}
            onRestart={() => {
              setIsPlaying(false);
              setStep(0);
            }}
            showRestart={step === steps.length - 1}
            labels={{
              play: t('flow.run'),
              pause: t('flow.pause'),
              back: t('flow.previousStep'),
              next: t('flow.nextStep'),
              restart: t('flow.restart')
            }}
          />
        </div>
      </div>

      <div className="border-b border-borderSubtle bg-slate-950 px-5 py-6 md:px-6">
        <div className="relative">
          <div className="absolute left-4 right-4 top-8 hidden border-t border-dashed border-slate-700 md:block" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 md:gap-4">
            {stageOrder.map((stage, index) => {
              const isActive = index === currentStageIndex;
              const isDone = index < currentStageIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => {
                    const matchingStepIndex = steps.findIndex((item) => item.stage === stage.id);
                    if (matchingStepIndex >= 0) {
                      setIsPlaying(false);
                      setStep(matchingStepIndex);
                    }
                  }}
                  className={`relative z-10 flex min-w-0 flex-col items-center rounded-2xl border px-3 py-4 text-center transition-all ${
                    isActive
                      ? 'border-indigo-400 bg-indigo-500/15 shadow-[0_0_24px_rgba(99,102,241,0.35)]'
                      : isDone
                        ? 'border-emerald-500/30 bg-emerald-500/10'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                  }`}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                    isActive
                      ? 'border-indigo-300 bg-indigo-500 text-white'
                      : isDone
                        ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-300'
                        : 'border-slate-700 bg-slate-800 text-slate-300'
                  }`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={stage.iconPath} />
                    </svg>
                  </div>
                  <span className="mt-3 break-words text-[11px] font-bold leading-snug tracking-[0.04em] text-slate-300">
                    {stage.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.10em] text-slate-500">
                {t('rrCycle.packetLabel')}
              </p>
              <p className="mt-1 break-words font-mono text-sm leading-relaxed text-slate-100">
                {current.packet}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 lg:flex-1">
              <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.10em] text-slate-500">
                  {t('rrCycle.phaseLabel')}
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-slate-100">
                  {current.phase}
                </p>
              </div>
              <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.10em] text-slate-500">
                  {t('rrCycle.actorLabel')}
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-slate-100">
                  <ConceptText text={current.actor} glossaryJson={glossaryJson} />
                </p>
              </div>
              <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.10em] text-slate-500">
                  {t('rrCycle.debugLabel')}
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-slate-100">
                  <ConceptText text={current.debug} glossaryJson={glossaryJson} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-500 dark:text-indigo-300">
              {t('rrCycle.activeStepLabel', { current: step + 1, total: steps.length })}
            </p>
            <h4 className="mt-2 text-3xl font-black text-textMain">
              {current.title}
            </h4>
            <p className="mt-4 text-base leading-relaxed text-textMain/80">
              <ConceptText text={current.desc} glossaryJson={glossaryJson} />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/80 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                  {t('rrCycle.readingHintTitle')}
                </p>
              <p className="mt-3 text-sm leading-relaxed text-indigo-950 dark:text-indigo-100/90">
                <ConceptText text={t(`rrCycle.steps.${current.id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}.hint`)} glossaryJson={glossaryJson} />
              </p>
            </div>

            <div className="rounded-2xl border border-borderSubtle bg-slate-50/80 p-5 dark:bg-slate-900/60">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-textMuted">
                {t('rrCycle.sequenceLabel')}
              </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {steps.map((item, index) => (
                    <button
                      key={item.id}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setStep(index);
                    }}
                    className={`max-w-full rounded-2xl px-3 py-2 text-left text-xs font-bold leading-snug transition-colors ${
                      index === step
                        ? 'bg-indigo-600 text-white'
                        : index < step
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                          : 'bg-white text-textMain shadow-sm dark:bg-slate-950/70'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
