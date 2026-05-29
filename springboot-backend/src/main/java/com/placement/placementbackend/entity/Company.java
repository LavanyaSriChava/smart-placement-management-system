package com.placement.placementbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "companies")
@Data
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String role;

    private String ctc;

    private Double requiredCgpa;

    private Integer allowedBacklogs;

    private String eligibleBranches;

    private String requiredSkills;
}

