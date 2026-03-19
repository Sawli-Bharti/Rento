package com.project.rent_management.module;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
public class UserPrincipal implements UserDetails {

    private User user;
    public UserPrincipal(User user){
        this.user=user;
    }

    public int getUserId() {
        return user.getId();
    }

    public String getRole() {
        return user.getRole();
    }

    public boolean isOwner() {
        return "ROLE_OWNER".equals(user.getRole());
    }

    public boolean isRenter() {
        return "ROLE_RENTER".equals(user.getRole());
    }

    public boolean isAdmin() {
        return "ROLE_ADMIN".equals(user.getRole());
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(user.getRole()));
    }

    @Override
    public  String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
