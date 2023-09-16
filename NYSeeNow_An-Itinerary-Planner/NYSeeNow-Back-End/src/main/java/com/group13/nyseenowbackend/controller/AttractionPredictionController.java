package com.group13.nyseenowbackend.controller;

import com.group13.nyseenowbackend.service.AttractionPredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AttractionPredictionController {

    private final AttractionPredictionService predictionService;

    @Autowired
    public AttractionPredictionController(AttractionPredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("attraction/predict")
    public Map<String, Object> predictAttractionBusyness(@RequestBody Map<String, Object> attractionData) {
        return predictionService.predictAttractionBusyness(attractionData);
    }
}
