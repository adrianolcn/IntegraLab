package com.integralab.missions.study;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface GuidedStepRepository extends JpaRepository<GuidedStep, UUID> {
    List<GuidedStep> findByMissionIdOrderByOrderIndexAsc(UUID missionId);
}
