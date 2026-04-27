package com.integralab.sandbox;

import java.util.Map;

public class SandboxHttpRequest {
    private String method;
    private String path;
    private Map<String, String> headers;
    private Object body;

    public SandboxHttpRequest() {}

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public Map<String, String> getHeaders() { return headers; }
    public void setHeaders(Map<String, String> headers) { this.headers = headers; }

    public Object getBody() { return body; }
    public void setBody(Object body) { this.body = body; }
}
