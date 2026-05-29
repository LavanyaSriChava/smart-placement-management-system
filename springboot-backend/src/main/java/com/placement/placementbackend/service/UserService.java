package com.placement.placementbackend.service;

import com.placement.placementbackend.entity.User;
import com.placement.placementbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ================= GET ALL USERS =================
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ================= GET USER BY ID =================
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // ================= UPDATE USER =================
    public User updateUser(Long id, User updatedUser) {

        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser != null) {

            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setRole(updatedUser.getRole());

            // Student-specific fields
            existingUser.setCgpa(updatedUser.getCgpa());
            existingUser.setBranch(updatedUser.getBranch());
            existingUser.setBacklogs(updatedUser.getBacklogs());
            existingUser.setSkills(updatedUser.getSkills());

            return userRepository.save(existingUser);
        }

        return null;
    }

    // ================= DELETE USER =================
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // ================= GET ALL STUDENTS =================
    public List<User> getAllStudents() {
        return userRepository.findByRole("STUDENT");
    }

    // ================= GET ALL ADMINS =================
    public List<User> getAllAdmins() {
        return userRepository.findByRole("ADMIN");
    }
}