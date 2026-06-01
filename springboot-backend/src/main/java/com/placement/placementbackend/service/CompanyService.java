package com.placement.placementbackend.service;

import com.placement.placementbackend.entity.Company;
import com.placement.placementbackend.exception.ResourceNotFoundException;
import com.placement.placementbackend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public Company getCompanyById(Long id) {

        return companyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Company Not Found"));
    }

    // ================= UPDATE COMPANY =================
    public Company updateCompany(Long id, Company updatedCompany) {

        Company existingCompany = companyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Company Not Found"));

        existingCompany.setCompanyName(updatedCompany.getCompanyName());
        existingCompany.setRole(updatedCompany.getRole());
        existingCompany.setCtc(updatedCompany.getCtc());
        existingCompany.setRequiredCgpa(updatedCompany.getRequiredCgpa());
        existingCompany.setAllowedBacklogs(updatedCompany.getAllowedBacklogs());
        existingCompany.setEligibleBranches(updatedCompany.getEligibleBranches());
        existingCompany.setRequiredSkills(updatedCompany.getRequiredSkills());

        return companyRepository.save(existingCompany);
    }

    // ================= DELETE COMPANY =================
    public void deleteCompany(Long id) {

        Company existingCompany = companyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Company Not Found"));

        companyRepository.delete(existingCompany);
    }
}
