package com.placement.placementbackend.controller;

import com.placement.placementbackend.entity.Company;
import com.placement.placementbackend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin("*")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // ================= ADD COMPANY =================
    @PostMapping
    public Company addCompany(@RequestBody Company company) {
        return companyService.addCompany(company);
    }

    // ================= GET ALL COMPANIES =================
    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    // ================= GET COMPANY BY ID =================
    @GetMapping("/{id}")
    public Optional<Company> getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id);
    }

    // ================= UPDATE COMPANY =================
    @PutMapping("/update/{id}")
    public Company updateCompany(@PathVariable Long id,
                                 @RequestBody Company updatedCompany) {

        return companyService.updateCompany(id, updatedCompany);
    }

    // ================= DELETE COMPANY =================
    @DeleteMapping("/delete/{id}")
    public String deleteCompany(@PathVariable Long id) {

        companyService.deleteCompany(id);

        return "Company Deleted Successfully";
    }
}
