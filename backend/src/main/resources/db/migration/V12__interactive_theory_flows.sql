-- V12__interactive_theory_flows.sql

ALTER TABLE theory_lessons 
ADD COLUMN IF NOT EXISTS interactive_flow TEXT,
ADD COLUMN IF NOT EXISTS interactive_flow_en TEXT;

UPDATE theory_lessons
SET content = '## Um mundo que precisa conversar

Imagine todos os sistemas de software isolados. O seu celular seria uma caixa inútil sem acesso a redes sociais, bancos ou mapas em tempo real. Para que o mundo digital funcione, os sistemas precisam conversar entre si constantemente.

No entanto, diferentes sistemas são escritos em linguagens diferentes e rodam em ambientes variados. Um iPhone não entende nativamente a linguagem do servidor de um banco. É aqui que entra a **{{API}}**.

>> A {{API}} é um contrato rigoroso de comunicação. Ela atua como uma **camada intermediária** entre quem pede os dados (cliente) e quem tem os dados (servidor).

Em vez de permitir que qualquer aplicativo mexa diretamente no banco de dados de um sistema, a empresa cria uma {{API}} — uma interface programável, padronizada e segura. A API diz: "Se você quiser informações, me peça neste formato. Eu validarei seu pedido e devolverei os dados organizados".

## O papel da API na prática

A API é essencialmente uma **ponte padronizada**. O trabalho dela pode ser resumido em quatro verbos:

1. **Receber** a requisição estruturada do cliente.
2. **Validar** se o cliente tem permissão e se o formato está correto.
3. **Processar** (ou encaminhar para o servidor processar) a regra de negócio.
4. **Responder** devolvendo a confirmação e os dados no formato {{JSON}}.',

content_en = '## A world that needs to talk

Imagine all software systems isolated. Your phone would be a useless box without access to social networks, banks, or real-time maps. For the digital world to work, systems need to talk to each other constantly.

However, different systems are written in different languages and run in varied environments. An iPhone does not natively understand a bank''s server language. This is where the **{{API}}** comes in.

>> The {{API}} is a strict communication contract. It acts as an **intermediary layer** between whoever asks for data (client) and whoever has the data (server).

Instead of letting any app mess directly with a system''s database, a company builds an {{API}} — a programmable, standardized, and secure interface. The API says: "If you want information, ask me in this format. I will validate your request and return organized data".

## The role of an API in practice

The API is essentially a **standardized bridge**. Its job can be summarized in four verbs:

1. **Receive** the structured request from the client.
2. **Validate** if the client has permission and if the format is correct.
3. **Process** (or forward to the server to process) the business logic.
4. **Respond** by returning confirmation and data in {{JSON}} format.',

