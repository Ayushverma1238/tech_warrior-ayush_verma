package com.finflow.backend.mapper;

import com.finflow.backend.dto.ExpenseResponse;
import com.finflow.backend.model.Expense;

public class ExpenseMapper {

    public static ExpenseResponse toDTO(Expense expense) {
        return ExpenseResponse.builder()
                .id(expense.getId())
                .title(expense.getTitle())
                .amount(expense.getAmount())
                .category(expense.getCategory())
                .date(expense.getDate())
                .build();
    }
}
