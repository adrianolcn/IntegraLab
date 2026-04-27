-- V14__interactive_http_methods_lesson.sql

UPDATE theory_lessons
SET content = '## A Ação por trás da Requisição

Até agora, sabemos que a **{{API}}** é uma ponte de comunicação. Mas como o servidor sabe se você quer apenas **ler** um dado, ou se quer **criar** um novo registro?

No protocolo HTTP, isso é definido pelo **Método** (também conhecido como Verbo HTTP). O método é a primeira palavra de um {{Request}} e ele dita exatamente qual é a intenção da operação.

Os métodos mais comuns formam o famoso padrão **CRUD** (Create, Read, Update, Delete). Mas o segredo para construir e consumir APIs excelentes é entender como esses métodos se comportam, especialmente quando falamos de um conceito fundamental: a **{{Idempotência}}**.

## O poder da Idempotência

>> Um método é considerado **idempotente** quando a primeira chamada altera o estado do sistema, mas repeti-la 10, 100 ou 1000 vezes seguidas produzirá **exatamente o mesmo resultado**, sem efeitos colaterais extras.

Pense em um interruptor de luz. Se você apertar "Ligar" e a luz acender (primeira chamada), e depois continuar apertando "Ligar" repetidamente, a luz continuará apenas acesa. O estado final é o mesmo. Isso é idempotência.

Agora, pense em um botão de "Adicionar R$ 10 à conta". Se você apertar 5 vezes, terá R$ 50. O estado mudou a cada chamada. Isso **não** é idempotente.

- O **{{GET}}** é idempotente (apenas lê).
- O **{{PUT}}** é idempotente (substitui tudo, repetir a substituição dá na mesma).
- O **{{DELETE}}** é idempotente (deletar algo que já foi deletado apenas mantém o estado de "inexistente").
- O **{{POST}}** **NÃO** é idempotente (geralmente cria novos registros a cada chamada).
- O **{{PATCH}}** pode ou não ser idempotente, dependendo de como a API foi construída, pois ele altera parcialmente um recurso.

Entender essa diferença salva sistemas financeiros de duplicarem pagamentos se o usuário clicar duas vezes no botão de "Pagar"!

## Status Codes e Erros

Cada método está intimamente ligado a um {{Status Code}} de resposta.
- Um **{{GET}}** com sucesso retorna `200 OK`.
- Um **{{POST}}** com sucesso (criação) deve retornar `201 Created`.
- Um **{{PUT}}** ou **{{PATCH}}** pode retornar `200 OK` (se devolver os dados atualizados) ou `204 No Content` (se a atualização for silenciosa).
- Um **{{DELETE}}** geralmente retorna `204 No Content`.

Se você tentar usar o método errado em um {{endpoint}} (por exemplo, enviar um POST para uma rota que só aceita GET), a API rejeitará o pedido com o status **`405 Method Not Allowed`**.',

content_en = '## The Action behind the Request

So far, we know that the **{{API}}** is a communication bridge. But how does the server know if you just want to **read** data, or if you want to **create** a new record?

In the HTTP protocol, this is defined by the **Method** (also known as the HTTP Verb). The method is the first word of a {{Request}} and it dictates exactly what the intention of the operation is.

The most common methods form the famous **CRUD** pattern (Create, Read, Update, Delete). But the secret to building and consuming great APIs is understanding how these methods behave, especially regarding a fundamental concept: **{{Idempotência}}**.

## The power of Idempotency

>> A method is considered **idempotent** when the first call changes the system state, but repeating it 10, 100, or 1000 times in a row will produce **exactly the same result**, without extra side effects.

Think of a light switch. If you press "On" and the light turns on (first call), and then keep pressing "On" repeatedly, the light will just stay on. The final state is the same. That is idempotency.

Now think of an "Add $10 to account" button. If you press it 5 times, you get $50. The state changed with every call. This is **not** idempotent.

- **{{GET}}** is idempotent (only reads).
- **{{PUT}}** is idempotent (replaces everything, repeating the replacement is the same).
- **{{DELETE}}** is idempotent (deleting something already deleted just keeps it "non-existent").
- **{{POST}}** is **NOT** idempotent (usually creates new records on each call).
- **{{PATCH}}** may or may not be idempotent depending on how the API was built, as it partially updates a resource.

