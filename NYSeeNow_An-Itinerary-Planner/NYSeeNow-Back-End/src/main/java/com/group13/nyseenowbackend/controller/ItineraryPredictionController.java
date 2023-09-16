package com.group13.nyseenowbackend.controller;

import com.group13.nyseenowbackend.service.ItineraryPredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ItineraryPredictionController {

    private final ItineraryPredictionService predictionService;

    @Autowired
    public ItineraryPredictionController(ItineraryPredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("itinerary/predict")
    public Map<String, List<String>> predictSubwayBusyness(@RequestBody Map<String, Object> attractionData) {
        return predictionService.predictSubwayBusyness(attractionData);
    }

}
