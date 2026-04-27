import { useTranslation } from 'react-i18next';

interface Mistake {
  mistake: string;
  reason: string;
  correction: string;
}

interface MistakeCardProps {
  mistakesJson: string;
}

export default function MistakeCard({ mistakesJson }: MistakeCardProps) {
  const { t } = useTranslation();
  
  let mistakes: Mistake[] = [];
  try {
    mistakes = JSON.parse(mistakesJson);
  } catch (e) {
    console.error("Failed to parse mistakes", e);
    return null;
  }

  if (!Array.isArray(mistakes) || mistakes.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        {t('lesson.commonMistakesDetailed', 'Erros Comuns (e como evitá-los)')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mistakes.map((m, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-rose-200 dark:border-rose-900/50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border-b border-rose-100 dark:border-rose-900/50 flex gap-3 items-start">
              <div className="mt-0.5 bg-rose-200 dark:bg-rose-800/50 text-rose-700 dark:text-rose-300 rounded-full p-1 shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <h4 className="font-bold text-rose-900 dark:text-rose-200 leading-tight">{m.mistake}</h4>
            </div>
            <div className="p-4 grow flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold text-rose-500 dark:text-rose-400 block mb-1 uppercase tracking-wider">{t('lesson.whyIsItWrong', 'Por que está errado?')}</span>
                <p className="text-sm text-textMain">{m.reason}</p>
              </div>
              <div className="mt-auto bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1 flex items-center">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {t('lesson.theCorrection', 'A correção')}
                </span>
                <p className="text-sm text-emerald-900 dark:text-emerald-200">{m.correction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
