package com.group06.movieweb.service;

import com.group06.movieweb.model.Movie;
import com.group06.movieweb.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    // 1. Lấy tất cả phim
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // 2. Thêm phim mới
    public Movie addMovie(Movie movie) {
        // Kiểm tra xem ID đã tồn tại chưa (đơn giản)
        if (movieRepository.existsById(movie.getId())) {
            throw new RuntimeException("Movie ID already exists!");
        }
        return movieRepository.save(movie);
    }

    // 3. Xóa phim (Thêm sau nếu cần)
    public void deleteMovie(String id) {
        movieRepository.deleteById(id);
    }
    public List<Movie> searchMovies(String keyword) {
        return movieRepository.findByTitleContainingIgnoreCase(keyword);
    }
}