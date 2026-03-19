package com.project.rent_management.service;

import com.project.rent_management.dto.RentalDTO;
import com.project.rent_management.enums.RentalStatus;
import com.project.rent_management.module.Booking;
import com.project.rent_management.module.Property;
import com.project.rent_management.module.Rental;
import com.project.rent_management.repositry.BookingRepo;
import com.project.rent_management.repositry.PropertyRepo;
import com.project.rent_management.repositry.RentalRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;
import java.time.LocalDate;



@Service
public class RentalService {

    @Autowired
    private RentalRepo rentalRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private PropertyRepo propertyRepo;

    /* ---------------- START RENTAL ---------------- */
    public ResponseEntity<?> startRental(Long bookingId, Integer leaseMonths) {

        Rental rental = createOrGetRental(bookingId, leaseMonths);
        return ResponseEntity.ok(rental);
    }

    public Rental createOrGetRental(Long bookingId, Integer leaseMonths) {

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if(!booking.getStatus().name().equals("CONFIRMED")){
            throw new RuntimeException("Booking not confirmed");
        }

        Rental existing = rentalRepo.findByBookingId(bookingId);
        if(existing != null){
            return existing;
        }

        Rental rental = new Rental();
        rental.setBooking(booking);
        rental.setRentAmount(booking.getRentAmount());
        rental.setDepositAmount(booking.getDepositAmount());

        rental.setLeaseStartDate(LocalDate.now());

        if(leaseMonths != null && leaseMonths > 0){
            rental.setLeaseEndDate(LocalDate.now().plusMonths(leaseMonths));
        }

        rental.setStatus(RentalStatus.ACTIVE);

        rentalRepo.save(rental);

        return rental;
    }

    /* ---------------- RENTER RENTALS ---------------- */
    public ResponseEntity<?> getRentalsForRenter(Integer renterId) {

        try{
            List<RentalDTO> rentals=rentalRepo.findByBookingRenterId(renterId);
            for (RentalDTO dto : rentals) {
                Property property = propertyRepo.findById(dto.getPropertyId()).get();
                dto.setPropertyImage(property.getImages().get(0).getImageUrl());
            }
            return  ResponseEntity.ok(rentals);

        }catch(Exception e){

            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body("Error fetching rentals");
        }
    }

    /* ---------------- OWNER RENTALS ---------------- */
    public ResponseEntity<?> getRentalsForOwner(Integer ownerId) {

        try{

            return ResponseEntity.ok(
                    rentalRepo.findByBookingPropertyOwnerId(ownerId)
            );

        }catch(Exception e){

            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body("Error fetching rentals");
        }
    }
}