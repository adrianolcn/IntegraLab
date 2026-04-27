-- V21__interactive_debug_errors_lesson.sql

UPDATE theory_lessons
SET content = '## A Mentalidade de Debug

Como desenvolvedor ou profissional de suporte técnico, bater de frente com uma tela vermelha ou um JSON estourado é a sua rotina. Um bom profissional não chuta a solução; ele aplica uma ordem lógica de investigação.

Acompanhe passo a passo como o fluxo mental do {{Debug}} acontece na prática, desde identificar o primeiro sinal de erro até formular uma hipótese estruturada.

[[DEBUG_FLOW]]

## Onde o Erro Pode Estar Escondido?

É fácil se perder num mar de código quando a requisição não funciona. Volte sempre ao básico. Use a Request abaixo para localizar de onde vêm os principais pontos de falha:

[[REQUEST_INSPECTOR]]

## Checklist de Suporte

Antes de afirmar que a API "está quebrada", cruze a sua chamada com este checklist. Noventa por cento das vezes, você cometeu um erro que deixou passar.

[[DEBUG_CHECKLIST]]

## Catálogo Rápido de Erros (Triage)

Decorar o significado exato de um {{415 Unsupported Media Type}} comparado com um {{422 Unprocessable Entity}} ou {{400 Bad Request}} salva horas do seu dia. Use os cards abaixo para fazer a triagem rápida dos maiores pesadelos dos integradores.

[[ERROR_TRIAGE]]

## A Caixa Preta do Backend: Logs

Quando tudo do lado do Cliente (4xx) parece estar certo, ou quando você encara de frente um terrível {{500 Internal Server Error}}, não existe como adivinhar o que falhou sem abrir os {{Logs}} do servidor. Veja por que ferramentas de rastreabilidade são fundamentais em produção.

[[LOG_INSPECTOR]]',

content_en = '## The Debugging Mindset

As a developer or technical support professional, hitting a red screen or a broken JSON is your routine. A good professional does not guess the solution; they apply a logical order of investigation.

Follow step by step how the mental flow of {{Debug}} happens in practice, from identifying the first sign of an error to formulating a structured hypothesis.

[[DEBUG_FLOW]]

## Where Could the Error Be Hiding?

It''s easy to get lost in a sea of code when the request doesn''t work. Always go back to the basics. Use the Request below to locate where the main points of failure come from:

[[REQUEST_INSPECTOR]]

## Support Checklist

Before claiming that the API "is broken", cross-check your call with this checklist. Ninety percent of the time, you made a mistake that you overlooked.

[[DEBUG_CHECKLIST]]

## Quick Error Catalog (Triage)

Memorizing the exact meaning of a {{415 Unsupported Media Type}} compared to a {{422 Unprocessable Entity}} or {{400 Bad Request}} saves hours of your day. Use the cards below to quickly triage the biggest nightmares of integrators.

[[ERROR_TRIAGE]]

## The Backend Black Box: Logs

When everything on the Client side (4xx) seems right, or when you face a terrible {{500 Internal Server Error}} head-on, there is no way to guess what failed without opening the server {{Logs}}. See why traceability tools are fundamental in production.

[[LOG_INSPECTOR]]',

