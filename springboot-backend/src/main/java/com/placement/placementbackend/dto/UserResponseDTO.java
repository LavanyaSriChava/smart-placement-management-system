package com.placement.placementbackend.dto;

import lombok.Data;

@Data
public class UserResponseDTO {

    private Long id;

    private String name;

    private String email;

    private String role;

    private Double cgpa;

    private String branch;

    private Integer backlogs;

    private String skills;
}
