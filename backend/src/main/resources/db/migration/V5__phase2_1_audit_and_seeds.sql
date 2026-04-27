-- V5: Complemento de dados para as Missões 2 a 6 (Fase 2.1)
-- Utilizando subselects pelo SLUG da missão para evitar problemas com IDs fixos.

-- ---------------------------------------------------------------------------------------------------------
-- MISSÃO 2: post-com-json
-- ---------------------------------------------------------------------------------------------------------
INSERT INTO guided_steps (mission_id, title, content, step_type, order_index, example, common_mistake)
SELECT id, 'O Método POST', 'Para enviar informações estruturadas e salvar no servidor, usamos POST.', 'CONCEPT', 1, 'POST /api/users\nContent-Type: application/json', 'Usar GET para tentar criar novos dados.' FROM missions WHERE slug = 'post-com-json';

INSERT INTO guided_steps (mission_id, title, content, step_type, order_index, example, common_mistake)
SELECT id, 'Body JSON', 'O POST exige que você mande o Payload no corpo da requisição, frequentemente no formato JSON.', 'CONCEPT', 2, '{"name": "Alice"}', 'Esquecer de enviar o header Content-Type: application/json.' FROM missions WHERE slug = 'post-com-json';

INSERT INTO mission_scenarios (mission_id, title, description, initial_request_json, simulated_response_json, explanation)
SELECT id, 'Criação de Usuário', 'Simulação de envio de um novo registro via POST.', '{"method":"POST","path":"/api/users","body":{"name":"Bob"}}', '{"status":201,"data":{"id":2,"name":"Bob"}}', 'Fluxo de sucesso na criação de recurso.' FROM missions WHERE slug = 'post-com-json';

INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'client', 'Navegador', 'CLIENT', 0, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'post-com-json';
INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'service', 'Serviço de Usuários', 'SERVICE', 400, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'post-com-json';

INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'client', 'service', 'REQUEST', 'SUCCESS', 'POST', '/api/users', 'Enviando payload JSON com POST', 1 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'post-com-json';
INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'service', 'client', 'RESPONSE', 'SUCCESS', null, null, 'Servidor processou e retornou 201 Created', 2 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'post-com-json';

-- ---------------------------------------------------------------------------------------------------------
-- MISSÃO 3: corrija-erro-400
-- ---------------------------------------------------------------------------------------------------------
INSERT INTO guided_steps (mission_id, title, content, step_type, order_index, example, common_mistake)
SELECT id, 'Erros Client-side', 'Quando a requisição está malformada ou faltam dados obrigatórios, o servidor rejeita com 4xx.', 'CONCEPT', 1, 'HTTP 400 Bad Request', 'Achar que o servidor "caiu" quando na verdade foi apenas o cliente que enviou lixo.' FROM missions WHERE slug = 'corrija-erro-400';

INSERT INTO mission_scenarios (mission_id, title, description, initial_request_json, simulated_response_json, explanation)
SELECT id, 'Payload Inválido', 'O cliente envia um JSON malformado', '{"method":"POST","path":"/api/data","body":"{bad_json}"}', '{"status":400,"error":"Bad Request"}', 'O servidor interrompe e avisa o cliente.' FROM missions WHERE slug = 'corrija-erro-400';

INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'client', 'Mobile App', 'CLIENT', 0, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'corrija-erro-400';
INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'service', 'Validador', 'SERVICE', 400, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'corrija-erro-400';

INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'client', 'service', 'REQUEST', 'FAILED', 'POST', '/api/data', 'Enviou payload invalido', 1 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'corrija-erro-400';
INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'service', 'client', 'RESPONSE', 'FAILED', null, null, 'Rejeitado por validação', 2 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'corrija-erro-400';

-- ---------------------------------------------------------------------------------------------------------
-- MISSÃO 4: identifique-erro-401
-- ---------------------------------------------------------------------------------------------------------
INSERT INTO guided_steps (mission_id, title, content, step_type, order_index, example, common_mistake)
SELECT id, 'Autenticação', 'Para acessar recursos privados, a API precisa saber quem você é.', 'CONCEPT', 1, 'Header Authorization faltando', 'Confundir 401 Unauthorized (falha de login) com 403 Forbidden (falha de permissão).' FROM missions WHERE slug = 'identifique-erro-401';

