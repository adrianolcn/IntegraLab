package com.integralab.gamification;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.Optional;
import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress, UUID> {
    Optional<Progress> findByUserIdAndMissionId(UUID userId, UUID missionId);
    List<Progress> findByUserId(UUID userId);
}
