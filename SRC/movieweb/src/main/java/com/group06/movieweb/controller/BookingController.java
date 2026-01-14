package com.group06.movieweb.controller;

import com.group06.movieweb.dto.BookingRequest;
import com.group06.movieweb.model.Booking;
import com.group06.movieweb.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking bookTicket(@RequestBody BookingRequest request) {
        return bookingService.createBooking(request);
    }
}