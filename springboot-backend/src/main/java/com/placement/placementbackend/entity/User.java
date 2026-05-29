package com.placement.placementbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    // STUDENT or ADMIN
    private String role;

    // Student-specific fields
    private Double cgpa;

    private String branch;

    private Integer backlogs;

    private String skills;
}