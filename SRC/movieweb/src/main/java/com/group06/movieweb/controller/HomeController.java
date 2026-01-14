package com.group06.movieweb.controller;

import com.group06.movieweb.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/")
    public String home(Model model) {
        // Lấy danh sách phim từ Database và gửi sang giao diện
        model.addAttribute("movies", movieService.getAllMovies());


        return "home";
    }
}