Understanding this difference saves financial systems from duplicating payments if the user double-clicks the "Pay" button!

## Status Codes and Errors

Each method is closely tied to a response {{Status Code}}.
- A successful **{{GET}}** returns `200 OK`.
- A successful **{{POST}}** (creation) should return `201 Created`.
- A **{{PUT}}** or **{{PATCH}}** might return `200 OK` (if it returns the updated data) or `204 No Content` (if the update is silent).
- A **{{DELETE}}** usually returns `204 No Content`.

If you try to use the wrong method on an {{endpoint}} (for example, sending a POST to a route that only accepts GET), the API will reject the request with the status **`405 Method Not Allowed`**.',

interactive_content = '[
  {
    "method": "GET",
    "purpose": "Ler e Recuperar Dados",
    "whenToUse": "Sempre que você quiser buscar informações do servidor sem alterar absolutamente nada no banco de dados. O GET é idempotente e altamente ''cacheável''.",
    "analogy": "É como abrir um cardápio e ler os preços. Você pode ler mil vezes, o restaurante não vai mudar por causa disso.",
    "pathExample": "GET /users/123",
    "request": "GET /api/users/123 HTTP/1.1\nHost: api.integralab.com\nAuthorization: Bearer abcde123",
    "response": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\"\n}",
    "commonMistake": "Enviar senhas ou dados sensíveis na URL do GET (como `?password=123`). O GET não deve ter {{Body}} e suas URLs ficam salvas nos logs dos servidores!"
  },
  {
    "method": "POST",
    "purpose": "Criar um Novo Recurso",
    "whenToUse": "Quando você quer enviar novos dados para o servidor processar e criar um registro inédito. **Não é idempotente**: se enviar duas vezes, criará dois registros.",
    "analogy": "É como preencher um formulário de matrícula e entregá-lo na secretaria. Uma nova pasta de aluno é criada.",
    "pathExample": "POST /users",
    "request": "POST /api/users HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"name\": \"Jane Doe\",\n  \"email\": \"jane@example.com\"\n}",
    "response": "HTTP/1.1 201 Created\nLocation: /api/users/124\n\n{\n  \"id\": 124,\n  \"message\": \"Usuário criado com sucesso\"\n}",
    "commonMistake": "Usar POST para todas as operações da API por preguiça de implementar os outros métodos. Isso quebra a semântica REST e dificulta integrações de terceiros."
  },
  {
    "method": "PUT",
    "purpose": "Substituir um Recurso Inteiro",
    "whenToUse": "Quando você quer atualizar um registro, fornecendo a **nova versão completa** dele. Como ele substitui tudo, é idempotente.",
    "analogy": "É como trocar o motor inteiro de um carro por um novo do mesmo modelo.",
    "pathExample": "PUT /users/123",
    "request": "PUT /api/users/123 HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"name\": \"John Doe Updated\",\n  \"email\": \"john.updated@example.com\",\n  \"age\": 30\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe Updated\",\n  \"email\": \"john.updated@example.com\",\n  \"age\": 30\n}",
    "commonMistake": "Enviar apenas o campo que quer alterar. No PUT, se você não enviar um campo que existia (ex: `age`), a API deve apagá-lo, pois o PUT é uma **substituição total**."
  },
  {
    "method": "PATCH",
    "purpose": "Atualizar Parcialmente um Recurso",
    "whenToUse": "Quando você quer alterar apenas um ou dois campos específicos de um registro grande, sem precisar enviar todo o objeto novamente.",
    "analogy": "É como trocar apenas um pneu furado do carro, em vez de trocar o carro inteiro.",
    "pathExample": "PATCH /users/123",
    "request": "PATCH /api/users/123 HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"email\": \"new.email@example.com\"\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe Updated\",\n  \"email\": \"new.email@example.com\",\n  \"age\": 30\n}",
    "commonMistake": "Muitas APIs dizem usar REST mas não implementam PATCH, forçando o cliente a baixar todo o objeto com GET para depois dar PUT, desperdiçando banda de rede."
  },
  {
    "method": "DELETE",
    "purpose": "Remover um Recurso",
    "whenToUse": "Quando você deseja apagar um registro do servidor. É idempotente, pois chamar DELETE uma vez ou dez vezes no mesmo ID resulta na mesma coisa: o recurso não existe mais.",
    "analogy": "É como amassar um documento e jogar na lixeira.",
    "pathExample": "DELETE /users/123",
    "request": "DELETE /api/users/123 HTTP/1.1\nHost: api.integralab.com",
    "response": "HTTP/1.1 204 No Content",
    "commonMistake": "Esperar que o DELETE devolva o JSON do objeto apagado. Em boas práticas REST, um sucesso de exclusão devolve o código `204` com um {{Body}} vazio."
  }
]',

