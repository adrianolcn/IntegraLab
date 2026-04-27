ALTER TABLE theory_lessons 
ADD COLUMN learning_objectives TEXT,
ADD COLUMN learning_objectives_en TEXT,
ADD COLUMN analogy TEXT,
ADD COLUMN analogy_en TEXT,
ADD COLUMN key_concepts_detailed TEXT,
ADD COLUMN key_concepts_detailed_en TEXT,
ADD COLUMN common_mistakes_detailed TEXT,
ADD COLUMN common_mistakes_detailed_en TEXT,
ADD COLUMN glossary TEXT,
ADD COLUMN glossary_en TEXT,
ADD COLUMN mini_quiz TEXT,
ADD COLUMN mini_quiz_en TEXT,
ADD COLUMN interactive_content TEXT,
ADD COLUMN interactive_content_en TEXT;

-- O que é uma API
UPDATE theory_lessons SET
learning_objectives = $$["Entender o conceito de API de forma não técnica", "Diferenciar API de banco de dados e de frontend", "Compreender o papel de uma API em sistemas do dia a dia"]$$,
learning_objectives_en = $$["Understand the concept of API in a non-technical way", "Differentiate API from databases and frontends", "Understand the role of an API in everyday systems"]$$,
analogy = $$"Imagine que você está em um restaurante. Você é o **cliente**, a cozinha é o **servidor** e o garçom é a **API**. Você não entra na cozinha para preparar a comida; você faz o pedido ao garçom, que leva a informação até a cozinha e traz o prato pronto de volta. No mundo digital, a API pega seu pedido, vai no servidor e traz os dados para sua tela."$$,
analogy_en = $$"Imagine you are in a restaurant. You are the **client**, the kitchen is the **server**, and the waiter is the **API**. You do not go into the kitchen to prepare the food; you place your order with the waiter, who takes the information to the kitchen and brings the finished dish back. In the digital world, the API takes your order, goes to the server, and brings the data to your screen."$$,
key_concepts_detailed = $$[
  {"name": "API", "definition": "Interface de Programação de Aplicações. Um contrato que permite sistemas diferentes conversarem.", "importance": "Sem elas, cada aplicativo precisaria reinventar a roda ou armazenar o mundo inteiro em seu próprio banco de dados.", "example": "A API do Google Maps usada dentro do aplicativo do Uber."},
  {"name": "Endpoint", "definition": "Uma URL específica dentro de uma API que expõe um serviço ou dado específico.", "importance": "Organiza e roteia as diferentes funcionalidades da API.", "example": "https://api.site.com/v1/usuarios"}
]$$,
key_concepts_detailed_en = $$[
  {"name": "API", "definition": "Application Programming Interface. A contract that allows different systems to talk.", "importance": "Without them, every app would need to reinvent the wheel or store the whole world in its own database.", "example": "The Google Maps API used inside the Uber app."},
  {"name": "Endpoint", "definition": "A specific URL within an API that exposes a specific service or data.", "importance": "Organizes and routes the different API functionalities.", "example": "https://api.site.com/v1/users"}
]$$,
common_mistakes_detailed = $$[
  {"mistake": "Achar que API é igual a Banco de Dados", "reason": "O banco apenas armazena. A API processa, valida as regras de negócio e decide quem pode ler o banco.", "correction": "Pense no banco como o estoque de ingredientes e na API como o cozinheiro/garçom."},
  {"mistake": "Confundir API com Frontend (Telas)", "reason": "A API não tem cores, botões ou imagens. Ela só trafega dados puros (normalmente em JSON).", "correction": "A API é o motor invisível. O frontend desenha a tela usando os dados que a API mandou."}
]$$,
common_mistakes_detailed_en = $$[
  {"mistake": "Thinking API is the same as Database", "reason": "The DB only stores. The API processes, validates business rules, and decides who can read the DB.", "correction": "Think of the DB as the ingredient stock and the API as the cook/waiter."},
  {"mistake": "Confusing API with Frontend (Screens)", "reason": "The API has no colors, buttons, or images. It only traffics raw data (usually in JSON).", "correction": "The API is the invisible engine. The frontend draws the screen using data the API sent."}
]$$,
glossary = $$[
  {"term": "JSON", "explanation": "Formato de texto leve para troca de dados.", "relation": "É a 'língua' que a maioria das APIs modernas fala."},
  {"term": "HTTP", "explanation": "Protocolo de transferência de hipertexto.", "relation": "É a 'estrada' por onde as mensagens da API viajam pela internet."}
]$$,
glossary_en = $$[
  {"term": "JSON", "explanation": "Lightweight text format for data exchange.", "relation": "It is the 'language' most modern APIs speak."},
  {"term": "HTTP", "explanation": "Hypertext transfer protocol.", "relation": "It is the 'highway' where API messages travel across the internet."}
]$$,
mini_quiz = $$[
  {
    "question": "Em uma analogia de restaurante, qual é o papel da API?",
    "options": ["O cliente fazendo o pedido", "O cozinheiro preparando a comida", "O garçom levando e trazendo os pedidos"],
    "correctIndex": 2,
    "explanation": "Isso! A API é o mensageiro (garçom) que conecta você (cliente) ao banco de dados/lógica (cozinha)."
  },
  {
    "question": "A API determina como o botão do site deve ser desenhado e pintado de azul?",
    "options": ["Sim, a API constrói a interface de usuário.", "Não, a API fornece apenas os dados cruos. O Frontend cuida da parte visual."],
    "correctIndex": 1,
    "explanation": "Correto! APIs trafegam dados (como JSON), não código visual."
  }
]$$,
mini_quiz_en = $$[
  {
    "question": "In a restaurant analogy, what is the role of the API?",
    "options": ["The client placing the order", "The cook preparing the food", "The waiter taking and bringing orders"],
    "correctIndex": 2,
    "explanation": "Yes! The API is the messenger (waiter) connecting you (client) to the database/logic (kitchen)."
  },
  {
    "question": "Does the API determine how the website button should be drawn and painted blue?",
    "options": ["Yes, the API builds the user interface.", "No, the API provides only raw data. The Frontend handles the visuals."],
    "correctIndex": 1,
    "explanation": "Correct! APIs traffic data (like JSON), not visual code."
  }
]$$
WHERE id = '44444444-4444-4444-4444-000000000001';

