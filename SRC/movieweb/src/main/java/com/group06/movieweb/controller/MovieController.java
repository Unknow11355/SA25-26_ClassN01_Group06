package com.group06.movieweb.controller;

import com.group06.movieweb.model.Movie;
import com.group06.movieweb.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    // API: Lấy danh sách phim (Cho trang chủ)
    // GET: http://localhost:9091/api/movies
    @GetMapping
    public List<Movie> getMovies() {
        return movieService.getAllMovies();
    }

    // API: Thêm phim mới (Cho Admin)
    // POST: http://localhost:9091/api/movies
    @PostMapping
    public Movie createMovie(@RequestBody Movie movie) {
        return movieService.addMovie(movie);
    }
    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String keyword) {
        return movieService.searchMovies(keyword);
    }
}