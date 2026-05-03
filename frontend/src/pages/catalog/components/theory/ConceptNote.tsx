import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';

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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const updatePosition = () => {
    const trigger = triggerRef.current;
    const popover = popoverRef.current;

    if (!trigger || !popover) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const sidePadding = 12;
    const mobileBreakpoint = 640;
    const isMobile = viewportWidth < mobileBreakpoint;
    const desiredWidth = isMobile ? Math.min(viewportWidth - sidePadding * 2, 520) : Math.min(460, viewportWidth - sidePadding * 2);

    popover.style.width = `${desiredWidth}px`;

    const popoverRect = popover.getBoundingClientRect();
    const gap = 10;

    let left = triggerRect.left + triggerRect.width / 2 - desiredWidth / 2;
    left = Math.max(sidePadding, Math.min(left, viewportWidth - desiredWidth - sidePadding));

    let top = triggerRect.bottom + gap;
    if (top + popoverRect.height > viewportHeight - sidePadding) {
      top = triggerRect.top - popoverRect.height - gap;
    }

    if (top < sidePadding) {
      top = sidePadding;
    }

    setPosition({
      top,
      left,
      width: desiredWidth
    });
  };

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedPopover = popoverRef.current?.contains(target);
      const clickedTrigger = triggerRef.current?.contains(target);

      if (!clickedPopover && !clickedTrigger) {
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

  useLayoutEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    updatePosition();

    const handleViewportChange = () => updatePosition();
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
    };
  }, [isOpen]);

  return (
    <span className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        className="rounded px-0.5 font-bold text-primary-600 transition-colors cursor-pointer border-b-2 border-primary-500/30 hover:border-primary-500 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/30"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        {term}
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={popoverRef}
          className="fixed z-[120] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-borderSubtle bg-white shadow-2xl dark:bg-slate-800"
          style={{
            top: position?.top ?? 12,
            left: position?.left ?? 12,
            width: position?.width ?? Math.min(window.innerWidth - 24, 400)
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 border-b border-borderSubtle bg-primary-50 px-5 py-4 dark:bg-primary-900/20">
            <div>
              <h4 className="text-lg font-extrabold leading-tight text-primary-900 dark:text-primary-200">
                {glossaryItem.term}
              </h4>
              {glossaryItem.acronym && (
                <span className="mt-1 block text-xs font-mono break-words text-primary-600 dark:text-primary-400">
                  ({glossaryItem.acronym})
                </span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="max-h-[min(72vh,620px)] space-y-4 overflow-y-auto p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-textMain sm:text-[15px]">
              {glossaryItem.definition}
            </p>

            {glossaryItem.importance && (
              <div className="rounded-xl border border-borderSubtle bg-slate-50 p-4 dark:bg-slate-900/50">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{t('lesson.conceptImportance', 'Por que importa?')}</span>
                <p className="text-sm leading-relaxed text-textMain">{glossaryItem.importance}</p>
              </div>
            )}

            {glossaryItem.example && (
              <div className="rounded-xl border border-borderSubtle bg-slate-100 p-4 dark:bg-slate-900">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{t('lesson.conceptExample', 'Exemplo')}</span>
                <pre className="max-h-[240px] overflow-auto whitespace-pre-wrap break-words text-xs leading-relaxed font-mono text-textMain sm:text-[13px]">
                  {glossaryItem.example}
                </pre>
              </div>
            )}

            {glossaryItem.lessonContext && (
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-900/10">
                <span className="mb-2 flex items-center text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
                  <svg className="mr-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {t('lesson.lessonContext', 'Relação com esta aula')}
                </span>
                <p className="text-sm leading-relaxed text-indigo-900 dark:text-indigo-200">{glossaryItem.lessonContext}</p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </span>
  );
}