-- Métodos HTTP
UPDATE theory_lessons SET
learning_objectives = $$["Compreender o conceito de verbo HTTP", "Diferenciar entre GET, POST, PUT, PATCH e DELETE", "Entender o que é idempotência e segurança nas requisições"]$$,
learning_objectives_en = $$["Understand the concept of HTTP verb", "Differentiate between GET, POST, PUT, PATCH, and DELETE", "Understand idempotency and safety in requests"]$$,
analogy = $$"Pense nos métodos HTTP como ações do CRUD (Create, Read, Update, Delete) em um arquivo de Word. **GET** é apenas ler o documento aberto. **POST** é criar um novo documento do zero. **PUT** é sobrescrever o documento antigo com uma versão inteiramente nova. **PATCH** é abrir o documento, corrigir apenas uma vírgula e salvar. **DELETE** é arrastar o documento para a lixeira."$$,
analogy_en = $$"Think of HTTP methods as CRUD actions (Create, Read, Update, Delete) on a Word document. **GET** is just reading the open document. **POST** is creating a new document from scratch. **PUT** is overwriting the old document with an entirely new version. **PATCH** is opening the document, fixing just one comma, and saving. **DELETE** is dragging the document to the trash."$$,
interactive_content = $$[
  {
    "method": "GET",
    "purpose": "Buscar/Ler informações.",
    "whenToUse": "Quando você quer visualizar uma lista de produtos ou detalhes do seu perfil.",
    "analogy": "Ler um livro na biblioteca.",
    "pathExample": "GET /api/produtos",
    "request": "GET /api/produtos HTTP/1.1\nHost: api.loja.com\nAuthorization: Bearer 123",
    "response": "HTTP/1.1 200 OK\n\n[\n  { \"id\": 1, \"nome\": \"Notebook\" }\n]",
    "commonMistake": "Enviar senhas na URL de um GET (os logs do servidor vão expor sua senha para qualquer dev)."
  },
  {
    "method": "POST",
    "purpose": "Criar novas informações.",
    "whenToUse": "Para finalizar uma compra, fazer cadastro ou enviar um e-mail.",
    "analogy": "Entregar uma carta nos correios para ser enviada.",
    "pathExample": "POST /api/usuarios",
    "request": "POST /api/usuarios HTTP/1.1\nContent-Type: application/json\n\n{\n  \"email\": \"novo@email.com\"\n}",
    "response": "HTTP/1.1 201 Created\n\n{\n  \"id\": 99,\n  \"email\": \"novo@email.com\"\n}",
    "commonMistake": "Clicar 2 vezes rápido no botão 'Comprar' disparando 2 POSTs seguidos. Como POST não é idempotente, o sistema criará 2 compras."
  },
  {
    "method": "PUT",
    "purpose": "Substituir inteiramente uma informação.",
    "whenToUse": "Para editar um perfil inteiro do zero.",
    "analogy": "Trocar a roda inteira do carro quando o pneu fura.",
    "pathExample": "PUT /api/usuarios/99",
    "request": "PUT /api/usuarios/99 HTTP/1.1\nContent-Type: application/json\n\n{\n  \"nome\": \"Carlos Silva\",\n  \"idade\": 31\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"message\": \"Usuário atualizado com sucesso\"\n}",
    "commonMistake": "Esquecer um campo no JSON do PUT. Muitas APIs vão apagar a informação que você não mandou, por ser uma substituição total."
  },
  {
    "method": "PATCH",
    "purpose": "Alterar parcialmente uma informação.",
    "whenToUse": "Quando você quer mudar apenas a sua foto de perfil, mantendo todo o resto igual.",
    "analogy": "Colocar um band-aid ou trocar apenas o remendo do pneu.",
    "pathExample": "PATCH /api/usuarios/99",
    "request": "PATCH /api/usuarios/99 HTTP/1.1\nContent-Type: application/json\n\n{\n  \"telefone\": \"(11) 99999-9999\"\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"message\": \"Telefone atualizado\"\n}",
    "commonMistake": "Usar PUT quando na verdade você só queria alterar 1 campo pequeno. PATCH economiza banda e previne bugs."
  },
  {
    "method": "DELETE",
    "purpose": "Apagar uma informação.",
    "whenToUse": "Ao cancelar uma conta ou excluir uma mensagem do WhatsApp.",
    "analogy": "Jogar algo na lixeira.",
    "pathExample": "DELETE /api/mensagens/44",
    "request": "DELETE /api/mensagens/44 HTTP/1.1\nAuthorization: Bearer 123",
    "response": "HTTP/1.1 204 No Content\n\n",
    "commonMistake": "Não colocar o ID na rota (Ex: fazer DELETE /api/usuarios). Se a API for mal programada, isso poderia apagar a tabela inteira do banco."
  }
]$$,
interactive_content_en = $$[
  {
    "method": "GET",
    "purpose": "Fetch/Read information.",
    "whenToUse": "When you want to view a list of products or your profile details.",
    "analogy": "Reading a book in the library.",
    "pathExample": "GET /api/products",
    "request": "GET /api/products HTTP/1.1\nHost: api.store.com\nAuthorization: Bearer 123",
    "response": "HTTP/1.1 200 OK\n\n[\n  { \"id\": 1, \"name\": \"Laptop\" }\n]",
    "commonMistake": "Sending passwords in a GET URL (server logs will expose your password to any dev)."
  },
  {
    "method": "POST",
    "purpose": "Create new information.",
    "whenToUse": "To finish a purchase, register an account, or send an email.",
    "analogy": "Dropping a letter at the post office to be mailed.",
    "pathExample": "POST /api/users",
    "request": "POST /api/users HTTP/1.1\nContent-Type: application/json\n\n{\n  \"email\": \"new@email.com\"\n}",
    "response": "HTTP/1.1 201 Created\n\n{\n  \"id\": 99,\n  \"email\": \"new@email.com\"\n}",
    "commonMistake": "Double-clicking the 'Buy' button fast, firing 2 POSTs in a row. Since POST is not idempotent, the system will create 2 purchases."
  },
  {
    "method": "PUT",
    "purpose": "Entirely replace information.",
    "whenToUse": "To edit an entire profile from scratch.",
    "analogy": "Changing the entire wheel of a car when a tire goes flat.",
    "pathExample": "PUT /api/users/99",
    "request": "PUT /api/users/99 HTTP/1.1\nContent-Type: application/json\n\n{\n  \"name\": \"John Doe\",\n  \"age\": 31\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"message\": \"User updated successfully\"\n}",
    "commonMistake": "Forgetting a field in the PUT JSON. Many APIs will erase the information you didn't send, since it's a total replacement."
  },
  {
    "method": "PATCH",
    "purpose": "Partially update information.",
    "whenToUse": "When you just want to change your profile picture, keeping everything else the same.",
    "analogy": "Putting a band-aid on or patching just the tire puncture.",
    "pathExample": "PATCH /api/users/99",
    "request": "PATCH /api/users/99 HTTP/1.1\nContent-Type: application/json\n\n{\n  \"phone\": \"555-0100\"\n}",
    "response": "HTTP/1.1 200 OK\n\n{\n  \"message\": \"Phone updated\"\n}",
    "commonMistake": "Using PUT when you actually only wanted to change 1 small field. PATCH saves bandwidth and prevents bugs."
  },
  {
    "method": "DELETE",
    "purpose": "Erase information.",
    "whenToUse": "When canceling an account or deleting a WhatsApp message.",
    "analogy": "Throwing something in the trash bin.",
    "pathExample": "DELETE /api/messages/44",
    "request": "DELETE /api/messages/44 HTTP/1.1\nAuthorization: Bearer 123",
    "response": "HTTP/1.1 204 No Content\n\n",
    "commonMistake": "Not putting the ID in the route (E.g., doing DELETE /api/users). If the API is poorly programmed, this could erase the entire database table."
  }
]$$,
glossary = $$[
  {"term": "Idempotência", "explanation": "Uma operação que produz o mesmo resultado no sistema se for executada 1 ou 1000 vezes (ex: GET, PUT).", "relation": "POST não é idempotente; criar 5 vezes gera 5 registros."},
  {"term": "REST", "explanation": "Estilo arquitetural que define como os métodos HTTP devem mapear para os recursos do banco de dados.", "relation": "É a base para usar GET/POST/PUT/DELETE corretamente."}
]$$,
glossary_en = $$[
  {"term": "Idempotency", "explanation": "An operation that produces the same system result whether executed 1 or 1000 times (e.g. GET, PUT).", "relation": "POST is not idempotent; creating 5 times generates 5 records."},
  {"term": "REST", "explanation": "Architectural style defining how HTTP methods map to database resources.", "relation": "It is the foundation for using GET/POST/PUT/DELETE correctly."}
]$$,
mini_quiz = $$[
  {
    "question": "Se a minha internet falhar no meio e meu celular reenviar automaticamente a requisição, qual método me garante que eu não serei cobrado duas vezes?",
    "options": ["POST", "PUT", "Não importa o método"],
    "correctIndex": 1,
    "explanation": "Correto! O PUT é idempotente (substituição). Se ele rodar 2 vezes, a conta final do usuário será a mesma. O POST criaria uma segunda cobrança!"
  }
]$$,
mini_quiz_en = $$[
  {
    "question": "If my internet fails midway and my phone automatically resends the request, which method guarantees I won't be charged twice?",
    "options": ["POST", "PUT", "The method doesn't matter"],
    "correctIndex": 1,
    "explanation": "Correct! PUT is idempotent (replacement). If it runs 2 times, the final user state is the same. POST would create a second charge!"
  }
]$$
WHERE id = '44444444-4444-4444-4444-000000000003';

