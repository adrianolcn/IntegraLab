UPDATE theory_lessons
SET
  glossary = (
    glossary::jsonb || $$[
      {
        "term": "Banco de Dados",
        "acronym": "",
        "definition": "A camada onde a aplicação persiste e consulta informações estruturadas de forma durável.",
        "importance": "Ajuda a separar a API da fonte real de dados, evitando confundir interface com armazenamento.",
        "example": "Uma tabela de produtos consultada depois que a API recebe GET /api/products/42.",
        "lessonContext": "Nesta aula, o banco de dados aparece como uma etapa possível do caminho entre a Request e a Response."
      }
    ]$$::jsonb
  )::text,
  glossary_en = (
    glossary_en::jsonb || $$[
      {
        "term": "Database",
        "acronym": "",
        "definition": "The layer where the application stores and queries structured information durably.",
        "importance": "It helps separate the API from the real data source, preventing confusion between interface and storage.",
        "example": "A products table queried after the API receives GET /api/products/42.",
        "lessonContext": "In this lesson, the database appears as a possible stage in the path between Request and Response."
      }
    ]$$::jsonb
  )::text
WHERE title = 'O que é uma API?';

UPDATE theory_lessons
SET
  glossary = (
    glossary::jsonb || $$[
      {
        "term": "POST",
        "acronym": "",
        "definition": "Método HTTP usado principalmente para criar recursos ou disparar operações que dependem de payload.",
        "importance": "É o verbo clássico para criação e uma das maiores fontes de confusão sobre idempotência.",
        "example": "POST /api/orders com um JSON no body.",
        "lessonContext": "Na aula de métodos, POST representa uma operação normalmente não idempotente."
      },
      {
        "term": "PUT",
        "acronym": "",
        "definition": "Método HTTP usado para substituir por completo o estado de um recurso conhecido.",
        "importance": "Ajuda a diferenciar atualização total de atualização parcial.",
        "example": "PUT /api/users/42 com o objeto completo do usuário.",
        "lessonContext": "Nesta aula, PUT aparece como método idempotente de substituição."
      },
      {
        "term": "PATCH",
        "acronym": "",
        "definition": "Método HTTP usado para alterar parcialmente um recurso já existente.",
        "importance": "Evita enviar o objeto inteiro quando apenas alguns campos precisam mudar.",
        "example": "PATCH /api/users/42 alterando apenas o campo city.",
        "lessonContext": "Na comparação com PUT, PATCH mostra a ideia de atualização parcial."
      },
      {
        "term": "DELETE",
        "acronym": "",
        "definition": "Método HTTP usado para remover um recurso existente.",
        "importance": "Completa o conjunto clássico de operações CRUD em APIs.",
        "example": "DELETE /api/users/42.",
        "lessonContext": "Nesta aula, DELETE aparece como método normalmente idempotente."
      },
      {
        "term": "API REST",
        "acronym": "",
        "definition": "Uma API que organiza recursos e interações seguindo convenções inspiradas em REST.",
        "importance": "Conecta o uso dos métodos HTTP a contratos mais previsíveis e consistentes.",
        "example": "Uma API que usa GET /users, POST /users e DELETE /users/42.",
        "lessonContext": "Serve de pano de fundo para explicar por que cada método HTTP possui uma semântica esperada."
      }
    ]$$::jsonb
  )::text,
  glossary_en = (
    glossary_en::jsonb || $$[
      {
        "term": "POST",
        "acronym": "",
        "definition": "HTTP method mainly used to create resources or trigger operations that depend on payloads.",
        "importance": "It is the classic creation verb and one of the biggest sources of confusion around idempotency.",
        "example": "POST /api/orders with a JSON body.",
        "lessonContext": "In the methods lesson, POST represents a typically non-idempotent operation."
      },
      {
        "term": "PUT",
        "acronym": "",
        "definition": "HTTP method used to fully replace the state of a known resource.",
        "importance": "It helps separate full update from partial update.",
        "example": "PUT /api/users/42 with the full user object.",
        "lessonContext": "In this lesson, PUT appears as an idempotent replacement method."
      },
      {
        "term": "PATCH",
        "acronym": "",
        "definition": "HTTP method used to partially change an existing resource.",
        "importance": "It avoids sending the entire object when only a few fields need to change.",
        "example": "PATCH /api/users/42 changing only the city field.",
        "lessonContext": "In the comparison with PUT, PATCH illustrates partial update."
      },
      {
        "term": "DELETE",
        "acronym": "",
        "definition": "HTTP method used to remove an existing resource.",
        "importance": "It completes the classic CRUD set in APIs.",
        "example": "DELETE /api/users/42.",
        "lessonContext": "In this lesson, DELETE appears as a typically idempotent method."
      },
      {
        "term": "REST API",
        "acronym": "",
        "definition": "An API that organizes resources and interactions around REST-inspired conventions.",
        "importance": "It connects HTTP methods to more predictable and consistent contracts.",
        "example": "An API using GET /users, POST /users, and DELETE /users/42.",
        "lessonContext": "It provides the backdrop for why each HTTP method has an expected semantic meaning."
      }
    ]$$::jsonb
  )::text
