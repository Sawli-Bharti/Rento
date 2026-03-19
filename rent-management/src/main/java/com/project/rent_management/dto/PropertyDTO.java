package com.project.rent_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyDTO {
    private int id;
    private int rent;
    private double securityMoney;
    private String name;
    private String locality;
    private String area;
    private String description;
    private String city;
    private String state;
    private String address;
    private String propertyType;
    private String furnished;
    private List<String> imageUrls;
}
