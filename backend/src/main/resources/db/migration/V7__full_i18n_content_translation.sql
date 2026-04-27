-- V7 Migration: i18n columns and seed translations

ALTER TABLE tracks ADD COLUMN IF NOT EXISTS title_en VARCHAR(255);
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS description_en TEXT;

ALTER TABLE learning_modules ADD COLUMN IF NOT EXISTS title_en VARCHAR(255);
ALTER TABLE learning_modules ADD COLUMN IF NOT EXISTS description_en TEXT;

ALTER TABLE missions ADD COLUMN IF NOT EXISTS title_en VARCHAR(255);
ALTER TABLE missions ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE missions ADD COLUMN IF NOT EXISTS objective_en TEXT;

ALTER TABLE guided_steps ADD COLUMN IF NOT EXISTS title_en VARCHAR(255);
ALTER TABLE guided_steps ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE guided_steps ADD COLUMN IF NOT EXISTS example_en TEXT;
ALTER TABLE guided_steps ADD COLUMN IF NOT EXISTS common_mistake_en TEXT;
ALTER TABLE guided_steps ADD COLUMN IF NOT EXISTS checkpoint_question_en TEXT;
ALTER TABLE guided_steps ADD COLUMN IF NOT EXISTS explanation_en TEXT;

ALTER TABLE mission_scenarios ADD COLUMN IF NOT EXISTS title_en VARCHAR(255);
ALTER TABLE mission_scenarios ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE mission_scenarios ADD COLUMN IF NOT EXISTS explanation_en TEXT;

ALTER TABLE simulation_steps ADD COLUMN IF NOT EXISTS log_message_en TEXT;

ALTER TABLE mission_options ADD COLUMN IF NOT EXISTS explanation_en TEXT;

ALTER TABLE badges ADD COLUMN IF NOT EXISTS name_en VARCHAR(255);
ALTER TABLE badges ADD COLUMN IF NOT EXISTS description_en TEXT;

-- Tracks
UPDATE tracks SET title_en = 'HTTP API Fundamentals', description_en = 'Learn how an API works internally by following the path of a request from the client to the final response.' WHERE slug = 'fundamentos-apis-http';

-- Modules
UPDATE learning_modules SET title_en = 'What is an API' WHERE order_index = 1;
UPDATE learning_modules SET title_en = 'Request and Response' WHERE order_index = 2;
UPDATE learning_modules SET title_en = 'HTTP Methods' WHERE order_index = 3;
UPDATE learning_modules SET title_en = 'Headers and JSON Body' WHERE order_index = 4;
UPDATE learning_modules SET title_en = 'Status Codes' WHERE order_index = 5;
UPDATE learning_modules SET title_en = 'Bearer Token Authentication' WHERE order_index = 6;

-- Missions
UPDATE missions SET title_en = 'Build your first GET request', description_en = 'A simple GET request to fetch data.', objective_en = 'Identify which method to use to fetch data.' WHERE slug = 'primeira-requisicao-get';
UPDATE missions SET title_en = 'Send a POST request with JSON', description_en = 'Send JSON data to the server.', objective_en = 'Learn to use the POST method with JSON.' WHERE slug = 'enviando-post-json';
UPDATE missions SET title_en = 'Fix a 400 error', description_en = 'Fix a malformed request.', objective_en = 'Understand client errors and how to fix them.' WHERE slug = 'corrigindo-erro-400';
UPDATE missions SET title_en = 'Identify a 401 error', description_en = 'Identify unauthorized access.', objective_en = 'Understand why requests fail without proper credentials.' WHERE slug = 'identificando-erro-401';
UPDATE missions SET title_en = 'Choose the correct status code', description_en = 'Select the appropriate status code.', objective_en = 'Learn the meaning of HTTP status codes.' WHERE slug = 'status-code-correto';
UPDATE missions SET title_en = 'Follow the flow of an authenticated request', description_en = 'Trace a request with authentication.', objective_en = 'Understand the full lifecycle of an authenticated request.' WHERE slug = 'fluxo-autenticado';

-- Options
UPDATE mission_options SET explanation_en = 'GET is used to retrieve data without changing the server state.' WHERE value = 'GET';
UPDATE mission_options SET explanation_en = 'POST is mainly used to send data to the server, often creating a new resource.' WHERE value = 'POST';
UPDATE mission_options SET explanation_en = 'PUT is commonly used to replace or update an entire resource.' WHERE value = 'PUT';
UPDATE mission_options SET explanation_en = 'DELETE is used to remove resources.' WHERE value = 'DELETE';

-- Badges
UPDATE badges SET name_en = 'First Request', description_en = 'Completed the first HTTP mission.' WHERE name = 'Primeira Requisição';
UPDATE badges SET name_en = '400 Hunter', description_en = 'Successfully fixed a bad request error.' WHERE name = 'Caçador de 400';
UPDATE badges SET name_en = 'Token Guardian', description_en = 'Understood basic authentication concepts.' WHERE name = 'Guardião do Token';
UPDATE badges SET name_en = 'HTTP Explorer', description_en = 'Explored the fundamentals of HTTP.' WHERE name = 'Explorador HTTP';
