import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface RequestResponseMistakesProps {
  glossaryJson?: string;
}

export default function RequestResponseMistakes({ glossaryJson }: RequestResponseMistakesProps) {
  const { t } = useTranslation();

  const mistakes = [
    {
      title: t('rrMistakes.cards.serverDown.title'),
      wrong: t('rrMistakes.cards.serverDown.wrong'),
      correction: t('rrMistakes.cards.serverDown.correction')
    },
    {
      title: t('rrMistakes.cards.getBody.title'),
      wrong: t('rrMistakes.cards.getBody.wrong'),
      correction: t('rrMistakes.cards.getBody.correction')
    },
    {
      title: t('rrMistakes.cards.ignoreResponse.title'),
      wrong: t('rrMistakes.cards.ignoreResponse.wrong'),
      correction: t('rrMistakes.cards.ignoreResponse.correction')
    },
    {
      title: t('rrMistakes.cards.uiVsApi.title'),
      wrong: t('rrMistakes.cards.uiVsApi.wrong'),
      correction: t('rrMistakes.cards.uiVsApi.correction')
    }
  ];

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-borderSubtle bg-surface shadow-sm">
      <div className="border-b border-borderSubtle bg-slate-50/80 px-5 py-5 dark:bg-slate-950/70 md:px-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-rose-500 dark:text-rose-300">
          {t('rrMistakes.kicker')}
        </p>
        <h3 className="mt-1 text-2xl font-black text-textMain">
          {t('rrMistakes.title')}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-textMain/75">
          {t('rrMistakes.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        {mistakes.map((mistake, index) => (
          <div key={index} className="rounded-2xl border border-rose-200 bg-white p-5 shadow-sm dark:border-rose-900/40 dark:bg-slate-900/70">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-7.938 4h15.876c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L2.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-black text-textMain">
                  {mistake.title}
                </h4>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-rose-100 bg-rose-50/80 p-4 dark:border-rose-900/30 dark:bg-rose-950/20">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
                  {t('rrMistakes.wrongLabel')}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-rose-950 dark:text-rose-100/90">
                  <ConceptText text={mistake.wrong} glossaryJson={glossaryJson} />
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/80 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                  {t('rrMistakes.correctionLabel')}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100/90">
                  <ConceptText text={mistake.correction} glossaryJson={glossaryJson} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
