package com.group13.nyseenowbackend.repository;

import com.group13.nyseenowbackend.model.Attraction;
import com.group13.nyseenowbackend.model.TripAttraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttractionRepository extends JpaRepository<Attraction, Integer> {
    List<Attraction> findByAttractionId(Integer attraction_id);
    List<Attraction> findAll();
}

