import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface GlossaryItemRich {
  term: string;
  acronym?: string;
  definition: string;
  importance?: string;
  example?: string;
  lessonContext?: string;
}

interface ConceptNoteProps {
  term: string;
  glossaryItem: GlossaryItemRich;
}

export default function ConceptNote({ term, glossaryItem }: ConceptNoteProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="text-primary-600 dark:text-primary-400 font-bold border-b-2 border-primary-500/30 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors px-0.5 rounded cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        {term}
      </button>

      {isOpen && (
        <div 
          ref={popoverRef}
          className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 w-[320px] sm:w-[400px] max-w-[90vw] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-borderSubtle overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-primary-50 dark:bg-primary-900/20 px-5 py-3 border-b border-borderSubtle flex justify-between items-start">
            <div>
              <h4 className="font-extrabold text-lg text-primary-900 dark:text-primary-200 leading-tight">
                {glossaryItem.term}
              </h4>
              {glossaryItem.acronym && (
                <span className="text-xs font-mono text-primary-600 dark:text-primary-400 mt-1 block">
                  ({glossaryItem.acronym})
                </span>
              )}
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
            <p className="text-sm text-textMain leading-relaxed">
              {glossaryItem.definition}
            </p>
            
            {glossaryItem.importance && (
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-borderSubtle">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Por que importa?</span>
                <p className="text-xs text-textMain">{glossaryItem.importance}</p>
              </div>
            )}

            {glossaryItem.example && (
              <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg border border-borderSubtle">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Exemplo</span>
                <pre className="text-xs font-mono text-textMain whitespace-pre-wrap">
                  {glossaryItem.example}
                </pre>
              </div>
            )}

            {glossaryItem.lessonContext && (
              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
                <span className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 flex items-center">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {t('lesson.lessonContext', 'Relação com esta aula')}
                </span>
                <p className="text-xs text-indigo-900 dark:text-indigo-200">{glossaryItem.lessonContext}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </span>
  );
}
