-- V19__interactive_headers_body_json_lesson.sql

UPDATE theory_lessons
SET content = '## A Anatomia da Requisição

Toda comunicação web é dividida em etapas lógicas. A {{Request}} não é apenas uma URL; ela é um pacote estruturado.

Explore a anatomia de uma requisição real abaixo para entender como o {{Método HTTP}}, o {{Endpoint}}, os {{Headers}} e o {{Body}} trabalham juntos para formar uma operação completa.

[[REQUEST_ANATOMY]]

## Metadados vs Dados

Um dos conceitos mais confusos para iniciantes é a diferença estrutural entre o que vai no {{Header}} e o que vai no {{Body}}. Pense em uma carta sendo enviada pelos Correios.

[[HEADER_BODY_COMPARATOR]]

## O Padrão Universal: JSON

O formato de texto mais utilizado no mundo para estruturar os dados do {{Body}} é o {{JSON}}.

Ele é absurdamente simples, mas implacável: esquecer uma vírgula ou uma aspa invalida o arquivo inteiro. Explore a sintaxe do JSON clicando nos elementos abaixo.

[[JSON_EXPLORER]]

## O Laboratório do Content-Type

Para que o {{Servidor}} consiga ler o seu {{JSON}} perfeitamente estruturado, ele precisa ser avisado com antecedência. É para isso que o header {{Content-Type}} serve.

Outros headers como o {{Authorization}} provam a sua identidade usando um {{Bearer Token}}. Se ele não estiver lá, você esbarra na porta. Veja como a ausência ou configuração incorreta dos headers engatilha erros mortais na API.

[[CONTENT_TYPE_LAB]]',

content_en = '## The Anatomy of a Request

All web communication is divided into logical steps. The {{Request}} is not just a URL; it is a structured package.

Explore the anatomy of a real request below to understand how the {{Método HTTP}}, the {{Endpoint}}, the {{Headers}}, and the {{Body}} work together to form a complete operation.

[[REQUEST_ANATOMY]]

## Metadata vs Data

One of the most confusing concepts for beginners is the structural difference between what goes in the {{Header}} and what goes in the {{Body}}. Think of a letter being sent through the Post Office.

[[HEADER_BODY_COMPARATOR]]

## The Universal Standard: JSON

The most widely used text format in the world for structuring {{Body}} data is {{JSON}}.

It is absurdly simple but unforgiving: forgetting a comma or a quote invalidates the entire file. Explore the JSON syntax by clicking on the elements below.

[[JSON_EXPLORER]]

## The Content-Type Lab

For the {{Servidor}} to be able to read your perfectly structured {{JSON}}, it needs to be warned in advance. That is what the {{Content-Type}} header is for.

Other headers like {{Authorization}} prove your identity using a {{Bearer Token}}. If it is not there, you hit a wall. See how the absence or incorrect configuration of headers triggers fatal API errors.

[[CONTENT_TYPE_LAB]]',

