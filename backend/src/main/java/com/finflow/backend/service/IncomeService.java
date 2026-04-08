package com.finflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.finflow.backend.dto.IncomeDTO;
import com.finflow.backend.exception.ResourceNotFoundException;
import com.finflow.backend.mapper.IncomeMapper;
import com.finflow.backend.model.Income;
import com.finflow.backend.model.User;
import com.finflow.backend.repository.IncomeRepository;
import com.finflow.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    // CREATE
    public IncomeDTO addIncome(Long userId, IncomeDTO dto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Income income = IncomeMapper.toEntity(dto);
        income.setUser(user);

        return IncomeMapper.toDTO(incomeRepository.save(income));
    }

    // READ (ALL + FILTER)
    public List<IncomeDTO> getIncomes(Long userId, String source) {

        List<Income> incomes;

        if (source != null && !source.isBlank()) {
            incomes = incomeRepository
                    .findByUser_IdAndSourceIgnoreCase(userId, source);
        } else {
            incomes = incomeRepository.findByUser_Id(userId);
        }

        return incomes.stream()
                .map(IncomeMapper::toDTO)
                .toList();
    }

    // READ (Single)
    public IncomeDTO getById(Long id) {
        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Income not found"));

        return IncomeMapper.toDTO(income);
    }

    // UPDATE
    public IncomeDTO update(Long id, IncomeDTO dto) {
        Income existing = incomeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Income not found"));

        existing.setAmount(dto.getAmount());
        existing.setSource(dto.getSource());
        existing.setDate(dto.getDate());

        return IncomeMapper.toDTO(incomeRepository.save(existing));
    }

    // DELETE
    public void delete(Long id) {
        Income existing = incomeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Income not found"));

        incomeRepository.delete(existing);
    }
}