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

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @PostMapping
    public Booking create(@RequestBody Booking booking,
                          @RequestHeader("Role") String role) {
        RoleValidator.requireRole(role, UserRole.CITIZEN);
        return service.createBooking(booking);
    }

    @GetMapping
    public List<Booking> list(@RequestHeader("Role") String role) {
        RoleValidator.requireRole(role, UserRole.MANAGER);
        return service.getAllBookings();
    }

    @PutMapping("/{id}/approve")
    public Booking approve(@PathVariable Long id,
                           @RequestHeader("Role") String role) {
        RoleValidator.requireRole(role, UserRole.MANAGER);
        return service.approve(id);
    }

    @PutMapping("/{id}/reject")
    public Booking reject(@PathVariable Long id,
                          @RequestHeader("Role") String role) {
        RoleValidator.requireRole(role, UserRole.MANAGER);
        return service.reject(id);
    }


    @GetMapping("/my")
    public List<Booking> myBookings(
            @RequestHeader("Citizen-Name") String citizenName,
            @RequestHeader("Role") String role
    ) {
        RoleValidator.requireRole(role, UserRole.CITIZEN);
        return service.getBookingsByCitizen(citizenName);
    }


//    @DeleteMapping("/{id}")
//    public void delete(
//            @PathVariable Long id,
//            @RequestHeader("Role") String role
//    ) {
//        RoleValidator.requireRole(role, UserRole.MANAGER);
//        service.deleteById(id);
//    }
}