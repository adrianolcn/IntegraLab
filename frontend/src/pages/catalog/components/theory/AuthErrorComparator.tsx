import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface AuthErrorComparatorProps {
  glossaryJson?: string;
}

export default function AuthErrorComparator({ glossaryJson }: AuthErrorComparatorProps) {
  const { t } = useTranslation();

  return (
    <div className="my-8">
      <div className="flex flex-col md:flex-row shadow-sm rounded-xl overflow-hidden border border-borderSubtle">
        
        {/* 401 Side */}
        <div className="flex-1 bg-surface flex flex-col">
          <div className="bg-orange-500 text-white p-4 text-center">
            <h3 className="font-mono text-3xl font-black mb-1">401</h3>
            <div className="text-sm font-bold uppercase tracking-widest opacity-90">Unauthorized</div>
          </div>
          
          <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
            <div>
              <span className="block text-xs font-bold uppercase text-textMuted mb-2">O que significa?</span>
              <p className="text-textMain/90 text-sm leading-relaxed">
                <ConceptText text={t('aec.401.desc', 'O {{Servidor}} não sabe quem você é. Falha de {{Autenticação}}.')} glossaryJson={glossaryJson} />
              </p>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/30">
              <span className="block text-xs font-bold uppercase text-orange-800 dark:text-orange-400 mb-2">Causas Comuns</span>
              <ul className="space-y-2 text-sm text-orange-900 dark:text-orange-200">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <ConceptText text={t('aec.401.c1', 'Você não enviou o {{Header}} `Authorization`.')} glossaryJson={glossaryJson} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <ConceptText text={t('aec.401.c2', 'Você enviou, mas esqueceu a palavra `Bearer`.')} glossaryJson={glossaryJson} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <ConceptText text={t('aec.401.c3', 'O seu {{Token}} expirou de tempo.')} glossaryJson={glossaryJson} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-borderSubtle hidden md:block"></div>
        <div className="h-px bg-borderSubtle md:hidden"></div>

        {/* 403 Side */}
        <div className="flex-1 bg-surface flex flex-col">
          <div className="bg-rose-600 text-white p-4 text-center">
            <h3 className="font-mono text-3xl font-black mb-1">403</h3>
            <div className="text-sm font-bold uppercase tracking-widest opacity-90">Forbidden</div>
          </div>
          
          <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
            <div>
              <span className="block text-xs font-bold uppercase text-textMuted mb-2">O que significa?</span>
              <p className="text-textMain/90 text-sm leading-relaxed">
                <ConceptText text={t('aec.403.desc', 'O {{Servidor}} sabe quem você é, mas recusa seu acesso. Falha de {{Autorização}}.')} glossaryJson={glossaryJson} />
              </p>
            </div>
            
            <div className="bg-rose-50 dark:bg-rose-900/10 rounded-lg p-4 border border-rose-100 dark:border-rose-900/30">
              <span className="block text-xs font-bold uppercase text-rose-800 dark:text-rose-400 mb-2">Causas Comuns</span>
              <ul className="space-y-2 text-sm text-rose-900 dark:text-rose-200">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">•</span>
                  <ConceptText text={t('aec.403.c1', 'Você enviou um {{Bearer Token}} perfeitamente válido.')} glossaryJson={glossaryJson} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">•</span>
                  <ConceptText text={t('aec.403.c2', 'Mas sua conta tem perfil "Aluno" e a rota exige "Admin".')} glossaryJson={glossaryJson} />
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">•</span>
                  <ConceptText text={t('aec.403.c3', 'Você tentou deletar uma foto que pertence a outro usuário.')} glossaryJson={glossaryJson} />
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
