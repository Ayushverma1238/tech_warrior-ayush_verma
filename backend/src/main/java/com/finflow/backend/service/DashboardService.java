package com.finflow.backend.service;

import java.time.Month;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.finflow.backend.dto.DashboardResponse;
import com.finflow.backend.dto.MonthlyData;
import com.finflow.backend.model.Expense;
import com.finflow.backend.model.Income;
import com.finflow.backend.repository.ExpenseRepository;
import com.finflow.backend.repository.IncomeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final IncomeRepository incomeRepo;
    private final ExpenseRepository expenseRepo;

    public DashboardResponse getDashboard(Long userId) {

        List<Income> incomes = incomeRepo.findByUserId(userId);
        List<Expense> expenses = expenseRepo.findByUserId(userId);

        double totalIncome = incomes.stream()
                .mapToDouble(Income::getAmount)
                .sum();

        double totalExpense = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double netProfit = totalIncome - totalExpense;

        Map<Integer, MonthlyData> monthlyMap = new HashMap<>();

        // Process income
        for (Income income : incomes) {
            int month = income.getDate().getMonthValue();

            monthlyMap.putIfAbsent(month,
                    new MonthlyData(Month.of(month).name(), 0, 0));

            MonthlyData data = monthlyMap.get(month);
            data.setIncome(data.getIncome() + income.getAmount());
        }

        // Process expense
        for (Expense expense : expenses) {
            int month = expense.getDate().getMonthValue();

            monthlyMap.putIfAbsent(month,
                    new MonthlyData(Month.of(month).name(), 0, 0));

            MonthlyData data = monthlyMap.get(month);
            data.setExpense(data.getExpense() + expense.getAmount());
        }

        List<MonthlyData> monthlyData = monthlyMap.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(Map.Entry::getValue)
                .toList();

        return DashboardResponse.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .netProfit(netProfit)
                .monthlyData(monthlyData)
                .build();
    }
}