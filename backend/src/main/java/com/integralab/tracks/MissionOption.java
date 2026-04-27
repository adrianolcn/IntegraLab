package com.integralab.tracks;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "mission_options")
public class MissionOption {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    @Column(nullable = false)
    private String label;

    @Column(nullable = false)
    private String value;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(nullable = false)
    private boolean correct;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex = 0;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "explanation_en", columnDefinition = "TEXT")
    private String explanationEn;

    @Transient
    private String currentLocale = "pt-BR";

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Mission getMission() { return mission; }
    public void setMission(Mission mission) { this.mission = mission; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }

    public String getExplanation() { 
        if (currentLocale != null && currentLocale.startsWith("en") && explanationEn != null && !explanationEn.trim().isEmpty()) { return explanationEn; }
        return explanation; 
    }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public String getExplanationEn() { return explanationEn; }
    public void setExplanationEn(String explanationEn) { this.explanationEn = explanationEn; }

    public boolean isCorrect() { return correct; }
    public void setCorrect(boolean correct) { this.correct = correct; }
    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setLocale(String locale) { this.currentLocale = locale; }
}
