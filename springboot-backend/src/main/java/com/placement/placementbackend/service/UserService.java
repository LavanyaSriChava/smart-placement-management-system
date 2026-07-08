package com.placement.placementbackend.service;

import com.placement.placementbackend.dto.UpdateUserDTO;
import com.placement.placementbackend.dto.UserRequestDTO;
import com.placement.placementbackend.dto.UserResponseDTO;
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

    // ================= CONVERT ENTITY TO RESPONSE DTO =================
    private UserResponseDTO convertToResponseDTO(User user) {

        UserResponseDTO dto = new UserResponseDTO();

        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setAuthUserId(
                user.getAuthUserId()
        );
        dto.setCgpa(user.getCgpa());
        dto.setBranch(user.getBranch());
        dto.setBacklogs(user.getBacklogs());
        dto.setSkills(user.getSkills());

        return dto;
    }

    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {

        User user = new User();

        user.setName(userRequestDTO.getName());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(userRequestDTO.getPassword());
        user.setRole(userRequestDTO.getRole());
        user.setAuthUserId(
                userRequestDTO.getAuthUserId()
        );
        user.setCgpa(userRequestDTO.getCgpa());
        user.setBranch(userRequestDTO.getBranch());
        user.setBacklogs(userRequestDTO.getBacklogs());
        user.setSkills(userRequestDTO.getSkills());

        User savedUser = userRepository.save(user);

        return convertToResponseDTO(savedUser);
    }
    // ================= GET ALL USERS =================
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // ================= GET USER BY ID =================
    public UserResponseDTO getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));

        return convertToResponseDTO(user);
    }
    public UserResponseDTO getUserByAuthUserId(
            Long authUserId) {

        User user = userRepository
                .findByAuthUserId(authUserId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User Not Found"));

        return convertToResponseDTO(user);
    }

    // ================= UPDATE USER =================
    public UserResponseDTO updateUser(
            Long id,
            UpdateUserDTO updatedUser) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));

        existingUser.setName(updatedUser.getName());



        // ================= STUDENT FIELDS =================
        existingUser.setCgpa(updatedUser.getCgpa());
        existingUser.setBranch(updatedUser.getBranch());
        existingUser.setBacklogs(updatedUser.getBacklogs());
        existingUser.setSkills(updatedUser.getSkills());

        User savedUser = userRepository.save(existingUser);

        return convertToResponseDTO(savedUser);
    }

    // ================= DELETE USER =================
    public void deleteUser(Long id) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));

        userRepository.delete(existingUser);
    }

    // ================= GET ALL STUDENTS =================
    public List<UserResponseDTO> getAllStudents() {

        return userRepository.findByRole("STUDENT")
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // ================= GET ALL ADMINS =================
    public List<UserResponseDTO> getAllAdmins() {

        return userRepository.findByRole("ADMIN")
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }
}
