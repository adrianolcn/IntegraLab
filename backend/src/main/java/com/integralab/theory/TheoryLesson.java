package com.integralab.theory;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "theory_lessons")
public class TheoryLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "module_id", nullable = false)
    private UUID moduleId;

    @Column(nullable = false)
    private String title;

    @Column(name = "title_en")
    private String titleEn;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String summary;

    @Column(name = "summary_en", columnDefinition = "TEXT")
    private String summaryEn;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "content_en", columnDefinition = "TEXT")
    private String contentEn;

    @Column(name = "key_concepts", columnDefinition = "TEXT")
    private String keyConcepts;

    @Column(name = "key_concepts_en", columnDefinition = "TEXT")
    private String keyConceptsEn;

    @Column(name = "common_mistakes", columnDefinition = "TEXT")
    private String commonMistakes;

    @Column(name = "common_mistakes_en", columnDefinition = "TEXT")
    private String commonMistakesEn;

    @Column(name = "practical_example", columnDefinition = "TEXT")
    private String practicalExample;

    @Column(name = "practical_example_en", columnDefinition = "TEXT")
    private String practicalExampleEn;

    @Column(name = "request_example", columnDefinition = "TEXT")
    private String requestExample;

    @Column(name = "request_example_en", columnDefinition = "TEXT")
    private String requestExampleEn;

    @Column(name = "response_example", columnDefinition = "TEXT")
    private String responseExample;

    @Column(name = "response_example_en", columnDefinition = "TEXT")
    private String responseExampleEn;

    @Column(name = "related_concepts", columnDefinition = "TEXT")
    private String relatedConcepts;

    @Column(name = "related_concepts_en", columnDefinition = "TEXT")
    private String relatedConceptsEn;

    @Column(name = "before_mission", columnDefinition = "TEXT")
    private String beforeMission;

    @Column(name = "before_mission_en", columnDefinition = "TEXT")
    private String beforeMissionEn;

    @Column(name = "learning_objectives", columnDefinition = "TEXT")
    private String learningObjectives;

    @Column(name = "learning_objectives_en", columnDefinition = "TEXT")
    private String learningObjectivesEn;

    @Column(columnDefinition = "TEXT")
    private String analogy;

    @Column(name = "analogy_en", columnDefinition = "TEXT")
    private String analogyEn;

    @Column(name = "key_concepts_detailed", columnDefinition = "TEXT")
    private String keyConceptsDetailed;

    @Column(name = "key_concepts_detailed_en", columnDefinition = "TEXT")
    private String keyConceptsDetailedEn;

    @Column(name = "common_mistakes_detailed", columnDefinition = "TEXT")
    private String commonMistakesDetailed;

    @Column(name = "common_mistakes_detailed_en", columnDefinition = "TEXT")
    private String commonMistakesDetailedEn;

    @Column(columnDefinition = "TEXT")
    private String glossary;

    @Column(name = "glossary_en", columnDefinition = "TEXT")
    private String glossaryEn;

    @Column(name = "mini_quiz", columnDefinition = "TEXT")
    private String miniQuiz;

    @Column(name = "mini_quiz_en", columnDefinition = "TEXT")
    private String miniQuizEn;

    @Column(name = "interactive_content", columnDefinition = "TEXT")
    private String interactiveContent;

    @Column(name = "interactive_content_en", columnDefinition = "TEXT")
    private String interactiveContentEn;

    @Column(name = "interactive_flow", columnDefinition = "TEXT")
    private String interactiveFlow;

    @Column(name = "interactive_flow_en", columnDefinition = "TEXT")
    private String interactiveFlowEn;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex = 0;

    @Column(name = "reading_time_minutes", nullable = false)
    private Integer readingTimeMinutes = 5;

    @Column(name = "related_mission_id")
    private UUID relatedMissionId;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Transient
    private String currentLocale = "pt-BR";

    public void setLocale(String locale) {
        this.currentLocale = locale;
    }

    private String getLocalized(String pt, String en) {
        if (currentLocale != null && currentLocale.startsWith("en") && en != null && !en.trim().isEmpty()) {
            return en;
        }
        return pt;
    }

    // Getters and localized accessors
    public UUID getId() { return id; }
    public UUID getModuleId() { return moduleId; }
    public Integer getOrderIndex() { return orderIndex; }
    public Integer getReadingTimeMinutes() { return readingTimeMinutes; }
    public UUID getRelatedMissionId() { return relatedMissionId; }

    public String getTitle() { return getLocalized(title, titleEn); }
    public void setTitle(String title) { this.title = title; }
    public void setTitleEn(String titleEn) { this.titleEn = titleEn; }
    
    public String getSummary() { return getLocalized(summary, summaryEn); }
    public String getContent() { return getLocalized(content, contentEn); }
    public String getKeyConcepts() { return getLocalized(keyConcepts, keyConceptsEn); }
    public String getCommonMistakes() { return getLocalized(commonMistakes, commonMistakesEn); }
    public String getPracticalExample() { return getLocalized(practicalExample, practicalExampleEn); }
    public String getRequestExample() { return getLocalized(requestExample, requestExampleEn); }
    public String getResponseExample() { return getLocalized(responseExample, responseExampleEn); }
    public String getRelatedConcepts() { return getLocalized(relatedConcepts, relatedConceptsEn); }
    public String getBeforeMission() { return getLocalized(beforeMission, beforeMissionEn); }

    public String getLearningObjectives() { return getLocalized(learningObjectives, learningObjectivesEn); }
    public String getAnalogy() { return getLocalized(analogy, analogyEn); }
    public String getKeyConceptsDetailed() { return getLocalized(keyConceptsDetailed, keyConceptsDetailedEn); }
    public String getCommonMistakesDetailed() { return getLocalized(commonMistakesDetailed, commonMistakesDetailedEn); }
    public String getGlossary() { return getLocalized(glossary, glossaryEn); }
    public String getMiniQuiz() { return getLocalized(miniQuiz, miniQuizEn); }
    public String getInteractiveContent() { return getLocalized(interactiveContent, interactiveContentEn); }
    public String getInteractiveFlow() { return getLocalized(interactiveFlow, interactiveFlowEn); }
}