-- Request e Response
UPDATE theory_lessons SET
learning_objectives = $$["Compreender o fluxo bidirecional de comunicação web", "Diferenciar as responsabilidades do Cliente e do Servidor", "Identificar a estrutura de uma Requisição e de uma Resposta"]$$,
learning_objectives_en = $$["Understand the bidirectional web communication flow", "Differentiate Client and Server responsibilities", "Identify the structure of a Request and a Response"]$$,
analogy = $$"Imagine o ciclo de Request e Response como uma ligação telefônica para a pizzaria. Você (Cliente) disca o número e pede uma pizza de Calabresa (Request). O atendente (Servidor) processa o pedido na cozinha e responde: 'Sua pizza chega em 30 minutos' (Response). O atendente da pizzaria não liga para você do nada para te entregar uma pizza que você não pediu; na web, o servidor só responde quando você pergunta."$$,
analogy_en = $$"Imagine the Request and Response cycle like a phone call to a pizzeria. You (Client) dial the number and order a Pepperoni pizza (Request). The attendant (Server) processes the order in the kitchen and replies: 'Your pizza will arrive in 30 minutes' (Response). The pizzeria attendant does not call you out of nowhere to deliver a pizza you didn't order; on the web, the server only responds when you ask."$$,
key_concepts_detailed = $$[
  {"name": "Request", "definition": "A mensagem enviada pelo cliente pedindo uma ação ou dados.", "importance": "Sem uma Request, o servidor fica inativo aguardando comandos.", "example": "Apertar o botão 'Atualizar feed' no Instagram cria uma Request."}
]$$,
key_concepts_detailed_en = $$[
  {"name": "Request", "definition": "The message sent by the client asking for an action or data.", "importance": "Without a Request, the server remains idle waiting for commands.", "example": "Pressing the 'Refresh feed' button on Instagram creates a Request."}
]$$,
mini_quiz = $$[
  {
    "question": "Um servidor web pode iniciar uma comunicação tradicional HTTP sozinho (enviar dados sem o cliente pedir)?",
    "options": ["Sim, se a conexão for rápida", "Não, o modelo HTTP clássico exige que o cliente faça a Request primeiro"],
    "correctIndex": 1,
    "explanation": "Correto! O servidor HTTP tradicional é reativo."
  }
]$$,
mini_quiz_en = $$[
  {
    "question": "Can a web server initiate a traditional HTTP communication by itself (send data without the client asking)?",
    "options": ["Yes, if the connection is fast", "No, the classic HTTP model requires the client to make the Request first"],
    "correctIndex": 1,
    "explanation": "Correct! The traditional HTTP server is reactive."
  }
]$$
WHERE id = '44444444-4444-4444-4444-000000000002';

