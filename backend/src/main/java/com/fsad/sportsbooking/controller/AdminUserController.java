package com.fsad.sportsbooking.controller;

import com.fsad.sportsbooking.model.User;
import com.fsad.sportsbooking.repository.UserRepository;
import com.fsad.sportsbooking.security.AuthenticatedUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminUserController {

    private final UserRepository repo;

    public AdminUserController(UserRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<User> getUsersByRole(
            @RequestParam String role,
            @AuthenticationPrincipal AuthenticatedUser auth
    ) {
        if (!auth.getRole().equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Access denied");
        }
        return repo.findAll()
                .stream()
                .filter(u -> !Objects.equals(u.getRole(), "ADMIN"))
                .toList();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(
            @PathVariable Long id,
            @AuthenticationPrincipal AuthenticatedUser auth
    ) {
        if (!auth.getRole().equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Access denied");
        }

        repo.deleteById(id);
    }
}
