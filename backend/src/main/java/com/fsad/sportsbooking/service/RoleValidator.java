package com.fsad.sportsbooking.service;

import com.fsad.sportsbooking.exception.BookingException;
import com.fsad.sportsbooking.model.UserRole;

public class RoleValidator {

    public static void requireRole(String role, UserRole expected) {

        if (role == null) {
            throw new BookingException("Role header missing");
        }

        UserRole actual;
        try {
            actual = UserRole.valueOf(role);
        } catch (IllegalArgumentException e) {
            throw new BookingException("Invalid role: " + role);
        }

        if (actual != expected) {
            throw new BookingException("Access denied");
        }
    }
}
