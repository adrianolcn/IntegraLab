package com.integralab.missions;

import com.integralab.gamification.*;
import com.integralab.tracks.Mission;
import com.integralab.tracks.MissionRepository;
import com.integralab.tracks.ValidationStrategy;
import com.integralab.users.User;
import com.integralab.users.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class MissionAttemptService {

    private final AttemptRepository attemptRepository;
    private final ProgressRepository progressRepository;
    private final MissionRepository missionRepository;
    private final UserRepository userRepository;
    private final XpEventRepository xpEventRepository;
    private final BadgeService badgeService;
    private final com.integralab.tracks.MissionOptionRepository optionRepository;

    public MissionAttemptService(AttemptRepository attemptRepository,
                                 ProgressRepository progressRepository,
                                 MissionRepository missionRepository,
                                 UserRepository userRepository,
                                 XpEventRepository xpEventRepository,
                                 BadgeService badgeService,
                                 com.integralab.tracks.MissionOptionRepository optionRepository) {
        this.attemptRepository = attemptRepository;
        this.progressRepository = progressRepository;
        this.missionRepository = missionRepository;
        this.userRepository = userRepository;
        this.xpEventRepository = xpEventRepository;
        this.badgeService = badgeService;
        this.optionRepository = optionRepository;
    }

    @Transactional
    public AttemptResultResponse submitAttempt(User user, UUID missionId, AttemptRequest request, String language) {
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("Mission not found"));
        
        mission.setLocale(language);

        String submitted = request.getAnswer() != null ? request.getAnswer().trim() : "";
        String expected = mission.getExpectedAnswer() != null ? mission.getExpectedAnswer().trim() : "";

        boolean isCorrect = false;
        String contextualFeedback = null;
        String contextualSuggestedCorrection = null;
        
        boolean isEn = language != null && language.startsWith("en");

        ValidationStrategy strategy = mission.getValidationStrategy() != null ? mission.getValidationStrategy() : ValidationStrategy.EXACT_NORMALIZED;

        switch (strategy) {
            case MULTIPLE_CHOICE_OPTION:
                com.integralab.tracks.MissionOption option = optionRepository.findByMissionIdOrderByOrderIndexAsc(missionId).stream()
                        .filter(o -> o.getValue().equalsIgnoreCase(submitted))
                        .findFirst().orElse(null);
                if (option != null) {
                    option.setLocale(language);
                    isCorrect = option.isCorrect();
                    if (!isCorrect) {
                        contextualFeedback = option.getExplanation();
                        contextualSuggestedCorrection = isEn ? "Review the concepts of this option: " + option.getLabel() : "Revise os conceitos desta opção: " + option.getLabel();
                    }
                } else {
                    isCorrect = false;
                    contextualFeedback = isEn ? "The chosen option is not valid for this mission." : "A opção escolhida não é válida para esta missão.";
                }
                break;
            case CONTAINS_KEYWORD:
            case DEBUG_REASONING:
                String normalizedSubmitted = submitted.toLowerCase();
                String normalizedExpected = expected.toLowerCase();
                if (normalizedSubmitted.contains(normalizedExpected)) {
                    isCorrect = true;
                } else if (mission.getAcceptedAnswers() != null) {
                    String[] accepted = mission.getAcceptedAnswers().split(",");
                    for (String acc : accepted) {
                        if (normalizedSubmitted.contains(acc.trim().toLowerCase())) {
                            isCorrect = true;
                            break;
                        }
                    }
                }
                break;
            case EXACT_NORMALIZED:
            default:
                if (submitted.equalsIgnoreCase(expected)) {
                    isCorrect = true;
                } else if (mission.getAcceptedAnswers() != null) {
                    String[] accepted = mission.getAcceptedAnswers().split(",");
                    for (String acc : accepted) {
                        if (submitted.equalsIgnoreCase(acc.trim())) {
                            isCorrect = true;
                            break;
                        }
                    }
                }
                break;
        }

        Attempt attempt = new Attempt();
        attempt.setUser(user);
        attempt.setMission(mission);
        attempt.setSubmittedAnswer(submitted);
        attempt.setCorrect(isCorrect);
        attempt.setFeedback(isCorrect ? mission.getSuccessFeedback() : (contextualFeedback != null ? contextualFeedback : mission.getErrorFeedback()));

        AttemptResultResponse response = new AttemptResultResponse();
        response.setCorrect(isCorrect);
        response.setFeedback(attempt.getFeedback());
        response.setIdealAnswer(expected);
        
        if (isCorrect) {
            response.setWhatWasCorrect(List.of(isEn ? "You found the correct answer." : "Você encontrou a resposta certa."));
            response.setWhatWasWrong(Collections.emptyList());
        } else {
            response.setWhatWasCorrect(Collections.emptyList());
            response.setWhatWasWrong(List.of(isEn ? "The answer does not match what was expected." : "A resposta não confere com o esperado."));
            response.setSuggestedCorrection(contextualSuggestedCorrection != null ? contextualSuggestedCorrection : (isEn ? "Try reviewing the concepts of this mission in the step-by-step mode." : "Tente revisar os conceitos desta missão no modo passo a passo."));
        }

        Progress progress = progressRepository.findByUserIdAndMissionId(user.getId(), missionId)
                .orElseGet(() -> {
                    Progress p = new Progress();
                    p.setUser(user);
                    p.setMission(mission);
                    return p;
                });

        progress.setAttemptsCount(progress.getAttemptsCount() + 1);

        boolean alreadyCompleted = progress.isCompleted();
        response.setAlreadyCompletedBefore(alreadyCompleted);

        if (isCorrect) {
            if (!alreadyCompleted) {
                progress.setCompleted(true);
                progress.setCompletedAt(LocalDateTime.now());
                progress.setBestResult(true);

                int xp = mission.getXpReward();
                attempt.setXpEarned(xp);

                XpEvent xpEvent = new XpEvent();
                xpEvent.setUser(user);
                xpEvent.setMission(mission);
                xpEvent.setAmount(xp);
                xpEvent.setReason((isEn ? "Mission completion: " : "Conclusão de missão: ") + mission.getTitle());
                xpEventRepository.save(xpEvent);

                user.setTotalXp(user.getTotalXp() + xp);
                user.setLevel(ProgressService.calculateLevel(user.getTotalXp()));
                userRepository.save(user);
                
                // Badges
                badgeService.awardBadgeIfEligible(user, "FIRST_MISSION_COMPLETED");
                if ("33333333-3333-3333-3333-000000000003".equals(missionId.toString())) {
                    badgeService.awardBadgeIfEligible(user, "MISSION_400_COMPLETED");
                }
                if ("33333333-3333-3333-3333-000000000004".equals(missionId.toString())) {
                    badgeService.awardBadgeIfEligible(user, "MISSION_401_COMPLETED");
                }
            } else {
                attempt.setXpEarned(0);
            }
        } else {
            attempt.setXpEarned(0);
        }

        progressRepository.save(progress);
        attemptRepository.save(attempt);

        response.setXpEarned(attempt.getXpEarned());
        response.setMissionCompleted(progress.isCompleted());
        response.setUserTotalXp(user.getTotalXp());
        response.setUserLevel(user.getLevel());

        return response;
    }
}
