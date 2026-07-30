package com.placement.placementbackend.service;

import com.placement.placementbackend.entity.Resume;
import com.placement.placementbackend.exception.ResourceNotFoundException;
import com.placement.placementbackend.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    // ================= ADD RESUME =================
    // ================= ADD / REPLACE RESUME =================
    public Resume addResume(Resume resume) {

        Resume resumeToSave = resumeRepository
                .findByStudentId(resume.getStudentId())
                .map(existingResume -> {

                    // Replace the old resume details
                    existingResume.setResumeUrl(resume.getResumeUrl());
                    existingResume.setFileName(resume.getFileName());
                    existingResume.setUploadedAt(LocalDateTime.now());

                    return existingResume;
                })
                .orElseGet(() -> {

                    // First resume uploaded by this student
                    resume.setUploadedAt(LocalDateTime.now());

                    return resume;
                });

        return resumeRepository.save(resumeToSave);
    }

    // ================= GET ALL RESUMES =================
    public List<Resume> getAllResumes() {

        return resumeRepository.findAll();
    }

    // ================= GET RESUME BY STUDENT ID =================
    public Resume getResumeByStudentId(Long studentId) {

        return resumeRepository.findByStudentId(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume Not Found"));
    }

    // ================= DELETE RESUME =================
    public void deleteResume(Long id) {

        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume Not Found"));

        resumeRepository.delete(resume);
    }
}

