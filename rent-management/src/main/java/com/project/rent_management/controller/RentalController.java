package com.project.rent_management.controller;

import com.project.rent_management.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    /* -------- START RENTAL AFTER BOOKING CONFIRMED -------- */
    @PostMapping("/start")
    public ResponseEntity<?> startRental(
            @RequestParam Long bookingId,
            @RequestParam(required = false) Integer leaseMonths
    ){
        return rentalService.startRental(bookingId, leaseMonths);
    }

    /* -------- GET RENTALS FOR RENTER -------- */
    @GetMapping("/renter/{renterId}")
    public ResponseEntity<?> getRentalsForRenter(@PathVariable Integer renterId){
        return rentalService.getRentalsForRenter(renterId);
    }

    /* -------- GET RENTALS FOR OWNER -------- */
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<?> getRentalsForOwner(@PathVariable Integer ownerId){
        return rentalService.getRentalsForOwner(ownerId);
    }
}