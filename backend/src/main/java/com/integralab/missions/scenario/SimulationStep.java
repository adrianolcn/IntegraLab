package com.integralab.missions.scenario;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "simulation_steps")
public class SimulationStep {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scenario_id", nullable = false)
    private MissionScenario scenario;

    @Column(name = "from_node_key", nullable = false)
    private String fromNodeKey;

    @Column(name = "to_node_key", nullable = false)
    private String toNodeKey;

    @Column(name = "step_type", nullable = false)
    private String stepType;

    @Column(nullable = false)
    private String status = "PENDING";

    @Column
    private String method;

    @Column
    private String path;

    @Column(name = "status_code")
    private Integer statusCode;

    @Column(name = "log_message")
    private String logMessage;

    @Column(name = "payload_example")
    private String payloadExample;

    @Column(name = "response_example")
    private String responseExample;

    @Column(name = "order_index", nullable = false)
    private int orderIndex = 0;

    @Column(name = "log_message_en", columnDefinition = "TEXT")
    private String logMessageEn;

    @Transient
    private String currentLocale = "pt-BR";

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public MissionScenario getScenario() { return scenario; }
    public void setScenario(MissionScenario scenario) { this.scenario = scenario; }
    public String getFromNodeKey() { return fromNodeKey; }
    public void setFromNodeKey(String fromNodeKey) { this.fromNodeKey = fromNodeKey; }
    public String getToNodeKey() { return toNodeKey; }
    public void setToNodeKey(String toNodeKey) { this.toNodeKey = toNodeKey; }
    public String getStepType() { return stepType; }
    public void setStepType(String stepType) { this.stepType = stepType; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
    public Integer getStatusCode() { return statusCode; }
    public void setStatusCode(Integer statusCode) { this.statusCode = statusCode; }

    public String getLogMessage() { 
        if (currentLocale != null && currentLocale.startsWith("en") && logMessageEn != null && !logMessageEn.trim().isEmpty()) { return logMessageEn; }
        return logMessage; 
    }
    public void setLogMessage(String logMessage) { this.logMessage = logMessage; }
    public String getLogMessageEn() { return logMessageEn; }
    public void setLogMessageEn(String logMessageEn) { this.logMessageEn = logMessageEn; }

    public String getPayloadExample() { return payloadExample; }
    public void setPayloadExample(String payloadExample) { this.payloadExample = payloadExample; }
    public String getResponseExample() { return responseExample; }
    public void setResponseExample(String responseExample) { this.responseExample = responseExample; }
    public int getOrderIndex() { return orderIndex; }
    public void setOrderIndex(int orderIndex) { this.orderIndex = orderIndex; }

    public void setLocale(String locale) { this.currentLocale = locale; }
}
