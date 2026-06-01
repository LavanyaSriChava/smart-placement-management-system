package com.placement.placementbackend.eligibility;

import com.placement.placementbackend.entity.Company;
import com.placement.placementbackend.entity.User;
import com.placement.placementbackend.repository.CompanyRepository;
import com.placement.placementbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EligibilityService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    // ================= GET ELIGIBLE COMPANIES =================
    public List<Company> getEligibleCompanies(Long studentId) {

        Optional<User> optionalUser = userRepository.findById(studentId);

        if (optionalUser.isEmpty()) {
            return new ArrayList<>();
        }

        User student = optionalUser.get();

        List<Company> allCompanies = companyRepository.findAll();

        List<Company> eligibleCompanies = new ArrayList<>();

        for (Company company : allCompanies) {

            boolean cgpaEligible =
                    student.getCgpa() >= company.getRequiredCgpa();

            boolean backlogEligible =
                    student.getBacklogs() <= company.getAllowedBacklogs();

            boolean branchEligible =
                    company.getEligibleBranches()
                            .toLowerCase()
                            .contains(student.getBranch().toLowerCase());

            if (cgpaEligible &&
                    backlogEligible &&
                    branchEligible) {

                eligibleCompanies.add(company);
            }
        }

        return eligibleCompanies;
    }

    // ================= CHECK SINGLE COMPANY ELIGIBILITY =================
    public String checkEligibility(Long studentId, Long companyId) {

        Optional<User> optionalUser = userRepository.findById(studentId);

        Optional<Company> optionalCompany =
                companyRepository.findById(companyId);

        if (optionalUser.isEmpty() || optionalCompany.isEmpty()) {
            return "Student or Company Not Found";
        }

        User student = optionalUser.get();

        Company company = optionalCompany.get();

        boolean cgpaEligible =
                student.getCgpa() >= company.getRequiredCgpa();

        boolean backlogEligible =
                student.getBacklogs() <= company.getAllowedBacklogs();

        boolean branchEligible =
                company.getEligibleBranches()
                        .toLowerCase()
                        .contains(student.getBranch().toLowerCase());

        if (cgpaEligible &&
                backlogEligible &&
                branchEligible) {

            return "Eligible";
        }

        return "Not Eligible";
    }
}
