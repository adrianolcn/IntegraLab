package com.integralab.theory;

import com.integralab.tracks.LearningModule;
import com.integralab.tracks.LearningModuleRepository;
import com.integralab.tracks.MissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class TheoryLessonServiceTest {

    @Mock
    private TheoryLessonRepository theoryLessonRepository;

    @Mock
    private LearningModuleRepository learningModuleRepository;

    @Mock
    private MissionRepository missionRepository;

    @InjectMocks
    private TheoryLessonService theoryLessonService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetLessonsByModuleSlug_AcceptLanguageFallback() {
        UUID moduleId = UUID.randomUUID();
        LearningModule module = new LearningModule();
        // Just setting up enough for the mock to return it
        when(learningModuleRepository.findBySlug("test-slug")).thenReturn(Optional.of(module));

        TheoryLesson lesson = new TheoryLesson();
        lesson.setTitle("Título em PT");
        lesson.setTitleEn("Title in EN");
        
        when(theoryLessonRepository.findByModuleIdOrderByOrderIndexAsc(module.getId()))
                .thenReturn(List.of(lesson));

        List<TheoryLessonDto> dtosEn = theoryLessonService.getLessonsByModuleSlug("test-slug", "en-US");
        assertEquals("Title in EN", dtosEn.get(0).getTitle());

        List<TheoryLessonDto> dtosPt = theoryLessonService.getLessonsByModuleSlug("test-slug", "pt-BR");
        assertEquals("Título em PT", dtosPt.get(0).getTitle());
    }
    
    @Test
    void testGetLessonsByModuleSlug_EmptyListWhenNoLessons() {
        UUID moduleId = UUID.randomUUID();
        LearningModule module = new LearningModule();
        when(learningModuleRepository.findBySlug("empty-slug")).thenReturn(Optional.of(module));
        
        when(theoryLessonRepository.findByModuleIdOrderByOrderIndexAsc(module.getId()))
                .thenReturn(List.of());

        List<TheoryLessonDto> dtos = theoryLessonService.getLessonsByModuleSlug("empty-slug", "en");
        assertEquals(0, dtos.size());
    }

    @Test
    void testGetLessonsByModuleSlug_NotFound() {
        when(learningModuleRepository.findBySlug("unknown-slug")).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> theoryLessonService.getLessonsByModuleSlug("unknown-slug", "en"));
    }
}