glossary = '[
  { "term": "Debug", "definition": "Processo sistemático de identificar e remover erros de código ou de integração em sistemas de software.", "importance": "Sem uma mentalidade forte de debug, a resolução de problemas fica dependente de sorte, alongando infinitamente o tempo de downtime.", "lessonContext": "Esta aula inteira foca na mentalidade de Debug usando um fluxo cronológico de 11 passos no painel interativo." },
  { "term": "Status Code", "definition": "Número retornando no cabeçalho HTTP sumarizando o resultado.", "lessonContext": "Definido no DebugFlowPlayer como o ''Passo 1'' de qualquer investigação." },
  { "term": "Request", "definition": "A requisição enviada pelo cliente ao servidor.", "lessonContext": "Analisada peça por peça no RequestInspector para encontrar erros de método, body e cabeçalhos." },
  { "term": "Response", "definition": "A devolução enviada pelo servidor ao cliente.", "lessonContext": "Mencionada como o local primordial onde o desenvolvedor deve procurar a mensagem de erro que explica o Status Code." },
  { "term": "Header", "definition": "Metadados de configuração de uma requisição ou resposta HTTP.", "lessonContext": "Listado no checklist como o lugar onde Auth e Content-Type podem quebrar uma chamada." },
  { "term": "Body", "definition": "O corpo de dados trafegado entre sistemas.", "lessonContext": "Investigado pelo suporte como a maior fonte de erros de formatação JSON." },
  { "term": "Payload", "definition": "Carga útil de dados transportada pelo Body.", "lessonContext": "Seu formato incorreto engatilha diretamente o erro 400 Bad Request." },
  { "term": "Endpoint", "definition": "URL exata com um verbo HTTP onde o servidor escuta requisições.", "lessonContext": "Mostrado no checklist: bater no endpoint errado resulta em 404 cego." },
  { "term": "Path", "definition": "O caminho final da URL após o domínio base.", "lessonContext": "Destacado no RequestInspector como causador do 404 se tiver typo." },
  { "term": "Query Params", "definition": "Parâmetros opcionais adicionados no final da URL com ? e & para filtrar recursos.", "lessonContext": "Revisado como um causador frequente de mal-entendidos nas buscas e ordenações." },
  { "term": "Método HTTP", "definition": "O verbo (ex: GET, POST) da requisição.", "lessonContext": "Quando incorreto na documentação, causa um 405 Method Not Allowed." },
  { "term": "Content-Type", "definition": "Header que define em que formato o corpo (Payload) está escrito.", "lessonContext": "Quando esquecido, faz com que a API se recuse a ler um JSON, gerando 415." },
  { "term": "Authorization", "definition": "Header principal de trânsito de credenciais.", "lessonContext": "Se o token no Authorization for ignorado, o sistema devolverá 401 Unauthorized." },
  { "term": "Bearer Token", "definition": "Token de acesso transmitido sob o padrão Bearer.", "lessonContext": "Sua ausência é descrita no checklist de investigação de permissões." },
  { "term": "JSON", "definition": "Notação estruturada de objeto JavaScript em texto simples.", "lessonContext": "Principal vitima de erros 400 (virgulas soltas, falta de aspas)." },
  { "term": "Log", "definition": "Registros históricos gravados nos bastidores do servidor, relatando todo o processamento de requisições.", "importance": "Sem eles, erros invisíveis ao usuário (como um banco de dados inoperante) jamais poderiam ser rastreados e corrigidos.", "lessonContext": "Abordados no LogInspector como a única maneira de investigar erros 500." },
  { "term": "Correlation ID", "definition": "Um protocolo que amarra um identificador único a cada requisição HTTP e o repassa por todos os microsserviços.", "importance": "Permite que um analista cole esse ID na barra de busca do Elasticsearch e veja somente as trilhas daquela falha no meio de 10 mil outros requests.", "lessonContext": "Revelado no painel de Logs como a chave de ouro entre o Front e o Backend." },
  { "term": "Erro do Cliente", "definition": "Falhas sinalizadas pela família 4xx, indicando que a pessoa enviando a requisição cometeu um erro de sintaxe, permissão ou documentação.", "lessonContext": "Diferenciado exaustivamente no checklist; se é 4xx, pare de culpar o servidor." },
  { "term": "Erro do Servidor", "definition": "Falhas sinalizadas pela família 5xx, indicando que o desenvolvedor enviou a chamada corretamente, mas a máquina quebrou.", "lessonContext": "Se é 5xx, o frontend não tem o que fazer a não ser buscar os logs." },
  { "term": "400 Bad Request", "definition": "Erro de cliente informando sintaxe lixo ou JSON mal formado.", "lessonContext": "O ErrorTriageCards o define como o principal erro ao se esquecer aspas num json." },
  { "term": "401 Unauthorized", "definition": "Erro de cliente por falta de identidade/autenticação válida.", "lessonContext": "Mapeado no diagnóstico como ausência/expiração do Bearer Token." },
  { "term": "403 Forbidden", "definition": "Erro de cliente por falta de autorização de role.", "lessonContext": "Explicado como quando o token é válido mas o escopo do usuário não pode acessar tal endpoint." },
  { "term": "404 Not Found", "definition": "Erro de cliente por não encontrar recurso ou endpoint no caminho exato solicitado.", "lessonContext": "Ensinado como erro que engloba tanto uma URL digitada errada quanto um ID apagado." },
  { "term": "405 Method Not Allowed", "definition": "Erro de cliente ao cruzar um Path que existe mas usando um Método inválido.", "lessonContext": "Mostrado no painel quando se aciona GET ao invés de POST para criação." },
  { "term": "409 Conflict", "definition": "Erro de cliente quando a ação conflita diretamente com o banco (ex: email duplicado).", "lessonContext": "No triage, orienta o programador a retornar uma mensagem legível pro usuário final." },
  { "term": "415 Unsupported Media Type", "definition": "Erro de cliente por rejeição do Payload baseada na falta ou equívoco no header de Content Type.", "lessonContext": "Enfatizado no RequestInspector como penalidade por ignorar cabeçalhos." },
  { "term": "422 Unprocessable Entity", "definition": "Erro de cliente, onde o JSON é sintaticamente correto, mas a semântica/regras ferem a API.", "lessonContext": "O painel contrasta o 422 com o 400. 422 = Erro de negócio (Ex: pagar conta negativa)." },
  { "term": "500 Internal Server Error", "definition": "Erro genérico informando pane catastrófica no lado da máquina ou banco do servidor.", "lessonContext": "Sinal verde para o programador abrir os logs com seu Correlation ID." }
]',

