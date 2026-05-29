package com.placement.placementbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
@Data
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Student ID reference
    private Long studentId;

    // Cloudinary / Drive / S3 URL
    private String resumeUrl;

    private LocalDateTime uploadedAt;
}
