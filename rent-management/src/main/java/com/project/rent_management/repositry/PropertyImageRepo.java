package com.project.rent_management.repositry;

import com.project.rent_management.module.Property;
import com.project.rent_management.module.PropertyImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyImageRepo extends JpaRepository<PropertyImage,Integer> {

    int countByPropertyId(int propertyId);
}
