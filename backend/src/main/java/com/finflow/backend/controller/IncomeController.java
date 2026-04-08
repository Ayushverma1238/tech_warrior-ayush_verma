package com.finflow.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.backend.dto.IncomeDTO;
import com.finflow.backend.service.IncomeService;
import com.finflow.backend.util.ResponseBuilder;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/income")
@RequiredArgsConstructor
@CrossOrigin
public class IncomeController {

    private final IncomeService service;

    private String getCurrentUserEmail() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    // CREATE
    @PostMapping
    public ResponseEntity<?> add(
            @RequestBody IncomeDTO dto) {

        return ResponseBuilder.success(
                "Income added",
                service.addIncome(getCurrentUserEmail(), dto));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<?> get(
            @RequestParam(required = false) String source) {

        return ResponseBuilder.success(
                "Income fetched",
                service.getIncomes(getCurrentUserEmail(), source));
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseBuilder.success(
                "Income fetched",
                service.getById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody IncomeDTO dto) {

        return ResponseBuilder.success(
                "Income updated",
                service.update(id, dto));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseBuilder.success("Income deleted", null);
    }
}