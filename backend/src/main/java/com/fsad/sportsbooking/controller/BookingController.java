package com.fsad.sportsbooking.controller;

import com.fsad.sportsbooking.model.Booking;
import com.fsad.sportsbooking.model.UserRole;
import com.fsad.sportsbooking.security.AuthenticatedUser;
import com.fsad.sportsbooking.service.BookingService;
import com.fsad.sportsbooking.service.RoleValidator;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking create(
            @AuthenticationPrincipal AuthenticatedUser auth,
            @RequestBody Booking booking
    ) {
        RoleValidator.requireRole(auth.getRole(), UserRole.CITIZEN);
        return bookingService.createBooking(booking, auth.getEmail());
    }

    @GetMapping("/my")
    public List<Booking> myBookings(@AuthenticationPrincipal AuthenticatedUser auth) {
        RoleValidator.requireRole(auth.getRole(), UserRole.CITIZEN);
        return bookingService.getMyBookings(auth.getEmail());
    }

    @GetMapping("/occupancy")
    public List<String> occupancy(
            @RequestParam String facilityName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @AuthenticationPrincipal AuthenticatedUser auth
    ) {
        RoleValidator.requireRole(auth.getRole(), UserRole.CITIZEN);
        return bookingService.getBookedSlotStarts(facilityName, date);
    }

    @GetMapping
    public List<Booking> allBookings(@AuthenticationPrincipal AuthenticatedUser auth) {
        RoleValidator.requireRole(auth.getRole(), UserRole.MANAGER);
        return bookingService.getAllBookings();
    }

    @PutMapping("/{id}/approve")
    public Booking approve(
            @PathVariable Long id,
            @AuthenticationPrincipal AuthenticatedUser auth
    ) {
        RoleValidator.requireRole(auth.getRole(), UserRole.MANAGER);
        return bookingService.approve(id);
    }

    @PutMapping("/{id}/reject")
    public Booking reject(
            @PathVariable Long id,
            @AuthenticationPrincipal AuthenticatedUser auth
    ) {
        RoleValidator.requireRole(auth.getRole(), UserRole.MANAGER);
        return bookingService.reject(id);
    }
}
