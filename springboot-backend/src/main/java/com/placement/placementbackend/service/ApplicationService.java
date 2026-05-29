package com.placement.placementbackend.service;

import com.placement.placementbackend.entity.Application;
import com.placement.placementbackend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    // ================= UPDATE APPLICATION STATUS =================
    public Application updateApplicationStatus(Long id,
                                               Application updatedApplication) {

        Optional<Application> existingApplication =
                applicationRepository.findById(id);

        if (existingApplication.isPresent()) {

            Application application = existingApplication.get();

            application.setStatus(updatedApplication.getStatus());

            return applicationRepository.save(application);
        }

        return null;
    }
}
