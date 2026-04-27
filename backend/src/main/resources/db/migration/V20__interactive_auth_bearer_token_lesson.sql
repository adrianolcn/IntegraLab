-- V20__interactive_auth_bearer_token_lesson.sql

UPDATE theory_lessons
SET content = '## A Jornada da Identidade

Nenhuma {{API}} segura permite que visitantes anônimos acessem ou destruam dados privados. O servidor precisa saber quem você é.

Acompanhe passo a passo como o fluxo da {{Autenticação}} acontece na prática, desde o envio das {{Credenciais}} até a liberação do acesso.

[[AUTH_FLOW]]

## Autenticação vs Autorização

É impossível avançar sem entender a diferença entre provar quem você é e provar o que você tem permissão para fazer. Muitos desenvolvedores seniores ainda confundem esses dois conceitos.

[[AUTH_VS_AUTHORIZATION]]

## O Portador: Bearer Token

Depois do login, você recebe um {{Token}} (frequentemente um {{JWT}}). Este token representa a sua {{Sessão}}. 

Por padrão global, esse token NUNCA deve ser enviado na URL ou no {{Body}}. Ele deve viajar protegido e padronizado dentro do {{Header}} de {{Authorization}}.

[[BEARER_TOKEN_ANATOMY]]

## Os Guardiões da Porta: 401 e 403

Quando a verificação falha, a {{Response}} da API trará um {{Status Code}} fatal.

Entenda de uma vez por todas a diferença de diagnóstico entre bater na porta do {{Endpoint protegido}} sem chave e tentar abrir a porta da gerência com um crachá de estagiário.

[[AUTH_ERROR_COMPARATOR]]

## Teste Prático no Laboratório

Use o painel abaixo para simular chamadas contra um {{Endpoint protegido}} `/secure` e veja os resultados imediatos que você encontraria no Sandbox do IntegraLab ou numa API real.

[[SECURE_ENDPOINT_LAB]]',

content_en = '## The Journey of Identity

No secure {{API}} allows anonymous visitors to access or destroy private data. The server needs to know who you are.

Follow step by step how the {{Autenticação}} flow happens in practice, from sending the {{Credenciais}} to granting access.

[[AUTH_FLOW]]

## Authentication vs Authorization

It is impossible to advance without understanding the difference between proving who you are and proving what you are allowed to do. Many senior developers still confuse these two concepts.

[[AUTH_VS_AUTHORIZATION]]

## The Bearer: Bearer Token

After logging in, you receive a {{Token}} (often a {{JWT}}). This token represents your {{Sessão}}.

As a global standard, this token should NEVER be sent in the URL or in the {{Body}}. It must travel protected and standardized inside the {{Authorization}} {{Header}}.

[[BEARER_TOKEN_ANATOMY]]

## The Gatekeepers: 401 and 403

When the verification fails, the API {{Response}} will carry a fatal {{Status Code}}.

Understand once and for all the diagnostic difference between knocking on the door of the {{Endpoint protegido}} without a key and trying to open the manager''s door with an intern''s badge.

[[AUTH_ERROR_COMPARATOR]]

## Practical Lab Test

Use the panel below to simulate calls against a {{Endpoint protegido}} `/secure` and see the immediate results you would find in the IntegraLab Sandbox or a real API.

[[SECURE_ENDPOINT_LAB]]',

