const fs = require('fs');
const path = require('path');

// Đảm bảo đường dẫn trỏ đúng vào thư mục data ngang hàng với src
const dbPath = path.join(__dirname, '../../data/movies.json');

const getAll = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) { return []; }
};

const getById = (id) => {
    const movies = getAll();
    // Chuyển id sang số để so sánh chính xác
    return movies.find(m => m.id === +id);
};

const save = (newMovie) => {
    const movies = getAll();
    movies.push(newMovie);
    fs.writeFileSync(dbPath, JSON.stringify(movies, null, 2));
};

module.exports = { getAll, getById, save };