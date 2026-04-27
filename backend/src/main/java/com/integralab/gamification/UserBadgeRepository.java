package com.integralab.gamification;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface UserBadgeRepository extends JpaRepository<UserBadge, UUID> {
    List<UserBadge> findByUserId(UUID userId);
    boolean existsByUserIdAndBadgeId(UUID userId, UUID badgeId);
}