glossary_en = '[
  { "term": "Debug", "definition": "Systematic process of identifying and removing code or integration errors in software systems.", "importance": "Without a strong debugging mindset, problem resolution relies on luck, infinitely extending downtime.", "lessonContext": "This entire lesson focuses on the Debug mindset using a chronological 11-step flow in the interactive panel." },
  { "term": "Status Code", "definition": "Number returning in the HTTP header summarizing the result.", "lessonContext": "Defined in the DebugFlowPlayer as ''Step 1'' of any investigation." },
  { "term": "Request", "definition": "The request sent by the client to the server.", "lessonContext": "Analyzed piece by piece in the RequestInspector to find method, body, and header errors." },
  { "term": "Response", "definition": "The return sent by the server to the client.", "lessonContext": "Mentioned as the primary place where the developer should look for the error message that explains the Status Code." },
  { "term": "Header", "definition": "Configuration metadata of an HTTP request or response.", "lessonContext": "Listed in the checklist as the place where Auth and Content-Type can break a call." },
  { "term": "Body", "definition": "The body of data trafficked between systems.", "lessonContext": "Investigated by support as the largest source of JSON formatting errors." },
  { "term": "Payload", "definition": "Useful data load carried by the Body.", "lessonContext": "Its incorrect format directly triggers the 400 Bad Request error." },
  { "term": "Endpoint", "definition": "Exact URL with an HTTP verb where the server listens for requests.", "lessonContext": "Shown in the checklist: hitting the wrong endpoint results in a blind 404." },
  { "term": "Path", "definition": "The final path of the URL after the base domain.", "lessonContext": "Highlighted in the RequestInspector as causing 404 if there is a typo." },
  { "term": "Query Params", "definition": "Optional parameters appended at the end of the URL with ? and & to filter resources.", "lessonContext": "Reviewed as a frequent cause of misunderstandings in searches and sorting." },
  { "term": "Método HTTP", "definition": "The verb (e.g., GET, POST) of the request.", "lessonContext": "When incorrect in the documentation, it causes a 405 Method Not Allowed." },
  { "term": "Content-Type", "definition": "Header that defines what format the body (Payload) is written in.", "lessonContext": "When forgotten, it causes the API to refuse to read a JSON, generating 415." },
  { "term": "Authorization", "definition": "Main header for credential transit.", "lessonContext": "If the token in Authorization is ignored, the system will return 401 Unauthorized." },
  { "term": "Bearer Token", "definition": "Access token transmitted under the Bearer standard.", "lessonContext": "Its absence is described in the permissions investigation checklist." },
  { "term": "JSON", "definition": "Structured JavaScript object notation in plain text.", "lessonContext": "Main victim of 400 errors (loose commas, missing quotes)." },
  { "term": "Log", "definition": "Historical records written behind the server scenes, reporting all request processing.", "importance": "Without them, errors invisible to the user (like an inoperative database) could never be tracked and fixed.", "lessonContext": "Covered in the LogInspector as the only way to investigate 500 errors." },
  { "term": "Correlation ID", "definition": "A protocol that ties a unique identifier to each HTTP request and passes it through all microservices.", "importance": "Allows an analyst to paste this ID into the Elasticsearch search bar and see only the trails of that failure among 10,000 other requests.", "lessonContext": "Revealed in the Logs panel as the golden key between Front and Backend." },
  { "term": "Erro do Cliente", "definition": "Failures signaled by the 4xx family, indicating that the person sending the request made a syntax, permission, or documentation error.", "lessonContext": "Exhaustively differentiated in the checklist; if it is 4xx, stop blaming the server." },
  { "term": "Erro do Servidor", "definition": "Failures signaled by the 5xx family, indicating that the developer sent the call correctly, but the machine broke.", "lessonContext": "If it is 5xx, the frontend has nothing to do but look at the logs." },
  { "term": "400 Bad Request", "definition": "Client error indicating garbage syntax or malformed JSON.", "lessonContext": "The ErrorTriageCards defines it as the main error when forgetting quotes in a json." },
  { "term": "401 Unauthorized", "definition": "Client error due to lack of valid identity/authentication.", "lessonContext": "Mapped in the diagnostic as absence/expiration of the Bearer Token." },
  { "term": "403 Forbidden", "definition": "Client error due to lack of role authorization.", "lessonContext": "Explained as when the token is valid but the user''s scope cannot access such an endpoint." },
  { "term": "404 Not Found", "definition": "Client error for not finding a resource or endpoint in the exact path requested.", "lessonContext": "Taught as an error that encompasses both a mistyped URL and a deleted ID." },
  { "term": "405 Method Not Allowed", "definition": "Client error when crossing a Path that exists but using an invalid Method.", "lessonContext": "Shown in the panel when GET is triggered instead of POST for creation." },
  { "term": "409 Conflict", "definition": "Client error when the action conflicts directly with the database (e.g., duplicated email).", "lessonContext": "In triage, guides the programmer to return a readable message to the final user." },
  { "term": "415 Unsupported Media Type", "definition": "Client error by rejection of Payload based on the lack or mistake in the Content Type header.", "lessonContext": "Emphasized in the RequestInspector as a penalty for ignoring headers." },
  { "term": "422 Unprocessable Entity", "definition": "Client error where the JSON is syntactically correct, but semantics/rules violate the API.", "lessonContext": "The panel contrasts 422 with 400. 422 = Business error (E.g., paying a negative bill)." },
  { "term": "500 Internal Server Error", "definition": "Generic error informing a catastrophic failure on the machine or server database side.", "lessonContext": "Green light for the programmer to open the logs with their Correlation ID." }
]',

