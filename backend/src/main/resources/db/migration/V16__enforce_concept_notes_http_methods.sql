-- V16__enforce_concept_notes_http_methods.sql

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
]'

WHERE title = 'Métodos HTTP';