-- Headers e Body JSON
UPDATE theory_lessons SET
learning_objectives = $$["Entender onde vão os metadados vs dados reais", "Compreender o uso do Content-Type", "Aprender o que é JSON e sua sintaxe básica"]$$,
learning_objectives_en = $$["Understand where metadata vs real data goes", "Understand the use of Content-Type", "Learn what JSON is and its basic syntax"]$$,
analogy = $$"Pense em uma requisição HTTP como uma caixa enviada pelo correio. Os **Headers** são a etiqueta do lado de fora da caixa: dizem quem mandou, o CEP de destino, e se o pacote é frágil ou pesado. O **Body** é o que está dentro da caixa (ex: um par de sapatos). O carteiro (internet) só precisa ler a etiqueta (Headers) para entregar, mas quem recebe vai abrir a caixa para pegar o sapato (Body)."$$,
analogy_en = $$"Think of an HTTP request like a box sent by mail. The **Headers** are the shipping label on the outside of the box: they say who sent it, the destination zip code, and if the package is fragile or heavy. The **Body** is what's inside the box (e.g. a pair of shoes). The mailman (internet) only needs to read the label (Headers) to deliver it, but the recipient will open the box to get the shoes (Body)."$$,
key_concepts_detailed = $$[
  {"name": "Content-Type", "definition": "Um Header obrigatório quando enviamos um Body, que avisa o servidor sobre o formato do arquivo (ex: application/json).", "importance": "Se você enviar um JSON sem avisar, o servidor pode achar que é texto puro e quebrar a leitura.", "example": "Content-Type: application/json"}
]$$,
key_concepts_detailed_en = $$[
  {"name": "Content-Type", "definition": "A mandatory Header when sending a Body, warning the server about the file format (e.g. application/json).", "importance": "If you send JSON without warning, the server might think it's plain text and fail to read it.", "example": "Content-Type: application/json"}
]$$,
mini_quiz = $$[
  {
    "question": "Onde devo colocar uma senha sensível na hora do login?",
    "options": ["Na URL (Path)", "No Header", "No Body de um POST"],
    "correctIndex": 2,
    "explanation": "Correto! O Body (criptografado por HTTPS) é o lugar seguro para payloads, não URLs ou Headers."
  }
]$$,
mini_quiz_en = $$[
  {
    "question": "Where should I put a sensitive password when logging in?",
    "options": ["In the URL (Path)", "In the Header", "In the Body of a POST"],
    "correctIndex": 2,
    "explanation": "Correct! The Body (encrypted via HTTPS) is the safe place for payloads, not URLs or Headers."
  }
]$$
WHERE id = '44444444-4444-4444-4444-000000000004';

