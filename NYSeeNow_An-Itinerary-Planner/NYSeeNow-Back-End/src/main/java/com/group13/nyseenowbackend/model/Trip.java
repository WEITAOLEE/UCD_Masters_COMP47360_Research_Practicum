package com.group13.nyseenowbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.json.JSONObject;


import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "Trip")
@Data
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trip_id")
    private int tripId;

    @Column(name = "username")
    private String username;

    @Column(name = "start_date")
    private LocalDate start_date;

    @Column(name = "end_date")
    private LocalDate end_date;

    @Column(name = "number_of_attractions")
    private int number_of_attractions;

    public int getTripId() {
        return tripId;
    }

    public void setTripId(int tripId) {
        this.tripId = tripId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDate getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDate start_date) {
        this.start_date = start_date;
    }

    public LocalDate getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDate end_date) {
        this.end_date = end_date;
    }

    public int getNumber_of_attractions() {
        return number_of_attractions;
    }

    public void setNumber_of_attractions(int number_of_attractions) {
        this.number_of_attractions = number_of_attractions;
    }

    public String toJSON() {
        Map<String, Object> map = new HashMap<>();
        map.put("trip_id", getTripId());
        map.put("username", getUsername());
        map.put("start_date", getStart_date().toString());
        map.put("end_date", getEnd_date().toString());
        map.put("number_of_attractions", getNumber_of_attractions());
        JSONObject json = new JSONObject(map);
        return json.toString();
    }




}