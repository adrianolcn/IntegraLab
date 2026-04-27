package com.integralab.tracks;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "missions")
public class Mission {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "module_id", nullable = false)
    private UUID moduleId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String objective;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty = Difficulty.BEGINNER;

    @Column(name = "xp_reward", nullable = false)
    private Integer xpReward = 0;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MissionStatus status = MissionStatus.AVAILABLE;

    @Enumerated(EnumType.STRING)
    @Column(name = "mission_type", nullable = false)
    private MissionType missionType;

    @Column(name = "expected_answer", columnDefinition = "TEXT")
    private String expectedAnswer;

    @Column(name = "success_feedback", columnDefinition = "TEXT")
    private String successFeedback;

    @Column(name = "error_feedback", columnDefinition = "TEXT")
    private String errorFeedback;

    @Enumerated(EnumType.STRING)
    @Column(name = "validation_strategy", nullable = false)
    private ValidationStrategy validationStrategy = ValidationStrategy.EXACT_NORMALIZED;

    @Column(name = "accepted_answers", columnDefinition = "TEXT")
    private String acceptedAnswers;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "title_en")
    private String titleEn;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Column(name = "objective_en", columnDefinition = "TEXT")
    private String objectiveEn;

    @Transient
    private String currentLocale = "pt-BR";

    public UUID getId() { return id; }
    public UUID getModuleId() { return moduleId; }

    public String getTitle() { 
        if (currentLocale != null && currentLocale.startsWith("en") && titleEn != null && !titleEn.trim().isEmpty()) {
            return titleEn;
        }
        return title; 
    }
    public void setTitle(String title) { this.title = title; }
    public String getTitleEn() { return titleEn; }
    public void setTitleEn(String titleEn) { this.titleEn = titleEn; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getDescription() { 
        if (currentLocale != null && currentLocale.startsWith("en") && descriptionEn != null && !descriptionEn.trim().isEmpty()) {
            return descriptionEn;
        }
        return description; 
    }
    public void setDescription(String description) { this.description = description; }
    public String getDescriptionEn() { return descriptionEn; }
    public void setDescriptionEn(String descriptionEn) { this.descriptionEn = descriptionEn; }

    public String getObjective() { 
        if (currentLocale != null && currentLocale.startsWith("en") && objectiveEn != null && !objectiveEn.trim().isEmpty()) {
            return objectiveEn;
        }
        return objective; 
    }
    public void setObjective(String objective) { this.objective = objective; }
    public String getObjectiveEn() { return objectiveEn; }
    public void setObjectiveEn(String objectiveEn) { this.objectiveEn = objectiveEn; }

    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }

    public Integer getXpReward() { return xpReward; }
    public void setXpReward(Integer xpReward) { this.xpReward = xpReward; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }

    public MissionStatus getStatus() { return status; }
    public void setStatus(MissionStatus status) { this.status = status; }

    public MissionType getMissionType() { return missionType; }
    public void setMissionType(MissionType missionType) { this.missionType = missionType; }

    public String getExpectedAnswer() { return expectedAnswer; }
    public void setExpectedAnswer(String expectedAnswer) { this.expectedAnswer = expectedAnswer; }

    public String getSuccessFeedback() { return successFeedback; }
    public void setSuccessFeedback(String successFeedback) { this.successFeedback = successFeedback; }

    public String getErrorFeedback() { return errorFeedback; }
    public void setErrorFeedback(String errorFeedback) { this.errorFeedback = errorFeedback; }

    public ValidationStrategy getValidationStrategy() { return validationStrategy; }
    public void setValidationStrategy(ValidationStrategy validationStrategy) { this.validationStrategy = validationStrategy; }

    public String getAcceptedAnswers() { return acceptedAnswers; }
    public void setAcceptedAnswers(String acceptedAnswers) { this.acceptedAnswers = acceptedAnswers; }

    public void setLocale(String locale) { this.currentLocale = locale; }
}
