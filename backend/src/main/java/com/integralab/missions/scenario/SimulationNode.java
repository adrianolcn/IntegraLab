package com.integralab.missions.scenario;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "simulation_nodes")
public class SimulationNode {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scenario_id", nullable = false)
    private MissionScenario scenario;

    @Column(name = "node_key", nullable = false)
    private String nodeKey;

    @Column(nullable = false)
    private String label;

    @Column(name = "node_type", nullable = false)
    private String nodeType;

    @Column
    private String description;

    @Column(name = "position_x", nullable = false)
    private int positionX = 0;

    @Column(name = "position_y", nullable = false)
    private int positionY = 0;

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public MissionScenario getScenario() { return scenario; }
    public void setScenario(MissionScenario scenario) { this.scenario = scenario; }
    public String getNodeKey() { return nodeKey; }
    public void setNodeKey(String nodeKey) { this.nodeKey = nodeKey; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public String getNodeType() { return nodeType; }
    public void setNodeType(String nodeType) { this.nodeType = nodeType; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getPositionX() { return positionX; }
    public void setPositionX(int positionX) { this.positionX = positionX; }
    public int getPositionY() { return positionY; }
    public void setPositionY(int positionY) { this.positionY = positionY; }
}
