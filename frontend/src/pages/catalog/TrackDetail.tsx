import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, type Track, type LearningModule, type Mission, type TheoryLesson, type TheoryProgress } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import TheoryLessonCard from './components/TheoryLessonCard';

export default function TrackDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [track, setTrack] = useState<Track | null>(null);
  const [modules, setModules] = useState<{ module: LearningModule, lessons: TheoryLesson[], missions: Mission[] }[]>([]);
  const [accessMap, setAccessMap] = useState<Record<string, any>>({});
  const [theoryMap, setTheoryMap] = useState<Record<string, TheoryProgress>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const t = await api.getTrackBySlug(slug);
        setTrack(t);
        
        const mods = await api.getModulesByTrackId(t.id);
        const map: Record<string, any> = {};

        const modulesWithMissions = await Promise.all(
          mods.map(async (m) => {
            const missions = await api.getMissionsByModuleId(m.id);
            let lessons: TheoryLesson[] = [];
            try {
              lessons = await api.getTheoryLessonsByModuleSlug(m.slug);
            } catch (e) {
              console.error("Failed to fetch lessons for module", m.slug);
            }

            if (user) {
              for (const mission of missions) {
                try {
                  const access = await api.getMissionAccess(mission.id);
                  map[mission.id] = access;
                } catch (e) {
                  // Ignore
                }
              }
            }
            return { module: m, lessons, missions };
          })
        );
        
        const tMap: Record<string, TheoryProgress> = {};
        if (user) {
          try {
            const theoryProgress = await api.getMyTheoryProgress();
            for (const tp of theoryProgress) {
              tMap[tp.lessonId] = tp;
            }
          } catch(e) {}
        }

        setModules(modulesWithMissions);
        setAccessMap(map);
        setTheoryMap(tMap);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [slug, user, i18n.language]);

  if (isLoading) return <div className="p-12 text-textMuted animate-pulse">{t('tracks.loading', 'Carregando trilhas...')}</div>;
  if (!track) return <div className="p-12 text-red-500 font-bold">{t('tracks.not_found', 'Trilha não encontrada.')}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-textMain mb-4">{track.title}</h1>
        <p className="text-xl text-textMuted glass-panel p-6 rounded-lg">
          {track.description}
        </p>
      </div>

      <div className="space-y-8">
        {modules.map(({ module, lessons, missions }, idx) => (
          <div key={module.id} className="glass-panel-elevated rounded-xl overflow-hidden shadow-xl">
            <div className="bg-slate-50/50 dark:bg-slate-800/80 p-5 border-b border-borderSubtle">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-2xl font-black text-textMain flex items-center">
                  <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400 text-sm py-1 px-3 rounded-lg mr-3 border border-primary-200 dark:border-primary-500/30">
                    {t('tracks.module', 'Módulo')} {idx + 1}
                  </span>
                  {module.title}
                </h2>
                <div className="flex gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span>{t('lesson.theoryBadge', 'Teoria')}: {lessons.filter(l => theoryMap[l.id]?.completedAt).length}/{lessons.length}</span>
                  <span>Quiz: {lessons.filter(l => theoryMap[l.id]?.quizAttemptedAt).length}/{lessons.length}</span>
                  <span>Missões: {missions.filter(m => accessMap[m.id]?.accessStatus === 'COMPLETED').length}/{missions.length}</span>
                </div>
              </div>
            </div>
            <div className="divide-y divide-borderSubtle">
              {/* Theory Lessons First */}
              {lessons.map(lesson => (
                <TheoryLessonCard key={lesson.id} lesson={lesson} progress={theoryMap[lesson.id]} />
              ))}

              {/* Practical Missions Next */}
              {missions.map((mission, mIdx) => {
                const access = accessMap[mission.id];
                const isLocked = access && access.accessStatus === 'LOCKED';
                const isCompleted = access && access.accessStatus === 'COMPLETED';
                const isAvailable = access && access.accessStatus === 'AVAILABLE';

                return (
                  <div key={mission.id} className={`p-5 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${isLocked ? 'bg-slate-50 dark:bg-slate-900/30 opacity-70 grayscale-[30%]' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-white dark:bg-slate-800/10'}`}>
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {isLocked ? (
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-borderSubtle flex items-center justify-center shadow-inner">
                            <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                          </div>
                        ) : isCompleted ? (
                          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-500/50 flex items-center justify-center shadow-sm dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-500/50 flex items-center justify-center shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                            <span className="font-black text-primary-600 dark:text-primary-400">{mIdx + 1}</span>
                          </div>
                        )}
                      </div>
                      <div>
                         <h4 className={`text-lg font-bold ${isLocked ? 'text-textMuted' : 'text-textMain'}`}>
                           {mission.title}
                         </h4>
                         <p className="text-sm text-textMuted mt-1 line-clamp-2">{mission.description}</p>
                         <div className="text-xs mt-2 flex gap-3 items-center">
                           <span className={`uppercase font-black ${isLocked ? 'text-slate-400 dark:text-slate-500' : 'text-amber-500 dark:text-amber-400'}`}>{mission.xpReward} XP</span>
                           <span className={isLocked ? 'text-slate-400 dark:text-slate-600' : 'text-primary-500 dark:text-primary-300'}>{t('dashboard.level', 'Nível')} {mission.difficulty}</span>
                           {isLocked && access.lockedReason && (
                             <span className="text-red-500 dark:text-red-400 flex items-center ml-2">
                               <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                               {t('tracks.pending_req', 'Requisito pendente')}
                             </span>
                           )}
                         </div>
                      </div>
                    </div>
                    
                    <div className="shrink-0 flex sm:flex-col justify-end sm:items-end gap-2 mt-4 sm:mt-0">
                      {isLocked ? (
                        <Link to={`/missions/${mission.slug}`} className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-5 py-2.5 rounded-xl text-sm font-bold border border-borderSubtle transition-colors cursor-pointer text-center flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700">
                          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                          {t('status.locked')}
                        </Link>
                      ) : isCompleted ? (
                        <Link to={`/missions/${mission.slug}`} className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-600 hover:text-emerald-800 dark:hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold border border-emerald-300 dark:border-emerald-700/50 transition-colors shadow-sm text-center flex items-center justify-center">
                          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                          {t('actions.review')}
                        </Link>
                      ) : isAvailable ? (
                        <Link to={`/missions/${mission.slug}`} className="bg-primary-600 text-white hover:bg-primary-500 px-5 py-2.5 rounded-xl text-sm font-bold border border-primary-500 transition-colors shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.4)] text-center flex items-center justify-center">
                          {t('actions.continue')} <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </Link>
                      ) : (
                        <Link to={`/missions/${mission.slug}`} className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-600 hover:text-primary-800 dark:hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors text-center">
                          {t('actions.start')}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
              {missions.length === 0 && lessons.length > 0 && (
                <div className="p-6 text-sm text-textMuted text-center font-medium bg-white dark:bg-slate-800/10">
                  {t('tracks.theory_only_module', 'Este módulo já tem teoria disponível. Estude a aula para preparar sua base antes das próximas missões.')}
                </div>
              )}
              {missions.length === 0 && lessons.length === 0 && (
                <div className="p-6 text-sm text-textMuted text-center font-medium">{t('tracks.empty_missions', 'Nenhuma missão cadastrada neste módulo ainda.')}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
