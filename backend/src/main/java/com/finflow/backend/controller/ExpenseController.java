package com.finflow.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.backend.model.Expense;
import com.finflow.backend.service.ExpenseService;
import com.finflow.backend.util.ResponseBuilder;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/expense")
@RequiredArgsConstructor
@CrossOrigin
public class ExpenseController {

    private final ExpenseService service;

    @PostMapping
    public ResponseEntity<?> add(@RequestBody Expense expense) {
        return ResponseBuilder.success(
                "Expense added",
                service.add(expense)
        );
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> get(@PathVariable Long userId) {
        return ResponseBuilder.success(
                "Expenses fetched",
                service.getByUser(userId)
        );
    }
}