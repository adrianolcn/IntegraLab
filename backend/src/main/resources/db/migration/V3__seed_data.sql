-- Insert Track
INSERT INTO tracks (id, title, slug, description, order_index, status)
VALUES (
    '11111111-1111-1111-1111-111111111111', 
    'Fundamentos de APIs HTTP', 
    'fundamentos-apis-http', 
    'Aprenda como uma API funciona por dentro, acompanhando o caminho de uma requisição desde o cliente até a resposta final.', 
    1, 
    'AVAILABLE'
) ON CONFLICT DO NOTHING;

-- Insert Modules
INSERT INTO learning_modules (id, track_id, title, slug, order_index, status) VALUES
('22222222-2222-2222-2222-000000000001', '11111111-1111-1111-1111-111111111111', 'O que é uma API', 'o-que-e-uma-api', 1, 'AVAILABLE'),
('22222222-2222-2222-2222-000000000002', '11111111-1111-1111-1111-111111111111', 'Request e Response', 'request-e-response', 2, 'AVAILABLE'),
('22222222-2222-2222-2222-000000000003', '11111111-1111-1111-1111-111111111111', 'Métodos HTTP', 'metodos-http', 3, 'AVAILABLE'),
('22222222-2222-2222-2222-000000000004', '11111111-1111-1111-1111-111111111111', 'Headers e Body JSON', 'headers-e-body-json', 4, 'AVAILABLE'),
('22222222-2222-2222-2222-000000000005', '11111111-1111-1111-1111-111111111111', 'Status Codes', 'status-codes', 5, 'AVAILABLE'),
('22222222-2222-2222-2222-000000000006', '11111111-1111-1111-1111-111111111111', 'Autenticação Bearer Token', 'autenticacao-bearer-token', 6, 'AVAILABLE'),
('22222222-2222-2222-2222-000000000007', '11111111-1111-1111-1111-111111111111', 'Debug de Erros', 'debug-de-erros', 7, 'AVAILABLE');

-- Insert Missions
INSERT INTO missions (id, module_id, title, slug, objective, difficulty, xp_reward, order_index, mission_type, expected_answer, success_feedback, error_feedback) VALUES
('33333333-3333-3333-3333-000000000001', '22222222-2222-2222-2222-000000000003', 'Monte sua primeira requisição GET', 'primeira-requisicao-get', 'Identifique qual método usar para buscar dados.', 'BEGINNER', 50, 1, 'MULTIPLE_CHOICE', 'GET', 'Perfeito. O método GET é usado para buscar informações sem alterar o recurso no servidor.', 'Revise os métodos HTTP. Para buscar dados, normalmente usamos GET.'),
('33333333-3333-3333-3333-000000000002', '22222222-2222-2222-2222-000000000003', 'Envie um POST com JSON', 'post-com-json', 'Identifique qual método usar para criar dados.', 'BEGINNER', 60, 2, 'MULTIPLE_CHOICE', 'POST', 'Correto. O POST é usado para enviar dados e criar um novo recurso.', 'Quando enviamos dados para criação, o método mais comum é POST.'),
('33333333-3333-3333-3333-000000000003', '22222222-2222-2222-2222-000000000007', 'Corrija um erro 400', 'corrija-erro-400', 'Identifique o problema em uma requisição inválida.', 'BEGINNER', 70, 1, 'DEBUG_CHALLENGE', 'payload_invalido', 'Exato. O erro 400 indica que a requisição possui algum problema, como payload malformado ou campos inválidos.', 'Observe o corpo da requisição. O problema está nos dados enviados pelo cliente.'),
('33333333-3333-3333-3333-000000000004', '22222222-2222-2222-2222-000000000007', 'Identifique um erro 401', 'identifique-erro-401', 'Diagnostique uma requisição que falhou na autenticação.', 'BEGINNER', 70, 2, 'DEBUG_CHALLENGE', 'token_ausente_ou_invalido', 'Correto. O erro 401 indica falha de autenticação, normalmente por token ausente, inválido ou expirado.', 'Repare no cabeçalho Authorization. A API não conseguiu autenticar a requisição.'),
('33333333-3333-3333-3333-000000000005', '22222222-2222-2222-2222-000000000005', 'Escolha o status code correto', 'status-code-criacao', 'Identifique o código retornado em sucesso de criação.', 'BEGINNER', 80, 1, 'MULTIPLE_CHOICE', '201', 'Muito bem. O status 201 Created indica que um recurso foi criado com sucesso.', 'Quando uma criação é bem-sucedida, o status mais adequado costuma ser 201 Created.'),
('33333333-3333-3333-3333-000000000006', '22222222-2222-2222-2222-000000000006', 'Siga o fluxo de uma requisição autenticada', 'fluxo-requisicao-autenticada', 'Qual header é usado para enviar o Bearer token?', 'BEGINNER', 100, 1, 'TEXT_ANSWER', 'authorization', 'Perfeito. O header Authorization carrega o token usado para autenticar a requisição.', 'Pense no cabeçalho usado para enviar o Bearer Token em uma requisição HTTP.');