interactive_content_en = '[
  {
    "method": "GET",
    "purpose": "Read and Retrieve Data",
    "whenToUse": "Whenever you want to fetch information from the server without altering anything in the database. GET is idempotent and highly ''cacheable''.",
    "analogy": "It''s like opening a menu and reading the prices. You can read it a thousand times, the restaurant won''t change because of it.",
    "pathExample": "GET /users/123",
    "request": "GET /api/users/123 HTTP/1.1\nHost: api.integralab.com\nAuthorization: Bearer abcde123",
    "response": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\"\n}",
    "commonMistake": "Sending passwords or sensitive data in the GET URL (like `?password=123`). GET should not have a {{Body}} and its URLs are saved in server logs!"
  },
  {
    "method": "POST",
    "purpose": "Create a New Resource",
    "whenToUse": "When you want to send new data to the server to process and create a brand new record. **It is not idempotent**: if you send it twice, it will create two records.",
    "analogy": "It''s like filling out an enrollment form and handing it to the office. A new student folder is created.",
    "pathExample": "POST /users",
    "request": "POST /api/users HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"name\": \"Jane Doe\",\n  \"email\": \"jane@example.com\"\n}",
    "response": "HTTP/1.1 201 Created\nLocation: /api/users/124\n\n{\n  \"id\": 124,\n  \"message\": \"User created successfully\"\n}",
    "commonMistake": "Using POST for all API operations out of laziness. This breaks REST semantics and makes third-party integrations difficult."
  },
  {
    "method": "PUT",
    "purpose": "Replace an Entire Resource",
    "whenToUse": "When you want to update a record by providing its **complete new version**. Because it replaces everything, it is idempotent.",
    "analogy": "It''s like replacing a car''s entire engine with a new one of the exact same model.",
    "pathExample": "PUT /users/123",
    "request": "PUT /api/users/123 HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"name\": \"John Doe Updated\",\n  \"email\": \"john.updated@example.com\",\n  \"age\": 30\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe Updated\",\n  \"email\": \"john.updated@example.com\",\n  \"age\": 30\n}",
    "commonMistake": "Sending only the field you want to change. In a PUT, if you omit an existing field (e.g., `age`), the API should delete it, because PUT is a **full replacement**."
  },
  {
    "method": "PATCH",
    "purpose": "Partially Update a Resource",
    "whenToUse": "When you want to change only one or two specific fields of a large record, without needing to send the whole object again.",
    "analogy": "It''s like changing just one flat tire on a car, instead of replacing the entire car.",
    "pathExample": "PATCH /users/123",
    "request": "PATCH /api/users/123 HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"email\": \"new.email@example.com\"\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe Updated\",\n  \"email\": \"new.email@example.com\",\n  \"age\": 30\n}",
    "commonMistake": "Many APIs claim to be RESTful but do not implement PATCH, forcing the client to download the whole object with GET and then PUT it, wasting network bandwidth."
  },
  {
    "method": "DELETE",
    "purpose": "Remove a Resource",
    "whenToUse": "When you want to delete a record from the server. It is idempotent, because calling DELETE once or ten times on the same ID results in the same thing: the resource no longer exists.",
    "analogy": "It''s like crumpling a document and throwing it in the trash.",
    "pathExample": "DELETE /users/123",
    "request": "DELETE /api/users/123 HTTP/1.1\nHost: api.integralab.com",
    "response": "HTTP/1.1 204 No Content",
    "commonMistake": "Expecting DELETE to return the JSON of the deleted object. In good REST practices, a successful deletion returns a `204` code with an empty {{Body}}."
  }
]',