glossary = '[
  {
    "term": "Autenticação",
    "definition": "O processo de verificar a identidade de um usuário ou sistema (Ex: Login).",
    "importance": "É a primeira barreira de segurança de qualquer sistema. Sem autenticar, não há como atribuir dados a um dono.",
    "lessonContext": "Nesta aula, a Autenticação é mapeada como o passo 1 do fluxo, respondendo a pergunta ''Quem é você?''."
  },
  {
    "term": "Autorização",
    "definition": "O processo de verificar se o usuário já identificado tem permissão para realizar determinada ação.",
    "importance": "Impede o escalonamento de privilégios. Ex: Um cliente autenticado tentando acessar o painel de faturamento do administrador.",
    "lessonContext": "A aula usa o AuthVsAuthorizationBlock para diferenciar claramente que ser autenticado (401 resolvido) não garante estar autorizado (403 pendente)."
  },
  {
    "term": "Token",
    "definition": "Uma string criptografada ou sequencial, gerada pelo servidor, que atua como uma chave de acesso temporária.",
    "importance": "Permite que APIs modernas funcionem sem estado (stateless), ou seja, sem precisar salvar os logins ativos na memória do servidor.",
    "example": "abc123xyz890",
    "lessonContext": "O token é a ''carta passe'' entregue ao Cliente no AuthFlowPlayer após um login bem-sucedido."
  },
  {
    "term": "Bearer Token",
    "definition": "Padrão oficial da web onde o token é injetado no cabeçalho precedido pela palavra ''Bearer'' (Portador).",
    "importance": "Padroniza como os servidores leem e interceptam as credenciais, independentemente da linguagem de programação.",
    "example": "Authorization: Bearer my-secret-token",
    "lessonContext": "Temos um painel inteiro (BearerTokenAnatomy) dedicado a explicar os espaços e palavras deste cabeçalho vital."
  },
  {
    "term": "Authorization",
    "definition": "O nome oficial do Header HTTP reservado para transportar credenciais de segurança.",
    "importance": "É o local padrão ouro. Evita o terrível erro de enviar senhas ou tokens como parâmetros de URL.",
    "lessonContext": "O nome deste Header causa confusão, pois embora se chame ''Authorization'', ele é primariamente usado para enviar a prova de ''Autenticação'' (o Token)."
  },
  {
    "term": "Header",
    "definition": "Os cabeçalhos HTTP por onde passam os metadados da requisição, como o Content-Type e os tokens de segurança.",
    "lessonContext": "Revisado aqui como o único lugar seguro para injetar o seu Bearer Token."
  },
  {
    "term": "Request",
    "definition": "O pacote HTTP disparado pelo Cliente em direção ao Servidor.",
    "lessonContext": "No AuthFlowPlayer, vemos a Request voando da esquerda (Cliente) para a direita (Servidor)."
  },
  {
    "term": "Response",
    "definition": "O pacote de retorno do Servidor, sinalizando sucesso ou recusa através do Status Code.",
    "lessonContext": "É na Response que o Cliente descobre se esbarrou em um 401 ou se obteve os dados protegidos em um 200 OK."
  },
  {
    "term": "Endpoint",
    "definition": "Uma rota específica da API, definida pelo caminho (URL) e o verbo HTTP (GET, POST).",
    "example": "GET /api/profile",
    "lessonContext": "A aula ensina que endpoints se dividem em dois grandes grupos: públicos e protegidos."
  },
  {
    "term": "Endpoint protegido",
    "definition": "Rotas que ativam os validadores de segurança da API, negando qualquer acesso que não contenha um token válido.",
    "lessonContext": "Simulado diretamente no SecureEndpointLab, onde o `/secure` barra tentativas anônimas."
  },
  {
    "term": "Credenciais",
    "definition": "Qualquer dado confidencial usado para provar a identidade durante o Login (Ex: email e senha).",
    "lessonContext": "É a carga inicial disparada no Passo 1 do fluxo de Autenticação."
  },
  {
    "term": "JWT",
    "acronym": "JSON Web Token",
    "definition": "Um tipo específico de token super popular que não só serve como chave, mas carrega dentro de si informações legíveis e assinadas criptograficamente.",
    "importance": "Como o próprio token carrega o ID do usuário e a validade de forma segura, o servidor não precisa consultar o banco de dados toda vez.",
    "lessonContext": "É o padrão de fato da indústria mencionado como o formato assumido da string devolvida pela API."
  },
  {
    "term": "Sessão",
    "definition": "O período de tempo válido onde o sistema reconhece o usuário como autenticado.",
    "lessonContext": "Mencionamos que o Token é a representação física dessa sessão. Se o tempo da sessão acaba (Token expirado), o sistema reage com um 401."
  },
  {
    "term": "401 Unauthorized",
    "definition": "Status Code do HTTP indicando que o cliente falhou na etapa primária de provar QUEM ELE É.",
    "importance": "Bloqueia anônimos e tokens adulterados.",
    "lessonContext": "Comparado detalhadamente com o 403 no AuthErrorComparator."
  },
  {
    "term": "403 Forbidden",
    "definition": "Status Code do HTTP indicando que o cliente está autenticado perfeitamente, mas a ação feriu uma regra e o acesso a ESTE recurso foi negado.",
    "importance": "Protege recursos isolados contra escalonamento de perfis de usuário.",
    "lessonContext": "Mapeado como o erro de Autorização no comparador visual."
  },
  {
    "term": "Status Code",
    "definition": "Código número que sumaria o resultado final da operação, como 200, 401 e 403.",
    "lessonContext": "Servindo como ponte com a aula anterior, vemos a aplicação direta da teoria dos Status Codes nos casos de segurança."
  },
  {
    "term": "API",
    "acronym": "Application Programming Interface",
    "definition": "O conjunto de regras e rotas backend que o front-end consome para operar os dados do negócio.",
    "lessonContext": "Todo o contexto do fluxo de segurança visa proteger e blindar essa API."
  }
]',

