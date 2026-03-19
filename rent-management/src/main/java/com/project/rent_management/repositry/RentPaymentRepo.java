package com.project.rent_management.repositry;

import com.project.rent_management.module.RentPayment;
import com.project.rent_management.module.Rental;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentPaymentRepo extends JpaRepository<RentPayment, Long> {

    List<RentPayment> findByRental(Rental rental);

    List<RentPayment> findByRentalAndMonthAndYear(Rental rental, Integer month, Integer year);

    boolean existsByRentalIdAndMonthAndYear(Long rentalId, Integer month, Integer year);

    List<RentPayment> findByRentalIdOrderByYearDescMonthDesc(Long rentalId);
}
