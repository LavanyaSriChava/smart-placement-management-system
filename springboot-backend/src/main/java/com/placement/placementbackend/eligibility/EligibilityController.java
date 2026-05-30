package com.placement.placementbackend.eligibility;

import com.placement.placementbackend.entity.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eligibility")
@CrossOrigin("*")
public class EligibilityController {

    @Autowired
    private EligibilityService eligibilityService;

    // ================= GET ELIGIBLE COMPANIES =================
    @GetMapping("/student/{studentId}")
    public List<Company> getEligibleCompanies(
            @PathVariable Long studentId) {

        return eligibilityService.getEligibleCompanies(studentId);
    }

    // ================= CHECK SINGLE COMPANY ELIGIBILITY =================
    @GetMapping("/check/{studentId}/{companyId}")
    public String checkEligibility(
            @PathVariable Long studentId,
            @PathVariable Long companyId) {

        return eligibilityService
                .checkEligibility(studentId, companyId);
    }
}
