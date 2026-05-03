package com.fsad.sportsbooking.config;

import com.fsad.sportsbooking.model.User;
import com.fsad.sportsbooking.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }
        seedUser("citizen@test.com", "pass", "CITIZEN");
        seedUser("manager@test.com", "pass", "MANAGER");
        seedUser("admin@test.com", "pass", "ADMIN");
    }

    private void seedUser(String email, String rawPassword, String role) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole(role);
        userRepository.save(user);
    }
}
