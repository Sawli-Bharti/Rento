package com.project.rent_management.dto;

import lombok.Data;

@Data
public class NewRegisterRequest {
    private String name;
    private String email;
    private String password;
    private String mobileNo;

    private String role;

}
