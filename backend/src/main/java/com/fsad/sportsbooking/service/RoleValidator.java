package com.fsad.sportsbooking.service;

import com.fsad.sportsbooking.exception.BookingException;
import com.fsad.sportsbooking.model.UserRole;

public class RoleValidator {

    public static void requireRole(String role, UserRole expected) {

        if (role == null) {
            throw new BookingException("Authentication required");
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
