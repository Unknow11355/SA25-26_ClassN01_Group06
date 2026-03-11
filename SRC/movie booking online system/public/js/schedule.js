// ============================================================
// DỮ LIỆU PHIM (Cập nhật đúng theo ảnh bạn gửi)
// ============================================================
const moviesDB = [
    {
        id: 1,
        name: "Kumanthong Đài Loan: Oán Thai Đòi Mẹ",
        // Bạn hãy thay link ảnh poster thật vào đây
        image: "images/ku.jpg", 
        age: "T18", 
        genre: "Kinh dị", 
        duration: "109 phút",
        formats: [
            { 
                type: "2D PHỤ ĐỀ", 
                times: ["11:00", "13:00", "16:00", "18:00", "20:00", "22:00"] 
            }
        ]
    },
    {
        id: 2,
        name: "Nhà Trấn Quỷ",
        image: "images/nha.jpg", // Link minh họa
        age: "T18", 
        genre: "Kinh dị", 
        duration: "117 phút",
        formats: [
            { 
                type: "2D PHỤ ĐỀ", 
                times: ["08:45", "14:00", "17:10", "21:30"] 
            }
        ]
    },
    {
        id: 3,
        name: "Tiểu Yêu Quái Núi Lãng Lãng",
        image: "images/yeu.jpg", // Link minh họa
        age: "P", 
        genre: "Hoạt hình", 
        duration: "118 phút",
        formats: [
            { 
                type: "2D LỒNG TIẾNG", 
                times: ["09:30", "15:00", "19:15"] 
            }
        ]
    }
];

// BIẾN LƯU TRẠNG THÁI
let bookingState = {
    date: "",
    movieName: "",
    time: ""
};

// ============================================================
// HÀM 1: VẼ THANH NGÀY (DATE TABS)
// ============================================================
function renderDateTabs() {
    const container = document.getElementById('date-tabs-list');
    if (!container) return;

    // Giả lập ngày bắt đầu là 07/02 (như trong ảnh)
    const startDate = new Date(); 
    // Nếu muốn chính xác ngày trong ảnh thì dùng dòng dưới (năm/tháng-1/ngày)
    // const startDate = new Date(2026, 1, 7); 
    
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    
    let html = '';
    for (let i = 0; i < 7; i++) { 
        let d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        
        let dayName = days[d.getDay()];
        let dateNum = d.getDate().toString().padStart(2, '0'); // Thêm số 0 đằng trước nếu < 10
        let fullDate = `${dateNum}/${d.getMonth() + 1}/${d.getFullYear()}`;

        // Active ngày đầu tiên
        let activeClass = (i === 0) ? 'active' : '';
        if(i === 0) bookingState.date = fullDate;

        html += `
            <div class="date-item ${activeClass}" onclick="selectDate(this, '${fullDate}')">
                <span class="date-number">${dateNum}</span>
                <span class="date-day">${dayName}</span>
            </div>
        `;
    }
    container.innerHTML = html;
}

// Xử lý khi bấm chọn ngày
function selectDate(element, dateStr) {
    document.querySelectorAll('.date-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    bookingState.date = dateStr;
    console.log("Đã chọn ngày:", bookingState.date);
}

// ============================================================
// HÀM 2: VẼ DANH SÁCH PHIM
// ============================================================
function renderMovies() {
    const container = document.getElementById('schedule-movie-list');
    if (!container) return;
    
    let html = '';

    moviesDB.forEach(movie => {
        let formatHtml = '';
        
        movie.formats.forEach(fmt => {
            let btns = '';
            fmt.times.forEach(time => {
                // Kiểm tra suất chiếu muộn (sau 22h) để đổi màu nếu cần
                let isLate = (parseInt(time.split(':')[0]) >= 22) ? 'late-show' : '';
                
                btns += `<button class="time-btn ${isLate}" onclick="openModal('${movie.name}', '${time}')">${time}</button>`;
            });

            formatHtml += `
                <div class="format-group">
                    <span class="format-label">${fmt.type}</span>
                    <div class="time-list">${btns}</div>
                </div>
            `;
        });

        html += `
            <div class="movie-item">
                <div class="movie-poster">
                    <img src="${movie.image}" alt="${movie.name}" onerror="this.src='https://via.placeholder.com/150x220?text=Poster'">
                    <span class="age-tag ${movie.age}">${movie.age}</span>
                </div>
                <div class="movie-info">
                    <h3 class="movie-name">${movie.name}</h3>
                    <div class="movie-detail">
                        <span><i class="fas fa-film"></i> ${movie.genre}</span>
                        <span><i class="fas fa-clock"></i> ${movie.duration}</span>
                    </div>
                    ${formatHtml}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============================================================
// HÀM 3: XỬ LÝ POPUP (MODAL)
// ============================================================
const modal = document.getElementById('booking-modal');
const closeBtn = document.querySelector('.close-btn');

function openModal(movieName, time) {
    bookingState.movieName = movieName;
    bookingState.time = time;

    // Cập nhật thông tin lên Popup
    document.getElementById('popup-movie-name').innerText = movieName;
    document.getElementById('popup-date').innerText = bookingState.date;
    document.getElementById('popup-time').innerText = time;

    // Hiện Modal
    if (modal) modal.style.display = 'flex';
}

// Đóng Modal
if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
}

// Đóng khi click ra ngoài
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Xử lý nút Đồng Ý
const confirmBtn = document.getElementById('btn-confirm-booking');
if (confirmBtn) {
    confirmBtn.onclick = function() {
        // Chuyển hướng sang trang chọn ghế (ví dụ booking.html)
        // window.location.href = `booking.html?movie=${bookingState.movieName}&time=${bookingState.time}`;
        alert(`Bạn đang đặt vé:\nPhim: ${bookingState.movieName}\nSuất: ${bookingState.time}\nNgày: ${bookingState.date}`);
    }
}

// CHẠY KHI TRANG LOAD
document.addEventListener('DOMContentLoaded', () => {
    renderDateTabs();
    renderMovies();
});