import { useTranslation } from 'react-i18next';

export interface GlossaryItemRich {
  term: string;
  acronym?: string;
  definition: string;
  importance?: string;
  example?: string;
  lessonContext?: string;
}

interface GlossaryListProps {
  glossaryJson: string;
}

export default function GlossaryList({ glossaryJson }: GlossaryListProps) {
  const { t } = useTranslation();
  
  let items: GlossaryItemRich[] = [];
  try {
    items = JSON.parse(glossaryJson);
  } catch (e) {
    console.error("Failed to parse glossary", e);
    return null;
  }

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="mb-12 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 border border-borderSubtle">
      <h3 className="text-xl font-bold text-textMain mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        {t('lesson.glossary', 'Glossário Rápido')}
      </h3>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {items.map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-900/50 rounded-xl p-5 border border-borderSubtle shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
            <dt className="mb-1 flex flex-wrap items-baseline gap-2 text-lg font-extrabold text-indigo-700 dark:text-indigo-400">
              {item.term}
              {item.acronym && <span className="break-words text-xs font-mono font-normal text-slate-500">({item.acronym})</span>}
            </dt>
            <dd className="mb-3 text-sm leading-relaxed text-textMain">{item.definition}</dd>
            
            {(item.importance || item.example || item.lessonContext) && (
              <dd className="mt-auto space-y-2 pt-3 border-t border-borderSubtle">
                {item.importance && (
                  <div className="text-xs">
                    <span className="font-bold text-slate-500 dark:text-slate-400 mr-1">Por que importa?</span>
                    <span className="text-textMuted">{item.importance}</span>
                  </div>
                )}
                {item.example && (
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded text-xs leading-relaxed font-mono text-textMain border border-borderSubtle break-words whitespace-pre-wrap">
                    {item.example}
                  </div>
                )}
                {item.lessonContext && (
                  <div className="text-xs bg-indigo-50 dark:bg-indigo-900/10 p-2 rounded border border-indigo-100 dark:border-indigo-900/50">
                    <span className="font-bold text-indigo-700 dark:text-indigo-400 mr-1 flex items-center mb-1">
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {t('lesson.lessonContext', 'Relação com esta aula')}
                    </span>
                    <span className="text-indigo-900 dark:text-indigo-200">{item.lessonContext}</span>
                  </div>
                )}
              </dd>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
