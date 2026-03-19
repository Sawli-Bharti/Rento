package com.project.rent_management.module;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "owner_kyc_image")
public class OwnerKYCImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private String imageUrl;
    private String publicId; // Cloudinary image ID

//    selfie| idFront| idBack
    private String name;





    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    @JsonBackReference("owner_kyc")
    private OwnerDetails ownerDetails;
}