glossary = '[
  {
    "term": "Header",
    "definition": "O cabeçalho HTTP onde passam metadados invisíveis, como formato de dados e tokens.",
    "importance": "Permite configurar a requisição logisticamente sem sujar os dados da operação em si.",
    "example": "Content-Type: application/json",
    "lessonContext": "Nesta aula, contrastamos o Header (envelope) com o Body (a carta de fato)."
  },
  {
    "term": "Body",
    "definition": "O corpo da mensagem HTTP, onde viaja a verdadeira carga útil de dados.",
    "importance": "É o transporte para os dados que importam, como senhas de login e formulários de cadastro.",
    "lessonContext": "Mostramos como requisições GET geralmente não têm Body, enquanto POST e PUT quase sempre dependem dele."
  },
  {
    "term": "JSON",
    "acronym": "JavaScript Object Notation",
    "definition": "Formato de texto super leve baseado em chaves e valores para a troca de dados estruturados.",
    "importance": "Substituiu o antigo XML por ser extremamente mais legível por humanos e rápido para as máquinas.",
    "example": "{ \"name\": \"John\", \"active\": true }",
    "lessonContext": "A aula usa o JsonExplorer para mapear a anatomia perfeita (aspas, chaves e vírgulas) dessa estrutura vital."
  },
  {
    "term": "Payload",
    "definition": "A ''carga útil'', jargão comum para se referir aos dados centrais transportados no Body.",
    "lessonContext": "Quando falamos que o payload está malformado, significa que o JSON dentro do Body possui erros (gerando 400 Bad Request)."
  },
  {
    "term": "Content-Type",
    "definition": "Um Header obrigatório que avisa ao servidor qual o formato do Payload que está sendo enviado.",
    "importance": "Sem ele, a API não sabe qual ''tradutor'' acionar para ler o Body.",
    "example": "Content-Type: application/json",
    "lessonContext": "O ContentTypeLab mostra como esquecer essa linha faz a API devolver um 415 Unsupported Media Type."
  },
  {
    "term": "Accept",
    "definition": "Um Header que diz à API em qual formato VOCÊ deseja receber a Resposta.",
    "importance": "Permite que a mesma API devolva um arquivo PDF ou um JSON dependendo apenas do que o cliente pedir.",
    "example": "Accept: application/json",
    "lessonContext": "Junto com o Content-Type, formam a dupla de ouro da negociação de formatos HTTP."
  },
  {
    "term": "Authorization",
    "definition": "O Header responsável por enviar sua chave de acesso provando a sua identidade.",
    "importance": "Impede o acesso não autorizado a rotas privadas, garantindo o bloqueio na porta.",
    "example": "Authorization: Bearer my-secret-token",
    "lessonContext": "Visto no Lab: esquecê-lo acarreta o bloqueio sumário (401 Unauthorized)."
  },
  {
    "term": "Bearer Token",
    "definition": "O formato padrão para envio de tokens de sessão dentro do Header Authorization.",
    "lessonContext": "É a string de autenticação abordada na injeção da requisição interativa."
  },
  {
    "term": "Request",
    "definition": "O pacote total que o Cliente monta e envia para o Servidor.",
    "lessonContext": "Desconstruído bloco por bloco (Método, Headers, Body) no painel InteractiveRequestAnatomy."
  },
  {
    "term": "Response",
    "definition": "O pacote devolvido pela API, contendo um Status Code.",
    "lessonContext": "Mostramos no painel de anatomia como o Response reflete se os Headers foram validados com sucesso."
  },
  {
    "term": "Método HTTP",
    "definition": "O verbo (POST, GET, etc.) que determina a intenção na Request.",
    "lessonContext": "Vimos que o método é a primeira palavra de toda a estrutura da requisição."
  },
  {
    "term": "Endpoint",
    "definition": "A combinação entre o Método e o caminho (URL).",
    "lessonContext": "O path da requisição `/api/users` é o segundo elemento lido pelo servidor após o Método."
  },
  {
    "term": "Status Code",
    "definition": "O número resumo do resultado.",
    "lessonContext": "A consequência direta de acertos ou erros envolvendo Headers e Body nesta aula."
  },
  {
    "term": "400 Bad Request",
    "definition": "Status Code de erro do cliente indicando sintaxe ou estrutura inválida.",
    "lessonContext": "Diagnosticado quando você constrói o JSON de forma errada (ex: falta de aspas)."
  },
  {
    "term": "401 Unauthorized",
    "definition": "Status Code gerado por falta de autenticação.",
    "lessonContext": "Diagnosticado quando o Header Authorization é omitido no Lab de Content-Type."
  },
  {
    "term": "415 Unsupported Media Type",
    "definition": "Status Code indicando que o formato de mídia não é suportado pelo servidor.",
    "lessonContext": "Diagnosticado quando o Header Content-Type é omitido ou mentiroso (ex: declarar XML mas mandar JSON)."
  },
  {
    "term": "422 Unprocessable Entity",
    "definition": "Status Code para JSON sintaticamente perfeito, mas que viola uma regra de negócio oculta.",
    "lessonContext": "Usado para contrastar os erros primários de formatação de JSON vistos nesta aula com erros complexos de lógica."
  }
]',