-- Status Codes
UPDATE theory_lessons SET
learning_objectives = $$["Memorizar as categorias 2xx, 3xx, 4xx, 5xx", "Saber diferenciar erro de cliente vs servidor", "Aprender a usar Status Codes no diagnóstico rápido"]$$,
learning_objectives_en = $$["Memorize the 2xx, 3xx, 4xx, 5xx categories", "Differentiate client vs server error", "Learn to use Status Codes for quick diagnostics"]$$,
analogy = $$"O Status Code é como o semáforo de trânsito da web. Verde (200) significa 'Pode passar, tudo certo'. Amarelo (300) significa 'Atenção, o caminho mudou'. Vermelho (400) significa 'Pare! Seu carro está quebrado'. E o 500 significa que a ponte quebrou e o problema é na prefeitura."$$,
analogy_en = $$"The Status Code is like the web's traffic light. Green (200) means 'Go ahead, all good'. Yellow (300) means 'Attention, the route changed'. Red (400) means 'Stop! Your car is broken'. And 500 means the bridge collapsed and the problem is with the city hall."$$,
mini_quiz = $$[
  {
    "question": "Se você recebe um 404, de quem é a culpa?",
    "options": ["Do servidor, ele desligou.", "Sua (cliente), você pediu algo em uma rota que não existe."],
    "correctIndex": 1,
    "explanation": "Exato! A família 4xx indica erros originados pelo cliente."
  }
]$$,
mini_quiz_en = $$[
  {
    "question": "If you receive a 404, whose fault is it?",
    "options": ["The server's, it shut down.", "Yours (client), you requested something on a route that doesn't exist."],
    "correctIndex": 1,
    "explanation": "Exactly! The 4xx family indicates errors originating from the client."
  }
]$$
WHERE id = '44444444-4444-4444-4444-000000000005';

