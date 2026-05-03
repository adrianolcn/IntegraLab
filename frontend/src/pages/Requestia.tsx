import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Requestia() {
  const { t } = useTranslation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const regions = [
    { name: t('requestia.regions.http.name', 'Vale HTTP'), desc: t('requestia.regions.http.desc', 'Fundamentos de métodos, headers e status codes.'), status: 'Disponível', color: 'from-blue-50 dark:from-blue-500/20 to-blue-100 dark:to-blue-900/20', border: 'border-blue-200 dark:border-blue-500/30', to: '/tracks/fundamentos-apis-http' },
    { name: t('requestia.regions.rest.name', 'Cidade REST'), desc: t('requestia.regions.rest.desc', 'Recursos, sub-recursos, paginação e design de APIs.'), status: 'Disponível', color: 'from-indigo-50 dark:from-indigo-500/20 to-indigo-100 dark:to-indigo-900/20', border: 'border-indigo-200 dark:border-indigo-500/30', to: '/tracks/cidade-rest' },
    { name: t('requestia.regions.auth.name', 'Torre da Autenticação'), desc: t('requestia.regions.auth.desc', 'Tokens, JWT, OAuth e Middlewares de segurança.'), status: 'Disponível', color: 'from-purple-50 dark:from-purple-500/20 to-purple-100 dark:to-purple-900/20', border: 'border-purple-200 dark:border-purple-500/30', to: '/tracks/torre-autenticacao' },
    { name: t('requestia.regions.logs.name', 'Observatório dos Logs'), desc: t('requestia.regions.logs.desc', 'Tracing, correlação e monitoramento de falhas.'), status: 'Disponível', color: 'from-pink-50 dark:from-pink-500/20 to-pink-100 dark:to-pink-900/20', border: 'border-pink-200 dark:border-pink-500/30', to: '/tracks/observatorio-logs' },
    { name: t('requestia.regions.webhooks.name', 'Porto dos Webhooks'), desc: t('requestia.regions.webhooks.desc', 'Callbacks assíncronos e retry policies.'), status: 'Em breve', color: 'from-slate-50 to-slate-100 dark:from-slate-500/10 dark:to-slate-800/10', border: 'border-slate-200 dark:border-borderSubtle' },
    { name: t('requestia.regions.graphql.name', 'Floresta GraphQL'), desc: t('requestia.regions.graphql.desc', 'Consultas flexíveis, mutations e subscriptions.'), status: 'Em breve', color: 'from-slate-50 to-slate-100 dark:from-slate-500/10 dark:to-slate-800/10', border: 'border-slate-200 dark:border-borderSubtle' },
    { name: t('requestia.regions.websocket.name', 'Arena WebSocket'), desc: t('requestia.regions.websocket.desc', 'Comunicação bidirecional e tempo real.'), status: 'Em breve', color: 'from-slate-50 to-slate-100 dark:from-slate-500/10 dark:to-slate-800/10', border: 'border-slate-200 dark:border-borderSubtle' },
    { name: t('requestia.regions.event.name', 'Fábrica Event-Driven'), desc: t('requestia.regions.event.desc', 'Mensageria, filas, RabbitMQ e Kafka.'), status: 'Em breve', color: 'from-slate-50 to-slate-100 dark:from-slate-500/10 dark:to-slate-800/10', border: 'border-slate-200 dark:border-borderSubtle' },
    { name: t('requestia.regions.grpc.name', 'Laboratório gRPC'), desc: t('requestia.regions.grpc.desc', 'Alta performance, Protobuf e streams.'), status: 'Em breve', color: 'from-slate-50 to-slate-100 dark:from-slate-500/10 dark:to-slate-800/10', border: 'border-slate-200 dark:border-borderSubtle' },
  ];

  const handleSoonClick = () => {
    setToastMessage(t('requestia.soon_message', 'Esta região será liberada em breve.'));
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getStatusLabel = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'available' || s === 'disponível') return t('status.available');
    if (s === 'coming_soon' || s === 'em breve') return t('status.coming_soon');
    return status;
  };

  const cardClassName = (isAvailable: boolean) =>
    `block relative group p-8 rounded-2xl glass-panel ${
      isAvailable
        ? 'hover:-translate-y-2 hover:border-primary-400 cursor-pointer'
        : 'opacity-70 grayscale-[30%] cursor-not-allowed'
    } transition-all duration-300 overflow-hidden`;

  return (
    <div className="min-h-screen relative overflow-hidden pb-20 transition-colors duration-300">
      {/* Geometric Pattern Background */}

      {/* Decorative Blobs */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '3s' }}></div>

      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white text-slate-900 dark:bg-slate-800 dark:text-white px-6 py-3 rounded-full shadow-lg border border-slate-200 dark:border-borderSubtle z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-16 glass-panel-elevated p-10 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 z-0"></div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 mb-4 relative z-10 drop-shadow-sm">
            {t('requestia.title', 'Mapa de Requestia')}
          </h1>
          <p className="mt-4 text-xl text-textMuted font-medium max-w-2xl mx-auto relative z-10">
            {t('requestia.subtitle', 'Explore as regiões deste mundo cibernético e desvende os mistérios da comunicação entre sistemas.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region, idx) => {
            const isAvailable = region.status === 'Disponível';
            
            const content = (
              <>
                <div className="absolute inset-0 bg-white/40 dark:bg-surface/60 z-0"></div>
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <h3 className={`text-2xl font-bold ${isAvailable ? 'text-textMain group-hover:text-primary-600 dark:group-hover:text-primary-300' : 'text-textMuted'} transition-colors`}>{region.name}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold tracking-wider ${isAvailable ? 'bg-primary-100 text-primary-600 border border-primary-200 dark:bg-primary-500/20 dark:text-primary-300 dark:border-primary-500/30' : 'bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}>
                    {getStatusLabel(region.status)}
                  </span>
                </div>
                <p className="relative z-10 text-textMuted leading-relaxed font-medium">{region.desc}</p>
                
                {isAvailable && (
                  <div className="relative z-10 mt-6 pt-4 border-t border-borderSubtle flex justify-end">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400 flex items-center group-hover:text-primary-500 dark:group-hover:text-primary-300 transition-colors">
                      {t('requestia.explore', 'Explorar')} <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                  </div>
                )}
              </>
            );

            return isAvailable ? (
              <Link key={idx} to={region.to!} className={cardClassName(true)}>
                {content}
              </Link>
            ) : (
              <div key={idx} onClick={handleSoonClick} className={cardClassName(false)}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
