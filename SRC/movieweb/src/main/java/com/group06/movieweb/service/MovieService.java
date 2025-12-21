package com.group06.movieweb.service;

import com.group06.movieweb.model.Movie;
import com.group06.movieweb.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MovieService {
    private final MovieRepository repo;

    @Autowired
    public MovieService(MovieRepository repo) {
        this.repo = repo;
    }

    public Movie createMovie(Movie movie) {
        if (movie.getTitle() == null || movie.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Tên phim không được để trống");
        }
        return repo.save(movie);
    }

    public List<Movie> getAllMovies() {
        return repo.findAll();
    }

    public Movie getMovieDetail(String id) {
        Movie m = repo.findById(id);
        if (m == null) throw new RuntimeException("Không tìm thấy phim");
        return m;
    }
}