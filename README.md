# IntegraLab

Aprenda e domine integrações e APIs por meio da prática guiada.

## 1. O que é o projeto
O **IntegraLab** é uma plataforma educacional interativa projetada para ensinar o funcionamento de APIs, métodos HTTP, códigos de status e segurança. Em vez de aulas puramente textuais, o sistema fornece um ambiente gamificado onde o aluno aprende na prática utilizando missões, fluxos interativos e simuladores.

## 2. Problema que resolve
O ensino tradicional de desenvolvimento backend e integrações de API costuma ser estático, focado em extensa documentação e testes secos via Postman ou cURL. O IntegraLab resolve essa dor de aprendizado fornecendo uma interface rica, visualizando o trajeto das requisições na rede e diagnosticando respostas, tudo sem precisar configurar um ambiente local complexo.

## 3. Principais funcionalidades
- **Catálogo e Trilhas:** Jornada guiada por trilhas de estudo estruturadas.
- **Teoria Interativa:** Lições ricas com ConceptNotes, diagramas, glossário e Quizzes integrados para aferir conhecimento.
- **Sandbox HTTP Integrado:** Motor simulado in-browser para disparar requisições, alterar headers, payload e visualizar códigos de status e respostas como em um terminal real.
- **Gamificação Avançada:** Sistema de ganho de XP (Experiência), Níveis (Levels) e recompensas para incentivar o progresso.
- **Múltiplos Idiomas:** Suporte nativo a Português e Inglês sem refresh de página.
- **Tema Personalizável:** Modos Dark, Light e sincronização com o Sistema Operacional.

## 4. Stack utilizada
### Backend
- Java 17, Spring Boot 3.x
- Spring Security (JWT), Spring Data JPA
- PostgreSQL (via Docker Compose)
- Flyway (Controle de Migrações de Banco de Dados)
- JUnit e Mockito (Testes Automatizados)

### Frontend
- React 19 (TypeScript), Vite
- TailwindCSS, UI baseada em Glassmorphism
- React Router, i18next
- React Flow (Visualização e Diagramação)
- React Hook Form e Zod

## 5. Arquitetura do monorepo
O projeto está organizado em um monorepo para facilitar o desenvolvimento:
- `backend/`: Código da API Spring Boot.
- `frontend/`: Aplicação web React.
- `docs/`: Documentações de arquitetura, sandbox, teoria e design.
- `.github/workflows`: Actions CI configuradas para ambas as aplicações.

## 6. Como rodar localmente

### 1. Clonar e Configurar Variáveis
Na raiz do projeto, crie os arquivos de ambiente baseando-se no exemplo. O `.env.example` traz chaves limpas prontas para uso.

### 2. Subir o Banco de Dados com Docker
Para preparar a base PostgreSQL localmente, execute o comando na raiz do projeto (onde está o `docker-compose.yml`):
```powershell
docker compose up -d
```

### 3. Como rodar backend
Com o banco de dados rodando, suba a API Spring Boot:
```powershell
cd backend
.\mvnw spring-boot:run
```
O servidor estará rodando em `http://localhost:8080`.

### 4. Como rodar frontend
Em outro terminal, instale as dependências e rode o servidor de desenvolvimento Vite:
```powershell
cd frontend
npm install
npm run dev
```
Acesse a aplicação no navegador em `http://localhost:5173`.

### 5. Como executar testes (Backend)
```powershell
cd backend
.\mvnw clean compile test
```

### 6. Como funcionam as migrations Flyway
As alterações na base de dados (tabelas, regras e seeds iniciais de missões e trilhas) ocorrem de maneira automatizada pelo **Flyway**. Quando o backend é iniciado, o Spring Boot escaneia a pasta `src/main/resources/db/migration/` e aplica de forma sequencial (ex: `V1`, `V2`, `V3`) qualquer script não registrado no histórico da base de dados. Nenhuma intervenção manual é necessária para estruturar as tabelas.

### 7. Variáveis de ambiente
Variáveis necessárias estão documentadas no `.env.example`. Não utilize credenciais em produção com valores padrão.
- `DATABASE_URL`: URI JDBC de conexão.
- `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB`: Variáveis para provisionamento do container.
- `JWT_SECRET`: Chave simétrica longa usada para gerar e validar tokens de sessão.
- `JWT_EXPIRATION`: Tempo em milissegundos.
- `VITE_API_BASE_URL`: Caminho absoluto de onde a API backend está exposta.

## 8. Roadmap
Acompanhe os próximos passos evolutivos na documentação técnica `docs/roadmap.md`. No futuro, a plataforma suportará GraphQL, Webhooks e sistemas orientados a evento.

## 9. Status atual do projeto
O projeto superou suas bases funcionais e agora encontra-se totalmente maduro na **Fase 3: Progressão Teórica e Diagnóstico**, integrando teoria, quiz, e missões interativas com métricas de completude.

## 10. Licença
Proprietário / Uso Educacional Interno. Todos os direitos reservados.

## 11. Autor
Criado pela equipe de Engenharia do IntegraLab.
