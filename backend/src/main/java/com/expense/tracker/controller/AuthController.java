package com.expense.tracker.controller;

import com.expense.tracker.dto.JwtAuthResponse;
import com.expense.tracker.dto.LoginDto;
import com.expense.tracker.dto.RegisterDto;
import com.expense.tracker.entity.User;
import com.expense.tracker.repository.UserRepository;
import com.expense.tracker.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        String token = authService.login(loginDto);
        User user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow();

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        jwtAuthResponse.setName(user.getName());
        jwtAuthResponse.setEmail(user.getEmail());

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