glossary = '[
  {
    "term": "Idempotência",
    "definition": "A propriedade de uma operação que garante que executá-ela múltiplas vezes terá o mesmo efeito no servidor que executá-la apenas uma vez.",
    "importance": "Vital para confiabilidade. Se a internet cair enquanto você clica em ''Pagar'', o aplicativo pode tentar enviar o pedido de novo com segurança se for idempotente.",
    "example": "Se eu mandar o comando de atualizar meu nome para ''Adrian'' cinco vezes, no final, meu nome continuará sendo apenas ''Adrian''."
  },
  {
    "term": "GET",
    "definition": "Verbo HTTP utilizado estritamente para recuperação de dados."
  },
  {
    "term": "POST",
    "definition": "Verbo HTTP utilizado para submeter uma entidade a um recurso, geralmente resultando na criação de um novo estado ou recurso."
  },
  {
    "term": "PUT",
    "definition": "Verbo HTTP utilizado para substituir todas as atuais representações do recurso de destino."
  },
  {
    "term": "PATCH",
    "definition": "Verbo HTTP utilizado para aplicar modificações parciais a um recurso."
  },
  {
    "term": "DELETE",
    "definition": "Verbo HTTP utilizado para apagar um recurso especificado."
  },
  {
    "term": "Status Code",
    "definition": "O código de três dígitos que o servidor devolve para indicar se o pedido deu certo ou falhou.",
    "example": "200 (Sucesso), 404 (Não Encontrado), 405 (Método Não Permitido)"
  },
  {
    "term": "Endpoint",
    "definition": "Um ponto de acesso específico em uma API, representado por uma URL e um Método."
  },
  {
    "term": "Request",
    "definition": "O pedido que o cliente faz à API."
  },
  {
    "term": "Response",
    "definition": "A resposta que o servidor devolve."
  },
  {
    "term": "Header",
    "definition": "O cabeçalho HTTP onde passam metadados e tokens de segurança."
  },
  {
    "term": "Body",
    "definition": "O corpo da mensagem, geralmente em formato JSON, onde vão os dados densos (como os dados de cadastro de um formulário)."
  }
]',

glossary_en = '[
  {
    "term": "Idempotência",
    "definition": "The property of an operation that guarantees that executing it multiple times will have the same effect on the server as executing it just once.",
    "importance": "Vital for reliability. If the internet drops while you click ''Pay'', the app can safely retry the request if it is idempotent.",
    "example": "If I send the command to update my name to ''Adrian'' five times, in the end, my name will still just be ''Adrian''."
  },
  {
    "term": "GET",
    "definition": "HTTP verb used strictly for data retrieval."
  },
  {
    "term": "POST",
    "definition": "HTTP verb used to submit an entity to a resource, often resulting in the creation of a new state or resource."
  },
  {
    "term": "PUT",
    "definition": "HTTP verb used to replace all current representations of the target resource."
  },
  {
    "term": "PATCH",
    "definition": "HTTP verb used to apply partial modifications to a resource."
  },
  {
    "term": "DELETE",
    "definition": "HTTP verb used to delete a specified resource."
  },
  {
    "term": "Status Code",
    "definition": "The three-digit code the server returns to indicate if the request succeeded or failed.",
    "example": "200 (Success), 404 (Not Found), 405 (Method Not Allowed)"
  },
  {
    "term": "Endpoint",
    "definition": "A specific access point in an API, represented by a URL and a Method."
  },
  {
    "term": "Request",
    "definition": "The request the client makes to the API."
  },
  {
    "term": "Response",
    "definition": "The response the server returns."
  },
  {
    "term": "Header",
    "definition": "The HTTP header where metadata and security tokens are passed."
  },
  {
    "term": "Body",
    "definition": "The message body, usually in JSON format, containing heavy data (like form registration data)."
  }
]',