-- Autenticação Bearer
UPDATE theory_lessons SET
learning_objectives = $$["Entender a diferença entre Autenticação e Autorização", "Aprender a usar o formato Bearer Token", "Compreender falhas comuns (401 vs 403)"]$$,
learning_objectives_en = $$["Understand the difference between Authentication and Authorization", "Learn to use the Bearer Token format", "Understand common failures (401 vs 403)"]$$,
analogy = $$"Autenticação é como o crachá da empresa. A API não sabe quem é você pela sua cara, ela confia no crachá (Token) que o RH te deu quando você fez login. Você anexa esse crachá (Header Authorization) na sua camisa em toda porta que tenta abrir. Se tentar abrir a sala do cofre sem ser diretor, o leitor acende luz vermelha (403 Forbidden)."$$,
analogy_en = $$"Authentication is like a company badge. The API doesn't know who you are by your face, it trusts the badge (Token) HR gave you when you logged in. You attach this badge (Authorization Header) to your shirt at every door you try to open. If you try to open the vault door without being a director, the reader flashes red (403 Forbidden)."$$,
mini_quiz = $$[
  {
    "question": "Qual é a diferença de 401 e 403?",
    "options": ["401 = Token vencido/ausente; 403 = O token é válido, mas o usuário não tem permissão para esta ação.", "São a mesma coisa."],
    "correctIndex": 0,
    "explanation": "Correto! 401: Quem é você? 403: Eu sei quem você é, mas não posso deixar você entrar."
  }
]$$,
mini_quiz_en = $$[
  {
    "question": "What is the difference between 401 and 403?",
    "options": ["401 = Missing/expired token; 403 = The token is valid, but the user has no permission for this action.", "They are the same thing."],
    "correctIndex": 0,
    "explanation": "Correct! 401: Who are you? 403: I know who you are, but I can't let you in."
  }
]$$
WHERE id = '44444444-4444-4444-4444-000000000006';

-- Debug
UPDATE theory_lessons SET
learning_objectives = $$["Aprender a ler erros como pistas", "Construir um checklist mental de debug", "Perder o medo de telas de erro vermelhas"]$$,
learning_objectives_en = $$["Learn to read errors as clues", "Build a mental debugging checklist", "Lose the fear of red error screens"]$$,
analogy = $$"Programar sem debugar é como dirigir de olhos vendados. Se o carro bater (erro), você não deve ficar com raiva do muro. Você precisa tirar a venda (abrir o DevTools do navegador), olhar o painel (Status Code) e verificar o que o painel diz (Response Body)."$$,
analogy_en = $$"Programming without debugging is like driving blindfolded. If the car crashes (error), you shouldn't get mad at the wall. You need to take the blindfold off (open Browser DevTools), look at the dashboard (Status Code), and check what the dashboard says (Response Body)."$$,
mini_quiz = $$[
  {
    "question": "Qual a primeira coisa a checar quando uma requisição falha?",
    "options": ["O código no arquivo do backend", "Aba Network do navegador (Status e Response Body)"],
    "correctIndex": 1,
    "explanation": "A regra de ouro: sempre confie na Aba Network. Ela não mente!"
  }
]$$,
mini_quiz_en = $$[
  {
    "question": "What is the first thing to check when a request fails?",
    "options": ["The code in the backend file", "Browser's Network tab (Status and Response Body)"],
    "correctIndex": 1,
    "explanation": "The golden rule: always trust the Network Tab. It doesn't lie!"
  }
]$$
WHERE id = '44444444-4444-4444-4444-000000000007';
