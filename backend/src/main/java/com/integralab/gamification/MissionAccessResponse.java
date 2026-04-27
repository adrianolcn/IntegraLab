package com.integralab.gamification;

import java.util.UUID;

public class MissionAccessResponse {
    private UUID missionId;
    private String missionSlug;
    private MissionAccessStatus accessStatus;
    private boolean completed;
    private String lockedReason;
    private String previousMissionSlug;
    private String previousMissionTitle;

    public MissionAccessResponse() {}

    public MissionAccessResponse(UUID missionId, String missionSlug, MissionAccessStatus accessStatus, boolean completed, String lockedReason, String previousMissionSlug, String previousMissionTitle) {
        this.missionId = missionId;
        this.missionSlug = missionSlug;
        this.accessStatus = accessStatus;
        this.completed = completed;
        this.lockedReason = lockedReason;
        this.previousMissionSlug = previousMissionSlug;
        this.previousMissionTitle = previousMissionTitle;
    }

    public UUID getMissionId() { return missionId; }
    public void setMissionId(UUID missionId) { this.missionId = missionId; }
    public String getMissionSlug() { return missionSlug; }
    public void setMissionSlug(String missionSlug) { this.missionSlug = missionSlug; }
    public MissionAccessStatus getAccessStatus() { return accessStatus; }
    public void setAccessStatus(MissionAccessStatus accessStatus) { this.accessStatus = accessStatus; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public String getLockedReason() { return lockedReason; }
    public void setLockedReason(String lockedReason) { this.lockedReason = lockedReason; }
    public String getPreviousMissionSlug() { return previousMissionSlug; }
    public void setPreviousMissionSlug(String previousMissionSlug) { this.previousMissionSlug = previousMissionSlug; }
    public String getPreviousMissionTitle() { return previousMissionTitle; }
    public void setPreviousMissionTitle(String previousMissionTitle) { this.previousMissionTitle = previousMissionTitle; }
}
