const movieService = require('../services/movieService');

const listMovies = (req, res) => {
    try {
        const movies = movieService.getMovies();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDetail = (req, res) => {
    try {
        const movie = movieService.getMovieById(req.params.id);
        res.json(movie);
    } catch (err) {
        // Trả về 404 nếu Service báo lỗi không tìm thấy
        res.status(404).json({ error: err.message });
    }
};

const addMovie = (req, res) => {
    try {
        // Controller chỉ nhận dữ liệu và chuyển cho Service xử lý
        const newMovie = movieService.createMovie(req.body);
        res.json({ message: "Thêm phim thành công!", movie: newMovie });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { listMovies, getDetail, addMovie };