INSERT INTO mission_scenarios (mission_id, title, description, initial_request_json, simulated_response_json, explanation)
SELECT id, 'Tentativa Anônima', 'O cliente tenta ver um dashboard sem token', '{"method":"GET","path":"/dashboard"}', '{"status":401,"error":"Unauthorized"}', 'O gateway bloqueia imediatamente.' FROM missions WHERE slug = 'identifique-erro-401';

INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'client', 'SPA', 'CLIENT', 0, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'identifique-erro-401';
INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'gateway', 'Auth Gateway', 'GATEWAY', 400, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'identifique-erro-401';

INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'client', 'gateway', 'REQUEST', 'FAILED', 'GET', '/dashboard', 'Acessando recurso privado sem token', 1 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'identifique-erro-401';
INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'gateway', 'client', 'RESPONSE', 'FAILED', null, null, 'Gateway bloqueou a passagem. HTTP 401', 2 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'identifique-erro-401';

-- ---------------------------------------------------------------------------------------------------------
-- MISSÃO 5: status-code-criacao
-- ---------------------------------------------------------------------------------------------------------
INSERT INTO guided_steps (mission_id, title, content, step_type, order_index, example, common_mistake)
SELECT id, 'Status HTTP', 'O protocolo prevê o status 201 Created quando o servidor gera uma nova entidade.', 'CONCEPT', 1, 'HTTP 201', 'Retornar apenas 200 OK genérico para qualquer sucesso, ignorando o 201.' FROM missions WHERE slug = 'status-code-criacao';

INSERT INTO mission_scenarios (mission_id, title, description, initial_request_json, simulated_response_json, explanation)
SELECT id, 'Cadastro Concluído', 'Sucesso ao registrar algo novo.', '{"method":"POST","path":"/items"}', '{"status":201}', 'O servidor avisa que a criação ocorreu e costuma devolver um header Location.' FROM missions WHERE slug = 'status-code-criacao';

INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'client', 'Client', 'CLIENT', 0, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'status-code-criacao';
INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'service', 'API', 'SERVICE', 400, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'status-code-criacao';

INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'client', 'service', 'REQUEST', 'SUCCESS', 'POST', '/items', 'Criação', 1 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'status-code-criacao';
INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'service', 'client', 'RESPONSE', 'SUCCESS', null, null, 'Sucesso 201', 2 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'status-code-criacao';

-- ---------------------------------------------------------------------------------------------------------
-- MISSÃO 6: fluxo-requisicao-autenticada
-- ---------------------------------------------------------------------------------------------------------
INSERT INTO guided_steps (mission_id, title, content, step_type, order_index, example, common_mistake)
SELECT id, 'Authorization Header', 'No padrão REST JWT, o token trafega no Header.', 'CONCEPT', 1, 'Authorization: Bearer <seu-token-aqui>', 'Mandar o token na URL (queryString), o que compromete a segurança.' FROM missions WHERE slug = 'fluxo-requisicao-autenticada';

INSERT INTO mission_scenarios (mission_id, title, description, initial_request_json, simulated_response_json, explanation)
SELECT id, 'Fluxo Completo JWT', 'O cliente envia o header, o gateway valida e repassa.', '{"method":"GET","headers":{"Authorization":"Bearer token123"}}', '{"status":200,"data":"secret_area"}', 'A segurança em camadas.' FROM missions WHERE slug = 'fluxo-requisicao-autenticada';

INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'client', 'App', 'CLIENT', 0, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'fluxo-requisicao-autenticada';
INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'gateway', 'Gateway', 'GATEWAY', 300, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'fluxo-requisicao-autenticada';
INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y)
SELECT s.id, 'service', 'Serviço Interno', 'SERVICE', 600, 0 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'fluxo-requisicao-autenticada';

INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'client', 'gateway', 'REQUEST', 'SUCCESS', 'GET', '/me', 'Envia request com Authorization', 1 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'fluxo-requisicao-autenticada';
INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'gateway', 'service', 'REQUEST', 'SUCCESS', 'GET', '/me', 'Token validado, repassando...', 2 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'fluxo-requisicao-autenticada';
INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'service', 'gateway', 'RESPONSE', 'SUCCESS', null, null, 'Retorna usuário', 3 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'fluxo-requisicao-autenticada';
INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index)
SELECT s.id, 'gateway', 'client', 'RESPONSE', 'SUCCESS', null, null, 'Retorna ao cliente (200)', 4 FROM mission_scenarios s JOIN missions m ON s.mission_id = m.id WHERE m.slug = 'fluxo-requisicao-autenticada';
