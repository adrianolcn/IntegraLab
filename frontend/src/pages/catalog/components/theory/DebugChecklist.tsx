import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface DebugChecklistProps {
  glossaryJson?: string;
}

export default function DebugChecklist({ glossaryJson }: DebugChecklistProps) {
  const { t } = useTranslation();

  const items = [
    { text: t('chk.1', 'O {{Método HTTP}} usado (GET, POST) condiz com a documentação?') },
    { text: t('chk.2', 'O {{Endpoint}} (URL completa e {{Path}}) foi digitado corretamente, sem letras faltando?') },
    { text: t('chk.3', 'Os {{Query Params}} não estão com erros de formatação (`?id=1&name=x`)?') },
    { text: t('chk.4', 'Os {{Headers}} obrigatórios (como `Accept` ou `API-Key`) estão lá?') },
    { text: t('chk.5', 'O {{JSON}} do {{Body}} está sintaticamente perfeito (aspas e chaves fechadas)?') },
    { text: t('chk.6', 'O {{Payload}} é coerente com a regra de negócio (ex: não tentou comprar -1 produtos)?') },
    { text: t('chk.7', 'O {{Bearer Token}} foi anexado na raiz do {{Authorization}}?') },
    { text: t('chk.8', 'O {{Token}} ainda está dentro do tempo de validade?') },
    { text: t('chk.9', 'Você declarou o {{Content-Type}} para avisar a API que está mandando JSON?') },
    { text: t('chk.10', 'O {{Status Code}} aponta para {{Erro do Cliente}} (4xx) ou {{Erro do Servidor}} (5xx)?') },
    { text: t('chk.11', 'O erro é reprodutível todas as vezes que eu clico em "Send"?') }
  ];

  return (
    <div className="my-8 bg-surface border border-borderSubtle rounded-xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-textMain">Checklist de Investigação</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-borderSubtle/50 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
            <div className="mt-0.5 text-slate-300 dark:text-slate-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-textMain/90 leading-relaxed">
              <ConceptText text={item.text} glossaryJson={glossaryJson} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
