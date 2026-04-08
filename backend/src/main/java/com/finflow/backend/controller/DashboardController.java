package com.finflow.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.backend.security.CustomUserDetails;
import com.finflow.backend.service.DashboardService;
import com.finflow.backend.util.ResponseBuilder;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin
public class DashboardController {

    private final DashboardService service;

    @GetMapping
    public ResponseEntity<?> getDashboard(
            @AuthenticationPrincipal CustomUserDetails user) {

        return ResponseBuilder.success(
                "Dashboard fetched",
                service.getDashboard(user.getId()));
    }
}