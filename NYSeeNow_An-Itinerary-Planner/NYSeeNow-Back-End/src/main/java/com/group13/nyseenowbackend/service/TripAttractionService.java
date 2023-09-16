package com.group13.nyseenowbackend.service;

import com.group13.nyseenowbackend.model.TripAttraction;
import com.group13.nyseenowbackend.repository.TripAttractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TripAttractionService {

    @Autowired
    private TripAttractionRepository tripAttractionRepository;

    public TripAttraction save(TripAttraction tripAttraction) {
        return tripAttractionRepository.save(tripAttraction);
    }

}
