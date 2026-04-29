package com.fsad.sportsbooking.service;

import com.fsad.sportsbooking.exception.BookingException;
import com.fsad.sportsbooking.model.Booking;
import com.fsad.sportsbooking.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository repository;

    public BookingService(BookingRepository repository) {
        this.repository = repository;
    }

    public Booking createBooking(Booking booking, String userEmail) {

        boolean overlap =
                repository.existsByFacilityNameAndStartTimeLessThanAndEndTimeGreaterThan(
                        booking.getFacilityName(),
                        booking.getEndTime(),
                        booking.getStartTime()
                );

        if (overlap) {
            throw new BookingException("Time slot already booked");
        }

        booking.setUserEmail(userEmail);
        booking.setStatus("REQUESTED");

        return repository.save(booking);
    }

    public List<Booking> getMyBookings(String userEmail) {
        return repository.findByUserEmail(userEmail);
    }

    public List<Booking> getAllBookings() {
        return repository.findAll();
    }

    public Booking approve(Long id) {
        Booking b = repository.findById(id)
                .orElseThrow(() -> new BookingException("Not found"));
        b.setStatus("APPROVED");
        return repository.save(b);
    }

    public Booking reject(Long id) {
        Booking b = repository.findById(id)
                .orElseThrow(() -> new BookingException("Not found"));
        b.setStatus("REJECTED");
        return repository.save(b);
    }
}