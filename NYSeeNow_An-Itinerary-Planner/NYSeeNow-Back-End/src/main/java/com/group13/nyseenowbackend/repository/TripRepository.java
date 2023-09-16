package com.group13.nyseenowbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.group13.nyseenowbackend.model.Trip;

import java.util.List;
import java.util.Optional;

public interface TripRepository extends JpaRepository<Trip, Integer> {
    List<Trip> findByUsername(String username);

    Optional<Trip> findByTripIdAndUsername(Integer tripId, String username);
}
