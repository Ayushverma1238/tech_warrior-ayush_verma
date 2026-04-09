package com.finflow.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MonthlyTax {
    private String month;
    private double income;
    private double expense;
    private double tax;
}