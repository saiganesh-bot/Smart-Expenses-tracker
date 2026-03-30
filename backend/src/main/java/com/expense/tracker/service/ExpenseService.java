package com.expense.tracker.service;

import com.expense.tracker.dto.ExpenseDto;
import com.expense.tracker.entity.Expense;
import com.expense.tracker.entity.User;
import com.expense.tracker.repository.ExpenseRepository;
import com.expense.tracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    public ExpenseDto addExpense(ExpenseDto expenseDto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        
        Expense expense = new Expense();
        expense.setUser(user);
        expense.setTitle(expenseDto.getTitle());
        expense.setAmount(expenseDto.getAmount());
        expense.setCategory(expenseDto.getCategory());
        expense.setType(expenseDto.getType() != null ? expenseDto.getType() : com.expense.tracker.entity.TransactionType.EXPENSE);
        expense.setDate(expenseDto.getDate());

        Expense saved = expenseRepository.save(expense);
        return mapToDto(saved);
    }

    public List<ExpenseDto> getUserExpenses(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        List<Expense> expenses = expenseRepository.findByUserIdOrderByDateDesc(user.getId());
        return expenses.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public void deleteExpense(Long expenseId, String email) {
        Expense expense = expenseRepository.findById(expenseId).orElseThrow();
        User user = userRepository.findByEmail(email).orElseThrow();
        
        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this expense");
        }
        
        expenseRepository.deleteById(expenseId);
    }

    private ExpenseDto mapToDto(Expense expense) {
        return new ExpenseDto(
            expense.getId(),
            expense.getTitle(),
            expense.getAmount(),
            expense.getCategory(),
            expense.getType(),
            expense.getDate()
        );
    }
}
