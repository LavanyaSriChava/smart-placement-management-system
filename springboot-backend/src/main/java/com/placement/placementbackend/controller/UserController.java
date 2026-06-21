package com.placement.placementbackend.controller;

import com.placement.placementbackend.dto.UpdateUserDTO;
import com.placement.placementbackend.dto.UserRequestDTO;
import com.placement.placementbackend.dto.UserResponseDTO;
import com.placement.placementbackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // ================= GET ALL USERS =================
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {

        return userService.getAllUsers();
    }
    @PostMapping
    public UserResponseDTO createUser(
            @Valid @RequestBody UserRequestDTO userRequestDTO) {

        return userService.createUser(userRequestDTO);
    }
    // ================= GET USER BY ID =================
    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Long id) {

        return userService.getUserById(id);
    }

    // ================= UPDATE USER =================
    @PutMapping("/update/{id}")
    public UserResponseDTO updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserDTO updatedUser) {

        return userService.updateUser(id, updatedUser);
    }
    @GetMapping("/auth/{authUserId}")
    public UserResponseDTO getUserByAuthUserId(
            @PathVariable Long authUserId) {

        return userService
                .getUserByAuthUserId(authUserId);
    }
    // ================= DELETE USER =================
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return "User Deleted Successfully";
    }

    // ================= GET ALL STUDENTS =================
    @GetMapping("/students")
    public List<UserResponseDTO> getAllStudents() {

        return userService.getAllStudents();
    }

    // ================= GET ALL ADMINS =================
    @GetMapping("/admins")
    public List<UserResponseDTO> getAllAdmins() {

        return userService.getAllAdmins();
    }
}
