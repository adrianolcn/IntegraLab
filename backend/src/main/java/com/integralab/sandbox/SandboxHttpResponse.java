package com.integralab.sandbox;

import java.util.List;
import java.util.Map;

public class SandboxHttpResponse {
    private int statusCode;
    private String statusText;
    private Map<String, String> responseHeaders;
    private Object responseBody;
    private List<String> logs;
    private String matchedRule;
    private List<String> hints;

    public SandboxHttpResponse() {}

    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }

    public String getStatusText() { return statusText; }
    public void setStatusText(String statusText) { this.statusText = statusText; }

    public Map<String, String> getResponseHeaders() { return responseHeaders; }
    public void setResponseHeaders(Map<String, String> responseHeaders) { this.responseHeaders = responseHeaders; }

    public Object getResponseBody() { return responseBody; }
    public void setResponseBody(Object responseBody) { this.responseBody = responseBody; }

    public List<String> getLogs() { return logs; }
    public void setLogs(List<String> logs) { this.logs = logs; }

    public String getMatchedRule() { return matchedRule; }
    public void setMatchedRule(String matchedRule) { this.matchedRule = matchedRule; }

    public List<String> getHints() { return hints; }
    public void setHints(List<String> hints) { this.hints = hints; }
}
