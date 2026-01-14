package com.group06.movieweb.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "showtimes")
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // THAY ĐỔI QUAN TRỌNG: Liên kết trực tiếp với Movie
    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @Column(nullable = false)
    private String roomId; // Có thể giữ String hoặc tạo Entity Room riêng

    @Column(nullable = false)
    private LocalDateTime startTime;

    private double ticketPrice;

    public Showtime() {}

    // Constructor, Getters, Setters cập nhật theo Movie object
    public Movie getMovie() { return movie; }
    public void setMovie(Movie movie) { this.movie = movie; }

    // ... Các getter/setter khác giữ nguyên
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getRoomId() { return roomId; }
    public void setRoomId(String roomId) { this.roomId = roomId; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public double getTicketPrice() { return ticketPrice; }
    public void setTicketPrice(double ticketPrice) { this.ticketPrice = ticketPrice; }
}