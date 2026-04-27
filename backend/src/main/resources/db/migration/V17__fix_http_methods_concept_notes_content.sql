-- V17__fix_http_methods_concept_notes_content.sql

UPDATE theory_lessons
SET content = '## A Ideia Central

Até agora, sabemos que a {{API REST}} é uma ponte de comunicação. Mas como o servidor sabe se você quer apenas ler um dado, ou se quer criar um novo registro?

No protocolo {{HTTP}}, isso é definido pelo Método (também conhecido como Verbo HTTP). O método é a primeira palavra de um {{Request}} e ele dita exatamente qual é a intenção da operação.

## Métodos são Intenções

Os métodos mais comuns formam o padrão CRUD (Create, Read, Update, Delete).

>> O segredo para construir e consumir APIs excelentes é entender como esses métodos se comportam na prática. Usar o verbo errado é como tentar abrir uma porta de empurrar puxando a maçaneta.

Por exemplo, se um cliente tenta enviar um {{POST}} para um {{Endpoint}} que só aceita {{GET}}, a API rejeitará o pedido retornando o {{Status Code}} 405 Method Not Allowed.

## O Exemplo Prático de E-Commerce

Imagine que você está navegando em uma loja online. Eis como a sua aplicação front-end conversa com o back-end usando diferentes verbos:

[[ECOMMERCE_EXAMPLE]]

## Idempotência em linguagem simples

Um conceito fundamental dos métodos é a {{Idempotência}}.

>> Um método é idempotente quando chamá-lo uma vez tem exatamente o mesmo efeito final que chamá-lo 10, 100 ou 1000 vezes seguidas, sem causar efeitos colaterais extras.

Pense num interruptor de luz. Se você apertar "Ligar" e a luz acender (primeira chamada), continuar apertando "Ligar" repetidamente não mudará nada. O estado final continua sendo "Luz Acesa". Isso é {{Idempotência}}.

Agora, pense em um botão de "Comprar Produto". Se você apertar 5 vezes seguidas por acidente, você fará 5 compras separadas. O estado muda a cada chamada. Isso **não** é idempotente!

## Por que não usar POST para tudo?

Muitos iniciantes usam o {{POST}} para buscar dados, atualizar registros e até deletar arquivos.

Embora tecnicamente funcione, isso quebra a semântica da web. O {{POST}} não é idempotente. Se a conexão cair no meio de uma atualização via POST, o navegador não sabe se pode tentar de novo com segurança, pois tem medo de duplicar uma ação.

## Resumo dos Verbos

Aqui está um resumo prático de como cada método deve ser usado e como ele se comporta:

[[VERB_SUMMARY]]',

content_en = '## The Core Idea

So far, we know that the {{API REST}} is a communication bridge. But how does the server know if you just want to read data, or if you want to create a new record?

In the {{HTTP}} protocol, this is defined by the Method (also known as the HTTP Verb). The method is the first word of a {{Request}} and it dictates exactly what the intention of the operation is.

## Methods are Intentions

The most common methods form the CRUD pattern (Create, Read, Update, Delete).

>> The secret to building and consuming great APIs is understanding how these methods behave in practice. Using the wrong verb is like trying to open a push door by pulling the handle.

For example, if a client tries to send a {{POST}} to an {{Endpoint}} that only accepts {{GET}}, the API will reject the request returning the {{Status Code}} 405 Method Not Allowed.

## The Practical E-Commerce Example

Imagine you are browsing an online store. Here is how your front-end application talks to the back-end using different verbs:

[[ECOMMERCE_EXAMPLE]]

## Idempotency in simple terms

A fundamental concept of methods is {{Idempotência}}.

>> A method is idempotent when calling it once has exactly the same final effect as calling it 10, 100, or 1000 times in a row, without causing extra side effects.

Think of a light switch. If you press "Turn On" and the light turns on (first call), pressing "Turn On" repeatedly will not change anything. The final state remains "Light On". This is {{Idempotência}}.

Now, think of a "Buy Product" button. If you press it 5 times in a row by accident, you will make 5 separate purchases. The state changes with each call. This is **not** idempotent!

## Why not use POST for everything?

Many beginners use {{POST}} to fetch data, update records, and even delete files.

While it technically works, it breaks web semantics. {{POST}} is not idempotent. If the connection drops in the middle of a POST update, the browser doesn''t know if it can safely try again, because it''s afraid of duplicating an action.

## Verbs Summary

