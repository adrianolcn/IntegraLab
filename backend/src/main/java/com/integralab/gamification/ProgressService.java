package com.integralab.gamification;

import com.integralab.users.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;
    private final com.integralab.tracks.MissionRepository missionRepository;

    public ProgressService(ProgressRepository progressRepository, com.integralab.tracks.MissionRepository missionRepository) {
        this.progressRepository = progressRepository;
        this.missionRepository = missionRepository;
    }

    public static int calculateLevel(int totalXp) {
        if (totalXp >= 1000) return 5;
        if (totalXp >= 500) return 4;
        if (totalXp >= 250) return 3;
        if (totalXp >= 100) return 2;
        return 1;
    }

    @Transactional(readOnly = true)
    public ProgressResponse getUserProgress(User user) {
        List<Progress> userProgress = progressRepository.findByUserId(user.getId());
        long completedMissionsCount = userProgress.stream().filter(Progress::isCompleted).count();
        long totalMissionsCount = missionRepository.count();

        ProgressResponse response = new ProgressResponse();
        response.setTotalXp(user.getTotalXp());
        response.setLevel(calculateLevel(user.getTotalXp()));
        response.setCompletedMissions((int) completedMissionsCount);
        response.setTotalMissions((int) totalMissionsCount);
        
        int percentage = totalMissionsCount == 0 ? 0 : (int) ((completedMissionsCount * 100) / totalMissionsCount);
        response.setCompletionPercentage(percentage);

        return response;
    }
}
