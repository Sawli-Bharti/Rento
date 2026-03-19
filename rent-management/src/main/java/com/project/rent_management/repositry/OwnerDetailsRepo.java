package com.project.rent_management.repositry;

import com.project.rent_management.module.OwnerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OwnerDetailsRepo extends JpaRepository<OwnerDetails,Integer> {
    @Query("select o from OwnerDetails o where o.user.id=:userId")
    OwnerDetails findByUserId(int userId);

    @Query("select o from OwnerDetails o where o.kycStatus=:kycStatus ORDER  by o.kycSubmittedAt ASC")
    List<OwnerDetails> findByKycStatus(String kycStatus);
}
