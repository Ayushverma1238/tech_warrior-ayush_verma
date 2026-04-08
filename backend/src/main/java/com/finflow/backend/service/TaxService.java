package com.finflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.finflow.backend.dto.TaxResponse;
import com.finflow.backend.model.Expense;
import com.finflow.backend.model.Income;
import com.finflow.backend.repository.ExpenseRepository;
import com.finflow.backend.repository.IncomeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaxService {

    private final IncomeRepository incomeRepo;
    private final ExpenseRepository expenseRepo;

    public TaxResponse calculateTax(Long userId) {

        List<Income> incomes = incomeRepo.findByUser_Id(userId);
        List<Expense> expenses = expenseRepo.findByUser_Id(userId);

        double totalIncome = incomes.stream()
                .mapToDouble(Income::getAmount)
                .sum();

        double totalExpense = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double taxableIncome = Math.max(0, totalIncome - totalExpense);

        double tax = calculateSlabTax(taxableIncome);

        return TaxResponse.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .taxableIncome(taxableIncome)
                .taxAmount(tax)
                .build();
    }

    private double calculateSlabTax(double income) {

        double tax = 0;

        if (income > 1000000) {
            tax += (income - 1000000) * 0.30;
            income = 1000000;
        }

        if (income > 500000) {
            tax += (income - 500000) * 0.20;
            income = 500000;
        }

        if (income > 250000) {
            tax += (income - 250000) * 0.05;
        }

        return tax;
    }
}