interactive_flow = '[
  {
    "id": "client",
    "title": "1. Cliente inicia a ação",
    "description": "O usuário ou aplicação decide que precisa de algo.",
    "details": "Tudo começa no cliente. Pode ser um navegador, um celular, ou até um script rodando escondido. O cliente é quem toma a iniciativa porque precisa de um dado ou quer executar uma ação.",
    "importance": "Sem o cliente, a API nunca acorda. A Web é movida a requisições ativas.",
    "example": "Você clica no botão ''Buscar Restaurantes'' no seu app do iFood.",
    "relatedTerms": ["Request", "API"],
    "nextStepIds": ["request"]
  },
  {
    "id": "request",
    "title": "2. O Request",
    "description": "O cliente monta o pedido estruturado.",
    "details": "O cliente empacota sua necessidade em um formato padrão via HTTP. Ele define um método (como GET para buscar dados) e anexa informações no Header e Body se necessário.",
    "importance": "O Request é a mensagem que viaja pelos cabos de rede ou sinais de Wi-Fi. Ele carrega a intenção e os dados do usuário.",
    "example": "GET /restaurants?city=sp HTTP/1.1",
    "relatedTerms": ["HTTP", "Endpoint", "Header"],
    "nextStepIds": ["endpoint"]
  },
  {
    "id": "endpoint",
    "title": "3. O Endpoint",
    "description": "O endereço exato da intenção.",
    "details": "A requisição viaja pela internet e bate em uma porta específica. O Endpoint é a combinação da URL e do caminho que indica exatamente qual recurso está sendo acessado.",
    "importance": "Organiza a API. Em vez de uma porta bagunçada, o Endpoint garante que buscas de produtos não se misturem com criação de usuários.",
    "example": "api.ifood.com.br/v1/restaurants",
    "relatedTerms": ["API", "Request"],
    "nextStepIds": ["api"]
  },
  {
    "id": "api",
    "title": "4. A API valida",
    "description": "O porteiro digital inspeciona a requisição.",
    "details": "A API é a camada que fica na porta do servidor. Ela recebe a requisição no Endpoint e valida: O formato está correto? Tem token de autenticação? O cliente tem permissão para isso?",
    "importance": "Protege os dados internos da empresa e garante que apenas pedidos estruturados e autorizados passem.",
    "example": "A API verifica se o Token enviado no cabeçalho Authorization é válido.",
    "relatedTerms": ["Token", "Servidor", "REST"],
    "nextStepIds": ["server"]
  },
  {
    "id": "server",
    "title": "5. O Servidor processa",
    "description": "A regra de negócio entra em ação.",
    "details": "Com o pedido validado, a API passa a bola para a lógica do servidor (backend). Aqui, cálculos complexos são feitos e a regra de negócio determina o que deve acontecer.",
    "importance": "É o cérebro da operação. O servidor tem o poder computacional que o celular não tem.",
    "example": "O servidor descobre a latitude/longitude de São Paulo e calcula um raio de 5km.",
    "relatedTerms": ["Banco de dados", "API"],
    "nextStepIds": ["db"]
  },
  {
    "id": "db",
    "title": "6. O Banco de Dados",
    "description": "O armazenamento da verdade.",
    "details": "O servidor interage com o banco de dados para gravar novas informações ou resgatar dados solicitados. O banco é rápido e estruturado (ex: PostgreSQL, MongoDB).",
    "importance": "A memória permanente do sistema. Se o servidor desligar, os dados continuam lá.",
    "example": "SELECT * FROM restaurants WHERE city = ''sp'';",
    "relatedTerms": ["Servidor", "JSON"],
    "nextStepIds": ["response"]
  },
  {
    "id": "response",
    "title": "7. O Response",
    "description": "A resposta volta pelo mesmo caminho.",
    "details": "O servidor monta o resultado, e a API o devolve para a rede empacotado em um Response HTTP. Isso inclui um Status Code (ex: 200 OK) e o corpo da resposta em JSON.",
    "importance": "O cliente precisa saber se o pedido deu certo ou se ocorreu um erro (como um 404 Não Encontrado).",
    "example": "HTTP/1.1 200 OK\\nContent-Type: application/json\\n\\n[{\"name\": \"Pizzaria Bairro\"}]",
    "relatedTerms": ["Status Code", "Body", "JSON"],
    "nextStepIds": ["interface"]
  },
  {
    "id": "interface",
    "title": "8. A Interface",
    "description": "O resultado brilha na tela.",
    "details": "O celular recebe o JSON puro e o transforma em uma interface bonita. Onde a API mandou um simples texto e coordenadas, o celular desenha um mapa animado e cards interativos.",
    "importance": "A ponte entre o mundo das máquinas (JSON/API) e o mundo humano (cores/botões).",
    "example": "O iFood exibe a lista de restaurantes com fotos e avaliações na tela do seu celular.",
    "relatedTerms": ["API", "JSON", "Response"],
    "nextStepIds": []
  }
]',

