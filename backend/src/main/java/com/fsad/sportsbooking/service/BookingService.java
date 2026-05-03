package com.fsad.sportsbooking.service;

import com.fsad.sportsbooking.exception.BookingException;
import com.fsad.sportsbooking.model.Booking;
import com.fsad.sportsbooking.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

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

    /**
     * Hour keys "06:00".."22:00" that overlap non-rejected bookings for this facility on this date.
     */
    public List<String> getBookedSlotStarts(String facilityName, LocalDate date) {
        LocalDateTime dayStart = date.atStartOfDay();
        LocalDateTime dayEnd = date.plusDays(1).atStartOfDay();
        List<Booking> bookings = repository.findByFacilityNameAndStartTimeLessThanAndEndTimeGreaterThan(
                facilityName, dayEnd, dayStart);

        Set<String> booked = new LinkedHashSet<>();
        for (Booking b : bookings) {
            if ("REJECTED".equals(b.getStatus())) {
                continue;
            }
            LocalDateTime s = b.getStartTime();
            LocalDateTime e = b.getEndTime();
            if (s == null || e == null) {
                continue;
            }
            for (int h = 6; h <= 22; h++) {
                LocalDateTime slotStart = date.atTime(h, 0);
                LocalDateTime slotEnd = date.atTime(h + 1, 0);
                if (slotStart.isBefore(e) && slotEnd.isAfter(s)) {
                    booked.add(String.format("%02d:00", h));
                }
            }
        }
        return new ArrayList<>(booked);
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