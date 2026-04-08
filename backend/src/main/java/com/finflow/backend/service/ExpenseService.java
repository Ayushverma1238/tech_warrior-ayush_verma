package com.finflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.finflow.backend.dto.ExpenseResponse;
import com.finflow.backend.mapper.ExpenseMapper;
import com.finflow.backend.model.Expense;
import com.finflow.backend.repository.ExpenseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseResponse add(Expense expense) {
        Expense saved = expenseRepository.save(expense);
        return ExpenseMapper.toDTO(saved);
    }

    public List<ExpenseResponse> getByUser(Long userId) {
        return expenseRepository.findByUserId(userId)
                .stream()
                .map(ExpenseMapper::toDTO)
                .toList();
    }
}
