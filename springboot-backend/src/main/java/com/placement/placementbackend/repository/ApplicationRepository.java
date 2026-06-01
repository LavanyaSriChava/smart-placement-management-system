package com.placement.placementbackend.repository;

import com.placement.placementbackend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudentId(Long studentId);

    List<Application> findByCompanyId(Long companyId);
}
