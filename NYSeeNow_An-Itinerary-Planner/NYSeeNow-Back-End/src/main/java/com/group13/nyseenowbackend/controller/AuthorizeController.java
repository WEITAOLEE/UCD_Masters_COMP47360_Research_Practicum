package com.group13.nyseenowbackend.controller;

import com.group13.nyseenowbackend.dto.RestBean;
import com.group13.nyseenowbackend.service.AuthorizeService;
import jakarta.annotation.Resource;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Controller for authorization related APIs
@RestController
@RequestMapping("/api/auth")
public class AuthorizeController {

    @Resource
    AuthorizeService service;

    // Regex for validating email, username and password
    private final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";
    private final String NAME_REGEX ="^[a-zA-Z0-9_-]{4,20}$";
    private final String PASS_REGEX ="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,16}$";

    // API endpoint for user registration
    @PostMapping("/register")
    public RestBean<String> registerUser(@RequestParam("username")
                                             @Length(min = 4, max = 20)
                                             @Pattern(regexp = NAME_REGEX, message = "Invalid username format")
                                             String username,
                                         @RequestParam("password")
                                             @Length(min = 6, max = 16)
                                             @Pattern(regexp = PASS_REGEX, message = "Invalid password format")
                                         String password,
                                         @RequestParam("email")
                                             @NotEmpty(message = "Email is required")
                                             @Pattern(regexp = EMAIL_REGEX, message = "Invalid email format")
                                             String email)
    {
        // Handle registration and return response
        String registrationErrorMessage = service.validateAndRegister(username, password, email);
        if (registrationErrorMessage == null) {
            return RestBean.success("Register Successfully");
        } else if (registrationErrorMessage.equals("Email already exists")) {
            return RestBean.failure(400, "Email already exists");
        } else {
            return RestBean.failure(400, "Register Failed");
        }
    }

    // API endpoint for resetting user details
    @PostMapping("/reset")
    public RestBean<String> resetUser(
            @RequestParam("email")
            @NotEmpty(message = "Email is required")
            @Pattern(regexp = EMAIL_REGEX, message = "Invalid email format")
            String email,
            @RequestParam("newUsername")
            @Length(min = 4, max = 20)
            @Pattern(regexp = NAME_REGEX, message = "Invalid username format")
            String newUsername,
            @RequestParam("newPassword")
            @Length(min = 6, max = 16)
            @Pattern(regexp = PASS_REGEX, message = "Invalid password format")
            String newPassword)
    {
        // Handle user reset and return response
        String resetErrorMessage = service.resetUser(email, newUsername, newPassword);
        if (resetErrorMessage == null) {
            return RestBean.success("Reset Successfully");
        } else if (resetErrorMessage.equals("Email does not exist")) {
            return RestBean.failure(400, "Email does not exist");
        } else {
            return RestBean.failure(400, "Reset Failed");
        }
    }





}
