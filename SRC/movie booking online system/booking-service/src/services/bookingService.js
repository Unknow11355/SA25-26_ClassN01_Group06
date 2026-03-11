const bookingRepo = require('../repositories/bookingRepo'); 

// --- ĐOẠN CODE GIẢ LẬP RABBITMQ (QUAN TRỌNG) ---
// Đã xóa bỏ amqplib để không bị lỗi kết nối
async function publishToQueue(eventMsg) {
    console.log("\n===================================================");
    console.log(`[Giả lập RabbitMQ] 🚀 Đã nhận yêu cầu gửi sự kiện!`);
    console.log(`---------------------------------------------------`);
    console.log(`📩 Loại sự kiện: ${eventMsg.event_type}`);
    console.log(`🎫 Mã đặt vé   : ${eventMsg.bookingId}`);
    console.log(`🎬 Phim ID     : ${eventMsg.movieId}`);
    console.log(`💺 Ghế đặt     : ${JSON.stringify(eventMsg.seats)}`);
    console.log(`📧 Gửi tới     : ${eventMsg.email}`);
    console.log("===================================================\n");
}

// --- LOGIC NGHIỆP VỤ ---

const getBookedSeats = (movieId) => {
    const allBookings = bookingRepo.getAll();
    const movieBookings = allBookings.filter(b => b.movieId == movieId);

    let takenSeats = [];
    movieBookings.forEach(booking => {
        if(booking.seats && Array.isArray(booking.seats)) {
            takenSeats = takenSeats.concat(booking.seats);
        }
    });
    return takenSeats;
};

const createBooking = (movieId, newSeats) => {
    console.log("--> Đang xử lý đặt vé cho phim:", movieId);
    let allBookings = bookingRepo.getAll();

    // 1. Kiểm tra trùng ghế
    const currentTakenSeats = getBookedSeats(movieId);
    const isTaken = newSeats.some(seat => currentTakenSeats.includes(seat));
    if (isTaken) {
        throw new Error("Ghế này vừa có người đặt mất rồi!");
    }

    // 2. Tạo đơn hàng mới
    const newBooking = {
        id: Date.now(),
        movieId: movieId,
        seats: newSeats,
        date: new Date().toISOString(),
        status: "CONFIRMED"
    };

    // 3. Lưu vào file
    allBookings.push(newBooking);
    bookingRepo.save(allBookings);

    // 4. BẮN SỰ KIỆN GIẢ LẬP
    const event = {
        event_type: "ORDER_PLACED",
        bookingId: newBooking.id,
        seats: newSeats,
        movieId: movieId,
        email: "khachhang@demo.com"
    };

    publishToQueue(event);

    return newBooking;
};

module.exports = { getBookedSeats, createBooking };