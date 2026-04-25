package com.fsad.sportsbooking.repository;

import com.fsad.sportsbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    boolean existsByFacilityIdAndStartTimeLessThanAndEndTimeGreaterThan(
            Long facilityId,
            LocalDateTime endTime,
            LocalDateTime startTime
    );

    List<Booking> findByCitizenName(String citizenName);
}