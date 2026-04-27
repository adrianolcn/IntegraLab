import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface AuthVsAuthorizationBlockProps {
  glossaryJson?: string;
}

export default function AuthVsAuthorizationBlock({ glossaryJson }: AuthVsAuthorizationBlockProps) {
  const { t } = useTranslation();

  return (
    <div className="my-8 flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/50 rounded-xl p-6 relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <svg className="w-40 h-40 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
            {t('avsa.authn.label', '1. Autenticação')}
          </div>
          <h3 className="text-2xl font-black text-blue-900 dark:text-blue-100 mb-2">
            Quem é você?
          </h3>
          <p className="text-blue-800 dark:text-blue-200/80 leading-relaxed mb-6 h-20 text-sm">
            <ConceptText text={t('avsa.authn.desc', 'É o processo de comprovar a sua identidade. Ocorre quando você faz Login e recebe o seu {{Token}}.')} glossaryJson={glossaryJson} />
          </p>
          <div className="bg-white/60 dark:bg-black/20 rounded p-4 border border-blue-100 dark:border-blue-800/30">
            <div className="text-xs uppercase font-bold text-blue-500/80 mb-2">Exemplo no mundo real</div>
            <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Mostrar sua identidade (RG) ou crachá na portaria do prédio.
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-900/50 rounded-xl p-6 relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <svg className="w-40 h-40 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 text-xs font-bold uppercase tracking-widest mb-4">
            {t('avsa.authz.label', '2. Autorização')}
          </div>
          <h3 className="text-2xl font-black text-purple-900 dark:text-purple-100 mb-2">
            O que pode fazer?
          </h3>
          <p className="text-purple-800 dark:text-purple-200/80 leading-relaxed mb-6 h-20 text-sm">
            <ConceptText text={t('avsa.authz.desc', 'É o processo de verificar se você tem permissão (roles) para acessar aquele recurso específico.')} glossaryJson={glossaryJson} />
          </p>
          <div className="bg-white/60 dark:bg-black/20 rounded p-4 border border-purple-100 dark:border-purple-800/30">
            <div className="text-xs uppercase font-bold text-purple-500/80 mb-2">Exemplo no mundo real</div>
            <div className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Você já entrou no prédio (autenticado), mas o seu crachá não abre a porta do cofre da gerência (não autorizado).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
