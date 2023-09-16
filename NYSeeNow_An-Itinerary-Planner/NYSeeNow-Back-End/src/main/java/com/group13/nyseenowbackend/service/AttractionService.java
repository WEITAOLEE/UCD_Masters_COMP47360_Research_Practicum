package com.group13.nyseenowbackend.service;

import com.group13.nyseenowbackend.model.Attraction;
import com.group13.nyseenowbackend.repository.AttractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AttractionService {

    @Autowired
    private AttractionRepository attractionRepository;

    public Attraction findById(Integer id) {
        Optional<Attraction> attractionOptional = attractionRepository.findById(id);

        if (!attractionOptional.isPresent()) {
            throw new IllegalArgumentException("Attraction with id " + id + " not found");
        }

        return attractionOptional.get();
    }


}
