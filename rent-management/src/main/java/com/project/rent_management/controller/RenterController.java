package com.project.rent_management.controller;

import com.project.rent_management.dto.RenterProfileResponse;
import com.project.rent_management.module.User;
import com.project.rent_management.module.UserPrincipal;
import com.project.rent_management.repositry.UserRepo;
import com.project.rent_management.service.RenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/renter")
public class RenterController {
    @Autowired
    RenterService renterService;
    @Autowired
    UserRepo userRepo;

    @GetMapping("/")
    public String hello(){

        return "hello renter controller here";
    }
    @GetMapping("/dashboard/{renterId}")
    public ResponseEntity<?> getDashboard(Authentication authentication){
        String email = (String) authentication.getPrincipal();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserPrincipal principal=new UserPrincipal(user);

        if (!principal.isRenter()) {
            return ResponseEntity.status(403).build();
        }

        return renterService.getDashboard(principal.getUserId());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<RenterProfileResponse> getRenterById(@PathVariable int id){
        return renterService.getRenterById(id);
    }



}
