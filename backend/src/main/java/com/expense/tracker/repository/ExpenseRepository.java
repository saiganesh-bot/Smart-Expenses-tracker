package com.expense.tracker.repository;

import com.expense.tracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserIdOrderByDateDesc(Long userId);
}
