package com.group13.nyseenowbackend.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AttractionPredictionService {

    public Map<String, Object> predictAttractionBusyness(Map<String, Object> attractionData) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(attractionData, headers);

        ResponseEntity<Map> responseEntity = restTemplate.exchange(
                "http://localhost:5001/AttractionPredict",
                HttpMethod.POST,
                requestEntity,
                Map.class
        );

        return responseEntity.getBody();
    }
}
