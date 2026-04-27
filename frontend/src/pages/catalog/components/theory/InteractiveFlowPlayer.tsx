import { useState, useEffect } from 'react';
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

export default function InteractiveFlowPlayer({ flowJson, glossaryJson }: InteractiveFlowPlayerProps) {
  const [steps, setSteps] = useState<FlowStep[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    try {
      const parsed = JSON.parse(flowJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setSteps(parsed);
      }
    } catch (e) {
      console.error("Failed to parse interactive flow", e);
    }
  }, [flowJson]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying && steps.length > 0) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 5000); // 5 seconds per step
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  if (steps.length === 0) return null;

  const currentStep = steps[currentIndex];

  const handleNext = () => {
    if (currentIndex < steps.length - 1) setCurrentIndex(c => c + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(c => c - 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="mb-12 bg-white dark:bg-slate-900 rounded-2xl border border-borderSubtle shadow-xl overflow-hidden flex flex-col">
      {/* Header & Controls */}
      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-borderSubtle flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 p-2.5 rounded-xl shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 className="font-extrabold text-textMain text-xl">Fluxo Interativo</h3>
        </div>
        
        <FlowControls 
          isPlaying={isPlaying}
          canGoBack={currentIndex > 0}
          canGoForward={currentIndex < steps.length - 1}
          onBack={handlePrev}
          onNext={handleNext}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onRestart={handleRestart}
          showRestart={currentIndex >= steps.length - 1}
        />
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1">
        <div 
          className="bg-indigo-500 h-1 transition-all duration-500 ease-out" 
          style={{ width: `${((currentIndex) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Timeline Steps (Grid) */}
      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/30 border-b border-borderSubtle">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, idx) => {
            const isActive = idx === currentIndex;
            const isPast = idx < currentIndex;
            return (
              <button 
                key={idx}
                onClick={() => { setIsPlaying(false); setCurrentIndex(idx); }}
                className={`text-left p-3 rounded-xl border-2 transition-all duration-300 flex flex-col gap-2 ${
                  isActive 
                    ? 'border-indigo-500 bg-white dark:bg-slate-800 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                    : isPast 
                      ? 'border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-900/20 opacity-80 hover:opacity-100' 
                      : 'border-slate-200 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-800/50 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isActive ? 'bg-indigo-500 text-white' :
                    isPast ? 'bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300' :
                    'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                  }`}>
                    {isPast ? <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : idx + 1}
                  </span>
                  <span className={`text-xs sm:text-sm font-bold leading-tight line-clamp-2 ${isActive ? 'text-indigo-700 dark:text-indigo-400' : isPast ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-600 dark:text-slate-400'}`}>
                    {step.title.replace(/^\d+\.\s/, '')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Content */}
      <div className="p-6 sm:p-8 grow flex flex-col min-h-[350px]">
        <div className="animate-fade-in-up flex-1">
          <span className="text-xs font-black text-indigo-500 tracking-widest uppercase mb-2 block">
            Etapa {currentIndex + 1} de {steps.length}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-textMain mb-3">
            {currentStep.title.replace(/^\d+\.\s/, '')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-6">
            <ConceptText text={currentStep.description} glossaryJson={glossaryJson} />
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">O que acontece aqui?</h4>
                <p className="text-sm text-textMain leading-relaxed">
                  <ConceptText text={currentStep.details} glossaryJson={glossaryJson} />
                </p>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/50 rounded-xl p-4">
                <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Por que importa?
                </h4>
                <p className="text-sm text-indigo-900 dark:text-indigo-200">
                  <ConceptText text={currentStep.importance} glossaryJson={glossaryJson} />
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="bg-slate-100 dark:bg-[#181825] border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden shadow-inner flex-1">
                <div className="px-3 py-2 bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700/50 text-xs font-bold text-slate-600 dark:text-slate-400">
                  Exemplo Prático
                </div>
                <div className="p-4">
                  <pre className="text-sm font-mono text-slate-800 dark:text-emerald-400 whitespace-pre-wrap break-words">
                    {currentStep.example}
                  </pre>
                </div>
              </div>
              
              {currentStep.relatedTerms && currentStep.relatedTerms.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold text-slate-500 my-auto">Termos:</span>
                  {currentStep.relatedTerms.map((rt, i) => (
                    <span key={i} className="px-2 py-1 bg-white dark:bg-slate-800 border border-borderSubtle rounded-md text-xs font-medium text-textMain shadow-sm">
                      <ConceptText text={`{{${rt}}}`} glossaryJson={glossaryJson} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
