// --- 1. BIẾN TOÀN CỤC ---
let TICKET_PRICE = 50000;
let currentBooking = {
    seats: [],
    totalPrice: 0
};
let requestData = {};
let soldSeatsDatabase = {};

// --- 2. KHI TRANG LOAD XONG ---
document.addEventListener("DOMContentLoaded", function() {
    initPage();
});

function initPage() {
    console.log("Trang đã tải xong...");
    checkLoginStatus();
    loadBookingInfo();
    loadSoldSeatsData();
    renderSeatMap();
    startTimer(600); // 10 phút đếm ngược
}

// --- 3. CÁC HÀM XỬ LÝ CHÍNH ---

// Tải thông tin User
function checkLoginStatus() {
    const userJson = localStorage.getItem('currentUser');
    const userDisplay = document.getElementById('user-display');
    if (userDisplay && userJson) {
        const user = JSON.parse(userJson);
        // Hiển thị tên user lên header
        userDisplay.innerHTML = `Xin chào: <strong>${user.fullName || user.username}</strong>`;
    }
}

// Tải thông tin phim (được gửi từ trang chọn phim)
function loadBookingInfo() {
    const data = localStorage.getItem('bookingRequest');
    if (!data) {
        alert("Dữ liệu đặt vé không tồn tại. Vui lòng quay lại trang chủ!");
        window.location.href = "index.html";
        return;
    }
    requestData = JSON.parse(data);

    // Cập nhật giá vé nếu có
    if(requestData.price) TICKET_PRICE = parseInt(requestData.price);

    // Điền dữ liệu vào giao diện (Safe Set Text)
    setText('m-name', requestData.movieName);
    setText('breadcrumb-movie', requestData.movieName);
    setText('m-cinema', requestData.cinema);
    setText('m-date', requestData.date);
    setText('m-time', requestData.time);
    setText('m-genre', requestData.genre);
    setText('m-duration', requestData.duration);

    const posterEl = document.getElementById('m-poster');
    if (posterEl && requestData.poster) {
        posterEl.src = requestData.poster;
    }
}

function setText(id, text) {
    const el = document.getElementById(id);
    if(el) el.innerText = text || "...";
}

// Tải Database ghế đã bán
function loadSoldSeatsData() {
    const db = localStorage.getItem('soldSeatsDB');
    if (db) {
        soldSeatsDatabase = JSON.parse(db);
    } else {
        soldSeatsDatabase = {};
    }
}

// Vẽ sơ đồ ghế
function renderSeatMap() {
    const container = document.getElementById('seat-grid-container');
    if(!container) return;
    container.innerHTML = "";

    // Lấy danh sách ghế đã bán của suất chiếu này
    const currentSessionID = requestData.sessionID || "default_session";
    const soldSeatsOfThisSession = soldSeatsDatabase[currentSessionID] || [];

    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];

    rows.forEach(rowName => {
        const rowDiv = document.createElement('div');
        rowDiv.className = "seat-row";

        for (let i = 1; i <= 12; i++) {
            const seatId = rowName + i;
            const seatDiv = document.createElement('div');
            seatDiv.className = "seat";
            seatDiv.innerText = seatId;

            // Kiểm tra ghế đã bán chưa
            if (soldSeatsOfThisSession.includes(seatId)) {
                seatDiv.classList.add("sold");
            } else {
                seatDiv.onclick = function() { toggleSeat(this, seatId); };
            }

            rowDiv.appendChild(seatDiv);
        }
        container.appendChild(rowDiv);
    });
}

// Xử lý chọn ghế
function toggleSeat(el, seatId) {
    if (el.classList.contains('sold')) return;

    if (el.classList.contains('selected')) {
        // Bỏ chọn
        el.classList.remove('selected');
        currentBooking.seats = currentBooking.seats.filter(s => s !== seatId);
    } else {
        // Chọn mới
        if(currentBooking.seats.length >= 8) {
            alert("Bạn chỉ được chọn tối đa 8 ghế!");
            return;
        }
        el.classList.add('selected');
        currentBooking.seats.push(seatId);
    }
    updateSummary();
}

// Cập nhật hiển thị tổng tiền
function updateSummary() {
    const seatStr = currentBooking.seats.length > 0 ? currentBooking.seats.join(', ') : "...";
    setText('m-seats', seatStr);

    currentBooking.totalPrice = currentBooking.seats.length * TICKET_PRICE;
    setText('display-total', currentBooking.totalPrice.toLocaleString('vi-VN') + " đ");
}

// --- 4. HÀM THANH TOÁN VÀ QR ĐỘNG (QUAN TRỌNG) ---

// Các thông số của bạn để tạo QR
const MY_BANK_ID = "MBbank"; 
const MY_ACCOUNT_NO = "0563146929"; 
const ACCOUNT_NAME = "NGUYEN ĐINH QUYEN"; 

