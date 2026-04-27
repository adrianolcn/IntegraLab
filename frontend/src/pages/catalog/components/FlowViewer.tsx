import { useState, useEffect, useMemo } from 'react';
import { ReactFlow, Background, Controls, MarkerType } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface FlowViewerProps {
  scenario: any;
}

export default function FlowViewer({ scenario }: FlowViewerProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500);

  const steps = scenario?.steps || [];

  // Playback timer with cleanup
  useEffect(() => {
    let timer: any;
    if (isPlaying && currentStepIndex < steps.length) {
      timer = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setCurrentStepIndex(steps.length); // Finished
        }
      }, playbackSpeed);
    } else if (isPlaying && currentStepIndex >= steps.length) {
      setIsPlaying(false);
    }
    
    return () => clearTimeout(timer); // cleanup timer on unmount or re-render
  }, [isPlaying, currentStepIndex, steps.length, playbackSpeed]);

  const handlePlayPause = () => {
    if (currentStepIndex >= steps.length) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else if (currentStepIndex === -1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIndex(prev => Math.min(steps.length, prev + 1));
  };

  const handleJumpToStep = (index: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(index);
  };

  const nodes: Node[] = useMemo(() => {
    if (!scenario || !scenario.nodes) return [];
    
    const activeStep = (currentStepIndex >= 0 && currentStepIndex < steps.length) ? steps[currentStepIndex] : null;

    return scenario.nodes.map((n: any) => {
      const isActiveSource = activeStep?.fromNodeKey === n.nodeKey;
      const isActiveTarget = activeStep?.toNodeKey === n.nodeKey;
      const isHighlighted = isActiveSource || isActiveTarget;

      return {
        id: n.nodeKey,
        position: { x: n.positionX, y: n.positionY },
        data: { label: n.label },
        style: {
          background: theme === 'dark' ? (isHighlighted ? '#1e3a8a' : '#1e293b') : (isHighlighted ? '#eff6ff' : '#ffffff'),
          color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
          border: isHighlighted ? '2px solid #3b82f6' : '1px solid #94a3b8',
          borderRadius: '8px',
          padding: '10px',
          fontWeight: 'bold',
          boxShadow: isHighlighted ? (theme === 'dark' ? '0 0 15px rgba(59,130,246,0.5)' : '0 0 15px rgba(59,130,246,0.3)') : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }
      };
    });
  }, [scenario, theme, currentStepIndex, steps]);

  const edges: Edge[] = useMemo(() => {
    if (!steps) return [];

    return steps.map((s: any, idx: number) => {
      const isPast = idx < currentStepIndex;
      const isCurrent = idx === currentStepIndex;
      
      let strokeColor = theme === 'dark' ? '#475569' : '#cbd5e1'; // neutral
      if (isCurrent) strokeColor = '#3b82f6'; // blue
      else if (isPast) {
        if (s.statusCode >= 400) strokeColor = '#ef4444'; // red for error
        else strokeColor = '#10b981'; // green for success
      }

      return {
        id: `e${idx}`,
        source: s.fromNodeKey,
        target: s.toNodeKey,
        animated: isCurrent, // only animate current
        label: s.method ? `${s.method} ${s.path || ''}` : `Status ${s.statusCode || ''}`,
        style: { 
          stroke: strokeColor, 
          strokeWidth: isCurrent ? 3 : 2,
          transition: 'stroke 0.3s ease'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: strokeColor,
        },
        labelStyle: { fill: theme === 'dark' ? '#e2e8f0' : '#1e293b', fontWeight: isCurrent ? 'bold' : 'normal' },
        labelBgStyle: { fill: theme === 'dark' ? '#1e293b' : '#ffffff', fillOpacity: 0.8 }
      };
    });
  }, [steps, currentStepIndex, theme]);

  if (!scenario || !scenario.nodes) return null;

  const currentStepData = (currentStepIndex >= 0 && currentStepIndex < steps.length) ? steps[currentStepIndex] : null;

  return (
    <div className="w-full glass-panel-elevated rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Top Diagram Area */}
      <div className="h-[400px] sm:h-[500px] w-full relative border-b border-slate-200 dark:border-slate-700/50">
        <ReactFlow nodes={nodes} edges={edges} fitView colorMode={theme === 'dark' ? 'dark' : 'light'}>
          <Background />
          <Controls />
        </ReactFlow>
        
        {/* Floating Playback Controls Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 flex items-center gap-2">
          <button onClick={handlePrev} disabled={currentStepIndex <= 0} className="p-2 text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 disabled:opacity-30" title={t('flow.previousStep')}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          
          <button onClick={handlePlayPause} className="w-10 h-10 flex items-center justify-center bg-primary-600 text-white rounded-full hover:bg-primary-500 shadow-md transition-colors" title={isPlaying ? t('flow.pause') : t('flow.run')}>
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            ) : (
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/></svg>
            )}
          </button>
          
          <button onClick={handleRestart} className="p-2 text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400" title={t('flow.restart')}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </button>
          
          <button onClick={handleNext} disabled={currentStepIndex >= steps.length} className="p-2 text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 disabled:opacity-30" title={t('flow.nextStep')}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
          
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
          
          <select 
            value={playbackSpeed} 
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
            title={t('flow.speed')}
          >
            <option value={3000}>0.5x</option>
            <option value={1500}>1x</option>
            <option value={750}>2x</option>
          </select>
        </div>
      </div>

      {/* Bottom Layout: Timeline + Inspect Panel */}
      <div className="flex flex-col md:flex-row min-h-[300px]">
        
        {/* Timeline Sidebar */}
        <div className="w-full md:w-1/3 border-r border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/30 p-4 overflow-y-auto max-h-[300px] md:max-h-full">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">{t('flow.timeline')}</h4>
          <div className="space-y-2 relative">
            <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-700 z-0"></div>
            {steps.map((s: any, idx: number) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex || currentStepIndex === steps.length;
              const isError = s.statusCode >= 400;
              
              let markerColor = 'bg-slate-300 dark:bg-slate-600 border-slate-200 dark:border-slate-700';
              if (isActive) markerColor = 'bg-primary-500 border-primary-200 dark:border-primary-800 shadow-[0_0_8px_rgba(59,130,246,0.8)]';
              else if (isPast) markerColor = isError ? 'bg-red-500 border-red-200 dark:border-red-800' : 'bg-emerald-500 border-emerald-200 dark:border-emerald-800';

              return (
                <button 
                  key={idx}
                  onClick={() => handleJumpToStep(idx)}
                  className={`w-full text-left relative z-10 flex items-start gap-3 p-2 rounded-lg transition-colors hover:bg-slate-200/50 dark:hover:bg-slate-800/50 ${isActive ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700' : ''}`}
                >
                  <div className={`mt-1.5 w-6 h-6 rounded-full border-2 flex-shrink-0 ${markerColor}`}></div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400'}`}>
                        {t('mission.step')} {idx + 1}
                      </span>
                      {isPast && !isActive && (
                        <span className={`text-[10px] uppercase font-bold ${isError ? 'text-red-500' : 'text-emerald-500'}`}>
                          {isError ? t('flow.error') : t('flow.completed')}
                        </span>
                      )}
                      {isActive && (
                        <span className="text-[10px] uppercase font-bold text-primary-500">{t('flow.currentStep')}</span>
                      )}
                    </div>
                    <p className={`text-sm truncate ${isActive ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                      {s.method} {s.path || `Status ${s.statusCode}`}
                    </p>
                  </div>
                </button>
              );
            })}
            
            {/* Final State */}
            <div className="relative z-10 flex items-start gap-3 p-2">
              <div className={`mt-1 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${currentStepIndex === steps.length ? 'bg-emerald-500 border-emerald-200 text-white' : 'bg-slate-200 dark:bg-slate-700 border-transparent text-transparent'}`}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <span className={`text-sm font-bold ${currentStepIndex === steps.length ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'}`}>{t('flow.finished')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inspect Panel */}
        <div className="w-full md:w-2/3 p-6 flex flex-col glass-panel">
          {currentStepData ? (
            <div className="h-full flex flex-col animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded text-xs text-white ${currentStepData.statusCode >= 400 ? 'bg-red-500' : (currentStepData.method ? 'bg-blue-500' : 'bg-emerald-500')}`}>
                      {currentStepData.method || 'RES'}
                    </span>
                    <span className="break-all">{currentStepData.path || t('flow.response')}</span>
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 flex items-center flex-wrap">
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{currentStepData.fromNodeKey}</span> 
                    <span className="mx-2">&rarr;</span> 
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{currentStepData.toNodeKey}</span>
                  </p>
                </div>
                <div className="sm:text-right bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700 min-w-[100px]">
                  <div className="text-xs text-slate-500 uppercase">{t('flow.status')}</div>
                  <div className={`text-xl font-mono font-bold ${currentStepData.statusCode >= 400 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {currentStepData.statusCode || '---'}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                    {t('flow.request')}
                  </h4>
                  <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap overflow-x-auto">
                    {currentStepData.requestPayload ? JSON.stringify(currentStepData.requestPayload, null, 2) : <span className="text-slate-400 italic">{t('flow.noPayload')}</span>}
                  </pre>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    {t('flow.response')}
                  </h4>
                  <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap overflow-x-auto">
                    {currentStepData.responsePayload ? JSON.stringify(currentStepData.responsePayload, null, 2) : <span className="text-slate-400 italic">{t('flow.noResponse')}</span>}
                  </pre>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="bg-slate-900 dark:bg-[#0a0a0a] rounded-lg p-4 border-l-4 border-primary-500 shadow-inner">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">{t('flow.logs')}</h4>
                  <div className="font-mono">
                    <span className="text-emerald-500 mr-2">{'>'}</span> 
                    <span className="text-slate-300 text-sm">{currentStepData.logMessage || '...'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 bg-slate-50/50 dark:bg-transparent rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
              <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p className="text-lg font-medium">{currentStepIndex === steps.length ? t('flow.finished') : t('flow.waiting')}</p>
              {currentStepIndex === -1 && (
                <button onClick={handlePlayPause} className="mt-6 px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-bold shadow-lg shadow-primary-500/30 transition-all hover:scale-105">
                  {t('flow.run')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
