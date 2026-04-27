package com.integralab.sandbox;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sandbox/http")
public class SandboxController {

    private final SandboxHttpService sandboxHttpService;

    public SandboxController(SandboxHttpService sandboxHttpService) {
        this.sandboxHttpService = sandboxHttpService;
    }

    @PostMapping("/request")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SandboxHttpResponse> executeRequest(@RequestBody SandboxHttpRequest request) {
        SandboxHttpResponse response = sandboxHttpService.processRequest(request);
        return ResponseEntity.ok(response);
    }
}
