package com.finflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.finflow.backend.dto.IncomeDTO;
import com.finflow.backend.mapper.IncomeMapper;
import com.finflow.backend.model.Income;
import com.finflow.backend.repository.IncomeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final IncomeRepository repo;

    public IncomeDTO addIncome(IncomeDTO dto) {
        Income income = IncomeMapper.toEntity(dto);
        return IncomeMapper.toDTO(repo.save(income));
    }

    public List<Income> getByUser(Long userId) {
        return repo.findByUserId(userId);
    }
}