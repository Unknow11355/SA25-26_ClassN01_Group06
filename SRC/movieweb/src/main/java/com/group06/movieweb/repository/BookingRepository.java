package com.group06.movieweb.repository;

import com.group06.movieweb.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {

    List<Booking> findByUserId(String userId);

    // Tìm tất cả vé của một suất chiếu cụ thể
    List<Booking> findByShowtimeId(String showtimeId);
}