package com.finflow.backend.service;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.finflow.backend.dto.CategoryDeduction;
import com.finflow.backend.dto.MonthlyTax;
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

    private static final double STANDARD_DEDUCTION = 50000;
    private static final double CESS_RATE = 0.04;

    public TaxResponse calculateTax(Long userId) {

        List<Income> incomes = incomeRepo.findByUser_Id(userId);
        List<Expense> expenses = expenseRepo.findByUser_Id(userId);

        double totalIncome = incomes.stream()
                .mapToDouble(Income::getAmount)
                .sum();

        double totalExpense = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double taxableIncome = Math.max(0, totalIncome - totalExpense - STANDARD_DEDUCTION);

        double oldTax = applyCess(calculateOldRegimeTax(taxableIncome));
        double newTax = applyCess(calculateNewRegimeTax(taxableIncome));

        return TaxResponse.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .taxableIncome(taxableIncome)
                .taxAmount(Math.min(oldTax, newTax))
                .taxOldRegime(oldTax)
                .taxNewRegime(newTax)
                .deductions(getCategoryDeductions(expenses))
                .monthlyBreakdown(getMonthlyBreakdown(incomes, expenses))
                .suggestions(generateSuggestions(taxableIncome))
                .build();
    }

    // ================= OLD REGIME =================
    private double calculateOldRegimeTax(double income) {

        if (income <= 500000)
            return 0;

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

    // ================= NEW REGIME =================
    private double calculateNewRegimeTax(double income) {

        if (income <= 700000)
            return 0;

        double tax = 0;

        if (income > 1500000) {
            tax += (income - 1500000) * 0.30;
            income = 1500000;
        }
        if (income > 1200000) {
            tax += (income - 1200000) * 0.20;
            income = 1200000;
        }
        if (income > 900000) {
            tax += (income - 900000) * 0.15;
            income = 900000;
        }
        if (income > 600000) {
            tax += (income - 600000) * 0.10;
            income = 600000;
        }
        if (income > 300000) {
            tax += (income - 300000) * 0.05;
        }

        return tax;
    }

    // ================= CESS =================
    private double applyCess(double tax) {
        return tax + (tax * CESS_RATE);
    }

    // ================= CATEGORY =================
    private List<CategoryDeduction> getCategoryDeductions(List<Expense> expenses) {

        return expenses.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.summingDouble(Expense::getAmount)))
                .entrySet()
                .stream()
                .map(e -> new CategoryDeduction(e.getKey(), e.getValue()))
                .toList();
    }

    // ================= MONTHLY =================
    private List<MonthlyTax> getMonthlyBreakdown(List<Income> incomes, List<Expense> expenses) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM");

        Map<String, Double> incomeMap = incomes.stream()
                .collect(Collectors.groupingBy(
                        i -> i.getDate().format(formatter),
                        Collectors.summingDouble(Income::getAmount)));

        Map<String, Double> expenseMap = expenses.stream()
                .collect(Collectors.groupingBy(
                        e -> e.getDate().format(formatter),
                        Collectors.summingDouble(Expense::getAmount)));

        Set<String> allMonths = new HashSet<>();
        allMonths.addAll(incomeMap.keySet());
        allMonths.addAll(expenseMap.keySet());

        return allMonths.stream()
                .sorted()
                .map(month -> {
                    double income = incomeMap.getOrDefault(month, 0.0);
                    double expense = expenseMap.getOrDefault(month, 0.0);

                    double taxable = Math.max(0, income - expense);

                    return new MonthlyTax(
                            month,
                            income,
                            expense,
                            calculateOldRegimeTax(taxable));
                })
                .toList();
    }

    // ================= SUGGESTIONS =================
    private List<String> generateSuggestions(double income) {

        List<String> tips = new ArrayList<>();

        if (income > 500000) {
            tips.add("Invest under Section 80C (ELSS, PPF) to save up to ₹1.5L");
        }

        if (income > 700000) {
            tips.add("Use 80D (health insurance) to save additional tax");
        }

        if (income > 1000000) {
            tips.add("Compare Old vs New regime carefully");
        }

        tips.add("Track expenses better to reduce taxable income");

        return tips;
    }
}