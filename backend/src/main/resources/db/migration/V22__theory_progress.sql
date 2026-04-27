-- V22__theory_progress.sql

CREATE TABLE theory_progress (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES theory_lessons(id) ON DELETE CASCADE,
    opened_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    quiz_attempted_at TIMESTAMP WITH TIME ZONE,
    quiz_score INTEGER DEFAULT 0,
    quiz_total INTEGER DEFAULT 0,
    quiz_passed BOOLEAN DEFAULT FALSE,
    sandbox_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    
    CONSTRAINT uk_theory_progress_user_lesson UNIQUE (user_id, lesson_id)
);
