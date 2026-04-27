package com.integralab.missions.study;

public class CheckpointResultResponse {
    private boolean correct;
    private String feedback;
    private String idealAnswer;
    private String conceptReviewed;
    private String nextStepSuggestion;

    public boolean isCorrect() { return correct; }
    public void setCorrect(boolean correct) { this.correct = correct; }
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    public String getIdealAnswer() { return idealAnswer; }
    public void setIdealAnswer(String idealAnswer) { this.idealAnswer = idealAnswer; }
    public String getConceptReviewed() { return conceptReviewed; }
    public void setConceptReviewed(String conceptReviewed) { this.conceptReviewed = conceptReviewed; }
    public String getNextStepSuggestion() { return nextStepSuggestion; }
    public void setNextStepSuggestion(String nextStepSuggestion) { this.nextStepSuggestion = nextStepSuggestion; }
}
