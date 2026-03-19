package com.project.rent_management.dto;

import com.project.rent_management.module.OwnerDetails;
import com.project.rent_management.module.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OwnerProfileResponse {
    private int ownerId;
    private String name;
    private String email;

    private String state;
    private String mobileNo;
    private String idType;
    private String idNumber;
    public OwnerProfileResponse(User u, OwnerDetails od){
        this.name= od.getFullName();
        this.state= od.getState();
        this.idType= od.getIdType();
        this.idNumber= od.getIdNumber();
        this.mobileNo=u.getMobileNo();
        this.email=u.getEmail();
        this.ownerId=od.getId();

    }
}
