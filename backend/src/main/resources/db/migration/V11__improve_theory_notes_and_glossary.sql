-- V11__improve_theory_notes_and_glossary.sql

-- 1. Enriquecer o glossário da primeira aula com o novo formato rico de JSON
UPDATE theory_lessons
SET glossary = '[
  {
    "term": "API",
    "acronym": "Application Programming Interface",
    "definition": "Uma interface que permite a comunicação entre dois sistemas de software diferentes de forma padronizada.",
    "importance": "Sem APIs, cada sistema seria uma ilha isolada. Elas permitem integrações rápidas e seguras.",
    "example": "O iFood usa a API do Google Maps para calcular o tempo de entrega."
  },
  {
    "term": "HTTP",
    "acronym": "Hypertext Transfer Protocol",
    "definition": "O protocolo base de comunicação da Web. Ele dita as regras de como clientes e servidores conversam.",
    "importance": "Garante que diferentes sistemas (como um iPhone e um servidor Linux) se entendam usando a mesma linguagem.",
    "example": "GET /products HTTP/1.1"
  },
  {
    "term": "JSON",
    "acronym": "JavaScript Object Notation",
    "definition": "Um formato de texto leve e legível para estruturar dados trocados entre sistemas.",
    "importance": "É o padrão universal moderno para APIs, substituindo o antigo XML, por ser simples e fácil de processar.",
    "example": "{\n  \"name\": \"Produto Demo\",\n  \"price\": 19.99\n}"
  },
  {
    "term": "Endpoint",
    "definition": "Um ponto de acesso específico em uma API, representado por uma URL e um Método.",
    "importance": "É a porta exata onde você bate para pedir um recurso específico.",
    "example": "https://api.integralab.com/users/123"
  },
  {
    "term": "Request",
    "definition": "A requisição ou pedido que um cliente (como o navegador ou o seu aplicativo) faz a um servidor.",
    "importance": "É o gatilho inicial de qualquer comunicação."
  },
  {
    "term": "Response",
    "definition": "A resposta devolvida pelo servidor após processar o pedido.",
    "importance": "Contém o resultado da operação, seja de sucesso ou erro, junto com os dados solicitados."
  },
  {
    "term": "Servidor",
    "definition": "O computador potente que fica aguardando e processando requisições, geralmente rodando o backend e conectado a bancos de dados."
  },
  {
    "term": "Banco de dados",
    "definition": "Onde os dados reais do sistema ficam armazenados permanentemente de forma estruturada."
  }
]',
glossary_en = '[
  {
    "term": "API",
    "acronym": "Application Programming Interface",
    "definition": "An interface that allows standardized communication between two different software systems.",
    "importance": "Without APIs, every system would be an isolated island. They enable fast and secure integrations.",
    "example": "Uber uses Google Maps API for navigation."
  },
  {
    "term": "HTTP",
    "acronym": "Hypertext Transfer Protocol",
    "definition": "The foundation of data communication on the Web. It sets the rules for how clients and servers talk.",
    "importance": "Ensures that different systems (like an iPhone and a Linux server) understand each other using the same language.",
    "example": "GET /products HTTP/1.1"
  },
  {
    "term": "JSON",
    "acronym": "JavaScript Object Notation",
    "definition": "A lightweight, human-readable text format for structuring data exchanged between systems.",
    "importance": "The modern universal standard for APIs, replacing XML due to its simplicity.",
    "example": "{\n  \"name\": \"Demo Product\",\n  \"price\": 19.99\n}"
  },
  {
    "term": "Endpoint",
    "definition": "A specific access point in an API, represented by a URL and a Method.",
    "importance": "It is the exact door you knock on to request a specific resource.",
    "example": "https://api.integralab.com/users/123"
  },
  {
    "term": "Request",
    "definition": "The request or command a client makes to a server.",
    "importance": "The initial trigger of any communication."
  },
  {
    "term": "Response",
    "definition": "The answer returned by the server after processing the request.",
    "importance": "Contains the result of the operation, whether success or error, along with the requested data."
  },
  {
    "term": "Servidor",
    "definition": "A powerful computer waiting for and processing requests, usually running the backend and connected to databases."
  },
  {
    "term": "Banco de dados",
    "definition": "Where the actual data of the system is stored permanently in a structured way."
  }
]',
content = '## O problema do mundo isolado

Imagine que você está usando um aplicativo de mapas no celular e quer encontrar o restaurante mais próximo. O seu celular não tem os dados de todos os restaurantes do mundo armazenados nele. Ele precisa perguntar a alguém. Esse "alguém" é um {{servidor}} central que guarda um enorme {{banco de dados}}.

Mas como o aplicativo (criado pela Apple ou Google) conversa com o banco de dados de restaurantes (que pode ser mantido pelo Yelp)?

Eles não falam a mesma linguagem nativa. É aí que entra a **{{API}}**.

>> A {{API}} é como um tradutor universal e um garçom trabalhando juntos. Ela escuta o pedido do seu celular, traduz para uma linguagem que o servidor entenda, busca o resultado, e entrega de volta para você de forma padronizada.

## O fluxo de uma integração

A comunicação moderna na internet acontece através do protocolo **{{HTTP}}**. Cada interação é dividida em duas partes principais:

1. **O Cliente faz um {{Request}}:** O seu celular envia uma mensagem para um **{{endpoint}}** específico (ex: `GET /restaurants`).
2. **A {{API}} recebe:** A API valida se o pedido é válido e repassa ao {{servidor}}.
3. **O {{Servidor}} processa:** Consulta o {{banco de dados}} e monta a lista de restaurantes.
4. **O Servidor devolve um {{Response}}:** A resposta retorna para o cliente.

## O formato universal: {{JSON}}

Para que a resposta da API seja facilmente lida por qualquer aplicativo (seja num iPhone, Android ou num site web), os dados são organizados no formato **{{JSON}}**.

Ele parece muito com listas e dicionários comuns, tornando a troca de informações ágil, leve e legível tanto para máquinas quanto para humanos.

>> Você verá muito {{JSON}} durante o IntegraLab. É a língua franca da comunicação moderna entre sistemas!',

content_en = '## The problem of an isolated world

Imagine you are using a map app on your phone and want to find the nearest restaurant. Your phone doesn''t store data for all restaurants in the world. It needs to ask someone. That "someone" is a central {{servidor}} that holds a massive {{banco de dados}}.

But how does the app (built by Apple or Google) talk to the restaurant database (maybe maintained by Yelp)?

They don''t speak the same native language. This is where the **{{API}}** comes in.

>> The {{API}} is like a universal translator and a waiter working together. It listens to your phone''s request, translates it so the server understands, gets the result, and delivers it back to you in a standardized way.

## The integration flow

Modern communication on the internet happens through the **{{HTTP}}** protocol. Every interaction is divided into two main parts:

1. **The Client makes a {{Request}}:** Your phone sends a message to a specific **{{endpoint}}** (e.g., `GET /restaurants`).
2. **The {{API}} receives it:** The API validates the request and passes it to the {{servidor}}.
3. **The {{Servidor}} processes it:** It queries the {{banco de dados}} and prepares the list of restaurants.
4. **The Server returns a {{Response}}:** The answer comes back to the client.

## The universal format: {{JSON}}

For the API response to be easily read by any app (whether on an iPhone, Android, or website), data is organized in the **{{JSON}}** format.

It looks a lot like simple lists and dictionaries, making data exchange fast, lightweight, and readable by both machines and humans.

>> You will see a lot of {{JSON}} during IntegraLab. It is the lingua franca of modern system communication!'

WHERE title = 'O que é uma API?';
