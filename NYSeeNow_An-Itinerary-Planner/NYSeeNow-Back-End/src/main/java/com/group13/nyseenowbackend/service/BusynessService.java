package com.group13.nyseenowbackend.service;


import com.group13.nyseenowbackend.dto.BusynessDTO;
import com.group13.nyseenowbackend.model.Busyness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.group13.nyseenowbackend.repository.BusynessRepository;

@Service
@Transactional
public class BusynessService {

    private final BusynessRepository busynessRepository;
    @Autowired
    public BusynessService(BusynessRepository busynessRepository) {
        this.busynessRepository = busynessRepository;
    }

    public BusynessDTO getBusynessByVenueNameDayAndHour(String name, String day, String hour) {
        Busyness busyness = busynessRepository.findBusynessValueByNameDayAndHour(name, day, hour);

        if (busyness != null) {
            return new BusynessDTO(busyness.getName(), busyness.getDay(), busyness.getHour(), busyness.getBusyness());
        } else {
            return null;
        }
    }
}