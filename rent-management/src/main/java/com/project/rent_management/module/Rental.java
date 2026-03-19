package com.project.rent_management.module;

import com.project.rent_management.enums.LeaseType;
import com.project.rent_management.enums.RentalStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "rentals")
@Data
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL)
    private List<RentPayment> rentPayments;

    private Double rentAmount;

    private Double depositAmount;

    @Enumerated(EnumType.STRING)
    private LeaseType leaseType;

    private LocalDate leaseStartDate;

    private LocalDate leaseEndDate;

    private Integer noticePeriodDays;

    private Integer rentDueDay;

    @Enumerated(EnumType.STRING)
    private RentalStatus status;
}
