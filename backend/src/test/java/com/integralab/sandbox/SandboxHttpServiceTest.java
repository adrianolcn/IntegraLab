package com.integralab.sandbox;

import org.junit.jupiter.api.Test;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;

class SandboxHttpServiceTest {

    private final SandboxHttpService service = new SandboxHttpService();

    @Test
    void testGetProducts() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("GET");
        request.setPath("/products");
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(200, response.getStatusCode());
        assertEquals("GET_PRODUCTS", response.getMatchedRule());
    }

    @Test
    void testGetProductDetailFound() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("GET");
        request.setPath("/products/1");
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(200, response.getStatusCode());
        assertEquals("GET_PRODUCT_DETAIL", response.getMatchedRule());
    }

    @Test
    void testGetProductDetailNotFound() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("GET");
        request.setPath("/products/999");
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(404, response.getStatusCode());
        assertEquals("PRODUCT_NOT_FOUND", response.getMatchedRule());
    }

    @Test
    void testPostProductsValid() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("POST");
        request.setPath("/products");
        request.setBody(Map.of("name", "Test Product"));
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(201, response.getStatusCode());
        assertEquals("POST_PRODUCTS", response.getMatchedRule());
    }

    @Test
    void testPostProductsMissingBody() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("POST");
        request.setPath("/products");
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(400, response.getStatusCode());
        assertEquals("MISSING_BODY", response.getMatchedRule());
    }

    @Test
    void testGetSecureWithoutToken() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("GET");
        request.setPath("/secure");
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(401, response.getStatusCode());
        assertEquals("MISSING_AUTH", response.getMatchedRule());
    }

    @Test
    void testGetSecureWithValidToken() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("GET");
        request.setPath("/secure");
        request.setHeaders(Map.of("Authorization", "Bearer demo-token"));
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(200, response.getStatusCode());
        assertEquals("GET_SECURE_OK", response.getMatchedRule());
    }

    @Test
    void testUnknownRoute() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("GET");
        request.setPath("/unknown");
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(404, response.getStatusCode());
        assertEquals("ROUTE_NOT_FOUND", response.getMatchedRule());
    }

    @Test
    void testPostProductsMissingName() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("POST");
        request.setPath("/products");
        request.setBody(Map.of("description", "No name field"));
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(422, response.getStatusCode());
        assertEquals("MISSING_REQUIRED_FIELD", response.getMatchedRule());
    }

    @Test
    void testGetSecureWithInvalidToken() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("GET");
        request.setPath("/secure");
        request.setHeaders(Map.of("Authorization", "Bearer invalid-token"));
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(401, response.getStatusCode());
        assertEquals("INVALID_TOKEN", response.getMatchedRule());
    }

    @Test
    void testMethodNotAllowed() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("PUT");
        request.setPath("/products");
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(405, response.getStatusCode());
        assertEquals("METHOD_NOT_ALLOWED", response.getMatchedRule());
    }

    @Test
    void testInvalidPathFormat() {
        SandboxHttpRequest request = new SandboxHttpRequest();
        request.setMethod("GET");
        request.setPath("products"); // missing leading slash
        SandboxHttpResponse response = service.processRequest(request);
        assertEquals(400, response.getStatusCode());
        assertEquals("INVALID_PATH_FORMAT", response.getMatchedRule());
    }
}
