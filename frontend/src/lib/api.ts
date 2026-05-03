const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export interface HealthResponse {
  status: string;
  application: string;
  message: string;
}

export interface MissionOption {
  id: string;
  missionId: string;
  label: string;
  value: string;
  isCorrect: boolean;
}

export interface TheoryLesson {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  content: string;
  keyConcepts: string;
  commonMistakes: string;
  practicalExample: string;
  requestExample: string;
  responseExample: string;
  relatedConcepts: string;
  beforeMission: string;
  
  learningObjectives?: string;
  analogy?: string;
  keyConceptsDetailed?: string;
  commonMistakesDetailed?: string;
  glossary?: string;
  miniQuiz?: string;
  interactiveContent?: string;
  interactiveFlow?: string;

  orderIndex: number;
  readingTimeMinutes: number;
  relatedMissionId?: string;
  relatedMissionSlug?: string;
  relatedMissionTitle?: string;
}

export interface TheoryProgress {
  id: string;
  lessonId: string;
  openedAt: string | null;
  completedAt: string | null;
  quizAttemptedAt: string | null;
  quizScore: number;
  quizTotal: number;
  quizPassed: boolean;
  sandboxUsedAt: string | null;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  totalXp: number;
  level: number;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export interface Track {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
}

export interface LearningModule {
  id: string;
  trackId: string;
  title: string;
  slug: string;
  description: string;
  status: string;
}

export interface Mission {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  description: string;
  objective: string;
  difficulty: string;
  xpReward: number;
  status: string;
  missionType: string;
  successFeedback?: string;
  errorFeedback?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

export interface GuidedStep {
  id: string;
  title: string;
  content: string;
  example?: string | null;
  commonMistake?: string | null;
  checkpointQuestion?: string | null;
  checkpointAnswer?: string | null;
  explanation?: string | null;
  orderIndex?: number;
}

export interface MissionAccessResponse {
  accessStatus: string;
  lockedReason?: string | null;
  previousMissionSlug?: string | null;
}

export interface CheckpointResultResponse {
  correct: boolean;
  feedback: string;
  idealAnswer?: string | null;
  conceptReviewed?: string | null;
  nextStepSuggestion?: string | null;
}

export interface AttemptResultResponse {
  correct: boolean;
  feedback: string;
  whatWasCorrect?: string | null;
  whatWasWrong?: string | null;
  suggestedCorrection?: string | null;
  idealAnswer?: string | null;
  xpEarned: number;
  userTotalXp: number;
  userLevel: number;
}

export interface MissionScenarioNode {
  nodeKey: string;
  label: string;
  nodeType?: string | null;
  description?: string | null;
}

export interface MissionScenarioStep {
  fromNodeKey: string;
  toNodeKey: string;
  stepType?: string | null;
  status?: string | null;
  method?: string | null;
  path?: string | null;
  statusCode?: number | null;
  logMessage?: string | null;
  payloadExample?: string | null;
  responseExample?: string | null;
  orderIndex?: number;
}

export interface MissionScenario {
  id: string;
  missionId: string;
  title: string;
  description: string;
  explanation?: string | null;
  initialRequestJson?: string | null;
  simulatedResponseJson?: string | null;
  nodes: MissionScenarioNode[];
  steps: MissionScenarioStep[];
}

export interface SandboxRequest {
  method: string;
  path: string;
  headers: Record<string, string>;
  body: unknown;
}

export interface SandboxResponse {
  statusCode: number;
  statusText: string;
  responseHeaders?: Record<string, string>;
  responseBody?: unknown;
  logs: string[];
  hints: string[];
}

export interface ProgressResponse {
  totalXp?: number;
  level?: number;
  completedMissions?: number;
  [key: string]: unknown;
}

export interface BadgeSummary {
  id: string;
  name?: string;
  description?: string;
  icon?: string;
}

function getHeaders(token?: string | null) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept-Language': localStorage.getItem('integralab_locale') || 'pt-BR'
  };
  const currentToken = token || localStorage.getItem('integralab-token');
  if (currentToken) {
    headers['Authorization'] = `Bearer ${currentToken}`;
  }
  return headers;
}

