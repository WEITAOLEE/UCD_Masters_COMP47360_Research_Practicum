package com.group13.nyseenowbackend.service;

import com.group13.nyseenowbackend.model.Attraction;
import com.group13.nyseenowbackend.repository.AttractionRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AttractionFetchService {



    private final AttractionRepository attractionRepository;

    public AttractionFetchService(AttractionRepository attractionRepository) {
        this.attractionRepository = attractionRepository;
    }

    public List<Attraction> getAllAttractions() {
        List<Attraction> allAttractionList = this.attractionRepository.findAll();
        return allAttractionList;
    }

}