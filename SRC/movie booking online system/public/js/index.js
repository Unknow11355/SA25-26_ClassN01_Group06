/* --- 1. DỮ LIỆU PHIM (Đã thêm trailerUrl) --- */
const moviesData = [
    { "id": 1, "title": "Avatar: Dòng Chảy Của Nước", "price": 60000, "poster": "images/avatar2.jpg", "category": "Khoa học viễn tưởng", "duration": "192 phút", "limit": "T13", "isHot": true, "trailerUrl": "https://www.youtube.com/watch?v=gq2xKJXYZ80" },
    { "id": 2, "title": "Nhà Bà Nữ", "price": 55000, "poster": "images/nhabanu.jpg", "category": "Tâm lý, Gia đình", "duration": "102 phút", "limit": "T16", "isHot": true, "trailerUrl": "https://www.youtube.com/watch?v=IkaP0KJWTsQ" },
    { "id": 3, "title": "Lật Mặt 6: Tấm Vé Định Mệnh", "price": 65000, "poster": "images/latmat.jpg", "category": "Hành động, Hài", "duration": "132 phút", "limit": "T16", "isHot": true, "trailerUrl": "https://www.youtube.com/watch?v=L-XhraxUsAs" },
    { "id": 4, "title": "Dune: Hành Tinh Cát 2", "price": 70000, "poster": "images/dune.jpg", "category": "Hành động, Phiêu lưu", "duration": "166 phút", "limit": "T13", "isHot": true, "trailerUrl": "https://www.youtube.com/watch?v=Way9Dexny3w" },
    { "id": 5, "title": "Mai", "price": 75000, "poster": "images/mai.jpg", "category": "Tâm lý, Tình cảm", "duration": "131 phút", "limit": "T18", "isHot": true, "trailerUrl": "https://www.youtube.com/watch?v=EX6clvId19s" },
    { "id": 6, "title": "Godzilla x Kong: Đế Chế Mới", "price": 60000, "poster": "images/kong.jpg", "category": "Hành động, Quái vật", "duration": "115 phút", "limit": "P", "isHot": false, "trailerUrl": "https://www.youtube.com/watch?v=5XkgG_AAQs0" },
    { "id": 7, "title": "Kung Fu Panda 4", "price": 50000, "poster": "images/kungfu.jpg", "category": "Hoạt hình", "duration": "94 phút", "limit": "P", "isHot": false, "trailerUrl": "https://www.youtube.com/watch?v=_inKs4eeHiI" },
    { "id": 8, "title": "Exhuma: Quật Mộ Trùng Ma", "price": 65000, "poster": "images/exhuma.jpg", "category": "Kinh dị, Bí ẩn", "duration": "134 phút", "limit": "T16", "isHot": true, "trailerUrl": "https://www.youtube.com/watch?v=66K9-l0EkE0" },
    { "id": 9, "title": "Civil War: Nội Chiến Mỹ", "price": 60000, "poster": "images/WAR.jpg", "category": "Hành động, Chiến tranh", "duration": "109 phút", "limit": "T18", "isHot": false, "trailerUrl": "https://www.youtube.com/watch?v=aDyQxtg0V2w" },
    { "id": 10, "title": "Gặp Lại Chị Bầu", "price": 55000, "poster": "images/again.jpg", "category": "Hài, Tình cảm", "duration": "112 phút", "limit": "T13", "isHot": false, "trailerUrl": "https://www.youtube.com/watch?v=Gggw9jwr1h4" }
];
let tempBookingData = { movie: null, date: null, time: null };

/* --- 2. SỰ KIỆN KHI TRANG LOAD --- */
document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    renderMovies(moviesData); 
    setupBannerSlider(); 
});

/* --- 3. HÀM KIỂM TRA ĐĂNG NHẬP --- */
function checkLoginStatus() {
    const userJson = localStorage.getItem('currentUser');
    const userDisplay = document.getElementById('user-display');
    if (userDisplay) {
        if (userJson) {
            const user = JSON.parse(userJson);
            userDisplay.innerHTML = `<span style="margin-right:10px">Xin chào: <strong>${user.fullName || user.username}</strong></span> <a href="#" onclick="logout(event)" style="font-size: 13px; opacity: 0.8;">(Đăng xuất)</a>`;
        } else {
            userDisplay.innerHTML = `<a href="login.html">Đăng nhập</a> <span class="divider">|</span> <a href="login.html?mode=register">Đăng ký</a>`;
        }
    }
}

function logout(e) {
    e.preventDefault();
    if(confirm("Bạn có chắc muốn đăng xuất?")) {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }
}