glossary_en = '[
  {
    "term": "Autenticação",
    "definition": "The process of verifying the identity of a user or system (E.g., Login).",
    "importance": "It is the first security barrier of any system. Without authenticating, there is no way to assign data to an owner.",
    "lessonContext": "In this lesson, Authentication is mapped as step 1 of the flow, answering the question ''Who are you?''."
  },
  {
    "term": "Autorização",
    "definition": "The process of verifying if the already identified user has permission to perform a certain action.",
    "importance": "Prevents privilege escalation. E.g.: An authenticated customer trying to access the admin billing dashboard.",
    "lessonContext": "The lesson uses the AuthVsAuthorizationBlock to clearly differentiate that being authenticated (401 resolved) does not guarantee being authorized (403 pending)."
  },
  {
    "term": "Token",
    "definition": "An encrypted or sequential string, generated by the server, acting as a temporary access key.",
    "importance": "Allows modern APIs to function stateless, meaning without needing to save active logins in the server''s memory.",
    "example": "abc123xyz890",
    "lessonContext": "The token is the ''pass card'' delivered to the Client in the AuthFlowPlayer after a successful login."
  },
  {
    "term": "Bearer Token",
    "definition": "Official web standard where the token is injected into the header preceded by the word ''Bearer''.",
    "importance": "Standardizes how servers read and intercept credentials, regardless of the programming language.",
    "example": "Authorization: Bearer my-secret-token",
    "lessonContext": "We have an entire panel (BearerTokenAnatomy) dedicated to explaining the spaces and words of this vital header."
  },
  {
    "term": "Authorization",
    "definition": "The official name of the HTTP Header reserved for transporting security credentials.",
    "importance": "It is the gold standard location. Avoids the terrible mistake of sending passwords or tokens as URL parameters.",
    "lessonContext": "The name of this Header causes confusion, because although it is called ''Authorization'', it is primarily used to send the proof of ''Authentication'' (the Token)."
  },
  {
    "term": "Header",
    "definition": "The HTTP headers through which the request metadata passes, like Content-Type and security tokens.",
    "lessonContext": "Reviewed here as the only safe place to inject your Bearer Token."
  },
  {
    "term": "Request",
    "definition": "The HTTP package fired by the Client towards the Server.",
    "lessonContext": "In the AuthFlowPlayer, we see the Request flying from the left (Client) to the right (Server)."
  },
  {
    "term": "Response",
    "definition": "The return package from the Server, signaling success or refusal through the Status Code.",
    "lessonContext": "It is in the Response that the Client discovers whether it hit a 401 or if it obtained the protected data in a 200 OK."
  },
  {
    "term": "Endpoint",
    "definition": "A specific route of the API, defined by the path (URL) and the HTTP verb (GET, POST).",
    "example": "GET /api/profile",
    "lessonContext": "The lesson teaches that endpoints are divided into two main groups: public and protected."
  },
  {
    "term": "Endpoint protegido",
    "definition": "Routes that trigger the API''s security validators, denying any access that does not contain a valid token.",
    "lessonContext": "Simulated directly in the SecureEndpointLab, where `/secure` blocks anonymous attempts."
  },
  {
    "term": "Credenciais",
    "definition": "Any confidential data used to prove identity during Login (E.g., email and password).",
    "lessonContext": "It is the initial payload fired in Step 1 of the Authentication flow."
  },
  {
    "term": "JWT",
    "acronym": "JSON Web Token",
    "definition": "A specific type of super popular token that not only serves as a key but carries within itself readable and cryptographically signed information.",
    "importance": "Because the token itself carries the user ID and expiration safely, the server doesn''t need to query the database every time.",
    "lessonContext": "It is the de facto industry standard mentioned as the assumed format of the string returned by the API."
  },
  {
    "term": "Sessão",
    "definition": "The valid time period where the system recognizes the user as authenticated.",
    "lessonContext": "We mention that the Token is the physical representation of this session. If the session time runs out (Expired Token), the system reacts with a 401."
  },
  {
    "term": "401 Unauthorized",
    "definition": "HTTP Status Code indicating that the client failed at the primary step of proving WHO THEY ARE.",
    "importance": "Blocks anonymous users and tampered tokens.",
    "lessonContext": "Compared in detail with 403 in the AuthErrorComparator."
  },
  {
    "term": "403 Forbidden",
    "definition": "HTTP Status Code indicating that the client is perfectly authenticated, but the action violated a rule and access to THIS resource was denied.",
    "importance": "Protects isolated resources against user profile escalation.",
    "lessonContext": "Mapped as the Authorization error in the visual comparator."
  },
  {
    "term": "Status Code",
    "definition": "Number code that summarizes the final result of the operation, such as 200, 401, and 403.",
    "lessonContext": "Serving as a bridge with the previous lesson, we see the direct application of the Status Codes theory in security cases."
  },
  {
    "term": "API",
    "acronym": "Application Programming Interface",
    "definition": "The set of backend rules and routes that the front-end consumes to operate the business data.",
    "lessonContext": "The entire context of the security flow aims to protect and shield this API."
  }
]',

