import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Concept {
  name: string;
  definition: string;
  importance: string;
  example?: string;
}

interface ConceptAccordionProps {
  conceptsJson: string;
}

export default function ConceptAccordion({ conceptsJson }: ConceptAccordionProps) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  let concepts: Concept[] = [];
  try {
    concepts = JSON.parse(conceptsJson);
  } catch (e) {
    console.error("Failed to parse concepts", e);
    return null;
  }

  if (!Array.isArray(concepts) || concepts.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-textMain mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {t('lesson.keyConcepts', 'Conceitos-chave detalhados')}
      </h3>
      <div className="space-y-3">
        {concepts.map((concept, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="bg-white dark:bg-slate-800/80 rounded-xl border border-borderSubtle overflow-hidden shadow-sm transition-all">
              <button 
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <span className="font-bold text-lg text-textMain">{concept.name}</span>
                <svg className={`w-5 h-5 text-textMuted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 pt-0 space-y-4 border-t border-borderSubtle bg-slate-50/50 dark:bg-slate-900/30">
                  <div className="mt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-1">{t('lesson.conceptDefinition', 'Definição')}</h4>
                    <p className="text-textMain">{concept.definition}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">{t('lesson.conceptImportance', 'Por que importa?')}</h4>
                    <p className="text-textMuted">{concept.importance}</p>
                  </div>
                  {concept.example && (
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-borderSubtle">
                      <span className="text-xs font-bold text-slate-500 block mb-1">{t('lesson.conceptExample', 'Exemplo')}</span>
                      <span className="text-sm italic text-textMain">{concept.example}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
