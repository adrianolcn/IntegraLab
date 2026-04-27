import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CodeExampleBlockProps {
  code: string;
  type: 'Request' | 'Response';
  format: 'HTTP' | 'JSON';
}

export default function CodeExampleBlock({ code, type, format }: CodeExampleBlockProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const label = type === 'Request' ? t('lesson.requestExample', 'Request') : t('lesson.responseExample', 'Response');

  return (
    <div className="bg-[#1e1e2e] rounded-xl overflow-hidden shadow-lg border border-slate-700/50 mb-6">
      <div className="bg-[#181825] px-4 py-2.5 flex justify-between items-center border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">{label}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${format === 'HTTP' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {format}
          </span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
        >
          {copied ? (
            <><svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> {t('lesson.copied', 'Copiado!')}</>
          ) : (
            <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> {t('lesson.copyCode', 'Copiar')}</>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-sm font-mono text-[#cdd6f4] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
