package com.integralab.missions.scenario;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.Optional;

public interface MissionScenarioRepository extends JpaRepository<MissionScenario, UUID> {
    Optional<MissionScenario> findByMissionId(UUID missionId);
}
