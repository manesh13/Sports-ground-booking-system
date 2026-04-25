package com.fsad.sportsbooking.controller;

import com.fsad.sportsbooking.model.Booking;
import com.fsad.sportsbooking.model.UserRole;
import com.fsad.sportsbooking.service.BookingService;
import com.fsad.sportsbooking.service.RoleValidator;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    // ✅ CITIZEN can create booking
    @PostMapping
    public Booking createBooking(
            @RequestBody Booking booking,
            @RequestHeader("Role") String role
    ) {
        RoleValidator.requireRole(role, UserRole.CITIZEN);
        return service.createBooking(booking);
    }

    // ✅ MANAGER can view all bookings
    @GetMapping
    public List<Booking> getAllBookings(
            @RequestHeader("Role") String role
    ) {
        RoleValidator.requireRole(role, UserRole.MANAGER);
        return service.getAllBookings();
    }

    // ✅ MANAGER approves
    @PutMapping("/{id}/approve")
    public Booking approveBooking(
            @PathVariable Long id,
            @RequestHeader("Role") String role
    ) {
        RoleValidator.requireRole(role, UserRole.MANAGER);
        return service.approve(id);
    }

    // ✅ MANAGER rejects
    @PutMapping("/{id}/reject")
    public Booking rejectBooking(
            @PathVariable Long id,
            @RequestHeader("Role") String role
    ) {
        RoleValidator.requireRole(role, UserRole.MANAGER);
        return service.reject(id);
    }
}