import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { TheoryLesson, TheoryProgress } from '../../../lib/api';

interface TheoryLessonCardProps {
  lesson: TheoryLesson;
  progress?: TheoryProgress;
}

export default function TheoryLessonCard({ lesson, progress }: TheoryLessonCardProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-between gap-4 border-b border-borderSubtle bg-white/80 p-5 transition-all hover:bg-slate-50 dark:bg-slate-800/80 dark:hover:bg-slate-800 sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-start gap-4">
        <div className="mt-1">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-500/50 flex items-center justify-center shadow-sm dark:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <div className="min-w-0">
          <h4 className="flex flex-wrap items-center gap-2 text-lg font-bold text-textMain">
            {lesson.title}
            
            {/* Status Chips */}
            {progress?.completedAt ? (
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50">
                {t('theoryProgress.studied', 'Estudada')}
              </span>
            ) : progress?.openedAt ? (
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/30 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/50">
                {t('theoryProgress.started', 'Iniciada')}
              </span>
            ) : null}
            
            {progress?.quizAttemptedAt && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/50">
                {t('theoryProgress.quizDone', 'Quiz concluído')}
              </span>
            )}
            
            {progress?.sandboxUsedAt && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-100 dark:text-sky-400 dark:bg-sky-900/30 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800/50">
                {t('theoryProgress.sandboxUsed', 'Sandbox testado')}
              </span>
            )}
          </h4>
          <p className="mt-1 line-clamp-2 text-sm text-textMuted">{lesson.summary}</p>
          
          {(() => {
            if (!lesson.learningObjectives) return null;
            try {
              const obj = JSON.parse(lesson.learningObjectives);
              if (Array.isArray(obj) && obj.length > 0) {
                return (
                  <div className="mt-3 space-y-1">
                    {obj.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start text-xs text-slate-500 dark:text-slate-400">
                        <svg className="w-3 h-3 text-indigo-500 mr-1.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                );
              }
            } catch (e) {}
            return null;
          })()}

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {lesson.readingTimeMinutes} {t('lesson.minutes', 'minutos')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="shrink-0 flex justify-end mt-4 sm:mt-0">
        <Link 
          to={`/lessons/${lesson.id}`} 
          className="bg-indigo-600 text-white hover:bg-indigo-500 px-5 py-2.5 rounded-xl text-sm font-bold border border-indigo-500 transition-colors shadow-sm dark:shadow-[0_0_15px_rgba(99,102,241,0.4)] text-center flex items-center justify-center"
        >
          {t('lesson.studyConcept', 'Estudar conceito')}
          <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </Link>
      </div>
    </div>
  );
}
