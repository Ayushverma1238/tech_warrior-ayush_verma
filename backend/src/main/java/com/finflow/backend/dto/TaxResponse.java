package com.finflow.backend.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TaxResponse {

    private double totalIncome;
    private double totalExpense;
    private double taxableIncome;
    private double taxAmount;

    private double taxOldRegime;
    private double taxNewRegime;

    private List<CategoryDeduction> deductions;
    private List<MonthlyTax> monthlyBreakdown;
    private List<String> suggestions;
}
