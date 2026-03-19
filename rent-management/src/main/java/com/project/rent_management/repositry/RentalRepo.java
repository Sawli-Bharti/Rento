package com.project.rent_management.repositry;

import com.project.rent_management.dto.RentalDTO;
import com.project.rent_management.module.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepo extends JpaRepository<Rental, Long> {
    @Query("""
            SELECT new com.project.rent_management.dto.RentalDTO(
                rental.id,
                p.id,
                p.name,
                o.fullName,
                b.rentAmount
            )
            FROM Rental rental
            JOIN rental.booking b
            JOIN b.property p
            JOIN p.owner o
            JOIN b.renter r
            WHERE r.id = :renterId
            """)
    List<RentalDTO> findByBookingRenterId(Integer renterId);

    List<Rental> findByBookingPropertyOwnerId(Integer ownerId);
    Rental findByBookingId(Long bookingId);


}