mini_quiz = '[
  {
    "question": "Um desenvolvedor criou uma rota que faz UPDATE na senha do usuário, mas ele utilizou o método POST. Por que isso é considerado uma má prática arquitetural?",
    "options": [
      "Porque o POST só aceita envio de imagens, não de senhas.",
      "Porque a senha deve sempre ser enviada via GET na URL.",
      "Porque atualizações de recursos deveriam utilizar os métodos idempotentes PUT ou PATCH para refletir a semântica correta REST."
    ],
    "correctIndex": 2,
    "explanation": "O POST não é idempotente e semanticamente indica a criação de novos recursos ou ações não triviais. Atualizações de estado devem usar PUT (substituição) ou PATCH (parcial)."
  },
  {
    "question": "O que significa afirmar que o método DELETE é idempotente?",
    "options": [
      "Significa que se você tentar deletar o mesmo ID várias vezes, o servidor explodirá com um erro grave na segunda tentativa.",
      "Significa que deletar uma vez ou dez vezes causará o mesmo impacto no estado do sistema (o recurso permanecerá apagado).",
      "Significa que ele recupera arquivos deletados."
    ],
    "correctIndex": 1,
    "explanation": "A idempotência garante que a repetição segura do comando não gere efeitos colaterais novos. Na décima tentativa de DELETE, o servidor pode retornar 404, mas o estado do banco (recurso não existe) continuará sendo o mesmo desejado."
  },
  {
    "question": "Qual a principal diferença semântica entre PUT e PATCH?",
    "options": [
      "O PUT apaga o dado antigo, enquanto o PATCH apenas cria um novo.",
      "O PUT requer o envio do objeto completo para substituição, enquanto o PATCH envia apenas os campos que sofrerão alteração.",
      "Não há diferença, ambos são apenas sinônimos no protocolo HTTP."
    ],
    "correctIndex": 1,
    "explanation": "O PUT exige um payload completo (substituição total). Se faltar um campo, o servidor deve remover esse dado. Já o PATCH aplica apenas modificações nos campos enviados (atualização parcial)."
  },
  {
    "question": "Se um cliente tenta enviar uma requisição POST para a rota `/users/profile`, mas o backend configurou essa rota especificamente para receber apenas GET, o que acontece?",
    "options": [
      "O servidor converte automaticamente o POST para GET.",
      "A requisição será barrada pela API e retornará o código de status HTTP 405 (Method Not Allowed).",
      "A requisição passa e o banco de dados corrompe."
    ],
    "correctIndex": 1,
    "explanation": "APIs RESTful validam o método usado contra a rota chamada. Se o endpoint `/users/profile` só aceita GET, a tentativa de acesso via POST resultará no erro de semântica 405 Method Not Allowed."
  }
]',

mini_quiz_en = '[
  {
    "question": "A developer created a route that UPDATEs the user''s password, but they used the POST method. Why is this considered an architectural bad practice?",
    "options": [
      "Because POST only accepts image uploads, not passwords.",
      "Because the password must always be sent via GET in the URL.",
      "Because resource updates should use the idempotent PUT or PATCH methods to reflect proper REST semantics."
    ],
    "correctIndex": 2,
    "explanation": "POST is not idempotent and semantically indicates the creation of new resources or non-trivial actions. State updates should use PUT (replacement) or PATCH (partial)."
  },
  {
    "question": "What does it mean to say that the DELETE method is idempotent?",
    "options": [
      "It means if you try to delete the same ID multiple times, the server will explode with a severe error on the second try.",
      "It means that deleting once or ten times will cause the same impact on the system state (the resource will remain deleted).",
      "It means it recovers deleted files."
    ],
    "correctIndex": 1,
    "explanation": "Idempotency guarantees that safely repeating the command will not generate new side effects. On the tenth DELETE attempt, the server may return 404, but the database state (resource does not exist) will remain the same desired state."
  },
  {
    "question": "What is the main semantic difference between PUT and PATCH?",
    "options": [
      "PUT deletes old data, while PATCH only creates new ones.",
      "PUT requires sending the complete object for replacement, while PATCH sends only the fields that will be changed.",
      "There is no difference, both are just synonyms in the HTTP protocol."
    ],
    "correctIndex": 1,
    "explanation": "PUT requires a complete payload (total replacement). If a field is missing, the server must remove that data. PATCH applies modifications only to the fields sent (partial update)."
  },
  {
    "question": "If a client tries to send a POST request to the `/users/profile` route, but the backend configured this route specifically to receive only GET, what happens?",
    "options": [
      "The server automatically converts POST to GET.",
      "The request will be blocked by the API and will return the HTTP status code 405 (Method Not Allowed).",
      "The request passes and the database corrupts."
    ],
    "correctIndex": 1,
    "explanation": "RESTful APIs validate the method used against the called route. If the `/users/profile` endpoint only accepts GET, attempting to access it via POST will result in a 405 Method Not Allowed semantic error."
  }
]'

WHERE title = 'Métodos HTTP';
