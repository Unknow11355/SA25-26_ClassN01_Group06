document.addEventListener("DOMContentLoaded", () => {
    checkAdmin();
    loadUsers();
    loadMovies();
});

// 1. Kiểm tra quyền Admin
function checkAdmin() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'admin') {
        alert("Bạn không có quyền truy cập!");
        window.location.href = '/';
    } else {
        document.getElementById('admin-hello').innerText = `Xin chào, ${user.fullName}`;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
}

// 2. Load danh sách User
async function loadUsers() {
    try {
        const res = await fetch('/api/users');
        const users = await res.json();
        const tbody = document.getElementById('user-table-body');
        tbody.innerHTML = '';
        users.forEach((u, i) => {
            tbody.innerHTML += `
                <tr>
                    <td>${i+1}</td>
                    <td>${u.username}</td>
                    <td>${u.fullName}</td>
                    <td>${u.phone || '-'}</td>
                    <td>${u.role}</td>
                </tr>`;
        });
    } catch(e) { console.error(e); }
}

// 3. Load danh sách Phim
async function loadMovies() {
    try {
        const res = await fetch('/api/movies');
        const movies = await res.json();
        const tbody = document.getElementById('movie-table-body');
        tbody.innerHTML = '';

        movies.forEach(m => {
            tbody.innerHTML += `
                <tr id="row-${m.id}">
                    <td>${m.id}</td>
                    <td><img src="${m.poster}" height="80" style="object-fit:cover; border-radius:4px;"></td>
                    <td>
                        <input type="text" class="edit-input" id="title-${m.id}" value="${m.title}" style="font-weight:bold;">
                    </td>
                    <td>
                        <small><b>TL:</b> ${m.category}</small><br>
                        <small><b>Thời lượng:</b> ${m.duration}</small><br>
                        <small><b>Đạo diễn:</b> ${m.director || 'Chưa cập nhật'}</small>
                    </td>
                    <td>
                        <input type="number" class="edit-input" id="price-${m.id}" value="${m.price}">
                    </td>
                    <td>
                        <button onclick="saveMovie(${m.id})" style="background:#03599d; color:white; border:none; padding:8px 12px; cursor:pointer; border-radius:4px;">
                            <i class="fas fa-save"></i> Lưu
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch(e) { console.error(e); }
}

// 4. Lưu sửa đổi (Cập nhật giá/tên)
async function saveMovie(id) {
    const newTitle = document.getElementById(`title-${id}`).value;
    const newPrice = document.getElementById(`price-${id}`).value;
    
    // Lấy lại thông tin cũ để giữ nguyên các trường không sửa
    const res = await fetch('/api/movies');
    const movies = await res.json();
    const movie = movies.find(m => m.id === id);

    if (movie) {
        movie.title = newTitle;
        movie.price = parseInt(newPrice);
        
        await fetch('/api/movies/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movie)
        });
        alert("Đã cập nhật thông tin phim!");
        loadMovies();
    }
}

// 5. Bật/Tắt form thêm phim
function toggleAddForm() {
    const panel = document.getElementById('add-movie-panel');
    panel.style.display = (panel.style.display === 'none' || panel.style.display === '') ? 'block' : 'none';
}

// 6. Xử lý Thêm phim mới
async function handleAddMovie(event) {
    event.preventDefault();
    
    const newMovie = {
        title: document.getElementById('add-title').value,
        poster: document.getElementById('add-poster').value,
        category: document.getElementById('add-category').value,
        duration: document.getElementById('add-duration').value,
        price: parseInt(document.getElementById('add-price').value),
        limit: document.getElementById('add-limit').value,
        director: document.getElementById('add-director').value || "Đang cập nhật",
        releaseDate: document.getElementById('add-date').value || "Sắp chiếu",
        description: document.getElementById('add-desc').value || "Chưa có mô tả",
        isHot: true // Mặc định phim mới là Hot
    };

    try {
        const res = await fetch('/api/movies/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMovie)
        });
        const data = await res.json();
        
        if (data.success) {
            alert("Thêm phim mới thành công!");
            toggleAddForm(); // Ẩn form
            event.target.reset(); // Xóa dữ liệu trong form
            loadMovies(); // Tải lại danh sách
        } else {
            alert("Lỗi: " + data.message);
        }
    } catch (e) {
        console.error(e);
        alert("Có lỗi kết nối server!");
    }
}