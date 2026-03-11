document.addEventListener("DOMContentLoaded", function() {
    loadUserProfile();
});

// --- HÀM CHÍNH: TẢI TOÀN BỘ DỮ LIỆU ---
function loadUserProfile() {
    // 1. Kiểm tra đăng nhập
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
        window.location.href = "login.html"; // Hoặc index.html tùy bạn
        return;
    }

    const user = JSON.parse(userJson);

    // 2. XỬ LÝ HEADER (TOP BAR)
    const headerDisplay = document.getElementById('user-display');
    if (headerDisplay) {
        // Cấu trúc: Xin chào: Tên (Đăng xuất)
        headerDisplay.innerHTML = `
            Xin chào: <span style="font-weight: bold;">${user.fullName || user.username}</span>
            <a href="#" onclick="logoutProfile()" style="color: #fff; margin-left: 5px; text-decoration: none;">(Đăng xuất)</a>
        `;
    }

    // 3. Hiển thị tên to ở Sidebar
    const sidebarName = document.getElementById('sidebar-name');
    if (sidebarName) sidebarName.innerText = user.fullName || user.username;

    // 4. Điền dữ liệu vào Form (Tab Thông tin)
    setVal('pro-fullname', user.fullName);
    setVal('pro-email', user.email || user.username); // Ưu tiên email, nếu không có lấy username
    setVal('pro-phone', user.phone);
    setVal('pro-idcard', user.idCard);
    setVal('pro-dob', user.dob);
    setVal('pro-gender', user.gender);
    setVal('pro-city', user.city);
    setVal('pro-district', user.district);
    setVal('pro-address', user.address);

    // 5. XỬ LÝ DỮ LIỆU LỊCH SỬ VÀ THẺ THÀNH VIÊN (MỚI THÊM)
    loadBookingHistoryAndCard(user);
}

// --- HÀM PHỤ: XỬ LÝ LỊCH SỬ & TÍNH TIỀN ---
function loadBookingHistoryAndCard(user) {
    // Lấy danh sách vé từ bộ nhớ
    const allTickets = JSON.parse(localStorage.getItem('beta_booking_history')) || [];
    
    // Lọc vé của user hiện tại (So sánh username)
    // Lưu ý: Lúc đặt vé bạn phải lưu field 'username' khớp với currentUser.username
    const myTickets = allTickets.filter(t => t.username === user.username);

    let totalSpend = 0;
    const historyBody = document.getElementById('history-table-body');
    
    // Reset bảng lịch sử
    if (historyBody) historyBody.innerHTML = "";

    // A. NẾU CHƯA CÓ VÉ
    if (myTickets.length === 0) {
        if(historyBody) {
            historyBody.innerHTML = `<tr><td colspan="6" style="padding:30px; font-style:italic; color:#888;">Bạn chưa có giao dịch nào.</td></tr>`;
        }
    } 
    // B. NẾU ĐÃ CÓ VÉ
    else {
        // Đảo ngược để vé mới nhất lên đầu
        myTickets.reverse().forEach(ticket => {
            // Xử lý giá tiền: Chuyển chuỗi "100.000 đ" thành số 100000 để cộng
            let priceRaw = ticket.totalPrice || "0";
            let priceNumber = parseInt(priceRaw.replace(/\./g, '').replace(' đ', '').replace(/,/g, ''));
            
            if (!isNaN(priceNumber)) {
                totalSpend += priceNumber;
            }

            // Render dòng vé ra bảng HTML
            if (historyBody) {
                let row = `
                    <tr>
                        <td><strong style="color:#03599d">#${ticket.id}</strong></td>
                        <td style="text-align:left; font-weight:bold;">${ticket.movieName}</td>
                        <td>${ticket.cinema}<br><span style="font-size:12px; color:#777;">${ticket.time} | ${ticket.date}</span></td>
                        <td>${ticket.seats}</td>
                        <td>${ticket.bookingDate}</td>
                        <td style="color:#d32f2f; font-weight:bold;">${ticket.totalPrice}</td>
                    </tr>
                `;
                historyBody.innerHTML += row;
            }
        });
    }

    // C. CẬP NHẬT TAB THẺ THÀNH VIÊN (Dựa trên totalSpend vừa tính)
    updateMembershipCard(user, totalSpend);
}

