package com.project.rent_management.dto;

import lombok.Data;

@Data


public class LoginResponse {
    private int userId;
    private String name;
    private String email;
    private String token="";
    private String role="";
    private String kycStatus="";
    private int ownerId;
    private int renterId;
}
