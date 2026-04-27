-- V6: Mission Options and Validation Strategies

CREATE TABLE mission_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    explanation TEXT,
    correct BOOLEAN NOT NULL DEFAULT FALSE,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE missions ADD COLUMN validation_strategy VARCHAR(50) DEFAULT 'EXACT_NORMALIZED';
ALTER TABLE missions ADD COLUMN accepted_answers TEXT;

-- Update validation strategy for existing missions based on mission_type
UPDATE missions SET validation_strategy = 'MULTIPLE_CHOICE_OPTION' WHERE mission_type = 'MULTIPLE_CHOICE';
UPDATE missions SET validation_strategy = 'DEBUG_REASONING' WHERE mission_type = 'DEBUG_CHALLENGE';
UPDATE missions SET validation_strategy = 'CONTAINS_KEYWORD' WHERE mission_type = 'TEXT_ANSWER';

-- Add accepted answers for text missions
UPDATE missions SET accepted_answers = 'authorization,header authorization,bearer token,authorization header' WHERE slug = 'fluxo-requisicao-autenticada';

-- ==========================================
-- SEED: Options for Mission 1 (GET)
-- ==========================================
INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'GET', 'GET', 'Perfeito. O GET é focado apenas em buscar dados sem causar mutação no servidor.', true, 1 FROM missions WHERE slug = 'primeira-requisicao-get';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'POST', 'POST', 'Incorreto. O POST é normalmente utilizado quando precisamos enviar novos dados para o servidor processar e criar um registro.', false, 2 FROM missions WHERE slug = 'primeira-requisicao-get';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'PUT', 'PUT', 'Incorreto. O PUT é voltado para substituição ou atualização completa de um recurso existente.', false, 3 FROM missions WHERE slug = 'primeira-requisicao-get';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'DELETE', 'DELETE', 'Incorreto. Como o nome sugere, DELETE serve para remover dados do sistema, não buscá-los.', false, 4 FROM missions WHERE slug = 'primeira-requisicao-get';

-- ==========================================
-- SEED: Options for Mission 2 (POST)
-- ==========================================
INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'GET', 'GET', 'Incorreto. GET é usado apenas para leitura, ele não possui corpo de requisição padronizado para enviar payloads complexos de criação.', false, 1 FROM missions WHERE slug = 'post-com-json';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'POST', 'POST', 'Correto. POST permite despachar um payload (geralmente JSON) no corpo da requisição para gravar algo no banco.', true, 2 FROM missions WHERE slug = 'post-com-json';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'DELETE', 'DELETE', 'Incorreto. Usado para exclusão de recursos.', false, 3 FROM missions WHERE slug = 'post-com-json';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'OPTIONS', 'OPTIONS', 'Incorreto. OPTIONS é um método de pré-verificação (Preflight) muito usado por navegadores em requisições CORS.', false, 4 FROM missions WHERE slug = 'post-com-json';

-- ==========================================
-- SEED: Options for Mission 3 (Erro 400)
-- ==========================================
INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Payload Inválido (400)', 'payload_invalido', 'Exato. O erro 400 Bad Request indica que os dados enviados pelo cliente não respeitam o formato que o servidor espera.', true, 1 FROM missions WHERE slug = 'corrija-erro-400';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Token Expirado (401)', 'token_expirado', 'Incorreto. Problemas com o token geram 401 Unauthorized.', false, 2 FROM missions WHERE slug = 'corrija-erro-400';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Recurso não encontrado (404)', 'recurso_nao_encontrado', 'Incorreto. O erro 404 seria devolvido caso a URL chamada não existisse no servidor.', false, 3 FROM missions WHERE slug = 'corrija-erro-400';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Servidor indisponível (503)', 'servidor_indisponivel', 'Incorreto. O 503 indicaria uma falha sistêmica (backend fora do ar). O problema foi gerado pelo formato do JSON enviado.', false, 4 FROM missions WHERE slug = 'corrija-erro-400';

-- ==========================================
-- SEED: Options for Mission 4 (Erro 401)
-- ==========================================
INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Falta de Token (401)', 'token_ausente_ou_invalido', 'Correto. A API blindou o acesso porque não reconheceu ou não encontrou a identidade da requisição (falha de autenticação).', true, 1 FROM missions WHERE slug = 'identifique-erro-401';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Rota inexistente (404)', 'rota_inexistente', 'Incorreto. O sistema sabe que a rota existe (provavelmente /dashboard), mas o gateway nem permitiu que o processamento seguisse.', false, 2 FROM missions WHERE slug = 'identifique-erro-401';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Payload inválido (400)', 'payload_invalido', 'Incorreto. O 400 indica erro nos dados (como um JSON com aspas faltando), mas o erro que bloqueia antes é de segurança.', false, 3 FROM missions WHERE slug = 'identifique-erro-401';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Erro interno (500)', 'erro_interno', 'Incorreto. Erros na faixa do 500 indicariam que a plataforma falhou na operação. O bloqueio 401 é uma ação correta de defesa da API.', false, 4 FROM missions WHERE slug = 'identifique-erro-401';

-- ==========================================
-- SEED: Options for Mission 5 (Status de Criação)
-- ==========================================
INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, '200 OK', '200', 'Incorreto. Embora indique sucesso, ele é muito genérico. Operações de criação explícitas possuem um código melhor.', false, 1 FROM missions WHERE slug = 'status-code-criacao';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, '201 Created', '201', 'Perfeito. É o código ideal para sinalizar que o POST resultou na geração de uma nova entidade no sistema.', true, 2 FROM missions WHERE slug = 'status-code-criacao';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, '400 Bad Request', '400', 'Incorreto. O 400 indicaria que a criação falhou por inconsistência de dados do cliente.', false, 3 FROM missions WHERE slug = 'status-code-criacao';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, '500 Internal Server Error', '500', 'Incorreto. O 500 representaria uma quebra do serviço ou exception não tratada.', false, 4 FROM missions WHERE slug = 'status-code-criacao';

-- ==========================================
-- SEED: Options for Mission 6 (Fluxo Autenticado)
-- Apesar da missão 6 estar como "TEXT_ANSWER", vou cadastrar opções e migrar ela para "MULTIPLE_CHOICE" no backend para fins práticos.
-- ==========================================
UPDATE missions SET mission_type = 'MULTIPLE_CHOICE', validation_strategy = 'MULTIPLE_CHOICE_OPTION' WHERE slug = 'fluxo-requisicao-autenticada';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Authorization', 'authorization', 'Correto. É nesse Header que passamos o Bearer Token que destrava a nossa sessão na API.', true, 1 FROM missions WHERE slug = 'fluxo-requisicao-autenticada';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Content-Type', 'content-type', 'Incorreto. O Content-Type avisa o formato dos dados enviados (como application/json), ele não carrega credenciais.', false, 2 FROM missions WHERE slug = 'fluxo-requisicao-autenticada';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Accept', 'accept', 'Incorreto. O Accept diz qual formato de resposta o cliente espera receber, não diz quem ele é.', false, 3 FROM missions WHERE slug = 'fluxo-requisicao-autenticada';

INSERT INTO mission_options (mission_id, label, value, explanation, correct, order_index)
SELECT id, 'Cache-Control', 'cache-control', 'Incorreto. Esse Header controla regras de cache de navegador ou proxy intermediário.', false, 4 FROM missions WHERE slug = 'fluxo-requisicao-autenticada';
