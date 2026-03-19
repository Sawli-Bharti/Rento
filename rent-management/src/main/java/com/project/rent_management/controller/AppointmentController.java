package com.project.rent_management.controller;

import com.project.rent_management.module.User;
import com.project.rent_management.repositry.OwnerDetailsRepo;
import com.project.rent_management.repositry.RenterDetailsRepo;
import com.project.rent_management.repositry.UserRepo;
import com.project.rent_management.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private OwnerDetailsRepo ownerRepo;
    @Autowired
    private RenterDetailsRepo renterRepo;
    @Autowired
    UserRepo userRepo;
    /* RENTER → CREATE */
    @PostMapping("/create")
    public ResponseEntity<?> create(
            @RequestParam Integer propertyId,
            @RequestParam Integer renterId,
            @RequestParam String visitDate
    ) {
        return appointmentService.createAppointment(
                propertyId,
                renterId,
                LocalDate.parse(visitDate)
        );
    }

    /* OWNER → VIEW APPOINTMENT */
    @GetMapping("/owner")
    public ResponseEntity<?> getOwnerAppointments(Authentication auth){

        String email = (String) auth.getPrincipal();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int ownerId = user.getOwnerDetails().getId();

        return appointmentService.getOwnerAppointments(ownerId);
    }

    /* OWNER → ACCEPT */
    @PutMapping("/owner/accept/{appointmentId}")
    public ResponseEntity<?> accept(@PathVariable Long appointmentId) {
        return appointmentService.acceptAppointment(appointmentId);
    }

    /* OWNER → REJECT */
    @PutMapping("/owner/reject/{appointmentId}")
    public ResponseEntity<?> reject(
            @PathVariable Long appointmentId,
            @RequestBody String note
    ) {
        return appointmentService.rejectAppointment(appointmentId, note);
    }

//    renter cancel appointement
    @DeleteMapping("/renter/cancel/{appointmentId}")
    public ResponseEntity<?> cancel(
            @PathVariable Long appointmentId

    ){
        return appointmentService.cancelAppointment(appointmentId);
    }
    /* RENTER → VIEW */
    @GetMapping("/renter")
    public ResponseEntity<?> renterAppointments(Authentication authentication){

        String email = (String) authentication.getPrincipal();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int renterId = user.getRenterDetails().getId();

        return appointmentService.getAppointmentsForRenter(renterId);
    }
}

