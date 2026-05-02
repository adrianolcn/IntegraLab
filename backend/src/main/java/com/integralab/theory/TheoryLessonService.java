package com.integralab.theory;

import com.integralab.tracks.LearningModule;
import com.integralab.tracks.LearningModuleRepository;
import com.integralab.tracks.Mission;
import com.integralab.tracks.MissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TheoryLessonService {

    private final TheoryLessonRepository theoryLessonRepository;
    private final LearningModuleRepository learningModuleRepository;
    private final MissionRepository missionRepository;

    public TheoryLessonService(TheoryLessonRepository theoryLessonRepository, 
                               LearningModuleRepository learningModuleRepository,
                               MissionRepository missionRepository) {
        this.theoryLessonRepository = theoryLessonRepository;
        this.learningModuleRepository = learningModuleRepository;
        this.missionRepository = missionRepository;
    }

    public List<TheoryLessonDto> getLessonsByModuleId(UUID moduleId, String language) {
        List<TheoryLesson> lessons = theoryLessonRepository.findByModuleIdOrderByOrderIndexAsc(moduleId);
        return lessons.stream()
                .map(lesson -> mapToDto(lesson, language))
                .collect(Collectors.toList());
    }

    public List<TheoryLessonDto> getLessonsByModuleSlug(String slug, String language) {
        Optional<LearningModule> moduleOpt = learningModuleRepository.findBySlug(slug);
        if (moduleOpt.isEmpty()) {
            throw new NoSuchElementException("Module not found with slug: " + slug);
        }
        return getLessonsByModuleId(moduleOpt.get().getId(), language);
    }

    public TheoryLessonDto getLessonById(UUID id, String language) {
        TheoryLesson lesson = theoryLessonRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Lesson not found with id: " + id));
        return mapToDto(lesson, language);
    }

    private TheoryLessonDto mapToDto(TheoryLesson lesson, String language) {
        lesson.setLocale(language);
        TheoryLessonDto dto = new TheoryLessonDto(lesson);
        
        if (lesson.getRelatedMissionId() != null) {
            Optional<Mission> missionOpt = missionRepository.findById(lesson.getRelatedMissionId());
            missionOpt.ifPresent(mission -> {
                mission.setLocale(language);
                dto.setRelatedMissionSlug(mission.getSlug());
                dto.setRelatedMissionTitle(mission.getTitle());
            });
        }
        return dto;
    }
}
