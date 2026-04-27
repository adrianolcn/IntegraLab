package com.integralab.theory;

import com.integralab.users.User;
import com.integralab.users.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TheoryProgressServiceTest {

    @Mock
    private TheoryProgressRepository theoryProgressRepository;

    @Mock
    private TheoryLessonRepository theoryLessonRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TheoryProgressService theoryProgressService;

    private User user;
    private TheoryLesson lesson;
    private TheoryProgress progress;

    @BeforeEach
    void setUp() {
        user = new User();
        org.springframework.test.util.ReflectionTestUtils.setField(user, "id", UUID.randomUUID());

        lesson = new TheoryLesson();
        org.springframework.test.util.ReflectionTestUtils.setField(lesson, "id", UUID.randomUUID());
        
        progress = new TheoryProgress(user, lesson);
    }

    @Test
    void markAsOpened_ShouldCreateProgress() {
        when(theoryProgressRepository.findByUserIdAndLessonId(user.getId(), lesson.getId())).thenReturn(Optional.empty());
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(theoryLessonRepository.findById(lesson.getId())).thenReturn(Optional.of(lesson));
        when(theoryProgressRepository.save(any(TheoryProgress.class))).thenAnswer(i -> {
            TheoryProgress p = i.getArgument(0);
            return p;
        });

        TheoryProgressDto dto = theoryProgressService.markAsOpened(user.getId(), lesson.getId());
        
        assertNotNull(dto.getOpenedAt());
        verify(theoryProgressRepository, times(2)).save(any(TheoryProgress.class)); // Once in getOrCreate, once in markAsOpened
    }

    @Test
    void markAsCompleted_ShouldSetCompletedAt() {
        when(theoryProgressRepository.findByUserIdAndLessonId(user.getId(), lesson.getId())).thenReturn(Optional.of(progress));
        when(theoryProgressRepository.save(any(TheoryProgress.class))).thenReturn(progress);

        TheoryProgressDto dto = theoryProgressService.markAsCompleted(user.getId(), lesson.getId());
        
        assertNotNull(dto.getCompletedAt());
        assertNotNull(dto.getOpenedAt()); // Implicit open if it was null
    }

    @Test
    void recordQuizResult_ShouldCalculatePassRate() {
        when(theoryProgressRepository.findByUserIdAndLessonId(user.getId(), lesson.getId())).thenReturn(Optional.of(progress));
        when(theoryProgressRepository.save(any(TheoryProgress.class))).thenReturn(progress);

        TheoryProgressDto dto = theoryProgressService.recordQuizResult(user.getId(), lesson.getId(), 7, 10);
        
        assertEquals(7, dto.getQuizScore());
        assertTrue(dto.getQuizPassed());
    }

    @Test
    void recordQuizResult_ShouldNotOverwriteWithLowerScore() {
        progress.setQuizScore(8);
        progress.setQuizTotal(10);
        progress.setQuizPassed(true);

        when(theoryProgressRepository.findByUserIdAndLessonId(user.getId(), lesson.getId())).thenReturn(Optional.of(progress));
        when(theoryProgressRepository.save(any(TheoryProgress.class))).thenReturn(progress);

        TheoryProgressDto dto = theoryProgressService.recordQuizResult(user.getId(), lesson.getId(), 5, 10);
        
        assertEquals(8, dto.getQuizScore()); // Kept the old higher score
        assertTrue(dto.getQuizPassed());
    }

    @Test
    void recordQuizResult_WithZeroTotal_ShouldThrowException() {
        assertThrows(IllegalArgumentException.class, () -> {
            theoryProgressService.recordQuizResult(user.getId(), lesson.getId(), 5, 0);
        });
    }

    @Test
    void markSandboxUsed_ShouldSetSandboxUsedAt() {
        when(theoryProgressRepository.findByUserIdAndLessonId(user.getId(), lesson.getId())).thenReturn(Optional.of(progress));
        when(theoryProgressRepository.save(any(TheoryProgress.class))).thenReturn(progress);

        TheoryProgressDto dto = theoryProgressService.markSandboxUsed(user.getId(), lesson.getId());
        
        assertNotNull(dto.getSandboxUsedAt());
    }
}
