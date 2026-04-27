import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, type TheoryLesson, type TheoryProgress } from '../../lib/api';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

// New Theory Components
import LearningObjectives from './components/theory/LearningObjectives';
import AnalogyCallout from './components/theory/AnalogyCallout';
import ConceptAccordion from './components/theory/ConceptAccordion';
import MistakeCard from './components/theory/MistakeCard';
import GlossaryList from './components/theory/GlossaryList';
import MiniQuizCard from './components/theory/MiniQuizCard';
import InteractiveMethods from './components/theory/InteractiveMethods';
import CodeExampleBlock from './components/theory/CodeExampleBlock';
import ConceptText from './components/theory/ConceptText';
import InteractiveFlowPlayer from './components/theory/InteractiveFlowPlayer';
import VerbSummaryCards from './components/theory/VerbSummaryCards';
import EcommerceExampleCards from './components/theory/EcommerceExampleCards';
import InteractiveStatusCodes from './components/theory/InteractiveStatusCodes';
import WhoNeedsToActBlock from './components/theory/WhoNeedsToActBlock';
import StatusDiagnosisCards from './components/theory/StatusDiagnosisCards';
import InteractiveRequestAnatomy from './components/theory/InteractiveRequestAnatomy';
import HeaderBodyComparator from './components/theory/HeaderBodyComparator';
import JsonExplorer from './components/theory/JsonExplorer';
import ContentTypeLab from './components/theory/ContentTypeLab';
import AuthFlowPlayer from './components/theory/AuthFlowPlayer';
import AuthVsAuthorizationBlock from './components/theory/AuthVsAuthorizationBlock';
import BearerTokenAnatomy from './components/theory/BearerTokenAnatomy';
import AuthErrorComparator from './components/theory/AuthErrorComparator';
import SecureEndpointLab from './components/theory/SecureEndpointLab';
import DebugFlowPlayer from './components/theory/DebugFlowPlayer';
import DebugChecklist from './components/theory/DebugChecklist';
import ErrorTriageCards from './components/theory/ErrorTriageCards';
import RequestInspector from './components/theory/RequestInspector';
import LogInspector from './components/theory/LogInspector';

