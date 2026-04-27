package com.integralab.missions;

import com.integralab.gamification.AttemptRequest;
import com.integralab.gamification.AttemptResultResponse;
import com.integralab.missions.scenario.MissionScenario;
import com.integralab.missions.scenario.MissionScenarioRepository;
import com.integralab.missions.study.GuidedStep;
import com.integralab.missions.study.GuidedStepRepository;
import com.integralab.users.User;
import com.integralab.users.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/missions")
public class MissionController {

    private final MissionAttemptService attemptService;
    private final MissionScenarioRepository scenarioRepository;
    private final GuidedStepRepository guidedStepRepository;
    private final UserRepository userRepository;
    private final com.integralab.tracks.MissionOptionRepository optionRepository;
    private final com.integralab.gamification.MissionAccessService accessService;

    public MissionController(MissionAttemptService attemptService,
                             MissionScenarioRepository scenarioRepository,
                             GuidedStepRepository guidedStepRepository,
                             UserRepository userRepository,
                             com.integralab.tracks.MissionOptionRepository optionRepository,
                             com.integralab.gamification.MissionAccessService accessService) {
        this.attemptService = attemptService;
        this.scenarioRepository = scenarioRepository;
        this.guidedStepRepository = guidedStepRepository;
        this.userRepository = userRepository;
        this.optionRepository = optionRepository;
        this.accessService = accessService;
    }

    @PostMapping("/{id}/attempts")
    public ResponseEntity<?> submitAttempt(@PathVariable UUID id,
                                           @RequestBody AttemptRequest request,
                                           @AuthenticationPrincipal UserDetails userDetails,
                                           @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        accessService.validateAccess(user, id);

        try {
            AttemptResultResponse response = attemptService.submitAttempt(user, id, request, language);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mission not found");
        }
    }

    @GetMapping("/{id}/scenario")
    public ResponseEntity<?> getMissionScenario(@PathVariable UUID id, @AuthenticationPrincipal UserDetails userDetails, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        accessService.validateAccess(user, id);

        return scenarioRepository.findByMissionId(id)
                .map(s -> {
                    s.setLocale(language);
                    return ResponseEntity.ok(s);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/guided-steps")
    public ResponseEntity<List<GuidedStep>> getGuidedSteps(@PathVariable UUID id, @AuthenticationPrincipal UserDetails userDetails, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        accessService.validateAccess(user, id);

        List<GuidedStep> steps = guidedStepRepository.findByMissionIdOrderByOrderIndexAsc(id);
        steps.forEach(s -> s.setLocale(language));
        return ResponseEntity.ok(steps);
    }

    @GetMapping("/{id}/options")
    public ResponseEntity<List<com.integralab.tracks.MissionOptionDto>> getMissionOptions(@PathVariable UUID id, @AuthenticationPrincipal UserDetails userDetails, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        accessService.validateAccess(user, id);

        List<com.integralab.tracks.MissionOptionDto> options = optionRepository.findByMissionIdOrderByOrderIndexAsc(id)
                .stream()
                .map(opt -> {
                    opt.setLocale(language);
                    return new com.integralab.tracks.MissionOptionDto(
                        opt.getId(),
                        opt.getLabel(),
                        opt.getValue(),
                        opt.getExplanation(),
                        opt.getOrderIndex());
                })
                .toList();
        return ResponseEntity.ok(options);
    }

    @GetMapping("/{id}/access")
    public ResponseEntity<com.integralab.gamification.MissionAccessResponse> getAccessStatus(@PathVariable UUID id, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(accessService.getAccessStatus(user, id));
    }

    @PostMapping("/{missionId}/guided-steps/{stepId}/check")
    public ResponseEntity<com.integralab.missions.study.CheckpointResultResponse> checkStep(@PathVariable UUID missionId, @PathVariable UUID stepId, @RequestBody com.integralab.missions.study.CheckpointRequest request, @AuthenticationPrincipal UserDetails userDetails, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        accessService.validateAccess(user, missionId);

        GuidedStep step = guidedStepRepository.findById(stepId)
                .orElseThrow(() -> new IllegalArgumentException("Step not found"));
        
        if (!step.getMission().getId().equals(missionId)) {
            throw new IllegalArgumentException("Step does not belong to mission");
        }
        
        step.setLocale(language);

        if (step.getCheckpointAnswer() == null || step.getCheckpointAnswer().isEmpty()) {
            throw new IllegalArgumentException("Step has no checkpoint answer");
        }

        String submitted = request.getAnswer() != null ? request.getAnswer().trim().toLowerCase().replaceAll("\\s+", " ") : "";
        String expected = step.getCheckpointAnswer().trim().toLowerCase().replaceAll("\\s+", " ");

        boolean isCorrect = submitted.equals(expected) || submitted.contains(expected);

        com.integralab.missions.study.CheckpointResultResponse response = new com.integralab.missions.study.CheckpointResultResponse();
        response.setCorrect(isCorrect);
        response.setIdealAnswer(step.getCheckpointAnswer());
        response.setConceptReviewed(step.getCheckpointAnswer());
        
        boolean isEn = language != null && language.startsWith("en");
        if (isCorrect) {
            response.setFeedback((isEn ? "Correct. " : "Correto. ") + (step.getExplanation() != null ? step.getExplanation() : (isEn ? "You understood the concept!" : "Você compreendeu o conceito!")));
            response.setNextStepSuggestion(isEn ? "You can proceed to the next step!" : "Pode avançar para o próximo passo!");
        } else {
            response.setFeedback((isEn ? "Not quite. " : "Ainda não. ") + (step.getExplanation() != null ? step.getExplanation() : (isEn ? "Review the explanation for this step." : "Revise a explicação deste passo.")));
            response.setNextStepSuggestion(isEn ? "Review the content above and try again." : "Revise o conteúdo acima e tente novamente.");
        }

        return ResponseEntity.ok(response);
    }
}