mini_quiz = '[
  {
    "question": "Um desenvolvedor de integração reporta o seguinte problema: \"Estou enviando exatamente o JSON da documentação para cadastrar um usuário em POST /api/users, mas a API retorna 404 Not Found.\" O que deve ser verificado PRIMEIRO com base na mentalidade de Debug?",
    "options": [
      "Verificar os logs do servidor para descobrir qual erro de SQL ou falha de conexão com o banco o JSON causou.",
      "Verificar se o token Bearer expirou, já que 404 é um problema de segurança oculto.",
      "Conferir minunciosamente o caminho (Path) da URL e a versão da API. O 404 dita que o endpoint digitado pelo desenvolvedor não existe no roteador do backend."
    ],
    "correctIndex": 2,
    "explanation": "A ordem do debug deve sempre seguir o Status Code. O código 404 é absoluto: a requisição nem chegou na lógica de criação de usuário; ela se perdeu na porta, pois o endereço está incorreto."
  },
  {
    "question": "O seu front-end disparou uma requisição com um Body perfeito, headers de Authorization impecáveis e Content-Type configurados, mas o servidor respondeu com 500 Internal Server Error. O que o time de Front-end deve fazer imediatamente?",
    "options": [
      "Continuar modificando o formato do JSON enviado e testar em loop até o código retornar 200.",
      "Adicionar mais Headers na chamada para forçar a API a aceitar os dados e não dar erro interno.",
      "Recolher o Correlation ID (se disponível) ou a hora exata da chamada e encaminhar ao time de Backend. Um 500 garante que a culpa é do servidor (Null Pointer, Falta de conexão DB, Disco Cheio) e o front-end não tem ação direta sobre isso."
    ],
    "correctIndex": 2,
    "explanation": "Códigos 5xx indicam categoricamente falhas que transbordaram a capacidade da API de lidar com elas de forma controlada. Ficar alterando o request num cenário 500 é um desperdício imenso de tempo de debug."
  },
  {
    "question": "Ao ler uma Response Body, você nota que a API rejeitou a criação de um pedido (POST) e retornou a mensagem {\"error\": \"O saldo do cartão é insuficiente\"}. Isso quer dizer que o JSON estava preenchido, era válido e legível. Qual Status Code apropriado o servidor deveria ter mandado junto?",
    "options": [
      "400 Bad Request, afinal a requisição é ruim de qualquer forma.",
      "422 Unprocessable Entity, porque a sintaxe é aprovada, mas semanticamente fere uma regra de negócio complexa (saldo).",
      "500 Internal Server Error, afinal o pedido de dinheiro causou um problema fatal."
    ],
    "correctIndex": 1,
    "explanation": "Se o servidor conseguiu ler os campos e aplicar sua lógica avançada (validação de banco e terceiros) e mesmo assim não completou a tarefa, o 422 é o padrão moderno preferido pelas APIS REST para diferenciar regras de negócio de meros erros de chaves esquecidas em JSON."
  },
  {
    "question": "Se um erro acontece em produção com milhares de usuários acessando ao mesmo tempo, como o Correlation ID ajuda o suporte a debugar?",
    "options": [
      "Ele criptografa os logs para que apenas analistas com o ID possam lê-los, protegendo a LGPD.",
      "Ele é uma string como ''req-1A2B'' carimbada exclusivamente nesta requisição falha do momento em que entra até sair, permitindo ao analista filtrar e isolar a trilha de logs no meio de todo o barulho do sistema.",
      "Ele força a API a re-executar a requisição sozinha para tentar novamente sem precisar do cliente."
    ],
    "correctIndex": 1,
    "explanation": "Essa é a exata definição de Rastreabilidade. Sem uma etiqueta amarrando os logs gerados pelo Microserviço A e Microserviço B de um mesmo clique, investigar sistemas complexos se torna procurar uma agulha no palheiro."
  }
]',

