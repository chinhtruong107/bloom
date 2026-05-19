# BloomShop Frontend

Frontend của BloomShop, một giao diện thương mại điện tử bán kính được xây dựng bằng Next.js, React, TypeScript và Tailwind CSS. Dự án có các luồng chính như xem danh sách sản phẩm, lọc theo danh mục, tìm kiếm, xem chi tiết, thử kính bằng camera, giỏ hàng, thanh toán, đăng nhập và quản lý hồ sơ người dùng.

## Công nghệ sử dụng

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Radix UI
- Lucide React
- Framer Motion
- next-themes

## Yêu cầu môi trường

- Node.js phiên bản phù hợp với Next.js 16
- npm
- Backend Laravel chạy tại `http://localhost:8000/api` nếu muốn gọi API thật

## Cài đặt

```bash
npm install
```

## Cấu hình môi trường

Tạo hoặc cập nhật file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Biến này được dùng trong `lib/api.ts` để cấu hình Axios khi gọi API Laravel.

## Chạy dự án

Chạy môi trường phát triển:

```bash
npm run dev
```

Sau đó mở:

```text
http://localhost:3000
```

Build production:

```bash
npm run build
```

Chạy bản production sau khi build:

```bash
npm run start
```

## Cấu trúc thư mục chính

```text
frontend/
├── app/                 # App Router, pages và API routes của Next.js
├── components/          # Component giao diện dùng lại
├── context/             # React Context cho auth, cart, favorites
├── data/                # Dữ liệu mẫu sản phẩm và user
├── lib/                 # Tiện ích dùng chung, cấu hình Axios
├── public/              # Static assets
├── services/            # Service gọi API
├── types/               # TypeScript types
└── README.md
```

## Các trang chính

- `/` - Trang chủ, hiển thị sản phẩm bán chạy và các nhóm sản phẩm.
- `/category/[slug]` - Danh sách sản phẩm theo danh mục.
- `/product/[productId]` - Chi tiết sản phẩm.
- `/try-on/[productId]` - Thử kính bằng camera và tải ảnh kết quả.
- `/search` - Tìm kiếm sản phẩm.
- `/cart` - Giỏ hàng.
- `/checkout` - Thanh toán.
- `/login` - Đăng nhập.
- `/register` - Đăng ký tài khoản.
- `/profile` - Hồ sơ người dùng.
- `/contact` - Liên hệ.

## Chức năng hiện có

- Hiển thị sản phẩm từ dữ liệu mẫu trong `data/products.json`.
- Tìm kiếm sản phẩm và gợi ý theo tên, mô tả, danh mục.
- Lọc sản phẩm theo danh mục.
- Thêm, xóa và cập nhật số lượng sản phẩm trong giỏ hàng.
- Lưu giỏ hàng trong `localStorage`.
- Đăng nhập bằng API route nội bộ `/api/auth/login`, đọc dữ liệu từ `data/users.json`.
- Lưu phiên đăng nhập trong `localStorage`.
- Lưu danh sách yêu thích trong `localStorage`.
- Chế độ sáng/tối bằng `next-themes`.
- Trang thử kính sử dụng camera trình duyệt qua `navigator.mediaDevices.getUserMedia`.
- Trang thanh toán mô phỏng xử lý đơn hàng, tính phí vận chuyển, thuế và ưu đãi thành viên.

## Tài khoản mẫu

Thông tin tài khoản mẫu nằm trong `data/users.json`.

```text
Email: ct8395459@gmail.com
Mật khẩu: Chinh123@
```

## Tích hợp backend Laravel

File `services/productService.ts` đã chuẩn bị các hàm gọi API:

- `GET /products`
- `GET /products/{id}`

Axios được cấu hình trong `lib/api.ts` với `baseURL` lấy từ `NEXT_PUBLIC_API_URL`. Khi backend Laravel đã sẵn sàng, có thể chuyển các màn hình đang đọc `data/products.json` sang dùng `productService`.

## Ghi chú phát triển

- Ảnh sản phẩm hiện dùng URL từ Unsplash, được khai báo trong `next.config.ts`.
- Một số chức năng như đăng ký và thanh toán đang mô phỏng ở phía frontend, chưa ghi dữ liệu vào backend.
- Nếu trang thử kính không mở được camera, hãy kiểm tra quyền camera của trình duyệt và chạy app trên `localhost` hoặc HTTPS.
- Script `lint` hiện đang khai báo `next lint`; nếu dùng Next.js phiên bản mới không còn hỗ trợ lệnh này, nên chuyển sang cấu hình ESLint CLI phù hợp.
