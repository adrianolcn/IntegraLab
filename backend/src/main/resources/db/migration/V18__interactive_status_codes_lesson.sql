-- V18__interactive_status_codes_lesson.sql

UPDATE theory_lessons
SET content = '## O Dicionário da Web

O {{Status Code}} é um número de três dígitos que o {{Servidor}} retorna na {{Response}}, resumindo imediatamente o que aconteceu com a sua requisição.

Eles são divididos em famílias:
- **2xx (Sucesso)**: Tudo ocorreu bem.
- **3xx (Redirecionamento)**: O recurso mudou de lugar.
- **4xx (Erro do Cliente)**: Você fez algo errado.
- **5xx (Erro do Servidor)**: O servidor quebrou.

Sistemas modernos usam o Status Code para decidir a interface: se vem 200, exibe tela verde. Se vem 400, exibe um alerta vermelho para o {{Cliente}}.

[[STATUS_CODES_INTERACTIVE]]

## Quem resolve o problema?

Quando você recebe um erro, a primeira coisa a fazer é olhar o primeiro dígito do {{Status Code}}. Isso te diz imediatamente de quem é a culpa e quem deve agir.

[[WHO_NEEDS_TO_ACT]]

## Diagnóstico Rápido

Aqui está um mapa de diagnóstico prático para os cenários reais mais comuns que você vai enfrentar no dia a dia como desenvolvedor, seja no frontend ou no backend.

[[STATUS_DIAGNOSIS]]',

content_en = '## The Web Dictionary

The {{Status Code}} is a three-digit number the {{Servidor}} returns in the {{Response}}, immediately summarizing what happened to your request.

They are divided into families:
- **2xx (Success)**: Everything went well.
- **3xx (Redirection)**: The resource moved.
- **4xx (Client Error)**: You did something wrong.
- **5xx (Server Error)**: The server broke.

Modern systems use the Status Code to decide the interface: if 200 comes back, it displays a green screen. If 400 comes back, it displays a red alert for the {{Cliente}}.

[[STATUS_CODES_INTERACTIVE]]

## Who solves the problem?

When you receive an error, the first thing to do is look at the first digit of the {{Status Code}}. This tells you immediately whose fault it is and who should act.

[[WHO_NEEDS_TO_ACT]]

## Quick Diagnosis

Here is a practical diagnosis map for the most common real-world scenarios you will face daily as a developer, whether on the frontend or the backend.

[[STATUS_DIAGNOSIS]]',

