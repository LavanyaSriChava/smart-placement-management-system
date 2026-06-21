package com.placement.placementbackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private Long authUserId;
    // ================= NAME =================
    @NotBlank(message = "Name is required")
    private String name;

    // ================= EMAIL =================
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(unique = true)
    private String email;

    // ================= PASSWORD =================
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    // ================= ROLE =================
    @NotBlank(message = "Role is required")
    private String role;

    // ================= CGPA =================
    @Min(value = 0, message = "CGPA cannot be negative")
    @Max(value = 10, message = "CGPA cannot exceed 10")
    private Double cgpa;

    // ================= BRANCH =================
    private String branch;

    // ================= BACKLOGS =================
    @Min(value = 0, message = "Backlogs cannot be negative")
    private Integer backlogs;

    // ================= SKILLS =================
    private String skills;
}