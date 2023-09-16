package com.group13.nyseenowbackend.controller;

import com.group13.nyseenowbackend.model.Attraction;
import com.group13.nyseenowbackend.service.AttractionFetchService;
import com.group13.nyseenowbackend.service.ItineraryPredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class AttractionFetchController {

    private final AttractionFetchService attractionFetchService;

    @Autowired
    public AttractionFetchController(ItineraryPredictionService predictionService, AttractionFetchService attractionFetchService) {
        this.attractionFetchService = attractionFetchService;
    }

    @GetMapping("attractions/fetch")
    public List<Attraction>  fetchAllAttractions() {
        return attractionFetchService.getAllAttractions();
    }
}
