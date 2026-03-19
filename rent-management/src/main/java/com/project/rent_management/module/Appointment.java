package com.project.rent_management.module;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.project.rent_management.module.Property;
import com.project.rent_management.module.RenterDetails;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate visitDate;

    // PENDING | ACCEPTED | REJECTED | CANCELLED
    @Column(nullable = false)
    private String status = "PENDING";

    private String ownerNote;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /* ---------------- RELATIONS ---------------- */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    @JsonBackReference
    private Property property;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "renter_id", nullable = false)
    private RenterDetails renter;

    /* ---------------- LIFECYCLE ---------------- */

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}