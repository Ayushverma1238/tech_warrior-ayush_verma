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

                List<Income> incomes = incomeRepo.findByUser_Id(userId);
                List<Expense> expenses = expenseRepo.findByUser_Id(userId);

                double totalIncome = incomes.stream()
                                .mapToDouble(Income::getAmount)
                                .sum();

                double totalExpense = expenses.stream()
                                .mapToDouble(Expense::getAmount)
                                .sum();

                double net = totalIncome - totalExpense;

                double savings = Math.max(0, net);
                double loss = Math.max(0, -net);

                // MONTHLY DATA
                Map<Integer, MonthlyData> monthlyMap = new HashMap<>();

                for (Income income : incomes) {
                        int m = income.getDate().getMonthValue();

                        monthlyMap.putIfAbsent(
                                        m,
                                        new MonthlyData(Month.of(m).name(), 0, 0));

                        monthlyMap.get(m).setIncome(
                                        monthlyMap.get(m).getIncome() + income.getAmount());
                }

                for (Expense expense : expenses) {
                        int m = expense.getDate().getMonthValue();

                        monthlyMap.putIfAbsent(
                                        m,
                                        new MonthlyData(Month.of(m).name(), 0, 0));

                        monthlyMap.get(m).setExpense(
                                        monthlyMap.get(m).getExpense() + expense.getAmount());
                }

                List<MonthlyData> monthlyData = monthlyMap.entrySet().stream()
                                .sorted(Map.Entry.comparingByKey())
                                .map(Map.Entry::getValue)
                                .toList();

                // CATEGORY BREAKDOWN
                Map<String, Double> categoryBreakdown = new HashMap<>();
                for (Expense e : expenses) {
                        categoryBreakdown.put(
                                        e.getCategory(),
                                        categoryBreakdown.getOrDefault(e.getCategory(), 0.0) + e.getAmount());
                }

                // INCOME BREAKDOWN
                Map<String, Double> incomeBreakdown = new HashMap<>();
                for (Income i : incomes) {
                        incomeBreakdown.put(
                                        i.getSource(),
                                        incomeBreakdown.getOrDefault(i.getSource(), 0.0) + i.getAmount());
                }

                return DashboardResponse.builder()
                                .totalIncome(totalIncome)
                                .totalExpense(totalExpense)
                                .savings(savings)
                                .loss(loss)
                                .monthlyData(monthlyData)
                                .categoryBreakdown(categoryBreakdown)
                                .incomeBreakdown(incomeBreakdown)
                                .build();
        }
}