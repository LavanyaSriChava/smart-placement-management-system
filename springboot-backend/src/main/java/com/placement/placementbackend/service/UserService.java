package com.placement.placementbackend.service;

import com.placement.placementbackend.entity.User;
import com.placement.placementbackend.exception.ResourceNotFoundException;
import com.placement.placementbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ================= GET ALL USERS =================
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // ================= GET USER BY ID =================
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));
    }

    // ================= UPDATE USER =================
    public User updateUser(Long id, User updatedUser) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setRole(updatedUser.getRole());

        // ================= STUDENT FIELDS =================
        existingUser.setCgpa(updatedUser.getCgpa());
        existingUser.setBranch(updatedUser.getBranch());
        existingUser.setBacklogs(updatedUser.getBacklogs());
        existingUser.setSkills(updatedUser.getSkills());

        return userRepository.save(existingUser);
    }

    // ================= DELETE USER =================
    public void deleteUser(Long id) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));

        userRepository.delete(existingUser);
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
