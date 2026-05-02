UPDATE theory_lessons
SET
  content = $$## Quem dispara a conversa?

No fluxo clássico de {{HTTP}}, o {{Cliente}} sempre inicia a comunicação. Ele monta uma {{Request}} com um {{Método HTTP}}, aponta para um {{Endpoint}} usando um {{Path}} e envia tudo para a {{API}} ou para o {{Servidor}} correto.

[[REQUEST_RESPONSE_CYCLE]]

## O que viaja na ida e o que volta na resposta?

Na ida, a conversa leva intenção, metadados e talvez dados. Na volta, a {{Response}} entrega um {{Status Code}}, mais {{Headers}} e, quando necessário, um {{Body}} com {{JSON}} ou uma mensagem de erro.

[[REQUEST_RESPONSE_ANATOMY]]

## Três cenas para fixar o modelo mental

Uma leitura simples costuma usar {{GET}} sem {{Payload}}. Uma criação normalmente usa {{Body}} e devolve {{201 Created}}. Já um {{404 Not Found}} mostra que nem todo erro significa queda do sistema.

[[CYCLE_EXAMPLES]]

## Erros de interpretação que sabotam o debug

Quem confunde {{404 Not Found}} com {{500 Internal Server Error}} ou trata a {{Interface}} como se fosse a própria {{API}} acaba olhando para o pedaço errado do ciclo.

[[REQUEST_RESPONSE_MISTAKES]]$$,

  content_en = $$## Who triggers the conversation?

In the classic {{HTTP}} flow, the {{Client}} always starts communication. It assembles a {{Request}} with an {{HTTP Method}}, points to an {{Endpoint}} using a {{Path}}, and sends everything to the correct {{API}} or {{Server}}.

[[REQUEST_RESPONSE_CYCLE]]

## What goes out and what comes back?

On the way out, the conversation carries intent, metadata, and sometimes data. On the way back, the {{Response}} delivers a {{Status Code}}, more {{Headers}}, and, when needed, a {{Body}} with {{JSON}} or an error message.

[[REQUEST_RESPONSE_ANATOMY]]

## Three scenes to lock in the mental model

A simple read usually uses {{GET}} without a {{Payload}}. A creation normally uses a {{Body}} and returns {{201 Created}}. Meanwhile, a {{404 Not Found}} shows that not every error means the system is down.

[[CYCLE_EXAMPLES]]

## Interpretation mistakes that sabotage debugging

Whoever confuses {{404 Not Found}} with {{500 Internal Server Error}} or treats the {{Interface}} as if it were the {{API}} ends up looking at the wrong part of the cycle.

