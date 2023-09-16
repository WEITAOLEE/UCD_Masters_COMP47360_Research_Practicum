package com.group13.nyseenowbackend.controller;

import com.group13.nyseenowbackend.model.*;
import com.group13.nyseenowbackend.repository.AttractionRepository;
import com.group13.nyseenowbackend.repository.TripAttractionRepository;
import com.group13.nyseenowbackend.repository.TripRepository;
import com.group13.nyseenowbackend.service.TripService;
import com.group13.nyseenowbackend.dto.TripAttractionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/trip")
public class TripController {

    private final TripRepository tripRepository;
    private final TripService tripService;
    private final AttractionRepository attractionRepository;
    private final TripAttractionRepository tripAttractionRepository;

    @Autowired
    public TripController(TripRepository tripRepository,
                          TripService tripService,
                          AttractionRepository attractionRepository,
                          TripAttractionRepository tripAttractionRepository) {
        this.tripRepository = tripRepository;
        this.tripService = tripService;
        this.attractionRepository = attractionRepository;
        this.tripAttractionRepository = tripAttractionRepository;
    }



    @PostMapping("/create")
    public Trip createTrip(@RequestBody TripCreationRequest request) {

        System.out.println("Request received: " + request);
        // Create a Trip
        Trip trip = new Trip();
        trip.setUsername(request.getUser());
        trip.setStart_date(request.getStartDate());
        trip.setEnd_date(request.getEndDate());
        trip.setNumber_of_attractions(request.getNumberOfAttractions());
        // Save trip to get generated ID
        trip = tripRepository.save(trip);

        // Define the DateTimeFormatter pattern
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzzz)", Locale.ENGLISH);

        // Iterate over tripDetails and create TripAttractions
        for (Map.Entry<String, List<Map<String, Object>>> entry : request.getTripDetails().entrySet()) {
            String dateString = entry.getKey();
            List<Map<String, Object>> attractions = entry.getValue();

            for (Map<String, Object> attraction : attractions) {
                Integer attractionId = (Integer) attraction.get("attractionId");

                Optional<Attraction> attractionEntityOptional = attractionRepository.findById(attractionId);
                Trip finalTrip = trip;
                attractionEntityOptional.ifPresent(attractionEntity -> {

                    String visitTime = (String) attraction.get("visitTime");

                    // Parse the date using the formatter
                    LocalDate date = LocalDate.parse(dateString, formatter);

                    List<Integer> dayBusyness = (List<Integer>) attraction.get("day_busyness");
                    String predictionString = dayBusyness.toString();

                    // Save each TripAttraction
                    TripAttraction tripAttraction = new TripAttraction();
                    tripAttraction.setTripId(finalTrip.getTripId());
                    tripAttraction.setAttractionId(attractionEntity.getAttractionId());
                    tripAttraction.setDate(date);
                    tripAttraction.setTime(LocalTime.parse(visitTime));
                    tripAttraction.setPrediction(predictionString);
                    tripAttractionRepository.save(tripAttraction);

                });
            }
        }

