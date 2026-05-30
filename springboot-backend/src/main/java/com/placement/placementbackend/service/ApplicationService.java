package com.placement.placementbackend.service;

import com.placement.placementbackend.entity.Application;
import com.placement.placementbackend.exception.ResourceNotFoundException;
import com.placement.placementbackend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    // ================= APPLY TO COMPANY =================
    public Application applyCompany(Application application) {

        application.setStatus("APPLIED");

        application.setAppliedAt(LocalDateTime.now());

        return applicationRepository.save(application);
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

        return applicationRepository.save(application);
    }

    // ================= DELETE APPLICATION =================
    public void deleteApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application Not Found"));

        applicationRepository.delete(application);
    }
}
