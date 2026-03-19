package com.project.rent_management.repositry;

import com.project.rent_management.module.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment,Long> {

    /* OWNER APPOINTMENTS */

    @Query("""
    select a from Appointment a
    where a.property.owner.id = :ownerId
    order by a.createdAt desc
    """)
    List<Appointment> findByOwnerIdOrderByCreatedAtDesc(int ownerId);


    @Query("""
    select a from Appointment a
    where a.property.owner.id = :ownerId
    and a.status = :status
    """)
    List<Appointment> findByOwnerIdAndStatus(int ownerId,String status);


    /* RENTER APPOINTMENTS */

    List<Appointment> findByRenterIdOrderByCreatedAtDesc(int renterId);


    /* PROPERTY APPOINTMENTS */

    List<Appointment> findByPropertyId(Long propertyId);


    /* DASHBOARD COUNTS */

    @Query("""
    select count(a) from Appointment a
    where a.renter.id = :renterId
    """)
    int countByRenterId(int renterId);


    @Query("""
    select count(a) from Appointment a
    where a.renter.id = :renterId
    and a.status = :status
    """)
    int countByRenterIdAndStatus(int renterId,String status);


    @Query("""
    select count(a) from Appointment a
    where a.property.owner.id = :ownerId
    """)
    int countByOwnerId(int ownerId);


    boolean existsByPropertyIdAndRenterIdAndStatus(
            Long propertyId,
            int renterId,
            String status
    );


}
