const movieRepo = require('../repositories/movieRepo');

const getMovies = () => {
    return movieRepo.getAll();
};

const getMovieById = (id) => {
    const movie = movieRepo.getById(id);
    if (!movie) {
        throw new Error("Không tìm thấy phim!");
    }
    return movie;
};

// Logic nghiệp vụ: Tạo phim mới nằm ở đây
const createMovie = (movieData) => {
    const { title, poster, duration, price } = movieData;

    // Validation cơ bản (Logic nghiệp vụ)
    if (!title || !price) {
        throw new Error("Tên phim và giá vé là bắt buộc!");
    }

    const newMovie = {
        id: Date.now(), // Tạo ID tự động
        title,
        poster,
        duration,
        price: parseInt(price),
        soldSeats: [] // Khởi tạo mảng ghế trống
    };

    movieRepo.save(newMovie);
    return newMovie;
};

module.exports = { getMovies, getMovieById, createMovie };