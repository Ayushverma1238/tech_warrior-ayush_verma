package com.finflow.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.finflow.backend.model.Income;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findByUser_Id(Long userId);

    List<Income> findByUser_IdOrderByDateDesc(Long userId);

    List<Income> findByUser_IdAndSourceIgnoreCaseOrderByDateDesc(
            Long userId,
            String source
    );

    @Query("""
        SELECT i FROM Income i
        WHERE i.user.id = :userId
        AND (
            LOWER(i.source) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR CAST(i.amount AS string) LIKE CONCAT('%', :keyword, '%')
        )
        ORDER BY i.date DESC
    """)
    List<Income> search(Long userId, String keyword);
}