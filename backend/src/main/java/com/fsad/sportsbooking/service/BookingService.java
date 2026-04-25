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

    public List<Booking> getBookingsByCitizen(String citizenName) {
        return repository.findByCitizenName(citizenName);
    }


    public Booking createBooking(Booking booking) {

        boolean overlap = repository
                .existsByFacilityIdAndStartTimeLessThanAndEndTimeGreaterThan(
                        booking.getFacilityId(),
                        booking.getEndTime(),
                        booking.getStartTime()
                );

        if (overlap) {
            throw new BookingException("Time slot already booked");
        }

        booking.setStatus("REQUESTED");
        return repository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return repository.findAll();
    }

    public Booking approve(Long id) {
        Booking booking = repository.findById(id)
                .orElseThrow(() -> new BookingException("Booking not found"));
        booking.setStatus("APPROVED");
        return repository.save(booking);
    }

    public Booking reject(Long id) {
        Booking booking = repository.findById(id)
                .orElseThrow(() -> new BookingException("Booking not found"));
        booking.setStatus("REJECTED");
        return repository.save(booking);
    }
}