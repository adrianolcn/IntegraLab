package com.integralab.gamification;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface XpEventRepository extends JpaRepository<XpEvent, UUID> {
}
