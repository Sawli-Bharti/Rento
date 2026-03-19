package com.project.rent_management.dto;

import lombok.Data;

import java.util.List;

@Data
public class OwnerAppointmentResponse {
    private List<AppointmentDTO> pending;
    private List<AppointmentDTO> accepted;
}
