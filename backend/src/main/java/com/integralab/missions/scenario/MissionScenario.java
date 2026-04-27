package com.integralab.missions.scenario;

import com.integralab.tracks.Mission;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@Entity
@Table(name = "mission_scenarios")
public class MissionScenario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(name = "initial_request_json")
    private String initialRequestJson;

    @Column(name = "simulated_response_json")
    private String simulatedResponseJson;

    @Column
    private String explanation;

    @OneToMany(mappedBy = "scenario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SimulationNode> nodes;

    @OneToMany(mappedBy = "scenario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SimulationStep> steps;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "title_en")
    private String titleEn;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Column(name = "explanation_en", columnDefinition = "TEXT")
    private String explanationEn;

    @Transient
    private String currentLocale = "pt-BR";

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Mission getMission() { return mission; }
    public void setMission(Mission mission) { this.mission = mission; }

    public String getTitle() { 
        if (currentLocale != null && currentLocale.startsWith("en") && titleEn != null && !titleEn.trim().isEmpty()) { return titleEn; }
        return title; 
    }
    public void setTitle(String title) { this.title = title; }
    public String getTitleEn() { return titleEn; }
    public void setTitleEn(String titleEn) { this.titleEn = titleEn; }

    public String getDescription() { 
        if (currentLocale != null && currentLocale.startsWith("en") && descriptionEn != null && !descriptionEn.trim().isEmpty()) { return descriptionEn; }
        return description; 
    }
    public void setDescription(String description) { this.description = description; }
    public String getDescriptionEn() { return descriptionEn; }
    public void setDescriptionEn(String descriptionEn) { this.descriptionEn = descriptionEn; }

    public String getInitialRequestJson() { return initialRequestJson; }
    public void setInitialRequestJson(String initialRequestJson) { this.initialRequestJson = initialRequestJson; }
    public String getSimulatedResponseJson() { return simulatedResponseJson; }
    public void setSimulatedResponseJson(String simulatedResponseJson) { this.simulatedResponseJson = simulatedResponseJson; }

    public String getExplanation() { 
        if (currentLocale != null && currentLocale.startsWith("en") && explanationEn != null && !explanationEn.trim().isEmpty()) { return explanationEn; }
        return explanation; 
    }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public String getExplanationEn() { return explanationEn; }
    public void setExplanationEn(String explanationEn) { this.explanationEn = explanationEn; }

    public List<SimulationNode> getNodes() { 
        return nodes; 
    }
    public void setNodes(List<SimulationNode> nodes) { this.nodes = nodes; }

    public List<SimulationStep> getSteps() { 
        if (steps != null) {
            steps.forEach(s -> s.setLocale(currentLocale));
        }
        return steps; 
    }
    public void setSteps(List<SimulationStep> steps) { this.steps = steps; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public void setLocale(String locale) { this.currentLocale = locale; }
}