mini_quiz = '[
  {
    "question": "Um desenvolvedor web enviou o Bearer Token do usuário diretamente como parâmetro na URL: GET /perfil?token=abc123. Por que essa é uma péssima prática de segurança?",
    "options": [
      "Porque métodos GET não suportam parâmetros na URL.",
      "A URL trafega aberta e fica registrada para sempre nos logs dos navegadores, históricos de wifi e proxies. O token roubado nesses logs permite o sequestro da sessão.",
      "Tokens só funcionam se anexados dentro de um JSON no Body da requisição, e nunca na URL ou no Header."
    ],
    "correctIndex": 1,
    "explanation": "A regra de ouro da segurança é: jamais coloque dados confidenciais na URL. A URL não é criptografada da mesma forma e fica enraizada em arquivos de log passivos pelo caminho. Apenas Headers garantem privacidade na camada de transporte (via HTTPS)."
  },
  {
    "question": "Um usuário recém-cadastrado na plataforma clica no botão para deletar todo o banco de dados. O sistema valida que o usuário de fato existe e tem um token legítimo, contudo, o sistema interrompe a ação. Qual Status Code foi gerado?",
    "options": [
      "401 Unauthorized, pois o usuário não deveria estar no sistema.",
      "400 Bad Request, pois deletar um banco de dados é um erro de sintaxe JSON.",
      "403 Forbidden, pois a Autenticação (token válido) passou, mas a Autorização (permissão de admin) falhou na regra de negócios."
    ],
    "correctIndex": 2,
    "explanation": "O 403 é o clássico erro de ''você pode entrar no prédio, mas não pode entrar nesta sala''. A barreira inicial (401) foi ultrapassada com sucesso pelo token dele."
  },
  {
    "question": "Ao longo de um fluxo de Autenticação JWT numa aplicação Front-end React moderna, onde o Header ''Authorization: Bearer <token>'' é injetado?",
    "options": [
      "Apenas na Request do Login, durante o passo 1 onde enviamos as Credenciais.",
      "Em todas as Requests subsequentes que o Cliente fizer buscando acessar Endpoints Protegidos da API, após ter recebido o Token no login inicial.",
      "No banco de dados do Servidor, durante o momento do cadastro."
    ],
    "correctIndex": 1,
    "explanation": "A API moderna é stateless. Ela não memoriza você. Portanto, para cada nova requisição em uma rota protegida, o Front-end precisa anexar o token no Header, provando repetidamente quem ele é."
  },
  {
    "question": "O que a palavra ''Bearer'' significa conceitualmente e tecnicamente no Header de Authorization?",
    "options": [
      "Significa ''Criptografado'', garantindo que a conexão é HTTPS.",
      "Significa ''Urso'', indicando um tipo de token grande e pesado.",
      "Significa ''Portador''. A API confiará os dados ao portador deste token, motivo pelo qual se um hacker roubar a string, ele passa a ser o portador legítimo perante a máquina."
    ],
    "correctIndex": 2,
    "explanation": "A semântica de Bearer é exatamente essa: a permissão é garantida a quem ''porta'' a chave. Da mesma forma que o dono da chave de uma casa abre a porta independentemente de ser o morador ou um ladrão que achou a chave."
  }
]',

