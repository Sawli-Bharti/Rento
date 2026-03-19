package com.project.rent_management.module;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "owner_details")
public class OwnerDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String kycStatus="NOT_SUBMITTED";
    private String fullName;
    private String state;
    private String pinCode;

    private String idNumber;
    private String idType;
    // When owner submitted KYC
    private LocalDateTime kycSubmittedAt;

    // When admin reviewed KYC
    private LocalDateTime kycReviewedAt;

    // Which admin reviewed it
    private int reviewedByAdminId;

    // Reason if rejected
    private String kycRejectionReason;

    // Optional admin notes
    private String kycAdminNote;


    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    @JsonManagedReference("user_owner")
    private User user;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("owner_property")
    private List<Property> properties;

    @OneToMany(mappedBy = "ownerDetails", cascade = CascadeType.ALL)
    @JsonManagedReference("owner_kyc")
    private List<OwnerKYCImage> kycImages;







}
