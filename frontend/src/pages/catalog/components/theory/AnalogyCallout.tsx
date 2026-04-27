import { useTranslation } from 'react-i18next';

interface AnalogyCalloutProps {
  analogy: string;
}

export default function AnalogyCallout({ analogy }: AnalogyCalloutProps) {
  const { t } = useTranslation();

  if (!analogy) return null;

  // Simple markdown-like bold parsing for the analogy text
  const parseText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-indigo-900 dark:text-indigo-200">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="my-10 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 shadow-inner relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
      </div>
      <h3 className="text-xl font-black text-indigo-800 dark:text-indigo-300 mb-3 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        {t('lesson.analogy', 'Analogia para facilitar')}
      </h3>
      <p className="text-lg text-indigo-900/80 dark:text-indigo-200/80 leading-relaxed relative z-10">
        {parseText(analogy)}
      </p>
    </div>
  );
}
