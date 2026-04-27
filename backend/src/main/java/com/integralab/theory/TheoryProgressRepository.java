package com.integralab.theory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TheoryProgressRepository extends JpaRepository<TheoryProgress, UUID> {
    Optional<TheoryProgress> findByUserIdAndLessonId(UUID userId, UUID lessonId);
    List<TheoryProgress> findByUserId(UUID userId);
}