Here is a practical summary of how each method should be used and how it behaves:

[[VERB_SUMMARY]]',

glossary = '[
  {
    "term": "API REST",
    "acronym": "Representational State Transfer",
    "definition": "Um estilo arquitetural para fornecer padrões entre sistemas de computadores na web, facilitando a comunicação entre eles.",
    "importance": "É o padrão da indústria para construção de serviços web. Entender REST é requisito fundamental para quase qualquer desenvolvedor back-end ou front-end.",
    "example": "O IntegraLab inteiro se comunica usando uma API REST por debaixo dos panos.",
    "lessonContext": "Nesta aula, exploramos como os métodos HTTP dão vida e significado às URLs de uma API REST."
  },
  {
    "term": "REST",
    "acronym": "Representational State Transfer",
    "definition": "Conjunto de restrições de arquitetura. Uma API que obedece a essas restrições é chamada de RESTful.",
    "importance": "Garante que o serviço seja escalável, sem estado (stateless) e fácil de manter.",
    "lessonContext": "Usar os métodos HTTP corretamente (ex: GET para ler e não POST) é o que torna uma API verdadeiramente REST."
  },
  {
    "term": "Idempotência",
    "definition": "A propriedade de uma operação que garante que executá-la múltiplas vezes terá o mesmo efeito no servidor que executá-la apenas uma vez.",
    "importance": "Vital para confiabilidade. Se a internet cair enquanto você clica em ''Pagar'', o aplicativo pode tentar enviar o pedido de novo com segurança se o método for idempotente.",
    "example": "Se eu mandar o comando de atualizar meu nome para ''Adrian'' via PUT cinco vezes, no final, meu nome continuará sendo apenas ''Adrian''.",
    "lessonContext": "A grande diferença arquitetural abordada nesta aula entre POST (não idempotente) e PUT/PATCH (idempotentes)."
  },
  {
    "term": "GET",
    "definition": "Verbo HTTP utilizado estritamente para recuperação de dados.",
    "importance": "Por não alterar o banco de dados, requisições GET podem ser colocadas em cache pelos navegadores e servidores (CDNs) para tornar a internet mais rápida.",
    "example": "GET /api/users/123",
    "lessonContext": "É o método mais comum e inofensivo. Vimos que ele não deve ser usado com um Body."
  },
  {
    "term": "POST",
    "definition": "Verbo HTTP utilizado para submeter uma entidade a um recurso, geralmente resultando na criação de um novo estado ou recurso.",
    "importance": "É o principal método para enviar formulários e salvar dados novos.",
    "example": "POST /api/users (criando um novo usuário)",
    "lessonContext": "Discutimos como iniciantes abusam do POST, usando-o para tudo, o que quebra a semântica REST."
  },
  {
    "term": "PUT",
    "definition": "Verbo HTTP utilizado para substituir todas as atuais representações do recurso de destino pelo payload da requisição.",
    "importance": "Garante a atualização completa de um registro de forma segura e idempotente.",
    "example": "PUT /api/users/123 (enviando todos os dados do usuário atualizados)",
    "lessonContext": "Diferenciado do PATCH por substituir o registro inteiro, e não apenas parte dele."
  },
  {
    "term": "PATCH",
    "definition": "Verbo HTTP utilizado para aplicar modificações parciais a um recurso.",
    "importance": "Economiza banda de rede, já que você só envia os dados que realmente mudaram.",
    "example": "PATCH /api/users/123 (enviando apenas o campo email que mudou)",
    "lessonContext": "O método ideal para pequenas atualizações de estado mostradas no exemplo de E-commerce."
  },
  {
    "term": "DELETE",
    "definition": "Verbo HTTP utilizado para apagar um recurso especificado.",
    "importance": "Remove dados. Mesmo sendo destrutivo, é idempotente.",
    "example": "DELETE /api/users/123",
    "lessonContext": "Aprendemos que o DELETE geralmente retorna um Status Code 204 No Content após o sucesso."
  },
  {
    "term": "OPTIONS",
    "definition": "Verbo HTTP utilizado para descrever as opções de comunicação para o recurso de destino.",
    "importance": "Crucial para a segurança dos navegadores. Ele realiza as verificações de CORS antes de enviar requisições reais.",
    "lessonContext": "Mencionado brevemente nos cards como um método silencioso que o navegador usa por baixo dos panos."
  },
  {
    "term": "Endpoint",
    "definition": "Um ponto de acesso específico em uma API, representado por uma URL associada a um Método.",
    "importance": "É a ''porta de entrada'' onde as integrações e aplicativos clientes se conectam para interagir com o software.",
    "example": "A união de GET com /users forma um Endpoint de leitura.",
    "lessonContext": "Todos os métodos que vimos agem diretamente sobre um Endpoint para definir o que vai acontecer com os dados."
  },
  {
    "term": "Request",
    "definition": "O pedido ou requisição que o cliente faz à API.",
    "importance": "É a origem de toda ação na Web.",
    "example": "Um JSON com dados de login enviado do seu celular para o Instagram.",
    "lessonContext": "O método (GET, POST, etc.) é a primeira palavra enviada dentro de um Request."
  },
  {
    "term": "Response",
    "definition": "A resposta que o servidor devolve para o cliente após processar um Request.",
    "importance": "Informa se a operação deu certo, entregando os dados solicitados ou detalhando o erro.",
    "example": "Um JSON listando todos os alunos matriculados.",
    "lessonContext": "O Status Code (ex: 200 OK) é a parte mais importante do Response nesta aula."
  },
  {
    "term": "Header",
    "definition": "O cabeçalho HTTP onde passam metadados cruciais da requisição, como formato de dados e tokens de segurança.",
    "importance": "Permite configurar a requisição sem sujar os dados principais. É onde a autorização (quem é você) acontece.",
    "example": "Authorization: Bearer abc123def",
    "lessonContext": "Muitas vezes, a diferença entre um GET que passa e um que é bloqueado reside apenas no que está no Header."
  },
  {
    "term": "Body",
    "definition": "O corpo da mensagem, geralmente em formato JSON, onde vão os dados densos da operação.",
    "importance": "É o contêiner de transporte para cargas úteis grandes, como dados de cadastro, imagens ou arquivos longos.",
    "example": "{ \"name\": \"Adrian\", \"role\": \"admin\" }",
    "lessonContext": "A regra de ouro da aula: GET não costuma ter Body, enquanto POST e PUT/PATCH quase sempre dependem dele."
  },
  {
    "term": "Status Code",
    "definition": "O código de três dígitos que o servidor devolve para indicar se o pedido deu certo ou por que falhou.",
    "importance": "Padroniza a comunicação de erros na Web.",
    "example": "200 (Sucesso), 404 (Não Encontrado), 405 (Método Não Permitido)",
    "lessonContext": "Conectamos os verbos aos seus códigos ideais: POST com 201, DELETE com 204."
  },
  {
    "term": "CORS",
    "acronym": "Cross-Origin Resource Sharing",
    "definition": "Um mecanismo de segurança dos navegadores que bloqueia o acesso a APIs de domínios diferentes, a menos que a API explicitamente permita.",
    "importance": "Impede que scripts maliciosos em um site aleatório consigam ler dados da sua conta bancária sem sua permissão.",
    "lessonContext": "O CORS é frequentemente a razão pela qual o navegador dispara uma requisição OPTIONS silenciosa antes do seu POST."
  },
  {
    "term": "HTTP",
    "acronym": "Hypertext Transfer Protocol",
    "definition": "O protocolo base de comunicação da World Wide Web.",
    "lessonContext": "Os métodos abordados na aula (GET, POST...) pertencem a este protocolo."
  }
]',

