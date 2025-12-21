package com.group06.movieweb.repository;

import com.group06.movieweb.model.Movie;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class MovieRepository {
    private Map<String, Movie> movieDb = new HashMap<>();
    private int nextId = 1;

    public Movie save(Movie movie) {
        String newId = String.valueOf(nextId++);
        movie.setId(newId);
        movieDb.put(newId, movie);
        return movie;
    }

    public List<Movie> findAll() {
        return new ArrayList<>(movieDb.values());
    }

    public Movie findById(String id) {
        return movieDb.get(id);
    }
}