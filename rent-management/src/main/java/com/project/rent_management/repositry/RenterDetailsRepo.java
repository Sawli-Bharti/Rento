package com.project.rent_management.repositry;

import com.project.rent_management.module.RenterDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RenterDetailsRepo extends JpaRepository<RenterDetails,Integer> {
    @Query("select r from RenterDetails r where r.user.id=:userId")
    RenterDetails findByUserId(int userId);

}
