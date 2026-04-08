package com.finflow.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.backend.dto.LoginRequest;
import com.finflow.backend.model.User;
import com.finflow.backend.repository.UserRepository;
import com.finflow.backend.service.AuthService;
import com.finflow.backend.util.ResponseBuilder;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return ResponseBuilder.success("User fetched", user);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseBuilder.success(
                "User registered successfully",
                authService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return ResponseBuilder.success(
                "Login successful",
                authService.login(request));
    }
}