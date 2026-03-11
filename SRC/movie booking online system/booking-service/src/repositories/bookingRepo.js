const fs = require('fs');
const path = require('path');

// Trỏ vào thư mục data bên trong booking-service
const dbPath = path.join(__dirname, '../../data/bookings.json');

const getAll = () => {
    try {
        if (!fs.existsSync(dbPath)) return [];
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) { return []; }
};

const save = (bookings) => {
    fs.writeFileSync(dbPath, JSON.stringify(bookings, null, 2));
};

module.exports = { getAll, save };