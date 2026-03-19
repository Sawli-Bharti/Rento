package com.project.rent_management.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserKycDTO {
    private int id;
    private String fullName;
    private String email;
    private String idType;
    private String idNumber;
    private String selfieUrl;
    private String idFrontUrl;
    private String idBackUrl;
    private LocalDateTime submittedAt;

}
