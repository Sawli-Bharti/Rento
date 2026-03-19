package com.project.rent_management.dto;



import lombok.Data;
import java.time.LocalDate;

@Data
public class AppointmentDTO {

    private Long id;
    private String propertyTitle;
    private String renterName;
    private String ownerName;
    private LocalDate visitDate;
    private String status;
    private String ownerNote;
}