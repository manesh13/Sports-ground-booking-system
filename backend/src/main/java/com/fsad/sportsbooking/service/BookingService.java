package com.fsad.sportsbooking.service;

import com.fsad.sportsbooking.exception.BookingException;
import com.fsad.sportsbooking.model.Booking;
import com.fsad.sportsbooking.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Citizen creates booking
    public Booking createBooking(Booking booking) {

        boolean overlap =
                bookingRepository.existsByFacilityIdAndStartTimeLessThanAndEndTimeGreaterThan(
                        booking.getFacilityId(),
                        booking.getEndTime(),
                        booking.getStartTime()
                );

        if (overlap) {
            throw new BookingException("Time slot already booked");
        }

        booking.setStatus("REQUESTED");
        return bookingRepository.save(booking);
    }

    // Manager views all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Manager approves booking
    public Booking approve(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingException("Booking not found"));

        booking.setStatus("APPROVED");
        return bookingRepository.save(booking);
    }

    // Manager rejects booking
    public Booking reject(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingException("Booking not found"));

        booking.setStatus("REJECTED");
        return bookingRepository.save(booking);
    }
}