const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 5000;

console.log("🚀 Khởi động API Gateway...");
console.log("---- TÔI LÀ CODE MỚI ----");

// --- ƯU TIÊN 1: Phim ---
app.use('/api/movies', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Gateway] 🎬 Chuyển hướng sang Movie Service: ${req.url}`);
    }
}));

// --- ƯU TIÊN 2: Đặt vé (Booking) - QUAN TRỌNG ---
// Phải đặt đoạn này TRƯỚC đoạn '/' bên dưới
app.use('/api/bookings', createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Gateway] 🎯 Bắt được đơn đặt vé! Đang gửi sang Port 5002...`);
    }
}));

// --- ƯU TIÊN CUỐI: Server Giao diện cũ ---
// Cái này hứng tất cả những gì còn lại, nên phải để CUỐI CÙNG
app.use('/', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true
}));

app.listen(PORT, () => {
    console.log(`🌐 API Gateway đang chạy tại http://localhost:${PORT}`);
});