/* --- 4. HÀM HIỂN THỊ PHIM (Đã thêm lớp phủ Trailer) --- */
function renderMovies(data) {
    const container = document.getElementById('movie-container');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = '<div style="width:100%; text-align:center; padding: 50px;">Không tìm thấy phim phù hợp</div>';
        return;
    }

    let htmlContent = '';
    data.forEach(movie => {
        const priceFormatted = movie.price.toLocaleString('vi-VN');
        let ageClass = 'bg-green';
        if (movie.limit === 'T13') ageClass = 'bg-yellow';
        if (movie.limit === 'T16') ageClass = 'bg-orange';
        if (movie.limit === 'T18') ageClass = 'bg-red';
        const hotHtml = movie.isHot ? '<span class="hot-tag">HOT</span>' : '';

        htmlContent += `
            <div class="movie-card">
                <div class="card-thumb">
                    <span class="age-tag ${ageClass}">${movie.limit}</span>
                    ${hotHtml}
                    <img src="${movie.poster}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Image'">
                    <div class="card-thumb-overlay">
                        <button class="btn-play-trailer" onclick="openTrailerModal('${movie.title}', '${movie.trailerUrl}')">
                            <i class="fa-solid fa-play"></i>
                        </button>
                    </div>
                </div>
                <div class="card-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">${movie.category} • ${movie.duration}</div>
                    <span class="price-tag">${priceFormatted} đ</span>
                    <button class="btn-buy-ticket" onclick="openScheduleModal(${movie.id})">
                        <i class="fa-solid fa-ticket"></i> MUA VÉ
                    </button>
                </div>
            </div>
        `;
    });
    container.innerHTML = htmlContent;
}

