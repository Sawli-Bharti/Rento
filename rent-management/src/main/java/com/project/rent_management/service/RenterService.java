package com.project.rent_management.service;

import com.project.rent_management.dto.DashboardDTO;
import com.project.rent_management.dto.RenterProfileResponse;
import com.project.rent_management.module.RenterDetails;
import com.project.rent_management.module.User;
import com.project.rent_management.repositry.AppointmentRepo;
import com.project.rent_management.repositry.BookingRepo;
import com.project.rent_management.repositry.RenterDetailsRepo;
import com.project.rent_management.repositry.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RenterService {
    @Autowired
    RenterDetailsRepo renterDetailsRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    BookingRepo bookingRepo;
    @Autowired
    AppointmentRepo appointmentRepo;


    public ResponseEntity<RenterProfileResponse> getRenterById(int id) {
        try{
            User user=userRepo.findById(id).orElse(null);
            RenterDetails rd=user.getRenterDetails();
            RenterProfileResponse rp=new RenterProfileResponse(user,rd);
            return new ResponseEntity<>(rp,HttpStatus.FOUND);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new RenterProfileResponse(),HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> getDashboard(int userId) {
        try{
            RenterDetails renter = renterDetailsRepo.findByUserId(userId);
            if(renter==null){
                throw new RuntimeException("user not found");
            }
            int renterId= renter.getId();
            DashboardDTO dto=new DashboardDTO();
            dto.setTotalAppointments(appointmentRepo.countByRenterId(renterId));
            dto.setTotalPendingAppointments(appointmentRepo.countByRenterIdAndStatus(renterId,"PENDING"));
            dto.setTotalBookings(bookingRepo.countByRenterId(renterId));
            return new ResponseEntity<>(dto,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("failed to fetch renter dashboard overview",HttpStatus.BAD_REQUEST);
        }
    }
}
