package com.project.rent_management.service;

import com.project.rent_management.enums.BookingStatus;
import com.project.rent_management.module.Booking;
import com.project.rent_management.module.Rental;
import com.project.rent_management.repositry.BookingRepo;
import com.project.rent_management.repositry.RentalRepo;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;

import org.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private RentalRepo rentalRepo;

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;


    /* ---------------- CREATE GENERIC ORDER ---------------- */

    public Order createOrder(double amount) throws Exception {

        log.info("Creating Razorpay order for amount: {}", amount);

        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        options.put("amount", (int)(amount * 100));
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        log.info("Order options prepared: {}", options);

        Order order = client.orders.create(options);

        log.info("Razorpay order created successfully: {}", order);

        return order;
    }


    /* ---------------- BOOKING DEPOSIT PAYMENT ---------------- */

    public Order confirmCreateOrder(double amount, Long bookingId) {

        try {

            log.info("Starting booking payment order creation. BookingId: {}", bookingId);

            Booking booking = bookingRepo.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            log.info("Booking found with status: {}", booking.getStatus());

            if (booking.getStatus() != BookingStatus.APPROVED) {

                log.error("Booking not approved. Current status: {}", booking.getStatus());

                throw new RuntimeException("Booking not approved yet");
            }

            log.info("Booking approved. Creating payment order...");

            return createOrder(amount);

        } catch (Exception e) {

            log.error("Error while creating booking payment order: {}", e.getMessage(), e);

            throw new RuntimeException("Booking payment order failed: " + e.getMessage());
        }
    }


    /* ---------------- RENT PAYMENT ORDER ---------------- */

    public Order createRentOrder(Long rentalId) throws Exception {

        log.info("Creating rent payment order. RentalId: {}", rentalId);

        Rental rental = rentalRepo.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        double amount = rental.getRentAmount();

        log.info("Rental found. Monthly rent amount: {}", amount);

        return createOrder(amount);
    }


    /* ---------------- VERIFY PAYMENT ---------------- */

    public boolean verifyPayment(String orderId, String paymentId, String signature) throws Exception {

        log.info("Starting payment verification");

        log.info("OrderId: {}", orderId);
        log.info("PaymentId: {}", paymentId);

        JSONObject attributes = new JSONObject();

        attributes.put("razorpay_order_id", orderId);
        attributes.put("razorpay_payment_id", paymentId);
        attributes.put("razorpay_signature", signature);

        boolean result = Utils.verifyPaymentSignature(attributes, keySecret);

        if (result) {
            log.info("Payment verification SUCCESS for paymentId: {}", paymentId);
        } else {
            log.error("Payment verification FAILED for paymentId: {}", paymentId);
        }

        return result;
    }
}