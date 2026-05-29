package com.placement.placementbackend.controller;

import com.placement.placementbackend.entity.User;
import com.placement.placementbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // ================= GET ALL USERS =================
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ================= GET USER BY ID =================
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // ================= UPDATE USER =================
    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id,
                           @RequestBody User updatedUser) {

        return userService.updateUser(id, updatedUser);
    }

    // ================= DELETE USER =================
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return "User Deleted Successfully";
    }

    // ================= GET ALL STUDENTS =================
    @GetMapping("/students")
    public List<User> getAllStudents() {

        return userService.getAllStudents();
    }

    // ================= GET ALL ADMINS =================
    @GetMapping("/admins")
    public List<User> getAllAdmins() {

        return userService.getAllAdmins();
    }

}