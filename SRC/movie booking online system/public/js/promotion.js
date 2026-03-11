/* DỮ LIỆU KHUYẾN MÃI (8 ITEMS) */
const promoData = {
    'job': {
        title: 'TUYỂN DỤNG NHÂN SỰ PART-TIME',
        desc: 'Nova Cinemas tuyển dụng nhân viên rạp chiếu phim.<br><br><b>Quyền lợi:</b><br>- Lương thưởng hấp dẫn.<br>- Xem phim miễn phí 4 vé/tháng.<br><br><b>Yêu cầu:</b> Trên 18 tuổi, năng động, làm xoay ca.',
        imgSrc: 'images/n1.jpg',
        placeholder: 'https://via.placeholder.com/400x250/d32f2f/ffffff?text=Tuyen+Dung'
    },
    'member': {
        title: 'ƯU ĐÃI THÀNH VIÊN NOVA STAR',
        desc: 'Đăng ký thành viên nhận ngay ưu đãi:<br>- Tích lũy 10% điểm thưởng trên mọi giao dịch.<br>- Tặng vé + Bắp nước vào tháng sinh nhật.',
        imgSrc: 'images/n2.jpg',
        placeholder: 'https://via.placeholder.com/400x250/1976d2/ffffff?text=Member+Nova'
    },
    'food': {
        title: 'COMBO MÌ LY - XEM PHIM CỰC ĐÃ',
        desc: 'Vừa xem phim vừa xì xụp mì ly nóng hổi.<br><b>Combo 1:</b> 1 Mì + 1 Coca = 45k.<br><b>Combo 2:</b> 2 Mì + 2 Coca + 1 Bắp = 99k.',
        imgSrc: 'images/n3.jpg',
        placeholder: 'https://via.placeholder.com/400x250/ffa000/ffffff?text=Combo+Mi'
    },
    'u22': {
        title: 'ƯU ĐÃI U22 - ĐỒNG GIÁ 40K',
        desc: 'Áp dụng cho HSSV và khách hàng dưới 22 tuổi.<br>- Thứ 2 đến Thứ 6: <b>45.000đ</b><br>- Cuối tuần: <b>55.000đ</b><br>Vui lòng xuất trình thẻ HSSV/CMND.',
        imgSrc: 'images/n4.jpg',
        placeholder: 'https://via.placeholder.com/400x250/81d4fa/ffffff?text=U22+Student'
    },
    'tuesday': {
        title: 'HAPPY TUESDAY - THỨ 3 VUI VẺ',
        desc: 'Ngày thứ 3 hàng tuần là ngày hội điện ảnh tại Nova Cinemas.<br>- Đồng giá vé 2D: <b>50.000đ</b> cho mọi suất chiếu.<br>- Giảm 50% Combo Bắp Nước size vừa.',
        imgSrc: 'images/n5.jpg',
        placeholder: 'https://via.placeholder.com/400x250/4caf50/ffffff?text=Happy+Tuesday'
    },
    'couple': {
        title: 'SWEETBOX - KHÔNG GIAN RIÊNG TƯ',
        desc: 'Trải nghiệm ghế đôi Sweetbox với vách ngăn riêng tư, tay vịn có thể gập lên.<br>Thêm lãng mạn, thêm cảm xúc cho các cặp đôi.',
        imgSrc: 'images/n6.jpg',
        placeholder: 'https://via.placeholder.com/400x250/e91e63/ffffff?text=Sweetbox+Couple'
    },
    'wallet': {
        title: 'THANH TOÁN VÍ ĐIỆN TỬ - GIẢM NGAY 10K',
        desc: 'Giảm trực tiếp 10.000đ khi mua vé qua Website/App và thanh toán bằng MoMo, ZaloPay hoặc ShopeePay.<br>Áp dụng cho hóa đơn từ 100k.',
        imgSrc: 'images/n7.jpg',
        placeholder: 'https://via.placeholder.com/400x250/009688/ffffff?text=Giam+Gia+Vi+Dien+Tu'
    }
};

/* LOGIC XỬ LÝ MODAL */
const modal = document.getElementById('promoModal');
const mTitle = document.getElementById('m-title');
const mDesc = document.getElementById('m-desc');
const mImg = document.getElementById('m-img');

function openModal(key) {
    const data = promoData[key];
    if(data) {
        mTitle.innerHTML = data.title;
        mDesc.innerHTML = data.desc;
        const img = new Image();
        img.src = data.imgSrc;
        img.onload = () => { mImg.src = data.imgSrc; };
        img.onerror = () => { mImg.src = data.placeholder; };
        modal.classList.add('active');
    }
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

function closeModalBtn() {
    modal.classList.remove('active');
}