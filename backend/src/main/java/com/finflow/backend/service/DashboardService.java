package com.finflow.backend.service;

import java.time.Month;
import java.util.*;

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

                // FIXED (use correct JPA method)
                List<Income> incomes = incomeRepo.findByUser_Id(userId);
                List<Expense> expenses = expenseRepo.findByUser_Id(userId);

                // TOTALS
                double totalIncome = incomes.stream()
                                .mapToDouble(Income::getAmount)
                                .sum();

                double totalExpense = expenses.stream()
                                .mapToDouble(Expense::getAmount)
                                .sum();

                double netProfit = totalIncome - totalExpense;

                // MONTHLY DATA
                Map<Integer, MonthlyData> monthlyMap = new HashMap<>();

                // Income processing
                for (Income income : incomes) {
                        int month = income.getDate().getMonthValue();

                        monthlyMap.putIfAbsent(
                                        month,
                                        new MonthlyData(Month.of(month).name(), 0, 0));

                        MonthlyData data = monthlyMap.get(month);
                        data.setIncome(data.getIncome() + income.getAmount());
                }

                // Expense processing
                for (Expense expense : expenses) {
                        int month = expense.getDate().getMonthValue();

                        monthlyMap.putIfAbsent(
                                        month,
                                        new MonthlyData(Month.of(month).name(), 0, 0));

                        MonthlyData data = monthlyMap.get(month);
                        data.setExpense(data.getExpense() + expense.getAmount());
                }

                List<MonthlyData> monthlyData = monthlyMap.entrySet().stream()
                                .sorted(Map.Entry.comparingByKey())
                                .map(Map.Entry::getValue)
                                .toList();

                // CATEGORY BREAKDOWN (for pie chart)
                Map<String, Double> categoryBreakdown = new HashMap<>();

                for (Expense expense : expenses) {
                        categoryBreakdown.put(
                                        expense.getCategory(),
                                        categoryBreakdown.getOrDefault(
                                                        expense.getCategory(), 0.0) + expense.getAmount());
                }

                // INCOME SOURCE BREAKDOWN
                Map<String, Double> incomeBreakdown = new HashMap<>();

                for (Income income : incomes) {
                        incomeBreakdown.put(
                                        income.getSource(),
                                        incomeBreakdown.getOrDefault(
                                                        income.getSource(), 0.0) + income.getAmount());
                }

                // FINAL RESPONSE
                return DashboardResponse.builder()
                                .totalIncome(totalIncome)
                                .totalExpense(totalExpense)
                                .netProfit(netProfit)
                                .monthlyData(monthlyData)
                                .categoryBreakdown(categoryBreakdown) 
                                .incomeBreakdown(incomeBreakdown) 
                                .build();
        }
}