package com.expense.tracker.controller;

import com.expense.tracker.dto.ExpenseDto;
import com.expense.tracker.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(ExpenseController.class);
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<ExpenseDto> addExpense(@RequestBody ExpenseDto expenseDto, Authentication authentication) {
        logger.info("User {} is adding a new expense: {}", authentication.getName(), expenseDto.getTitle());
        ExpenseDto saved = expenseService.addExpense(expenseDto, authentication.getName());
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDto>> getExpenses(Authentication authentication) {
        logger.info("User {} is fetching expenses", authentication.getName());
        List<ExpenseDto> expenses = expenseService.getUserExpenses(authentication.getName());
        logger.info("Returning {} expenses for user {}", expenses.size(), authentication.getName());
        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long id, Authentication authentication) {
        expenseService.deleteExpense(id, authentication.getName());
        return ResponseEntity.ok("Expense deleted successfully.");
    }
}
