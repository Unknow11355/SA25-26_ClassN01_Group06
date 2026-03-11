const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/:movieId', bookingController.getTakenSeats);
router.post('/', bookingController.createBooking);

module.exports = router;