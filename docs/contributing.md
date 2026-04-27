# Guia de Contribuição e Deploy Local

Bem-vindo(a) ao projeto IntegraLab! O setup do ambiente de desenvolvimento foi pensado para ser rápido, modular e usar o mínimo possível de configurações ocultas.

Siga os passos abaixo para contribuir.

## 1. Clonar o Repositório
```powershell
git clone https://github.com/SEU_USUARIO/IntegraLab.git
cd IntegraLab
```

## 2. Configurar Variáveis de Ambiente
O projeto precisa de credenciais locais para conectar com o PostgreSQL. Copie o template na raiz:
```powershell
cp .env.example .env
```
*(No Windows/PowerShell pode usar apenas: `copy .env.example .env`)*. O `JWT_SECRET` fornecido na cópia é seguro apenas para testes.

## 3. Subir o Banco de Dados (Docker)
Levante o banco de dados via Docker Compose (execute a partir da pasta raiz). O Flyway (ferramenta que cuida do esquema) executará todas as migrações SQL sozinho depois, portanto, nenhuma tabela precisa ser criada manualmente.
```powershell
docker compose up -d
```

## 4. Rodar o Backend
Navegue para a pasta `backend` e inicialize o servidor Spring Boot com o Maven Wrapper já incluso:
```powershell
cd backend
.\mvnw spring-boot:run
```
O servidor abrirá em `http://localhost:8080` e os endpoints de API estrão disponíveis no prefixo `/api`. O banco de dados será populado na hora se for o primeiro boot.

## 5. Rodar o Frontend
Navegue para a pasta `frontend`. Instale as bibliotecas usando npm e suba o Vite Dev Server:
```powershell
cd frontend
npm install
npm run dev
```
O servidor de visualização abrirá em `http://localhost:5173`.

## 6. Rodar os Testes
Seu código precisa passar nos testes unitários e de integração antes de ser submetido via Pull Request.
Para validar as regras do backend, execute:
```powershell
cd backend
.\mvnw clean compile test
```
Para garantir que o TypeScript foi compilado corretamente no frontend:
```powershell
cd frontend
npm run build
```

## 7. Padrão de Branch e PR
- Faça as alterações num branch derivado da `master`. Padrão sugerido: `feature/nova-funcionalidade` ou `fix/correcao-bug`.
- Faça commits pequenos e descritivos.
- Ao abrir um PR (Pull Request), detalhe os arquivos afetados e certifique-se de que os workflows de CI (`Backend CI` e `Frontend CI`) rodaram com sucesso e retornaram status verde no GitHub.
- NUNCA envie arquivos temporários, senhas, `.env` ou pastas compiladas (`node_modules`, `target`, `dist`) no seu PR. Nossas regras de `.gitignore` já devem previnir isso por padrão.
