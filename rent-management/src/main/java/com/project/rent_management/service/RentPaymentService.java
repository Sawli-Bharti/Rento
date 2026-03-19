package com.project.rent_management.service;

import com.project.rent_management.enums.PaymentStatus;
import com.project.rent_management.module.RentPayment;
import com.project.rent_management.module.Rental;
import com.project.rent_management.repositry.RentPaymentRepo;
import com.project.rent_management.repositry.RentalRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class RentPaymentService {

    @Autowired
    private RentPaymentRepo rentPaymentRepo;

    @Autowired
    private RentalRepo rentalRepo;

    /* ---------------- PAY RENT ---------------- */
    public ResponseEntity<?> payRent(
            Long rentalId,
            Integer month,
            Integer year,
            String paymentId
    ){

        Rental rental = rentalRepo.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        if(rentPaymentRepo.existsByRentalIdAndMonthAndYear(rentalId,month,year)){
            return ResponseEntity.badRequest().body("Rent already paid for this month");
        }

        RentPayment rentPayment = new RentPayment();

        rentPayment.setRental(rental);
        rentPayment.setMonth(month);
        rentPayment.setYear(year);

        rentPayment.setAmount(rental.getRentAmount());
        rentPayment.setPaymentStatus(PaymentStatus.SUCCESS);
        rentPayment.setPaymentDate(LocalDate.now());
        rentPayment.setPaymentId(paymentId);

        rentPaymentRepo.save(rentPayment);

        return ResponseEntity.ok("Rent paid successfully");
    }

    public ResponseEntity<?> recordDeposit(Long rentalId, String paymentId) {
        Rental rental = rentalRepo.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        if(rentPaymentRepo.existsByRentalIdAndMonthAndYear(rentalId, 0, 0)){
            return ResponseEntity.badRequest().body("Deposit already recorded");
        }

        RentPayment rentPayment = new RentPayment();
        rentPayment.setRental(rental);
        rentPayment.setMonth(0);
        rentPayment.setYear(0);
        rentPayment.setAmount(rental.getDepositAmount());
        rentPayment.setPaymentStatus(PaymentStatus.SUCCESS);
        rentPayment.setPaymentDate(LocalDate.now());
        rentPayment.setPaymentId(paymentId);

        rentPaymentRepo.save(rentPayment);

        return ResponseEntity.ok("Deposit recorded successfully");
    }

    public ResponseEntity<?> getRentHistory(Long rentalId) {

        try{

            if(!rentalRepo.existsById(rentalId)){
                return ResponseEntity.badRequest().body("Rental not found");
            }

            return ResponseEntity.ok(
                    rentPaymentRepo.findByRentalIdOrderByYearDescMonthDesc(rentalId)
            );

        }catch(Exception e){

            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body("Error fetching rent history");
        }
    }
}