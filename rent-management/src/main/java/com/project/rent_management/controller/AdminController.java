package com.project.rent_management.controller;

import com.project.rent_management.dto.UserKycDTO;
import com.project.rent_management.dto.UserListDTO;
import com.project.rent_management.module.RenterDetails;
import com.project.rent_management.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(){
        return adminService.getDashboard();
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<UserListDTO>> getAllUsers(){
        return adminService.getAllUsers();
    }

    @GetMapping("/allRenters")
    public ResponseEntity<List<RenterDetails>> getAllRenters(){
        return adminService.getAllRenters();
    }

//    getting all ownr kyc regeust which has kycstatus=pending
    @GetMapping("/pending/owner-kyc")
    public ResponseEntity<List<UserKycDTO>> getAllPendingOwners(){
        return adminService.getAllPendingOwners();
    }

//    Approve owner
    @PutMapping("/owner-kyc/approved/{ownerId}")
    public ResponseEntity<String> approveOwnerKycStatus(@PathVariable int ownerId){
        return adminService.approveOwnerKycStatus(ownerId);
    }

//    reject owner kyc request
    @PutMapping("/owner-kyc/rejected")
    public ResponseEntity<?> rejectOwnerKycStatus(@RequestParam Integer ownerId,
                                                  @RequestParam String reason,
                                                  @RequestParam String note){
        return adminService.rejectOwnerKycStatus(ownerId,reason,note);
    }

//    admin getting user kyc
    @GetMapping("/user-kyc/{ownerId}")
    public ResponseEntity<UserKycDTO> getKycDetailsOfOwner(@PathVariable int ownerId){
        return adminService.getKycDetailsOfOwner(ownerId);
    }





}
