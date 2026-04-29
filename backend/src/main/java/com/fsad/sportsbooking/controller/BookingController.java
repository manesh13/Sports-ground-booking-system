package com.fsad.sportsbooking.controller;

import com.fsad.sportsbooking.model.Booking;
import com.fsad.sportsbooking.model.UserRole;
import com.fsad.sportsbooking.service.BookingService;
import com.fsad.sportsbooking.service.RoleValidator;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    /* =========================
       CITIZEN: Create booking
       ========================= */
    @PostMapping
    public Booking create(
            @RequestHeader("User-Email") String userEmail,
            @RequestHeader("Role") String role,
            @RequestBody Booking booking
    ) {
        RoleValidator.requireRole(role, UserRole.CITIZEN);
        return bookingService.createBooking(booking, userEmail);
    }



    /* =========================
       CITIZEN: Own bookings
       ========================= */
    @GetMapping("/my")
    public List<Booking> myBookings(
            @RequestHeader("User-Email") String userEmail,
            @RequestHeader("Role") String role
    ) {
        RoleValidator.requireRole(role, UserRole.CITIZEN);
        return bookingService.getMyBookings(userEmail);
    }


    /* =========================
       MANAGER/ADMIN: All bookings
       ========================= */
    @GetMapping
    public List<Booking> allBookings(
            @RequestHeader("Role") String role
    ) {
        RoleValidator.requireRole(role, UserRole.MANAGER);
        return bookingService.getAllBookings();
    }

    /* =========================
       MANAGER: Approve
       ========================= */
    @PutMapping("/{id}/approve")
    public Booking approve(
            @PathVariable Long id,
            @RequestHeader("Role") String role
    ) {
        RoleValidator.requireRole(role, UserRole.MANAGER);
        return bookingService.approve(id);
    }

    /* =========================
       MANAGER: Reject
       ========================= */
    @PutMapping("/{id}/reject")
    public Booking reject(
            @PathVariable Long id,
            @RequestHeader("Role") String role
    ) {
        RoleValidator.requireRole(role, UserRole.MANAGER);
        return bookingService.reject(id);
    }
}