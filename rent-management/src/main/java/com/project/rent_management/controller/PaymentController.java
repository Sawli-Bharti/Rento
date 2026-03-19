package com.project.rent_management.controller;

import com.project.rent_management.service.PaymentService;

import com.razorpay.Order;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private static final Logger log = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    private PaymentService paymentService;


    /* ---------------- BOOKING DEPOSIT ORDER ---------------- */

    @PostMapping(value="/create-order",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> confirmCreateOrder(
            @RequestParam double amount,
            @RequestParam Long bookingId) {

        try {

            log.info("API called: create booking order. BookingId: {}", bookingId);

            Order order = paymentService.confirmCreateOrder(amount, bookingId);

            log.info("Booking order created successfully");

            return ResponseEntity.ok(new JSONObject(order.toString()).toMap());

        } catch (Exception e) {

            log.error("Error creating booking order: {}", e.getMessage(), e);

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    /* ---------------- RENT PAYMENT ORDER ---------------- */

    @PostMapping(value="/create-rent-order",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createRentOrder(@RequestParam Long rentalId) {

        try {

            log.info("API called: create rent order. RentalId: {}", rentalId);

            Order order = paymentService.createRentOrder(rentalId);

            log.info("Rent order created successfully");

            return ResponseEntity.ok(new JSONObject(order.toString()).toMap());

        } catch (Exception e) {

            log.error("Error creating rent order: {}", e.getMessage(), e);

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    /* ---------------- VERIFY PAYMENT ---------------- */

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(
            @RequestParam String orderId,
            @RequestParam String paymentId,
            @RequestParam String signature) {

        try {

            log.info("API called: verify payment. PaymentId: {}", paymentId);

            boolean isValid = paymentService.verifyPayment(orderId, paymentId, signature);

            if (isValid) {

                log.info("Payment verification successful");

                return ResponseEntity.ok("Payment verified successfully");

            } else {

                log.error("Payment verification failed");

                return ResponseEntity.badRequest().body("Payment verification failed");
            }

        } catch (Exception e) {

            log.error("Error verifying payment: {}", e.getMessage(), e);

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}