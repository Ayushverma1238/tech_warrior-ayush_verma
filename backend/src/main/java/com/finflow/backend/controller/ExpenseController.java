package com.finflow.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // CREATE 
    @PostMapping
    public ResponseEntity<?> add(
            @RequestParam Long userId,
            @RequestBody Expense expense) {

        return ResponseBuilder.success(
                "Expense added",
                service.add(userId, expense));
    }

    // GET (All + Filter)
    @GetMapping
    public ResponseEntity<?> getExpenses(
            @RequestParam Long userId,
            @RequestParam(required = false) String category) {

        return ResponseBuilder.success(
                "Expenses fetched",
                service.getExpenses(userId, category));
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseBuilder.success(
                "Expense fetched",
                service.getById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody Expense expense) {

        return ResponseBuilder.success(
                "Expense updated",
                service.update(id, expense));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseBuilder.success("Expense deleted", null);
    }
}