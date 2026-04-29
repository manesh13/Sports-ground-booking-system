package com.fsad.sportsbooking.repository;

import com.fsad.sportsbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserEmail(String userEmail);

    boolean existsByFacilityNameAndStartTimeLessThanAndEndTimeGreaterThan(
            String facilityName,
            LocalDateTime endTime,
            LocalDateTime startTime
    );
}