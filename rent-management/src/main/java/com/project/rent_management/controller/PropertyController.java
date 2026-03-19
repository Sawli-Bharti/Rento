package com.project.rent_management.controller;

import com.project.rent_management.dto.PropertyDTO;
import com.project.rent_management.module.Property;
import com.project.rent_management.repositry.PropertyImageRepo;
import com.project.rent_management.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/property")
public class PropertyController {
    @Autowired
    PropertyService propertyService;

    @Autowired
    PropertyImageRepo propertyImageRepo;
    @GetMapping("/")
    public String hello(){
        return "hello property controller here";
    }


    @GetMapping("/allProperty")
    public ResponseEntity<List<PropertyDTO>> getAllProperty(){
        return propertyService.getAllProperty();
    }





    @PreAuthorize("hasRole('OWNER')")
    @PostMapping(value="/addProperty/{ownerId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addProperty(@PathVariable int ownerId,
                                              @RequestPart("property") Property property,
                                              @RequestPart("images") List<MultipartFile> images
    )  {
        System.out.println("property controller hits");
        System.out.println("PROPERTY JSON = " + property.getName() );
        System.out.println(property.getSecurityDeposit());
        System.out.println("IMAGES COUNT = " + images.size());

        return propertyService.addProperty(property, ownerId,images);
    }

    @PostMapping("/{propertyId}/{ownerId}/images")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> addImages(
            @PathVariable int propertyId,
            @PathVariable int ownerId,
            @RequestPart("images") List<MultipartFile> images
    ) {
        propertyService.addImages(propertyId,ownerId, images);
        return ResponseEntity.ok("Images added");
    }

    @DeleteMapping("/images/{ownerId}/{imageId}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> deleteImage(@PathVariable int ownerId,@PathVariable int imageId) {
        propertyService.deleteImage(ownerId,imageId);
        return ResponseEntity.ok("Image deleted");
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<PropertyDTO> getPropertyById(@PathVariable int id){
        return propertyService.getPropertyById(id);
    }

    @PreAuthorize("hasAnyRole('OWNER','ADMIN')")
    @GetMapping("/allProperties/{ownerId}")
    public ResponseEntity<List<PropertyDTO>> getAllPropertByOwnerId(@PathVariable int ownerId){
        return propertyService.getAllPropertyByOwnerId(ownerId);
    }


    @PreAuthorize("hasRole('OWNER')")
    @PutMapping("/property/{id}")
    public ResponseEntity<String> updatePropertyById(@PathVariable int id,@RequestBody Property property){
        return propertyService.updatePropertyById(id,property);
    }

//    get property by serach -> permit to all
    @GetMapping("/search")
    public ResponseEntity<List<PropertyDTO>> getPropertiesBySearch(@RequestParam String query,
                                                                @RequestParam(required = false) Integer minRent,
                                                                @RequestParam(required = false) Integer maxRent,
                                                                @RequestParam(required = false) String furnished,
                                                                @RequestParam(required = false) String type){
        return propertyService.getPropertiesBySearch(query,minRent,maxRent,furnished,type);
    }

    @PostMapping("/test")
    public String test(@RequestPart MultipartFile file) {
        return file.getOriginalFilename();
    }


}
