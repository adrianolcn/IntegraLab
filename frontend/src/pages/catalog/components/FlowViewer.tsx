import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FlowControls from './theory/FlowControls';
import type { MissionScenario, MissionScenarioNode, MissionScenarioStep } from '../../../lib/api';

interface FlowViewerProps {
  scenario: MissionScenario | null;
}

interface DiagramStage {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  tone: 'client' | 'request' | 'endpoint' | 'api' | 'service' | 'database' | 'response' | 'ui';
}

type RequestPreview = {
  method?: string;
  path?: string;
  status?: number;
};

function parseStructuredValue(value: unknown) {
  if (value == null) return null;
  if (typeof value !== 'string') return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function toPrettyPayload(value: unknown) {
  if (value == null) return null;
  if (typeof value === 'string') return value;
  return JSON.stringify(value, null, 2);
}

function getStatusText(statusCode?: number | null) {
  if (!statusCode) return 'Pending';
  if (statusCode >= 500) return 'Server Error';
  if (statusCode >= 400) return 'Client Error';
  if (statusCode >= 300) return 'Redirect';
  if (statusCode >= 200) return 'OK';
  return 'Info';
}

function normalizeText(value?: string | null) {
  return (value ?? '').toLowerCase();
}

function getToneUi(tone: DiagramStage['tone'], state: 'active' | 'completed' | 'upcoming') {
  const tones = {
    client: {
      active: 'border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-700/70 dark:bg-sky-950/35 dark:text-sky-50',
      completed: 'border-sky-200 bg-white text-textMain dark:border-sky-900/40 dark:bg-slate-900/90',
      upcoming: 'border-borderSubtle bg-slate-50/80 text-textMain/80 dark:bg-slate-900/60',
      accent: 'bg-sky-500 text-white',
      soft: 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-200',
    },
    request: {
      active: 'border-blue-300 bg-blue-50 text-blue-950 dark:border-blue-700/70 dark:bg-blue-950/35 dark:text-blue-50',
      completed: 'border-blue-200 bg-white text-textMain dark:border-blue-900/40 dark:bg-slate-900/90',
      upcoming: 'border-borderSubtle bg-slate-50/80 text-textMain/80 dark:bg-slate-900/60',
      accent: 'bg-blue-500 text-white',
      soft: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200',
    },
    endpoint: {
      active: 'border-indigo-300 bg-indigo-50 text-indigo-950 dark:border-indigo-700/70 dark:bg-indigo-950/35 dark:text-indigo-50',
      completed: 'border-indigo-200 bg-white text-textMain dark:border-indigo-900/40 dark:bg-slate-900/90',
      upcoming: 'border-borderSubtle bg-slate-50/80 text-textMain/80 dark:bg-slate-900/60',
      accent: 'bg-indigo-500 text-white',
      soft: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-200',
    },
    api: {
      active: 'border-violet-300 bg-violet-50 text-violet-950 dark:border-violet-700/70 dark:bg-violet-950/35 dark:text-violet-50',
      completed: 'border-violet-200 bg-white text-textMain dark:border-violet-900/40 dark:bg-slate-900/90',
      upcoming: 'border-borderSubtle bg-slate-50/80 text-textMain/80 dark:bg-slate-900/60',
      accent: 'bg-violet-500 text-white',
      soft: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-200',
    },
    service: {
      active: 'border-cyan-300 bg-cyan-50 text-cyan-950 dark:border-cyan-700/70 dark:bg-cyan-950/35 dark:text-cyan-50',
      completed: 'border-cyan-200 bg-white text-textMain dark:border-cyan-900/40 dark:bg-slate-900/90',
      upcoming: 'border-borderSubtle bg-slate-50/80 text-textMain/80 dark:bg-slate-900/60',
      accent: 'bg-cyan-500 text-white',
      soft: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-200',
    },
    database: {
      active: 'border-lime-300 bg-lime-50 text-lime-950 dark:border-lime-700/70 dark:bg-lime-950/35 dark:text-lime-50',
      completed: 'border-lime-200 bg-white text-textMain dark:border-lime-900/40 dark:bg-slate-900/90',
      upcoming: 'border-borderSubtle bg-slate-50/80 text-textMain/80 dark:bg-slate-900/60',
      accent: 'bg-lime-500 text-white',
      soft: 'bg-lime-100 text-lime-700 dark:bg-lime-950/50 dark:text-lime-200',
    },
    response: {
      active: 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-700/70 dark:bg-emerald-950/35 dark:text-emerald-50',
      completed: 'border-emerald-200 bg-white text-textMain dark:border-emerald-900/40 dark:bg-slate-900/90',
      upcoming: 'border-borderSubtle bg-slate-50/80 text-textMain/80 dark:bg-slate-900/60',
      accent: 'bg-emerald-500 text-white',
      soft: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200',
    },
    ui: {
      active: 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-700/70 dark:bg-amber-950/35 dark:text-amber-50',
      completed: 'border-amber-200 bg-white text-textMain dark:border-amber-900/40 dark:bg-slate-900/90',
      upcoming: 'border-borderSubtle bg-slate-50/80 text-textMain/80 dark:bg-slate-900/60',
      accent: 'bg-amber-500 text-white',
      soft: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200',
    },
  } as const;

  return tones[tone][state];
}

function getStageImportance(stage: DiagramStage, statusCode: number, t: (key: string, fallback: string) => string) {
  switch (stage.tone) {
    case 'client':
      return t('flow.importanceClient', 'É aqui que a intenção da pessoa usuária vira uma ação técnica. Se o ponto de partida estiver errado, todo o resto nasce desalinhado.');
    case 'request':
      return t('flow.importanceRequest', 'Método, headers e body definidos aqui mudam o comportamento da API. Esta etapa costuma explicar por que um cenário deu certo ou falhou cedo.');
    case 'endpoint':
      return t('flow.importanceEndpoint', 'O endpoint é o endereço da conversa. Se o caminho estiver errado, a requisição nem alcança a lógica que o aluno espera testar.');
    case 'api':
      return t('flow.importanceApi', 'A API é a porta de entrada: recebe, valida, autentica e escolhe quem vai continuar o processamento.');
    case 'service':
      return t('flow.importanceService', 'A regra de negócio é onde a missão realmente decide o destino da requisição. Aqui surgem validações, permissões e decisões de resposta.');
    case 'database':
      return t('flow.importanceDatabase', 'Quando há banco, esta etapa mostra que a resposta final depende do estado real dos dados e não só da forma da request.');
    case 'response':
      return statusCode >= 400
        ? t('flow.importanceResponseError', 'O response deixa visível o ponto de ruptura. O status code e o payload contam a história do erro sem precisar adivinhar.')
        : t('flow.importanceResponseSuccess', 'O response é a tradução final do processamento em um pacote técnico legível para o cliente.');
    case 'ui':
      return t('flow.importanceUi', 'A interface é onde o resultado técnico ganha significado para a pessoa usuária: sucesso, erro, bloqueio ou ausência de dados.');
    default:
      return t('flow.importanceDefault', 'Esta etapa explica como a requisição avança até virar um resultado observável.');
  }
}

function getScenarioEffect(step: MissionScenarioStep | null, statusCode: number, stage: DiagramStage | undefined, t: (key: string, fallback: string) => string) {
  if (!step || !stage) {
    return t('flow.effectBeforeStart', 'Antes de iniciar, a simulação mostra a rota completa para o aluno entender o terreno que a requisição vai percorrer.');
  }

  if (statusCode >= 400) {
    return step.logMessage
      ? `${t('flow.effectErrorPrefix', 'Neste cenário, o efeito principal aparece aqui:')} ${step.logMessage}`
      : t('flow.effectErrorGeneric', 'Neste cenário, a jornada muda antes do final porque a API rejeita ou interrompe a requisição nesta fase.');
  }

  if (stage.tone === 'response' || stage.tone === 'ui') {
    return t('flow.effectSuccessEnd', 'Neste cenário, a jornada completou o percurso e o aluno já consegue enxergar o efeito final da chamada.');
  }

  return t('flow.effectSuccessProgress', 'Neste cenário, esta etapa prepara a próxima transição do fluxo sem causar ruptura na requisição.');
}

export default function FlowViewer({ scenario }: FlowViewerProps) {
  const { t } = useTranslation();
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500);

  const scenarioNodes = useMemo<MissionScenarioNode[]>(
    () => (Array.isArray(scenario?.nodes) ? scenario.nodes : []),
    [scenario?.nodes]
  );

  const steps = useMemo<MissionScenarioStep[]>(
    () =>
      (Array.isArray(scenario?.steps) ? [...scenario.steps] : []).sort(
        (a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)
      ),
    [scenario?.steps]
  );

  const initialRequest = useMemo(
    () => parseStructuredValue(scenario?.initialRequestJson),
    [scenario?.initialRequestJson]
  );
  const initialRequestPreview = useMemo<RequestPreview | null>(
    () => (initialRequest && typeof initialRequest === 'object' ? (initialRequest as RequestPreview) : null),
    [initialRequest]
  );

  const simulatedResponse = useMemo(
    () => parseStructuredValue(scenario?.simulatedResponseJson),
    [scenario?.simulatedResponseJson]
  );
  const simulatedResponsePreview = useMemo<RequestPreview | null>(
    () => (simulatedResponse && typeof simulatedResponse === 'object' ? (simulatedResponse as RequestPreview) : null),
    [simulatedResponse]
  );

  useEffect(() => {
    setCurrentStepIndex(-1);
    setIsPlaying(false);
  }, [scenario?.id]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isPlaying && currentStepIndex < steps.length) {
      timer = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setCurrentStepIndex(steps.length);
          setIsPlaying(false);
        }
      }, playbackSpeed);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentStepIndex, isPlaying, playbackSpeed, steps.length]);

  const diagram = useMemo(() => {
    if (!scenario) {
      return { stages: [] as DiagramStage[], statusCode: 200 };
    }

    const firstStep = steps[0];
    const lastStep = steps[steps.length - 1];
    const method = firstStep?.method || initialRequestPreview?.method || 'GET';
    const path = firstStep?.path || initialRequestPreview?.path || '/resource';
    const finalStatusCode =
      lastStep?.statusCode ||
      simulatedResponsePreview?.status ||
      (lastStep?.status === 'FAILED' ? 400 : 200);

    const joinedNodeText = scenarioNodes
      .map((node) => `${normalizeText(node.nodeKey)} ${normalizeText(node.label)} ${normalizeText(node.nodeType)}`)
      .join(' ');
    const joinedStepText = steps
      .map((step) => `${normalizeText(step.path)} ${normalizeText(step.logMessage)} ${normalizeText(step.stepType)}`)
      .join(' ');

    const findNodeLabel = (matchers: string[]) =>
      scenarioNodes.find((node) => {
        const haystack = `${normalizeText(node.nodeKey)} ${normalizeText(node.label)} ${normalizeText(node.nodeType)}`;
        return matchers.some((matcher) => haystack.includes(matcher));
      })?.label;

    const hasDatabase =
      /database| banco| db|repository|repositorio|repositório/.test(joinedNodeText) ||
      (
        !/auth|token|secure|dashboard|gateway|\/me/.test(`${normalizeText(path)} ${joinedStepText}`) &&
        /products|produtos|items|itens|users|usuarios|usuários|catalog|catálogo|data|dados|orders|pedidos/.test(
          `${normalizeText(path)} ${joinedStepText}`
        )
      );

    const clientTitle = findNodeLabel(['client', 'browser', 'spa', 'app', 'mobile', 'computador']) || t('flow.clientNode', 'Seu computador');
    const apiTitle = findNodeLabel(['gateway', 'api']) || t('flow.apiNode', 'API');
    const serviceTitle =
      findNodeLabel(['service', 'servico', 'serviço', 'validator', 'validador', 'interno']) ||
      t('flow.serviceNode', 'Serviço / regra');
    const databaseTitle =
      findNodeLabel(['database', 'banco', 'db', 'repository', 'repositorio', 'repositório']) ||
      t('flow.databaseNode', 'Banco de dados');

    const uiTitle =
      finalStatusCode >= 400
        ? t('flow.uiErrorNode', 'Erro exibido na interface')
        : t('flow.uiNode', 'Resultado na interface');

    const requestLabel = `${method} ${path}`;
    const responseLabel = `${finalStatusCode} ${getStatusText(finalStatusCode)}`;

    const stages: DiagramStage[] = [
      {
        id: 'client',
        badge: t('flow.client', 'Cliente'),
        title: clientTitle,
        subtitle: t('flow.requestOrigin', 'Origem da requisição'),
        description: t('flow.clientDescription', 'A pessoa usuária inicia a ação e dispara a conversa HTTP.'),
        tone: 'client',
      },
      {
        id: 'request',
        badge: t('flow.request', 'Request'),
        title: requestLabel,
        subtitle: t('flow.outgoingRequest', 'O pacote sai do cliente'),
        description: t('flow.requestDescription', 'Método, caminho, headers e body formam a requisição que vai viajar pela arquitetura.'),
        tone: 'request',
      },
      {
        id: 'endpoint',
        badge: t('flow.path', 'Endpoint'),
        title: path,
        subtitle: t('flow.endpointSubtitle', 'O endereço chamado'),
        description: t('flow.endpointDescription', 'A request acerta uma rota específica e pede entrada naquele caminho.'),
        tone: 'endpoint',
      },
      {
        id: 'api',
        badge: t('flow.api', 'API'),
        title: apiTitle,
        subtitle: t('flow.apiSubtitle', 'Camada de entrada'),
        description: t('flow.apiDescription', 'A API recebe, interpreta e encaminha o pedido para a camada correta.'),
        tone: 'api',
      },
      {
        id: 'service',
        badge: t('flow.service', 'Serviço'),
        title: serviceTitle,
        subtitle: t('flow.serviceSubtitle', 'Regra de negócio'),
        description: t('flow.serviceDescription', 'A lógica decide o que fazer com a chamada e qual resposta faz sentido produzir.'),
        tone: 'service',
      },
      ...(hasDatabase
        ? [
            {
              id: 'database',
              badge: t('flow.database', 'Banco'),
              title: databaseTitle,
              subtitle: t('flow.databaseSubtitle', 'Consulta ou persistência'),
              description: t('flow.databaseDescription', 'Quando necessário, a missão toca nos dados para completar a resposta.'),
              tone: 'database' as const,
            },
          ]
        : []),
      {
        id: 'response',
        badge: t('flow.response', 'Response'),
        title: responseLabel,
        subtitle: t('flow.responseSubtitle', 'Retorno técnico gerado'),
        description: t('flow.responseDescription', 'O servidor monta o status code e o payload que voltarão para o cliente.'),
        tone: 'response',
      },
      {
        id: 'ui',
        badge: t('flow.result', 'Interface'),
        title: uiTitle,
        subtitle: finalStatusCode >= 400 ? t('flow.resultError', 'O aluno enxerga o erro') : t('flow.resultSuccess', 'O aluno enxerga o resultado'),
        description: t('flow.uiDescription', 'A interface traduz o resultado técnico em algo compreensível para a pessoa usuária.'),
        tone: 'ui',
      },
    ];

    return { stages, statusCode: finalStatusCode };
  }, [initialRequestPreview, scenario, scenarioNodes, simulatedResponsePreview, steps, t]);

  const isFinished = steps.length > 0 && currentStepIndex >= steps.length;
  const currentStepData =
    currentStepIndex >= 0 && currentStepIndex < steps.length ? steps[currentStepIndex] : null;
  const focusedStep = currentStepData || (isFinished ? steps[steps.length - 1] : null);

  const stageStepMap = useMemo(() => {
    if (diagram.stages.length === 0 || steps.length === 0) return [];
    const lastStageIndex = Math.max(diagram.stages.length - 1, 1);

    return diagram.stages.map((_, index) => {
      if (index === 0) return 0;
      if (index === lastStageIndex) return steps.length - 1;
      return Math.min(steps.length - 1, Math.max(0, Math.round((index / lastStageIndex) * (steps.length - 1))));
    });
  }, [diagram.stages, steps.length]);

  const currentStageIndex = useMemo(() => {
    if (diagram.stages.length === 0) return -1;
    if (currentStepIndex === -1) return 0;
    if (isFinished) return diagram.stages.length - 1;
    if (steps.length === 0) return 0;

    const lastStageIndex = Math.max(diagram.stages.length - 1, 1);
    return Math.min(
      diagram.stages.length - 1,
      Math.max(0, Math.round(((currentStepIndex + 1) / steps.length) * lastStageIndex))
    );
  }, [currentStepIndex, diagram.stages.length, isFinished, steps.length]);

  const activeStage = currentStageIndex >= 0 ? diagram.stages[currentStageIndex] : undefined;
  const activeStatusCode = focusedStep?.statusCode ?? diagram.statusCode;
  const requestPreview = toPrettyPayload(
    focusedStep?.payloadExample ? parseStructuredValue(focusedStep.payloadExample) : initialRequest
  );
  const responsePreview = toPrettyPayload(
    focusedStep?.responseExample ? parseStructuredValue(focusedStep.responseExample) : simulatedResponse
  );

  const handlePlayPause = () => {
    if (steps.length === 0) return;

    if (currentStepIndex === -1 || currentStepIndex >= steps.length) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((prev) => !prev);
  };

  const handleRestart = () => {
    if (steps.length === 0) return;
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(steps.length, prev + 1));
  };

  const handleJumpToStep = (index: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(index);
  };

  const handleJumpToStage = (stageIndex: number) => {
    if (steps.length === 0) return;
    setIsPlaying(false);
    setCurrentStepIndex(stageStepMap[stageIndex] ?? 0);
  };

  if (!scenario) return null;

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-borderSubtle bg-white shadow-sm dark:bg-slate-950/50">
      <div className="border-b border-borderSubtle bg-gradient-to-br from-slate-50 via-white to-slate-100/70 px-6 py-6 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900/70">
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-primary-700 dark:border-primary-700/40 dark:bg-primary-950/30 dark:text-primary-200">
              {t('flow.guidedMissionSimulation', 'Simulação guiada da missão')}
            </span>
            <h3 className="break-words text-xl font-black text-textMain">
              {scenario.title || t('flow.timeline', 'Jornada da requisição')}
            </h3>
            <p className="max-w-3xl text-sm leading-relaxed text-textMuted">
              {scenario.description || t('flow.didacticSummary', 'Acompanhe o percurso da chamada HTTP como uma jornada orientada, sem depender de um canvas técnico aberto.')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:[grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
            <div className="min-w-0 rounded-2xl border border-borderSubtle bg-white/90 px-4 py-3 dark:bg-slate-900/80">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{t('flow.method', 'Método')}</div>
              <div className="mt-1 text-sm font-black text-textMain">{steps[0]?.method || initialRequestPreview?.method || 'GET'}</div>
            </div>
            <div className="min-w-0 rounded-2xl border border-borderSubtle bg-white/90 px-4 py-3 dark:bg-slate-900/80">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{t('flow.path', 'Caminho')}</div>
              <div className="mt-1 break-all font-mono text-sm font-black text-textMain" title={steps[0]?.path || initialRequestPreview?.path || '/resource'}>
                {steps[0]?.path || initialRequestPreview?.path || '/resource'}
              </div>
            </div>
            <div className="min-w-0 rounded-2xl border border-borderSubtle bg-white/90 px-4 py-3 dark:bg-slate-900/80">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{t('flow.statusExpected', 'Status esperado')}</div>
              <div className={`mt-1 break-words text-sm font-black ${diagram.statusCode >= 400 ? 'text-rose-500' : 'text-emerald-500'}`}>
                {diagram.statusCode} {getStatusText(diagram.statusCode)}
              </div>
            </div>
            <div className="min-w-0 rounded-2xl border border-borderSubtle bg-white/90 px-4 py-3 dark:bg-slate-900/80">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{t('flow.currentStage', 'Etapa atual')}</div>
              <div className="mt-1 break-words text-sm font-black text-textMain">
                {activeStage?.badge || t('flow.readyToStart', 'Pronto para iniciar')}
              </div>
            </div>
            <div className="min-w-0 rounded-2xl border border-borderSubtle bg-white/90 px-4 py-3 dark:bg-slate-900/80">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{t('flow.currentScenario', 'Leitura do cenário')}</div>
              <div className="mt-1 break-words text-sm font-black text-textMain">
                {isFinished
                  ? t('flow.finished', 'Fluxo concluído')
                  : currentStepIndex >= 0
                    ? `${t('mission.step', 'Passo')} ${currentStepIndex + 1} ${t('mission.of', 'de')} ${steps.length}`
                    : t('flow.waiting', 'Aguardando')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-borderSubtle bg-white/90 px-6 py-5 dark:bg-slate-950/40">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-indigo-600 dark:text-indigo-300">
              {t('flow.stepThroughJourney', 'Percorra a jornada')}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-textMuted">
              {t('flow.stepThroughJourneyDescription', 'Use os controles para avançar pela história da requisição ou clique em um ponto da arquitetura para saltar diretamente até ele.')}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <FlowControls
              isPlaying={isPlaying}
              canGoBack={currentStepIndex > 0}
              canGoForward={steps.length > 0 && currentStepIndex < steps.length}
              onBack={handlePrev}
              onNext={handleNext}
              onPlayPause={handlePlayPause}
              onRestart={handleRestart}
              showRestart={isFinished}
              labels={{
                play: t('flow.run', 'Executar'),
                pause: t('flow.pause', 'Pausar'),
                back: t('flow.previousStep', 'Etapa anterior'),
                next: t('flow.nextStep', 'Próxima etapa'),
                restart: t('flow.restart', 'Reiniciar'),
              }}
            />

            <div className="inline-flex items-center rounded-full border border-borderSubtle bg-white p-1 shadow-sm dark:bg-slate-900/90">
              {[3000, 1500, 750].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                    playbackSpeed === speed
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {speed === 3000 ? '0.5x' : speed === 1500 ? '1x' : '2x'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="border-b border-borderSubtle bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/45 xl:border-b-0 xl:border-r">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-textMuted">
              {t('flow.architectureRoute', 'Rota arquitetural')}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-textMuted">
              {t('flow.architectureRouteDescription', 'Esta coluna mostra o caminho conceitual da requisição, do ponto de origem até o resultado final.')}
            </p>
          </div>

          <div className="relative space-y-3">
            <div className="absolute bottom-6 left-5 top-5 w-px bg-slate-200 dark:bg-slate-800" />
            {diagram.stages.map((stage, index) => {
              const isActive = index === currentStageIndex;
              const isCompleted = index < currentStageIndex || isFinished;
              const state = isActive ? 'active' : isCompleted ? 'completed' : 'upcoming';

              return (
                <button
                  key={stage.id}
                  onClick={() => handleJumpToStage(index)}
                  className={`relative flex w-full min-w-0 items-start gap-4 rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                    getToneUi(stage.tone, state)
                  } ${isActive ? 'shadow-lg' : 'shadow-sm'}`}
                >
                  <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${getToneUi(stage.tone, 'active')}`}>
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${
                        isActive ? getToneUi(stage.tone, 'active') : getToneUi(stage.tone, 'upcoming')
                      }`}>
                        {stage.badge}
                      </span>
                      {isActive && (
                        <span className="text-[11px] font-bold text-primary-600 dark:text-primary-300">
                          {t('flow.now', 'Agora')}
                        </span>
                      )}
                    </div>
                    <h4 className={`mt-3 break-words font-black leading-snug text-textMain ${
                      stage.id === 'request' || stage.id === 'endpoint' ? 'font-mono text-[13px]' : 'text-base'
                    }`}>
                      {stage.title}
                    </h4>
                    <p className="mt-1 break-words text-xs font-medium text-textMuted">
                      {stage.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 p-6">
          {focusedStep && activeStage ? (
            <div className="space-y-5">
              <div className={`rounded-3xl border p-6 shadow-sm ${getToneUi(activeStage.tone, 'active')}`}>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${getToneUi(activeStage.tone, 'active')}`}>
                        {activeStage.badge}
                      </span>
                      <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500 dark:bg-slate-950/60 dark:text-slate-300">
                        {isFinished ? t('flow.finalState', 'Estado final') : `${t('mission.step', 'Passo')} ${currentStepIndex + 1}`}
                      </span>
                    </div>

                    <h3 className={`mt-4 break-words text-2xl font-black leading-tight text-textMain ${
                      focusedStep.path ? 'font-mono text-xl sm:text-2xl' : ''
                    }`}>
                      {focusedStep.method ? `${focusedStep.method} ${focusedStep.path || ''}` : activeStage.title}
                    </h3>
                    <p className="mt-3 break-words text-sm leading-relaxed text-textMain/80 sm:text-base">
                      {focusedStep.logMessage || activeStage.description}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      {t('flow.status', 'Status')}
                    </div>
                    <div className={`mt-1 text-2xl font-black ${activeStatusCode >= 400 ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {activeStatusCode}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-textMuted">
                      {getStatusText(activeStatusCode)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-borderSubtle bg-white p-5 shadow-sm dark:bg-slate-900/80">
                  <p className="text-xs font-black uppercase tracking-[0.1em] text-textMuted">
                    {t('flow.whatHappensNow', 'O que acontece aqui')}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-textMain sm:text-[15px]">
                    {activeStage.description}
                  </p>
                </div>

                <div className="rounded-2xl border border-borderSubtle bg-slate-50/90 p-5 shadow-sm dark:bg-slate-950/60">
                  <p className="text-xs font-black uppercase tracking-[0.1em] text-textMuted">
                    {t('flow.whyThisMatters', 'Por que isso importa')}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-textMain sm:text-[15px]">
                    {getStageImportance(activeStage, activeStatusCode, t)}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-borderSubtle bg-gradient-to-r from-white to-slate-50/80 p-5 shadow-sm dark:from-slate-900 dark:to-slate-950/70">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-textMuted">
                  {t('flow.scenarioImpact', 'Efeito do cenário atual')}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-textMain sm:text-[15px]">
                  {getScenarioEffect(focusedStep, activeStatusCode, activeStage, t)}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="min-w-0 rounded-2xl border border-borderSubtle bg-slate-50/85 p-5 shadow-sm dark:bg-slate-950/60">
                  <p className="text-xs font-black uppercase tracking-[0.1em] text-textMuted">
                    {t('flow.requestPreview', 'Request relacionado')}
                  </p>
                  <pre className="mt-3 max-h-[220px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-borderSubtle bg-white p-4 text-xs text-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                    {requestPreview || <span className="italic text-slate-400">{t('flow.noPayload', 'Sem payload relevante nesta etapa.')}</span>}
                  </pre>
                </div>

                <div className="min-w-0 rounded-2xl border border-borderSubtle bg-slate-50/85 p-5 shadow-sm dark:bg-slate-950/60">
                  <p className="text-xs font-black uppercase tracking-[0.1em] text-textMuted">
                    {t('flow.responsePreview', 'Response relacionado')}
                  </p>
                  <pre className="mt-3 max-h-[220px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-borderSubtle bg-white p-4 text-xs text-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                    {responsePreview || <span className="italic text-slate-400">{t('flow.noResponse', 'Sem response detalhado nesta etapa.')}</span>}
                  </pre>
                </div>
              </div>

              <div className="rounded-2xl border-l-4 border-primary-500 bg-slate-950 p-5 shadow-inner dark:bg-black">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-400">
                  {t('flow.liveNarration', 'Leitura viva da etapa')}
                </p>
                <div className="mt-3 break-words font-mono text-sm leading-relaxed text-slate-300">
                  <span className="mr-2 text-emerald-500">{'>'}</span>
                  {focusedStep.logMessage || scenario.explanation || t('flow.didacticSummary', 'A requisição percorre as camadas até a resposta voltar para a interface.')}
                </div>
              </div>

              <div className="rounded-2xl border border-borderSubtle bg-white p-5 shadow-sm dark:bg-slate-900/80">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.1em] text-textMuted">
                      {t('flow.executionMoments', 'Momentos da execução')}
                    </p>
                    <p className="mt-1 text-sm text-textMuted">
                      {t('flow.executionMomentsDescription', 'Cada passo abaixo representa um momento técnico real da missão e ajuda a localizar a falha ou o sucesso com precisão.')}
                    </p>
                  </div>
                  <div className="text-sm font-bold text-textMain">
                    {isFinished
                      ? t('flow.finished', 'Fluxo concluído')
                      : currentStepIndex >= 0
                        ? `${t('mission.step', 'Passo')} ${currentStepIndex + 1} ${t('mission.of', 'de')} ${steps.length}`
                        : t('flow.readyToStart', 'Pronto para iniciar')}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 md:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                  {steps.map((step, index) => {
                    const isActive = index === currentStepIndex;
                    const isPast = index < currentStepIndex || isFinished;
                    const isError = (step.statusCode ?? diagram.statusCode) >= 400;

                    return (
                      <button
                        key={`${step.fromNodeKey}-${step.toNodeKey}-${index}`}
                        onClick={() => handleJumpToStep(index)}
                        className={`min-w-0 rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                          isActive
                            ? 'border-primary-300 bg-primary-50 shadow-md dark:border-primary-700/50 dark:bg-primary-950/30'
                            : isPast
                              ? `${isError ? 'border-rose-200 dark:border-rose-900/50' : 'border-emerald-200 dark:border-emerald-900/50'} bg-slate-50/70 dark:bg-slate-950/40`
                              : 'border-borderSubtle bg-white dark:bg-slate-950/20'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${
                            isActive
                              ? 'bg-primary-600 text-white'
                              : isPast
                                ? isError
                                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-200'
                                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200'
                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {t('mission.step', 'Passo')} {index + 1}
                          </span>
                          <span className={`text-xs font-bold ${isError ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}`}>
                            {step.statusCode ?? diagram.statusCode}
                          </span>
                        </div>

                        <h4 className={`mt-3 break-all font-black leading-snug text-textMain ${
                          step.method ? 'font-mono text-sm' : 'text-base'
                        }`} title={step.method ? `${step.method} ${step.path || ''}` : `${t('flow.response', 'Response')} ${step.statusCode || diagram.statusCode}`}>
                          {step.method ? `${step.method} ${step.path || ''}` : `${t('flow.response', 'Response')} ${step.statusCode || diagram.statusCode}`}
                        </h4>

                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-textMuted">
                          {step.logMessage || t('flow.waiting', 'Aguardando')}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center dark:border-slate-700 dark:bg-slate-950/30">
              <div className="rounded-full bg-primary-100 p-4 text-primary-600 dark:bg-primary-950/40 dark:text-primary-300">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-5 text-2xl font-black text-textMain">
                {t('flow.readyToTravel', 'Pronto para percorrer a requisição')}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-textMuted sm:text-base">
                {t('flow.startHint', 'Inicie a simulação para acompanhar a rota da request com foco total na etapa ativa e no impacto pedagógico de cada transição.')}
              </p>
              <div className="mt-6">
                <FlowControls
                  isPlaying={isPlaying}
                  canGoBack={false}
                  canGoForward={steps.length > 0}
                  onBack={handlePrev}
                  onNext={handleNext}
                  onPlayPause={handlePlayPause}
                  labels={{
                    play: t('flow.run', 'Executar'),
                    pause: t('flow.pause', 'Pausar'),
                    back: t('flow.previousStep', 'Etapa anterior'),
                    next: t('flow.nextStep', 'Próxima etapa'),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
