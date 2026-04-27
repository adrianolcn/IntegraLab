package com.integralab.gamification;

import java.util.List;

public class ProgressResponse {
    private int totalXp;
    private int level;
    private int completedMissions;
    private int totalMissions;
    private int completionPercentage;
    
    // Getters and setters
    public int getTotalXp() { return totalXp; }
    public void setTotalXp(int totalXp) { this.totalXp = totalXp; }
    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }
    public int getCompletedMissions() { return completedMissions; }
    public void setCompletedMissions(int completedMissions) { this.completedMissions = completedMissions; }
    public int getTotalMissions() { return totalMissions; }
    public void setTotalMissions(int totalMissions) { this.totalMissions = totalMissions; }
    public int getCompletionPercentage() { return completionPercentage; }
    public void setCompletionPercentage(int completionPercentage) { this.completionPercentage = completionPercentage; }
}
