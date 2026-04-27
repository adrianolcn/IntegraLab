package com.integralab.theory;

import java.util.UUID;

public class TheoryLessonDto {
    private UUID id;
    private UUID moduleId;
    private String title;
    private String summary;
    private String content;
    private String keyConcepts;
    private String commonMistakes;
    private String practicalExample;
    private String requestExample;
    private String responseExample;
    private String relatedConcepts;
    private String beforeMission;
    
    private String learningObjectives;
    private String analogy;
    private String keyConceptsDetailed;
    private String commonMistakesDetailed;
    private String glossary;
    private String miniQuiz;
    private String interactiveContent;
    private String interactiveFlow;

    private Integer orderIndex;
    private Integer readingTimeMinutes;
    private UUID relatedMissionId;
    private String relatedMissionSlug;
    private String relatedMissionTitle;

    public TheoryLessonDto() {}

    public TheoryLessonDto(TheoryLesson lesson) {
        this.id = lesson.getId();
        this.moduleId = lesson.getModuleId();
        this.title = lesson.getTitle();
        this.summary = lesson.getSummary();
        this.content = lesson.getContent();
        this.keyConcepts = lesson.getKeyConcepts();
        this.commonMistakes = lesson.getCommonMistakes();
        this.practicalExample = lesson.getPracticalExample();
        this.requestExample = lesson.getRequestExample();
        this.responseExample = lesson.getResponseExample();
        this.relatedConcepts = lesson.getRelatedConcepts();
        this.beforeMission = lesson.getBeforeMission();
        
        this.learningObjectives = lesson.getLearningObjectives();
        this.analogy = lesson.getAnalogy();
        this.keyConceptsDetailed = lesson.getKeyConceptsDetailed();
        this.commonMistakesDetailed = lesson.getCommonMistakesDetailed();
        this.glossary = lesson.getGlossary();
        this.miniQuiz = lesson.getMiniQuiz();
        this.interactiveContent = lesson.getInteractiveContent();
        this.interactiveFlow = lesson.getInteractiveFlow();

        this.orderIndex = lesson.getOrderIndex();
        this.readingTimeMinutes = lesson.getReadingTimeMinutes();
        this.relatedMissionId = lesson.getRelatedMissionId();
    }

    // Setters for related mission
    public void setRelatedMissionSlug(String relatedMissionSlug) { this.relatedMissionSlug = relatedMissionSlug; }
    public void setRelatedMissionTitle(String relatedMissionTitle) { this.relatedMissionTitle = relatedMissionTitle; }

    // Getters
    public UUID getId() { return id; }
    public UUID getModuleId() { return moduleId; }
    public String getTitle() { return title; }
    public String getSummary() { return summary; }
    public String getContent() { return content; }
    public String getKeyConcepts() { return keyConcepts; }
    public String getCommonMistakes() { return commonMistakes; }
    public String getPracticalExample() { return practicalExample; }
    public String getRequestExample() { return requestExample; }
    public String getResponseExample() { return responseExample; }
    public String getRelatedConcepts() { return relatedConcepts; }
    public String getBeforeMission() { return beforeMission; }

    public String getLearningObjectives() { return learningObjectives; }
    public String getAnalogy() { return analogy; }
    public String getKeyConceptsDetailed() { return keyConceptsDetailed; }
    public String getCommonMistakesDetailed() { return commonMistakesDetailed; }
    public String getGlossary() { return glossary; }
    public String getMiniQuiz() { return miniQuiz; }
    public String getInteractiveContent() { return interactiveContent; }
    public String getInteractiveFlow() { return interactiveFlow; }

    public Integer getOrderIndex() { return orderIndex; }
    public Integer getReadingTimeMinutes() { return readingTimeMinutes; }
    public UUID getRelatedMissionId() { return relatedMissionId; }
    public String getRelatedMissionSlug() { return relatedMissionSlug; }
    public String getRelatedMissionTitle() { return relatedMissionTitle; }
}
