package com.placement.placementbackend.service;

import com.placement.placementbackend.entity.Application;
import com.placement.placementbackend.entity.Company;
import com.placement.placementbackend.entity.User;
import com.placement.placementbackend.exception.ResourceNotFoundException;
import com.placement.placementbackend.repository.ApplicationRepository;
import com.placement.placementbackend.repository.CompanyRepository;
import com.placement.placementbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    // ================= APPLY TO COMPANY =================
    public Application applyCompany(Application application) {

        User student = userRepository.findById(application.getStudentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found"));

        Company company = companyRepository.findById(application.getCompanyId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Company not found"));

        // Prevent duplicate applications
        if (applicationRepository.existsByStudentIdAndCompanyId(
                application.getStudentId(),
                application.getCompanyId())) {

            throw new IllegalArgumentException(
                    "You have already applied for this company.");
        }

        // Validate eligibility
        validateEligibility(student, company);

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
    public Application updateApplicationStatus(
            Long id,
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

    // ================= ELIGIBILITY VALIDATION =================
    private void validateEligibility(User student, Company company) {

        if (company.getRequiredCgpa() != null &&
                student.getCgpa() != null &&
                student.getCgpa() < company.getRequiredCgpa()) {

            throw new IllegalArgumentException(
                    "Student does not meet the required CGPA.");
        }

        if (company.getAllowedBacklogs() != null &&
                student.getBacklogs() != null &&
                student.getBacklogs() > company.getAllowedBacklogs()) {

            throw new IllegalArgumentException(
                    "Student exceeds the allowed backlogs.");
        }

        if (company.getEligibleBranches() != null) {

            boolean eligible = Arrays.stream(company.getEligibleBranches().split(","))
                    .map(String::trim)
                    .anyMatch(branch ->
                            branch.equalsIgnoreCase(student.getBranch()));

            if (!eligible) {
                throw new IllegalArgumentException(
                        "Student branch is not eligible.");
            }
        }
    }
}