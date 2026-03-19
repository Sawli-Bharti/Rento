package com.project.rent_management.service;

import com.project.rent_management.dto.OwnerProfileResponse;

import com.project.rent_management.dto.UserKycDTO;
import com.project.rent_management.module.OwnerDetails;
import com.project.rent_management.module.OwnerKYCImage;
import com.project.rent_management.module.User;
import com.project.rent_management.repositry.OwnerDetailsRepo;
import com.project.rent_management.repositry.OwnerKycImageRepo;
import com.project.rent_management.repositry.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Map;


@Service
public class OwnerService {
    @Autowired
    OwnerDetailsRepo ownerDetailsRepo;
    @Autowired
    UserRepo userRepo;

    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    OwnerKycImageRepo ownerKycImageRepo;



    public ResponseEntity<OwnerProfileResponse> getOwnerById(int id) {
        try{
            User user=userRepo.findById(id).orElse(null);
            OwnerDetails od=user.getOwnerDetails();

            OwnerProfileResponse or=new OwnerProfileResponse(user,od);
            return new ResponseEntity<>(or,HttpStatus.FOUND);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new OwnerProfileResponse(),HttpStatus.NOT_FOUND);
    }

    @Transactional
    public ResponseEntity<?> uploadKYCDoc(
            Integer ownerId,
            UserKycDTO kycDetails,
            MultipartFile selfie,
            MultipartFile idFront,
            MultipartFile idBack
    ) {
        OwnerDetails od = ownerDetailsRepo.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        // 🔒 BLOCK cases
        if ("PENDING".equals(od.getKycStatus())) {
            return ResponseEntity.badRequest()
                    .body("KYC already under review");
        }

        if ("APPROVED".equals(od.getKycStatus())) {
            return ResponseEntity.badRequest()
                    .body("KYC already approved");
        }

        // 🔁 REUPLOAD FLOW (only when REJECTED)
        if ("REJECTED".equals(od.getKycStatus())) {

            // delete old images
            System.out.println("deleting existing images");
            for (OwnerKYCImage img : od.getKycImages()) {
                cloudinaryService.deleteImage(img.getPublicId());
            }
            od.getKycImages().clear();

            // reset admin fields
            od.setKycReviewedAt(null);

            od.setKycRejectionReason(null);
            od.setKycAdminNote(null);
        }

        // validate PAN rule
        if (!"PAN".equalsIgnoreCase(kycDetails.getIdType()) && idBack == null) {
            throw new RuntimeException("Back side of ID required");
        }

        // update owner details
        od.setFullName(kycDetails.getFullName());
        od.setIdType(kycDetails.getIdType());
        od.setIdNumber(kycDetails.getIdNumber());
        od.setKycStatus("PENDING");
        od.setKycSubmittedAt(LocalDateTime.now());

        // upload images
        System.out.println("uploading new kyc images");
        saveImage("SELFIE", selfie, od);
        saveImage("ID_FRONT", idFront, od);
        if (idBack != null) {
            saveImage("ID_BACK", idBack, od);
        }

        ownerDetailsRepo.save(od);

        return ResponseEntity.ok("KYC submitted successfully");
    }

    private void saveImage(String name, MultipartFile file, OwnerDetails od) {
        Map res = cloudinaryService.uploadImage(file);
        OwnerKYCImage img = new OwnerKYCImage();
        img.setName(name);
        img.setImageUrl(res.get("secure_url").toString());
        img.setPublicId(res.get("public_id").toString());
        img.setOwnerDetails(od);
        od.getKycImages().add(img);
    }

}
