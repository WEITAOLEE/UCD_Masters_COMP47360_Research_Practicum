package com.group13.nyseenowbackend.dto;

import lombok.Data;

// Data Transfer Object for RESTful responses
@Data
public class RestBean<T> {
    private int status;
    private boolean success;
    private T message;

    private RestBean(int status, boolean success, T message){
        this.status = status;
        this.success = success;
        this.message = message;
    }

    // Static factory method for successful response with no data
    public static <T> RestBean<T> success(){
        return new RestBean<>(200, true, null);
    }

    // Static factory method for successful response with data
    public static <T> RestBean<T> success(T data){
        return new RestBean<>(200, true, data);
    }

    // Static factory method for failure response with no data
    public static <T> RestBean<T> failure(int status){
        return new RestBean<>(status, false, null);
    }

    // Static factory method for failure response with data
    public static <T> RestBean<T> failure(int status, T data){
        return new RestBean<>(status, false, data);
    }
}
