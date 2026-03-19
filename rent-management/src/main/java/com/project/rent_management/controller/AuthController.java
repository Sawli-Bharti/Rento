package com.project.rent_management.controller;

import com.project.rent_management.dto.LoginRequest;
import com.project.rent_management.dto.LoginResponse;
import com.project.rent_management.dto.NewRegisterRequest;
import com.project.rent_management.module.User;
import com.project.rent_management.repositry.UserRepo;
import com.project.rent_management.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @Autowired
    UserRepo userRepo;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        try {
            LoginResponse response = authService.login(loginRequest);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody NewRegisterRequest request){

        return authService.signUp(request);
    }
    @GetMapping("/me")
    public ResponseEntity<LoginResponse> getCurrentUser(Authentication auth) {
        User user = userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        LoginResponse response=new LoginResponse();
        response.setRole(user.getRole());
        if(user.getRole().equals("ROLE_OWNER")){
            response.setName(user.getOwnerDetails().getFullName());
            response.setKycStatus(user.getOwnerDetails().getKycStatus());
            response.setOwnerId(user.getOwnerDetails().getId());
        }else if(user.getRole().equals("ROLE_RENTER")){
            response.setName(user.getRenterDetails().getName());
            response.setKycStatus(user.getRenterDetails().getKycStatus());
            response.setRenterId(user.getRenterDetails().getId());
        }
        return ResponseEntity.ok(response);
    }

}
