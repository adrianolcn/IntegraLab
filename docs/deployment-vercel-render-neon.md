# Deploy do IntegraLab com Vercel + Render + Neon

## Objetivo

Este guia prepara o IntegraLab para a arquitetura:

- Frontend: Vercel
- Backend: Render
- Banco: Neon PostgreSQL

Ele descreve o processo de publicação, mas não executa nenhum deploy.

## Visão da arquitetura

Ordem recomendada:

1. Criar o banco no Neon
2. Configurar o backend no Render
3. Validar o health check do backend
4. Configurar o frontend na Vercel
5. Testar login, catálogo, aulas, ConceptNotes, missão, progresso e sandbox

Fluxo esperado:

```text
Vercel (Frontend)
  -> chama
Render (Backend Spring Boot)
  -> conecta em
Neon PostgreSQL
```

## Auditoria de prontidão

### O que já está pronto

- backend com PostgreSQL e Flyway
- backend configurável por ambiente
- CORS centralizado por variável
- endpoint de health check em `/api/health`
- frontend usando `VITE_API_BASE_URL`
- `validate:theory`, `lint` e `build` prontos
- Dockerfile para backend
- Dockerfile para frontend

### O que continua externo ao repositório

- URL real do backend no Render
- URL real do frontend na Vercel
- string real de conexão do Neon
- segredo JWT de produção
- domínio final e TLS

## Neon

### Passo a passo

1. Criar um projeto no Neon
2. Criar ou escolher:
   - branch principal
   - database
   - role de aplicação
3. Abrir o painel `Connect`
4. Copiar a connection string PostgreSQL

### Recomendação

Para ambiente web com backend hospedado, prefira a connection string com pooler quando o ambiente tiver bursts de conexão.

O Neon documenta pooled e direct connection strings. Para o IntegraLab, a opção pooled tende a ser mais segura para produção leve e demo pública.

Exemplo esperado:

```text
postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require
```

ou com pooler:

```text
postgresql://USER:PASSWORD@HOST-pooler.neon.tech/DB?sslmode=require
```

### Variáveis que saem do Neon

No Render, isso será usado como:

```text
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
```

Observação:

- se a URL já embutir usuário e senha, ainda assim mantenha os campos explícitos no ambiente, se a estratégia operacional da equipe preferir;
- o mais importante é que a aplicação receba uma URL JDBC válida para PostgreSQL com SSL.

## Render

## O backend atual serve bem para Render?

Sim.

O [C:\dev\IntegraLab\backend\Dockerfile](C:\dev\IntegraLab\backend\Dockerfile) é compatível com o fluxo de Docker do Render:

- build multi-stage
- empacota o jar no container
- sobe com `java -jar`
- expõe a aplicação web

Também ajustei o backend para ler:

```text
server.port=${PORT:8080}
```

Isso é importante porque o Render fornece `PORT` para web services.

### Configuração recomendada no Render

Criar um `Web Service` com:

- Source: repositório Git
- Runtime: Docker
- Root directory: `backend`
- Branch: a branch estável de deploy

### Variáveis no Render

Cadastre:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION`
- `APP_CORS_ALLOWED_ORIGINS`

Valores esperados:

```text
JWT_EXPIRATION=86400000
APP_CORS_ALLOWED_ORIGINS=https://frontend-example.vercel.app
```

Se houver domínio customizado no frontend, troque para ele.

### Health check no Render

Use:

```text
/api/health
```

### Flyway no Render

O Flyway já está ativo no backend.

Cuidados:

- o banco Neon precisa estar acessível antes do primeiro boot do Render;
- a role usada pelo backend precisa ter permissão para aplicar migrations;
- não publique com banco vazio e role restrita demais sem testar o boot completo.

## Vercel

## O frontend atual serve bem para Vercel?

Sim.

O frontend pode ser publicado na Vercel como projeto Vite estático.

Configuração esperada:

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

### Variável necessária na Vercel

```text
VITE_API_BASE_URL
```

Valor esperado:

```text
https://backend-example.onrender.com
```

Não hardcode essa URL no repositório. Configure apenas no painel da Vercel.

### Observação importante

Sem `VITE_API_BASE_URL`, o build de produção usa caminho relativo.

Isso pode funcionar apenas se frontend e backend estiverem atrás do mesmo domínio/proxy. Como aqui a arquitetura separa Vercel e Render, o correto é definir `VITE_API_BASE_URL` explicitamente na Vercel.

## Variáveis por plataforma

### Neon

Geradas ou copiadas do painel:

- host
- database
- role
- password
- connection string com SSL

### Render

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION`
- `APP_CORS_ALLOWED_ORIGINS`