/* --- 5. LOGIC MODAL LỊCH CHIẾU --- */
function openScheduleModal(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    if (!movie) return;

    tempBookingData = { movie: movie, date: null, time: null };

    document.getElementById('modal-title').innerText = movie.title;
    document.getElementById('modal-desc').innerText = `${movie.category} | ${movie.duration}`;
    document.getElementById('modal-price').innerText = `${movie.price.toLocaleString('vi-VN')} đ/vé`;
    const poster = document.getElementById('modal-poster');
    if(poster) poster.src = movie.poster;

    renderDates();
    document.getElementById('time-list').innerHTML = '<p style="font-size:13px; color:#999;">Vui lòng chọn ngày trước</p>';

    const btn = document.getElementById('btn-confirm-schedule');
    btn.disabled = true;
    btn.classList.remove('active');

    const modal = document.getElementById('schedule-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeScheduleModal() {
    const modal = document.getElementById('schedule-modal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

// ... (Giữ nguyên hàm renderDates, renderTimes, filterMovies) ...
function filterMovies() {
    const keyword = document.getElementById('search-box').value.toLowerCase();
    const category = document.getElementById('category-select').value;
    const filteredData = moviesData.filter(movie => {
        const matchTitle = movie.title.toLowerCase().includes(keyword);
        const matchCategory = category === "" || movie.category.includes(category);
        return matchTitle && matchCategory;
    });
    renderMovies(filteredData);
}

function renderDates() {
    const dateList = document.getElementById('date-list');
    dateList.innerHTML = '';
    const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dateStr = d.toLocaleDateString('vi-VN'); 
        const el = document.createElement('div');
        el.className = 'date-item';
        el.innerHTML = `<span>${i===0 ? "Hôm nay" : days[d.getDay()]}</span><strong>${d.getDate()}/${d.getMonth()+1}</strong>`;
        el.onclick = () => {
            document.querySelectorAll('.date-item').forEach(e => e.classList.remove('selected'));
            el.classList.add('selected');
            tempBookingData.date = dateStr;
            renderTimes();
        };
        dateList.appendChild(el);
    }
}

function renderTimes() {
    const timeList = document.getElementById('time-list');
    timeList.innerHTML = '';
    const times = ["09:00", "10:30", "13:15", "15:45", "19:00", "20:30", "22:15"];
    times.forEach(t => {
        const el = document.createElement('div');
        el.className = 'time-item';
        el.innerText = t;
        el.onclick = () => {
            document.querySelectorAll('.time-item').forEach(e => e.classList.remove('selected'));
            el.classList.add('selected');
            tempBookingData.time = t;
            const btn = document.getElementById('btn-confirm-schedule');
            btn.disabled = false;
            btn.classList.add('active');
        };
        timeList.appendChild(el);
    });
}

/* --- 6. HÀM XÁC NHẬN ĐẶT VÉ --- */
function confirmSchedule() {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
        alert("Vui lòng đăng nhập để tiếp tục mua vé!");
        window.location.href = "login.html";
        return;
    }
    if (!tempBookingData.date || !tempBookingData.time) {
        alert("Vui lòng chọn ngày và giờ chiếu!");
        return;
    }
    const movieName = tempBookingData.movie.title;
    const cinemaName = "Beta Thái Nguyên";
    const dateStr = tempBookingData.date.replace(/\//g, '-');
    const timeStr = tempBookingData.time.replace(/:/g, 'h');
    const sessionID = `${movieName}_${cinemaName}_${dateStr}_${timeStr}`.replace(/\s/g, '');
    const finalData = {
        id: tempBookingData.movie.id,
        movieName: movieName,
        poster: tempBookingData.movie.poster,
        genre: tempBookingData.movie.category,
        duration: tempBookingData.movie.duration,
        price: tempBookingData.movie.price,
        date: tempBookingData.date,
        time: tempBookingData.time,
        cinema: cinemaName,
        sessionID: sessionID    
    };
    localStorage.setItem('bookingRequest', JSON.stringify(finalData));
    window.location.href = 'booking.html';
}
function openTrailerModal(title, url) {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');
    const titleHeader = document.getElementById('trailer-title');

    if (!modal || !iframe) return;

    // 1. Xử lý tiêu đề và link
    if (titleHeader) titleHeader.innerText = "TRAILER - " + title;
    
    let finalUrl = url;
    if (url.includes("watch?v=")) {
        finalUrl = url.replace("watch?v=", "embed/"); 
    }
    iframe.src = finalUrl + "?autoplay=1";

    // 2. ÉP LỚP NỀN ĐEN BÊN NGOÀI
    modal.style.cssText = `
        display: flex !important; 
        position: fixed !important; 
        top: 0 !important; left: 0 !important; 
        width: 100vw !important; height: 100vh !important; 
        background-color: rgba(0,0,0,0.85) !important; 
        z-index: 2147483647 !important; 
        justify-content: center !important; align-items: center !important;
    `;
    
    // 3. ÉP KHUNG TRẮNG ÔM KHÍT (Chỉ rộng vừa đủ, viền mỏng)
    const contentBox = modal.querySelector('.trailer-content') || modal.querySelector('.modal-content');
    if (contentBox) {
        contentBox.style.cssText = `
            display: block !important;
            background: white !important;
            width: 90% !important;
            max-width: 800px !important;
            padding: 10px 15px 15px 15px !important; /* Viền trắng mỏng ôm sát */
            position: relative !important;
            border-radius: 8px !important;
            box-sizing: border-box !important;
        `;
    }

    // 4. ÉP KHUNG CHỨA VIDEO PHẢI CHUẨN TỶ LỆ 16:9
    const videoBox = modal.querySelector('.video-container') || modal.querySelector('.trailer-video-box');
    if (videoBox) {
        videoBox.style.cssText = `
            position: relative !important;
            width: 100% !important;
            padding-bottom: 56.25% !important; /* Bí quyết tạo hình chữ nhật chuẩn video */
            height: 0 !important;
            margin-top: 10px !important;
            background: #000 !important;
            border-radius: 4px !important;
            overflow: hidden !important;
        `;
    }

    // 5. ÉP BẢN THÂN CÁI VIDEO PHẢI GIÃN KÍN KHUNG CHỨA
    iframe.style.cssText = `
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border: none !important;
    `;
}
/* --- HÀM ĐÓNG TRAILER (BẢN NÂNG CẤP) --- */
function closeTrailerModal() {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');
    
    if (modal) {
        // Dùng quyền lực cao nhất (!important) để ép nó tàng hình trở lại
        modal.style.setProperty('display', 'none', 'important');
    }
    
    if (iframe) {
        // Rút phích cắm để tắt tiếng
        iframe.src = ""; 
    }
}
/* --- 8. LOGIC BANNER SLIDER (Giữ nguyên) --- */
function setupBannerSlider() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');

    if (!carouselSlide || carouselImages.length === 0) return;

    let counter = 0;
    let size = carouselSlide.clientWidth; 
    let slideInterval;

    window.addEventListener('resize', () => {
        size = carouselSlide.clientWidth;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    const moveToSlide = (index) => {
        carouselSlide.style.transition = "transform 0.4s ease-in-out";
        counter = index;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    };

    const nextSlide = () => {
        if (counter >= carouselImages.length - 1) counter = -1;
        moveToSlide(counter + 1);
    };

    const prevSlide = () => {
        if (counter <= 0) counter = carouselImages.length;
        moveToSlide(counter - 1);
    };

    const startAutoSlide = () => {
        slideInterval = setInterval(nextSlide, 5000);
    };

    const resetTimer = () => {
        clearInterval(slideInterval);
        startAutoSlide();
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
    }

    startAutoSlide();
}