package com.group13.nyseenowbackend.service;

import com.group13.nyseenowbackend.model.UserAccount;
import com.group13.nyseenowbackend.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserAccountRepository accountRepository;

    public Optional<Optional<UserAccount>> findByUsername(String username) {
        return Optional.ofNullable(accountRepository.findByUsername(username));
    }

    public UserAccount save(UserAccount account) {
        return accountRepository.save(account);
    }

}
