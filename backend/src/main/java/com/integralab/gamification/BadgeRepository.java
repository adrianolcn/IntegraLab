package com.integralab.gamification;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.Optional;

public interface BadgeRepository extends JpaRepository<Badge, UUID> {
    Optional<Badge> findByConditionType(String conditionType);
}
