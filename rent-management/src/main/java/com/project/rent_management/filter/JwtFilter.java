package com.project.rent_management.filter;

import com.project.rent_management.module.CustomUserDetailsService;
import com.project.rent_management.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;

    @Autowired
    ApplicationContext context;

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //        from request the header is like
//        Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYW1sYSIsImlhdCI6MTc2Mzg5NTE3NSwiZXhwIjoxNzY0MDAzMTc1fQ.17EbcPsDgJquDED_iGVZn5whhd2AARvbpSH8FNxb6XQ

        String authHeader=request.getHeader("Authorization");
        String token=null;
        String useremail=null;
        String role=null;
        if(authHeader!=null && authHeader.startsWith("Bearer ")){
            token=authHeader.substring(7);
            try{
                useremail=jwtService.extractUserEmail(token);
                role=jwtService.extractRole(token);

                if(useremail!=null && SecurityContextHolder.getContext().getAuthentication()==null){

                    if(jwtService.isTokenExpired(token)==false){
                        UsernamePasswordAuthenticationToken authtoken=
                                new UsernamePasswordAuthenticationToken(useremail, null, List.of(new SimpleGrantedAuthority(role)));
                        authtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authtoken);
                    }
                }
            }catch(Exception ex){
                LOGGER.warn("Invalid JWT token: {}", ex.getMessage());
                SecurityContextHolder.clearContext();
            }
        }
        filterChain.doFilter(request, response);

    }
}
