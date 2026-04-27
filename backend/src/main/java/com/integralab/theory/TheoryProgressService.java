package com.integralab.theory;

import com.integralab.users.User;
import com.integralab.users.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TheoryProgressService {

    private final TheoryProgressRepository theoryProgressRepository;
    private final TheoryLessonRepository theoryLessonRepository;
    private final UserRepository userRepository;

    public TheoryProgressService(TheoryProgressRepository theoryProgressRepository, 
                                 TheoryLessonRepository theoryLessonRepository, 
                                 UserRepository userRepository) {
        this.theoryProgressRepository = theoryProgressRepository;
        this.theoryLessonRepository = theoryLessonRepository;
        this.userRepository = userRepository;
    }

    public List<TheoryProgressDto> getUserProgress(UUID userId) {
        return theoryProgressRepository.findByUserId(userId)
                .stream()
                .map(TheoryProgressDto::new)
                .collect(Collectors.toList());
    }

    public TheoryProgressDto getLessonProgress(UUID userId, UUID lessonId) {
        return theoryProgressRepository.findByUserIdAndLessonId(userId, lessonId)
                .map(TheoryProgressDto::new)
                .orElse(null);
    }

    @Transactional
    public TheoryProgressDto markAsOpened(UUID userId, UUID lessonId) {
        TheoryProgress progress = getOrCreateProgress(userId, lessonId);
        if (progress.getOpenedAt() == null) {
            progress.setOpenedAt(LocalDateTime.now());
            progress = theoryProgressRepository.save(progress);
        }
        return new TheoryProgressDto(progress);
    }

    @Transactional
    public TheoryProgressDto markAsCompleted(UUID userId, UUID lessonId) {
        TheoryProgress progress = getOrCreateProgress(userId, lessonId);
        if (progress.getCompletedAt() == null) {
            progress.setCompletedAt(LocalDateTime.now());
            // Implicitly open if completing directly
            if (progress.getOpenedAt() == null) {
                progress.setOpenedAt(progress.getCompletedAt());
            }
            progress = theoryProgressRepository.save(progress);
        }
        return new TheoryProgressDto(progress);
    }

    @Transactional
    public TheoryProgressDto recordQuizResult(UUID userId, UUID lessonId, int score, int total) {
        if (total <= 0) {
            throw new IllegalArgumentException("Total must be greater than zero");
        }
        
        TheoryProgress progress = getOrCreateProgress(userId, lessonId);
        progress.setQuizAttemptedAt(LocalDateTime.now());
        
        // Only update score if it's the first time or if the new score is strictly better
        if (progress.getQuizTotal() == 0 || score > progress.getQuizScore()) {
            progress.setQuizScore(score);
            progress.setQuizTotal(total);
            progress.setQuizPassed((double) score / total >= 0.7);
        }
        
        progress = theoryProgressRepository.save(progress);
        return new TheoryProgressDto(progress);
    }

    @Transactional
    public TheoryProgressDto markSandboxUsed(UUID userId, UUID lessonId) {
        TheoryProgress progress = getOrCreateProgress(userId, lessonId);
        if (progress.getSandboxUsedAt() == null) {
            progress.setSandboxUsedAt(LocalDateTime.now());
            progress = theoryProgressRepository.save(progress);
        }
        return new TheoryProgressDto(progress);
    }

    private TheoryProgress getOrCreateProgress(UUID userId, UUID lessonId) {
        return theoryProgressRepository.findByUserIdAndLessonId(userId, lessonId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new IllegalArgumentException("User not found"));
                    TheoryLesson lesson = theoryLessonRepository.findById(lessonId)
                            .orElseThrow(() -> new IllegalArgumentException("Lesson not found"));
                    return theoryProgressRepository.save(new TheoryProgress(user, lesson));
                });
    }
}
