package com.placement.placementbackend.service;

import com.placement.placementbackend.dto.NotificationRequestDTO;
import com.placement.placementbackend.entity.Application;
import com.placement.placementbackend.exception.ResourceNotFoundException;
import com.placement.placementbackend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private RestTemplate restTemplate;

    // Notification Service URL
    private static final String NOTIFICATION_URL =
            "https://ovary-armless-distill.ngrok-free.dev/api/notifications";

    // ================= APPLY TO COMPANY =================
    public Application applyCompany(Application application) {

        application.setStatus("APPLIED");
        application.setAppliedAt(LocalDateTime.now());

        Application savedApplication =
                applicationRepository.save(application);

        // Create Notification
        NotificationRequestDTO notification =
                new NotificationRequestDTO(
                        application.getStudentId(),
                        "Application Submitted",
                        "Your application has been submitted successfully.",
                        "APPLICATION"
                );

        try {
            restTemplate.postForObject(
                    NOTIFICATION_URL,
                    notification,
                    String.class
            );
        } catch (Exception e) {
            System.out.println("Notification Service Error: "
                    + e.getMessage());
        }

        return savedApplication;
    }

    // ================= GET ALL APPLICATIONS =================
    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }

    // ================= GET STUDENT APPLICATIONS =================
    public List<Application> getStudentApplications(Long studentId) {

        return applicationRepository.findByStudentId(studentId);
    }

    // ================= GET COMPANY APPLICATIONS =================
    public List<Application> getCompanyApplications(Long companyId) {

        return applicationRepository.findByCompanyId(companyId);
    }

    // ================= GET APPLICATION BY ID =================
    public Application getApplicationById(Long id) {

        return applicationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application Not Found"));
    }

    // ================= UPDATE APPLICATION STATUS =================
    public Application updateApplicationStatus(Long id,
                                               Application updatedApplication) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application Not Found"));

        application.setStatus(updatedApplication.getStatus());

        Application savedApplication =
                applicationRepository.save(application);

        // Create Status Update Notification
        NotificationRequestDTO notification =
                new NotificationRequestDTO(
                        application.getStudentId(),
                        "Application Status Updated",
                        "Your application status is now "
                                + application.getStatus(),
                        "APPLICATION"
                );

        try {
            restTemplate.postForObject(
                    NOTIFICATION_URL,
                    notification,
                    String.class
            );
        } catch (Exception e) {
            System.out.println("Notification Service Error: "
                    + e.getMessage());
        }

        return savedApplication;
    }

    // ================= DELETE APPLICATION =================
    public void deleteApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application Not Found"));

        applicationRepository.delete(application);
    }
}