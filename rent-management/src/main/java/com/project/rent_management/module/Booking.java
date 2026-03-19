package com.project.rent_management.module;

import com.project.rent_management.enums.BookingStatus;
import com.project.rent_management.enums.LeaseType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    @ManyToOne
    @JoinColumn(name = "renter_id")
    private RenterDetails renter;

    private LocalDate moveInDate;

    private Double rentAmount;

    private Double depositAmount;

    @Enumerated(EnumType.STRING)
    private LeaseType leaseType;

    private Integer leaseDurationMonths;

    private LocalDate createdAt;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.REQUESTED;

    private String paymentId;

    @PrePersist
    public void beforeSave() {
        this.createdAt = LocalDate.now();
    }
}