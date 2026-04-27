import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CodeExampleBlock from './CodeExampleBlock';
import ConceptText from './ConceptText';

interface HttpMethodDetails {
  method: string;
  purpose: string;
  whenToUse: string;
  analogy: string;
  pathExample: string;
  request: string;
  response: string;
  commonMistake: string;
}

interface InteractiveMethodsProps {
  interactiveJson: string;
  glossaryJson?: string;
}

export default function InteractiveMethods({ interactiveJson, glossaryJson }: InteractiveMethodsProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(0);
  
  let methods: HttpMethodDetails[] = [];
  try {
    methods = JSON.parse(interactiveJson);
  } catch (e) {
    console.error("Failed to parse interactive methods", e);
    return null;
  }

  if (!Array.isArray(methods) || methods.length === 0) return null;

  const activeMethod = methods[activeTab];

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
      case 'POST': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
      case 'PUT': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800';
      case 'PATCH': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800';
      case 'DELETE': return 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  const getMethodColorSolid = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'bg-blue-600 text-white';
      case 'POST': return 'bg-emerald-600 text-white';
      case 'PUT': return 'bg-amber-600 text-white';
      case 'PATCH': return 'bg-orange-600 text-white';
      case 'DELETE': return 'bg-rose-600 text-white';
      default: return 'bg-slate-600 text-white';
    }
  };

  return (
    <div className="mb-12">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {methods.map((m, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 border ${
              activeTab === idx 
                ? getMethodColorSolid(m.method) + ' shadow-md scale-105'
                : 'bg-white dark:bg-slate-800 text-textMuted border-borderSubtle hover:border-slate-400 dark:hover:border-slate-500'
            }`}
          >
            {m.method}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-borderSubtle p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Column: Theory */}
          <div className="flex-1 space-y-6">
            <div>
              <div className={`inline-block px-3 py-1 rounded text-xs font-black tracking-wider mb-3 border ${getMethodColor(activeMethod.method)}`}>
                {activeMethod.method}
              </div>
              <h4 className="text-2xl font-bold text-textMain mb-2">
                <ConceptText text={activeMethod.purpose} glossaryJson={glossaryJson} />
              </h4>
              <p className="text-textMain">
                <ConceptText text={activeMethod.whenToUse} glossaryJson={glossaryJson} />
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-borderSubtle">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('lesson.analogy', 'Analogia')}</span>
              <p className="text-sm italic text-textMain">
                "<ConceptText text={activeMethod.analogy} glossaryJson={glossaryJson} />"
              </p>
            </div>

            <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-100 dark:border-rose-900/50">
              <div className="flex items-center mb-1">
                <svg className="w-4 h-4 text-rose-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">{t('lesson.watchOut', 'Cuidado')}</span>
              </div>
              <p className="text-sm text-textMain">
                <ConceptText text={activeMethod.commonMistake} glossaryJson={glossaryJson} />
              </p>
            </div>
          </div>

          {/* Right Column: Code */}
          <div className="flex-1 max-w-full overflow-hidden">
            <h5 className="text-sm font-bold text-textMain mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              {t('lesson.practicalExample', 'Na prática')}: <span className="ml-1 font-mono text-primary-500">{activeMethod.pathExample}</span>
            </h5>
            
            <div className="space-y-4">
              <CodeExampleBlock code={activeMethod.request} type="Request" format="HTTP" />
              <CodeExampleBlock code={activeMethod.response} type="Response" format="HTTP" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
