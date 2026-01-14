package com.group06.movieweb.service;

import com.group06.movieweb.dto.BookingRequest;
import com.group06.movieweb.model.*;
import com.group06.movieweb.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private UserRepository userRepository;

    public Booking createBooking(BookingRequest request) {
        // 1. Tìm Showtime và User từ ID khách gửi
        Showtime showtime = showtimeRepository.findById(request.getShowtimeId())
                .orElseThrow(() -> new RuntimeException("Showtime not found"));

        User user = userRepository.findById(request.getUserId())
                 .orElseThrow(() -> new RuntimeException("User not found"));

        // === BẮT ĐẦU: LOGIC KIỂM TRA TRÙNG (PHIÊN BẢN AN TOÀN) ===

        // A. Lấy danh sách những cái ghế khách ĐANG muốn ngồi
        String[] gheKhachMuonDat = request.getSeatNumbers().split(",");

        // B. Lấy danh sách tất cả các vé ĐÃ BÁN trước đó của suất chiếu này
        List<Booking> cacVeDaBan = bookingRepository.findByShowtimeId(request.getShowtimeId());

        System.out.println("--- Bắt đầu kiểm tra vé ---");
        System.out.println("Khách muốn đặt: " + request.getSeatNumbers());

        // C. Soi từng vé đã bán
        for (Booking veCu : cacVeDaBan) {
            // [BẢO VỆ] Nếu vé cũ bị lỗi dữ liệu (null) thì bỏ qua, không để sập server
            if (veCu.getSeatNumbers() == null) {
                System.out.println(">> Bỏ qua một vé bị lỗi (seatNumbers is null) ID: " + veCu.getId());
                continue;
            }

            String[] gheCuaVeCu = veCu.getSeatNumbers().split(",");

            // So sánh từng ghế
            for (String gheCu : gheCuaVeCu) {
                for (String gheMoi : gheKhachMuonDat) {
                    if (gheCu.trim().equalsIgnoreCase(gheMoi.trim())) {
                        System.err.println(">> PHÁT HIỆN TRÙNG GHẾ: " + gheMoi);
                        throw new RuntimeException("Xin lỗi! Ghế " + gheMoi + " đã có người đặt rồi.");
                    }
                }
            }
        }
        System.out.println("--- Kiểm tra hoàn tất: Hợp lệ ---");
        // === KẾT THÚC KIỂM TRA ===

        // 2. Nếu không trùng thì tính tiền và lưu
        double totalPrice = showtime.getTicketPrice() * gheKhachMuonDat.length;

        Booking newBooking = new Booking(
            user,
            showtime,
            request.getSeatNumbers(),
            totalPrice
        );

        return bookingRepository.save(newBooking);
    }
}