package com.placement.placementbackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
@Data
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= STUDENT ID =================
    @NotNull(message = "Student ID is required")
    private Long studentId;

    // ================= RESUME URL =================
    @NotBlank(message = "Resume URL is required")
    private String resumeUrl;

    // ================= FILE NAME =================
    @NotBlank(message = "File name is required")
    private String fileName;

    // ================= UPLOADED AT =================
    private LocalDateTime uploadedAt;
}
