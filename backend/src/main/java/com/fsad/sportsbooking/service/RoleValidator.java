package com.fsad.sportsbooking.service;


import com.fsad.sportsbooking.exception.BookingException;
import com.fsad.sportsbooking.model.UserRole;

public class RoleValidator {

    public static void requireRole(String roleHeader, UserRole requiredRole) {

        if (roleHeader == null) {
            throw new BookingException("Role header is required");
        }

        UserRole actualRole;
        try {
            actualRole = UserRole.valueOf(roleHeader);
        } catch (IllegalArgumentException ex) {
            throw new BookingException("Invalid role: " + roleHeader);
        }

        if (actualRole != requiredRole) {
            throw new BookingException(
                    "Access denied. Required role: " + requiredRole
            );
        }
    }
}
