package com.integralab.gamification;

import com.integralab.users.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;

    public BadgeService(BadgeRepository badgeRepository, UserBadgeRepository userBadgeRepository) {
        this.badgeRepository = badgeRepository;
        this.userBadgeRepository = userBadgeRepository;
    }

    @Transactional
    public void awardBadgeIfEligible(User user, String conditionType) {
        badgeRepository.findByConditionType(conditionType).ifPresent(badge -> {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badge.getId())) {
                UserBadge userBadge = new UserBadge();
                userBadge.setUser(user);
                userBadge.setBadge(badge);
                userBadgeRepository.save(userBadge);
            }
        });
    }

    @Transactional(readOnly = true)
    public List<Badge> getUserBadges(User user) {
        return userBadgeRepository.findByUserId(user.getId())
                .stream()
                .map(UserBadge::getBadge)
                .collect(Collectors.toList());
    }
}
