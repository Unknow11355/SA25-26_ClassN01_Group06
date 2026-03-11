// FILE: movie-service/server.js
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const PORT = 5001; // Chạy Port 5001
const FILE_MOVIES = path.join(__dirname, 'data', 'movies.json');

app.use(cors());
app.use(express.json());

// Hàm đọc dữ liệu
const getMovies = () => {
    try {
        if (!fs.existsSync(FILE_MOVIES)) return [];
        return JSON.parse(fs.readFileSync(FILE_MOVIES, 'utf8'));
    } catch (e) { return []; }
};

// API: Lấy danh sách phim
app.get('/api/movies', (req, res) => {
    const movies = getMovies();
    res.json(movies);
});

// API: Lấy chi tiết 1 phim
app.get('/api/movies/:id', (req, res) => {
    const movies = getMovies();
    const movie = movies.find(m => m.id == req.params.id);
    if (movie) res.json(movie);
    else res.status(404).json({ message: "Không tìm thấy phim" });
});

app.listen(PORT, () => {
    console.log(`🎬 Movie Service đang chạy tại http://localhost:${PORT}`);
});