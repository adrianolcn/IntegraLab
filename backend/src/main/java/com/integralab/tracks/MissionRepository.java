package com.integralab.tracks;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MissionRepository extends JpaRepository<Mission, UUID> {
    List<Mission> findByModuleIdOrderByOrderIndexAsc(UUID moduleId);
    Optional<Mission> findBySlug(String slug);
}
