package com.project.rent_management.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RentalDTO {
    private Long rentalId;
    private Integer propertyId;
    private String propertyName;
    private String ownerName;

    private Double rentAmount;
    private String propertyImage;
    public RentalDTO(
            Long rentalId,
            Integer propertyId,
            String propertyName,
            String ownerName,
            Double rentAmount
    ){
        this.rentalId=rentalId;
        this.propertyId=propertyId;
        this.propertyName=propertyName;
        this.ownerName=ownerName;
        this.rentAmount=rentAmount;
    }
}
