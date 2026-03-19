package com.project.rent_management.dto;

import com.project.rent_management.enums.BookingStatus;
import com.project.rent_management.enums.LeaseType;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class BookingDTO {
    public BookingDTO(
            Long bookingId,
            Integer propertyId,
            Integer renterId,
            String propertyName,
            String ownerName,
            String renterName,
            Double rentAmount,
            Double depositAmount,
            BookingStatus status,
            String paymentId
    ) {
        this.bookingId = bookingId;
        this.propertyId = propertyId;
        this.renterId=renterId;
        this.propertyName = propertyName;
        this.ownerName = ownerName;
        this.renterName = renterName;
        this.rentAmount = rentAmount;
        this.depositAmount = depositAmount;
        this.status = status;
        this.paymentId = paymentId;
    }

    private Long bookingId;

    private Integer propertyId;
    private String propertyName;
    private String propertyCity;
    private String propertyAddress;

    private Integer renterId;
    private String renterName;

    private Integer ownerId;
    private String ownerName;

    private Double rentAmount;
    private Double depositAmount;

    private LeaseType leaseType;
    private Integer leaseDurationMonths;

    private LocalDate moveInDate;

    private BookingStatus status;

    private LocalDate createdAt;
    private String propertyImage;

    private String paymentId;
}