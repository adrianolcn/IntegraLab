import { useTranslation } from 'react-i18next';

interface LearningObjectivesProps {
  objectivesJson: string;
}

export default function LearningObjectives({ objectivesJson }: LearningObjectivesProps) {
  const { t } = useTranslation();
  let objectives: string[] = [];

  try {
    objectives = JSON.parse(objectivesJson);
  } catch (e) {
    console.error("Failed to parse learning objectives", e);
    return null;
  }

  if (!Array.isArray(objectives) || objectives.length === 0) return null;

  return (
    <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-borderSubtle">
      <h3 className="text-xl font-bold text-textMain mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        {t('lesson.whatYouWillLearn', 'O que você vai aprender')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {objectives.map((obj, i) => (
          <div key={i} className="flex items-start bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-borderSubtle">
            <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span className="text-sm font-medium text-textMain">{obj}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
