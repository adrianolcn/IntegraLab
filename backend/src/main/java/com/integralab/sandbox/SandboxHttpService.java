package com.integralab.sandbox;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SandboxHttpService {

    public SandboxHttpResponse processRequest(SandboxHttpRequest request) {
        SandboxHttpResponse response = new SandboxHttpResponse();
        List<String> logs = new ArrayList<>();
        List<String> hints = new ArrayList<>();
        
        logs.add("Request recebida pelo sandbox.");

        String method = request.getMethod();
        String path = request.getPath();

        if (method == null || path == null) {
            return buildErrorResponse(400, "Bad Request", "Método e path são obrigatórios.", logs, hints, "INVALID_INPUT");
        }
        method = method.toUpperCase();
        
        if (!path.startsWith("/")) {
            return buildErrorResponse(400, "Bad Request", "O path deve começar com '/'. Não use URLs completas.", logs, hints, "INVALID_PATH_FORMAT");
        }
        
        logs.add("Método " + method + " identificado.");
        logs.add("Rota " + path + " encontrada.");

        // Rule 1, 2, 3: GET /products
        if (path.equals("/products") && method.equals("GET")) {
            return buildProductsListResponse(logs, hints);
        } else if (path.matches("/products/\\d+") && method.equals("GET")) {
            String idStr = path.substring("/products/".length());
            int id = Integer.parseInt(idStr);
            if (id == 1) {
                return buildProductDetailResponse(logs, hints);
            } else {
                return buildErrorResponse(404, "Not Found", "Produto com ID " + id + " não existe na base de dados simulada.", logs, hints, "PRODUCT_NOT_FOUND");
            }
        } 
        // Rule 4, 5, 6, 7: POST /products
        else if (path.equals("/products") && method.equals("POST")) {
            Object body = request.getBody();
            if (body == null) {
                hints.add("O método POST exige que os dados do novo recurso sejam enviados no payload (body).");
                return buildErrorResponse(400, "Bad Request", "Ausência de payload.", logs, hints, "MISSING_BODY");
            }
            if (!(body instanceof Map)) {
                hints.add("Certifique-se de enviar um JSON válido no formato chave-valor (objeto).");
                return buildErrorResponse(400, "Bad Request", "JSON inválido ou não é um objeto.", logs, hints, "INVALID_JSON");
            }
            Map<?, ?> mapBody = (Map<?, ?>) body;
            if (!mapBody.containsKey("name") || mapBody.get("name") == null || mapBody.get("name").toString().trim().isEmpty()) {
                hints.add("A API de produtos exige que o campo 'name' seja fornecido para criar um produto.");
                return buildErrorResponse(422, "Unprocessable Entity", "Campo obrigatório 'name' ausente.", logs, hints, "MISSING_REQUIRED_FIELD");
            }
            return buildProductCreatedResponse(mapBody, logs, hints);
        }
        // Method not allowed on /products
        else if (path.startsWith("/products")) {
            hints.add("Verifique qual método HTTP é suportado nesta rota.");
            return buildErrorResponse(405, "Method Not Allowed", "Método " + method + " não suportado nesta rota.", logs, hints, "METHOD_NOT_ALLOWED");
        }
        // Rule 8, 9, 10: /secure
        else if (path.equals("/secure") && method.equals("GET")) {
            Map<String, String> headers = request.getHeaders();
            String auth = getHeaderIgnoreCase(headers, "Authorization");
            if (auth == null || auth.trim().isEmpty()) {
                hints.add("Rotas protegidas requerem um header de Authorization.");
                return buildErrorResponse(401, "Unauthorized", "Header Authorization ausente.", logs, hints, "MISSING_AUTH");
            }
            if (!auth.equals("Bearer demo-token")) {
                hints.add("O token fornecido expirou ou é inválido. Tente usar 'Bearer demo-token'.");
                return buildErrorResponse(401, "Unauthorized", "Token inválido ou expirado.", logs, hints, "INVALID_TOKEN");
            }
            return buildSecureSuccessResponse(logs, hints);
        }
        else if (path.startsWith("/secure")) {
            return buildErrorResponse(405, "Method Not Allowed", "Método " + method + " não suportado nesta rota.", logs, hints, "METHOD_NOT_ALLOWED");
        }
        // Rule 11: /unknown
        else {
            hints.add("Essa rota não foi implementada neste servidor.");
            return buildErrorResponse(404, "Not Found", "A rota " + path + " não existe.", logs, hints, "ROUTE_NOT_FOUND");
        }
    }

    private SandboxHttpResponse buildProductsListResponse(List<String> logs, List<String> hints) {
        SandboxHttpResponse response = new SandboxHttpResponse();
        response.setStatusCode(200);
        response.setStatusText("OK");
        response.setResponseHeaders(Map.of("Content-Type", "application/json"));
        response.setResponseBody(Map.of("items", List.of(
            Map.of("id", 1, "name", "Produto Demo"),
            Map.of("id", 2, "name", "Produto Secundário")
        )));
        logs.add("Consulta simulada executada.");
        logs.add("Resposta 200 OK retornada.");
        hints.add("GET é usado para buscar dados sem alterar o estado do servidor.");
        response.setLogs(logs);
        response.setHints(hints);
        response.setMatchedRule("GET_PRODUCTS");
        return response;
    }

    private SandboxHttpResponse buildProductDetailResponse(List<String> logs, List<String> hints) {
        SandboxHttpResponse response = new SandboxHttpResponse();
        response.setStatusCode(200);
        response.setStatusText("OK");
        response.setResponseHeaders(Map.of("Content-Type", "application/json"));
        response.setResponseBody(Map.of("id", 1, "name", "Produto Demo", "price", 99.90));
        logs.add("Busca por ID=1 simulada com sucesso.");
        hints.add("Path params (ex: /products/1) são usados para identificar um recurso específico.");
        response.setLogs(logs);
        response.setHints(hints);
        response.setMatchedRule("GET_PRODUCT_DETAIL");
        return response;
    }

    private SandboxHttpResponse buildProductCreatedResponse(Map<?, ?> body, List<String> logs, List<String> hints) {
        SandboxHttpResponse response = new SandboxHttpResponse();
        response.setStatusCode(201);
        response.setStatusText("Created");
        response.setResponseHeaders(Map.of("Content-Type", "application/json", "Location", "/products/3"));
        Map<String, Object> respBody = new HashMap<>();
        respBody.put("id", 3);
        respBody.put("name", body.get("name"));
        respBody.put("createdAt", "2026-04-26T12:00:00Z");
        response.setResponseBody(respBody);
        logs.add("Payload processado.");
        logs.add("Recurso salvo simuladamente com ID=3.");
        hints.add("O código 201 Created é a resposta padrão para criação bem-sucedida de um recurso.");
        response.setLogs(logs);
        response.setHints(hints);
        response.setMatchedRule("POST_PRODUCTS");
        return response;
    }

    private SandboxHttpResponse buildSecureSuccessResponse(List<String> logs, List<String> hints) {
        SandboxHttpResponse response = new SandboxHttpResponse();
        response.setStatusCode(200);
        response.setStatusText("OK");
        response.setResponseHeaders(Map.of("Content-Type", "application/json"));
        response.setResponseBody(Map.of("message", "Acesso concedido aos dados sigilosos", "user", "admin"));
        logs.add("Token Bearer validado com sucesso.");
        hints.add("O backend usou o token do header Authorization para te identificar e autorizar a requisição.");
        response.setLogs(logs);
        response.setHints(hints);
        response.setMatchedRule("GET_SECURE_OK");
        return response;
    }

    private SandboxHttpResponse buildErrorResponse(int statusCode, String statusText, String message, List<String> logs, List<String> hints, String rule) {
        SandboxHttpResponse response = new SandboxHttpResponse();
        response.setStatusCode(statusCode);
        response.setStatusText(statusText);
        response.setResponseHeaders(Map.of("Content-Type", "application/json"));
        response.setResponseBody(Map.of("error", statusText, "message", message));
        logs.add("Erro validado localmente pelo Sandbox (Status " + statusCode + ").");
        response.setLogs(logs);
        response.setHints(hints);
        response.setMatchedRule(rule);
        return response;
    }

    private String getHeaderIgnoreCase(Map<String, String> headers, String key) {
        if (headers == null) return null;
        for (Map.Entry<String, String> entry : headers.entrySet()) {
            if (entry.getKey().equalsIgnoreCase(key)) {
                return entry.getValue();
            }
        }
        return null;
    }
}