### Vercel

- `VITE_API_BASE_URL`

## Ordem correta de deploy

1. Criar banco e credenciais no Neon
2. Configurar variáveis do backend no Render
3. Publicar backend no Render
4. Esperar o backend subir e testar `/api/health`
5. Configurar `VITE_API_BASE_URL` na Vercel com a URL pública do Render
6. Publicar frontend na Vercel
7. Executar smoke tests completos

## Smoke tests

### Backend

1. Abrir `/api/health`
2. Confirmar `status = UP`
3. Confirmar que a aplicação iniciou sem erro de Flyway

### Frontend

1. Abrir a home
2. Abrir catálogo/trilhas
3. Abrir uma aula teórica
4. Abrir ConceptNotes
5. Abrir uma missão
6. Testar o FlowViewer
7. Testar o sandbox
8. Registrar usuário demo ou entrar com conta demo
9. Confirmar progresso salvo

## Problemas comuns

### 1. CORS bloqueando chamadas

Sintoma:

- frontend abre, mas chamadas ao backend falham no navegador

Causa provável:

- `APP_CORS_ALLOWED_ORIGINS` sem a URL correta da Vercel

Correção:

- cadastrar exatamente a origem do frontend publicada
- se usar domínio customizado, atualizar a variável

### 2. Backend sobe, mas falha ao iniciar

Sintoma:

- deploy falha no boot do Spring

Causas prováveis:

- credenciais erradas do Neon
- string sem SSL
- role sem permissão adequada
- Flyway sem acesso ao schema

### 3. Frontend chama localhost em produção

Sintoma:

- rede mostra chamadas para `localhost`

Causa provável:

- `VITE_API_BASE_URL` não configurada na Vercel

Correção:

- definir a URL pública do Render no painel da Vercel

### 4. Login funciona, mas browser bloqueia sessão

Sintoma:

- autentica, mas chamadas seguintes falham

Checar:

- se a URL do backend em `VITE_API_BASE_URL` está correta
- se a origem do frontend está liberada em `APP_CORS_ALLOWED_ORIGINS`

## Cuidados com CORS

Regras recomendadas:

- não usar `*` em produção
- liberar apenas a origem da Vercel e, se necessário, o domínio customizado
- atualizar a variável se a URL do frontend mudar

Exemplo:

```text
APP_CORS_ALLOWED_ORIGINS=https://integralab-demo.vercel.app
```

ou:

```text
APP_CORS_ALLOWED_ORIGINS=https://integralab-demo.vercel.app,https://app.integralab.com
```

## Cuidados com Flyway

- não remover migrations antigas
- não subir com banco parcialmente inconsistente sem revisar o histórico
- validar localmente com `./mvnw.cmd clean compile test` antes de publicar
- garantir que a role do Neon possa criar/aplicar mudanças no schema

## Usuário demo seguro

Não commite senha real.

Para demo controlada:

1. publicar backend e frontend
2. criar um usuário demo usando o endpoint de registro
3. armazenar a senha fora do repositório

Exemplo local:

```powershell
curl -X POST https://backend.example.com/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Demo User\",\"email\":\"demo@example.com\",\"password\":\"ChangeMe123!\"}"
```

Regras:

- usar senha exclusiva da demo
- nunca reaproveitar senha de produção
- trocar a senha se a demo se tornar pública por muito tempo

## Checklist final antes da publicação real

1. `./mvnw.cmd clean compile test`
2. `npm ci`
3. `npm run validate:theory`
4. `npm run lint`
5. `npm run build`
6. conferir variáveis no Render
7. conferir variável `VITE_API_BASE_URL` na Vercel
8. conferir origem correta em `APP_CORS_ALLOWED_ORIGINS`
9. validar `/api/health`
10. executar smoke test de ponta a ponta
