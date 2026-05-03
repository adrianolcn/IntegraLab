# Learning Design

## Princípios Didáticos
O aprendizado de integrações sistêmicas requer visualização. Textos e logs isolados geram carga cognitiva excessiva.

## Aprendizado Visual
Uso de diagramas vivos e painéis interativos mostrando onde a requisição falhou, qual middleware a barrou, ou como o banco respondeu.

## Missões
Desafios curtos de contexto específico ("O banco rejeitou a conexão", "O webhook não chegou", "O token expirou").

## Feedback
{{ ... }}

## Progressão & Gamificação
XP por resolução de problemas sem dicas, badges por domínio de tecnologias, trilhas bloqueadas que dependem de pré-requisitos.

## Conceito de Requestia
O universo central do IntegraLab. Um mapa gamificado onde as rotas são caminhos, servidores são castelos/fábricas, e o aluno "viaja" junto com o payload.

## Interactive Flow
For multi-step concepts, avoid long paragraphs. Use the `InteractiveFlowPlayer` component.

- The player supports bilingual JSON inputs.
- Designed as a state-machine timeline.
- Steps should include: `title`, `description`, `details`, `importance`, and `example`.

## ConceptNotes Enforcement Rule
**Mandatory Platform Rule**: Every new technical term introduced in the theory layer MUST be explained contextually.

- All new technical terms must be wrapped in `{{Termo}}` to automatically trigger a `ConceptNote` popover.
- The term MUST exist in the lesson's local `glossary`.
- Each glossary entry must be rich and contain:
  1. `term`: The exact term used.
  2. `acronym`: (Optional) What the acronym stands for.
  3. `definition`: A simple, clear definition.
  4. `importance`: Why this concept matters.
  5. `example`: A short practical example.
  6. `lessonContext`: How this term connects specifically to the current lesson.
- No term should be highlighted without a functional popover, and no popover should lack these rich fields.

## Componentes de Fluxo
Todo componente de fluxo/playback deve usar `FlowControls`. Não criar controles próprios para manter o design premium idêntico em todas as aulas.
