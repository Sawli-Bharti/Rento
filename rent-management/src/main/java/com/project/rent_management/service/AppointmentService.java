package com.project.rent_management.service;

import com.project.rent_management.dto.AppointmentDTO;
import com.project.rent_management.dto.OwnerAppointmentResponse;
import com.project.rent_management.module.Appointment;
import com.project.rent_management.module.OwnerDetails;
import com.project.rent_management.module.Property;
import com.project.rent_management.module.RenterDetails;
import com.project.rent_management.repositry.AppointmentRepo;
import com.project.rent_management.repositry.OwnerDetailsRepo;
import com.project.rent_management.repositry.PropertyRepo;
import com.project.rent_management.repositry.RenterDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private PropertyRepo propertyRepo;

    @Autowired
    private RenterDetailsRepo renterRepo;

    @Autowired
    private OwnerDetailsRepo ownerRepo;

    private AppointmentDTO map(Appointment a){

        AppointmentDTO dto = new AppointmentDTO();

        dto.setId(a.getId());
        dto.setVisitDate(a.getVisitDate());
        dto.setStatus(a.getStatus());
        dto.setOwnerNote(a.getOwnerNote());

        dto.setPropertyTitle(a.getProperty().getName());
        dto.setOwnerName(a.getProperty().getOwner().getFullName());
        dto.setRenterName(a.getRenter().getName());

        return dto;
    }

    /* ---------------- CREATE APPOINTMENT ---------------- */
    public ResponseEntity<?> createAppointment(
            Integer propertyId,
            Integer renterId,
            LocalDate visitDate
    ) {
        Property property = propertyRepo.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        RenterDetails renter = renterRepo.findById(renterId)
                .orElseThrow(() -> new RuntimeException("Renter not found"));

        OwnerDetails owner = property.getOwner();

        Appointment appointment = new Appointment();

        appointment.setProperty(property);
        appointment.setRenter(renter);

        appointment.setVisitDate(visitDate);
        appointment.setStatus("PENDING");

        appointmentRepo.save(appointment);

        return ResponseEntity.ok("Appointment request sent to owner");
    }

    /* ---------------- OWNER ACCEPT ---------------- */
    public ResponseEntity<?> acceptAppointment(Long appointmentId) {
        try{
            Appointment appt = appointmentRepo.findById(appointmentId)
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));

            if (!"PENDING".equals(appt.getStatus())) {
                return ResponseEntity.badRequest().body("Appointment already processed");
            }

            appt.setStatus("ACCEPTED");
            appointmentRepo.save(appt);

            return ResponseEntity.ok("Appointment accepted");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("failed to accept appointment",HttpStatus.BAD_REQUEST);
        }

    }

    /* ---------------- OWNER REJECT ---------------- */
    public ResponseEntity<?> rejectAppointment(
            Long appointmentId,
            String note
    ) {
        try{
            Appointment appt = appointmentRepo.findById(appointmentId)
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));

            if (!"PENDING".equals(appt.getStatus())) {
                return ResponseEntity.badRequest().body("Appointment already processed");
            }

            appt.setStatus("REJECTED");
            appt.setOwnerNote(note);

            appointmentRepo.save(appt);

            return ResponseEntity.ok("Appointment rejected");
        } catch (Exception e) {
            e.printStackTrace();
            return  new ResponseEntity<>("failed to reject appoinment",HttpStatus.BAD_REQUEST);
        }

    }

    /* ---------------- OWNER VIEW ALL APPOINTMENT ---------------- */
    public ResponseEntity<List<AppointmentDTO>> getOwnerAppointments(int ownerId){


        List<Appointment> appointments=appointmentRepo.findByOwnerIdOrderByCreatedAtDesc(ownerId);



        List<AppointmentDTO> appointmentsDTO =
                appointments.stream().map(this::map).toList();

        OwnerAppointmentResponse res = new OwnerAppointmentResponse();



        return ResponseEntity.ok(appointmentsDTO);
    }

    /* ---------------- RENTER VIEW ALL ---------------- */
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsForRenter(Integer renterId){

        List<Appointment> list = appointmentRepo.findByRenterIdOrderByCreatedAtDesc(renterId);

        List<AppointmentDTO> result = new ArrayList<>();

        for(Appointment a : list){
            result.add(map(a));
        }

        return ResponseEntity.ok(result);
    }

    public ResponseEntity<?> cancelAppointment(Long appointmentId) {
        try{

            Appointment ap = appointmentRepo.findById(appointmentId)
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));

            if(!"PENDING".equals(ap.getStatus())){
                return ResponseEntity.badRequest().body("Cannot cancel processed appointment");
            }

            ap.setStatus("CANCELLED");

            appointmentRepo.save(ap);

            return ResponseEntity.ok("Appointment cancelled");

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to cancel appointment", HttpStatus.BAD_REQUEST);
        }
    }
}

