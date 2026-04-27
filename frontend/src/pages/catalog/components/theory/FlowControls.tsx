

export interface FlowControlsProps {
  isPlaying: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onRestart?: () => void;
  showRestart?: boolean;
  labels?: {
    play?: string;
    pause?: string;
    back?: string;
    next?: string;
    restart?: string;
  };
}

export default function FlowControls({
  isPlaying,
  canGoBack,
  canGoForward,
  onBack,
  onNext,
  onPlayPause,
  onRestart,
  showRestart = false,
  labels = {
    play: 'Reproduzir',
    pause: 'Pausar',
    back: 'Voltar',
    next: 'Avançar',
    restart: 'Reiniciar'
  }
}: FlowControlsProps) {
  const isRestartMode = showRestart && onRestart;

  return (
    <div className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-full border border-borderSubtle shadow-sm w-40 flex-shrink-0">
      {/* Back Button */}
      <button 
        onClick={onBack} 
        disabled={!canGoBack} 
        aria-label={labels.back}
        title={labels.back}
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Play/Pause/Restart Button */}
      <button 
        onClick={isRestartMode ? onRestart : onPlayPause}
        aria-label={isRestartMode ? labels.restart : isPlaying ? labels.pause : labels.play}
        title={isRestartMode ? labels.restart : isPlaying ? labels.pause : labels.play}
        className={`w-12 h-12 flex-shrink-0 flex items-center justify-center text-white rounded-full shadow-md transition-transform active:scale-95 ${
          isPlaying ? 'bg-amber-500 hover:bg-amber-400' : 'bg-indigo-600 hover:bg-indigo-500'
        }`}
      >
        {isRestartMode ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      {/* Next Button */}
      <button 
        onClick={onNext} 
        disabled={!canGoForward} 
        aria-label={labels.next}
        title={labels.next}
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
