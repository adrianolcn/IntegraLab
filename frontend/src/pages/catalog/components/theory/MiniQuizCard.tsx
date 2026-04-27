import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { api, type TheoryProgress } from '../../../../lib/api';
import { useAuth } from '../../../../contexts/AuthContext';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface MiniQuizCardProps {
  quizJson: string;
  lessonId?: string;
  progress?: TheoryProgress | null;
  setProgress?: (p: TheoryProgress) => void;
}

export default function MiniQuizCard({ quizJson, lessonId, setProgress }: MiniQuizCardProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

  let questions: QuizQuestion[] = [];
  try {
    questions = JSON.parse(quizJson);
  } catch (e) {
    console.error("Failed to parse mini quiz", e);
    return null;
  }

  if (!Array.isArray(questions) || questions.length === 0) return null;

  const handleSelect = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    setShowFeedback(prev => ({ ...prev, [qIndex]: false }));
  };

  const handleCheck = async (qIndex: number) => {
    if (selectedAnswers[qIndex] !== undefined) {
      const newFeedback = { ...showFeedback, [qIndex]: true };
      setShowFeedback(newFeedback);

      // Check if finished
      if (Object.keys(newFeedback).length === questions.length) {
        if (!user || !lessonId) return;
        
        let score = 0;
        questions.forEach((q, idx) => {
          if (selectedAnswers[idx] === q.correctIndex) score++;
        });

        try {
          const newP = await api.recordQuizResult(lessonId, score, questions.length);
          if (setProgress) setProgress(newP);
        } catch(e) {
          console.error("Failed to save quiz", e);
        }
      }
    }
  };

  const isFinished = Object.keys(showFeedback).length === questions.length;

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-textMain mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {t('lesson.checkYourKnowledge', 'Mini Autoavaliação')}
      </h3>
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const isAnswered = selectedAnswers[qIndex] !== undefined;
          const isShowingFeedback = showFeedback[qIndex];
          const isCorrect = selectedAnswers[qIndex] === q.correctIndex;

          return (
            <div key={qIndex} className="bg-white dark:bg-slate-800 rounded-2xl border border-borderSubtle p-6 shadow-sm">
              <p className="font-bold text-lg text-textMain mb-4">{q.question}</p>
              <div className="space-y-2 mb-4">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selectedAnswers[qIndex] === optIndex;
                  let btnClass = "w-full text-left p-3 rounded-lg border transition-all duration-200 text-sm ";
                  
                  if (isShowingFeedback) {
                    if (optIndex === q.correctIndex) {
                      btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200";
                    } else if (isSelected && !isCorrect) {
                      btnClass += "border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-200";
                    } else {
                      btnClass += "border-borderSubtle bg-slate-50 dark:bg-slate-900/50 text-textMuted opacity-50 cursor-not-allowed";
                    }
                  } else {
                    if (isSelected) {
                      btnClass += "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200 ring-1 ring-primary-500";
                    } else {
                      btnClass += "border-borderSubtle hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-textMain";
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      onClick={() => !isShowingFeedback && handleSelect(qIndex, optIndex)}
                      disabled={isShowingFeedback}
                      className={btnClass}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 shrink-0 ${isSelected ? 'border-primary-500' : 'border-slate-300 dark:border-slate-600'}`}>
                          {isSelected && <div className={`w-2 h-2 rounded-full ${isShowingFeedback ? (isCorrect ? 'bg-emerald-500' : 'bg-rose-500') : 'bg-primary-500'}`} />}
                        </div>
                        {opt}
                      </div>
                    </button>
                  );
                })}
              </div>

              {!isShowingFeedback ? (
                <button
                  onClick={() => handleCheck(qIndex)}
                  disabled={!isAnswered}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isAnswered ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'}`}
                >
                  {t('lesson.checkAnswer', 'Verificar resposta')}
                </button>
              ) : (
                <div className={`mt-4 p-4 rounded-xl border ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50' : 'bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800/50'}`}>
                  <div className="flex items-start">
                    <div className={`mt-0.5 mr-3 shrink-0 ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {isCorrect ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </div>
                    <div>
                      <p className={`font-bold mb-1 ${isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
                        {isCorrect ? t('lesson.correct', 'Correto!') : t('lesson.incorrect', 'Ops, não é bem isso.')}
                      </p>
                      <p className="text-sm text-textMain">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isFinished && (
        <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-borderSubtle text-center">
          <h4 className="text-lg font-bold text-textMain mb-2">
            {t('theoryProgress.quizDone', 'Quiz concluído')}
          </h4>
          <p className="text-textMuted mb-4">
            Você acertou {Object.keys(selectedAnswers).filter(k => selectedAnswers[Number(k)] === questions[Number(k)].correctIndex).length} de {questions.length} perguntas.
          </p>
          {user ? (
             <span className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
               <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               Progresso salvo
             </span>
          ) : (
             <span className="inline-flex items-center text-sm text-slate-500 bg-slate-200 dark:bg-slate-700 px-3 py-1.5 rounded-full">
               {t('theoryProgress.signInToSave', 'Entre na sua conta para salvar seu progresso.')}
             </span>
          )}
        </div>
      )}
    </div>
  );
}
