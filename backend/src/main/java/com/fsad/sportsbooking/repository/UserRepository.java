package com.fsad.sportsbooking.repository;

import com.fsad.sportsbooking.model.User;
import com.fsad.sportsbooking.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByRoleIn(List<UserRole> roles);

    List<User> findByRole(UserRole role);
}