const bookingService = require('../services/bookingService');

const getTakenSeats = (req, res) => {
    try {
        const { movieId } = req.params;
        const seats = bookingService.getBookedSeats(movieId);
        res.json(seats);
    } catch (err) {
        res.json([]);
    }
};

const createBooking = (req, res) => {
    try {
        const { movieId, seats } = req.body;
        const booking = bookingService.createBooking(movieId, seats);
        // Trả về ngay lập tức (Async)
        res.json({ message: "Thành công", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getTakenSeats, createBooking };