glossary_en = '[
  {
    "term": "Header",
    "definition": "The HTTP header where invisible metadata passes, such as data formats and tokens.",
    "importance": "Allows configuring the request logistically without cluttering the actual operation data.",
    "example": "Content-Type: application/json",
    "lessonContext": "In this lesson, we contrast the Header (envelope) with the Body (the actual letter)."
  },
  {
    "term": "Body",
    "definition": "The body of the HTTP message, where the true data payload travels.",
    "importance": "It is the transport for the data that matters, like login passwords and registration forms.",
    "lessonContext": "We show how GET requests usually have no Body, while POST and PUT almost always rely on it."
  },
  {
    "term": "JSON",
    "acronym": "JavaScript Object Notation",
    "definition": "Super lightweight text format based on keys and values for exchanging structured data.",
    "importance": "Replaced the old XML by being extremely more human-readable and faster for machines.",
    "example": "{ \"name\": \"John\", \"active\": true }",
    "lessonContext": "The lesson uses the JsonExplorer to map the perfect anatomy (quotes, braces, and commas) of this vital structure."
  },
  {
    "term": "Payload",
    "definition": "The useful load, common jargon to refer to the central data carried in the Body.",
    "lessonContext": "When we say the payload is malformed, it means the JSON inside the Body has errors (generating a 400 Bad Request)."
  },
  {
    "term": "Content-Type",
    "definition": "A mandatory Header that tells the server the format of the Payload being sent.",
    "importance": "Without it, the API doesn''t know which ''translator'' to trigger to read the Body.",
    "example": "Content-Type: application/json",
    "lessonContext": "The ContentTypeLab shows how forgetting this line causes the API to return a 415 Unsupported Media Type."
  },
  {
    "term": "Accept",
    "definition": "A Header that tells the API in what format YOU wish to receive the Response.",
    "importance": "Allows the same API to return a PDF file or a JSON depending only on what the client asks.",
    "example": "Accept: application/json",
    "lessonContext": "Along with Content-Type, they form the golden duo of HTTP format negotiation."
  },
  {
    "term": "Authorization",
    "definition": "The Header responsible for sending your access key proving your identity.",
    "importance": "Prevents unauthorized access to private routes, ensuring a block at the door.",
    "example": "Authorization: Bearer my-secret-token",
    "lessonContext": "Seen in the Lab: forgetting it results in a summary block (401 Unauthorized)."
  },
  {
    "term": "Bearer Token",
    "definition": "The standard format for sending session tokens inside the Authorization Header.",
    "lessonContext": "It is the authentication string covered in the interactive request injection."
  },
  {
    "term": "Request",
    "definition": "The total package that the Client assembles and sends to the Server.",
    "lessonContext": "Deconstructed block by block (Method, Headers, Body) in the InteractiveRequestAnatomy panel."
  },
  {
    "term": "Response",
    "definition": "The package returned by the API, containing a Status Code.",
    "lessonContext": "We show in the anatomy panel how the Response reflects if the Headers were validated successfully."
  },
  {
    "term": "Método HTTP",
    "definition": "The verb (POST, GET, etc.) that determines the intent in the Request.",
    "lessonContext": "We saw that the method is the very first word of the entire request structure."
  },
  {
    "term": "Endpoint",
    "definition": "The combination of the Method and the path (URL).",
    "lessonContext": "The request path `/api/users` is the second element read by the server after the Method."
  },
  {
    "term": "Status Code",
    "definition": "The summary number of the result.",
    "lessonContext": "The direct consequence of hits or misses involving Headers and Body in this lesson."
  },
  {
    "term": "400 Bad Request",
    "definition": "Client error Status Code indicating invalid syntax or structure.",
    "lessonContext": "Diagnosed when you build JSON incorrectly (e.g., missing quotes)."
  },
  {
    "term": "401 Unauthorized",
    "definition": "Status Code generated by lack of authentication.",
    "lessonContext": "Diagnosed when the Authorization Header is omitted in the Content-Type Lab."
  },
  {
    "term": "415 Unsupported Media Type",
    "definition": "Status Code indicating that the media format is not supported by the server.",
    "lessonContext": "Diagnosed when the Content-Type Header is omitted or lying (e.g., declaring XML but sending JSON)."
  },
  {
    "term": "422 Unprocessable Entity",
    "definition": "Status Code for syntactically perfect JSON that violates a hidden business rule.",
    "lessonContext": "Used to contrast the primary JSON formatting errors seen in this lesson with complex logic errors."
  }
]',

