package com.guru.hall_booking.controller;

import com.guru.hall_booking.model.Booking;
import com.guru.hall_booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public Booking bookEvent(@RequestBody Booking booking) {
        booking.setBookingDate(LocalDate.now());
        booking.setActive(true);
        return bookingService.bookEvent(booking);
    }

    @GetMapping("/active")
    public List<Booking> getActiveBookings() {
        return bookingService.getActiveBookings();
    }

    @GetMapping("/range")
    public List<Booking> getBookingsByDateRange(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
        return bookingService.getBookingsByDateRange(startDate, endDate);
    }

    @PostMapping("/cancel/{date}")
    public void cancelBooking(@PathVariable LocalDate date) {
        bookingService.cancelBooking(date);
    }
}
