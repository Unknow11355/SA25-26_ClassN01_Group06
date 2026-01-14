package com.group06.movieweb.controller;

import com.group06.movieweb.dto.ShowtimeRequest;
import com.group06.movieweb.model.Movie;
import com.group06.movieweb.model.Showtime;
import com.group06.movieweb.repository.MovieRepository;
import com.group06.movieweb.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
public class ShowtimeController {

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private MovieRepository movieRepository;

    // API tạo suất chiếu mới
    @PostMapping
    public Showtime createShowtime(@RequestBody ShowtimeRequest request) {
        // 1. Tìm phim dựa trên ID gửi lên
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        // 2. Tạo suất chiếu
        Showtime showtime = new Showtime();
        showtime.setMovie(movie); // Liên kết phim
        showtime.setRoomId(request.getRoomId());
        showtime.setStartTime(request.getStartTime());
        showtime.setTicketPrice(request.getTicketPrice());

        return showtimeRepository.save(showtime);
    }

    // API lấy danh sách suất chiếu
    @GetMapping
    public List<Showtime> getAllShowtimes() {
        return showtimeRepository.findAll();
    }
}