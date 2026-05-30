package com.placement.placementbackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= STUDENT ID =================
    @NotNull(message = "Student ID is required")
    private Long studentId;

    // ================= COMPANY ID =================
    @NotNull(message = "Company ID is required")
    private Long companyId;

    // ================= STATUS =================
    @NotBlank(message = "Status is required")
    private String status;

    // ================= APPLIED AT =================
    private LocalDateTime appliedAt;
}
