import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Play, Trophy, Star } from 'lucide-react';
import { api, type TheoryLesson, type TheoryProgress } from '../../lib/api';

interface RecommendedStep {
  type: 'theory' | 'quiz' | 'sandbox' | 'mission' | 'track';
  title: string;
  subtitle: string;
  link: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [nextStep, setNextStep] = useState<RecommendedStep | null>(null);
  const [loadingNext, setLoadingNext] = useState(true);

  useEffect(() => {
    async function loadNext() {
      if (!user) return;
      try {
        const track = await api.getTrackBySlug('fundamentos-apis-http');
        const mods = await api.getModulesByTrackId(track.id);
        const theoryProgressRaw = await api.getMyTheoryProgress().catch(() => [] as TheoryProgress[]);
        const tpMap = theoryProgressRaw.reduce((acc, p) => ({ ...acc, [p.lessonId]: p }), {} as Record<string, TheoryProgress>);

        let foundStep: RecommendedStep | null = null;

        for (const m of mods) {
          if (foundStep) break;
          const missions = await api.getMissionsByModuleId(m.id);
          const lessons = await api.getTheoryLessonsByModuleId(m.id).catch(() => [] as TheoryLesson[]);

          for (const mission of missions) {
            try {
              const acc = await api.getMissionAccess(mission.id);
              if (acc.accessStatus !== 'COMPLETED') {
                // Check if related lesson is done
                const relLesson = lessons.find(l => l.relatedMissionId === mission.id);
                if (relLesson) {
                   const tp = tpMap[relLesson.id];
                   if (!tp || !tp.completedAt) {
                      foundStep = { type: 'theory', title: relLesson.title, subtitle: t('theoryProgress.studyTheory', 'Estudar Teoria'), link: `/lessons/${relLesson.id}` };
                      break;
                   }
                   if (relLesson.miniQuiz && !tp.quizPassed) {
                      foundStep = { type: 'quiz', title: relLesson.title, subtitle: t('theoryProgress.takeQuiz', 'Fazer Quiz'), link: `/lessons/${relLesson.id}` };
                      break;
                   }
                   if (relLesson.relatedMissionId && !tp.sandboxUsedAt) {
                      foundStep = { type: 'sandbox', title: relLesson.title, subtitle: t('theoryProgress.trySandbox', 'Testar no Sandbox'), link: `/missions/${mission.slug}#sandbox` };
                      break;
                   }
                }
                
                // If all theory parts done or no related theory, recommend mission
                foundStep = { type: 'mission', title: mission.title, subtitle: t('theoryProgress.startMission', 'Iniciar Missão'), link: `/missions/${mission.slug}` };
                break;
              }
            } catch (e) {}
          }
        }
        
        if (!foundStep) {
           foundStep = { type: 'track', title: track.title, subtitle: t('theoryProgress.continueJourney', 'Continuar Jornada'), link: `/tracks/${track.slug}` };
        }
        
        setNextStep(foundStep);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingNext(false);
      }
    }
    loadNext();
  }, [user, i18n.language, t]);

  if (!user) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Geometric Pattern Background */}

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-full h-[30vh] bg-gradient-to-b from-primary-900/10 dark:from-primary-900/20 to-transparent -z-10"></div>
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-primary-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-12 glass-panel-elevated p-8 rounded-3xl inline-block w-full">
          <h1 className="text-5xl font-extrabold text-textMain tracking-tight">
            {t('dashboard.hello')}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-500">{user.name}</span>!
          </h1>
          <p className="mt-4 text-xl text-textMuted font-medium">{t('dashboard.continue_learning')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-8 rounded-2xl flex items-center hover:-translate-y-1 transition-all duration-300">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-600/40 dark:to-primary-900/40 border border-primary-200 dark:border-primary-500/30 mr-6 shadow-sm">
              <Trophy className="h-10 w-10 text-primary-600 dark:text-primary-400 drop-shadow-sm" />
            </div>
            <div>
              <p className="text-sm text-textMuted font-bold uppercase tracking-wider mb-1">{t('dashboard.level')}</p>
              <p className="text-4xl font-black text-textMain tracking-tight">{user.level}</p>
            </div>
          </div>
          <div className="glass-panel p-8 rounded-2xl flex items-center hover:-translate-y-1 transition-all duration-300">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-600/40 dark:to-amber-900/40 border border-amber-200 dark:border-amber-500/30 mr-6 shadow-sm">
              <Star className="h-10 w-10 text-amber-600 dark:text-amber-400 drop-shadow-sm" />
            </div>
            <div>
              <p className="text-sm text-textMuted font-bold uppercase tracking-wider mb-1">{t('dashboard.xp')}</p>
              <p className="text-4xl font-black text-textMain tracking-tight">{user.totalXp}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/90 dark:bg-surface/90 backdrop-blur-xl p-10 rounded-3xl border border-primary-200 dark:border-primary-800/60 shadow-lg relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 bg-primary-100 dark:bg-primary-600/30 w-64 h-64 rounded-full blur-[80px] group-hover:bg-primary-200 dark:group-hover:bg-primary-500/40 transition-colors duration-500"></div>
            <div className="absolute -bottom-10 -left-10 bg-blue-100 dark:bg-blue-600/20 w-64 h-64 rounded-full blur-[80px]"></div>
            
            <h2 className="text-3xl font-bold text-textMain mb-4 relative z-10">{t('dashboard.track_title', 'Fundamentos de APIs HTTP')}</h2>
            <p className="text-textMuted text-lg mb-8 relative z-10 leading-relaxed">
              {t('dashboard.track_desc', 'Aprenda como uma API funciona por dentro, acompanhando o caminho de uma requisição desde o cliente até a resposta final.')}
            </p>
            <Link to="/tracks/fundamentos-apis-http" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-md text-white bg-primary-600 hover:bg-primary-500 hover:-translate-y-1 transition-all duration-300 relative z-10">
              <Play className="h-5 w-5 mr-2" />
              {t('actions.continue', 'Continuar')}
            </Link>
          </div>

          <div className="bg-white/90 dark:bg-surface/90 backdrop-blur-xl p-10 rounded-3xl border border-slate-200 dark:border-borderSubtle shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 dark:from-slate-800/30 to-transparent z-0"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/50 uppercase tracking-widest">
                  {t('theoryProgress.recommendedNextStep', 'Próximo passo recomendado')}
                </span>
              </div>
              
              {loadingNext ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                </div>
              ) : nextStep ? (
                <div>
                  <h2 className="text-2xl font-bold text-textMain mb-2">{nextStep.title}</h2>
                  <p className="text-textMuted font-medium mb-8">{nextStep.subtitle}</p>
                </div>
              ) : (
                <p className="text-textMuted">{t('dashboard.all_done', 'Você concluiu todas as missões disponíveis!')}</p>
              )}
            </div>
            
            <div className="relative z-10 mt-auto">
              {nextStep && (
                <Link to={nextStep.link} className="inline-flex items-center px-6 py-3 border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 text-base font-bold rounded-xl bg-white dark:bg-slate-800 text-textMain hover:text-primary-600 dark:hover:text-primary-400 transition-all shadow-sm hover:shadow-md">
                  <Play className="h-4 w-4 mr-2" />
                  {nextStep.subtitle}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
