package com.project.rent_management.repositry;

import com.project.rent_management.module.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepo extends JpaRepository<Property,Integer> {
    @Query("""
        SELECT p FROM Property p
        WHERE
            (
                LOWER(p.city) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(p.locality) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(p.propertyType) LIKE LOWER(CONCAT('%', :query, '%'))
            )
        AND (:minRent IS NULL OR p.rent >= :minRent)
        AND (:maxRent IS NULL OR p.rent <= :maxRent)
        AND (:furnished IS NULL OR p.furnished = :furnished)
        AND (:type IS NULL OR p.propertyType = :type)
        """)
    List<Property> searchProperties(
            @Param("query") String query,
            @Param("minRent") Integer minRent,
            @Param("maxRent") Integer maxRent,
            @Param("furnished") String furnished,
            @Param("type") String type
    );

    @Query("select p from Property p where p.owner.id=:ownerId")
    List<Property> findByOwnerId(int ownerId);
}
