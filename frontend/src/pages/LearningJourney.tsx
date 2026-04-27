import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function LearningJourney() {
  const { t } = useTranslation();

  const getStatusLabel = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'available' || s === 'disponível') return t('status.available');
    if (s === 'locked' || s === 'bloqueado') return t('status.locked');
    if (s === 'coming_soon' || s === 'em breve') return t('status.coming_soon');
    if (s === 'completed' || s === 'concluída') return t('status.completed');
    return status;
  };

  const modules = Array.from({ length: 14 }).map((_, i) => {
    const id = i + 1;
    let status = 'LOCKED';
    if (id === 1) status = 'AVAILABLE';
    if (id === 2) status = 'COMING_SOON';
    
    // We map topics dynamically since they are an array
    const topics: string[] = t(`journey.modules.${id}.topics`, { returnObjects: true }) as string[];

    return {
      id,
      title: t(`journey.modules.${id}.title`),
      status,
      content: topics
    };
  });

  return (
    <div className="relative min-h-screen text-textMain py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Geometric Pattern Background */}

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16 glass-panel-elevated p-10 rounded-3xl text-center relative overflow-hidden">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-600 mb-4 tracking-tight">
            {t('journey.title')}
          </h1>
          <p className="text-xl text-textMuted max-w-3xl mx-auto leading-relaxed">
            {t('journey.subtitle')}
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-borderSubtle before:to-transparent">
          {modules.map((mod) => {
            const isAvailable = mod.status === 'AVAILABLE';
            const isComingSoon = mod.status === 'COMING_SOON';
            
            return (
              <div key={mod.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 
                  ${isAvailable ? 'bg-blue-500 border-blue-200 dark:border-blue-900 shadow-blue-500/50' : isComingSoon ? 'bg-amber-500 border-amber-200 dark:border-amber-900 shadow-amber-500/50' : 'bg-slate-300 border-slate-100 dark:bg-slate-700 dark:border-slate-800'}`}>
                  {isAvailable && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                  {!isAvailable && <span className="text-xs font-bold text-slate-700 dark:text-white">{mod.id}</span>}
                </div>
                
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                  ${isAvailable ? 'bg-white/90 dark:bg-surface/80 border-blue-300 dark:border-blue-500/30 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-blue-500/10' : 
                    isComingSoon ? 'bg-white/80 dark:bg-surface/60 border-amber-300 dark:border-amber-500/20 hover:border-amber-400 dark:hover:border-amber-500/40' : 
                    'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-borderSubtle opacity-75 grayscale-[20%]'}`}>
                  
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xl font-bold ${isAvailable ? 'text-blue-600 dark:text-blue-300' : 'text-textMain'}`}>{mod.title}</h3>
                    {isAvailable && <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30">{getStatusLabel(mod.status)}</span>}
                    {isComingSoon && <span className="px-2 py-1 text-xs font-semibold rounded bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">{getStatusLabel(mod.status)}</span>}
                    {!isAvailable && !isComingSoon && <span className="px-2 py-1 text-xs font-semibold rounded bg-slate-200 text-slate-600 dark:bg-slate-700/50 dark:text-slate-400">{getStatusLabel(mod.status)}</span>}
                  </div>
                  
                  <ul className="mt-4 space-y-2">
                    {mod.content.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-textMuted">
                        <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {isAvailable && (
                    <div className="mt-6">
                      <Link to="/tracks/fundamentos-apis-http" className="inline-block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors shadow-sm">
                        {t('tracks.start')}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