glossary_en = '[
  {
    "term": "API REST",
    "acronym": "Representational State Transfer",
    "definition": "An architectural style for providing standards between computer systems on the web, making it easier for systems to communicate with each other.",
    "importance": "It is the industry standard for building web services. Understanding REST is a fundamental requirement for almost any backend or frontend developer.",
    "example": "The entire IntegraLab platform communicates using a REST API under the hood.",
    "lessonContext": "In this lesson, we explored how HTTP methods give life and meaning to a REST API''s URLs."
  },
  {
    "term": "REST",
    "acronym": "Representational State Transfer",
    "definition": "A set of architectural constraints. An API that obeys these constraints is called RESTful.",
    "importance": "Ensures the service is scalable, stateless, and easy to maintain.",
    "lessonContext": "Using HTTP methods correctly (e.g., GET for reading and not POST) is what makes an API truly RESTful."
  },
  {
    "term": "Idempotência",
    "definition": "The property of an operation that guarantees that executing it multiple times will have the same effect on the server as executing it just once.",
    "importance": "Vital for reliability. If the internet drops while you click ''Pay'', the app can safely try to send the request again if the method is idempotent.",
    "example": "If I send the command to update my name to ''Adrian'' via PUT five times, in the end, my name will still just be ''Adrian''.",
    "lessonContext": "The major architectural difference covered in this lesson between POST (not idempotent) and PUT/PATCH (idempotent)."
  },
  {
    "term": "GET",
    "definition": "HTTP verb used strictly for data retrieval.",
    "importance": "Because it doesn''t alter the database, GET requests can be cached by browsers and servers (CDNs) to make the internet faster.",
    "example": "GET /api/users/123",
    "lessonContext": "It is the most common and harmless method. We saw that it should not be used with a Body."
  },
  {
    "term": "POST",
    "definition": "HTTP verb used to submit an entity to a resource, often resulting in the creation of a new state or resource.",
    "importance": "It is the main method for submitting forms and saving new data.",
    "example": "POST /api/users (creating a new user)",
    "lessonContext": "We discussed how beginners abuse POST by using it for everything, which breaks REST semantics."
  },
  {
    "term": "PUT",
    "definition": "HTTP verb used to replace all current representations of the target resource with the request payload.",
    "importance": "Guarantees the complete update of a record in a safe and idempotent way.",
    "example": "PUT /api/users/123 (sending all updated user data)",
    "lessonContext": "Differentiated from PATCH by replacing the entire record, rather than just a part of it."
  },
  {
    "term": "PATCH",
    "definition": "HTTP verb used to apply partial modifications to a resource.",
    "importance": "Saves network bandwidth, as you only send the data that actually changed.",
    "example": "PATCH /api/users/123 (sending only the email field that changed)",
    "lessonContext": "The ideal method for small state updates shown in the E-commerce example."
  },
  {
    "term": "DELETE",
    "definition": "HTTP verb used to delete a specified resource.",
    "importance": "Removes data. Even though it is destructive, it is idempotent.",
    "example": "DELETE /api/users/123",
    "lessonContext": "We learned that DELETE usually returns a 204 No Content Status Code upon success."
  },
  {
    "term": "OPTIONS",
    "definition": "HTTP verb used to describe the communication options for the target resource.",
    "importance": "Crucial for browser security. It performs CORS checks before sending actual requests.",
    "lessonContext": "Briefly mentioned in the cards as a silent method that the browser uses under the hood."
  },
  {
    "term": "Endpoint",
    "definition": "A specific access point in an API, represented by a URL associated with a Method.",
    "importance": "It is the ''front door'' where integrations and client apps connect to interact with the software.",
    "example": "The union of GET with /users forms a read Endpoint.",
    "lessonContext": "All the methods we saw act directly on an Endpoint to define what will happen to the data."
  },
  {
    "term": "Request",
    "definition": "The request that the client makes to the API.",
    "importance": "It is the origin of every action on the Web.",
    "example": "A JSON with login data sent from your phone to Instagram.",
    "lessonContext": "The method (GET, POST, etc.) is the very first word sent inside a Request."
  },
  {
    "term": "Response",
    "definition": "The response that the server returns to the client after processing a Request.",
    "importance": "Informs whether the operation succeeded, delivering the requested data or detailing the error.",
    "example": "A JSON listing all enrolled students.",
    "lessonContext": "The Status Code (e.g., 200 OK) is the most important part of the Response in this lesson."
  },
  {
    "term": "Header",
    "definition": "The HTTP header where crucial request metadata, such as data format and security tokens, are passed.",
    "importance": "Allows configuring the request without dirtying the main data. It''s where authorization (who you are) happens.",
    "example": "Authorization: Bearer abc123def",
    "lessonContext": "Often, the difference between a GET that passes and one that is blocked lies purely in what''s in the Header."
  },
  {
    "term": "Body",
    "definition": "The message body, usually in JSON format, containing the heavy operation data.",
    "importance": "It is the transport container for large payloads, such as registration data, images, or long files.",
    "example": "{ \"name\": \"Adrian\", \"role\": \"admin\" }",
    "lessonContext": "The golden rule of the lesson: GET usually has no Body, while POST and PUT/PATCH almost always depend on it."
  },
  {
    "term": "Status Code",
    "definition": "The three-digit code the server returns to indicate if the request succeeded or why it failed.",
    "importance": "Standardizes error communication on the Web.",
    "example": "200 (Success), 404 (Not Found), 405 (Method Not Allowed)",
    "lessonContext": "We connected the verbs to their ideal codes: POST with 201, DELETE with 204."
  },
  {
    "term": "CORS",
    "acronym": "Cross-Origin Resource Sharing",
    "definition": "A browser security mechanism that blocks access to APIs from different domains unless the API explicitly allows it.",
    "importance": "Prevents malicious scripts on a random site from reading data from your bank account without your permission.",
    "lessonContext": "CORS is often the reason why the browser fires a silent OPTIONS request before your POST."
  },
  {
    "term": "HTTP",
    "acronym": "Hypertext Transfer Protocol",
    "definition": "The foundational communication protocol of the World Wide Web.",
    "lessonContext": "The methods discussed in the lesson (GET, POST...) belong to this protocol."
  }
]',

