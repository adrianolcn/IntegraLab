import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface RequestResponseAnatomyProps {
  glossaryJson?: string;
}

type AnatomyPart = 'method' | 'path' | 'requestHeaders' | 'requestBody' | 'status' | 'responseHeaders' | 'responseBody';

export default function RequestResponseAnatomy({ glossaryJson }: RequestResponseAnatomyProps) {
  const { t } = useTranslation();
  const [activePart, setActivePart] = useState<AnatomyPart>('method');

  const parts: Record<AnatomyPart, { title: string; desc: string; debug: string }> = {
    method: {
      title: t('rrAnatomy.parts.method.title'),
      desc: t('rrAnatomy.parts.method.desc'),
      debug: t('rrAnatomy.parts.method.debug')
    },
    path: {
      title: t('rrAnatomy.parts.path.title'),
      desc: t('rrAnatomy.parts.path.desc'),
      debug: t('rrAnatomy.parts.path.debug')
    },
    requestHeaders: {
      title: t('rrAnatomy.parts.requestHeaders.title'),
      desc: t('rrAnatomy.parts.requestHeaders.desc'),
      debug: t('rrAnatomy.parts.requestHeaders.debug')
    },
    requestBody: {
      title: t('rrAnatomy.parts.requestBody.title'),
      desc: t('rrAnatomy.parts.requestBody.desc'),
      debug: t('rrAnatomy.parts.requestBody.debug')
    },
    status: {
      title: t('rrAnatomy.parts.status.title'),
      desc: t('rrAnatomy.parts.status.desc'),
      debug: t('rrAnatomy.parts.status.debug')
    },
    responseHeaders: {
      title: t('rrAnatomy.parts.responseHeaders.title'),
      desc: t('rrAnatomy.parts.responseHeaders.desc'),
      debug: t('rrAnatomy.parts.responseHeaders.debug')
    },
    responseBody: {
      title: t('rrAnatomy.parts.responseBody.title'),
      desc: t('rrAnatomy.parts.responseBody.desc'),
      debug: t('rrAnatomy.parts.responseBody.debug')
    }
  };

  const active = parts[activePart];

  const requestActiveClass = (part: AnatomyPart, base: string) =>
    activePart === part ? `${base} ring-1 ring-indigo-400/60` : 'hover:bg-white/5';

  const responseActiveClass = (part: AnatomyPart, base: string) =>
    activePart === part ? `${base} ring-1 ring-emerald-400/60` : 'hover:bg-white/5';

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-borderSubtle bg-surface shadow-sm">
      <div className="border-b border-borderSubtle bg-slate-50/80 px-5 py-5 dark:bg-slate-950/70 md:px-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-500 dark:text-indigo-300">
          {t('rrAnatomy.kicker')}
        </p>
        <h3 className="mt-1 text-2xl font-black text-textMain">
          {t('rrAnatomy.title')}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-textMain/75">
          {t('rrAnatomy.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-0 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="grid grid-cols-1 gap-px bg-borderSubtle lg:grid-cols-2">
          <div className="bg-slate-950 p-5 text-slate-300">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.10em] text-sky-400">
                {t('rrAnatomy.requestPanel')}
              </span>
              <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.06em] text-sky-300">
                {t('rrAnatomy.requestActor', 'Cliente')}
              </span>
            </div>

            <div className="rounded-lg px-2 py-2">
              <button type="button" className={`rounded px-1 py-0.5 font-bold text-emerald-400 transition-all ${requestActiveClass('method', 'bg-sky-500/10')}`} onClick={() => setActivePart('method')}>
                {t('rrAnatomy.code.request.method')}
              </button>
              <span className="mx-2 text-slate-500">•</span>
              <button type="button" className={`max-w-full break-all rounded px-1 py-0.5 text-left text-orange-300 transition-all ${requestActiveClass('path', 'bg-sky-500/10')}`} onClick={() => setActivePart('path')}>
                {t('rrAnatomy.code.request.path')}
              </button>
              <span className="ml-2 text-slate-500">{t('rrAnatomy.code.request.protocol')}</span>
            </div>

            <div className={`mt-2 cursor-pointer rounded-lg border-l-2 border-slate-800 px-3 py-3 transition-all ${requestActiveClass('requestHeaders', 'bg-white/0')}`} onClick={() => setActivePart('requestHeaders')}>
              <div className="text-purple-300">{t('rrAnatomy.code.request.hostLabel')}: <span className="text-slate-400">{t('rrAnatomy.code.request.hostValue')}</span></div>
              <div className="text-purple-300">{t('rrAnatomy.code.request.authorizationLabel')}: <span className="text-slate-400">{t('rrAnatomy.code.request.authorizationValue')}</span></div>
              <div className="text-purple-300">{t('rrAnatomy.code.request.contentTypeLabel')}: <span className="text-slate-400">{t('rrAnatomy.code.request.contentTypeValue')}</span></div>
            </div>

            <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {t('rrAnatomy.emptyLine')}
            </div>

            <div className={`mt-2 cursor-pointer rounded-lg border border-transparent px-3 py-3 transition-all ${requestActiveClass('requestBody', 'bg-amber-500/10')}`} onClick={() => setActivePart('requestBody')}>
              <div className="text-amber-200">{'{'}</div>
              <div className="pl-4 text-amber-200"><span className="text-pink-300">"{t('rrAnatomy.code.request.body.productIdKey')}"</span>: <span className="text-green-300">{t('rrAnatomy.code.request.body.productIdValue')}</span>,</div>
              <div className="pl-4 text-amber-200"><span className="text-pink-300">"{t('rrAnatomy.code.request.body.quantityKey')}"</span>: <span className="text-green-300">{t('rrAnatomy.code.request.body.quantityValue')}</span></div>
              <div className="text-amber-200">{'}'}</div>
            </div>
          </div>

          <div className="bg-slate-950 p-5 text-slate-300">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.10em] text-emerald-400">
                {t('rrAnatomy.responsePanel')}
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.06em] text-emerald-300">
                {t('rrAnatomy.responseActor', 'Servidor')}
              </span>
            </div>

            <div className={`cursor-pointer rounded-lg px-2 py-2 transition-all ${responseActiveClass('status', 'bg-emerald-500/10')}`} onClick={() => setActivePart('status')}>
              <span className="text-slate-500">{t('rrAnatomy.code.response.protocol')}</span>
              <span className="mx-2 text-slate-500">•</span>
              <span className="font-bold text-emerald-400">{t('rrAnatomy.code.response.statusLine')}</span>
            </div>

            <div className={`mt-2 cursor-pointer rounded-lg border-l-2 border-slate-800 px-3 py-3 transition-all ${responseActiveClass('responseHeaders', 'bg-white/0')}`} onClick={() => setActivePart('responseHeaders')}>
              <div className="text-cyan-300">{t('rrAnatomy.code.response.contentTypeLabel')}: <span className="text-slate-400">{t('rrAnatomy.code.response.contentTypeValue')}</span></div>
              <div className="text-cyan-300">{t('rrAnatomy.code.response.locationLabel')}: <span className="text-slate-400">{t('rrAnatomy.code.response.locationValue')}</span></div>
              <div className="text-cyan-300">{t('rrAnatomy.code.response.requestIdLabel')}: <span className="text-slate-400">{t('rrAnatomy.code.response.requestIdValue')}</span></div>
            </div>

            <div className={`mt-4 cursor-pointer rounded-lg border border-transparent px-3 py-3 transition-all ${responseActiveClass('responseBody', 'bg-emerald-500/10')}`} onClick={() => setActivePart('responseBody')}>
              <div className="text-emerald-200">{'{'}</div>
              <div className="pl-4 text-emerald-200"><span className="text-pink-300">"{t('rrAnatomy.code.response.body.idKey')}"</span>: <span className="text-orange-300">{t('rrAnatomy.code.response.body.idValue')}</span>,</div>
              <div className="pl-4 text-emerald-200"><span className="text-pink-300">"{t('rrAnatomy.code.response.body.statusKey')}"</span>: <span className="text-green-300">"{t('rrAnatomy.code.response.body.statusValue')}"</span></div>
              <div className="text-emerald-200">{'}'}</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 p-6 dark:bg-slate-900/60 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-500 dark:text-indigo-300">
            {t('rrAnatomy.detailKicker')}
          </p>
          <h4 className="mt-2 text-3xl font-black text-textMain">
            {active.title}
          </h4>

          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-borderSubtle bg-slate-50/80 p-5 dark:bg-slate-950/50">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-textMuted">
                {t('rrAnatomy.detailWhat')}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-textMain/85">
                <ConceptText text={active.desc} glossaryJson={glossaryJson} />
              </p>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-5 dark:border-rose-900/40 dark:bg-rose-950/20">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
                {t('rrAnatomy.detailDebug')}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-rose-950 dark:text-rose-100/90">
                <ConceptText text={active.debug} glossaryJson={glossaryJson} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