glossary = '[
  {
    "term": "Status Code",
    "definition": "Código de três dígitos retornado pelo servidor em resposta a uma requisição HTTP.",
    "importance": "É a base universal para tratamento de erros na web. Bibliotecas modernas dependem disso para funcionar.",
    "example": "200 OK, 404 Not Found, 500 Internal Server Error.",
    "lessonContext": "É o assunto central desta aula, separando sucesso, erros do cliente e erros do servidor."
  },
  {
    "term": "Request",
    "definition": "A requisição HTTP enviada pelo cliente ao servidor.",
    "importance": "Contém todos os dados, headers e parâmetros para que o servidor saiba o que fazer.",
    "lessonContext": "Um 400 Bad Request indica que este objeto veio malformado do cliente."
  },
  {
    "term": "Response",
    "definition": "A resposta HTTP devolvida pelo servidor.",
    "importance": "Entrega o resultado da operação, contendo o Status Code crucial para a UI agir.",
    "lessonContext": "A aula inteira explica como ler os metadados dessa resposta para diagnosticar falhas."
  },
  {
    "term": "Cliente",
    "definition": "O software que inicia a comunicação, como um navegador Chrome, um App iOS, ou o Postman.",
    "importance": "O cliente dita o fluxo. Ele precisa tratar os erros que recebe para não travar a tela.",
    "lessonContext": "A família 4xx é oficialmente chamada de ''Erro do Cliente'', indicando falha na origem da chamada."
  },
  {
    "term": "Servidor",
    "definition": "O computador/software remoto que escuta requisições e processa regras de negócio.",
    "importance": "É o responsável por validar as regras e garantir a segurança dos dados.",
    "lessonContext": "A família 5xx é o ''Erro do Servidor'', indicando que o request chegou limpo, mas a máquina falhou internamente."
  },
  {
    "term": "Header",
    "definition": "Cabeçalho HTTP que transporta metadados (como idioma, tokens, ou tipo de arquivo).",
    "importance": "Onde a mágica invisível (como Autenticação e CORS) acontece.",
    "example": "Authorization: Bearer xyz123",
    "lessonContext": "Esquecer o token no Header é a causa número 1 de erros 401 Unauthorized."
  },
  {
    "term": "Body",
    "definition": "O corpo da mensagem HTTP, onde viajam os dados pesados (JSON, arquivos).",
    "importance": "É onde você manda os dados do formulário num POST.",
    "lessonContext": "Enviar um Body com aspas faltantes gera um erro 400 Bad Request instantâneo no parse."
  },
  {
    "term": "Autenticação",
    "definition": "O ato de provar QUEM você é para o sistema (ex: Login).",
    "importance": "Protege as contas de usuários de acessos anônimos.",
    "lessonContext": "Falhar na Autenticação (não mandar quem você é) gera o erro 401."
  },
  {
    "term": "Autorização",
    "definition": "O ato de verificar O QUE você tem permissão para fazer no sistema.",
    "importance": "Garante que o Usuário A não consiga deletar as fotos do Usuário B.",
    "lessonContext": "Falhar na Autorização (ter login, mas ser barrado na regra) gera o erro 403 Forbidden."
  },
  {
    "term": "Endpoint",
    "definition": "A combinação de uma URL e um Método HTTP.",
    "example": "GET /api/users",
    "lessonContext": "Bater no endpoint errado usando o Método errado aciona o diagnóstico 405 Method Not Allowed."
  },
  {
    "term": "Payload",
    "definition": "O conteúdo útil sendo transmitido, geralmente sinônimo do conteúdo do Body.",
    "lessonContext": "Um payload quebrado (JSON inválido) é o gatilho clássico do 400 Bad Request."
  },
  {
    "term": "Erro do Cliente",
    "definition": "Qualquer Status Code da casa dos 400.",
    "importance": "Aponta imediatamente que o desenvolvedor Front-end/Mobile deve revisar a chamada.",
    "lessonContext": "A aula ensina que a culpa e responsabilidade por resolver erros 4xx quase sempre recai sobre quem disparou a requisição."
  },
  {
    "term": "Erro do Servidor",
    "definition": "Qualquer Status Code da casa dos 500.",
    "importance": "Aponta imediatamente que os logs do Backend devem ser inspecionados (falha de banco, timeout, exceções de código).",
    "lessonContext": "A aula reforça que diante de um erro 5xx, o Cliente não pode fazer nada além de exibir ''Tente novamente mais tarde''."
  },
  {
    "term": "JSON",
    "acronym": "JavaScript Object Notation",
    "definition": "Formato universal e leve para troca de dados entre sistemas.",
    "example": "{ \"id\": 1 }",
    "lessonContext": "A grande maioria das APIs usa JSON, e errar sua formatação resulta no diagnóstico de erro 400 abordado na aula."
  },
  {
    "term": "Token",
    "definition": "Uma string criptografada que serve como um ''crachá digital'' provando que você está logado.",
    "importance": "Evita que você tenha que mandar sua senha em toda requisição HTTP.",
    "lessonContext": "Deixar de enviar o Token é a causa do 401 Unauthorized."
  }
]',

