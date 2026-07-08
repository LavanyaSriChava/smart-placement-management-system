package com.placement.placementbackend.repository;

import com.placement.placementbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByRole(String role);
    Optional<User> findByAuthUserId(
            Long authUserId);
}