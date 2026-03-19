package com.project.rent_management.service;

import com.project.rent_management.dto.LoginRequest;
import com.project.rent_management.dto.LoginResponse;
import com.project.rent_management.dto.NewRegisterRequest;
import com.project.rent_management.module.OwnerDetails;
import com.project.rent_management.module.RenterDetails;
import com.project.rent_management.module.User;
import com.project.rent_management.module.UserPrincipal;
import com.project.rent_management.repositry.UserRepo;
import com.project.rent_management.validation.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService  {
    @Autowired
    UserRepo userRepo;

    @Autowired
    JwtService jwtService;
    @Autowired
    Validate validate;
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        LoginResponse response = new LoginResponse();
        try{

            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    loginRequest.getEmail(),
                                    loginRequest.getPassword()
                            )
                    );

            UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
            User user = principal.getUser();

            String token=jwtService.generateToken(
                    user.getEmail(),
                    user.getRole()
            );
            response.setUserId(user.getId());
            response.setEmail(user.getEmail());
            response.setToken(token);
            response.setRole(user.getRole());
            response.setKycStatus(
                    user.getRole().equals("ROLE_RENTER")
                        ?user.getRenterDetails().getKycStatus()
                        :user.getRole().equals("ROLE_OWNER")
                            ?user.getOwnerDetails().getKycStatus()
                            :"APPROVED"
            );




            String name = user.getEmail(); // default
            if(user.getRole().contains("RENTER") && user.getRenterDetails() != null){
                name = user.getRenterDetails().getName();
                response.setRenterId(user.getRenterDetails().getId());
            }else if(user.getRole().contains("OWNER") && user.getOwnerDetails() != null){
                name = user.getOwnerDetails().getFullName();
                response.setOwnerId(user.getOwnerDetails().getId());
            }
            response.setName(name);
            System.out.println("login Successfully");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return response;


    }

    public ResponseEntity<String> signUp(NewRegisterRequest request) {
        try {


            if (!validate.validateEmail(request.getEmail())) {
                return new ResponseEntity<>(
                        "Invalid email format",
                        HttpStatus.BAD_REQUEST
                );
            }


            if (!validate.validatePassword(request.getPassword())) {
                return new ResponseEntity<>(
                        "Password must be at least 8 characters and include uppercase, lowercase, number and symbol",
                        HttpStatus.BAD_REQUEST
                );
            }

            if (userRepo.findByEmail(request.getEmail()).isPresent()) {
                return new ResponseEntity<>(
                        "Email already registered",
                        HttpStatus.CONFLICT
                );
            }


            User user = new User();
            user.setEmail(request.getEmail());
            user.setRole("ROLE_" + request.getRole());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            if("OWNER".equals(request.getRole())){
                OwnerDetails od=new OwnerDetails();
                od.setFullName(request.getName());

                od.setUser(user);
                user.setOwnerDetails(od);
            }else if("RENTER".equals(request.getRole())){
                RenterDetails rd=new RenterDetails();
                rd.setName(request.getName());

                rd.setUser(user);
                user.setRenterDetails(rd);
            }
            user.setTime(LocalDateTime.now());
            userRepo.save(user);

            return new ResponseEntity<>(
                    "Account created successfully",
                    HttpStatus.CREATED
            );

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    "Failed to create account",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }





}
