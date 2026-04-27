package com.integralab.tracks;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class CatalogService {

    private final TrackRepository trackRepository;
    private final LearningModuleRepository moduleRepository;
    private final MissionRepository missionRepository;

    public CatalogService(TrackRepository trackRepository, LearningModuleRepository moduleRepository, MissionRepository missionRepository) {
        this.trackRepository = trackRepository;
        this.moduleRepository = moduleRepository;
        this.missionRepository = missionRepository;
    }

    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }

    public Track getTrackById(UUID id) {
        return trackRepository.findById(id).orElseThrow();
    }

    public Track getTrackBySlug(String slug) {
        return trackRepository.findBySlug(slug).orElseThrow();
    }

    public List<LearningModule> getModulesByTrackId(UUID trackId) {
        return moduleRepository.findByTrackIdOrderByOrderIndexAsc(trackId);
    }

    public LearningModule getModuleById(UUID id) {
        return moduleRepository.findById(id).orElseThrow();
    }

    public List<Mission> getMissionsByModuleId(UUID moduleId) {
        return missionRepository.findByModuleIdOrderByOrderIndexAsc(moduleId);
    }

    public Mission getMissionById(UUID id) {
        return missionRepository.findById(id).orElseThrow();
    }

    public Mission getMissionBySlug(String slug) {
        return missionRepository.findBySlug(slug).orElseThrow();
    }
}
