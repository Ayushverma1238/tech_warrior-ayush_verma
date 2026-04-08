package com.finflow.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finflow.backend.model.Income;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByUser_Id(Long userId);

    List<Income> findByUser_IdAndSourceIgnoreCase(Long userId, String source);
}