export const api = {
  async getHealth(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  async getMe(token?: string): Promise<UserDto> {
    const response = await fetch(`${API_BASE_URL}/api/me`, {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Not authenticated');
    return response.json();
  },

  async getTracks(): Promise<Track[]> {
    const response = await fetch(`${API_BASE_URL}/api/tracks`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch tracks');
    return response.json();
  },

  async getTrackBySlug(slug: string): Promise<Track> {
    const response = await fetch(`${API_BASE_URL}/api/tracks/slug/${slug}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Track not found');
    return response.json();
  },

  async getTrackById(trackId: string): Promise<Track> {
    const response = await fetch(`${API_BASE_URL}/api/tracks/${trackId}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Track not found');
    return response.json();
  },

  async getModulesByTrackId(trackId: string): Promise<LearningModule[]> {
    const response = await fetch(`${API_BASE_URL}/api/tracks/${trackId}/modules`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch modules');
    return response.json();
  },

  async getModuleById(moduleId: string): Promise<LearningModule> {
    const response = await fetch(`${API_BASE_URL}/api/modules/${moduleId}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Module not found');
    return response.json();
  },

  async getMissionsByModuleId(moduleId: string): Promise<Mission[]> {
    const response = await fetch(`${API_BASE_URL}/api/modules/${moduleId}/missions`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch missions');
    return response.json();
  },

  async getMissionBySlug(slug: string): Promise<Mission> {
    const response = await fetch(`${API_BASE_URL}/api/missions/slug/${slug}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Mission not found');
    return response.json();
  },

  async getGuidedSteps(missionId: string): Promise<GuidedStep[]> {
    const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}/guided-steps`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch guided steps');
    return response.json();
  },

  async getMissionScenario(missionId: string): Promise<MissionScenario> {
    const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}/scenario`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch scenario');
    return response.json();
  },

  async getMissionOptions(missionId: string): Promise<MissionOption[]> {
    const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}/options`, { headers: getHeaders() });
    if (response.status === 401 || response.status === 403) throw new Error('Not authenticated');
    if (!response.ok) return [];
    return response.json();
  },

  async getMissionAccess(missionId: string): Promise<MissionAccessResponse> {
    const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}/access`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch access status');
    return response.json();
  },

  async checkGuidedStep(missionId: string, stepId: string, answer: string): Promise<CheckpointResultResponse> {
    const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}/guided-steps/${stepId}/check`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ answer })
    });
    if (!response.ok) throw new Error('Failed to check step');
    return response.json();
  },

  async submitAttempt(missionId: string, answer: string): Promise<AttemptResultResponse> {
    const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}/attempts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ answer }),
    });
    if (!response.ok) throw new Error('Failed to submit attempt');
    return response.json();
  },

  async getTheoryLessonsByModuleSlug(slug: string): Promise<TheoryLesson[]> {
    const response = await fetch(`${API_BASE_URL}/api/modules/slug/${slug}/lessons`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch lessons');
    return response.json();
  },

  async getTheoryLessonsByModuleId(moduleId: string): Promise<TheoryLesson[]> {
    const response = await fetch(`${API_BASE_URL}/api/modules/${moduleId}/lessons`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch lessons');
    return response.json();
  },

  async getTheoryLessonById(id: string): Promise<TheoryLesson> {
    const response = await fetch(`${API_BASE_URL}/api/lessons/${id}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch lesson');
    return response.json();
  },

  async getMyProgress(): Promise<ProgressResponse> {
    const response = await fetch(`${API_BASE_URL}/api/progress/me`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch progress');
    return response.json();
  },

  async getMyBadges(): Promise<BadgeSummary[]> {
    const response = await fetch(`${API_BASE_URL}/api/badges/me`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch badges');
    return response.json();
  },

  async runSandboxRequest(requestData: SandboxRequest): Promise<SandboxResponse> {
    const response = await fetch(`${API_BASE_URL}/api/sandbox/http/request`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(requestData)
    });
    // We expect the sandbox endpoint to always return 200 OK wrapper.
    if (!response.ok) {
      const errText = await response.text();
      try {
         return JSON.parse(errText) as SandboxResponse;
      } catch {
         throw new Error(errText);
      }
    }
    return response.json();
  },

  async getMyTheoryProgress(): Promise<TheoryProgress[]> {
    const response = await fetch(`${API_BASE_URL}/api/theory-progress/me`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch theory progress');
    return response.json();
  },

  async getLessonProgress(lessonId: string): Promise<TheoryProgress> {
    const response = await fetch(`${API_BASE_URL}/api/theory-progress/me/lessons/${lessonId}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch lesson progress');
    return response.json();
  },

  async markLessonOpened(lessonId: string): Promise<TheoryProgress> {
    const response = await fetch(`${API_BASE_URL}/api/theory-progress/lessons/${lessonId}/opened`, { method: 'POST', headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to mark lesson opened');
    return response.json();
  },

  async markLessonCompleted(lessonId: string): Promise<TheoryProgress> {
    const response = await fetch(`${API_BASE_URL}/api/theory-progress/lessons/${lessonId}/complete`, { method: 'POST', headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to mark lesson completed');
    return response.json();
  },

  async recordQuizResult(lessonId: string, score: number, total: number): Promise<TheoryProgress> {
    const response = await fetch(`${API_BASE_URL}/api/theory-progress/lessons/${lessonId}/quiz`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ score, total }),
    });
    if (!response.ok) throw new Error('Failed to record quiz result');
    return response.json();
  },

  async markSandboxUsed(lessonId: string): Promise<TheoryProgress> {
    const response = await fetch(`${API_BASE_URL}/api/theory-progress/lessons/${lessonId}/sandbox-used`, { method: 'POST', headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to mark sandbox used');
    return response.json();
  }
};
