package com.project.rent_management.controller;

import com.project.rent_management.service.RentPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rent-payments")
public class RentPaymentController {

    @Autowired
    private RentPaymentService rentPaymentService;

    /* -------- PAY RENT -------- */
    @PostMapping("/pay")
    public ResponseEntity<?> payRent(
            @RequestParam Long rentalId,
            @RequestParam Integer month,
            @RequestParam Integer year,
            @RequestParam String paymentId
    ){
        return rentPaymentService.payRent(rentalId, month, year, paymentId);
    }

    /* -------- RENT HISTORY -------- */
    @GetMapping("/history/{rentalId}")
    public ResponseEntity<?> getRentHistory(@PathVariable Long rentalId){
        return rentPaymentService.getRentHistory(rentalId);
    }
}