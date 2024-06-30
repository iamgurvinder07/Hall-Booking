package com.guru.hall_booking.repository;

import com.guru.hall_booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, LocalDate> {
    List<Booking> findByActive(boolean active);
    List<Booking> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
