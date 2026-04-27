package com.integralab.tracks;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "learning_modules")
public class LearningModule {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "track_id", nullable = false)
    private UUID trackId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrackStatus status = TrackStatus.AVAILABLE;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "title_en")
    private String titleEn;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Transient
    private String currentLocale = "pt-BR";

    // Getters and Setters
    public UUID getId() { return id; }
    public UUID getTrackId() { return trackId; }

    public String getTitle() { 
        if (currentLocale != null && currentLocale.startsWith("en") && titleEn != null && !titleEn.trim().isEmpty()) {
            return titleEn;
        }
        return title; 
    }
    public void setTitle(String title) { this.title = title; }
    public String getTitleEn() { return titleEn; }
    public void setTitleEn(String titleEn) { this.titleEn = titleEn; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getDescription() { 
        if (currentLocale != null && currentLocale.startsWith("en") && descriptionEn != null && !descriptionEn.trim().isEmpty()) {
            return descriptionEn;
        }
        return description; 
    }
    public void setDescription(String description) { this.description = description; }
    public String getDescriptionEn() { return descriptionEn; }
    public void setDescriptionEn(String descriptionEn) { this.descriptionEn = descriptionEn; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }

    public TrackStatus getStatus() { return status; }
    public void setStatus(TrackStatus status) { this.status = status; }

    public void setLocale(String locale) { this.currentLocale = locale; }
}
