package com.project.rent_management.dto;

import com.project.rent_management.module.RenterDetails;
import com.project.rent_management.module.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RenterProfileResponse {
    private int renterId;
    private String name;
    private String email;
    private String gender;
    private String state;
    private String mobileNo;
    public RenterProfileResponse(User u, RenterDetails rd){
        this.name=rd.getName();
        this.gender= rd.getGender();
        this.state=rd.getState();
        this.email= u.getEmail();
        this.mobileNo= u.getMobileNo();
        this.renterId= rd.getId();
    }
}