interactive_content = '[
  {
    "method": "GET",
    "purpose": "Ler e Recuperar Dados",
    "whenToUse": "Sempre que você quiser buscar informações do servidor sem alterar absolutamente nada no banco de dados. O {{GET}} é idempotente e altamente ''cacheável''.",
    "analogy": "É como abrir um cardápio e ler os preços. Você pode ler mil vezes, o restaurante não vai mudar por causa disso.",
    "pathExample": "GET /users/123",
    "request": "GET /api/users/123 HTTP/1.1\nHost: api.integralab.com\nAuthorization: Bearer abcde123",
    "response": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\"\n}",
    "commonMistake": "Enviar senhas ou dados sensíveis na URL do {{GET}} (como `?password=123`). O GET não deve ter {{Body}} e suas URLs ficam salvas nos logs dos servidores!"
  },
  {
    "method": "POST",
    "purpose": "Criar um Novo Recurso",
    "whenToUse": "Quando você quer enviar novos dados para o servidor processar e criar um registro inédito. **Não é idempotente**: se enviar duas vezes, criará dois registros.",
    "analogy": "É como preencher um formulário de matrícula e entregá-lo na secretaria. Uma nova pasta de aluno é criada.",
    "pathExample": "POST /users",
    "request": "POST /api/users HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"name\": \"Jane Doe\",\n  \"email\": \"jane@example.com\"\n}",
    "response": "HTTP/1.1 201 Created\nLocation: /api/users/124\n\n{\n  \"id\": 124,\n  \"message\": \"Usuário criado com sucesso\"\n}",
    "commonMistake": "Usar {{POST}} para todas as operações da API por preguiça de implementar os outros métodos. Isso quebra a semântica REST e dificulta integrações de terceiros."
  },
  {
    "method": "PUT",
    "purpose": "Substituir um Recurso Inteiro",
    "whenToUse": "Quando você quer atualizar um registro, fornecendo a **nova versão completa** dele. Como ele substitui tudo, é idempotente.",
    "analogy": "É como trocar o motor inteiro de um carro por um novo do mesmo modelo.",
    "pathExample": "PUT /users/123",
    "request": "PUT /api/users/123 HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"name\": \"John Doe Updated\",\n  \"email\": \"john.updated@example.com\",\n  \"age\": 30\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe Updated\",\n  \"email\": \"john.updated@example.com\",\n  \"age\": 30\n}",
    "commonMistake": "Enviar apenas o campo que quer alterar. No {{PUT}}, se você não enviar um campo que existia (ex: `age`), a API deve apagá-lo, pois o PUT é uma **substituição total**."
  },
  {
    "method": "PATCH",
    "purpose": "Atualizar Parcialmente um Recurso",
    "whenToUse": "Quando você quer alterar apenas um ou dois campos específicos de um registro grande, sem precisar enviar todo o objeto novamente.",
    "analogy": "É como trocar apenas um pneu furado do carro, em vez de trocar o carro inteiro.",
    "pathExample": "PATCH /users/123",
    "request": "PATCH /api/users/123 HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"email\": \"new.email@example.com\"\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe Updated\",\n  \"email\": \"new.email@example.com\",\n  \"age\": 30\n}",
    "commonMistake": "Muitas APIs dizem usar {{REST}} mas não implementam {{PATCH}}, forçando o cliente a baixar todo o objeto com {{GET}} para depois dar {{PUT}}, desperdiçando banda de rede."
  },
  {
    "method": "DELETE",
    "purpose": "Remover um Recurso",
    "whenToUse": "Quando você deseja apagar um registro do servidor. É idempotente, pois chamar {{DELETE}} uma vez ou dez vezes no mesmo ID resulta na mesma coisa: o recurso não existe mais.",
    "analogy": "É como amassar um documento e jogar na lixeira.",
    "pathExample": "DELETE /users/123",
    "request": "DELETE /api/users/123 HTTP/1.1\nHost: api.integralab.com",
    "response": "HTTP/1.1 204 No Content",
    "commonMistake": "Esperar que o {{DELETE}} devolva o JSON do objeto apagado. Em boas práticas REST, um sucesso de exclusão devolve o código `204` com um {{Body}} vazio."
  }
]',

