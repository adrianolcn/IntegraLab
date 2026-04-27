import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface EcommerceExampleCardsProps {
  glossaryJson?: string;
}

export default function EcommerceExampleCards({ glossaryJson }: EcommerceExampleCardsProps) {
  const { t } = useTranslation();

  const examples = [
    {
      method: 'GET',
      path: '/produtos',
      color: 'blue',
      objective: t('ecommerce.get.objective', 'Lista o catálogo de produtos disponíveis para compra.'),
      effect: t('ecommerce.get.effect', 'Não altera nada no servidor (idempotente). O usuário apenas visualiza os itens.'),
      status: '200 OK'
    },
    {
      method: 'POST',
      path: '/pedidos',
      color: 'emerald',
      objective: t('ecommerce.post.objective', 'Cria um novo pedido com os itens do carrinho e finaliza a compra.'),
      effect: t('ecommerce.post.effect', 'Altera o estado do sistema e envia um {{Body}} (não idempotente). Clicar duas vezes cria dois pedidos!'),
      status: '201 Created'
    },
    {
      method: 'PATCH',
      path: '/usuarios/1',
      color: 'orange',
      objective: t('ecommerce.patch.objective', 'Altera apenas uma informação específica do perfil do usuário.'),
      effect: t('ecommerce.patch.effect', 'Atualiza parcialmente o registro, como trocar o telefone de contato no banco de dados.'),
      status: '200 ou 204'
    }
  ];

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'emerald': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'orange': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {examples.map((ex, idx) => (
        <div key={idx} className={`p-5 rounded-xl border ${getColorClasses(ex.color)} flex flex-col shadow-sm`}>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-black text-lg tracking-wider">{ex.method}</span>
            <span className="font-mono text-sm opacity-80">{ex.path}</span>
          </div>
          
          <div className="space-y-4 flex-1">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-70">
                {t('ecommerce.objectiveLabel', 'Objetivo')}
              </span>
              <p className="text-sm font-medium">
                <ConceptText text={ex.objective} glossaryJson={glossaryJson} />
              </p>
            </div>
            
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-70">
                {t('ecommerce.effectLabel', 'Efeito')}
              </span>
              <p className="text-sm opacity-90">
                <ConceptText text={ex.effect} glossaryJson={glossaryJson} />
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-current/20 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">
              {t('ecommerce.statusLabel', 'Status Comum')}
            </span>
            <span className="text-sm font-mono font-bold">{ex.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
