package com.project.rent_management.dto;

import lombok.Data;

@Data
public class DashboardDTO {
    //for admin specific dashboard
    private long totalUsers;
    private long totalOwners;
    private long totalRenters;
    private long totalPendingKyc;



    private long totalProperties;
    private long totalFlats;
    private long totalAppartments;

    private int totalAppointments;
    private int totalBookings;
    private int totalSavedProperties;
    private int totalPendingAppointments;





}
