package com.integralab.missions.study;

import com.integralab.tracks.Mission;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "guided_steps")
public class GuidedStep {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "step_type", nullable = false)
    private StepType stepType;

    @Column(name = "order_index", nullable = false)
    private int orderIndex = 0;

    @Column
    private String example;

    @Column(name = "common_mistake")
    private String commonMistake;

    @Column(name = "checkpoint_question")
    private String checkpointQuestion;

    @Column(name = "checkpoint_answer")
    private String checkpointAnswer;

    @Column
    private String explanation;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "title_en")
    private String titleEn;

    @Column(name = "content_en", columnDefinition = "TEXT")
    private String contentEn;

    @Column(name = "example_en", columnDefinition = "TEXT")
    private String exampleEn;

    @Column(name = "common_mistake_en", columnDefinition = "TEXT")
    private String commonMistakeEn;

    @Column(name = "checkpoint_question_en", columnDefinition = "TEXT")
    private String checkpointQuestionEn;

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

    public String getContent() { 
        if (currentLocale != null && currentLocale.startsWith("en") && contentEn != null && !contentEn.trim().isEmpty()) { return contentEn; }
        return content; 
    }
    public void setContent(String content) { this.content = content; }
    public String getContentEn() { return contentEn; }
    public void setContentEn(String contentEn) { this.contentEn = contentEn; }

    public StepType getStepType() { return stepType; }
    public void setStepType(StepType stepType) { this.stepType = stepType; }
    public int getOrderIndex() { return orderIndex; }
    public void setOrderIndex(int orderIndex) { this.orderIndex = orderIndex; }

    public String getExample() { 
        if (currentLocale != null && currentLocale.startsWith("en") && exampleEn != null && !exampleEn.trim().isEmpty()) { return exampleEn; }
        return example; 
    }
    public void setExample(String example) { this.example = example; }
    public String getExampleEn() { return exampleEn; }
    public void setExampleEn(String exampleEn) { this.exampleEn = exampleEn; }

    public String getCommonMistake() { 
        if (currentLocale != null && currentLocale.startsWith("en") && commonMistakeEn != null && !commonMistakeEn.trim().isEmpty()) { return commonMistakeEn; }
        return commonMistake; 
    }
    public void setCommonMistake(String commonMistake) { this.commonMistake = commonMistake; }
    public String getCommonMistakeEn() { return commonMistakeEn; }
    public void setCommonMistakeEn(String commonMistakeEn) { this.commonMistakeEn = commonMistakeEn; }

    public String getCheckpointQuestion() { 
        if (currentLocale != null && currentLocale.startsWith("en") && checkpointQuestionEn != null && !checkpointQuestionEn.trim().isEmpty()) { return checkpointQuestionEn; }
        return checkpointQuestion; 
    }
    public void setCheckpointQuestion(String checkpointQuestion) { this.checkpointQuestion = checkpointQuestion; }
    public String getCheckpointQuestionEn() { return checkpointQuestionEn; }
    public void setCheckpointQuestionEn(String checkpointQuestionEn) { this.checkpointQuestionEn = checkpointQuestionEn; }

    public String getCheckpointAnswer() { return checkpointAnswer; }
    public void setCheckpointAnswer(String checkpointAnswer) { this.checkpointAnswer = checkpointAnswer; }

    public String getExplanation() { 
        if (currentLocale != null && currentLocale.startsWith("en") && explanationEn != null && !explanationEn.trim().isEmpty()) { return explanationEn; }
        return explanation; 
    }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public String getExplanationEn() { return explanationEn; }
    public void setExplanationEn(String explanationEn) { this.explanationEn = explanationEn; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public void setLocale(String locale) { this.currentLocale = locale; }
}
