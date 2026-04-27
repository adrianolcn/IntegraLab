package com.integralab.theory;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface TheoryLessonRepository extends JpaRepository<TheoryLesson, UUID> {
    List<TheoryLesson> findByModuleIdOrderByOrderIndexAsc(UUID moduleId);
}