WHERE title = 'Métodos HTTP';

UPDATE theory_lessons
SET
  glossary = (
    glossary::jsonb || $$[
      {
        "term": "Content-Type",
        "acronym": "",
        "definition": "Header HTTP que informa ao servidor qual é o formato do corpo enviado.",
        "importance": "Sem ele, a API pode não saber como interpretar o payload corretamente.",
        "example": "Content-Type: application/json",
        "lessonContext": "Nesta aula, Content-Type explica por que um JSON correto ainda pode ser rejeitado."
      },
      {
        "term": "Authorization",
        "acronym": "",
        "definition": "Header usado para transportar credenciais ou tokens de acesso em uma requisição.",
        "importance": "Ele conecta identidade e permissão ao fluxo técnico da request.",
        "example": "Authorization: Bearer demo-token",
        "lessonContext": "Aparece nesta aula como o cabeçalho que abre portas em endpoints protegidos."
      },
      {
        "term": "Bearer Token",
        "acronym": "",
        "definition": "Token de acesso enviado no header Authorization com o prefixo Bearer.",
        "importance": "É a forma mais comum de autenticar requisições em APIs modernas.",
        "example": "Authorization: Bearer eyJhbGciOi...",
        "lessonContext": "Nesta aula, o Bearer Token mostra como headers podem carregar identidade além de formato."
      }
    ]$$::jsonb
  )::text,
  glossary_en = (
    glossary_en::jsonb || $$[
      {
        "term": "Content-Type",
        "acronym": "",
        "definition": "HTTP header that tells the server which format the sent body uses.",
        "importance": "Without it, the API may not know how to interpret the payload correctly.",
        "example": "Content-Type: application/json",
        "lessonContext": "In this lesson, Content-Type explains why correct JSON can still be rejected."
      },
      {
        "term": "Authorization",
        "acronym": "",
        "definition": "Header used to carry credentials or access tokens in a request.",
        "importance": "It connects identity and permission to the technical request flow.",
        "example": "Authorization: Bearer demo-token",
        "lessonContext": "It appears here as the header that opens doors on protected endpoints."
      },
      {
        "term": "Bearer Token",
        "acronym": "",
        "definition": "Access token sent in the Authorization header with the Bearer prefix.",
        "importance": "It is the most common way to authenticate requests in modern APIs.",
        "example": "Authorization: Bearer eyJhbGciOi...",
        "lessonContext": "In this lesson, the Bearer Token shows how headers can carry identity in addition to format."
      }
    ]$$::jsonb
  )::text
WHERE id = '44444444-4444-4444-4444-000000000004';

UPDATE theory_lessons
SET
  glossary = (
    glossary::jsonb || $$[
      {
        "term": "Autenticação",
        "acronym": "",
        "definition": "O processo de provar quem você é para que o sistema reconheça sua identidade.",
        "importance": "Sem autenticação, o servidor não consegue diferenciar visitantes legítimos de acessos anônimos.",
        "example": "Enviar email e senha para receber um token.",
        "lessonContext": "Nesta aula, autenticação é a primeira metade da jornada de acesso seguro."
      },
      {
        "term": "Credenciais",
        "acronym": "",
        "definition": "As informações usadas para provar identidade, como email e senha.",
        "importance": "São a matéria-prima da autenticação inicial.",
        "example": "Email e senha enviados em um POST /login.",
        "lessonContext": "A jornada começa quando as credenciais são enviadas ao servidor."
      },
      {
        "term": "Token",
        "acronym": "",
        "definition": "Um valor emitido pelo sistema para representar uma identidade autenticada em chamadas futuras.",
        "importance": "Evita reenviar senha em toda requisição protegida.",
        "example": "Um token recebido após login bem-sucedido.",
        "lessonContext": "Nesta aula, o token é a prova prática de que a autenticação já aconteceu."
      },
      {
        "term": "JWT",
        "acronym": "JSON Web Token",
        "definition": "Formato de token assinado digitalmente que carrega informações sobre identidade e validade.",
        "importance": "É um dos formatos mais comuns para autenticação stateless em APIs.",
        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "lessonContext": "Aparece como exemplo concreto de token que viaja no header Authorization."
      },
      {
        "term": "Sessão",
        "acronym": "",
        "definition": "O estado de continuidade entre cliente e sistema depois que a identidade foi reconhecida.",
        "importance": "Ajuda a entender por que o token representa uma sessão sem exigir senha a cada chamada.",
        "example": "Usuário logado navegando em rotas protegidas.",
        "lessonContext": "Nesta aula, a sessão é representada pelo token emitido após login."
      },
      {
        "term": "Endpoint protegido",
        "acronym": "",
        "definition": "Uma rota que exige autenticação ou permissão antes de liberar acesso.",
        "importance": "Mostra onde autenticação e autorização deixam de ser teoria e viram regra de entrada.",
        "example": "GET /secure ou GET /meus-pedidos.",
        "lessonContext": "É o tipo de rota usado no laboratório para demonstrar 401 e 403."
      }
    ]$$::jsonb
  )::text,
  glossary_en = (
    glossary_en::jsonb || $$[
      {
        "term": "Authentication",
        "acronym": "",
        "definition": "The process of proving who you are so the system can recognize your identity.",
        "importance": "Without authentication, the server cannot distinguish legitimate users from anonymous access.",
        "example": "Sending email and password to receive a token.",
        "lessonContext": "In this lesson, authentication is the first half of the secure access journey."
      },
      {
        "term": "Credentials",
        "acronym": "",
        "definition": "The information used to prove identity, such as email and password.",
        "importance": "They are the raw material for the initial authentication step.",
        "example": "Email and password sent in POST /login.",
        "lessonContext": "The journey begins when credentials are sent to the server."
      },
      {
        "term": "Token",
        "acronym": "",
        "definition": "A value issued by the system to represent an authenticated identity in future calls.",
        "importance": "It avoids resending the password on every protected request.",
        "example": "A token returned after a successful login.",
        "lessonContext": "In this lesson, the token is the practical proof that authentication already happened."
      },
      {
        "term": "JWT",
        "acronym": "JSON Web Token",
        "definition": "A digitally signed token format that carries identity and validity information.",
        "importance": "It is one of the most common formats for stateless authentication in APIs.",
        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "lessonContext": "It appears as a concrete example of a token traveling in the Authorization header."
      },
      {
        "term": "Session",
        "acronym": "",
        "definition": "The continuity state between client and system after identity has been recognized.",
        "importance": "It helps explain why the token represents a session without requiring a password on every call.",
        "example": "A logged-in user browsing protected routes.",
        "lessonContext": "In this lesson, the session is represented by the token issued after login."
      },
      {
        "term": "Protected endpoint",
        "acronym": "",
        "definition": "A route that requires authentication or permission before access is granted.",
        "importance": "It shows where authentication and authorization stop being theory and become an entry rule.",
        "example": "GET /secure or GET /my-orders.",
        "lessonContext": "It is the kind of route used in the lab to demonstrate 401 and 403."
      }
    ]$$::jsonb
  )::text