[[REQUEST_RESPONSE_MISTAKES]]$$,

  glossary = $$[
    {
      "term": "Request",
      "acronym": "",
      "definition": "A mensagem completa enviada pelo cliente para pedir uma ação, dado ou validação ao sistema.",
      "importance": "É o ponto de partida de todo fluxo HTTP tradicional.",
      "example": "GET /api/products/42 HTTP/1.1",
      "lessonContext": "Nesta aula, a Request representa a ida do cliente até a API."
    },
    {
      "term": "Response",
      "acronym": "",
      "definition": "A mensagem devolvida pelo servidor depois que a requisição foi analisada e processada.",
      "importance": "É ela que informa sucesso, erro e conteúdo retornado.",
      "example": "HTTP/1.1 200 OK",
      "lessonContext": "Nesta aula, a Response representa a volta do sistema para a interface."
    },
    {
      "term": "Cliente",
      "acronym": "",
      "definition": "A ponta que toma a iniciativa da conversa: navegador, app mobile, frontend ou script.",
      "importance": "Sem o cliente disparar a ação, o ciclo HTTP não começa.",
      "example": "Um navegador pedindo a tela de detalhes de um produto.",
      "lessonContext": "O cliente é quem monta a Request e inicia a jornada."
    },
    {
      "term": "Servidor",
      "acronym": "",
      "definition": "O lado que recebe a requisição, aplica regras e devolve uma resposta estruturada.",
      "importance": "Ele concentra processamento, validação e acesso a dados.",
      "example": "Um backend em Spring recebendo POST /api/orders.",
      "lessonContext": "Nesta aula, o servidor aparece como o responsável pela lógica da operação."
    },
    {
      "term": "API",
      "acronym": "Application Programming Interface",
      "definition": "A camada de comunicação que expõe portas de entrada controladas para outros sistemas ou interfaces.",
      "importance": "Ela organiza endpoints, contratos e validações antes da regra de negócio.",
      "example": "Uma API REST com rotas em /api/orders.",
      "lessonContext": "A API faz a triagem da Request antes de liberar o processamento."
    },
    {
      "term": "HTTP",
      "acronym": "Hypertext Transfer Protocol",
      "definition": "O protocolo de aplicação usado para trocar mensagens entre cliente e servidor na web.",
      "importance": "Ele define o formato básico da Request e da Response.",
      "example": "HTTP/1.1 201 Created",
      "lessonContext": "Toda a aula gira em torno do ciclo de ida e volta desse protocolo."
    },
    {
      "term": "Método HTTP",
      "acronym": "",
      "definition": "O verbo que expressa a intenção da requisição, como leitura, criação, atualização ou remoção.",
      "importance": "Ele orienta a API sobre o tipo de ação esperada.",
      "example": "GET, POST, PUT e DELETE.",
      "lessonContext": "Nesta aula, o método é a primeira pista para entender o objetivo da Request."
    },
    {
      "term": "Endpoint",
      "acronym": "",
      "definition": "O ponto de entrada da API que combina rota disponível e semântica de acesso ao recurso.",
      "importance": "Ajuda a separar recursos e comportamentos dentro da API.",
      "example": "POST /api/orders",
      "lessonContext": "O endpoint é o destino operacional que a Request precisa alcançar."
    },
    {
      "term": "Path",
      "acronym": "",
      "definition": "O caminho específico dentro da URL que aponta para um recurso ou ação.",
      "importance": "Um path errado pode quebrar o fluxo mesmo quando o servidor está saudável.",
      "example": "/api/products/42",
      "lessonContext": "Nesta aula, o path é a parte do endereço usada para localizar onde a Request deve aterrissar."
    },
    {
      "term": "Header",
      "acronym": "",
      "definition": "Cada linha de metadado que acompanha a mensagem HTTP.",
      "importance": "Um header orienta autenticação, cache, conteúdo e outras regras invisíveis.",
      "example": "Content-Type: application/json",
      "lessonContext": "Serve como unidade básica para entender os metadados da conversa."
    },
    {
      "term": "Headers",
      "acronym": "",
      "definition": "O conjunto de cabeçalhos que acompanha uma Request ou uma Response.",
      "importance": "Sem eles, cliente e servidor perdem contexto sobre formato, identidade e instruções extras.",
      "example": "Authorization, Accept e Content-Type.",
      "lessonContext": "Nesta aula, os headers aparecem tanto na ida quanto na volta do fluxo."
    },
    {
      "term": "Body",
      "acronym": "",
      "definition": "A área da mensagem HTTP onde os dados centrais da operação podem ser transportados.",
      "importance": "É o lugar clássico para payloads de criação ou atualização.",
      "example": "{ \"productId\": 42, \"quantity\": 1 }",
      "lessonContext": "Comparamos quando o body faz sentido e quando ele normalmente está ausente, como em GETs simples."
    },
    {
      "term": "Payload",
      "acronym": "",
      "definition": "A carga útil da operação, geralmente carregada dentro do body.",
      "importance": "Distingue o dado de negócio do restante dos metadados da mensagem.",
      "example": "O JSON com os campos productId e quantity.",
      "lessonContext": "Nesta aula, o payload aparece como a parte mais sensível das operações de escrita."
    },
    {
      "term": "JSON",
      "acronym": "JavaScript Object Notation",
      "definition": "Formato textual leve usado para representar dados estruturados em APIs modernas.",
      "importance": "É o formato mais comum para bodies e responses em aplicações web.",
      "example": "{ \"status\": \"created\" }",
      "lessonContext": "A aula mostra o JSON como formato frequente tanto no envio quanto no retorno."
    },
    {
      "term": "Status Code",
      "acronym": "",
      "definition": "O número resumido que classifica o resultado da resposta HTTP.",
      "importance": "Ele acelera o diagnóstico antes mesmo de você ler o corpo da resposta.",
      "example": "404 Not Found",
      "lessonContext": "Usamos o status code como a primeira leitura mental do que aconteceu no ciclo."
    },
    {
      "term": "GET",
      "acronym": "",
      "definition": "Método HTTP focado em leitura de dados sem intenção de criação ou mutação do recurso.",
      "importance": "Ajuda a diferenciar buscas simples de operações com payload.",
      "example": "GET /api/products/42",
      "lessonContext": "Nesta aula, GET aparece como exemplo de request de leitura geralmente sem body."
    },
    {
      "term": "Interface",
      "acronym": "",
      "definition": "A camada visual que traduz a resposta técnica da API em elementos compreensíveis para pessoas.",
      "importance": "Separar interface de API evita culpar o lugar errado durante o debug.",
      "example": "Uma tela exibindo produto encontrado ou alerta de erro.",
      "lessonContext": "No ciclo desta aula, a interface é a última etapa da jornada."
    },
    {
      "term": "200 OK",
      "acronym": "",
      "definition": "Status de sucesso indicando que a requisição foi entendida e processada corretamente.",
      "importance": "É a assinatura clássica de uma leitura ou operação bem-sucedida.",
      "example": "GET /api/products/42 retornando dados do produto.",
      "lessonContext": "Usamos 200 OK como o cenário de retorno saudável da response."
    },
    {
      "term": "201 Created",
      "acronym": "",
      "definition": "Status de sucesso indicando que um novo recurso foi criado com sucesso.",
      "importance": "Ajuda a diferenciar criação de simples leitura.",
      "example": "POST /api/orders criando um novo pedido.",
      "lessonContext": "Nesta aula, 201 Created aparece como resposta típica de operações com body."
    },
    {
      "term": "400 Bad Request",
      "acronym": "",
      "definition": "Status de erro do cliente indicando que a requisição veio malformada ou incoerente com o contrato esperado.",
      "importance": "Mostra que o problema normalmente está na montagem da request.",
      "example": "JSON quebrado ou campo obrigatório ausente.",
      "lessonContext": "Aparece nas leituras de debug como pista de erro estrutural na ida."
    },
    {
      "term": "401 Unauthorized",
      "acronym": "",
      "definition": "Status que indica ausência ou invalidade da autenticação necessária.",
      "importance": "Ajuda a distinguir falha de identidade de outros erros de contrato.",
      "example": "Request sem token para uma rota protegida.",
      "lessonContext": "Surge como exemplo de falha detectada cedo pela API."
    },
    {
      "term": "404 Not Found",
      "acronym": "",
      "definition": "Status indicando que o recurso pedido ou a rota solicitada não foi encontrado.",
      "importance": "Evita confundir erro de endereço com queda total do sistema.",
      "example": "GET /api/products/99999 quando o produto não existe.",
      "lessonContext": "É um dos antipadrões centrais desta aula: 404 não é sinônimo de servidor caído."
    },
    {
      "term": "415 Unsupported Media Type",
      "acronym": "",
      "definition": "Status que informa que o formato do corpo enviado não foi aceito pelo servidor.",
      "importance": "Ensina a ler problemas de formato como erros de ida, não de processamento final.",
      "example": "Enviar JSON sem Content-Type adequado.",
      "lessonContext": "Aparece no player como exemplo de falha causada antes da lógica de negócio."
    },
    {
      "term": "500 Internal Server Error",
      "acronym": "",
      "definition": "Status que indica falha interna inesperada no lado do servidor.",
      "importance": "É o oposto de culpar o cliente sem evidência; aponta para investigação interna.",
      "example": "Exceção não tratada durante o processamento da regra.",
      "lessonContext": "Nesta aula, ele é usado para contrastar falha interna real com erros 4xx de montagem ou recurso."
    }
  ]$$,

  glossary_en = $$[
    {
      "term": "Request",
      "acronym": "",
      "definition": "The complete message sent by the client to ask for an action, data, or validation from the system.",
      "importance": "It is the starting point of every traditional HTTP flow.",
      "example": "GET /api/products/42 HTTP/1.1",
      "lessonContext": "In this lesson, the Request represents the trip from the client to the API."
    },
    {
      "term": "Response",
      "acronym": "",
      "definition": "The message returned by the server after the request has been analyzed and processed.",
      "importance": "It is what reports success, failure, and returned content.",
      "example": "HTTP/1.1 200 OK",
      "lessonContext": "In this lesson, the Response represents the return from the system back to the interface."
    },
    {
      "term": "Client",
      "acronym": "",
      "definition": "The side that takes the initiative in the conversation: browser, mobile app, frontend, or script.",
      "importance": "Without the client triggering the action, the HTTP cycle does not start.",
      "example": "A browser requesting the details page for a product.",
      "lessonContext": "The client assembles the Request and starts the journey."
    },
    {
      "term": "Server",
      "acronym": "",
      "definition": "The side that receives the request, applies rules, and returns a structured answer.",
      "importance": "It concentrates processing, validation, and data access.",
      "example": "A Spring backend receiving POST /api/orders.",
      "lessonContext": "In this lesson, the server is responsible for the logic of the operation."
    },
    {
      "term": "API",
      "acronym": "Application Programming Interface",
      "definition": "The communication layer that exposes controlled entry points for other systems or interfaces.",
      "importance": "It organizes endpoints, contracts, and validations before business logic runs.",
      "example": "A REST API with routes under /api/orders.",
      "lessonContext": "The API performs the Request triage before allowing processing."
    },
    {
      "term": "HTTP",
      "acronym": "Hypertext Transfer Protocol",
      "definition": "The application protocol used to exchange messages between client and server on the web.",
      "importance": "It defines the basic structure of the Request and the Response.",
      "example": "HTTP/1.1 201 Created",
      "lessonContext": "The whole lesson revolves around the outgoing and returning cycle of this protocol."
    },
    {
      "term": "HTTP Method",
      "acronym": "",
      "definition": "The verb that expresses the intent of the request, such as reading, creating, updating, or removing.",
      "importance": "It guides the API about the type of action expected.",
      "example": "GET, POST, PUT, and DELETE.",
      "lessonContext": "In this lesson, the method is the first clue for understanding the goal of the Request."
    },
    {
      "term": "Endpoint",
      "acronym": "",
      "definition": "The API entry point that combines an available route with access semantics to a resource.",
      "importance": "It helps separate resources and behaviors inside the API.",
      "example": "POST /api/orders",
      "lessonContext": "The endpoint is the operational destination the Request needs to reach."
    },
    {
      "term": "Path",
      "acronym": "",
      "definition": "The specific path inside the URL that points to a resource or action.",
      "importance": "A wrong path can break the flow even when the server is healthy.",
      "example": "/api/products/42",
      "lessonContext": "In this lesson, the path is the part of the address used to locate where the Request should land."
    },
    {
      "term": "Header",
      "acronym": "",
      "definition": "Each metadata line that accompanies an HTTP message.",
      "importance": "A header guides authentication, cache, content, and other invisible rules.",
      "example": "Content-Type: application/json",
      "lessonContext": "It serves as the basic unit for understanding message metadata."
    },
    {
      "term": "Headers",
      "acronym": "",
      "definition": "The set of header lines that accompanies a Request or a Response.",
      "importance": "Without them, client and server lose context about format, identity, and extra instructions.",
      "example": "Authorization, Accept, and Content-Type.",
      "lessonContext": "In this lesson, headers appear both on the way in and on the way out."
    },
    {
      "term": "Body",
      "acronym": "",
      "definition": "The area of the HTTP message where the core operation data can be carried.",
      "importance": "It is the classic place for create or update payloads.",
      "example": "{ \"productId\": 42, \"quantity\": 1 }",
      "lessonContext": "We compare when the body makes sense and when it is usually absent, such as in simple GETs."
    },
    {
      "term": "Payload",
      "acronym": "",
      "definition": "The useful load of the operation, usually carried inside the body.",
      "importance": "It separates business data from the rest of the message metadata.",
      "example": "The JSON containing productId and quantity.",
      "lessonContext": "In this lesson, the payload appears as the most sensitive part of write operations."
    },
    {
      "term": "JSON",
      "acronym": "JavaScript Object Notation",
      "definition": "A lightweight text format used to represent structured data in modern APIs.",
      "importance": "It is the most common format for bodies and responses in web applications.",
      "example": "{ \"status\": \"created\" }",
      "lessonContext": "The lesson shows JSON as a frequent format both on send and on return."
    },
    {
      "term": "Status Code",
      "acronym": "",
      "definition": "The summary number that classifies the outcome of an HTTP response.",
      "importance": "It accelerates diagnosis before you even read the response body.",
      "example": "404 Not Found",
      "lessonContext": "We use the status code as the first mental read of what happened in the cycle."
    },
    {
      "term": "GET",
      "acronym": "",
      "definition": "HTTP method focused on reading data without the intent of creating or mutating the resource.",
      "importance": "It helps distinguish simple fetches from operations carrying payloads.",
      "example": "GET /api/products/42",
      "lessonContext": "In this lesson, GET appears as the classic read request, usually without a body."
    },
    {
      "term": "Interface",
      "acronym": "",
      "definition": "The visual layer that translates the API's technical answer into elements understandable to people.",
      "importance": "Separating interface from API prevents blaming the wrong layer during debugging.",
      "example": "A screen showing a product found or an error alert.",
      "lessonContext": "In this lesson's cycle, the interface is the final stage of the journey."
    },
    {
      "term": "200 OK",
      "acronym": "",
      "definition": "Success status indicating that the request was understood and processed correctly.",
      "importance": "It is the classic signature of a successful read or operation.",
      "example": "GET /api/products/42 returning product data.",
      "lessonContext": "We use 200 OK as the healthy return scenario in the response."
    },
    {
      "term": "201 Created",
      "acronym": "",
      "definition": "Success status indicating that a new resource was created successfully.",
      "importance": "It helps distinguish creation from simple reading.",
      "example": "POST /api/orders creating a new order.",
      "lessonContext": "In this lesson, 201 Created appears as the typical response for operations with a body."
    },
    {
      "term": "400 Bad Request",
      "acronym": "",
      "definition": "Client error status indicating that the request was malformed or inconsistent with the expected contract.",
      "importance": "It usually shows the problem is in how the request was assembled.",
      "example": "Broken JSON or a missing required field.",
      "lessonContext": "It appears in the debugging reads as a clue of structural error on the way in."
    },
    {
      "term": "401 Unauthorized",
      "acronym": "",
      "definition": "Status indicating absence or invalidity of the required authentication.",
      "importance": "It helps distinguish identity failure from other contract mistakes.",
      "example": "Request without a token to a protected route.",
      "lessonContext": "It appears as an example of a failure caught early by the API."
    },
    {
      "term": "404 Not Found",
      "acronym": "",
      "definition": "Status indicating that the requested resource or route was not found.",
      "importance": "It avoids confusing address failure with total system outage.",
      "example": "GET /api/products/99999 when the product does not exist.",
      "lessonContext": "It is one of the central anti-patterns in this lesson: 404 is not the same as a crashed server."
    },
    {
      "term": "415 Unsupported Media Type",
      "acronym": "",
      "definition": "Status reporting that the format of the sent body was not accepted by the server.",
      "importance": "It teaches you to read format problems as input errors, not final processing failures.",
      "example": "Sending JSON without the proper Content-Type.",
      "lessonContext": "It appears in the player as an example of a failure caused before business logic."
    },
    {
      "term": "500 Internal Server Error",
      "acronym": "",
      "definition": "Status indicating an unexpected internal failure on the server side.",
      "importance": "It is the opposite of blaming the client without evidence; it points to internal investigation.",
      "example": "Unhandled exception during rule processing.",
      "lessonContext": "In this lesson, it is used to contrast real internal failure with 4xx request or resource mistakes."
    }
  ]$$,

  mini_quiz = $$[
    {
      "question": "Em uma leitura simples de catálogo, qual combinação costuma ser a mais coerente?",
      "options": [
        "GET sem Body, usando Path e possivelmente query string",
        "GET com Body obrigatório para cada busca",
        "Response primeiro e Request depois"
      ],
      "correctIndex": 0,
      "explanation": "Correto. Em leituras simples, o padrão mais comum é GET sem payload no Body."
    },
    {
      "question": "Se a API devolveu 404 Not Found para /api/products/99999, qual interpretação técnica é mais saudável?",
      "options": [
        "O servidor necessariamente caiu e a infraestrutura falhou",
        "A Request chegou, mas o recurso ou Path pedido não foi encontrado",
        "A Interface sempre está errada quando aparece 404"
      ],
      "correctIndex": 1,
      "explanation": "Exato. 404 normalmente aponta para rota ou recurso ausente, não para colapso total do servidor."
    },
    {
      "question": "Qual parte da Response deve ser lida primeiro para orientar o debug?",
      "options": [
        "O Status Code",
        "A cor do botão na interface",
        "O nome do arquivo do backend"
      ],
      "correctIndex": 0,
      "explanation": "Boa. O Status Code é o resumo executivo da resposta e encurta a investigação."
    }
  ]$$,

  mini_quiz_en = $$[
    {
      "question": "In a simple catalog read, which combination is usually the most coherent?",
      "options": [
        "GET without a Body, using Path and possibly query string",
        "GET with a mandatory Body for every fetch",
        "Response first and Request later"
      ],
      "correctIndex": 0,
      "explanation": "Correct. In simple reads, the most common pattern is GET without a Body payload."
    },
    {
      "question": "If the API returned 404 Not Found for /api/products/99999, which technical interpretation is healthier?",
      "options": [
        "The server necessarily crashed and the infrastructure failed",
        "The Request arrived, but the requested resource or Path was not found",
        "The Interface is always wrong whenever a 404 appears"
      ],
      "correctIndex": 1,
      "explanation": "Exactly. A 404 usually points to a missing route or resource, not a full server collapse."
    },
    {
      "question": "Which part of the Response should be read first to guide debugging?",
      "options": [
        "The Status Code",
        "The button color in the interface",
        "The backend file name"
      ],
      "correctIndex": 0,
      "explanation": "Right. The Status Code is the executive summary of the response and shortens the investigation."
    }
  ]$$,

  interactive_flow = NULL,
  interactive_flow_en = NULL
WHERE id = '44444444-4444-4444-4444-000000000002';
