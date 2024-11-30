# 🎬 MovieStream - Nền tảng phát trực tuyến phim vi dịch vụ

## 📝 Tổng quan về dự án

MovieStream là nền tảng phát trực tuyến phim toàn diện dựa trên vi dịch vụ được xây dựng bằng .NET 8.0, được thiết kế để cung cấp trải nghiệm phát trực tuyến phim có khả năng mở rộng và hiệu suất cao.

## 🚀 Kiến trúc

### Dịch vụ vi mô
- **Dịch vụ người dùng**: Quản lý và xác thực người dùng
- **Dịch vụ phim**: Quản lý danh mục phim và siêu dữ liệu
- **Dịch vụ phát lại**: Phát trực tuyến video và kiểm soát chất lượng
- **Dịch vụ đề xuất**: Đề xuất phim được cá nhân hóa
- **Dịch vụ tìm kiếm**: Khả năng tìm kiếm phim nâng cao
- **Cổng API**: Định tuyến yêu cầu và cân bằng tải

## 🛠 Công nghệ

### Phần cuối
- **.NET 8.0**
- **Entity Framework Core**
- **gRPC**
- **RabbitMQ**
- **Cổng API Ocelot**

### Cơ sở dữ liệu & Bộ nhớ đệm
- **SQL Server**
- **Redis**

### Các mẫu kiến ​​trúc
- Dịch vụ vi mô
- Kiến trúc hướng sự kiện
- CQRS

## 🔧 Điều kiện tiên quyết

- .NET 8.0 SDK
- Docker
- SQL Server
- RabbitMQ
- Redis

## 🏗 Dự án Cấu trúc

```
MovieStream/
│
├── Services/
│ ├── UserService/
│ ├── MovieService/
│ ├── PlaybackService/
│ ├── RecommendationService/
│ └── SearchService/
│
├── ApiGateway/
├── EventBus/
└── docker-compose.yml
```

## 🚀 Bắt đầu

### Sao chép Kho lưu trữ
```bash
git clone https://github.com/yourusername/MovieStream.git
cd MovieStream
```

### Cấu hình
1. Sao chép `appsettings.example.json` vào `appsettings.json`
2. Cập nhật chuỗi kết nối và cấu hình

### Chạy với Docker
```bash
docker-compose up --build
```

## 📦 Phân tích dịch vụ

### Dịch vụ người dùng
- Đăng ký người dùng
- Xác thực
- Quản lý hồ sơ
- Xử lý đăng ký VIP

### Dịch vụ phim
- Quản lý siêu dữ liệu phim
- Phân loại thể loại
- API thông tin phim

### Dịch vụ phát lại
- Truyền phát video
- Điều chỉnh chất lượng
- Quản lý tính năng VIP

### Dịch vụ đề xuất
- Đề xuất phim được cá nhân hóa
- Phân tích lịch sử xem

### Dịch vụ tìm kiếm
- Khả năng tìm kiếm nâng cao
- Đề xuất tìm kiếm thông minh

## 🔐 Tính năng bảo mật
- Xác thực JWT
- Kiểm soát truy cập dựa trên vai trò
- Mã hóa dữ liệu
- Xác thực đa yếu tố

## 📊 Cân nhắc về hiệu suất
- Bộ nhớ đệm phân tán
- Xử lý không đồng bộ
- Hỗ trợ mở rộng theo chiều ngang

## 🤝 Đóng góp

1. Phân nhánh kho lưu trữ
2. Tạo nhánh tính năng của bạn (`git checkout -b feature/Test`)
3. Cam kết các thay đổi của bạn (`git commit -m 'Add some Test'`)
4. Đẩy vào nhánh (`git push origin feature/Test`)
5. Mở Yêu cầu kéo

## 📄 Giấy phép

Phân phối theo Giấy phép MIT. Xem `LICENSE` để biết thêm thông tin.

## 📞 Liên hệ

Tên của bạn - your.email@example.com

Liên kết dự án: [repo của dự án](https://github.com/CoderSaiya/BE_MovieStream)
