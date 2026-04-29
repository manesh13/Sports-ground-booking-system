package com.fsad.sportsbooking.controller;

import com.fsad.sportsbooking.model.User;
import com.fsad.sportsbooking.model.UserRole;
import com.fsad.sportsbooking.repository.UserRepository;
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

    /* =========================
       ADMIN: Get users by role
       ========================= */
    @GetMapping
    public List<User> getUsersByRole(
            @RequestParam String role,
            @RequestHeader("Role") String requesterRole
    ) {
        if (!requesterRole.equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Access denied");
        }
        return repo.findAll()
                .stream()
                .filter(u -> !Objects.equals(u.getRole(), UserRole.ADMIN.toString()))
                .toList();

    }

    /* =========================
       ADMIN: Delete user
       ========================= */
    @DeleteMapping("/{id}")
    public void deleteUser(
            @PathVariable Long id,
            @RequestHeader("Role") String requesterRole
    ) {
        if (!requesterRole.equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Access denied");
        }

        repo.deleteById(id);
    }
}