package com.project.rent_management.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dcixflcey");
        config.put("api_key", "213137425559122");
        config.put("api_secret", "j995xYERJ4HmnwNteeYX3jQiCck");
        return new Cloudinary(config);
    }
}
