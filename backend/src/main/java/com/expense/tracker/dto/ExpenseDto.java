package com.expense.tracker.dto;

import com.expense.tracker.entity.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDto {
    private Long id;
    private String title;
    private BigDecimal amount;
    private String category;
    private TransactionType type;
    private LocalDate date;
}
