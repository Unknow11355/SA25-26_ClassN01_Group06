document.addEventListener('DOMContentLoaded', function() {
    // 1. Gắn sự kiện cho các nút chuyển Tab (nếu bạn dùng thẻ a hoặc button)
    // Giả sử bạn có nút id="btn-tab-login" và "btn-tab-register" trong HTML
    const btnTabLogin = document.getElementById('tab-login');
    const btnTabRegister = document.getElementById('tab-register');

    if(btnTabLogin) btnTabLogin.addEventListener('click', () => switchTab('login'));
    if(btnTabRegister) btnTabRegister.addEventListener('click', () => switchTab('register'));

    // 2. Gắn sự kiện Submit cho Form
    const loginForm = document.getElementById('form-login');
    const regForm = document.getElementById('form-register');

    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (regForm) regForm.addEventListener('submit', handleRegister);

    // 3. Kiểm tra URL: Nếu người dùng bấm "Đăng ký" từ trang chủ (login.html?mode=register)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'register') {
        switchTab('register');
    }
});

// --- CÁC HÀM XỬ LÝ ---

function switchTab(tab) {
    const loginForm = document.getElementById('form-login'); // ID của thẻ <form>
    const regForm = document.getElementById('form-register'); // ID của thẻ <form>
    
    // ID của nút Tab trên đầu (để đổi màu active)
    const loginTabBtn = document.getElementById('tab-login'); 
    const regTabBtn = document.getElementById('tab-register');

    if (tab === 'login') {
        if(loginForm) loginForm.style.display = 'block';
        if(regForm) regForm.style.display = 'none';
        
        if(loginTabBtn) loginTabBtn.classList.add('active');
        if(regTabBtn) regTabBtn.classList.remove('active');
    } else {
        if(loginForm) loginForm.style.display = 'none';
        if(regForm) regForm.style.display = 'block';
        
        if(loginTabBtn) loginTabBtn.classList.remove('active');
        if(regTabBtn) regTabBtn.classList.add('active');
    }
}

// Xử lý ĐĂNG NHẬP
async function handleLogin(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    
    // Lấy giá trị
    const username = usernameInput ? usernameInput.value : '';
    const password = passwordInput ? passwordInput.value : '';

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (data.success) {
            // Lưu user vào LocalStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            alert("Đăng nhập thành công!");
            
            // --- SỬA ĐOẠN NÀY ---
            // Nếu là Admin -> Vào trang Admin
            // Nếu là Khách -> Vào thẳng trang PROFILE.HTML (Phòng VIP)
            if (data.user.role === 'admin') {
                window.location.href = 'admin.html'; // Hoặc đường dẫn admin của bạn
            } else {
                window.location.href = 'profile.html'; // <--- QUAN TRỌNG: Chuyển sang profile
            }
            // --------------------

        } else {
            alert(data.message || "Tên đăng nhập hoặc mật khẩu sai!");
        }
    } catch (err) { 
        console.error(err);
        alert("Lỗi kết nối Server!");
    }
}

// Xử lý ĐĂNG KÝ
async function handleRegister(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('reg-fullname').value;
    const username = document.getElementById('reg-username').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const confirmPass = document.getElementById('reg-confirm-pass').value;

    if (password !== confirmPass) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                username, 
                password, 
                fullName, 
                phone 
            })
        });
        const data = await res.json();

        if (data.success) {
            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            switchTab('login'); // Tự động chuyển về tab đăng nhập
            document.getElementById('form-register').reset();
        } else {
            alert(data.message || "Đăng ký thất bại.");
        }
    } catch (err) { 
        console.error(err);
        alert("Lỗi kết nối Server!");
    }
}