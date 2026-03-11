document.addEventListener("DOMContentLoaded", () => {
    renderMovies('now');
});

function renderMovies(type) {
    const container = document.getElementById("movie-grid");
    container.innerHTML = "";
    
    // Lọc phim từ data.js
    const list = moviesDB.filter(m => m.type === type);

    if (list.length === 0) {
        container.innerHTML = "<p style='text-align:center; width:100%'>Không có phim nào.</p>";
        return;
    }

    list.forEach(movie => {
        // Nếu là phim đang chiếu -> Nút mua vé dẫn sang booking.html kèm ID
        // Nếu sắp chiếu -> Nút bị mờ
        let btnHtml = `<a href="booking.html?id=${movie.id}" class="btn-buy">MUA VÉ</a>`;
        if (type === 'soon') btnHtml = `<button class="btn-buy" style="background:#ccc; cursor:default">SẮP CHIẾU</button>`;

        const html = `
            <div class="movie-card">
                <img src="${movie.image}" class="movie-thumb">
                <div class="movie-info">
                    <div class="movie-title">${movie.title}</div>
                    <div style="font-size:13px; color:#666; margin-bottom:10px">${movie.genre}</div>
                    ${btnHtml}
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}