package com.group13.nyseenowbackend.service;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface AuthorizeService extends UserDetailsService {
    String validateAndRegister(String username, String password, String email);

    String resetUser(String email, String newUsername, String newPassword);


}
