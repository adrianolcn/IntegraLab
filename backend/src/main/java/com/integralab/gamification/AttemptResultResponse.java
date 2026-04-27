package com.integralab.gamification;

import java.util.List;

public class AttemptResultResponse {
    private boolean correct;
    private String feedback;
    private List<String> whatWasCorrect;
    private List<String> whatWasWrong;
    private String suggestedCorrection;
    private String idealAnswer;
    private String conceptReviewed;
    private String commonMistake;
    private String nextStepSuggestion;
    private int xpEarned;
    private boolean missionCompleted;
    private boolean alreadyCompletedBefore;
    private int userTotalXp;
    private int userLevel;

    // Getters and setters
    public boolean isCorrect() { return correct; }
    public void setCorrect(boolean correct) { this.correct = correct; }
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    public List<String> getWhatWasCorrect() { return whatWasCorrect; }
    public void setWhatWasCorrect(List<String> whatWasCorrect) { this.whatWasCorrect = whatWasCorrect; }
    public List<String> getWhatWasWrong() { return whatWasWrong; }
    public void setWhatWasWrong(List<String> whatWasWrong) { this.whatWasWrong = whatWasWrong; }
    public String getSuggestedCorrection() { return suggestedCorrection; }
    public void setSuggestedCorrection(String suggestedCorrection) { this.suggestedCorrection = suggestedCorrection; }
    public String getIdealAnswer() { return idealAnswer; }
    public void setIdealAnswer(String idealAnswer) { this.idealAnswer = idealAnswer; }
    public String getConceptReviewed() { return conceptReviewed; }
    public void setConceptReviewed(String conceptReviewed) { this.conceptReviewed = conceptReviewed; }
    public String getCommonMistake() { return commonMistake; }
    public void setCommonMistake(String commonMistake) { this.commonMistake = commonMistake; }
    public String getNextStepSuggestion() { return nextStepSuggestion; }
    public void setNextStepSuggestion(String nextStepSuggestion) { this.nextStepSuggestion = nextStepSuggestion; }
    public int getXpEarned() { return xpEarned; }
    public void setXpEarned(int xpEarned) { this.xpEarned = xpEarned; }
    public boolean isMissionCompleted() { return missionCompleted; }
    public void setMissionCompleted(boolean missionCompleted) { this.missionCompleted = missionCompleted; }
    public boolean isAlreadyCompletedBefore() { return alreadyCompletedBefore; }
    public void setAlreadyCompletedBefore(boolean alreadyCompletedBefore) { this.alreadyCompletedBefore = alreadyCompletedBefore; }
    public int getUserTotalXp() { return userTotalXp; }
    public void setUserTotalXp(int userTotalXp) { this.userTotalXp = userTotalXp; }
    public int getUserLevel() { return userLevel; }
    public void setUserLevel(int userLevel) { this.userLevel = userLevel; }
}
