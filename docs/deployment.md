# Deploy do IntegraLab

## Objetivo

Este guia prepara o IntegraLab para deploy controlado, sem publicar automaticamente e sem exigir segredos versionados.

Ele cobre:

- variáveis do backend;
- variáveis do frontend;
- PostgreSQL;
- Flyway;
- CORS;
- health check;
- build do backend;
- build do frontend;
- ordem de deploy;
- validações antes de publicar;
- preparação segura de ambiente demo.

## Visão geral da arquitetura

O projeto tem duas partes publicáveis:

1. Backend Spring Boot
2. Frontend React/Vite

Dependência obrigatória:

1. PostgreSQL

Ordem recomendada:

1. Subir PostgreSQL
2. Publicar backend
3. Validar `/api/health`
4. Publicar frontend com `VITE_API_BASE_URL` apontando para o backend
5. Testar login, catálogo, aula, ConceptNotes, missão, progresso e sandbox

## Variáveis do backend

Variáveis necessárias:

| Variável | Obrigatória em deploy | Exemplo |
|---|---|---|
| `SPRING_DATASOURCE_URL` | Sim | `jdbc:postgresql://db-host:5432/integralab` |
| `SPRING_DATASOURCE_USERNAME` | Sim | `integralab` |
| `SPRING_DATASOURCE_PASSWORD` | Sim | `change-me` |
| `JWT_SECRET` | Sim | string forte com 32+ caracteres |
| `JWT_EXPIRATION` | Sim | `86400000` |
| `APP_CORS_ALLOWED_ORIGINS` | Sim | `https://app.example.com` |

Observações:

- o backend mantém fallback local para desenvolvimento;
- em deploy real, use sempre valores explícitos no ambiente;
- não use `*` em CORS para produção.

## Variáveis do frontend

| Variável | Obrigatória em deploy | Exemplo |
|---|---|---|
| `VITE_API_BASE_URL` | Recomendada | `https://api.example.com` |

Comportamento atual:

- em `dev`, sem variável, o frontend usa `http://localhost:8080`;
- em build fora de `dev`, se `VITE_API_BASE_URL` não estiver definida, ele usa caminho relativo e espera backend atrás do mesmo domínio ou proxy reverso.

## CORS

O CORS do backend é centralizado em `SecurityConfig` e lê:

```text
APP_CORS_ALLOWED_ORIGINS
```

Formato esperado:

```text
https://app.example.com
```

ou múltiplas origens:

```text
https://app.example.com,https://demo.example.com
```

Fallback local:

```text
http://localhost:5173,http://127.0.0.1:5173
```

## Health check

Endpoint disponível:

```text
GET /api/health
```

Uso recomendado:

- validar backend após deploy;
- usar em monitoramento, smoke test ou health probe externo.

## PostgreSQL e Flyway

O IntegraLab depende de PostgreSQL e mantém Flyway ativo.

Regras importantes:

- não trocar para H2 em deploy;
- não desabilitar Flyway;
- garantir que o banco esteja disponível antes de subir o backend.

O backend aplica migrations automaticamente ao iniciar.

## Build do backend

### Local

```powershell
cd backend
.\mvnw.cmd clean compile test
```

### Docker

Arquivo:

```text
backend/Dockerfile
```

Build:

```powershell
docker build -t integralab-backend ./backend
```

Run:

```powershell
docker run --rm -p 8080:8080 `
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/integralab `
  -e SPRING_DATASOURCE_USERNAME=integralab `
  -e SPRING_DATASOURCE_PASSWORD=change-me `
  -e JWT_SECRET=change-me-32-plus-chars `
  -e JWT_EXPIRATION=86400000 `
  -e APP_CORS_ALLOWED_ORIGINS=https://app.example.com `
  integralab-backend
```

## Build do frontend

### Local

```powershell
cd frontend
npm ci
npm run validate:theory
npm run lint
npm run build
```

### Docker

Arquivos:

```text
frontend/Dockerfile
frontend/nginx.conf
```

Build:

```powershell
docker build -t integralab-frontend `
  --build-arg VITE_API_BASE_URL=https://api.example.com `
  ./frontend
```

Run:

```powershell
docker run --rm -p 5173:80 integralab-frontend
```

## Dados demo

O catálogo, as aulas, as missões e os cenários já vêm do banco por migrations.

Isso significa que a demo já possui base suficiente para:

- catálogo;
- aula teórica;
- ConceptNotes;
- missão;
- progresso;
- sandbox.

O que não é seedado por padrão:

- usuário demo com senha pronta.

## Como criar um usuário demo com segurança

Não commite senha real.

Para ambiente local ou de homologação controlada, crie o usuário pelo endpoint público de registro:

```powershell
curl -X POST http://localhost:8080/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Demo User\",\"email\":\"demo@example.com\",\"password\":\"ChangeMe123!\"}"
```

Recomendações:

- use email e senha exclusivos do ambiente demo;
- troque a senha antes de qualquer exposição externa mais ampla;
- não reutilize credenciais de produção;
- se a demo pública exigir conta fixa, armazene a senha fora do repositório.

## Checklist antes de publicar

### Backend

```powershell
cd backend
.\mvnw.cmd clean compile test
```

### Frontend

```powershell
cd frontend
npm ci
npm run validate:theory
npm run lint
npm run build
```

### Smoke checks

1. Backend responde em `/api/health`
2. Frontend abre sem depender de `localhost`
3. Login funciona
4. Catálogo carrega
5. Aula teórica abre
6. ConceptNotes abrem completas
7. Missão abre
8. Sandbox responde
9. Progresso salva com usuário autenticado

## Lacunas que ainda dependem do deploy real

Estas decisões continuam externas ao repositório:

- domínio final do frontend;
- domínio final do backend;
- credenciais reais do PostgreSQL;
- `JWT_SECRET` de produção;
- política final de observabilidade, logs e TLS;
- plataforma de hospedagem.
