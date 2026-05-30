package com.placement.placementbackend.controller;

import com.placement.placementbackend.entity.Application;
import com.placement.placementbackend.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // ================= APPLY COMPANY =================
    @PostMapping("/apply")
    public Application applyCompany(
            @Valid @RequestBody Application application) {

        return applicationService.applyCompany(application);
    }

    // ================= GET ALL APPLICATIONS =================
    @GetMapping
    public List<Application> getAllApplications() {

        return applicationService.getAllApplications();
    }

    // ================= GET STUDENT APPLICATIONS =================
    @GetMapping("/student/{studentId}")
    public List<Application> getStudentApplications(
            @PathVariable Long studentId) {

        return applicationService.getStudentApplications(studentId);
    }

    // ================= GET COMPANY APPLICATIONS =================
    @GetMapping("/company/{companyId}")
    public List<Application> getCompanyApplications(
            @PathVariable Long companyId) {

        return applicationService.getCompanyApplications(companyId);
    }

    // ================= UPDATE APPLICATION STATUS =================
    @PutMapping("/status/{id}")
    public Application updateApplicationStatus(
            @PathVariable Long id,
            @Valid @RequestBody Application updatedApplication) {

        return applicationService
                .updateApplicationStatus(id, updatedApplication);
    }
}
