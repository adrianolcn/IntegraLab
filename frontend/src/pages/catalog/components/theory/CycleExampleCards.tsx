import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface CycleExampleCardsProps {
  glossaryJson?: string;
}

type ExampleKey = 'get' | 'post' | 'notFound';

export default function CycleExampleCards({ glossaryJson }: CycleExampleCardsProps) {
  const { t } = useTranslation();

  const examples: Array<{
    key: ExampleKey;
    tone: 'sky' | 'emerald' | 'rose';
    method: string;
    status: string;
    title: string;
    desc: string;
    request: string;
    response: string;
    takeaway: string;
  }> = [
    {
      key: 'get',
      tone: 'sky',
      method: t('rrExamples.cards.get.method'),
      status: t('rrExamples.cards.get.status'),
      title: t('rrExamples.cards.get.title'),
      desc: t('rrExamples.cards.get.desc'),
      request: t('rrExamples.cards.get.request'),
      response: t('rrExamples.cards.get.response'),
      takeaway: t('rrExamples.cards.get.takeaway')
    },
    {
      key: 'post',
      tone: 'emerald',
      method: t('rrExamples.cards.post.method'),
      status: t('rrExamples.cards.post.status'),
      title: t('rrExamples.cards.post.title'),
      desc: t('rrExamples.cards.post.desc'),
      request: t('rrExamples.cards.post.request'),
      response: t('rrExamples.cards.post.response'),
      takeaway: t('rrExamples.cards.post.takeaway')
    },
    {
      key: 'notFound',
      tone: 'rose',
      method: t('rrExamples.cards.notFound.method'),
      status: t('rrExamples.cards.notFound.status'),
      title: t('rrExamples.cards.notFound.title'),
      desc: t('rrExamples.cards.notFound.desc'),
      request: t('rrExamples.cards.notFound.request'),
      response: t('rrExamples.cards.notFound.response'),
      takeaway: t('rrExamples.cards.notFound.takeaway')
    }
  ];

  const toneClasses = {
    sky: {
      badge: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
      border: 'border-sky-200 dark:border-sky-900/40',
      panel: 'bg-sky-50/80 dark:bg-sky-950/20'
    },
    emerald: {
      badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-900/40',
      panel: 'bg-emerald-50/80 dark:bg-emerald-950/20'
    },
    rose: {
      badge: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
      border: 'border-rose-200 dark:border-rose-900/40',
      panel: 'bg-rose-50/80 dark:bg-rose-950/20'
    }
  } as const;

  return (
    <div className="my-8">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-500 dark:text-indigo-300">
          {t('rrExamples.kicker')}
        </p>
        <h3 className="mt-1 text-2xl font-black text-textMain">
          {t('rrExamples.title')}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-textMain/75">
          {t('rrExamples.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {examples.map((example) => {
          const tone = toneClasses[example.tone];

          return (
            <div key={example.key} className={`overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-slate-900/70 ${tone.border}`}>
              <div className={`border-b px-5 py-4 ${tone.border} ${tone.panel}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${tone.badge}`}>
                        {example.method}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${tone.badge}`}>
                        {example.status}
                      </span>
                    </div>
                    <h4 className="mt-3 text-lg font-black text-textMain">
                      {example.title}
                    </h4>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-textMain/75">
                  <ConceptText text={example.desc} glossaryJson={glossaryJson} />
                </p>
              </div>

              <div className="space-y-4 p-5">
                <div className="rounded-xl border border-borderSubtle bg-slate-50/80 p-4 dark:bg-slate-950/50">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-textMuted">
                    {t('rrExamples.requestLabel')}
                  </p>
                  <pre className="mt-3 whitespace-pre-wrap break-words text-xs leading-relaxed text-textMain">
                    {example.request}
                  </pre>
                </div>

                <div className="rounded-xl border border-borderSubtle bg-slate-50/80 p-4 dark:bg-slate-950/50">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-textMuted">
                    {t('rrExamples.responseLabel')}
                  </p>
                  <pre className="mt-3 whitespace-pre-wrap break-words text-xs leading-relaxed text-textMain">
                    {example.response}
                  </pre>
                </div>

                <div className={`rounded-xl border px-4 py-4 ${tone.border} ${tone.panel}`}>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-textMuted">
                    {t('rrExamples.takeawayLabel')}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-textMain/85">
                    <ConceptText text={example.takeaway} glossaryJson={glossaryJson} />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
