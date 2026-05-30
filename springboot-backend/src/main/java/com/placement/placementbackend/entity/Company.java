package com.placement.placementbackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "companies")
@Data
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= COMPANY NAME =================
    @NotBlank(message = "Company name is required")
    private String companyName;

    // ================= ROLE =================
    @NotBlank(message = "Role is required")
    private String role;

    // ================= CTC =================
    @NotNull(message = "CTC is required")
    @Min(value = 1, message = "CTC must be greater than 0")
    private Double ctc;

    // ================= REQUIRED CGPA =================
    @Min(value = 0, message = "Required CGPA cannot be negative")
    @Max(value = 10, message = "Required CGPA cannot exceed 10")
    private Double requiredCgpa;

    // ================= ALLOWED BACKLOGS =================
    @Min(value = 0, message = "Allowed backlogs cannot be negative")
    private Integer allowedBacklogs;

    // ================= ELIGIBLE BRANCHES =================
    @NotBlank(message = "Eligible branches are required")
    private String eligibleBranches;

    // ================= REQUIRED SKILLS =================
    @NotBlank(message = "Required skills are required")
    private String requiredSkills;
}
