package com.finflow.backend.dto;

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
}
