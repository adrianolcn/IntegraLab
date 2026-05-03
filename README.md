<div align="center">

# 🚀 IntegraLab

### Plataforma interativa para aprender APIs, integrações HTTP, autenticação, status codes, sandbox e debug de erros na prática.

<br />

![Java](https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Docker-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

![Spring Security](https://img.shields.io/badge/Spring%20Security-JWT-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![Flyway](https://img.shields.io/badge/Flyway-Migrations-CC0200?style=for-the-badge&logo=flyway&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Design%20System-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-PT--BR%20%7C%20EN-7C3AED?style=for-the-badge)
![Status](https://img.shields.io/badge/status-educational%20platform-22C55E?style=for-the-badge)

<br />

> **Aprenda APIs visualizando o caminho de cada requisição.**  
> Teoria, sandbox, missões, debug, status codes, autenticação e progresso guiado em uma única experiência.

</div>

---

<a id="sumario"></a>

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [O problema que o IntegraLab resolve](#o-problema-que-o-integralab-resolve)
- [Demonstração conceitual](#demonstracao-conceitual)
- [Principais funcionalidades](#principais-funcionalidades)
- [Modelo pedagógico](#modelo-pedagogico)
- [Trilha inicial implementada](#trilha-inicial-implementada)
- [Stack utilizada](#stack-utilizada)
- [Arquitetura do monorepo](#arquitetura-do-monorepo)
- [Como rodar localmente](#como-rodar-localmente)
- [Variáveis de ambiente](#variaveis-de-ambiente)
- [Migrations com Flyway](#migrations-com-flyway)
- [Testes e validação](#testes-e-validacao)
- [Documentação técnica](#documentacao-tecnica)
- [Troubleshooting](#troubleshooting)
- [Funcionalidades implementadas](#funcionalidades-implementadas)
- [Segurança](#seguranca)
- [Roadmap](#roadmap)
- [Contribuição](#contribuicao)
- [Status atual](#status-atual)
- [Autor](#autor)
- [Licença](#licenca)

---

<a id="sobre-o-projeto"></a>

## Sobre o projeto

🧠 O **IntegraLab** é uma plataforma educacional interativa criada para ensinar, de forma visual e prática, como funcionam **APIs HTTP**, integrações, requisições, respostas, status codes, autenticação, sandbox e diagnóstico de erros.

A proposta do projeto é sair do ensino passivo e transformar conceitos técnicos em uma jornada guiada, onde o aluno aprende por meio de:

- 📚 teoria interativa;
- 🧩 notas conceituais clicáveis;
- 🧪 sandbox HTTP;
- 🎯 missões práticas;
- 🧠 mini quizzes;
- 🔎 debug guiado;
- 🏆 gamificação;
- 🌍 suporte a múltiplos idiomas;
- 📈 progresso teórico e prático.

O foco é ajudar estudantes, desenvolvedores iniciantes, profissionais de suporte técnico e pessoas que trabalham com integrações a entenderem **não apenas qual resposta escolher**, mas **por que cada conceito funciona daquele jeito**.

[Voltar ao topo](#sumario)

---

<a id="o-problema-que-o-integralab-resolve"></a>

## O problema que o IntegraLab resolve

💡 Aprender APIs costuma ser difícil porque muitos conceitos aparecem ao mesmo tempo:

| Conceito | Dificuldade comum |
|---|---|
| Métodos HTTP | Saber quando usar GET, POST, PUT, PATCH ou DELETE |
| Headers | Entender metadados como Content-Type e Authorization |
| Body JSON | Montar payloads válidos e interpretar erros |
| Status Codes | Diferenciar 400, 401, 403, 404, 422 e 500 |
| Autenticação | Entender token, Bearer Token, JWT e permissões |
| Debug | Saber onde investigar quando uma requisição falha |

Na prática, muitos alunos acabam apenas copiando exemplos prontos no Postman, Insomnia ou cURL sem compreender o fluxo completo.

O IntegraLab resolve isso criando uma experiência progressiva:

```text
Teoria → ConceptNotes → Mini Quiz → Sandbox → Missão → Progresso
```

[Voltar ao topo](#sumario)

---

<a id="demonstracao-conceitual"></a>

## Demonstração conceitual

🧭 O IntegraLab ensina APIs mostrando o caminho da requisição:

```text
Cliente
  ↓
Request
  ↓
Endpoint
  ↓
API
  ↓
Servidor / Regra de negócio
  ↓
Banco de dados
  ↓
Response
  ↓
Interface
```

Em vez de apenas explicar esse fluxo com texto, a plataforma usa **players interativos**, **diagramas**, **cards**, **glossários ricos** e **simuladores**.

[Voltar ao topo](#sumario)

---

<a id="principais-funcionalidades"></a>

## Principais funcionalidades

### Teoria interativa

📚 As aulas do IntegraLab não são páginas de texto corrido. Elas seguem um padrão pedagógico visual:

- introdução organizada;
- blocos explicativos;
- cards interativos;
- exemplos técnicos;
- fluxos animados;
- glossário contextual;
- mini quiz;
- CTA para sandbox e missão prática.

---

### ConceptNotes

🧩 Todo termo técnico novo deve virar uma nota clicável.

Exemplo:

```text
{{API REST}}
{{JSON}}
{{Header}}
{{Body}}
{{Status Code}}
{{Bearer Token}}
{{Correlation ID}}
```

Cada ConceptNote apresenta:

| Campo | Descrição |
|---|---|
| `term` | Nome do termo |
| `acronym` | Significado da sigla, quando existir |
| `definition` | Definição simples |
| `importance` | Por que importa |
| `example` | Exemplo prático |
| `lessonContext` | Relação com a aula atual |

Regra pedagógica do projeto:

```text
termo técnico novo → ConceptNote → glossário rico → exemplo → relação com a aula
```

---

### Sandbox HTTP didático

🧪 O projeto possui um sandbox HTTP seguro, simulado e determinístico.

Com ele, o aluno pode testar:

- métodos HTTP;
- rotas;
- headers;
- body JSON;
- autenticação;
- respostas;
- erros comuns;
- status codes.

O sandbox **não faz chamadas externas**, não atua como proxy e não executa código do usuário.

Ele existe para fins didáticos.

---

### FlowViewer e fluxos animados

🧬 A plataforma possui visualizações para explicar fluxos de requisição de forma interativa.

Os players contam com:

- ▶️ Play;
- ⏸️ Pause;
- ⬅️ Voltar;
- ➡️ Avançar;
- 🔁 Reiniciar;
- destaque da etapa atual;
- explicações contextuais;
- ConceptNotes dentro das etapas.

---

### Missões práticas

🎯 As missões permitem aplicar os conceitos aprendidos.

Exemplos de missões:

- montar uma requisição GET;
- enviar um POST com JSON;
- corrigir erro 400;
- identificar erro 401;
- escolher o status code correto;
- seguir o fluxo de uma requisição autenticada.

---

### Gamificação

🏆 O IntegraLab possui recursos de engajamento:

- XP;
- níveis;
- badges;
- progresso por missão;
- desbloqueio progressivo;
- checkpoints avaliáveis;
- feedback contextual.

A gamificação reforça o aprendizado sem substituir a base conceitual.

---

### Progresso teórico e jornada guiada

📈 Além do progresso das missões, a plataforma registra o avanço do aluno na teoria.

O sistema acompanha:

- aula iniciada;
- aula estudada;
- mini quiz respondido;
- sandbox testado;
- missão relacionada;
- próximo passo recomendado.

A plataforma orienta, mas não bloqueia agressivamente.

---

### Internacionalização

🌍 O IntegraLab possui suporte a:

- Português;
- Inglês.

A troca de idioma ocorre sem recarregar a página.

---

### Tema claro, escuro e sistema

🎨 A interface oferece:

- modo claro;
- modo escuro;
- modo sincronizado com o sistema operacional.

O visual utiliza uma estética moderna com glassmorphism, painéis translúcidos, sombras suaves e background geométrico.

[Voltar ao topo](#sumario)

---

<a id="modelo-pedagogico"></a>

## Modelo pedagógico

🧱 O IntegraLab foi pensado como uma plataforma educacional, não apenas como um CRUD com quizzes.

O padrão das aulas segue esta lógica:

```text
1. Apresentar o conceito
2. Explicar com linguagem acessível
3. Mostrar fluxo ou exemplo visual
4. Introduzir termos com ConceptNotes
5. Demonstrar tecnicamente
6. Apontar erros comuns
7. Testar com mini quiz
8. Levar ao sandbox
9. Conectar com missão prática
10. Registrar progresso
```

[Voltar ao topo](#sumario)

---

<a id="trilha-inicial-implementada"></a>

## Trilha inicial implementada

🛤️ A trilha inicial foca em fundamentos de APIs HTTP.

### Fundamentos de APIs HTTP

| Aula | Conteúdo |
|---|---|
| O que é uma API? | Conceito, fluxo da requisição, cliente, servidor, endpoint e response |
| Métodos HTTP | GET, POST, PUT, PATCH, DELETE, OPTIONS e idempotência |
| Headers e Body JSON | Header, body, payload, Content-Type, Accept, Authorization e JSON |
| Status Codes | 2xx, 3xx, 4xx, 5xx e diagnóstico visual |
| Autenticação e Bearer Token | Auth, token, JWT, Authorization header, 401 e 403 |
| Debug de Erros | Ordem de investigação, logs, correlation ID e triagem de falhas |

[Voltar ao topo](#sumario)

---

<a id="stack-utilizada"></a>

## Stack utilizada

🛠️ O projeto usa uma stack moderna com backend Java, frontend React e banco PostgreSQL.

### Backend

| Tecnologia | Uso |
|---|---|
| Java 17 | Linguagem principal do backend |
| Spring Boot 3.x | Framework da API |
| Spring Security | Segurança e autenticação |
| JWT | Sessões stateless |
| Spring Data JPA | Persistência |
| PostgreSQL | Banco relacional |
| Flyway | Versionamento de banco |
| JUnit | Testes |
| Mockito | Testes unitários |

### Frontend

| Tecnologia | Uso |
|---|---|
| React 19 | Interface web |
| TypeScript | Tipagem estática |
| Vite | Build e dev server |
| TailwindCSS | Design System |
| React Router | Rotas |
| i18next | Internacionalização |
| React Flow | Visualização de fluxos |
| React Hook Form | Formulários |
| Zod | Validação |

### Infraestrutura

| Ferramenta | Uso |
|---|---|
| Docker Compose | Banco local |
| GitHub Actions | CI |
| Maven Wrapper | Build backend |
| npm | Dependências frontend |

[Voltar ao topo](#sumario)

---

<a id="arquitetura-do-monorepo"></a>

## Arquitetura do monorepo

🧩 Estrutura principal do projeto:

```text
IntegraLab/
├── backend/
│   ├── src/main/java/com/integralab/
│   │   ├── auth/
│   │   ├── catalog/
│   │   ├── missions/
│   │   ├── sandbox/
│   │   ├── theory/
│   │   └── security/
│   │
│   ├── src/main/resources/db/migration/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── locales/
│   │   ├── lib/
│   │   └── styles/
│   │
│   └── package.json
│
├── docs/
│   ├── learning-design.md
│   ├── roadmap.md
│   ├── sandbox-http.md
│   ├── theory-engine.md
│   └── contributing.md
│
├── .github/
│   └── workflows/
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

[Voltar ao topo](#sumario)

---

<a id="como-rodar-localmente"></a>

## Como rodar localmente

🚀 Siga os passos abaixo para executar o IntegraLab em ambiente local.

### Pré-requisitos

Instale:

- Java 17
- Node.js
- npm
- Docker
- Docker Compose
- Git

---

### 1. Clonar o repositório

```powershell
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd IntegraLab
```

---

### 2. Configurar variáveis de ambiente

Use o `.env.example` como base.

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/integralab
POSTGRES_USER=integralab
POSTGRES_PASSWORD=integralab
POSTGRES_DB=integralab
JWT_SECRET=change_me_for_local_development_only
JWT_EXPIRATION=86400000
VITE_API_BASE_URL=http://localhost:8080
```

> Nunca utilize valores padrão em produção.

---

### 3. Subir o banco de dados

Na raiz do projeto:

```powershell
docker compose up -d
```

Verifique o container:

```powershell
docker ps
```

---

### 4. Rodar o backend

```powershell
cd backend
.\mvnw spring-boot:run
```

O backend ficará disponível em:

```text
http://localhost:8080
```

---

### 5. Rodar o frontend

Em outro terminal:

```powershell
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

[Voltar ao topo](#sumario)

---

<a id="variaveis-de-ambiente"></a>

## Variáveis de ambiente

🔧 As variáveis principais do projeto são:

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | URL JDBC de conexão com o PostgreSQL |
| `POSTGRES_USER` | Usuário do banco local |
| `POSTGRES_PASSWORD` | Senha do banco local |
| `POSTGRES_DB` | Nome do banco local |
| `JWT_SECRET` | Chave usada para assinar e validar tokens JWT |
| `JWT_EXPIRATION` | Tempo de expiração do token em milissegundos |
| `VITE_API_BASE_URL` | URL base do backend consumida pelo frontend |

[Voltar ao topo](#sumario)

---

<a id="migrations-com-flyway"></a>

## Migrations com Flyway

🗃️ O projeto utiliza **Flyway** para versionamento de banco de dados.

As migrations ficam em:

```text
backend/src/main/resources/db/migration/
```

Ao iniciar o backend, o Flyway aplica automaticamente as migrations pendentes.

Exemplo:

```text
V1__init.sql
V2__auth_and_catalog.sql
V3__seed_data.sql
...
```

Para consultar o histórico:

```powershell
docker exec -it integralab-db psql -U integralab -d integralab -c "SELECT version, description, success, installed_on FROM flyway_schema_history ORDER BY installed_rank;"
```

[Voltar ao topo](#sumario)

---

<a id="testes-e-validacao"></a>

## Testes e validação

🧪 Comandos principais de validação.

### Backend

```powershell
cd backend
.\mvnw clean compile test
```

### Frontend

```powershell
cd frontend
npm run build
```

[Voltar ao topo](#sumario)

---

<a id="documentacao-tecnica"></a>

## Documentação técnica

📚 A documentação fica em:

```text
docs/
```

Principais arquivos:

| Documento | Descrição |
|---|---|
| `learning-design.md` | Regras pedagógicas e padrão de aulas |
| `theory-engine.md` | Motor de teoria interativa |
| `sandbox-http.md` | Funcionamento do sandbox |
| `roadmap.md` | Próximos passos do produto |
| `contributing.md` | Guia de contribuição |
| `troubleshooting.md` | Recuperação de ambiente local |

[Voltar ao topo](#sumario)

---

<a id="troubleshooting"></a>

## Troubleshooting

📎 Problemas locais conhecidos e passos de recuperação ficam em:

```text
docs/troubleshooting.md
```

[Voltar ao topo](#sumario)

---

<a id="funcionalidades-implementadas"></a>

## Funcionalidades implementadas

✅ Estado atual das principais áreas:

| Área | Status |
|---|---|
| Autenticação JWT | ✅ Implementado |
| Catálogo de trilhas | ✅ Implementado |
| Módulos de aprendizagem | ✅ Implementado |
| Missões práticas | ✅ Implementado |
| XP e níveis | ✅ Implementado |
| Badges | ✅ Implementado |
| Checkpoints avaliáveis | ✅ Implementado |
| Desbloqueio progressivo | ✅ Implementado |
| Sandbox HTTP | ✅ Implementado |
| FlowViewer animado | ✅ Implementado |
| Teoria interativa | ✅ Implementado |
| ConceptNotes | ✅ Implementado |
| Glossário rico | ✅ Implementado |
| Mini quiz | ✅ Implementado |
| Progresso teórico | ✅ Implementado |
| Jornada guiada | ✅ Implementado |
| Dashboard recomendado | ✅ Implementado |
| PT-BR / EN | ✅ Implementado |
| Light/Dark/System | ✅ Implementado |
| CI Backend | ✅ Implementado |
| CI Frontend | ✅ Implementado |

[Voltar ao topo](#sumario)

---

<a id="seguranca"></a>

## Segurança

🔐 O projeto utiliza autenticação JWT para rotas protegidas.

Recursos públicos:

- catálogo;
- trilhas;
- aulas teóricas;
- landing page.

Recursos protegidos:

- progresso;
- missões práticas;
- sandbox;
- submissões;
- dados do usuário.

O sandbox HTTP é seguro e didático:

- não faz chamadas externas;
- não atua como proxy;
- não executa código;
- não expõe credenciais;
- não substitui testes reais de integração.

[Voltar ao topo](#sumario)

---

<a id="roadmap"></a>

## Roadmap

🧭 Próximas evoluções possíveis:

### Conteúdo

- CORS;
- DNS;
- HTTPS/TLS;
- Webhooks;
- GraphQL;
- filas e mensageria;
- APIs orientadas a eventos.

### Produto

- painel administrativo;
- editor visual de aulas;
- criação de missões pela interface;
- analytics de aprendizagem;
- ranking;
- perfil do aluno;
- certificados.

### Plataforma

- deploy em nuvem;
- modo demo público;
- seed avançada;
- observabilidade;
- testes end-to-end.

[Voltar ao topo](#sumario)

---

<a id="contribuicao"></a>

## Contribuição

🧑‍💻 Consulte:

```text
docs/contributing.md
```

Fluxo sugerido:

```powershell
git checkout -b feature/nome-da-feature
```

Antes de abrir PR:

```powershell
cd backend
.\mvnw clean compile test
```

```powershell
cd frontend
npm run build
```

[Voltar ao topo](#sumario)

---

<a id="status-atual"></a>

## Status atual

📌 O IntegraLab já possui uma base educacional madura:

```text
Base técnica
→ Gamificação
→ Missões
→ Sandbox
→ Teoria interativa
→ ConceptNotes
→ Progresso teórico
→ Jornada guiada
```

O projeto está pronto para apresentação como plataforma de aprendizado de APIs e integrações HTTP.

[Voltar ao topo](#sumario)

---

<a id="autor"></a>

## Autor

👨‍💻 Desenvolvido por **Adriano L. C. Nunes**.

Projeto criado para estudo, prática e demonstração de conceitos de engenharia de software, backend, APIs, integrações, arquitetura educacional e experiência de aprendizagem interativa.

[Voltar ao topo](#sumario)

---

<a id="licenca"></a>

## Licença

📄 Projeto proprietário / uso educacional.

Todos os direitos reservados.

[Voltar ao topo](#sumario)

---

<div align="center">

## IntegraLab

**Aprender APIs não precisa ser abstrato.**  
**Visualize. Teste. Erre. Corrija. Evolua.**

</div>
