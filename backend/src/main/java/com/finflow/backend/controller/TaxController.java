package com.finflow.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.backend.security.CustomUserDetails;
import com.finflow.backend.service.TaxService;
import com.finflow.backend.util.ResponseBuilder;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tax")
@RequiredArgsConstructor
@CrossOrigin
public class TaxController {

    private final TaxService service;

    @GetMapping
    public ResponseEntity<?> getTax(
            @AuthenticationPrincipal CustomUserDetails user) {

        return ResponseBuilder.success(
                "Tax calculated",
                service.calculateTax(user.getId()));
    }
}