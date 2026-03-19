package com.project.rent_management.service;

import com.project.rent_management.dto.BookingDTO;
import com.project.rent_management.enums.BookingStatus;
import com.project.rent_management.enums.PropertyStatus;
import com.project.rent_management.module.Booking;
import com.project.rent_management.module.Property;
import com.project.rent_management.module.RenterDetails;
import com.project.rent_management.module.Rental;
import com.project.rent_management.repositry.BookingRepo;
import com.project.rent_management.repositry.PropertyRepo;
import com.project.rent_management.repositry.RenterDetailsRepo;
import com.project.rent_management.service.RentalService;
import com.project.rent_management.service.RentPaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private PropertyRepo propertyRepo;

    @Autowired
    private RenterDetailsRepo renterRepo;

    @Autowired
    private RentalService rentalService;

    @Autowired
    private RentPaymentService rentPaymentService;

    /* ---------------- CREATE BOOKING REQUEST ---------------- */
    public ResponseEntity<?> createBooking(Integer propertyId, Integer renterId) {

        Property property = propertyRepo.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if(property.getPropertyStatus() != PropertyStatus.AVAILABLE){
            return ResponseEntity.badRequest().body("Property not available");
        }

        RenterDetails renter = renterRepo.findById(renterId)
                .orElseThrow(() -> new RuntimeException("Renter not found"));

        Booking booking = new Booking();

        booking.setProperty(property);
        booking.setRenter(renter);
        booking.setCreatedAt(LocalDate.now());
        booking.setDepositAmount(property.getSecurityDeposit());
        booking.setRentAmount((double) property.getRent());
        booking.setStatus(BookingStatus.REQUESTED);

        property.setPropertyStatus(PropertyStatus.BOOKING_REQUESTED);

        bookingRepo.save(booking);
        propertyRepo.save(property);


        return ResponseEntity.ok("Booking request sent");
    }

    /* ---------------- OWNER APPROVE BOOKING ---------------- */
    public ResponseEntity<?> approveBooking(Long bookingId){

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if(booking.getStatus() != BookingStatus.REQUESTED){
            return ResponseEntity.badRequest().body("Invalid booking state");
        }

        booking.setStatus(BookingStatus.APPROVED);

        bookingRepo.save(booking);

        return ResponseEntity.ok("Booking approved");
    }

    /* ---------------- OWNER REJECT BOOKING ---------------- */
    public ResponseEntity<?> rejectBooking(Long bookingId){

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.REJECTED);
        Property property = booking.getProperty();
        property.setPropertyStatus(PropertyStatus.AVAILABLE);

        propertyRepo.save(property);
        bookingRepo.save(booking);

        return ResponseEntity.ok("Booking rejected");
    }

    /* ---------------- TENANT CONFIRM BOOKING ---------------- */
    public ResponseEntity<?> confirmBooking(Long bookingId, String paymentId){

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if(booking.getStatus() != BookingStatus.APPROVED){
            return ResponseEntity.badRequest().body("Booking not approved yet");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setPaymentId(paymentId);

        Property property = booking.getProperty();
        property.setPropertyStatus(PropertyStatus.RENTED);

        propertyRepo.save(property);
        bookingRepo.save(booking);

        // Create rental record and record deposit payment
        try {
            Rental rental = rentalService.createOrGetRental(bookingId, booking.getLeaseDurationMonths());
            rentPaymentService.recordDeposit(rental.getId(), paymentId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to complete booking confirmation: " + e.getMessage());
        }

        return ResponseEntity.ok("Booking confirmed successfully");
    }

    /* ---------------- CANCEL BOOKING ---------------- */
    public ResponseEntity<?> cancelBooking(Long bookingId){

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if(booking.getStatus() == BookingStatus.CONFIRMED){
            return ResponseEntity.badRequest()
                    .body("Booking already confirmed. Cannot cancel.");
        }

        if(booking.getStatus() == BookingStatus.CANCELLED){
            return ResponseEntity.badRequest()
                    .body("Booking already cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);

        Property property = booking.getProperty();
        property.setPropertyStatus(PropertyStatus.AVAILABLE);

        propertyRepo.save(property);
        bookingRepo.save(booking);

        return ResponseEntity.ok("Booking cancelled successfully");
    }

    private BookingDTO  mapToDTO(Booking booking){

        BookingDTO dto = new BookingDTO();

        dto.setBookingId(booking.getId());

        dto.setPropertyId(booking.getProperty().getId());
        dto.setPropertyName(booking.getProperty().getName());
        dto.setPropertyCity(booking.getProperty().getCity());
        dto.setPropertyAddress(booking.getProperty().getAddress());

        dto.setRenterId(booking.getRenter().getId());
        dto.setRenterName(booking.getRenter().getName());

        dto.setOwnerId(booking.getProperty().getOwner().getId());
        dto.setOwnerName(booking.getProperty().getOwner().getFullName());

        dto.setRentAmount(booking.getRentAmount());
        dto.setDepositAmount(booking.getDepositAmount());

        dto.setLeaseType(booking.getLeaseType());
        dto.setLeaseDurationMonths(booking.getLeaseDurationMonths());

        dto.setMoveInDate(booking.getMoveInDate());

        dto.setStatus(booking.getStatus());

        dto.setCreatedAt(booking.getCreatedAt());
        dto.setPaymentId(booking.getPaymentId());

        return dto;
    }

    public ResponseEntity<?> getBookingsForRenter(Integer renterId){

        try{

            return ResponseEntity.ok(
                    bookingRepo.findBookingsForRenter(renterId)
            );

        } catch(Exception e){

            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body("Error fetching bookings");
        }
    }

    public ResponseEntity<?> getBookingsForOwner(Integer ownerId){

        try{

            return ResponseEntity.ok(
                    bookingRepo.findBookingsForOwner(ownerId)
            );

        } catch (Exception e){

            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body("Error fetching bookings");

        }
    }
}