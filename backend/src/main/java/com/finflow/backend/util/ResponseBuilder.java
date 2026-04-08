package com.finflow.backend.util;

import org.springframework.http.ResponseEntity;

import com.finflow.backend.dto.ApiResponse;

public class ResponseBuilder {
    
    public static <T> ResponseEntity<ApiResponse<T>> success(String message, T data) {
        return ResponseEntity.ok(
                ApiResponse.<T>builder()
                        .success(true)
                        .message(message)
                        .data(data)
                        .build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> error(String message) {
        return ResponseEntity.badRequest().body(
                ApiResponse.<T>builder()
                        .success(false)
                        .message(message)
                        .data(null)
                        .build());
    }
}
