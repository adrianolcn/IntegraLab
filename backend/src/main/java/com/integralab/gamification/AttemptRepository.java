package com.integralab.gamification;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, UUID> {
    List<Attempt> findByUserIdAndMissionId(UUID userId, UUID missionId);
    List<Attempt> findByUserIdOrderByCreatedAtDesc(UUID userId);
}
