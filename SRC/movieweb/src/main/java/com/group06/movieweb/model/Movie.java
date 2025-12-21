package com.group06.movieweb.model;

public class Movie {
    private String id;
    private String title;
    private String genre;
    private double price;
    private boolean isPremium;

    public Movie() {
    }

    public Movie(String id, String title, String genre, double price, boolean isPremium) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.price = price;
        this.isPremium = isPremium;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public boolean isPremium() { return isPremium; }
    public void setPremium(boolean isPremium) { this.isPremium = isPremium; }
}