package com.finflow.backend.mapper;

import com.finflow.backend.dto.IncomeDTO;
import com.finflow.backend.model.Income;

public class IncomeMapper {

    public static IncomeDTO toDTO(Income income) {
        return IncomeDTO.builder()
                .id(income.getId())
                .source(income.getSource())
                .amount(income.getAmount())
                .category(income.getCategory())
                .date(income.getDate())
                .build();
    }

    public static Income toEntity(IncomeDTO dto) {
        return Income.builder()
                .id(dto.getId())
                .source(dto.getSource())
                .amount(dto.getAmount())
                .category(dto.getCategory())
                .date(dto.getDate())
                .build();
    }
}
