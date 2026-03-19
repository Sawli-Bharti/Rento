package com.project.rent_management.service;

import com.project.rent_management.dto.DashboardDTO;
import com.project.rent_management.dto.UserKycDTO;
import com.project.rent_management.dto.UserListDTO;
import com.project.rent_management.module.OwnerDetails;
import com.project.rent_management.module.OwnerKYCImage;
import com.project.rent_management.module.RenterDetails;
import com.project.rent_management.module.User;
import com.project.rent_management.repositry.OwnerDetailsRepo;
import com.project.rent_management.repositry.PropertyRepo;
import com.project.rent_management.repositry.RenterDetailsRepo;
import com.project.rent_management.repositry.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    OwnerDetailsRepo ownerDetailsRepo;
    @Autowired
    RenterDetailsRepo renterDetailsRepo;
    @Autowired
    PropertyRepo propertyRepo;

    public ResponseEntity<List<UserListDTO>> getAllUsers() {
        try{
            List<User> users=userRepo.findAll();
            List<UserListDTO> userList=new ArrayList<>();
            for(User u:users){
                if(u.getRole().equals("ROLE_ADMIN")) continue;
                UserListDTO ul=new UserListDTO();
                ul.setUserId(u.getId());
                ul.setEmail(u.getEmail());
                ul.setRole(u.getRole());
                if(u.getRole().equals("ROLE_RENTER")) {
                    ul.setStatus(u.getRenterDetails().getKycStatus());
                    ul.setName(u.getRenterDetails().getName());
                }
                else if(u.getRole().equals("ROLE_OWNER")) {
                    ul.setStatus(u.getOwnerDetails().getKycStatus());
                    ul.setName(u.getOwnerDetails().getFullName());
                }

                userList.add(ul);
            }
            return new ResponseEntity<>(userList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<RenterDetails>> getAllRenters() {
        try{
            List<RenterDetails> rd=renterDetailsRepo.findAll();
            return new ResponseEntity<>(rd,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }






    public ResponseEntity<String> approveOwnerKycStatus(int ownerId) {
        try{
            OwnerDetails od=ownerDetailsRepo.findById(ownerId).orElseThrow(()->new RuntimeException("owner not found"));
            od.setKycStatus("APPROVED");
            od.setKycReviewedAt(LocalDateTime.now());
            ownerDetailsRepo.save(od);
            return new ResponseEntity<>("kycStatus approved successfullty",HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("failed to approved the kycStatus of owner",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<UserKycDTO>> getAllPendingOwners() {
        try{
            List<OwnerDetails> od=ownerDetailsRepo.findByKycStatus("PENDING");
            System.out.println(od.isEmpty());
            List<UserKycDTO> list=new ArrayList<>();
            for(OwnerDetails o:od){
                UserKycDTO kyc=new UserKycDTO();
                kyc.setId(o.getId());
                kyc.setFullName(o.getFullName());
                kyc.setIdType(o.getIdType());
                kyc.setSubmittedAt(o.getKycSubmittedAt());
                kyc.setEmail(o.getUser().getEmail());
                list.add(kyc);
            }
            System.out.println(list.isEmpty());
            return new ResponseEntity<>(list,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> rejectOwnerKycStatus(Integer ownerId, String reason, String note) {
        try{
            OwnerDetails od=ownerDetailsRepo.findById(ownerId).orElseThrow(()->new RuntimeException("owner not found"));
            od.setKycStatus("REJECTED");
            od.setKycReviewedAt(LocalDateTime.now());
            od.setKycRejectionReason(reason);
            od.setKycAdminNote(note);
            ownerDetailsRepo.save(od);
            return new ResponseEntity<>("owner kyc rejected",HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("failed to reject kyc status",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<UserKycDTO> getKycDetailsOfOwner(int ownerId) {
        try {
            OwnerDetails od = ownerDetailsRepo.findById(ownerId)
                    .orElseThrow(() -> new RuntimeException("Owner not found"));

            UserKycDTO kyc = new UserKycDTO();
            kyc.setFullName(od.getFullName());
            kyc.setIdNumber(od.getIdNumber());
            kyc.setIdType(od.getIdType());

            List<OwnerKYCImage> images = od.getKycImages();

            if (images == null || images.isEmpty()) {
                return new ResponseEntity<>(kyc, HttpStatus.OK);
            }

            for (OwnerKYCImage img : images) {
                switch (img.getName()) {
                    case "SELFIE":
                        kyc.setSelfieUrl(img.getImageUrl());
                        break;

                    case "ID_FRONT":
                        kyc.setIdFrontUrl(img.getImageUrl());
                        break;

                    case "ID_BACK":
                        kyc.setIdBackUrl(img.getImageUrl());
                        break;
                }
            }

            return new ResponseEntity<>(kyc, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> getDashboard() {
        try{
            DashboardDTO dto =new DashboardDTO();
            dto.setTotalUsers(userRepo.count());
            dto.setTotalOwners(userRepo.countByRole("ROLE_OWNER"));
            dto.setTotalRenters(userRepo.countByRole("ROLE_RENTER"));
            dto.setTotalProperties(propertyRepo.count());
            return new ResponseEntity<>(dto,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("failed to fetch dashboard info",HttpStatus.BAD_REQUEST);
        }
    }
}
