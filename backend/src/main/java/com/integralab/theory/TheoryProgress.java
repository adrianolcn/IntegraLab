package com.integralab.theory;

import com.integralab.users.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "theory_progress", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "lesson_id"})
})
public class TheoryProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lesson_id", nullable = false)
    private TheoryLesson lesson;

    @Column(name = "opened_at")
    private LocalDateTime openedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "quiz_attempted_at")
    private LocalDateTime quizAttemptedAt;

    @Column(name = "quiz_score")
    private Integer quizScore = 0;

    @Column(name = "quiz_total")
    private Integer quizTotal = 0;

    @Column(name = "quiz_passed")
    private Boolean quizPassed = false;

    @Column(name = "sandbox_used_at")
    private LocalDateTime sandboxUsedAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public TheoryProgress() {}

    public TheoryProgress(User user, TheoryLesson lesson) {
        this.user = user;
        this.lesson = lesson;
    }

    public UUID getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public TheoryLesson getLesson() { return lesson; }
    public void setLesson(TheoryLesson lesson) { this.lesson = lesson; }
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
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
