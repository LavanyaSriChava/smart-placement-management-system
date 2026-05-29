package com.placement.placementbackend.service;

import com.placement.placementbackend.entity.Company;
import com.placement.placementbackend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    // ================= ADD COMPANY =================
    public Company addCompany(Company company) {
        return companyRepository.save(company);
    }

    // ================= GET ALL COMPANIES =================
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // ================= GET COMPANY BY ID =================
    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }

    // ================= UPDATE COMPANY =================
    public Company updateCompany(Long id, Company updatedCompany) {

        Company existingCompany = companyRepository.findById(id).orElse(null);

        if (existingCompany != null) {

            existingCompany.setCompanyName(updatedCompany.getCompanyName());
            existingCompany.setRole(updatedCompany.getRole());
            existingCompany.setCtc(updatedCompany.getCtc());
            existingCompany.setRequiredCgpa(updatedCompany.getRequiredCgpa());
            existingCompany.setAllowedBacklogs(updatedCompany.getAllowedBacklogs());
            existingCompany.setEligibleBranches(updatedCompany.getEligibleBranches());
            existingCompany.setRequiredSkills(updatedCompany.getRequiredSkills());

            return companyRepository.save(existingCompany);
        }

        return null;
    }

    // ================= DELETE COMPANY =================
    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }
}
