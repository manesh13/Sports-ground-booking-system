package com.fsad.sportsbooking.controller;

import com.fsad.sportsbooking.dto.AuthResponse;
import com.fsad.sportsbooking.dto.LoginRequest;
import com.fsad.sportsbooking.model.User;
import com.fsad.sportsbooking.security.JwtService;
import com.fsad.sportsbooking.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService service;
    private final JwtService jwtService;

    public UserController(UserService service, JwtService jwtService) {
        this.service = service;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        User user = service.login(request.email(), request.password());
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getRole());
    }
}
