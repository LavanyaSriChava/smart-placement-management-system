package com.placement.placementbackend.dto;

import lombok.Data;

@Data
public class UpdateUserDTO {

    private String name;
    private Double cgpa;
    private String branch;
    private Integer backlogs;
    private String skills;
}