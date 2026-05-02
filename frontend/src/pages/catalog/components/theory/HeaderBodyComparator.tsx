import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface HeaderBodyComparatorProps {
  glossaryJson?: string;
}

export default function HeaderBodyComparator({ glossaryJson }: HeaderBodyComparatorProps) {
  const { t } = useTranslation();

  return (
    <div className="my-8 flex flex-col md:flex-row gap-8 items-stretch">
      <div className="flex-1 bg-surface border border-borderSubtle rounded-xl p-6 relative group overflow-hidden shadow-sm">
        {/* Visual Metaphor - Envelope */}
        <div className="mb-6 h-32 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
          <div className="relative w-40 h-24 bg-white dark:bg-slate-800 rounded shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            {/* Envelope flap */}
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-t-[40px] border-t-slate-200 dark:border-t-slate-600"></div>
            {/* Stamps/Metadata */}
            <div className="absolute top-2 right-2 w-6 h-8 border border-red-300 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20 flex flex-col items-center justify-center">
              <span className="text-[6px] font-bold text-red-500">SELO</span>
            </div>
            <div className="absolute bottom-2 left-3 flex flex-col gap-1">
              <div className="h-1 w-16 bg-slate-300 dark:bg-slate-600 rounded"></div>
              <div className="h-1 w-12 bg-slate-300 dark:bg-slate-600 rounded"></div>
            </div>
          </div>
        </div>
        
        <h3 className="mb-2 flex items-center gap-2 text-xl font-black tracking-[0.06em] text-indigo-700 dark:text-indigo-400">
          {t('hbc.header.title', '{{Header}} (O Envelope)')}
        </h3>
        <p className="text-sm text-textMain/80 leading-relaxed mb-4">
          <ConceptText text={t('hbc.header.desc', 'Metadados invisíveis da requisição. Não carrega a "mensagem" principal, mas sim as configurações logísticas de como essa mensagem deve ser tratada.')} glossaryJson={glossaryJson} />
        </p>
        
        <div className="space-y-2 rounded bg-slate-100 p-3 text-xs font-mono dark:bg-slate-900">
          <div className="break-all text-emerald-600 dark:text-emerald-400">Authorization: Bearer xyz</div>
          <div className="break-all text-indigo-600 dark:text-indigo-400">Content-Type: application/json</div>
          <div className="break-all text-slate-600 dark:text-slate-400">User-Agent: Mozilla/5.0</div>
        </div>
      </div>

      <div className="flex-1 bg-surface border border-borderSubtle rounded-xl p-6 relative group overflow-hidden shadow-sm">
        {/* Visual Metaphor - Letter Content */}
        <div className="mb-6 h-32 flex items-center justify-center bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/50">
          <div className="w-32 h-28 bg-white dark:bg-slate-800 rounded shadow border border-slate-200 dark:border-slate-700 p-3 flex flex-col gap-2">
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-700 rounded mt-auto"></div>
          </div>
        </div>
        
        <h3 className="mb-2 flex items-center gap-2 text-xl font-black tracking-[0.06em] text-amber-700 dark:text-amber-400">
          {t('hbc.body.title', '{{Body}} (A Carta)')}
        </h3>
        <p className="text-sm text-textMain/80 leading-relaxed mb-4">
          <ConceptText text={t('hbc.body.desc', 'A carga útil ({{Payload}}). Onde a verdadeira massa de dados da operação viaja, como os dados completos de um formulário preenchido pelo usuário.')} glossaryJson={glossaryJson} />
        </p>
        
        <div className="space-y-1 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-3 rounded">
          <div className="text-slate-600 dark:text-slate-400">{"{"}</div>
          <div className="text-emerald-600 dark:text-emerald-400 pl-4">"name": "Jane",</div>
          <div className="text-indigo-600 dark:text-indigo-400 pl-4">"age": 28</div>
          <div className="text-slate-600 dark:text-slate-400">{"}"}</div>
        </div>
      </div>
    </div>
  );
}