WHERE id = '44444444-4444-4444-4444-000000000006';

UPDATE theory_lessons
SET
  glossary = (
    glossary::jsonb || $$[
      {
        "term": "Debug",
        "acronym": "",
        "definition": "O processo de investigar evidências para descobrir por que uma integração ou funcionalidade falhou.",
        "importance": "Evita chute técnico e cria uma sequência confiável de diagnóstico.",
        "example": "Ler status code, body, headers e logs antes de mudar código.",
        "lessonContext": "Nesta aula, debug é tratado como um fluxo mental estruturado."
      },
      {
        "term": "422 Unprocessable Entity",
        "acronym": "",
        "definition": "Status indicando que a requisição está bem formada, mas viola uma regra de negócio.",
        "importance": "Ajuda a separar erro estrutural do payload de erro semântico da operação.",
        "example": "Transferir dinheiro de uma conta sem saldo suficiente.",
        "lessonContext": "Aparece no catálogo de triagem para diferenciar regras de negócio de erros 400."
      },
      {
        "term": "Logs",
        "acronym": "",
        "definition": "Registros textuais ou estruturados emitidos pelo sistema durante sua execução.",
        "importance": "São a trilha de evidências mais confiável para investigar erros reais de backend.",
        "example": "Um log com stacktrace e correlation ID após um erro 500.",
        "lessonContext": "Nesta aula, os logs representam a caixa-preta que ajuda a explicar falhas invisíveis na interface."
      }
    ]$$::jsonb
  )::text,
  glossary_en = (
    glossary_en::jsonb || $$[
      {
        "term": "Debug",
        "acronym": "",
        "definition": "The process of investigating evidence to discover why an integration or feature failed.",
        "importance": "It prevents technical guessing and creates a reliable diagnosis sequence.",
        "example": "Reading status code, body, headers, and logs before changing code.",
        "lessonContext": "In this lesson, debugging is treated as a structured mental flow."
      },
      {
        "term": "422 Unprocessable Entity",
        "acronym": "",
        "definition": "Status indicating that the request is well-formed but violates a business rule.",
        "importance": "It helps separate payload structure errors from semantic operation errors.",
        "example": "Trying to transfer money from an account without sufficient balance.",
        "lessonContext": "It appears in the triage catalog to distinguish business-rule failures from 400 errors."
      },
      {
        "term": "Logs",
        "acronym": "",
        "definition": "Textual or structured records emitted by the system during execution.",
        "importance": "They are the most reliable evidence trail for investigating real backend failures.",
        "example": "A log with stacktrace and correlation ID after a 500 error.",
        "lessonContext": "In this lesson, logs represent the black box that explains failures invisible from the interface."
      }
    ]$$::jsonb
  )::text
WHERE id = '44444444-4444-4444-4444-000000000007';
