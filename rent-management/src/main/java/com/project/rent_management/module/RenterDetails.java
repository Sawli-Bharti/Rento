package com.project.rent_management.module;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "renter_details")
public class RenterDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String kycStatus="NOT_SUBMITTED";
    private String name;
    private String gender;
    private String state;
    private String pinCode;


    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    @JsonManagedReference("user_renter")
    private User user;
}
