package com.guru.hall_booking.service;

import com.guru.hall_booking.model.Booking;
import com.guru.hall_booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Booking bookEvent(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getActiveBookings() {
        return bookingRepository.findByActive(true);
    }

    public List<Booking> getBookingsByDateRange(LocalDate startDate, LocalDate endDate) {
        return bookingRepository.findByDateBetween(startDate, endDate);
    }

    public void cancelBooking(LocalDate date) {
        Booking booking = bookingRepository.findById(date).orElseThrow();
        booking.setActive(false);
        bookingRepository.save(booking);
    }
}
