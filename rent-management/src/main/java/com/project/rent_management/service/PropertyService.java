package com.project.rent_management.service;

import com.project.rent_management.dto.PropertyDTO;
import com.project.rent_management.module.OwnerDetails;
import com.project.rent_management.module.Property;
import com.project.rent_management.module.PropertyImage;
import com.project.rent_management.repositry.OwnerDetailsRepo;
import com.project.rent_management.repositry.PropertyImageRepo;
import com.project.rent_management.repositry.PropertyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PropertyService {
    @Autowired
    PropertyRepo propertyRepo;
    @Autowired
    OwnerDetailsRepo ownerDetailsRepo;
    @Autowired
    CloudinaryService cloudinaryService;
    @Autowired
    PropertyImageRepo propertyImageRepo;

    @Transactional(readOnly = true)
    public ResponseEntity<List<PropertyDTO>> getAllProperty() {

        try{
            List<Property> properties=propertyRepo.findAll();
            List<PropertyDTO> response = properties.stream().map(property -> {

                PropertyDTO dto = new PropertyDTO();
                dto.setId(property.getId());
                dto.setName(property.getName());
                dto.setRent(property.getRent());
                dto.setCity(property.getCity());
                dto.setState(property.getState());
                dto.setPropertyType(property.getPropertyType());
                dto.setFurnished(property.getFurnished());
                dto.setAddress(property.getAddress());

                List<String> imageUrls = property.getImages()
                        .stream()
                        .map(PropertyImage::getImageUrl)
                        .toList();

                dto.setImageUrls(imageUrls);

                return dto;
            }).toList();
            return new ResponseEntity<>(response,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }



//owner can adding property only when he is approved user
    @Transactional
    public ResponseEntity<String> addProperty(
            Property property,
            int ownerId,
            List<MultipartFile> images
    ) {
        System.out.println("in addproperty service");
        if (images != null && images.size() > 5) {
            return new ResponseEntity<>("min 1 and max 5 images are allowed but "+images.size()+" images try to upload ",HttpStatus.BAD_REQUEST);
        }
        try {
            OwnerDetails od = ownerDetailsRepo.findById(ownerId)
                    .orElseThrow(() -> new RuntimeException("Owner not found"));

            if ("PENDING".equals(od.getKycStatus()) || "BLOCK".equals(od.getKycStatus())) {
                return new ResponseEntity<>("You are not approved user", HttpStatus.FORBIDDEN);
            }

            property.setOwner(od);

            Property savedProperty= propertyRepo.save(property);
            for (MultipartFile file : images) {
                Map result=cloudinaryService.uploadImage(file);
                PropertyImage img=new PropertyImage();
                img.setImageUrl(result.get("secure_url").toString());
                img.setPublicId(result.get("public_id").toString());
                img.setProperty(savedProperty);
                savedProperty.getImages().add(img);


            }

            propertyRepo.save(savedProperty);


            return new ResponseEntity<>("Property added successfully", HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<PropertyDTO> getPropertyById(int id) {
        try{
            Property property=propertyRepo.findById(id).orElse(null);
            System.out.println(property.getName());
            List<String> imageUrls = property.getImages()
                    .stream()
                    .map(PropertyImage::getImageUrl)
                    .toList();

            PropertyDTO dto=new PropertyDTO(
                    property.getId(),
                    property.getRent(),
                    property.getSecurityDeposit(),
                    property.getName(),
                    property.getLocality(),
                    property.getArea(),
                    property.getDescription(),
                    property.getCity(),
                    property.getState(),
                    property.getAddress(),
                    property.getPropertyType(),
                    property.getFurnished(),
                    imageUrls

            );


            if(dto!=null)
                return new ResponseEntity<>(dto,HttpStatus.OK);
            else return new ResponseEntity<>(dto,HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new PropertyDTO(),HttpStatus.BAD_REQUEST);
    }



    public ResponseEntity<List<PropertyDTO>> getAllPropertyByOwnerId(int ownerId) {
        try{
            OwnerDetails od=ownerDetailsRepo.findById(ownerId).orElse(null);
            List<PropertyDTO> response=od.getProperties().stream().map(property -> {

                PropertyDTO dto = new PropertyDTO();
                dto.setId(property.getId());
                dto.setName(property.getName());
                dto.setRent(property.getRent());
                dto.setCity(property.getCity());
                dto.setState(property.getState());
                dto.setPropertyType(property.getPropertyType());
                dto.setFurnished(property.getFurnished());
                dto.setAddress(property.getAddress());

                List<String> imageUrls = property.getImages()
                        .stream()
                        .map(PropertyImage::getImageUrl)
                        .toList();

                dto.setImageUrls(imageUrls);

                return dto;
            }).toList();
            return new ResponseEntity<>(response,HttpStatus.OK);


        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> updatePropertyById(int id,Property property) {
        try{
            Property p=propertyRepo.findById(id).orElse(null);
            p.setRent(property.getRent());
            p.setFurnished(property.getFurnished());
            p.setDescription(property.getDescription());
            p.setArea(property.getArea());
            p.setSecurityDeposit(property.getSecurityDeposit());
            propertyRepo.save(p);
            return new ResponseEntity<>("property updated successfully",HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>("failed to update",HttpStatus.BAD_REQUEST);
    }


    @Transactional(readOnly = true)
    public ResponseEntity<List<PropertyDTO>> getPropertiesBySearch(String query,Integer minRent,Integer maxRent,String furnished,String type) {
        try{
            List<Property> properties=propertyRepo.searchProperties(query,minRent,maxRent,furnished,type);
            List<PropertyDTO> response = properties.stream().map(property -> {

                PropertyDTO dto = new PropertyDTO();
                dto.setId(property.getId());
                dto.setName(property.getName());
                dto.setRent(property.getRent());
                dto.setCity(property.getCity());
                dto.setState(property.getState());
                dto.setPropertyType(property.getPropertyType());
                dto.setFurnished(property.getFurnished());
                dto.setAddress(property.getAddress());

                List<String> imageUrls = property.getImages()
                        .stream()
                        .map(PropertyImage::getImageUrl)
                        .toList();

                dto.setImageUrls(imageUrls);

                return dto;
            }).toList();

            return new ResponseEntity<>(response,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    @Transactional
    public void addImages(int propertyId,int ownerId, List<MultipartFile> images) {

        if(ownerDetailsRepo.findById(ownerId).orElse(null)==null){
            throw new RuntimeException("Sorry you are not Authorize one");
        }
        int existingCount = propertyImageRepo.countByPropertyId(propertyId);

        if (existingCount + images.size() > 5) {
            throw new RuntimeException("Image limit exceeded");
        }

        Property property = propertyRepo.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        for (MultipartFile file : images) {
            Map result = cloudinaryService.uploadImage(file);

            PropertyImage img = new PropertyImage();
            img.setImageUrl(result.get("secure_url").toString());
            img.setPublicId(result.get("public_id").toString());
            img.setProperty(property);

            propertyImageRepo.save(img);
        }
    }

    @Transactional
    public void deleteImage(int ownerId,int imageId) {
        if(ownerDetailsRepo.findById(ownerId).orElse(null)==null){
            throw new RuntimeException("Sorry you are not Authorize one");
        }

        PropertyImage img = propertyImageRepo.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        cloudinaryService.deleteImage(img.getPublicId());
        propertyImageRepo.delete(img);
    }

}
