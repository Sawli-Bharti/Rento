package com.project.rent_management.controller;

import com.project.rent_management.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    /* -------- TENANT SEND BOOKING REQUEST -------- */
    @PostMapping("/request")
    public ResponseEntity<?> createBooking(
            @RequestParam Integer propertyId,
            @RequestParam Integer renterId
    ){
        return bookingService.createBooking(propertyId, renterId);
    }

    /* -------- OWNER APPROVE BOOKING -------- */
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('OWNER','ADMIN')")
    public ResponseEntity<?> approveBooking(@PathVariable Long id){
        return bookingService.approveBooking(id);
    }

    /* -------- OWNER REJECT BOOKING -------- */
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasAnyRole('OWNER','ADMIN')")
    public ResponseEntity<?> rejectBooking(@PathVariable Long id){
        return bookingService.rejectBooking(id);
    }

    /* -------- TENANT CONFIRM BOOKING (PAY DEPOSIT) -------- */
    @PreAuthorize("hasRole('RENTER')")
    @PutMapping("/{id}/confirm")
    public ResponseEntity<?> confirmBooking(
            @PathVariable Long id,
            @RequestParam String paymentId
    ){
        return bookingService.confirmBooking(id, paymentId);
    }

    /* -------- TENANT CANCEL BOOKING -------- */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id){
        return bookingService.cancelBooking(id);
    }

    /* -------- RENTER BOOKINGS -------- */
    @GetMapping("/renter/{renterId}")
    public ResponseEntity<?> getBookingsForRenter(@PathVariable Integer renterId){
        return bookingService.getBookingsForRenter(renterId);
    }

    /* -------- OWNER BOOKINGS -------- */
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<?> getBookingsForOwner(@PathVariable Integer ownerId){
        return bookingService.getBookingsForOwner(ownerId);
    }
}