glossary_en = '[
  {
    "term": "Status Code",
    "definition": "A three-digit code returned by the server in response to an HTTP request.",
    "importance": "It is the universal basis for error handling on the web. Modern libraries rely on it to function.",
    "example": "200 OK, 404 Not Found, 500 Internal Server Error.",
    "lessonContext": "It is the central topic of this lesson, separating success, client errors, and server errors."
  },
  {
    "term": "Request",
    "definition": "The HTTP request sent by the client to the server.",
    "importance": "Contains all data, headers, and parameters so the server knows what to do.",
    "lessonContext": "A 400 Bad Request indicates that this object came malformed from the client."
  },
  {
    "term": "Response",
    "definition": "The HTTP response returned by the server.",
    "importance": "Delivers the result of the operation, containing the crucial Status Code for the UI to act upon.",
    "lessonContext": "The entire lesson explains how to read the metadata of this response to diagnose failures."
  },
  {
    "term": "Cliente",
    "definition": "The software that initiates communication, like a Chrome browser, an iOS App, or Postman.",
    "importance": "The client dictates the flow. It must handle the errors it receives so as not to crash the screen.",
    "lessonContext": "The 4xx family is officially called ''Client Error'', indicating a failure at the origin of the call."
  },
  {
    "term": "Servidor",
    "definition": "The remote computer/software that listens for requests and processes business rules.",
    "importance": "It is responsible for validating rules and ensuring data security.",
    "lessonContext": "The 5xx family is the ''Server Error'', indicating the request arrived clean, but the machine failed internally."
  },
  {
    "term": "Header",
    "definition": "HTTP header that carries metadata (like language, tokens, or file type).",
    "importance": "Where invisible magic (like Authentication and CORS) happens.",
    "example": "Authorization: Bearer xyz123",
    "lessonContext": "Forgetting the token in the Header is the number 1 cause of 401 Unauthorized errors."
  },
  {
    "term": "Body",
    "definition": "The body of the HTTP message, where heavy data (JSON, files) travels.",
    "importance": "This is where you send form data in a POST.",
    "lessonContext": "Sending a Body with missing quotes generates an instant 400 Bad Request parsing error."
  },
  {
    "term": "Autenticação",
    "definition": "The act of proving WHO you are to the system (e.g., Login).",
    "importance": "Protects user accounts from anonymous access.",
    "lessonContext": "Failing Authentication (not sending who you are) generates the 401 error."
  },
  {
    "term": "Autorização",
    "definition": "The act of verifying WHAT you have permission to do in the system.",
    "importance": "Ensures that User A cannot delete User B''s photos.",
    "lessonContext": "Failing Authorization (being logged in but blocked by rules) generates the 403 Forbidden error."
  },
  {
    "term": "Endpoint",
    "definition": "The combination of a URL and an HTTP Method.",
    "example": "GET /api/users",
    "lessonContext": "Hitting the wrong endpoint using the wrong Method triggers the 405 Method Not Allowed diagnosis."
  },
  {
    "term": "Payload",
    "definition": "The useful content being transmitted, usually synonymous with the Body content.",
    "lessonContext": "A broken payload (invalid JSON) is the classic trigger for the 400 Bad Request."
  },
  {
    "term": "Erro do Cliente",
    "definition": "Any Status Code in the 400s.",
    "importance": "Immediately points out that the Front-end/Mobile developer should review the call.",
    "lessonContext": "The lesson teaches that the blame and responsibility for resolving 4xx errors almost always falls on the one who fired the request."
  },
  {
    "term": "Erro do Servidor",
    "definition": "Any Status Code in the 500s.",
    "importance": "Immediately points out that Backend logs must be inspected (db failure, timeout, code exceptions).",
    "lessonContext": "The lesson reinforces that in the face of a 5xx error, the Client can do nothing but display ''Try again later''."
  },
  {
    "term": "JSON",
    "acronym": "JavaScript Object Notation",
    "definition": "Universal and lightweight data exchange format between systems.",
    "example": "{ \"id\": 1 }",
    "lessonContext": "The vast majority of APIs use JSON, and making formatting mistakes results in the 400 error diagnosis covered in the lesson."
  },
  {
    "term": "Token",
    "definition": "An encrypted string that serves as a ''digital badge'' proving you are logged in.",
    "importance": "Prevents you from having to send your password on every HTTP request.",
    "lessonContext": "Failing to send the Token is the cause of 401 Unauthorized."
  }
]',