// --- HÀM PHỤ: CẬP NHẬT GIAO DIỆN THẺ ---
function updateMembershipCard(user, totalSpend) {
    // 1. Số thẻ giả (Tạo số cố định dựa trên độ dài tên để không bị đổi mỗi lần reload)
    const cardIdEl = document.getElementById('p-card-id');
    if (cardIdEl) {
        let fakeId = 1000 + (user.username ? user.username.length * 55 : 999); 
        cardIdEl.innerText = fakeId;
    }

    // 2. Ngày kích hoạt (Lấy ngày hiện tại cho đẹp)
    const dateEl = document.getElementById('p-active-date');
    if (dateEl) dateEl.innerText = new Date().toLocaleDateString('vi-VN');

    // 3. Tổng chi tiêu
    const spendEl = document.getElementById('p-total-spend');
    if (spendEl) spendEl.innerText = totalSpend.toLocaleString('vi-VN') + " đ";

    // 4. Thanh tiến trình VIP (Mốc 3.000.000đ)
    const targetVIP = 3000000;
    let remaining = targetVIP - totalSpend;
    if (remaining < 0) remaining = 0;

    const needMoreEl = document.getElementById('p-need-more');
    if (needMoreEl) needMoreEl.innerText = remaining.toLocaleString('vi-VN') + " đ";
    
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        let percent = (totalSpend / targetVIP) * 100;
        if (percent > 100) percent = 100;
        progressFill.style.width = percent + "%";
    }
}

// --- CÁC HÀM HỖ TRỢ (GIỮ NGUYÊN) ---

function setVal(id, val) {
    const el = document.getElementById(id);
    if(el) el.value = val || "";
}

function showTab(tabName) {
    // Ẩn hết các tab
    const tabInfo = document.getElementById('tab-info');
    const tabCard = document.getElementById('tab-card');
    const tabHistory = document.getElementById('tab-history');

    if(tabInfo) tabInfo.style.display = 'none';
    if(tabCard) tabCard.style.display = 'none';
    if(tabHistory) tabHistory.style.display = 'none';

    // Xóa active ở nút bấm
    const btns = document.querySelectorAll('.menu-list button');
    btns.forEach(b => b.classList.remove('active'));

    // Hiện tab được chọn
    const selectedTab = document.getElementById('tab-' + tabName);
    if(selectedTab) selectedTab.style.display = 'block';

    // Thêm active cho nút bấm tương ứng
    // (Giả định thứ tự nút: 0: Info, 1: Card, 2: History)
    if(tabName === 'info' && btns[0]) btns[0].classList.add('active');
    if(tabName === 'card' && btns[1]) btns[1].classList.add('active');
    if(tabName === 'history' && btns[2]) btns[2].classList.add('active');
}

function updateProfile(e) {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;

    // Lấy dữ liệu từ form
    user.fullName = document.getElementById('pro-fullname').value;
    user.phone = document.getElementById('pro-phone').value;
    user.idCard = document.getElementById('pro-idcard').value;
    user.dob = document.getElementById('pro-dob').value;
    user.gender = document.getElementById('pro-gender').value;
    user.city = document.getElementById('pro-city').value;
    user.district = document.getElementById('pro-district').value;
    user.address = document.getElementById('pro-address').value;

    // Lưu lại
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert("Cập nhật thông tin thành công!");
    location.reload(); // Load lại để cập nhật tên hiển thị ở header
}

function logoutProfile() {
    if(confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        localStorage.removeItem('currentUser');
        window.location.href = "index.html"; // Chuyển về trang chủ hoặc login
    }
}