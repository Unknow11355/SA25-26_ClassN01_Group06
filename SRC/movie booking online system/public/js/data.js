const moviesDB = [
    {
        id: 1, type: 'now',
        title: "MAI",
        image: "https://cdn.galaxycine.vn/media/2024/1/26/mai-500_1706258402544.jpg",
        genre: "Tâm lý, Tình cảm", duration: "131 phút", price: 110000,
        age: "T18", hot: true
    },
    {
        id: 2, type: 'now',
        title: "KUNG FU PANDA 4",
        image: "https://cdn.galaxycine.vn/media/2024/3/6/kung-fu-panda-4-500_1709714850785.jpg",
        genre: "Hoạt hình, GĐ", duration: "94 phút", price: 95000,
        age: "P", hot: true
    },
    {
        id: 3, type: 'now',
        title: "ĐÀO, PHỞ VÀ PIANO",
        image: "https://cdn.galaxycine.vn/media/2024/2/20/dao-pho-va-piano-1_1708412808061.jpg",
        genre: "Lịch sử, Chiến tranh", duration: "100 phút", price: 50000,
        age: "T13", hot: false
    },
    {
        id: 4, type: 'now',
        title: "EXHUMA: QUẬT MỘ TRÙNG MA",
        image: "https://cdn.galaxycine.vn/media/2024/2/26/quat-mo-trung-ma-7_1708933092285.jpg",
        genre: "Kinh dị, Bí ẩn", duration: "134 phút", price: 100000,
        age: "T16", hot: true
    },
    {
        id: 5, type: 'now',
        title: "DUNE 2: HÀNH TINH CÁT",
        image: "https://cdn.galaxycine.vn/media/2024/2/23/dune-2-500_1708678257007.jpg",
        genre: "Viễn tưởng, HĐ", duration: "166 phút", price: 120000,
        age: "T16", hot: false
    },
    {
        id: 6, type: 'now',
        title: "GODZILLA X KONG",
        image: "https://cdn.galaxycine.vn/media/2024/3/1/godzilla-x-kong-500_1709280275815.jpg",
        genre: "Hành động, Quái vật", duration: "115 phút", price: 105000,
        age: "P", hot: true
    },
    {
        id: 7, type: 'now',
        title: "GẶP LẠI CHỊ BẦU",
        image: "https://cdn.galaxycine.vn/media/2024/1/15/gap-lai-chi-bau-500_1705307304383.jpg",
        genre: "Hài, Gia đình", duration: "110 phút", price: 90000,
        age: "T13", hot: false
    },
    {
        id: 8, type: 'now',
        title: "BÀ GIÀ ĐI BỤI",
        image: "https://cdn.galaxycine.vn/media/2024/2/28/ba-gia-di-bui-500_1709106096538.jpg",
        genre: "Hài hước", duration: "98 phút", price: 85000,
        age: "T16", hot: false
    }
];

// Dữ liệu ngày chiếu (để dùng cho trang booking/schedule sau này)
moviesDB.forEach(m => {
    m.dates = [
        { date: "21/01", day: "Hôm nay", showtimes: [{time: "19:00"}, {time: "21:30"}] },
        { date: "22/01", day: "Thứ 5", showtimes: [{time: "18:00"}, {time: "20:00"}] }
    ];
});