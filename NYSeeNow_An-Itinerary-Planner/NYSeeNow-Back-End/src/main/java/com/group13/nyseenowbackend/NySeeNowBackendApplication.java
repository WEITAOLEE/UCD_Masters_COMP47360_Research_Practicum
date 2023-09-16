package com.group13.nyseenowbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class NySeeNowBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(NySeeNowBackendApplication.class, args);
    }

    // Bean for configuring cross-origin resource sharing (CORS)
    @Bean
    public WebMvcConfigurer configure(){
        return new WebMvcConfigurer(){

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Add CORS mappings
                // Add mapping for all endpoints ("/*")
                // Allow all origins
                // Allow GET, POST, PUT, DELETE methods
                // Allow all headers
                // Allow credentials
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

}


