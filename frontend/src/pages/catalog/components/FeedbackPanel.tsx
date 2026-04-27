interface FeedbackPanelProps {
  feedback: {
    isCorrect: boolean;
    text: string;
    whatWasCorrect?: string[];
    whatWasWrong?: string[];
    suggestedCorrection?: string;
    idealAnswer?: string;
    xpEarned?: number;
  };
}

export default function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  if (!feedback) return null;

  const isSuccess = feedback.isCorrect;

  return (
    <div className={`mt-6 p-6 rounded-2xl border backdrop-blur-md shadow-xl ${
      isSuccess 
        ? 'bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-500/50 shadow-emerald-200/50 dark:shadow-emerald-900/20' 
        : 'bg-red-50/80 dark:bg-red-900/20 border-red-300 dark:border-red-500/50 shadow-red-200/50 dark:shadow-red-900/20'
    }`}>
      <div className="flex items-start">
        <div className={`p-3 rounded-full mr-4 ${isSuccess ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'}`}>
          {isSuccess ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          )}
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold mb-2 ${isSuccess ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
            {isSuccess ? 'Sucesso!' : 'Algo deu errado...'}
          </h3>
          <p className="text-slate-700 dark:text-slate-200 mb-4">{feedback.text}</p>
          
          {feedback.xpEarned && feedback.xpEarned > 0 ? (
             <div className="inline-block bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 font-bold px-3 py-1 rounded-full border border-amber-300 dark:border-amber-500/30 text-sm mb-4">
               +{feedback.xpEarned} XP Ganho!
             </div>
          ) : null}

          <div className="space-y-4">
            {feedback.whatWasCorrect && feedback.whatWasCorrect.length > 0 && (
              <div className="bg-emerald-100/50 dark:bg-emerald-900/40 p-3 rounded-lg border border-emerald-300 dark:border-emerald-500/30">
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-1">O que você acertou:</h4>
                <ul className="list-disc pl-5 text-sm text-emerald-800 dark:text-emerald-200/80 space-y-1">
                  {feedback.whatWasCorrect.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}
            
            {feedback.whatWasWrong && feedback.whatWasWrong.length > 0 && (
              <div className="bg-red-100/50 dark:bg-red-900/40 p-3 rounded-lg border border-red-300 dark:border-red-500/30">
                <h4 className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">O que precisa melhorar:</h4>
                <ul className="list-disc pl-5 text-sm text-red-800 dark:text-red-200/80 space-y-1">
                  {feedback.whatWasWrong.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}

            {feedback.suggestedCorrection && (
              <div className="bg-blue-50 dark:bg-blue-900/40 p-3 rounded-lg border border-blue-200 dark:border-blue-500/30">
                <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-1">Dica Didática:</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200/80">{feedback.suggestedCorrection}</p>
              </div>
            )}

            {isSuccess && feedback.idealAnswer && (
              <div className="mt-4 pt-4 border-t border-emerald-300 dark:border-emerald-500/30">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  <span className="font-bold">Resposta Ideal:</span> {feedback.idealAnswer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
