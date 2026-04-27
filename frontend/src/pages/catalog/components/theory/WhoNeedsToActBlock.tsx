import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface WhoNeedsToActBlockProps {
  glossaryJson?: string;
}

export default function WhoNeedsToActBlock({ glossaryJson }: WhoNeedsToActBlockProps) {
  const { t } = useTranslation();

  return (
    <div className="my-8 flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/50 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-24 h-24 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs font-bold uppercase tracking-widest mb-4">
            {t('who.client', '4xx: Erro do Cliente')}
          </div>
          <h3 className="text-xl font-black text-orange-900 dark:text-orange-100 mb-3">
            {t('who.clientTitle', 'Você enviou algo errado')}
          </h3>
          <p className="text-sm text-orange-800 dark:text-orange-200/80 leading-relaxed mb-4">
            <ConceptText text={t('who.clientDesc', 'O {{Servidor}} está funcionando perfeitamente, mas se recusou a processar o seu {{Request}}. A culpa é da aplicação que disparou a chamada. Pode ser falta de {{Autenticação}}, um {{Endpoint}} digitado errado, ou um {{JSON}} quebrado.')} glossaryJson={glossaryJson} />
          </p>
          <div className="bg-white/60 dark:bg-black/20 rounded p-3 text-xs font-medium text-orange-900 dark:text-orange-200">
            <strong>Ação:</strong> <ConceptText text={t('who.clientAction', 'O desenvolvedor do Frontend (ou app) deve investigar o {{Payload}} enviado.')} glossaryJson={glossaryJson} />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/50 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-24 h-24 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.36 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-widest mb-4">
            {t('who.server', '5xx: Erro do Servidor')}
          </div>
          <h3 className="text-xl font-black text-rose-900 dark:text-rose-100 mb-3">
            {t('who.serverTitle', 'O Backend quebrou')}
          </h3>
          <p className="text-sm text-rose-800 dark:text-rose-200/80 leading-relaxed mb-4">
            <ConceptText text={t('who.serverDesc', 'O seu {{Request}} estava impecável. O problema ocorreu internamente no {{Servidor}}. Pode ser um bug não tratado, banco de dados fora do ar, ou timeout de processamento.')} glossaryJson={glossaryJson} />
          </p>
          <div className="bg-white/60 dark:bg-black/20 rounded p-3 text-xs font-medium text-rose-900 dark:text-rose-200">
            <strong>Ação:</strong> <ConceptText text={t('who.serverAction', 'O desenvolvedor do Backend deve verificar os logs da aplicação. O {{Cliente}} só pode tentar novamente mais tarde.')} glossaryJson={glossaryJson} />
          </div>
        </div>
      </div>
    </div>
  );
}
