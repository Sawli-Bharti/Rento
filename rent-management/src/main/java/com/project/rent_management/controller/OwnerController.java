package com.project.rent_management.controller;

import com.project.rent_management.dto.OwnerProfileResponse;
import com.project.rent_management.dto.UserKycDTO;
import com.project.rent_management.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/owner")
public class OwnerController {
    @Autowired
    OwnerService ownerService;
    @GetMapping("/")
    public String hello(){
        return "hello renter controller here";
    }



    @GetMapping("/get/{id}")
    public ResponseEntity<OwnerProfileResponse> getOwnerById(@PathVariable int id){
        return ownerService.getOwnerById(id);
    }

    @PreAuthorize("hasRole('OWNER')")
    @PostMapping("/kyc")
    public ResponseEntity<?> uploadKYCDoc(@RequestParam(required = true) Integer ownerId,

                                          @RequestPart("kycDetails")UserKycDTO kycDetails,
                                          @RequestPart("selfie") MultipartFile selfie,
                                          @RequestPart("idFront") MultipartFile idFront,
                                          @RequestPart(value = "idBack",required = false) MultipartFile idBack

                                          ){
        return ownerService.uploadKYCDoc(ownerId,kycDetails,selfie,idFront,idBack);
    }


}