interactive_content_en = '[
  {
    "method": "GET",
    "purpose": "Read and Retrieve Data",
    "whenToUse": "Whenever you want to fetch information from the server without altering anything in the database. {{GET}} is idempotent and highly ''cacheable''.",
    "analogy": "It''s like opening a menu and reading the prices. You can read it a thousand times, the restaurant won''t change because of it.",
    "pathExample": "GET /users/123",
    "request": "GET /api/users/123 HTTP/1.1\nHost: api.integralab.com\nAuthorization: Bearer abcde123",
    "response": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\"\n}",
    "commonMistake": "Sending passwords or sensitive data in the {{GET}} URL (like `?password=123`). GET should not have a {{Body}} and its URLs are saved in server logs!"
  },
  {
    "method": "POST",
    "purpose": "Create a New Resource",
    "whenToUse": "When you want to send new data to the server to process and create a brand new record. **It is not idempotent**: if you send it twice, it will create two records.",
    "analogy": "It''s like filling out an enrollment form and handing it to the office. A new student folder is created.",
    "pathExample": "POST /users",
    "request": "POST /api/users HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"name\": \"Jane Doe\",\n  \"email\": \"jane@example.com\"\n}",
    "response": "HTTP/1.1 201 Created\nLocation: /api/users/124\n\n{\n  \"id\": 124,\n  \"message\": \"User created successfully\"\n}",
    "commonMistake": "Using {{POST}} for all API operations out of laziness. This breaks REST semantics and makes third-party integrations difficult."
  },
  {
    "method": "PUT",
    "purpose": "Replace an Entire Resource",
    "whenToUse": "When you want to update a record by providing its **complete new version**. Because it replaces everything, it is idempotent.",
    "analogy": "It''s like replacing a car''s entire engine with a new one of the exact same model.",
    "pathExample": "PUT /users/123",
    "request": "PUT /api/users/123 HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"name\": \"John Doe Updated\",\n  \"email\": \"john.updated@example.com\",\n  \"age\": 30\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe Updated\",\n  \"email\": \"john.updated@example.com\",\n  \"age\": 30\n}",
    "commonMistake": "Sending only the field you want to change. In a {{PUT}}, if you omit an existing field (e.g., `age`), the API should delete it, because PUT is a **full replacement**."
  },
  {
    "method": "PATCH",
    "purpose": "Partially Update a Resource",
    "whenToUse": "When you want to change only one or two specific fields of a large record, without needing to send the whole object again.",
    "analogy": "It''s like changing just one flat tire on a car, instead of replacing the entire car.",
    "pathExample": "PATCH /users/123",
    "request": "PATCH /api/users/123 HTTP/1.1\nHost: api.integralab.com\nContent-Type: application/json\n\n{\n  \"email\": \"new.email@example.com\"\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"id\": 123,\n  \"name\": \"John Doe Updated\",\n  \"email\": \"new.email@example.com\",\n  \"age\": 30\n}",
    "commonMistake": "Many APIs claim to be {{REST}}ful but do not implement {{PATCH}}, forcing the client to download the whole object with {{GET}} and then {{PUT}} it, wasting network bandwidth."
  },
  {
    "method": "DELETE",
    "purpose": "Remove a Resource",
    "whenToUse": "When you want to delete a record from the server. It is idempotent, because calling {{DELETE}} once or ten times on the same ID results in the same thing: the resource no longer exists.",
    "analogy": "It''s like crumpling a document and throwing it in the trash.",
    "pathExample": "DELETE /users/123",
    "request": "DELETE /api/users/123 HTTP/1.1\nHost: api.integralab.com",
    "response": "HTTP/1.1 204 No Content",
    "commonMistake": "Expecting {{DELETE}} to return the JSON of the deleted object. In good REST practices, a successful deletion returns a `204` code with an empty {{Body}}."
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

WHERE id = '44444444-4444-4444-4444-000000000003';
