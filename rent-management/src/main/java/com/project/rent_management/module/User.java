package com.project.rent_management.module;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;


    private String email;
    private String password;
    private String mobileNo;
    private LocalDateTime time;
    private String role="ROLE_RENTER";
    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonBackReference("user_owner")
    private OwnerDetails ownerDetails;
    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonBackReference("user_renter")
    private RenterDetails renterDetails;
}
