package com.expense.tracker.controller;

import com.expense.tracker.dto.GoalDto;
import com.expense.tracker.service.GoalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping
    public ResponseEntity<GoalDto> addGoal(@RequestBody GoalDto goalDto, Authentication authentication) {
        GoalDto saved = goalService.addGoal(goalDto, authentication.getName());
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GoalDto>> getGoals(Authentication authentication) {
        List<GoalDto> goals = goalService.getUserGoals(authentication.getName());
        return ResponseEntity.ok(goals);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GoalDto> updateGoal(@PathVariable Long id, @RequestBody GoalDto goalDto, Authentication authentication) {
        GoalDto updated = goalService.updateGoal(id, goalDto, authentication.getName());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGoal(@PathVariable Long id, Authentication authentication) {
        goalService.deleteGoal(id, authentication.getName());
        return ResponseEntity.ok("Goal deleted successfully.");
    }
}
