package com.integralab.gamification;

import com.integralab.users.User;
import com.integralab.users.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
public class BadgeController {

    private final BadgeService badgeService;
    private final UserRepository userRepository;

    public BadgeController(BadgeService badgeService, UserRepository userRepository) {
        this.badgeService = badgeService;
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<List<Badge>> getMyBadges(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(badgeService.getUserBadges(user));
    }
}
