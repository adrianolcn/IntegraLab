import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Landing() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen text-textMain py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Geometric Pattern Background */}

      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 glass-panel-elevated p-12 rounded-3xl relative z-10">
          <h1 className="text-6xl font-black tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-500 dark:to-purple-600 drop-shadow-sm">
              IntegraLab
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-2xl text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
            {t('landing.hero.title', 'Aprenda APIs visualizando o caminho de cada requisição.')}
          </p>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-400 mx-auto leading-relaxed">
            {t('landing.hero.subtitle', 'Entre em Requestia, resolva missões reais, siga fluxos de integração passo a passo e domine APIs modernas com a experiência de um laboratório futurista.')}
          </p>
          <div className="mt-12 flex justify-center gap-6">
            <Link to="/requestia" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-primary-600 font-pj rounded-xl hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] hover:-translate-y-1">
              {t('landing.hero.exploreRequestia', 'Explorar Requestia')}
            </Link>
            <Link to="/jornada" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-slate-700 dark:text-slate-200 transition-all duration-200 bg-white/80 dark:bg-surface/60 backdrop-blur-sm border border-slate-300 hover:bg-slate-50 hover:border-slate-400 dark:border-slate-600 rounded-xl dark:hover:bg-slate-700/80 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 shadow-sm hover:shadow-md dark:hover:shadow-lg hover:-translate-y-1">
              {t('landing.hero.viewJourney', 'Ver Jornada')}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="group glass-panel-elevated p-8 rounded-2xl relative overflow-hidden transition-all hover:-translate-y-2 hover:border-primary-400">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-primary-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400 group-hover:text-primary-500 dark:group-hover:text-primary-300 transition-colors">{t('landing.features.1.title', 'O que é o IntegraLab?')}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">{t('landing.features.1.desc', 'Uma plataforma educacional onde você aprende sistemas distribuídos colocando a mão na massa. Não apenas endpoints soltos, mas fluxos assíncronos completos e interligados.')}</p>
          </div>
          <div className="group glass-panel-elevated p-8 rounded-2xl relative overflow-hidden transition-all hover:-translate-y-2 hover:border-indigo-400">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">{t('landing.features.2.title', 'O que é Requestia?')}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">{t('landing.features.2.desc', 'Um universo gamificado interno. Uma representação visual imersiva da internet onde cada requisição sua é um dado vivo navegando pela infraestrutura real de rede.')}</p>
          </div>
          <div className="group glass-panel-elevated p-8 rounded-2xl relative overflow-hidden transition-all hover:-translate-y-2 hover:border-purple-400">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors">{t('landing.features.3.title', 'Trilhas Futuras')}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">{t('landing.features.3.desc', 'Explore o mundo do HTTP avançado, mergulhe em integrações via GraphQL, Webhooks, WebSocket, SSE, Event-driven APIs e contratos rígidos com gRPC.')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
