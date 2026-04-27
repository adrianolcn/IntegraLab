# Architecture

## Visão Geral
IntegraLab é composto por um monorepo que hospeda tanto a aplicação frontend (SPA) quanto a API backend.

## Backend
- **Framework:** Spring Boot 3.x
- **Linguagem:** Java 17
- **Banco de Dados:** PostgreSQL (via Spring Data JPA e Flyway)
- **Autenticação:** Spring Security e JWT.
- **Estrutura de Pacotes:** Domain-driven com pastas como `auth`, `users`, `tracks`, `common`.

## Frontend
- **Framework:** React com TypeScript
- **Bundler:** Vite
- **Estilização:** TailwindCSS com suporte a temas (Dark/Light/System)
- **Roteamento:** React Router
- **Internacionalização:** `react-i18next` (pt-BR e en)
- **Estado de Autenticação:** `AuthContext` armazenando JWT em `localStorage`.

## Banco de Dados
PostgreSQL em container Docker para desenvolvimento. Flyway gerencia as migrações, garantindo um versionamento confiável do esquema.

## Integrações Futuras
A arquitetura foi pensada para suportar integrações avançadas:
- Motores de simulação visual de fluxo de requisição (React Flow).
- Arquiteturas orientadas a eventos (Kafka/RabbitMQ) no motor de simulação.
