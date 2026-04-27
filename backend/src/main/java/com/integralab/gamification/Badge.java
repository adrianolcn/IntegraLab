package com.integralab.gamification;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column
    private String icon;

    @Column(name = "condition_type", nullable = false)
    private String conditionType;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Transient
    private String currentLocale = "pt-BR";

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { 
        if (currentLocale != null && currentLocale.startsWith("en") && nameEn != null && !nameEn.trim().isEmpty()) { return nameEn; }
        return name; 
    }
    public void setName(String name) { this.name = name; }
    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }

    public String getDescription() { 
        if (currentLocale != null && currentLocale.startsWith("en") && descriptionEn != null && !descriptionEn.trim().isEmpty()) { return descriptionEn; }
        return description; 
    }
    public void setDescription(String description) { this.description = description; }
    public String getDescriptionEn() { return descriptionEn; }
    public void setDescriptionEn(String descriptionEn) { this.descriptionEn = descriptionEn; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public String getConditionType() { return conditionType; }
    public void setConditionType(String conditionType) { this.conditionType = conditionType; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public void setLocale(String locale) { this.currentLocale = locale; }
}
