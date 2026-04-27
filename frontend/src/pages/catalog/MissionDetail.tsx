import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, type Mission, type TheoryLesson, type TheoryProgress } from '../../lib/api';
import FlowViewer from './components/FlowViewer';
import HttpSandboxPanel from './components/HttpSandboxPanel';
import FeedbackPanel from './components/FeedbackPanel';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function MissionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  
  const [mission, setMission] = useState<Mission | null>(null);
  const [access, setAccess] = useState<any>(null);
  const [scenario, setScenario] = useState<any>(null);
  const [guidedSteps, setGuidedSteps] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [relatedLesson, setRelatedLesson] = useState<TheoryLesson | null>(null);
  const [lessonProgress, setLessonProgress] = useState<TheoryProgress | null>(null);

  // Checkpoint states
  const [checkpointAnswer, setCheckpointAnswer] = useState('');
  const [checkpointFeedback, setCheckpointFeedback] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    setCheckpointAnswer('');
    setCheckpointFeedback(null);
  }, [currentStepIdx]);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const m = await api.getMissionBySlug(slug);
        setMission(m);
        
        if (m && user) {
          try {
            const acc = await api.getMissionAccess(m.id);
            setAccess(acc);
            
            if (acc.accessStatus !== 'LOCKED') {
              const [scen, steps, opts, lessons] = await Promise.all([
                api.getMissionScenario(m.id),
                api.getGuidedSteps(m.id),
                m.missionType === 'MULTIPLE_CHOICE' ? api.getMissionOptions(m.id) : Promise.resolve([]),
                api.getTheoryLessonsByModuleId(m.moduleId).catch(() => [])
              ]);
              setScenario(scen);
              setGuidedSteps(steps || []);
              setOptions(opts || []);
              
              const relLesson = lessons.find((l: TheoryLesson) => l.relatedMissionId === m.id) || null;
              setRelatedLesson(relLesson);
              if (relLesson) {
                try {
                   const p = await api.getLessonProgress(relLesson.id);
                   setLessonProgress(p);
                } catch(e) {}
              }
            }
          } catch (err: any) {
             if (err.message === 'Not authenticated' || !user) {
               // Let it be null, handled below
             }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [slug, user, i18n.language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission) return;
    
    setIsSubmitting(true);
    setFeedback(null);
    
    try {
      const result = await api.submitAttempt(mission.id, answer);
      setFeedback({
        isCorrect: result.correct,
        text: result.feedback,
        whatWasCorrect: result.whatWasCorrect,
        whatWasWrong: result.whatWasWrong,
        suggestedCorrection: result.suggestedCorrection,
        idealAnswer: result.idealAnswer,
        xpEarned: result.xpEarned
      });
      
      if (result.correct && user && result.xpEarned > 0) {
        user.totalXp = result.userTotalXp;
        user.level = result.userLevel;
      }
    } catch (err: any) {
      setFeedback({
        isCorrect: false,
        text: err.message || t('mission.submit_error', 'Erro ao submeter resposta. Tente novamente.')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheck = async () => {
    if (!mission || !guidedSteps[currentStepIdx]) return;
    const stepId = guidedSteps[currentStepIdx].id;
    setIsChecking(true);
    setCheckpointFeedback(null);
    try {
      const result = await api.checkGuidedStep(mission.id, stepId, checkpointAnswer);
      setCheckpointFeedback(result);
    } catch (err: any) {
      setCheckpointFeedback({
        correct: false,
        feedback: t('mission.check_error', 'Erro ao verificar. Tente novamente.')
      });
    } finally {
      setIsChecking(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse flex flex-col items-center"><div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div><p className="mt-4 text-primary-400 font-bold">{t('mission.starting_lab', 'Iniciando Laboratório...')}</p></div></div>;
  if (!mission) return <div className="p-12 text-red-500 text-center text-2xl font-bold">{t('mission.not_found', 'Missão não encontrada ou acesso negado.')}</div>;

  const currentStep = guidedSteps.length > 0 ? guidedSteps[currentStepIdx] : null;

  if (access && access.accessStatus === 'LOCKED') {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
        <div className="absolute top-0 right-0 w-full h-[40vh] bg-gradient-to-b from-primary-900/10 to-transparent -z-10"></div>
        <div className="max-w-md w-full bg-surface border border-borderSubtle p-8 rounded-3xl text-center shadow-2xl">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-borderSubtle">
            <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h2 className="text-2xl font-black text-textMain mb-2">{t('mission.locked_title', 'Missão Bloqueada')}</h2>
          <p className="text-textMuted mb-8">{access.lockedReason}</p>
          <div className="space-y-3 flex flex-col">
            {access.previousMissionSlug && (
              <Link to={`/missions/${access.previousMissionSlug}`} className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm">
                {t('mission.go_prev', 'Ir para missão anterior')}
              </Link>
            )}
            <Link to="/tracks/fundamentos-apis-http" className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm">
              {t('mission.back_track', 'Voltar para a Trilha')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      <div className="absolute top-0 right-0 w-full h-[40vh] bg-gradient-to-b from-primary-900/10 to-transparent -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/tracks/fundamentos-apis-http" className="text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 flex items-center transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            {t('mission.back_map', 'Voltar para o Mapa')}
          </Link>
          <div className="flex items-center gap-2">
            {access && access.accessStatus === 'COMPLETED' && (
               <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/50 flex items-center shadow-sm">
                 <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                 {t('mission.completed_rev', 'CONCLUÍDA (REVISÃO)')}
               </span>
            )}
            <span className="text-xs font-black text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/20 px-3 py-1.5 rounded-full uppercase border border-amber-200 dark:border-amber-500/30 shadow-sm">
              {mission.xpReward} XP
            </span>
            <span className="text-xs font-bold text-primary-700 bg-primary-100 dark:text-primary-300 dark:bg-primary-900/20 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-500/30">
              {t('dashboard.level', 'NÍVEL')} {mission.difficulty}
            </span>
          </div>
        </div>

        <div className="bg-surface backdrop-blur-xl rounded-3xl border border-borderSubtle shadow-xl overflow-hidden relative">
          <div className="bg-slate-50/50 dark:bg-slate-800/80 p-8 border-b border-borderSubtle relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[60px] translate-x-1/3 -translate-y-1/3"></div>
            <h1 className="text-4xl font-black text-textMain tracking-tight relative z-10">{mission.title}</h1>
            <p className="mt-3 text-lg text-textMuted relative z-10">{mission.objective}</p>
          </div>
          
          {relatedLesson && (!lessonProgress || !lessonProgress.completedAt) && (
             <div className="bg-amber-50 dark:bg-amber-900/10 border-b border-amber-200 dark:border-amber-800/50 p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                   <h3 className="font-bold text-amber-800 dark:text-amber-400 flex items-center mb-1">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {t('theoryProgress.recommendedBeforeMission', 'Recomendado antes da missão:')}
                   </h3>
                   <p className="text-amber-700 dark:text-amber-300/80 text-sm">Estude a teoria deste módulo para entender melhor o que será praticado.</p>
                </div>
                <Link to={`/lessons/${relatedLesson.id}`} className="shrink-0 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 dark:hover:bg-amber-800/60 text-amber-800 dark:text-amber-300 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors border border-amber-200 dark:border-amber-700/50">
                   {t('theoryProgress.studyTheory', 'Estudar Teoria')}
                </Link>
             </div>
          )}

          <div className="p-8 space-y-10">
            {/* Auth check message */}
            {!user && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/50 rounded-2xl p-6 text-center shadow-inner mt-4">
                 <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-2">{t('mission.auth_required_title', 'Autenticação Necessária')}</h3>
                 <p className="text-amber-700 dark:text-amber-200/80 mb-4">{t('mission.auth_required_desc', 'Você precisa estar logado para ver o conteúdo guiado, o cenário de simulação e enviar respostas.')}</p>
                 <Link to="/login" className="inline-block bg-primary-600 hover:bg-primary-500 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-sm">
                   {t('nav.login', 'Fazer Login')}
                 </Link>
              </div>
            )}

            {/* Guided Study Panel */}
            {user && guidedSteps.length > 0 && (
              <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-borderSubtle overflow-hidden shadow-sm">
                <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-b border-borderSubtle flex justify-between items-center">
                  <h3 className="font-bold text-primary-600 dark:text-primary-400 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                    {t('mission.guided_study', 'Modo Estudo Guiado')}
                  </h3>
                  <span className="text-xs font-medium text-textMuted bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">{t('mission.step', 'Passo')} {currentStepIdx + 1} {t('mission.of', 'de')} {guidedSteps.length}</span>
                </div>
                
                <div className="p-6">
                  {currentStep && (
                    <div className="animate-fadeIn">
                      <h4 className="text-xl font-bold text-textMain mb-3">{currentStep.title}</h4>
                      <p className="text-textMuted leading-relaxed mb-4">{currentStep.content}</p>
                      
                      {currentStep.example && (
                        <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-lg font-mono text-sm text-primary-700 dark:text-primary-300 mb-4 border border-borderSubtle">
                          {currentStep.example}
                        </div>
                      )}
                      
                      {currentStep.commonMistake && (
                        <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
                          <p className="text-sm font-bold text-amber-600 dark:text-amber-500 mb-1">{t('mission.common_mistake', 'Erro Comum:')}</p>
                          <p className="text-sm text-amber-700 dark:text-amber-200/80">{currentStep.commonMistake}</p>
                        </div>
                      )}
                      
                      {currentStep.checkpointQuestion && (
                        <div className="mt-6 p-5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-primary-200 dark:border-primary-500/30">
                          <h5 className="text-primary-600 dark:text-primary-300 font-bold mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            {t('mission.checkpoint', 'Checkpoint Rápido')}
                          </h5>
                          <p className="text-textMuted mb-3">{currentStep.checkpointQuestion}</p>
                          <div className="flex gap-3">
                            <input
                              type="text"
                              value={checkpointAnswer}
                              onChange={(e) => setCheckpointAnswer(e.target.value)}
                              placeholder={t('mission.your_answer', 'Sua resposta...')}
                              className="flex-1 bg-white dark:bg-slate-950/80 border border-borderSubtle text-textMain rounded-lg px-4 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 shadow-sm"
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                            />
                            <button
                              onClick={handleCheck}
                              disabled={isChecking || !checkpointAnswer.trim()}
                              className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 shadow-sm"
                            >
                              {isChecking ? t('mission.checking', 'Verificando...') : t('mission.check_btn', 'Verificar resposta')}
                            </button>
                          </div>
                          
                          {checkpointFeedback && (
                            <div className={`mt-4 p-4 rounded-lg border ${checkpointFeedback.correct ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-200' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-500/50 text-amber-700 dark:text-amber-200'}`}>
                              <p className="font-bold flex items-center mb-1">
                                {checkpointFeedback.correct ? (
                                  <><svg className="w-4 h-4 mr-1 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> {t('mission.correct', 'Correto!')}</>
                                ) : (
                                  <><svg className="w-4 h-4 mr-1 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg> {t('mission.not_yet', 'Ainda não.')}</>
                                )}
                              </p>
                              <p className="text-sm opacity-90">{checkpointFeedback.feedback}</p>
                              {checkpointFeedback.nextStepSuggestion && (
                                <p className="text-xs mt-2 italic opacity-70">{checkpointFeedback.nextStepSuggestion}</p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-8 pt-4 border-t border-borderSubtle">
                    <button 
                      onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}
                      disabled={currentStepIdx === 0}
                      className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      &larr; {t('mission.prev', 'Anterior')}
                    </button>
                    <button 
                      onClick={() => setCurrentStepIdx(Math.min(guidedSteps.length - 1, currentStepIdx + 1))}
                      disabled={currentStepIdx === guidedSteps.length - 1}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {t('mission.next', 'Próximo')} &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Simulation Scenario Flow */}
            {user && scenario && (
              <div className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-6 border border-borderSubtle shadow-inner">
                <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>
                  {t('mission.sim_scenario', 'Simulação da Requisição')}
                </h3>
                <p className="text-sm text-textMuted mb-4">{scenario.description}</p>
                <div className="bg-white dark:bg-transparent rounded-xl border border-borderSubtle dark:border-transparent">
                  <FlowViewer scenario={scenario} />
                </div>
                <div className="mt-8">
                  <HttpSandboxPanel missionSlug={mission.slug} />
                </div>
              </div>
            )}
            
            {/* Mission Form */}
            {user && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-xl shadow-indigo-900/20 mb-8 border border-indigo-500/30">
                 <form onSubmit={handleSubmit} className="relative z-10 p-8 space-y-6">
                   <div>
                     <label className="block text-sm font-bold text-indigo-100 mb-3 uppercase tracking-wide">
                       {options.length > 0 ? t('mission.select_correct', 'Selecione a Alternativa Correta:') : t('mission.input_cmd', 'Comando do Terminal / Resposta da Missão:')}
                     </label>
                     
                     {options.length > 0 ? (
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {options.map((opt) => (
                           <button
                             key={opt.id}
                             type="button"
                             onClick={() => setAnswer(opt.value)}
                             className={`text-left p-4 rounded-xl border-2 transition-all ${
                               answer === opt.value 
                                 ? 'bg-primary-50 dark:bg-primary-900/40 border-primary-500 shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                                 : 'bg-white dark:bg-slate-800/60 border-borderSubtle hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                             }`}
                           >
                             <div className="font-bold text-textMain text-lg">{opt.label}</div>
                           </button>
                         ))}
                       </div>
                     ) : (
                       <input 
                         type="text" 
                         value={answer}
                         onChange={(e) => setAnswer(e.target.value)}
                         placeholder="Ex: GET /api/produtos"
                         className="w-full px-5 py-4 bg-white dark:bg-slate-950/80 font-mono text-lg text-textMain dark:text-primary-300 border-2 border-borderSubtle rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
                       />
                     )}
                   </div>
                   <button 
                     type="submit"
                     disabled={isSubmitting || !answer.trim()}
                     className="w-full sm:w-auto bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center"
                   >
                     {isSubmitting ? (
                       <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> {t('mission.processing', 'Processando...')}</>
                     ) : (
                       <>{t('mission.submit_btn', 'Submeter Requisição')} <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></>
                     )}
                   </button>
                 </form>
              </div>
            )}

            <FeedbackPanel feedback={feedback} />
            
          </div>
        </div>
      </div>
    </div>
  );
}
