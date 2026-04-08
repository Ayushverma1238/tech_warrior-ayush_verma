package com.finflow.backend.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardResponse {

    private double totalIncome;
    private double totalExpense;

    private double savings; 
    private double loss;

    private List<MonthlyData> monthlyData;

    private Map<String, Double> categoryBreakdown;
    private Map<String, Double> incomeBreakdown;
}
