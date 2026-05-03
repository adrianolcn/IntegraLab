package com.integralab.theory;

import com.integralab.tracks.LearningModule;
import com.integralab.tracks.LearningModuleRepository;
import com.integralab.tracks.MissionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TheoryLessonServiceTest {

    @Mock
    private TheoryLessonRepository theoryLessonRepository;

    @Mock
    private LearningModuleRepository learningModuleRepository;

    @Mock
    private MissionRepository missionRepository;

    @InjectMocks
    private TheoryLessonService theoryLessonService;

    @Test
    void testGetLessonsByModuleSlug_AcceptLanguageFallback() {
        LearningModule module = new LearningModule();
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
