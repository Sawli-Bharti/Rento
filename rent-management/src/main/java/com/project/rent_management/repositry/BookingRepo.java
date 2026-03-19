package com.project.rent_management.repositry;

import com.project.rent_management.dto.BookingDTO;
import com.project.rent_management.module.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BookingRepo extends JpaRepository<Booking,Long> {
    @Query("""
    select b from Booking b
    where b.renter.id = :renterId
""")
    List<Booking> findByRenterId(int renterId);

    @Query("""
    select b from Booking b
    where b.property.owner.id = :ownerId
""")
    List<Booking> findByOwnerId(int ownerId);

    boolean existsByPropertyIdAndStatus(int propertyId, String status);

    @Query("""
    select count(b) from Booking b
    where b.renter.id = :renterId
""")
    int countByRenterId(int renterId);

    @Query("""
    select count(b) from Booking b
    where b.renter.id = :renterId
    and b.status = :status
""")
    int countByRenterIdAndStatus(int renterId, String status);

    @Query("""
    select count(b)
    from Booking b
    where b.property.owner.id = :ownerId
""")
    int countBookingsByOwnerId(int ownerId);

    @Query("""
    select count(b)
    from Booking b
    where b.property.owner.id = :ownerId
    and b.status = :status
""")
    int countBookingsByOwnerIdAndStatus(
             int ownerId,
            String status
    );

//    using jpql projection to fetch dto
    @Query("""
    SELECT new com.project.rent_management.dto.BookingDTO(
        b.id,
        p.id,
        r.id,
        p.name,
        o.fullName,
        r.name,
        b.rentAmount,
        b.depositAmount,
        b.status,
        b.paymentId
    )
    FROM Booking b
    JOIN b.property p
    JOIN p.owner o
    JOIN b.renter r
    WHERE o.id = :ownerId
    """)
    List<BookingDTO> findBookingsForOwner(int ownerId);

    @Query("""
    SELECT new com.project.rent_management.dto.BookingDTO(
        b.id,
        p.id,
        r.id,
        p.name,
        o.fullName,
        r.name,
        b.rentAmount,
        b.depositAmount,
        b.status,
        b.paymentId
    )
    FROM Booking b
    JOIN b.property p
    JOIN p.owner o
    JOIN b.renter r
    WHERE r.id = :renterId
    """)
    List<BookingDTO> findBookingsForRenter(int renterId);

}
