# Roadmap do IntegraLab

## ✅ Concluído
- **Infraestrutura Base**: Monorepo configurado, PostgreSQL via Docker, Flyway, CI com GitHub Actions.
- **Camada de Acesso**: Cadastro, Login e JWT.
- **Catálogo Base**: Motor para renderização de trilhas, módulos e missões.
- **Experiência do Usuário (UX/UI)**: Design system customizado em React/Tailwind com Glassmorphism, temas claro e escuro (persistem preferências) e suporte i18n bilíngue nativo.
- **Gamificação Simples**: Progressão por XP, níveis (levels) e regras para visualização/completude de trilhas.
- **Camada de Teoria**: Criação de `TheoryLesson`, `ConceptNotes`, `FlowViewer` e players de diagramação de redes em tempo real.
- **Progresso Interativo**: Rastreamento da visualização das aulas, engine de quizzes imbutidos com notas persistentes e aviso pedagógico pre-missão sem bloqueio hard.
- **Sandbox Seguro**: Sandbox simulado e determinístico 100% in-browser implementado para treinar os métodos, status e payloads HTTP.

## 🔄 Em Andamento
- **Análise de Lógica Avançada nas Missões**: Implementar submissão com validadores específicos (JSON Path validators, verificadores de estrutura de cabeçalho) acoplados ao Sandbox.
- **Expansão do Catálogo**: Popular o banco de dados com a trilha "Autenticação Avançada" focando em OAuth2, refresh tokens e cookies HTTP-only.

## 🚀 Próximos Passos (Futuro)
- Integrações avançadas focadas em Webhooks e eventos do servidor.
- Suporte a chamadas HTTP reais na sandbox de forma sandboxed (ou em containeres isolados).
- Integração de GraphQL, testador de mutations e queries.
- Integração de microsserviços via gRPC.
- Ranking global e gamificação social avançada (Leaderboards e Conquistas Dinâmicas).
