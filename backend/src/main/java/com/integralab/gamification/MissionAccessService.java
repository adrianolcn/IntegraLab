package com.integralab.gamification;

import com.integralab.tracks.Mission;
import com.integralab.tracks.MissionRepository;
import com.integralab.users.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Service
public class MissionAccessService {

    private final MissionRepository missionRepository;
    private final ProgressRepository progressRepository;

    public MissionAccessService(MissionRepository missionRepository, ProgressRepository progressRepository) {
        this.missionRepository = missionRepository;
        this.progressRepository = progressRepository;
    }

    public MissionAccessResponse getAccessStatus(User user, UUID missionId) {
        Mission currentMission = missionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("Mission not found"));

        // Find all missions in the same module, ordered by orderIndex
        List<Mission> moduleMissions = missionRepository.findByModuleIdOrderByOrderIndexAsc(currentMission.getModuleId());
        
        Optional<Progress> progressOpt = progressRepository.findByUserIdAndMissionId(user.getId(), missionId);
        boolean isCompleted = progressOpt.isPresent() && progressOpt.get().isCompleted();

        if (isCompleted) {
            return new MissionAccessResponse(missionId, currentMission.getSlug(), MissionAccessStatus.COMPLETED, true, null, null, null);
        }

        int index = moduleMissions.indexOf(currentMission);
        
        // Se for a primeira missão do módulo
        if (index == 0) {
            return new MissionAccessResponse(missionId, currentMission.getSlug(), MissionAccessStatus.AVAILABLE, false, null, null, null);
        }

        // Verifica a missão anterior
        Mission previousMission = moduleMissions.get(index - 1);
        Optional<Progress> previousProgressOpt = progressRepository.findByUserIdAndMissionId(user.getId(), previousMission.getId());
        
        boolean previousCompleted = previousProgressOpt.isPresent() && previousProgressOpt.get().isCompleted();

        if (previousCompleted) {
            return new MissionAccessResponse(missionId, currentMission.getSlug(), MissionAccessStatus.AVAILABLE, false, null, null, null);
        }

        return new MissionAccessResponse(missionId, currentMission.getSlug(), MissionAccessStatus.LOCKED, false, 
            "Conclua a missão anterior para liberar esta etapa.", 
            previousMission.getSlug(), 
            previousMission.getTitle());
    }

    public void validateAccess(User user, UUID missionId) {
        MissionAccessResponse access = getAccessStatus(user, missionId);
        if (access.getAccessStatus() == MissionAccessStatus.LOCKED) {
            throw new org.springframework.security.access.AccessDeniedException("Mission is locked: " + access.getLockedReason());
        }
    }
}
