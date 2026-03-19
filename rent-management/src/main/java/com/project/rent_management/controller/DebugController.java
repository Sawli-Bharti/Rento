package com.project.rent_management.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/debug")
public class DebugController {
    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file) {
        System.out.println("FILE RECEIVED: " + file.getOriginalFilename());
        return "OK";
    }
}
