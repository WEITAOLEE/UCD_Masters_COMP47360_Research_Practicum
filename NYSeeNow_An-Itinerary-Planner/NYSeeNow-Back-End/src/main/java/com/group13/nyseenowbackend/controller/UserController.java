package com.group13.nyseenowbackend.controller;

import com.group13.nyseenowbackend.model.UserAccount;
import com.group13.nyseenowbackend.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @GetMapping("/api/users/{username}")
    public UserAccount getUserByUsername(@PathVariable String username) {
        Optional<UserAccount> userAccountOptional = userAccountRepository.findByUsername(username);

        return userAccountOptional.orElse(null);
    }
}
