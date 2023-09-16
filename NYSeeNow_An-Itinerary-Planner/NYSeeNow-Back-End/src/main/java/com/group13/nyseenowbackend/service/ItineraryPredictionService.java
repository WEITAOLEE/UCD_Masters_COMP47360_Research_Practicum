package com.group13.nyseenowbackend.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ItineraryPredictionService {

    public Map<String, List<String>> predictSubwayBusyness(Map<String, Object> attractionData) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(attractionData, headers);

        ResponseEntity<Map<String, List<String>>> responseEntity =
                restTemplate.exchange(
                        "http://localhost:5001/predict",
                        HttpMethod.POST,
                        requestEntity,
                        new ParameterizedTypeReference<>() {
                        }
                );

        return responseEntity.getBody();
    }

}