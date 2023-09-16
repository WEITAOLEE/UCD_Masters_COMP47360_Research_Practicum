package com.group13.nyseenowbackend.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class TripCreationRequest {
    private String user;
    private Map<String, List<Map<String, Object>>> tripDetails = new HashMap<>();

    public String getUser() {
        return user;
    }

    public Map<String, List<Map<String, Object>>> getTripDetails() {
        return tripDetails;
    }

    public LocalDate getEndDate() {
        String latestDate = tripDetails.keySet().stream().min(String::compareTo).orElse(null);
        if (latestDate != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzzz)", Locale.ENGLISH);
            return LocalDate.parse(latestDate, formatter);
        }
        return null;
    }

    public LocalDate getStartDate() {
        String earliestDate= tripDetails.keySet().stream().max(String::compareTo).orElse(null);
        if (earliestDate != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzzz)", Locale.ENGLISH);
            return LocalDate.parse(earliestDate, formatter);
        }
        return null;
    }


    public int getNumberOfAttractions() {
        return tripDetails.values().stream().mapToInt(List::size).sum();
    }


}

