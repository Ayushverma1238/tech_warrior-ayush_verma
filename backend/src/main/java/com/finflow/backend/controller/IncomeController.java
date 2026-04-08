package com.finflow.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.backend.dto.IncomeDTO;
import com.finflow.backend.security.CustomUserDetails;
import com.finflow.backend.service.IncomeService;
import com.finflow.backend.util.ResponseBuilder;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/income")
@RequiredArgsConstructor
@CrossOrigin
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<?> addIncome(@RequestBody IncomeDTO dto) {
        return ResponseBuilder.success(
                "Income added",
                incomeService.addIncome(dto));
    }

    @GetMapping
    public ResponseEntity<?> getIncome(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseBuilder.success(
                "Income fetched",
                incomeService.getByUser(user.getId()));
    }
}