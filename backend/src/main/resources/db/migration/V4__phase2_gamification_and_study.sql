-- V4: Gamificação, Progresso e Motor de Estudo

CREATE TABLE guided_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    step_type VARCHAR(50) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    example TEXT,
    common_mistake TEXT,
    checkpoint_question TEXT,
    checkpoint_answer TEXT,
    explanation TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    best_result BOOLEAN,
    attempts_count INT NOT NULL DEFAULT 0,
    completed_at TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, mission_id)
);

CREATE TABLE attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    submitted_answer TEXT,
    correct BOOLEAN NOT NULL,
    feedback TEXT,
    xp_earned INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE xp_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mission_id UUID REFERENCES missions(id) ON DELETE SET NULL,
    amount INT NOT NULL,
    reason VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    condition_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

CREATE TABLE mission_scenarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    initial_request_json TEXT,
    simulated_response_json TEXT,
    explanation TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(mission_id)
);

CREATE TABLE simulation_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_id UUID NOT NULL REFERENCES mission_scenarios(id) ON DELETE CASCADE,
    node_key VARCHAR(100) NOT NULL,
    label VARCHAR(255) NOT NULL,
    node_type VARCHAR(50) NOT NULL,
    description TEXT,
    position_x INT NOT NULL DEFAULT 0,
    position_y INT NOT NULL DEFAULT 0,
    UNIQUE(scenario_id, node_key)
);

CREATE TABLE simulation_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_id UUID NOT NULL REFERENCES mission_scenarios(id) ON DELETE CASCADE,
    from_node_key VARCHAR(100) NOT NULL,
    to_node_key VARCHAR(100) NOT NULL,
    step_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    method VARCHAR(10),
    path TEXT,
    status_code INT,
    log_message TEXT,
    payload_example TEXT,
    response_example TEXT,
    order_index INT NOT NULL DEFAULT 0
);

-- SEED: Badges
INSERT INTO badges (id, name, description, icon, condition_type) VALUES 
('44444444-4444-4444-4444-000000000001', 'Primeira Requisição', 'Você fez sua primeira requisição com sucesso!', 'sparkles', 'FIRST_MISSION_COMPLETED'),
('44444444-4444-4444-4444-000000000002', 'Caçador de 400', 'Identificou problemas no payload do cliente.', 'bug', 'MISSION_400_COMPLETED'),
('44444444-4444-4444-4444-000000000003', 'Guardião do Token', 'Dominou a autenticação Bearer Token.', 'shield', 'MISSION_401_COMPLETED'),
('44444444-4444-4444-4444-000000000004', 'Explorador HTTP', 'Concluiu toda a trilha de Fundamentos HTTP.', 'compass', 'TRACK_1_COMPLETED');

-- SEED: Guided Steps para a Missão 1 (GET)
INSERT INTO guided_steps (mission_id, title, content, step_type, order_index, example, common_mistake) VALUES
('33333333-3333-3333-3333-000000000001', 'Cliente e Servidor', 'Na web, quem pede a informação é o Cliente, e quem responde é o Servidor. O HTTP é o idioma que eles usam para conversar.', 'CONTEXT', 1, 'Navegador (Cliente) -> Servidor', 'Achar que o servidor inicia a conversa. No HTTP, o cliente sempre começa enviando a requisição.'),
('33333333-3333-3333-3333-000000000001', 'Método GET', 'Quando você quer apenas ler ou buscar informações sem alterar nada, você usa o método GET.', 'CONCEPT', 2, 'GET /produtos', 'Usar GET para tentar criar dados. O GET é focado em leitura.');

-- SEED: Mission Scenario para a Missão 1
INSERT INTO mission_scenarios (id, mission_id, title, description, initial_request_json, simulated_response_json, explanation) VALUES
('55555555-5555-5555-5555-000000000001', '33333333-3333-3333-3333-000000000001', 'Buscando Produtos', 'Simulação de uma chamada para listar produtos do catálogo', '{"method":"GET","path":"/api/products"}', '{"status":200,"data":[{"id":1,"name":"Teclado"}]}', 'O fluxo completo de uma requisição simples de leitura.');

-- SEED: Simulation Nodes para Missão 1
INSERT INTO simulation_nodes (scenario_id, node_key, label, node_type, position_x, position_y) VALUES
('55555555-5555-5555-5555-000000000001', 'client', 'Seu Computador', 'CLIENT', 0, 0),
('55555555-5555-5555-5555-000000000001', 'gateway', 'API Gateway', 'GATEWAY', 250, 0),
('55555555-5555-5555-5555-000000000001', 'service', 'Serviço de Produtos', 'SERVICE', 500, 0);

-- SEED: Simulation Steps para Missão 1
INSERT INTO simulation_steps (scenario_id, from_node_key, to_node_key, step_type, status, method, path, log_message, order_index) VALUES
('55555555-5555-5555-5555-000000000001', 'client', 'gateway', 'REQUEST', 'SUCCESS', 'GET', '/api/products', 'Cliente enviou GET request para o Gateway', 1),
('55555555-5555-5555-5555-000000000001', 'gateway', 'service', 'REQUEST', 'SUCCESS', 'GET', '/products', 'Gateway repassou para o serviço de produtos', 2),
('55555555-5555-5555-5555-000000000001', 'service', 'gateway', 'RESPONSE', 'SUCCESS', null, null, 'Serviço retornou lista de produtos com status 200', 3),
('55555555-5555-5555-5555-000000000001', 'gateway', 'client', 'RESPONSE', 'SUCCESS', null, null, 'Gateway devolveu a resposta JSON ao cliente', 4);

