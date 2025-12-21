package com.group06.movieweb.controller;

import com.group06.movieweb.model.Movie;
import com.group06.movieweb.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {
    @Autowired
    private MovieService service;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Movie movie) {
        try {
            return ResponseEntity.status(201).body(service.createMovie(movie));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Movie> getAll() {
        return service.getAllMovies();
    }
}