interactive_flow_en = '[
  {
    "id": "client",
    "title": "1. Client initiates action",
    "description": "The user or app decides it needs something.",
    "details": "Everything starts at the client. It could be a browser, a mobile phone, or even a hidden script. The client takes the initiative because it needs data or wants to perform an action.",
    "importance": "Without the client, the API never wakes up. The Web is driven by active requests.",
    "example": "You click the ''Search Restaurants'' button in your UberEats app.",
    "relatedTerms": ["Request", "API"],
    "nextStepIds": ["request"]
  },
  {
    "id": "request",
    "title": "2. The Request",
    "description": "The client builds the structured demand.",
    "details": "The client packages its need into a standard HTTP format. It defines a method (like GET to fetch data) and attaches info in the Header and Body if needed.",
    "importance": "The Request is the message traveling through network cables or Wi-Fi signals. It carries the user''s intent.",
    "example": "GET /restaurants?city=ny HTTP/1.1",
    "relatedTerms": ["HTTP", "Endpoint", "Header"],
    "nextStepIds": ["endpoint"]
  },
  {
    "id": "endpoint",
    "title": "3. The Endpoint",
    "description": "The exact address of the intent.",
    "details": "The request travels through the internet and knocks on a specific door. The Endpoint is the combination of URL and path indicating exactly which resource is accessed.",
    "importance": "Organizes the API. Keeps product searches separated from user creations.",
    "example": "api.ubereats.com/v1/restaurants",
    "relatedTerms": ["API", "Request"],
    "nextStepIds": ["api"]
  },
  {
    "id": "api",
    "title": "4. API Validates",
    "description": "The digital bouncer inspects the request.",
    "details": "The API sits at the server''s door. It receives the request and validates: Is the format correct? Is there an auth token? Does the client have permission?",
    "importance": "Protects company internal data and ensures only structured, authorized requests get through.",
    "example": "The API checks if the Token sent in the Authorization header is valid.",
    "relatedTerms": ["Token", "Servidor", "REST"],
    "nextStepIds": ["server"]
  },
  {
    "id": "server",
    "title": "5. Server Processes",
    "description": "Business logic kicks in.",
    "details": "With the request validated, the API passes the ball to the backend server logic. Complex calculations occur, and business rules determine what happens next.",
    "importance": "The brains of the operation. The server has the computational power the phone lacks.",
    "example": "The server finds NY coordinates and calculates a 5-mile radius.",
    "relatedTerms": ["Banco de dados", "API"],
    "nextStepIds": ["db"]
  },
  {
    "id": "db",
    "title": "6. Database",
    "description": "The storage of truth.",
    "details": "The server interacts with the database to record new info or fetch requested data. Databases are fast and structured (e.g., PostgreSQL, MongoDB).",
    "importance": "The system''s permanent memory. If the server reboots, data remains.",
    "example": "SELECT * FROM restaurants WHERE city = ''ny'';",
    "relatedTerms": ["Servidor", "JSON"],
    "nextStepIds": ["response"]
  },
  {
    "id": "response",
    "title": "7. The Response",
    "description": "The answer travels back the same way.",
    "details": "The server builds the result, and the API packages it into an HTTP Response. This includes a Status Code (e.g., 200 OK) and the response body in JSON.",
    "importance": "The client must know if the request succeeded or failed (like a 404 Not Found).",
    "example": "HTTP/1.1 200 OK\\nContent-Type: application/json\\n\\n[{\"name\": \"Joe''s Pizza\"}]",
    "relatedTerms": ["Status Code", "Body", "JSON"],
    "nextStepIds": ["interface"]
  },
  {
    "id": "interface",
    "title": "8. The Interface",
    "description": "The result shines on screen.",
    "details": "The phone receives pure JSON and transforms it into a beautiful interface. Where the API sent raw text, the phone draws animated maps and cards.",
    "importance": "The bridge between the machine world (JSON/API) and the human world (colors/buttons).",
    "example": "UberEats shows the list of restaurants with photos and ratings on your screen.",
    "relatedTerms": ["API", "JSON", "Response"],
    "nextStepIds": []
  }
]'

WHERE title = 'O que é uma API?';
