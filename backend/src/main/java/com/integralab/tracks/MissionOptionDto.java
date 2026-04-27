package com.integralab.tracks;

import java.util.UUID;

public class MissionOptionDto {
    private UUID id;
    private String label;
    private String value;
    private String explanation;
    private Integer orderIndex;

    public MissionOptionDto(UUID id, String label, String value, String explanation, Integer orderIndex) {
        this.id = id;
        this.label = label;
        this.value = value;
        this.explanation = explanation;
        this.orderIndex = orderIndex;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
}
