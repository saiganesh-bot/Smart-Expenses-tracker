package com.expense.tracker.service;

import com.expense.tracker.dto.GoalDto;
import com.expense.tracker.entity.Goal;
import com.expense.tracker.entity.User;
import com.expense.tracker.repository.GoalRepository;
import com.expense.tracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalService(GoalRepository goalRepository, UserRepository userRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    public GoalDto addGoal(GoalDto goalDto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Goal goal = Goal.builder()
                .user(user)
                .name(goalDto.getName())
                .targetAmount(goalDto.getTargetAmount())
                .currentAmount(goalDto.getCurrentAmount())
                .monthlyOverride(goalDto.getMonthlyOverride())
                .build();
        Goal saved = goalRepository.save(goal);
        return mapToDto(saved);
    }

    public List<GoalDto> getUserGoals(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        List<Goal> goals = goalRepository.findByUser(user);
        return goals.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public GoalDto updateGoal(Long id, GoalDto goalDto, String email) {
        Goal goal = goalRepository.findById(id).orElseThrow();
        User user = userRepository.findByEmail(email).orElseThrow();

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update this goal");
        }

        goal.setName(goalDto.getName());
        goal.setTargetAmount(goalDto.getTargetAmount());
        goal.setMonthlyOverride(goalDto.getMonthlyOverride());
        if (goalDto.getCurrentAmount() != null) {
            goal.setCurrentAmount(goalDto.getCurrentAmount());
        }

        Goal updated = goalRepository.save(goal);
        return mapToDto(updated);
    }

    public void deleteGoal(Long id, String email) {
        Goal goal = goalRepository.findById(id).orElseThrow();
        User user = userRepository.findByEmail(email).orElseThrow();

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this goal");
        }

        goalRepository.deleteById(id);
    }

    private GoalDto mapToDto(Goal goal) {
        return GoalDto.builder()
                .id(goal.getId())
                .name(goal.getName())
                .targetAmount(goal.getTargetAmount())
                .currentAmount(goal.getCurrentAmount())
                .monthlyOverride(goal.getMonthlyOverride())
                .createdAt(goal.getCreatedAt())
                .build();
    }
}
