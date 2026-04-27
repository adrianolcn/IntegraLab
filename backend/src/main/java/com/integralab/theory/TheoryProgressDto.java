package com.integralab.theory;

import java.time.LocalDateTime;
import java.util.UUID;

public class TheoryProgressDto {
    private UUID id;
    private UUID lessonId;
    private LocalDateTime openedAt;
    private LocalDateTime completedAt;
    private LocalDateTime quizAttemptedAt;
    private Integer quizScore;
    private Integer quizTotal;
    private Boolean quizPassed;
    private LocalDateTime sandboxUsedAt;

    public TheoryProgressDto(TheoryProgress progress) {
        this.id = progress.getId();
        this.lessonId = progress.getLesson().getId();
        this.openedAt = progress.getOpenedAt();
        this.completedAt = progress.getCompletedAt();
        this.quizAttemptedAt = progress.getQuizAttemptedAt();
        this.quizScore = progress.getQuizScore();
        this.quizTotal = progress.getQuizTotal();
        this.quizPassed = progress.getQuizPassed();
        this.sandboxUsedAt = progress.getSandboxUsedAt();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getLessonId() { return lessonId; }
    public void setLessonId(UUID lessonId) { this.lessonId = lessonId; }
    public LocalDateTime getOpenedAt() { return openedAt; }
    public void setOpenedAt(LocalDateTime openedAt) { this.openedAt = openedAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    public LocalDateTime getQuizAttemptedAt() { return quizAttemptedAt; }
    public void setQuizAttemptedAt(LocalDateTime quizAttemptedAt) { this.quizAttemptedAt = quizAttemptedAt; }
    public Integer getQuizScore() { return quizScore; }
    public void setQuizScore(Integer quizScore) { this.quizScore = quizScore; }
    public Integer getQuizTotal() { return quizTotal; }
    public void setQuizTotal(Integer quizTotal) { this.quizTotal = quizTotal; }
    public Boolean getQuizPassed() { return quizPassed; }
    public void setQuizPassed(Boolean quizPassed) { this.quizPassed = quizPassed; }
    public LocalDateTime getSandboxUsedAt() { return sandboxUsedAt; }
    public void setSandboxUsedAt(LocalDateTime sandboxUsedAt) { this.sandboxUsedAt = sandboxUsedAt; }
}
