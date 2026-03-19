package com.project.rent_management.repositry;

import com.project.rent_management.module.OwnerKYCImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OwnerKycImageRepo extends JpaRepository<OwnerKYCImage,Integer> {

    @Query("select i from OwnerKYCImage i where i.ownerDetails.id = :ownerId")
    List<OwnerKYCImage> findAllByOwnerId(@Param("ownerId") int ownerId);

}
