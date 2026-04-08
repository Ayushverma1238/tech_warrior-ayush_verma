package com.finflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.finflow.backend.dto.ExpenseResponse;
import com.finflow.backend.exception.ResourceNotFoundException;
import com.finflow.backend.mapper.ExpenseMapper;
import com.finflow.backend.model.Expense;
import com.finflow.backend.model.User;
import com.finflow.backend.repository.ExpenseRepository;
import com.finflow.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    // CREATE
    public ExpenseResponse add(Long userId, Expense expense) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        expense.setUser(user);

        Expense saved = expenseRepository.save(expense);
        return ExpenseMapper.toDTO(saved);
    }

    // READ (All + Filter)
    public List<ExpenseResponse> getExpenses(Long userId, String category) {

        List<Expense> expenses;

        if (category != null && !category.isBlank()) {
            expenses = expenseRepository
                    .findByUser_IdAndCategoryIgnoreCase(userId, category);
        } else {
            expenses = expenseRepository.findByUser_Id(userId);
        }

        return expenses.stream()
                .map(ExpenseMapper::toDTO)
                .toList();
    }

    // READ (Single)
    public ExpenseResponse getById(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));

        return ExpenseMapper.toDTO(expense);
    }

    // UPDATE
    public ExpenseResponse update(Long id, Expense updatedExpense) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));

        existing.setTitle(updatedExpense.getTitle());
        existing.setAmount(updatedExpense.getAmount());
        existing.setCategory(updatedExpense.getCategory());
        existing.setDate(updatedExpense.getDate());

        Expense saved = expenseRepository.save(existing);
        return ExpenseMapper.toDTO(saved);
    }

    // DELETE
    public void delete(Long id) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));

        expenseRepository.delete(existing);
    }
}