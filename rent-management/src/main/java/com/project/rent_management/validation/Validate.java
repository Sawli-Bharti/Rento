package com.project.rent_management.validation;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class Validate {
    private static final String EMAIL_REGEX =
            "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
    private static final String PASSWORD_REGEX =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$";

    private static final String MOBILE_REGEX = "^[0-9]{10}$";

    public static boolean validateMobile(String mobile) {
        if (mobile == null) return false;
        return Pattern.matches(MOBILE_REGEX, mobile);
    }

    public boolean validateEmail(String email){
        if (email == null) return false;
        return Pattern.matches(EMAIL_REGEX, email);
    }

    public static boolean validatePassword(String password) {
        if (password == null) return false;
        return Pattern.matches(PASSWORD_REGEX, password);
    }
}
