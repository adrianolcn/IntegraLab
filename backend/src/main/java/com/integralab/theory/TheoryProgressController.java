package com.integralab.theory;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/theory-progress")
public class TheoryProgressController {

    private final TheoryProgressService theoryProgressService;

    public TheoryProgressController(TheoryProgressService theoryProgressService) {
        this.theoryProgressService = theoryProgressService;
    }

    @GetMapping("/me")
    public ResponseEntity<List<TheoryProgressDto>> getMyProgress(@AuthenticationPrincipal UserDetails userDetails) {
        UUID userId = UUID.fromString(userDetails.getUsername());
        return ResponseEntity.ok(theoryProgressService.getUserProgress(userId));
    }

    @GetMapping("/me/lessons/{lessonId}")
    public ResponseEntity<TheoryProgressDto> getLessonProgress(@AuthenticationPrincipal UserDetails userDetails,
                                                               @PathVariable UUID lessonId) {
        UUID userId = UUID.fromString(userDetails.getUsername());
        TheoryProgressDto progress = theoryProgressService.getLessonProgress(userId, lessonId);
        if (progress == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(progress);
    }

    @PostMapping("/lessons/{lessonId}/opened")
    public ResponseEntity<TheoryProgressDto> markAsOpened(@AuthenticationPrincipal UserDetails userDetails,
                                                          @PathVariable UUID lessonId) {
        UUID userId = UUID.fromString(userDetails.getUsername());
        return ResponseEntity.ok(theoryProgressService.markAsOpened(userId, lessonId));
    }

    @PostMapping("/lessons/{lessonId}/complete")
    public ResponseEntity<TheoryProgressDto> markAsCompleted(@AuthenticationPrincipal UserDetails userDetails,
                                                             @PathVariable UUID lessonId) {
        UUID userId = UUID.fromString(userDetails.getUsername());
        return ResponseEntity.ok(theoryProgressService.markAsCompleted(userId, lessonId));
    }

    @PostMapping("/lessons/{lessonId}/quiz")
    public ResponseEntity<TheoryProgressDto> recordQuizResult(@AuthenticationPrincipal UserDetails userDetails,
                                                              @PathVariable UUID lessonId,
                                                              @RequestBody QuizRequest request) {
        UUID userId = UUID.fromString(userDetails.getUsername());
        return ResponseEntity.ok(theoryProgressService.recordQuizResult(userId, lessonId, request.getScore(), request.getTotal()));
    }

    @PostMapping("/lessons/{lessonId}/sandbox-used")
    public ResponseEntity<TheoryProgressDto> markSandboxUsed(@AuthenticationPrincipal UserDetails userDetails,
                                                             @PathVariable UUID lessonId) {
        UUID userId = UUID.fromString(userDetails.getUsername());
        return ResponseEntity.ok(theoryProgressService.markSandboxUsed(userId, lessonId));
    }
}
