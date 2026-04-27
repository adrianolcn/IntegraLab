-- V15__clean_http_methods_content_format.sql

UPDATE theory_lessons
SET content = '## A Ideia Central

Até agora, sabemos que a **{{API}}** é uma ponte de comunicação. Mas como o servidor sabe se você quer apenas **ler** um dado, ou se quer **criar** um novo registro?

No protocolo HTTP, isso é definido pelo **Método** (também conhecido como Verbo HTTP). O método é a primeira palavra de um **{{Request}}** e ele dita exatamente qual é a intenção da operação.

## Métodos são Intenções

Os métodos mais comuns formam o padrão CRUD (Create, Read, Update, Delete).

>> O segredo para construir e consumir APIs excelentes é entender como esses métodos se comportam na prática. Usar o verbo errado é como tentar abrir uma porta de empurrar puxando a maçaneta.

Por exemplo, se um cliente tenta enviar um **{{POST}}** para uma rota que só aceita **{{GET}}**, a API rejeitará o pedido retornando o status **405 Method Not Allowed**.

## Idempotência em linguagem simples

Um conceito fundamental dos métodos é a **{{Idempotência}}**.

>> Um método é **idempotente** quando chamá-lo uma vez tem exatamente o mesmo efeito final que chamá-lo 10, 100 ou 1000 vezes seguidas, sem causar efeitos colaterais extras.

Pense num interruptor de luz. Se você apertar "Ligar" e a luz acender (primeira chamada), continuar apertando "Ligar" repetidamente não mudará nada. O estado final continua sendo "Luz Acesa". Isso é idempotência.

Agora, pense em um botão de "Comprar Produto". Se você apertar 5 vezes seguidas por acidente, você fará 5 compras separadas. O estado muda a cada chamada. Isso **não** é idempotente!

## Por que não usar POST para tudo?

Muitos iniciantes usam o **{{POST}}** para buscar dados, atualizar registros e até deletar arquivos.

Embora tecnicamente funcione, isso quebra a semântica da web. O **{{POST}}** não é idempotente. Se a conexão cair no meio de uma atualização via POST, o navegador não sabe se pode tentar de novo com segurança, pois tem medo de duplicar uma ação.

## Resumo dos Verbos

Aqui está um resumo prático de como cada método deve ser usado e como ele se comporta:

[[VERB_SUMMARY]]',

content_en = '## The Core Idea

So far, we know that the **{{API}}** is a communication bridge. But how does the server know if you just want to **read** data, or if you want to **create** a new record?

In the HTTP protocol, this is defined by the **Method** (also known as the HTTP Verb). The method is the first word of a **{{Request}}** and it dictates exactly what the intention of the operation is.

## Methods are Intentions

The most common methods form the CRUD pattern (Create, Read, Update, Delete).

>> The secret to building and consuming great APIs is understanding how these methods behave in practice. Using the wrong verb is like trying to open a push door by pulling the handle.

For example, if a client tries to send a **{{POST}}** to a route that only accepts **{{GET}}**, the API will reject the request returning the status **405 Method Not Allowed**.

## Idempotency in simple terms

A fundamental concept of methods is **{{Idempotência}}**.

>> A method is **idempotent** when calling it once has exactly the same final effect as calling it 10, 100, or 1000 times in a row, without causing extra side effects.

Think of a light switch. If you press "Turn On" and the light turns on (first call), pressing "Turn On" repeatedly will not change anything. The final state remains "Light On". This is idempotency.

Now, think of a "Buy Product" button. If you press it 5 times in a row by accident, you will make 5 separate purchases. The state changes with each call. This is **not** idempotent!

## Why not use POST for everything?

Many beginners use **{{POST}}** to fetch data, update records, and even delete files.

While it technically works, it breaks web semantics. **{{POST}}** is not idempotent. If the connection drops in the middle of a POST update, the browser doesn''t know if it can safely try again, because it''s afraid of duplicating an action.

## Verbs Summary

Here is a practical summary of how each method should be used and how it behaves:

[[VERB_SUMMARY]]'

WHERE title = 'Métodos HTTP';
