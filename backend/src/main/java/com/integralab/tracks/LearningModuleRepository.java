package com.integralab.tracks;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LearningModuleRepository extends JpaRepository<LearningModule, UUID> {
    List<LearningModule> findByTrackIdOrderByOrderIndexAsc(UUID trackId);
    Optional<LearningModule> findBySlug(String slug);
}
