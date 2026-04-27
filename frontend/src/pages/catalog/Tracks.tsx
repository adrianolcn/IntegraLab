import { useState, useEffect } from 'react';
import { api, type Track } from '../../lib/api';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Tracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getTracks();
        setTracks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [i18n.language]);

  const getStatusLabel = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'available' || s === 'disponível') return t('status.available');
    if (s === 'locked' || s === 'bloqueado') return t('status.locked');
    if (s === 'coming_soon' || s === 'em breve') return t('status.coming_soon');
    if (s === 'completed' || s === 'concluída') return t('status.completed');
    return status;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 border-b border-borderSubtle pb-5">
        <h1 className="text-4xl font-extrabold text-primary-600 dark:text-primary-400">{t('tracks.title')}</h1>
        <p className="mt-2 text-xl text-textMuted">{t('tracks.subtitle')}</p>
      </div>

      {isLoading ? (
        <div className="text-textMuted animate-pulse">{t('tracks.loading')}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => (
            <div key={track.id} className="p-6 rounded-xl glass-panel hover:border-primary-500 transition-all shadow-lg flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-textMain">{track.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full font-semibold bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300">
                    {getStatusLabel(track.status)}
                  </span>
                </div>
                <p className="text-textMuted mb-6">{track.description}</p>
              </div>
              <div>
                <Link to={`/tracks/${track.slug}`} className="inline-block bg-primary-600 hover:bg-primary-500 text-white font-medium py-2 px-4 rounded transition-colors shadow-sm">
                  {t('tracks.viewDetails')}
                </Link>
              </div>
            </div>
          ))}
          {tracks.length === 0 && (
            <div className="text-textMuted">{t('tracks.empty')}</div>
          )}
        </div>
      )}
    </div>
  );
}