mini_quiz_en = '[
  {
    "question": "A web developer sent the user''s Bearer Token directly as a parameter in the URL: GET /profile?token=abc123. Why is this a terrible security practice?",
    "options": [
      "Because GET methods do not support URL parameters.",
      "The URL travels openly and is permanently logged in browser history, wifi logs, and proxies. A token stolen from these logs allows session hijacking.",
      "Tokens only work if attached inside a JSON in the Request Body, and never in the URL or the Header."
    ],
    "correctIndex": 1,
    "explanation": "The golden rule of security is: never put confidential data in the URL. The URL is not encrypted in the same way and gets rooted in passive log files along the way. Only Headers guarantee privacy at the transport layer (via HTTPS)."
  },
  {
    "question": "A newly registered user on the platform clicks the button to delete the entire database. The system validates that the user actually exists and has a legitimate token; however, the system aborts the action. Which Status Code was generated?",
    "options": [
      "401 Unauthorized, because the user should not be in the system.",
      "400 Bad Request, because deleting a database is a JSON syntax error.",
      "403 Forbidden, because Authentication (valid token) passed, but Authorization (admin permission) failed the business rule."
    ],
    "correctIndex": 2,
    "explanation": "403 is the classic ''you can enter the building, but you can''t enter this room'' error. The initial barrier (401) was successfully bypassed by their token."
  },
  {
    "question": "Throughout a JWT Authentication flow in a modern React Front-end application, where is the ''Authorization: Bearer <token>'' Header injected?",
    "options": [
      "Only in the Login Request, during step 1 where we send the Credentials.",
      "In all subsequent Requests the Client makes seeking to access Protected API Endpoints, after having received the Token in the initial login.",
      "In the Server''s database, during the registration moment."
    ],
    "correctIndex": 1,
    "explanation": "Modern APIs are stateless. They don''t memorize you. Therefore, for each new request on a protected route, the Front-end must attach the token in the Header, repeatedly proving who it is."
  },
  {
    "question": "What does the word ''Bearer'' mean conceptually and technically in the Authorization Header?",
    "options": [
      "It means ''Encrypted'', guaranteeing the connection is HTTPS.",
      "It refers to a large and heavy type of token.",
      "It means ''Holder/Carrier''. The API will trust the data to the bearer of this token, which is why if a hacker steals the string, they become the legitimate bearer in the eyes of the machine."
    ],
    "correctIndex": 2,
    "explanation": "The semantics of Bearer is exactly this: permission is granted to whoever ''bears'' the key. Just like the holder of a house key opens the door regardless of whether it is the resident or a thief who found the key."
  }
]'

WHERE id = '44444444-4444-4444-4444-000000000006';
