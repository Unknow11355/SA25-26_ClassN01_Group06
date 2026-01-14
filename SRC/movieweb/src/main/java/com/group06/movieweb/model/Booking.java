package com.group06.movieweb.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // THAY ĐỔI: Liên kết Object thay vì String ID
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "showtime_id", nullable = false)
    private Showtime showtime;

    private String seatNumbers; // Vẫn giữ String cho đơn giản, nhưng cần validate kỹ
    private double totalPrice;
    private LocalDateTime bookingTime;

    // THAY ĐỔI: Dùng Enum cho an toàn
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    public Booking() {}

    // Constructor cập nhật
    public Booking(User user, Showtime showtime, String seatNumbers, double totalPrice) {
        this.user = user;
        this.showtime = showtime;
        this.seatNumbers = seatNumbers;
        this.totalPrice = totalPrice;
        this.bookingTime = LocalDateTime.now();
        this.status = BookingStatus.CONFIRMED;
    }

    // Getters & Setters
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Showtime getShowtime() { return showtime; }
    public void setShowtime(Showtime showtime) { this.showtime = showtime; }
    public String getSeatNumbers() { return seatNumbers; }
    public void setSeatNumbers(String seatNumbers) { this.seatNumbers = seatNumbers; }
    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
}

// Tạo thêm enum status
enum BookingStatus {
    PENDING, CONFIRMED, CANCELLED
}