const express = require('express');
const app = express();
const cors = require('cors');
const bookingRoutes = require('./src/routes/bookingRoutes');
const PORT = 5002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[Booking Service 5002] 🔔 Nhận yêu cầu: ${req.method} ${req.url}`);
    next();
});


app.use('/', bookingRoutes);

app.listen(PORT, () => {
    console.log(`🎫 Booking Service đang chạy tại http://localhost:${PORT}`);
});