package com.group13.nyseenowbackend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.group13.nyseenowbackend.model.Busyness;


public interface BusynessRepository extends JpaRepository<Busyness, Long> {
    @Query("SELECT v FROM Busyness v WHERE v.name = :name AND v.day = :day AND v.hour = :hour")
    public Busyness findBusynessValueByNameDayAndHour(@Param("name") String name, @Param("day") String day, @Param("hour") String hour);
}