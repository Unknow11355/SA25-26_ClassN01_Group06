🎬 Movie Booking Online System
📖 Giới thiệu dự án (Project Overview)
Dự án Movie Booking Online System được phát triển nhằm mục đích xây dựng một hệ thống đặt vé xem phim trực tuyến hoàn chỉnh. Hơn thế nữa, dự án minh họa rõ nét quá trình tiến hóa của kiến trúc phần mềm (Software Architecture Evolution) từ mô hình Layered Monolith (Nguyên khối phân lớp) sang hệ thống Microservices (Vi dịch vụ) kết hợp Event-Driven Architecture (EDA).

Dự án là bài tập lớn môn Kiến trúc phần mềm - Trường Công nghệ Thông tin, Đại học Phenikaa.

👥 Nhóm thực hiện: Group 06
Trần Hữu Kiên - 23010258 (Phase 1: Monolith Architecture)

Nguyễn Mạnh Quyền - 23010482 (Phase 2: Microservices & API Gateway)

Giảng viên hướng dẫn: ThS. Vũ Quang Dũng

🛠 Công nghệ sử dụng (Tech Stack)
Backend Runtime: Node.js

Framework: Express.js

Frontend: HTML5, CSS3, Vanilla JavaScript (Fetch API)

Database: JSON File System (users.json, movies.json, bookings.json) - Sử dụng để mô phỏng Document-based DB phục vụ Rapid Prototyping.

Message Broker: RabbitMQ (thông qua thư viện amqplib để xử lý bất đồng bộ).

API Gateway: http-proxy-middleware

🏗 Kiến trúc Hệ thống (System Architecture)
Dự án được chia làm 2 giai đoạn phát triển chiến lược để giải quyết các NFRs (Non-Functional Requirements) và ASRs (Architecturally Significant Requirements):

Phase 1: Layered Monolith (Hệ thống cũ)
Ứng dụng chạy trên một tiến trình duy nhất (Cổng 3000).

Áp dụng kiến trúc 3-Tier Layered: Controller -> Service -> Repository.

Phục vụ các tính năng: Đăng ký/Đăng nhập, Quản lý danh mục phim.

Phase 2: Microservices Ecosystem (Hệ thống mới)
Giải quyết bài toán thắt cổ chai (bottleneck) và đảm bảo tính cô lập lỗi (Fault Isolation) cho chức năng đặt vé có traffic cao:

API Gateway (Port 5000): Điểm truy cập duy nhất (Single Entry Point) cho toàn bộ Client. Xử lý Request Routing và định tuyến.

Legacy Service (Port 3000): Xử lý UI, Auth và hiển thị Phim.

Booking Service (Port 5002): Core Microservice tách biệt hoàn toàn, sở hữu cơ sở dữ liệu riêng (bookings.json).

RabbitMQ (Event-Driven): Xử lý bất đồng bộ (Asynchronous) cho tác vụ gửi Email xác nhận thông qua sự kiện BOOKING_CREATED, giảm thiểu độ trễ API.

🚀 Hướng dẫn cài đặt và khởi chạy (How to Run)
Yêu cầu hệ thống (Prerequisites)
Đã cài đặt Node.js (phiên bản 14.x trở lên).

Đã cài đặt và chạy Docker (để chạy RabbitMQ container).

Bước 1: Khởi động Message Broker (RabbitMQ)
Mở terminal và chạy lệnh sau để khởi tạo container RabbitMQ:
docker run -d --hostname rabbitmq-host --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

Bước 2: Cài đặt thư viện (Dependencies)
Tại thư mục gốc của từng Service, tiến hành cài đặt các package cần thiết:
# Cài đặt cho API Gateway
cd api-gateway
npm install

# Cài đặt cho Legacy Service
cd legacy-service
npm install

# Cài đặt cho Booking Service
cd booking-service
npm install

Bước 3: Khởi chạy các Services
Vui lòng mở 3 terminal riêng biệt và chạy lần lượt các service sau:

1. Khởi chạy Legacy Service (Port 3000):
cd legacy-service
node server.js
2. Khởi chạy Booking Service (Port 5002):
cd booking-service
node server.js
3. Khởi chạy API Gateway (Port 5000):
cd api-gateway
node gateway.js
Bước 4: Truy cập ứng dụng
Mở trình duyệt web và truy cập qua cổng của API Gateway: http://localhost:8000 (hoặc cổng Gateway bạn cấu hình).

Lưu ý: Client tuyệt đối chỉ giao tiếp qua API Gateway, không gọi trực tiếp vào các Port Backend (3000).

🧪 Kịch bản kiểm thử (Testing Scenarios)
Kiểm thử Data Flow: Đăng ký tài khoản và kiểm tra xem dữ liệu có được ghi chính xác vào file data/users.json hay không.

Kiểm thử Gateway Routing: Gửi request đặt vé (POST /booking) thông qua Gateway và quan sát log định tuyến (Proxy created -> Port 3001).

Kiểm thử Fault Isolation (Kill Switch): Tắt đột ngột tiến trình của Booking Service. Load lại trang chủ và trang đăng nhập để đảm bảo ứng dụng Legacy vẫn hoạt động bình thường, chứng minh khả năng cô lập lỗi.

Kiểm thử Async (RabbitMQ): Thực hiện đặt vé thành công và kiểm tra độ trễ của API (dưới 50ms) cùng với Log xác nhận [Event Bus] Publishing event: BOOKING_CREATED chạy ngầm.
