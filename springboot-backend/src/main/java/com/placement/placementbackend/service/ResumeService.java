package com.placement.placementbackend.service;

import com.placement.placementbackend.entity.Resume;
import com.placement.placementbackend.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    // ================= ADD RESUME =================
    public Resume addResume(Resume resume) {

        resume.setUploadedAt(LocalDateTime.now());

        return resumeRepository.save(resume);
    }

    // ================= GET ALL RESUMES =================
    public List<Resume> getAllResumes() {

        return resumeRepository.findAll();
    }

    // ================= GET RESUME BY STUDENT ID =================
    public Optional<Resume> getResumeByStudentId(Long studentId) {

        return resumeRepository.findByStudentId(studentId);
    }

    // ================= DELETE RESUME =================
    public void deleteResume(Long id) {

        resumeRepository.deleteById(id);
    }
}