mini_quiz = '[
  {
    "question": "Um desenvolvedor tenta enviar a senha de login de um usuário através do Header da requisição. Qual é o problema conceitual dessa abordagem?",
    "options": [
      "Headers só aceitam números, não strings de senha.",
      "Headers são metadados logísticos. Informações cruciais de domínio, como o preenchimento de um formulário de senha, devem viajar de forma protegida e semântica no Body da requisição (via POST).",
      "Não há problema, Headers e Body são exatamente a mesma coisa e são lidos simultaneamente pelo banco de dados."
    ],
    "correctIndex": 1,
    "explanation": "A analogia do envelope (Header) e da carta (Body) se aplica aqui. Você não deve escrever a mensagem confidencial (senha) colada no lado de fora do envelope."
  },
  {
    "question": "Você envia um JSON impecavelmente estruturado com aspas duplas, chaves corretas e sem trailing commas. Contudo, o servidor retorna instantaneamente um 415 Unsupported Media Type. Qual a falha mais provável?",
    "options": [
      "O servidor não suporta JSON e exige XML.",
      "Você esqueceu de anexar o header ''Content-Type: application/json''. Sem o selo informando o formato, a API se recusa a adivinhar e interrompe o parsing.",
      "Você utilizou o método GET, que gera o erro 415 por padrão."
    ],
    "correctIndex": 1,
    "explanation": "O servidor não tem bola de cristal. Por mais que o Body seja um JSON claro, a RFC do HTTP dita que a máquina deve confiar no Header Content-Type. Sem ele, a mídia é ''desconhecida'' (Unsupported)."
  },
  {
    "question": "Analisando a estrutura do JSON abaixo, qual é o erro mortal que geraria um 400 Bad Request?\n\n{\n  nome: \"Admin\",\n  \"idade\": 30,\n}",
    "options": [
      "O campo idade não possui aspas no valor (30).",
      "A chave ''nome'' não está entre aspas duplas e existe uma vírgula ''pendurada'' após o valor 30, o que quebra o parseador JSON.",
      "O JSON deve obrigatoriamente iniciar com colchetes [] e não com chaves {}."
    ],
    "correctIndex": 1,
    "explanation": "No JSON estrito, todas as chaves (keys) precisam de aspas duplas. Além disso, trailing commas (uma vírgula no último item do objeto) são ilegais e quebram a leitura imediata."
  },
  {
    "question": "Um Endpoint retorna 422 Unprocessable Entity quando recebe um JSON pedindo para transferir dinheiro. Contudo, quando o JSON perde uma de suas aspas fechando uma chave, o erro muda para 400 Bad Request. Por que essa transição ocorre?",
    "options": [
      "Porque aspas não são processáveis por entidades financeiras.",
      "O erro de aspas impede o servidor sequer de converter o texto em objeto (Erro de Sintaxe / 400). Já o JSON perfeito passa na sintaxe, mas depois é barrado na regra de negócio, por exemplo, por falta de saldo em conta (Entidade Improcessável / 422).",
      "Porque o servidor confunde 422 e 400 aleatoriamente."
    ],
    "correctIndex": 1,
    "explanation": "O 400 é o guardião do portão: ele barra lixo sintático (como JSON quebrado). O 422 é mais profundo: o objeto está perfeitamente legível, mas seu conteúdo quebra uma regra semântica de negócios (como valor negativo onde não devia)."
  }
]',

mini_quiz_en = '[
  {
    "question": "A developer tries to send a user''s login password via the request Header. What is the conceptual problem with this approach?",
    "options": [
      "Headers only accept numbers, not password strings.",
      "Headers are logistical metadata. Crucial domain information, such as filling out a password form, must travel securely and semantically in the request Body (via POST).",
      "There is no problem, Headers and Body are exactly the same thing and are read simultaneously by the database."
    ],
    "correctIndex": 1,
    "explanation": "The analogy of the envelope (Header) and the letter (Body) applies here. You should not write the confidential message (password) taped to the outside of the envelope."
  },
  {
    "question": "You send an impeccably structured JSON with double quotes, correct braces, and no trailing commas. However, the server instantly returns a 415 Unsupported Media Type. What is the most likely flaw?",
    "options": [
      "The server does not support JSON and requires XML.",
      "You forgot to attach the ''Content-Type: application/json'' header. Without the stamp stating the format, the API refuses to guess and stops parsing.",
      "You used the GET method, which generates a 415 error by default."
    ],
    "correctIndex": 1,
    "explanation": "The server does not have a crystal ball. Even if the Body is clear JSON, the HTTP RFC dictates that the machine must trust the Content-Type Header. Without it, the media is ''unknown'' (Unsupported)."
  },
  {
    "question": "Analyzing the structure of the JSON below, what is the fatal error that would generate a 400 Bad Request?\n\n{\n  nome: \"Admin\",\n  \"idade\": 30,\n}",
    "options": [
      "The age field has no quotes on the value (30).",
      "The key ''nome'' is not in double quotes and there is a ''hanging'' comma after the value 30, which breaks the JSON parser.",
      "The JSON must imperatively start with brackets [] and not braces {}."
    ],
    "correctIndex": 1,
    "explanation": "In strict JSON, all keys need double quotes. In addition, trailing commas (a comma on the last item of the object) are illegal and instantly break the parsing."
  },
  {
    "question": "An Endpoint returns 422 Unprocessable Entity when receiving a JSON asking to transfer money. However, when the JSON loses one of its quotes closing a key, the error changes to 400 Bad Request. Why does this transition occur?",
    "options": [
      "Because quotes are not processable by financial entities.",
      "The quote error prevents the server from even converting the text into an object (Syntax Error / 400). The perfect JSON passes the syntax, but is later blocked by the business rule, for example, due to insufficient account balance (Unprocessable Entity / 422).",
      "Because the server randomly confuses 422 and 400."
    ],
    "correctIndex": 1,
    "explanation": "The 400 is the gatekeeper: it blocks syntactic garbage (like broken JSON). The 422 is deeper: the object is perfectly readable, but its content breaks a semantic business rule (like a negative value where it shouldn''t be)."
  }
]'

WHERE id = '44444444-4444-4444-4444-000000000004';