mini_quiz = '[
  {
    "question": "Um usuário tenta deletar a conta de administrador do sistema. Ele está logado validamente no aplicativo (enviou o token correto), mas seu nível de acesso é apenas ''Aluno''. Qual Status Code a API deve retornar para indicar a falha?",
    "options": [
      "401 Unauthorized, pois ele não está autenticado como administrador.",
      "403 Forbidden, pois a identidade dele é conhecida, mas a regra de negócio o proíbe de realizar aquela ação.",
      "500 Internal Server Error, para forçar o fechamento da conexão do usuário malicioso."
    ],
    "correctIndex": 1,
    "explanation": "O 401 sinaliza falta de identidade (quem é você?). O 403 sinaliza falta de permissão (eu sei quem você é, e você não pode fazer isso). Neste caso, ele tem token de aluno, portanto a identidade é conhecida."
  },
  {
    "question": "O frontend envia um JSON para criar um novo usuário. A sintaxe das aspas está perfeita e a API consegue ler os dados (portanto não é um Bad Request). Porém, a senha enviada tem apenas 3 caracteres e a API exige 8. Qual o melhor código para rejeitar isso?",
    "options": [
      "400 Bad Request, porque a requisição foi feita de forma equivocada.",
      "422 Unprocessable Entity, porque a estrutura estava legível, mas a entidade de negócio violou uma validação interna.",
      "409 Conflict, porque a senha entrou em conflito com o banco de dados."
    ],
    "correctIndex": 1,
    "explanation": "Embora algumas APIs mais preguiçosas usem 400 para tudo, o 422 é o padrão ouro semântico (Unprocessable Entity) para falhas de validação em que o JSON é válido, mas os valores ferem a lógica de negócios."
  },
  {
    "question": "Um aplicativo de e-commerce mostra um alerta para o usuário: ''Erro interno, por favor tente de novo em alguns minutos''. Se abrirmos o console do desenvolvedor, qual família de Status Code provavelmente veremos na aba de rede?",
    "options": [
      "4xx, pois o aplicativo não conseguiu se conectar à internet do usuário.",
      "5xx, pois o erro é responsabilidade do servidor, indicando que o banco de dados pode estar fora do ar ou ocorreu uma falha de código no backend.",
      "3xx, pois o servidor redirecionou a falha."
    ],
    "correctIndex": 1,
    "explanation": "A família 5xx é universalmente usada para falhas sistêmicas (Erro do Servidor). O frontend captura isso e, de forma elegante, traduz para uma mensagem amigável ao usuário final."
  },
  {
    "question": "Ao tentar deletar um usuário via POST /users/delete, a API retorna um 404 Not Found. O desenvolvedor confirma no banco de dados que o usuário realmente existe! Por que o 404 ocorreu?",
    "options": [
      "Porque o servidor caiu e não conseguiu encontrar a tabela do usuário.",
      "Porque a rota /users/delete não foi mapeada pelo backend, e o 404 significa literalmente ''Rota não encontrada'', independente do dado existir no banco.",
      "Porque métodos POST geram erro 404 automaticamente."
    ],
    "correctIndex": 1,
    "explanation": "Um erro 404 significa que o endpoint em si (URL + Verbo) não existe no roteador do Backend. Não confunda com o dado estar faltando no banco; bater em uma URL errada também gera 404."
  }
]',

mini_quiz_en = '[
  {
    "question": "A user tries to delete the system administrator account. They are validly logged into the application (sent the correct token), but their access level is only ''Student''. Which Status Code should the API return to indicate the failure?",
    "options": [
      "401 Unauthorized, because he is not authenticated as an administrator.",
      "403 Forbidden, because his identity is known, but the business rule prohibits him from performing that action.",
      "500 Internal Server Error, to force the malicious user''s connection to close."
    ],
    "correctIndex": 1,
    "explanation": "401 signals lack of identity (who are you?). 403 signals lack of permission (I know who you are, and you can''t do this). In this case, he has a student token, so the identity is known."
  },
  {
    "question": "The frontend sends a JSON to create a new user. The quote syntax is perfect and the API can read the data (so it is not a Bad Request). However, the password sent has only 3 characters and the API requires 8. What is the best code to reject this?",
    "options": [
      "400 Bad Request, because the request was made incorrectly.",
      "422 Unprocessable Entity, because the structure was readable, but the business entity violated an internal validation.",
      "409 Conflict, because the password conflicted with the database."
    ],
    "correctIndex": 1,
    "explanation": "Although some lazy APIs use 400 for everything, 422 is the semantic gold standard (Unprocessable Entity) for validation failures where the JSON is valid, but the values violate business logic."
  },
  {
    "question": "An e-commerce application shows an alert to the user: ''Internal error, please try again in a few minutes''. If we open the developer console, which family of Status Code will we probably see in the network tab?",
    "options": [
      "4xx, because the application could not connect to the user''s internet.",
      "5xx, because the error is the server''s responsibility, indicating that the database may be down or a code failure occurred in the backend.",
      "3xx, because the server redirected the failure."
    ],
    "correctIndex": 1,
    "explanation": "The 5xx family is universally used for systemic failures (Server Error). The frontend captures this and elegantly translates it into a user-friendly message."
  },
  {
    "question": "When trying to delete a user via POST /users/delete, the API returns a 404 Not Found. The developer confirms in the database that the user actually exists! Why did the 404 occur?",
    "options": [
      "Because the server crashed and could not find the user table.",
      "Because the /users/delete route was not mapped by the backend, and 404 literally means ''Route not found'', regardless of whether the data exists in the database.",
      "Because POST methods generate 404 errors automatically."
    ],
    "correctIndex": 1,
    "explanation": "A 404 error means that the endpoint itself (URL + Verb) does not exist in the Backend router. Don''t confuse this with the data missing from the DB; hitting a wrong URL also generates 404."
  }
]'

WHERE id = '44444444-4444-4444-4444-000000000005';
