package com.group06.movieweb.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    private String id;
    private String title;
    private String director;
    private int duration;
    private String description;

    public Movie() {
    }

    public Movie(String id, String title, String director, int duration, String description) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.duration = duration;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}