mini_quiz_en = '[
  {
    "question": "An integration developer reports the following issue: \"I am sending exactly the JSON from the documentation to register a user on POST /api/users, but the API returns 404 Not Found.\" What should be checked FIRST based on the Debug mindset?",
    "options": [
      "Check the server logs to find out which SQL error or DB connection failure the JSON caused.",
      "Check if the Bearer token expired, since 404 is a hidden security issue.",
      "Carefully check the URL path and the API version. 404 dictates that the endpoint typed by the developer does not exist in the backend router."
    ],
    "correctIndex": 2,
    "explanation": "The order of debugging should always follow the Status Code. The 404 code is absolute: the request didn''t even reach the user creation logic; it got lost at the door because the address is incorrect."
  },
  {
    "question": "Your front-end fired a request with a perfect Body, impeccable Authorization headers and configured Content-Type, but the server responded with 500 Internal Server Error. What should the Front-end team do immediately?",
    "options": [
      "Continue modifying the format of the sent JSON and test in a loop until the code returns 200.",
      "Add more Headers in the call to force the API to accept the data and not give an internal error.",
      "Collect the Correlation ID (if available) or the exact time of the call and forward it to the Backend team. A 500 guarantees that the fault is the server''s (Null Pointer, No DB connection, Full Disk) and the front-end has no direct action on this."
    ],
    "correctIndex": 2,
    "explanation": "5xx codes categorically indicate failures that overflowed the API''s ability to handle them in a controlled manner. Keeping altering the request in a 500 scenario is a huge waste of debugging time."
  },
  {
    "question": "When reading a Response Body, you notice that the API rejected the creation of an order (POST) and returned the message {\"error\": \"Card balance is insufficient\"}. This means that the JSON was filled, valid and readable. What appropriate Status Code should the server have sent along?",
    "options": [
      "400 Bad Request, after all the request is bad anyway.",
      "422 Unprocessable Entity, because the syntax is approved, but semantically violates a complex business rule (balance).",
      "500 Internal Server Error, after all the request for money caused a fatal problem."
    ],
    "correctIndex": 1,
    "explanation": "If the server managed to read the fields and apply its advanced logic (database and third-party validation) and still didn''t complete the task, 422 is the modern standard preferred by REST APIs to differentiate business rules from mere missed keys in JSON."
  },
  {
    "question": "If an error happens in production with thousands of users accessing at the same time, how does the Correlation ID help support debug?",
    "options": [
      "It encrypts the logs so only analysts with the ID can read them, protecting privacy laws.",
      "It is a string like ''req-1A2B'' stamped exclusively on this failed request from the moment it enters until it leaves, allowing the analyst to filter and isolate the log trail amidst all the system noise.",
      "It forces the API to re-execute the request alone to try again without needing the client."
    ],
    "correctIndex": 1,
    "explanation": "This is the exact definition of Traceability. Without a tag tying together the logs generated by Microservice A and Microservice B from the same click, investigating complex systems becomes searching for a needle in a haystack."
  }
]'

WHERE id = '44444444-4444-4444-4444-000000000007';
