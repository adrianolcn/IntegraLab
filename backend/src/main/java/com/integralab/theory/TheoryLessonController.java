package com.integralab.theory;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TheoryLessonController {

    private final TheoryLessonService theoryLessonService;

    public TheoryLessonController(TheoryLessonService theoryLessonService) {
        this.theoryLessonService = theoryLessonService;
    }

    @GetMapping("/modules/{moduleId}/lessons")
    public ResponseEntity<List<TheoryLessonDto>> getLessonsByModuleId(
            @PathVariable UUID moduleId,
            @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        return ResponseEntity.ok(theoryLessonService.getLessonsByModuleId(moduleId, language));
    }

    @GetMapping("/modules/slug/{slug}/lessons")
    public ResponseEntity<List<TheoryLessonDto>> getLessonsByModuleSlug(
            @PathVariable String slug,
            @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        try {
            return ResponseEntity.ok(theoryLessonService.getLessonsByModuleSlug(slug, language));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/lessons/{id}")
    public ResponseEntity<TheoryLessonDto> getLessonById(
            @PathVariable UUID id,
            @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        try {
            return ResponseEntity.ok(theoryLessonService.getLessonById(id, language));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
