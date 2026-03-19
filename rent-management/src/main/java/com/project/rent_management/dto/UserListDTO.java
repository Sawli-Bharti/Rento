package com.project.rent_management.dto;

import lombok.Data;

@Data
public class UserListDTO {
    private int userId;
    private String email;
    private String name;
    private String role;
    private String status;

}
