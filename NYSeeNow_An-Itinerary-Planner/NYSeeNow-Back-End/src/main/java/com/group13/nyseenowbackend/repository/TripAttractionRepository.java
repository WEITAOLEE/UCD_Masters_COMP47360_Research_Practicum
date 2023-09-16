package com.group13.nyseenowbackend.repository;

import com.group13.nyseenowbackend.model.TripAttraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripAttractionRepository extends JpaRepository<TripAttraction, String> {
    List<TripAttraction> findByTripId(Integer tripId);

    Optional<TripAttraction> findByTripIdAndAttractionId(Integer tripId, Integer attractionId);
}
