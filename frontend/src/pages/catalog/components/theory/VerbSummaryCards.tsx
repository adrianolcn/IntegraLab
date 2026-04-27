import { useTranslation } from 'react-i18next';

export default function VerbSummaryCards() {
  const { t } = useTranslation();

  const verbs = [
    {
      method: 'GET',
      color: 'blue',
      points: [
        t('verbs.get.p1', 'Busca dados do servidor'),
        t('verbs.get.p2', 'Normalmente não possui body'),
        t('verbs.get.p3', 'Status comum: 200 OK')
      ]
    },
    {
      method: 'POST',
      color: 'emerald',
      points: [
        t('verbs.post.p1', 'Cria um novo recurso'),
        t('verbs.post.p2', 'Geralmente envia dados no body'),
        t('verbs.post.p3', 'Status comum: 201 Created')
      ]
    },
    {
      method: 'PUT',
      color: 'amber',
      points: [
        t('verbs.put.p1', 'Substitui o recurso inteiro'),
        t('verbs.put.p2', 'Operação idempotente'),
        t('verbs.put.p3', 'Status comum: 200 ou 204')
      ]
    },
    {
      method: 'PATCH',
      color: 'orange',
      points: [
        t('verbs.patch.p1', 'Altera apenas parte do recurso'),
        t('verbs.patch.p2', 'Pode ou não ser idempotente'),
        t('verbs.patch.p3', 'Status comum: 200 ou 204')
      ]
    },
    {
      method: 'DELETE',
      color: 'rose',
      points: [
        t('verbs.delete.p1', 'Remove um recurso existente'),
        t('verbs.delete.p2', 'Operação idempotente'),
        t('verbs.delete.p3', 'Status comum: 204 No Content')
      ]
    },
    {
      method: 'OPTIONS',
      color: 'slate',
      points: [
        t('verbs.options.p1', 'Consulta capacidades/CORS'),
        t('verbs.options.p2', 'Usado automaticamente pelo navegador'),
        t('verbs.options.p3', 'Status comum: 200 ou 204')
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'emerald': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'amber': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'orange': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'rose': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'slate': return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      {verbs.map((verb, idx) => (
        <div key={idx} className={`p-5 rounded-xl border ${getColorClasses(verb.color)} flex flex-col h-full shadow-sm`}>
          <h5 className="font-black text-lg tracking-wider mb-3">{verb.method}</h5>
          <ul className="space-y-2 text-sm font-medium flex-1">
            {verb.points.map((point, i) => (
              <li key={i} className="flex items-start">
                <svg className="w-4 h-4 mr-2 shrink-0 opacity-70 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="opacity-90">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
