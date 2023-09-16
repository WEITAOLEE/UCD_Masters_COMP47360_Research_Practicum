package com.group13.nyseenowbackend.config;

import com.alibaba.fastjson.JSONObject;
import com.group13.nyseenowbackend.dto.RestBean;
import com.group13.nyseenowbackend.service.impl.AuthorizeServiceImpl;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.userdetails.DaoAuthenticationConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import javax.sql.DataSource;
import java.io.IOException;

// Configure Spring Security for the application
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Resource
    AuthorizeServiceImpl authorizeService;

    @Resource
    DataSource dataSource;

    // Define security rules for HTTP requests
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                // Specifies access rules for different routes
                .authorizeRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/api/auth/**").permitAll() // Permit all requests to '/api/auth/**'
                        .requestMatchers("/itinerary/predict").permitAll()
                        .requestMatchers("/attraction/predict").permitAll()
                        .requestMatchers("/attractions/fetch").permitAll()
                        .requestMatchers("/trip/**").permitAll()
                        .requestMatchers("/busyness/**").permitAll()
                        .anyRequest().authenticated()) // All other requests must be authenticated(logged in)
                .formLogin(formLogin -> formLogin
                        .loginProcessingUrl("/api/auth/login") // Define login URL
                        .successHandler(this::authenticationSuccessHandler) // Define success handler
                        .failureHandler(this::authenticationFailureHandler)) // Define failure handler
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout")) // Define logout URL
                .csrf(csrf -> csrf
                        .disable()) // Disables CSRF tokens
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(this::authenticationFailureHandler)) // Actions on unauthenticated access
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .build();
    }

    // Defines how to validate user's login details
    @Bean
    public DaoAuthenticationConfigurer<AuthenticationManagerBuilder, AuthorizeServiceImpl> authenticationManager(HttpSecurity security) throws Exception {
        return security
                .getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(authorizeService);
    }

    // Use BCrypt to check passwords.
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // Define authentication failure handler
    public void authenticationFailureHandler(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        response.setCharacterEncoding("utf-8");
        if (exception instanceof BadCredentialsException) {
            response.getWriter().write(JSONObject.toJSONString(RestBean.failure(401, "Invalid username or password.")));
        } else {
            response.getWriter().write(JSONObject.toJSONString(RestBean.failure(401, exception.getMessage())));
        }
    }

    // Define authentication success handler
    public void authenticationSuccessHandler(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(JSONObject.toJSONString(RestBean.success("LOGGED IN!")));
    }

}