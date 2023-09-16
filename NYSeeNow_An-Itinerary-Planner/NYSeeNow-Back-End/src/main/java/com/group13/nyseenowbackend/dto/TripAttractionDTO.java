package com.group13.nyseenowbackend.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class TripAttractionDTO {

    private Integer tripId;
    private Integer attractionId;
    private LocalDate date;
    private LocalTime time;
    private List<Integer> dayBusyness;

    public Integer getTripId() {
        return tripId;
    }

    public void setTripId(Integer tripId) {
        this.tripId = tripId;
    }

    public Integer getAttractionId() {
        return attractionId;
    }

    public void setAttractionId(Integer attractionId) {
        this.attractionId = attractionId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public List<Integer> getDayBusyness() {
        return dayBusyness;
    }

    public void setDayBusyness(List<Integer> dayBusyness) {
        this.dayBusyness = dayBusyness;
    }
}
