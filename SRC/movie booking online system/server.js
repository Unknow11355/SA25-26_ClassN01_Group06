const express = require('express');
const path = require('path');
const fs = require('fs');
// Thêm thư viện để chuyển tiếp yêu cầu API
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

// ĐƯỜNG DẪN FILE DỮ LIỆU
const FILE_USERS = path.join(__dirname, 'data', 'users.json');

// --- CẤU HÌNH PROXY TRUNG GIAN ---
// Tự động gửi yêu cầu Phim và Đặt vé sang API Gateway (Cổng 5000)
app.use(['/api/movies', '/api/booking'], createProxyMiddleware({ 
    target: 'http://localhost:5000', 
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        console.log(`[Proxy]: Chuyển tiếp yêu cầu ${req.url} tới cổng 5000`);
    }
}));

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- HÀM HỖ TRỢ ---
function readData(filePath) {
    try { return JSON.parse(fs.readFileSync(filePath)); } catch (e) { return []; }
}
function writeData(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// --- API ROUTES LOCAL (Xử lý tại 3000) ---

// 1. ĐĂNG NHẬP / ĐĂNG KÝ
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = readData(FILE_USERS);
    const user = users.find(u => u.username === username && u.password === password);
    if (user) res.json({ success: true, user });
    else res.json({ success: false, message: "Sai tài khoản hoặc mật khẩu!" });
});

app.post('/api/register', (req, res) => {
    const { username, password, fullName, phone } = req.body;
    const users = readData(FILE_USERS);
    if (users.find(u => u.username === username)) return res.json({ success: false, message: "Tên đăng nhập đã tồn tại" });

    users.push({ username, password, fullName, phone, role: 'user' });
    writeData(FILE_USERS, users);
    res.json({ success: true });
});

// 2. ADMIN: LẤY DANH SÁCH USER
app.get('/api/users', (req, res) => {
    const users = readData(FILE_USERS);
    const safeUsers = users.map(u => ({ username: u.username, fullName: u.fullName, role: u.role, phone: u.phone }));
    res.json(safeUsers);
});

// --- ROUTES HTML (PHỤC VỤ GIAO DIỆN) ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/movies', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/schedule', (req, res) => res.sendFile(path.join(__dirname, 'public', 'schedule.html')));
app.get('/news', (req, res) => res.sendFile(path.join(__dirname, 'public', 'news.html')));
app.get('/booking', (req, res) => res.sendFile(path.join(__dirname, 'public', 'booking.html')));

// Sửa lỗi khi load lại trang
app.get(/.*/, (req, res) => {
    if (req.url.startsWith('/api')) return res.status(404).json({ error: "API không tồn tại" });
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`=================================================`);
    console.log(`🌐 FRONTEND ĐANG CHẠY: http://localhost:${port}`);
    console.log(`➡ KẾT NỐI DỮ LIỆU QUA: http://localhost:5000`);
    console.log(`=================================================`);
});