function handlePayment() {
    // 1. Kiểm tra ghế
    if (currentBooking.seats.length === 0) {
        alert("Vui lòng chọn ghế trước khi tiếp tục!");
        return;
    }

    // 2. Kiểm tra đăng nhập
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
        alert("Bạn vui lòng đăng nhập để thanh toán!");
        window.location.href = "login.html"; 
        return;
    }

    try {
        // 3. Hiển thị Modal Bước 1 (Chọn phương thức)
        const modal = document.getElementById('payment-modal');
        const totalEl = document.getElementById('modal-total');
        const contentEl = document.getElementById('modal-content-text');

        if (!modal || !totalEl || !contentEl) {
            throw new Error("Thiếu ID trong HTML (payment-modal, vv...)");
        }

        const movieName = requestData.movieName || "Phim đang chọn";
        const seatString = currentBooking.seats.join(', ');
        const priceString = currentBooking.totalPrice.toLocaleString('vi-VN') + " đ";

        // Cập nhật thông tin text để hàm QR lấy dữ liệu
        totalEl.innerText = priceString;
        contentEl.innerText = `Phim: ${movieName} | Ghế: ${seatString} | Suất: ${requestData.time} - ${requestData.date}`;

        // Reset về màn hình chọn phương thức mỗi lần mở lại
        document.getElementById('step-choose-method').style.display = "block";
        document.getElementById('step-show-qr').style.display = "none";
        const radios = document.querySelectorAll('input[name="pay-method"]');
        radios.forEach(radio => radio.checked = false);

        modal.style.display = "flex";

    } catch (e) {
        alert("Lỗi hệ thống: " + e.message);
        console.error(e);
    }
}

// Hàm sinh mã QR khi bấm chọn ngân hàng/momo/vnpay
function generateQR(method) {
    document.getElementById('step-choose-method').style.display = 'none';
    document.getElementById('step-show-qr').style.display = 'block';

    const qrImage = document.getElementById('dynamic-qr-image');
    const amount = currentBooking.totalPrice; 
    
    let movieName = requestData.movieName || "Ve phim";
    let paymentContent = "Thanh toan ve " + movieName.replace(/[^a-zA-Z0-9 ]/g, "").substring(0, 15);

    if (method === 'bank') {
        // CÁCH 1: Vẫn giữ mã QR tự động tính tiền của VietQR (Rất xịn, khuyên dùng)
        qrImage.src = "images/qr.jpg";
        
        // CÁCH 2: Nếu bạn muốn dùng ảnh tĩnh tải về máy giống MoMo thì xóa dòng trên, dùng dòng dưới:
        // qrImage.src = "images/qr-bank.jpg";
        
    } else if (method === 'momo') {
        // TRỎ VÀO ẢNH MOMO CỦA BẠN TRONG THƯ MỤC IMAGES
        qrImage.src = "images/qr-momo.jpg"; 
        
    } else if (method === 'vnpay') {
        // TRỎ VÀO ẢNH VNPAY CỦA BẠN TRONG THƯ MỤC IMAGES
        qrImage.src = "images/qr-vnpay.jpg";
    }
}

// Nút quay lại chọn cách khác
function backToMethods() {
    document.getElementById('step-choose-method').style.display = "block";
    document.getElementById('step-show-qr').style.display = "none";
    const radios = document.querySelectorAll('input[name="pay-method"]');
    radios.forEach(radio => radio.checked = false);
}

function closeModal() {
    const modal = document.getElementById('payment-modal');
    if(modal) modal.style.display = "none";
}

// --- 5. XÁC NHẬN THANH TOÁN THÀNH CÔNG ---
function confirmPaymentSuccess() {
    const btn = document.getElementById('btn-confirm-pay');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    btn.style.backgroundColor = "#888";

    // Mô phỏng độ trễ 2 giây
    setTimeout(() => {
        const userJson = localStorage.getItem('currentUser');
        const user = userJson ? JSON.parse(userJson) : { email: "test@gmail.com", username: "Guest" };

        const bookingPayload = {
            movieId: requestData.movieId || requestData.id || 1,
            seats: currentBooking.seats,
            userEmail: user.email || "test@gmail.com"
        };

        // Gửi về Backend
        fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingPayload)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Server đã nhận:", data);
            processLocalDataAndRedirect(user);
        })
        .catch(err => {
            console.error("Lỗi Server (Bỏ qua để test nội bộ):", err);
            processLocalDataAndRedirect(user);
        });
    }, 2000);
}

// Tách hàm lưu cục bộ cho gọn
function processLocalDataAndRedirect(user) {
    const currentSessionID = requestData.sessionID || "default_session";
    let soldList = soldSeatsDatabase[currentSessionID] || [];
    soldList = [...soldList, ...currentBooking.seats];
    soldSeatsDatabase[currentSessionID] = soldList;
    localStorage.setItem('soldSeatsDB', JSON.stringify(soldSeatsDatabase));

    const newTicket = {
        id: Date.now(),
        username: user.username,
        movieName: requestData.movieName,
        cinema: requestData.cinema,
        time: requestData.time,
        date: requestData.date,
        seats: currentBooking.seats.join(', '),
        totalPrice: currentBooking.totalPrice.toLocaleString('vi-VN') + " đ",
        bookingDate: new Date().toLocaleDateString('vi-VN')
    };

    let history = JSON.parse(localStorage.getItem('beta_booking_history')) || [];
    history.push(newTicket);
    localStorage.setItem('beta_booking_history', JSON.stringify(history));

    closeModal();
    alert("🎉 THANH TOÁN THÀNH CÔNG!\nCảm ơn bạn. Mã vé sẽ được gửi vào Email.");
    
    localStorage.removeItem('bookingRequest');
    window.location.href = "profile.html";
}

// --- 6. HÀM ĐẾM NGƯỢC THỜI GIAN ---
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const display = document.getElementById('timer');
    if(!display) return; 

    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            alert("Hết thời gian giữ ghế! Trang sẽ tải lại.");
            location.reload();
        }
    }, 1000);
}