        return trip;
    }


    @GetMapping("/{username}")
    public ResponseEntity<Map<String, List<TripAttractionDTO>>> getTripsByUsername(@PathVariable String username) {
        // Fetch trips by username
        List<Trip> trips = tripRepository.findByUsername(username);



        // If no trips were found, return NO_CONTENT
        if (trips.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        // Prepare the map to be returned
        Map<String, List<TripAttractionDTO>> tripsWithAttractions = new HashMap<>();

        // For each trip, fetch trip attractions and add them to the map
        for (Trip trip : trips) {
            List<TripAttraction> tripAttractions = tripAttractionRepository.findByTripId(trip.getTripId());
            List<TripAttractionDTO> tripAttractionDTOs = new ArrayList<>();

            for (TripAttraction tripAttraction : tripAttractions) {
                String predictionString = tripAttraction.getPrediction();
                List<Integer> dayBusyness = Arrays.asList(predictionString.substring(1, predictionString.length() - 1).split(",")).stream().map(String::trim).map(Integer::parseInt).collect(Collectors.toList());

                TripAttractionDTO dto = new TripAttractionDTO();
                dto.setTripId(tripAttraction.getTripId());
                dto.setAttractionId(tripAttraction.getAttractionId());
                dto.setDate(tripAttraction.getDate());
                dto.setTime(tripAttraction.getTime());
                dto.setDayBusyness(dayBusyness);

                tripAttractionDTOs.add(dto);
            }
            tripsWithAttractions.put(trip.toJSON(), tripAttractionDTOs);
        }

        return new ResponseEntity<>(tripsWithAttractions, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{username}/{tripId}")
    public ResponseEntity<String> deleteTrip(@PathVariable String username, @PathVariable Integer tripId) {
        Optional<Trip> tripOptional = tripRepository.findByTripIdAndUsername(tripId, username);

        // If the trip is not found or does not belong to the given user, return NOT_FOUND
        if (!tripOptional.isPresent()) {
            return new ResponseEntity<>("Trip not found.", HttpStatus.NOT_FOUND);
        }

        // Delete the trip and its associated trip attractions
        Trip trip = tripOptional.get();
        List<TripAttraction> tripAttractions = tripAttractionRepository.findByTripId(trip.getTripId());
        for (TripAttraction tripAttraction : tripAttractions) {
            tripAttractionRepository.delete(tripAttraction);
        }

        tripRepository.delete(trip);

        // Return a message to signify that the deletion was successful
        return new ResponseEntity<>("Trip deleted successfully.", HttpStatus.OK);
    }


    @PutMapping("/update/{username}/{tripId}")
    public ResponseEntity<String> updateTrip(@PathVariable String username, @PathVariable Integer tripId, @RequestBody List<TripAttractionRequest> request) {
        // Fetch the trip
        Optional<Trip> tripOptional = tripRepository.findByTripIdAndUsername(tripId, username);

        // If the trip is not found or does not belong to the given user, return NOT_FOUND
        if (!tripOptional.isPresent()) {
            return new ResponseEntity<>("Trip not found.", HttpStatus.NOT_FOUND);
        }

        // Get the existing trip
        Trip trip = tripOptional.get();

        // Define the DateTimeFormatter pattern
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH);

        // Delete existing trip attractions (assuming you have a separate tripAttractionRepository)
        List<TripAttraction> existingTripAttractions = tripAttractionRepository.findByTripId(tripId);
        tripAttractionRepository.deleteAll(existingTripAttractions);

        // Add new trip attractions
        List<TripAttraction> newTripAttractions = new ArrayList<>();
        for (TripAttractionRequest attractionRequest : request) {
            String dateString = attractionRequest.getDate();
            Integer attractionId = attractionRequest.getAttractionId();
            String visitTime = attractionRequest.getTime();
            String dayBusyness = attractionRequest.getPrediction();

            Optional<Attraction> attractionEntityOptional = attractionRepository.findById(attractionId);
            attractionEntityOptional.ifPresent(attractionEntity -> {

                // Parse the date using the formatter
                LocalDate date = LocalDate.parse(dateString, formatter);

                // Convert the dayBusyness list to a JSON string
                String predictionString = dayBusyness.toString();

                // Save each TripAttraction
                TripAttraction tripAttraction = new TripAttraction();
                tripAttraction.setTripId(tripId); // Use the provided tripId
                tripAttraction.setAttractionId(attractionEntity.getAttractionId());
                tripAttraction.setDate(date);
                tripAttraction.setTime(LocalTime.parse(visitTime));
                tripAttraction.setPrediction(predictionString);
                newTripAttractions.add(tripAttraction);
            });
        }

        // Save new trip attractions
        tripAttractionRepository.saveAll(newTripAttractions);

        return new ResponseEntity<>("Trip attractions updated successfully.", HttpStatus.OK);
    }


    @GetMapping("/tripAttraction/{username}/{tripId}")
    public ResponseEntity<List<TripAttraction>> getTripAttractions(@PathVariable String username, @PathVariable Integer tripId) {
        // Fetch the trip from the repository
        Optional<Trip> tripOptional = tripRepository.findByTripIdAndUsername(tripId, username);

        // Return an error if the trip could not be found
        if (!tripOptional.isPresent()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        // Fetch the TripAttraction objects
        List<TripAttraction> tripAttractions = tripAttractionRepository.findByTripId(tripId);

        return new ResponseEntity<>(tripAttractions, HttpStatus.OK);
    }

    @DeleteMapping("/removeAttraction/{username}/{tripId}/{attractionId}")
    public ResponseEntity<String> removeAttractionFromTrip(@PathVariable String username, @PathVariable Integer tripId, @PathVariable Integer attractionId) {
        // Fetch the trip and attraction from the repositories
        Optional<Trip> tripOptional = tripRepository.findByTripIdAndUsername(tripId, username);
        Optional<Attraction> attractionOptional = attractionRepository.findById(attractionId);

        // Return an error if the trip or attraction could not be found
        if (!tripOptional.isPresent()) {
            return new ResponseEntity<>("Trip not found or you don't have permission to modify this trip.", HttpStatus.NOT_FOUND);
        }
        if (!attractionOptional.isPresent()) {
            return new ResponseEntity<>("Attraction not found.", HttpStatus.NOT_FOUND);
        }

        // Find the TripAttraction object and delete it
        Optional<TripAttraction> tripAttractionOptional = tripAttractionRepository.findByTripIdAndAttractionId(tripId, attractionId);
        if (!tripAttractionOptional.isPresent()) {
            return new ResponseEntity<>("Attraction not found in this trip.", HttpStatus.NOT_FOUND);
        }

        tripAttractionRepository.delete(tripAttractionOptional.get());

        return new ResponseEntity<>("Attraction removed from trip successfully.", HttpStatus.OK);
    }

    @PostMapping("addAttraction/{username}/{tripId}/attraction/")
    public ResponseEntity<String> addAttractionToTrip(@PathVariable Integer tripId,
                                                      @PathVariable String username,
                                                      @RequestBody List<TripAttractionDTO> tripAttractionDTOs) {
        // Fetch the trip from the repository
        Optional<Trip> tripOptional = tripRepository.findByTripIdAndUsername(tripId, username);


        // Return an error if the trip could not be found
        if (!tripOptional.isPresent()) {
            return new ResponseEntity<>("Trip not found.", HttpStatus.NOT_FOUND);
        }

        for (TripAttractionDTO tripAttractionDTO : tripAttractionDTOs) {
            // Check if the attraction exists
            Optional<Attraction> attractionOptional = attractionRepository.findById(tripAttractionDTO.getAttractionId());
            if (!attractionOptional.isPresent()) {
                return new ResponseEntity<>("Attraction not found.", HttpStatus.NOT_FOUND);
            }

            // Create a new TripAttraction object and save it to the repository
            TripAttraction tripAttraction = new TripAttraction();
            tripAttraction.setTripId(tripId);
            tripAttraction.setAttractionId(tripAttractionDTO.getAttractionId());
            tripAttraction.setDate(tripAttractionDTO.getDate());
            tripAttraction.setTime(tripAttractionDTO.getTime());

            // Convert dayBusyness list to a comma-separated string and set it as prediction
            String prediction = tripAttractionDTO.getDayBusyness().stream()
                    .map(Object::toString)
                    .collect(Collectors.joining(","));
            tripAttraction.setPrediction(prediction);

            tripAttractionRepository.save(tripAttraction);
        }

        return new ResponseEntity<>("Attractions added to trip successfully.", HttpStatus.OK);
    }

}



