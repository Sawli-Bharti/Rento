package com.project.rent_management.module;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.rent_management.enums.PropertyStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private int rent;
    private Double securityDeposit;
    private String name;
    private String locality;
    private String area;
    private String description;
    private String city;
    private String state;
    private String address;
    private String propertyType;
    private String furnished;
//    NOT_REQUIRED / PENDING / APPROVED / REJECTED
    private String kycStatus;
//    RENT / SELL
    private String propetyFor;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private PropertyStatus propertyStatus = PropertyStatus.AVAILABLE;


    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonBackReference("owner_property")
    private OwnerDetails owner;

    @OneToMany(
            mappedBy = "property",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )

    @JsonManagedReference("property_image")
    private List<PropertyImage> images = new ArrayList<>();

}
