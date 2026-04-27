import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface LogInspectorProps {
  glossaryJson?: string;
}

export default function LogInspector({ glossaryJson }: LogInspectorProps) {
  const { t } = useTranslation();

  return (
    <div className="my-8 flex flex-col gap-4">
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
        <div className="p-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
          <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            Server Application Logs (Datadog/Kibana)
          </span>
        </div>
        <div className="p-4 md:p-6 font-mono text-xs sm:text-sm overflow-x-auto leading-loose whitespace-nowrap text-slate-300">
          <div>
            <span className="text-slate-500">[2023-10-27T14:32:01Z]</span>{' '}
            <span className="text-blue-400">INFO</span>{' '}
            <span className="text-slate-400">[req-9f8a2]</span>{' '}
            Handling POST /api/v1/payments
          </div>
          <div>
            <span className="text-slate-500">[2023-10-27T14:32:02Z]</span>{' '}
            <span className="text-yellow-400">WARN</span>{' '}
            <span className="text-slate-400">[req-9f8a2]</span>{' '}
            User account is flagged for review. Proceeding with caution.
          </div>
          <div>
            <span className="text-slate-500">[2023-10-27T14:32:03Z]</span>{' '}
            <span className="text-red-500 bg-red-900/30 px-1 font-bold">ERROR</span>{' '}
            <span className="text-white font-bold border-b border-dashed border-white cursor-help" title="Correlation ID">[req-9f8a2]</span>{' '}
            NullPointerException at PaymentService.process(PaymentService.java:42)
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-5 md:p-6 flex gap-4 items-start">
        <div className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-1">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="text-indigo-900 dark:text-indigo-200 font-bold mb-2">O Segredo do Support: Correlation ID</h4>
          <p className="text-sm text-indigo-800/90 dark:text-indigo-300/90 leading-relaxed mb-4">
            <ConceptText text={t('log.desc', 'Quando a API te devolve um terrível {{500 Internal Server Error}}, ela muitas vezes manda um "ID de Incidente" (ex: `req-9f8a2`). Este é o {{Correlation ID}}.')} glossaryJson={glossaryJson} />
          </p>
          <p className="text-sm text-indigo-800/90 dark:text-indigo-300/90 leading-relaxed">
            <ConceptText text={t('log.desc2', 'O suporte técnico pega essa string única e pesquisa no sistema de {{Log}}. Com isso, eles veem exatamente a trilha que a sua requisição fez no servidor até o momento da explosão (Stack Trace), sem precisar ler logs de milhares de outros usuários simultâneos.')} glossaryJson={glossaryJson} />
          </p>
        </div>
      </div>
    </div>
  );
}
