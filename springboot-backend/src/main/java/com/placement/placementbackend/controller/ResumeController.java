package com.placement.placementbackend.controller;

import com.placement.placementbackend.entity.Resume;
import com.placement.placementbackend.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin("*")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    // ================= ADD RESUME =================
    @PostMapping
    public Resume addResume(@RequestBody Resume resume) {

        return resumeService.addResume(resume);
    }

    // ================= GET ALL RESUMES =================
    @GetMapping
    public List<Resume> getAllResumes() {

        return resumeService.getAllResumes();
    }

    // ================= GET RESUME BY STUDENT ID =================
    @GetMapping("/student/{studentId}")
    public Optional<Resume> getResumeByStudentId(
            @PathVariable Long studentId) {

        return resumeService.getResumeByStudentId(studentId);
    }

    // ================= DELETE RESUME =================
    @DeleteMapping("/delete/{id}")
    public String deleteResume(@PathVariable Long id) {

        resumeService.deleteResume(id);

        return "Resume Deleted Successfully";
    }
}
