package com.group13.nyseenowbackend.service.impl;

import com.group13.nyseenowbackend.model.UserAccount;
import com.group13.nyseenowbackend.repository.UserAccountRepository;
import com.group13.nyseenowbackend.service.AuthorizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthorizeServiceImpl implements AuthorizeService {

    @Autowired
    UserAccountRepository userAccountRepository;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Load user details by username
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Check for null or empty username
        if (username == null || username.trim().isEmpty()) {
            throw new BadCredentialsException("Username cannot be empty.");
        }

        // Retrieve account from database
        Optional<UserAccount> userAccountOptional = userAccountRepository.findByUsername(username);

        // Check if account exists
        UserAccount userAccount = userAccountOptional.orElseThrow(
                () -> new BadCredentialsException("Invalid username or password.")
        );

        // Return UserDetails object
        return User
                .withUsername(userAccount.getUsername())
                .password(userAccount.getPassword())
                .roles("user")
                .build();
    }


    // Validate and register a user
    @Override
    public String validateAndRegister(String username, String password, String email){
        // Encode password
        password = encoder.encode(password);

        // Check if the email already exists in the database
        Optional<UserAccount> existingAccount = userAccountRepository.findByEmail(email);
        // If email exists, return error message
        if (existingAccount.isPresent()) {
            return "Email already exists";
        }

        // If email does not exist, create new account
        UserAccount userAccount = new UserAccount();
        userAccount.setUsername(username);
        userAccount.setPassword(password);
        userAccount.setEmail(email);
        userAccountRepository.save(userAccount);

        return null; // Registration successful, no error message
    }

    // Reset user credentials
    @Override
    public String resetUser(String email, String newUsername, String newPassword) {
        // Check if the email exists
        Optional<UserAccount> existingAccountOptional = userAccountRepository.findByEmail(email);

        // If email does not exist, return error message
        if (!existingAccountOptional.isPresent()) {
            return "Email does not exist";
        }

        UserAccount existingAccount = existingAccountOptional.get();

        // Check if the new username already exists
        Optional<UserAccount> existingUsernameAccountOptional = userAccountRepository.findByUsername(newUsername);

        // If username exists, return error message
        if (existingUsernameAccountOptional.isPresent()) {
            return "New username already exists";
        }

        // If the email exists and the new username doesn't exist, proceed with the update
        existingAccount.setUsername(newUsername);
        existingAccount.setPassword(encoder.encode(newPassword));

        // Update account in database
        userAccountRepository.save(existingAccount);

        return null; // Reset successful, no error message
    }

}