export default function LessonDetail() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [lesson, setLesson] = useState<TheoryLesson | null>(null);
  const [progress, setProgress] = useState<TheoryProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!lessonId) return;
      setIsLoading(true);
      try {
        const data = await api.getTheoryLessonById(lessonId);
        setLesson(data);
        
        if (user) {
          try {
            const p = await api.getLessonProgress(lessonId);
            setProgress(p);
            if (!p.openedAt) {
               const newP = await api.markLessonOpened(lessonId);
               setProgress(newP);
            }
          } catch(err) {
            // Probably didn't exist, let's open it
            const newP = await api.markLessonOpened(lessonId);
            setProgress(newP);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [lessonId, user, i18n.language]);

  const handleMarkStudied = async () => {
    if (!user || !lessonId) return;
    try {
      const newP = await api.markLessonCompleted(lessonId);
      setProgress(newP);
    } catch(err) {
      console.error(err);
    }
  };

  if (isLoading) return <div className="p-12 text-textMuted animate-pulse">{t('lesson.loading', 'Carregando aula...')}</div>;
  if (!lesson) return <div className="p-12 text-rose-500 font-bold">{t('lesson.not_found', 'Aula não encontrada.')}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <Link to="/tracks" className="inline-flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          {t('lesson.backToModule', 'Voltar para o módulo')}
        </Link>
        {!user && (
          <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
            {t('theoryProgress.signInToSave', 'Entre na sua conta para salvar seu progresso.')}
          </span>
        )}
      </div>

      <div className="glass-panel-elevated rounded-2xl overflow-hidden shadow-2xl mb-12">
        
        {/* 1. Hero */}
        <div className="bg-white/80 dark:bg-slate-900/80 p-8 md:p-12 border-b border-borderSubtle">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 text-xs font-bold py-1 px-3 rounded-full border border-indigo-200 dark:border-indigo-500/30">
              {t('lesson.theoryBadge', 'Teoria')}
            </span>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {lesson.readingTimeMinutes} {t('lesson.minRead', 'min leitura')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-textMain leading-tight mb-6">{lesson.title}</h1>
          <p className="text-xl text-textMuted leading-relaxed">{lesson.summary}</p>
        </div>

        <div className="p-8 md:p-12 bg-white/50 dark:bg-slate-900/40">
          
          {/* 2. O que você vai aprender */}
          {lesson.learningObjectives && (
            <LearningObjectives objectivesJson={lesson.learningObjectives} />
          )}

          {/* 3. Explicação principal */}
          <div className="prose dark:prose-invert max-w-none text-textMain text-lg leading-relaxed space-y-8 mb-12">
            {lesson.content
              .replace(/\\n/g, '\n') // Fix literal '\n' escaping from database
              .split(/\n\s*\n/)      // Split safely by blank lines (\n\n, \r\n\r\n)
              .map((paragraph, i) => {
              
              if (!paragraph.trim()) return null;

              // Inject [[VERB_SUMMARY]]
              if (paragraph.includes('[[VERB_SUMMARY]]')) {
                return <VerbSummaryCards key={`verb-${i}`} />;
              }

              // Inject [[ECOMMERCE_EXAMPLE]]
              if (paragraph.includes('[[ECOMMERCE_EXAMPLE]]')) {
                return <EcommerceExampleCards key={`ecom-${i}`} glossaryJson={lesson.glossary} />;
              }

              // Inject [[STATUS_CODES_INTERACTIVE]]
              if (paragraph.includes('[[STATUS_CODES_INTERACTIVE]]')) {
                return <InteractiveStatusCodes key={`sc-${i}`} glossaryJson={lesson.glossary} />;
              }

              // Inject [[WHO_NEEDS_TO_ACT]]
              if (paragraph.includes('[[WHO_NEEDS_TO_ACT]]')) {
                return <WhoNeedsToActBlock key={`who-${i}`} glossaryJson={lesson.glossary} />;
              }

              // Inject [[STATUS_DIAGNOSIS]]
              if (paragraph.includes('[[STATUS_DIAGNOSIS]]')) {
                return <StatusDiagnosisCards key={`diag-${i}`} glossaryJson={lesson.glossary} />;
              }

              // Inject [[REQUEST_ANATOMY]]
              if (paragraph.includes('[[REQUEST_ANATOMY]]')) {
                return <InteractiveRequestAnatomy key={`ra-${i}`} glossaryJson={lesson.glossary} />;
              }

              // Inject [[HEADER_BODY_COMPARATOR]]
              if (paragraph.includes('[[HEADER_BODY_COMPARATOR]]')) {
                return <HeaderBodyComparator key={`hbc-${i}`} glossaryJson={lesson.glossary} />;
              }

              // Inject [[JSON_EXPLORER]]
              if (paragraph.includes('[[JSON_EXPLORER]]')) {
                return <JsonExplorer key={`je-${i}`} glossaryJson={lesson.glossary} />;
              }

              // Inject [[CONTENT_TYPE_LAB]]
              if (paragraph.includes('[[CONTENT_TYPE_LAB]]')) {
                return <ContentTypeLab key={`ctl-${i}`} glossaryJson={lesson.glossary} />;
              }

              // Inject Phase 3.4K Auth tokens
              if (paragraph.includes('[[AUTH_FLOW]]')) {
                return <AuthFlowPlayer key={`af-${i}`} glossaryJson={lesson.glossary} />;
              }
              if (paragraph.includes('[[AUTH_VS_AUTHORIZATION]]')) {
                return <AuthVsAuthorizationBlock key={`avsa-${i}`} glossaryJson={lesson.glossary} />;
              }
              if (paragraph.includes('[[BEARER_TOKEN_ANATOMY]]')) {
                return <BearerTokenAnatomy key={`bta-${i}`} glossaryJson={lesson.glossary} />;
              }
              if (paragraph.includes('[[AUTH_ERROR_COMPARATOR]]')) {
                return <AuthErrorComparator key={`aec-${i}`} glossaryJson={lesson.glossary} />;
              }
              if (paragraph.includes('[[SECURE_ENDPOINT_LAB]]')) {
                return <SecureEndpointLab key={`sel-${i}`} glossaryJson={lesson.glossary} />;
              }

              // Inject Phase 3.4L Debug tokens
              if (paragraph.includes('[[DEBUG_FLOW]]')) {
                return <DebugFlowPlayer key={`dbgf-${i}`} glossaryJson={lesson.glossary} />;
              }
              if (paragraph.includes('[[DEBUG_CHECKLIST]]')) {
                return <DebugChecklist key={`dbgc-${i}`} glossaryJson={lesson.glossary} />;
              }
              if (paragraph.includes('[[ERROR_TRIAGE]]')) {
                return <ErrorTriageCards key={`errt-${i}`} glossaryJson={lesson.glossary} />;
              }
              if (paragraph.includes('[[REQUEST_INSPECTOR]]')) {
                return <RequestInspector key={`reqi-${i}`} glossaryJson={lesson.glossary} />;
              }
              if (paragraph.includes('[[LOG_INSPECTOR]]')) {
                return <LogInspector key={`logi-${i}`} glossaryJson={lesson.glossary} />;
              }

              // Create visual blocks if the paragraph starts with standard markers
              if (paragraph.startsWith('>> ')) {
                return (
                  <div key={i} className="p-5 bg-slate-50 dark:bg-slate-900/50 border-l-4 border-indigo-500 rounded-r-xl shadow-sm text-indigo-900 dark:text-indigo-200">
                    <ConceptText text={paragraph.slice(3)} glossaryJson={lesson.glossary} />
                  </div>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h3 key={i} className="text-2xl font-bold text-textMain mt-10 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <ConceptText text={paragraph.slice(3)} glossaryJson={lesson.glossary} />
                  </h3>
                );
              }
              // Basic list parsing if block contains newlines starting with hyphen
              if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').filter(line => line.trim().startsWith('- '));
                const textBeforeList = paragraph.split('\n- ')[0];
                
                return (
                  <div key={i} className="mb-4">
                    {textBeforeList && !textBeforeList.startsWith('- ') && (
                      <p className="mb-2"><ConceptText text={textBeforeList} glossaryJson={lesson.glossary} /></p>
                    )}
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {listItems.map((item, idx) => (
                        <li key={idx}>
                          <ConceptText text={item.replace(/^- /, '')} glossaryJson={lesson.glossary} />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              return (
                <p key={i}>
                  <ConceptText text={paragraph} glossaryJson={lesson.glossary} />
                </p>
              );
            })}
          </div>

          {/* 3.5 Fluxo Interativo */}
          {lesson.interactiveFlow && (
            <InteractiveFlowPlayer flowJson={lesson.interactiveFlow} glossaryJson={lesson.glossary} />
          )}

          {/* 4. Analogia didática */}
          {lesson.analogy && (
            <AnalogyCallout analogy={lesson.analogy} />
          )}

          {/* 5. Métodos HTTP Interativos (Specific to Methods lesson) */}
          {lesson.interactiveContent && (
            <InteractiveMethods interactiveJson={lesson.interactiveContent} glossaryJson={lesson.glossary} />
          )}

          {/* 6. Conceitos-chave interativos */}
          {lesson.keyConceptsDetailed && (
            <ConceptAccordion conceptsJson={lesson.keyConceptsDetailed} />
          )}

          {/* 7. Erros Comuns */}
          {lesson.commonMistakesDetailed && (
            <MistakeCard mistakesJson={lesson.commonMistakesDetailed} />
          )}

          {/* 8. Exemplos práticos / técnicos */}
          {lesson.practicalExample && (
            <div className="mt-12 mb-8">
              <h3 className="text-2xl font-bold text-textMain mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                {t('lesson.practicalExample', 'Na prática')}
              </h3>
              <p className="text-lg text-textMuted leading-relaxed">{lesson.practicalExample}</p>
            </div>
          )}

          {/* Request / Response examples side by side */}
          {(lesson.requestExample || lesson.responseExample) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {lesson.requestExample && (
                <CodeExampleBlock code={lesson.requestExample} type="Request" format="HTTP" />
              )}
              {lesson.responseExample && (
                <CodeExampleBlock code={lesson.responseExample} type="Response" format="JSON" />
              )}
            </div>
          )}

          {/* 9. Glossário */}
          {lesson.glossary && (
            <GlossaryList glossaryJson={lesson.glossary} />
          )}

          {/* 10. Mini Autoavaliação */}
          {lesson.miniQuiz && (
            <MiniQuizCard quizJson={lesson.miniQuiz} lessonId={lesson.id} progress={progress} setProgress={setProgress} />
          )}

          {/* 11. Antes da Missão */}
          {lesson.beforeMission && (
            <div className="mt-12 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-400 p-6 rounded-r-xl">
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 flex items-center mb-2">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                {t('lesson.beforeMission', 'Antes de ir para a missão')}
              </h3>
              <p className="text-amber-900 dark:text-amber-200">{lesson.beforeMission}</p>
            </div>
          )}
        </div>

        {/* 12. CTAs */}
        <div className="bg-slate-50/80 dark:bg-slate-800/80 p-8 border-t border-borderSubtle flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-4 w-full sm:w-auto">
            {user && (
              <button 
                onClick={handleMarkStudied}
                disabled={!!progress?.completedAt}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center ${
                  progress?.completedAt 
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 cursor-default' 
                    : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 cursor-pointer'
                }`}
              >
                {progress?.completedAt ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {t('theoryProgress.lessonStudied', 'Aula estudada')}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {t('theoryProgress.markAsStudied', 'Marcar como estudada')}
                  </>
                )}
              </button>
            )}
          </div>
          
          <div className="flex gap-4 w-full sm:w-auto flex-col sm:flex-row">
            {lesson.relatedMissionId && lesson.relatedMissionSlug ? (
            <>
                <Link 
                  to={`/missions/${lesson.relatedMissionSlug}#sandbox`}
                  onClick={() => {
                     if (user && lessonId) {
                        api.markSandboxUsed(lessonId).catch(console.error);
                     }
                  }}
                  className="w-full sm:w-auto bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 px-6 py-3.5 rounded-xl font-bold transition-colors shadow-sm text-center flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  {t('lesson.testInSandbox', 'Testar no Sandbox')}
                </Link>
              
              <Link 
                to={`/missions/${lesson.relatedMissionSlug}`}
                className="w-full sm:w-auto bg-primary-600 text-white hover:bg-primary-500 px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg dark:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-center flex items-center justify-center"
              >
                {t('lesson.goToMission', 'Ir para a missão prática')}
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </>
          ) : (
              <Link 
                to="/tracks"
                className="w-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 px-6 py-3.5 rounded-xl font-bold transition-colors shadow-sm text-center flex items-center justify-center"
              >
                {t('lesson.backToModule', 'Voltar para o módulo')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
