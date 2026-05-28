export interface SearchService {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  enabled: boolean;
}

export const SEARCH_SERVICES: SearchService[] = [
  {
    id: "vay-nhanh",
    label: "Vay Nhanh",
    subtitle: "Vay tiền nhanh, lãi suất chỉ từ 1%/tháng",
    icon: "/image/search/loan-fast.svg",
    enabled: true,
  },
  {
    id: "vay-tieu-dung",
    label: "Vay Tiêu Dùng",
    subtitle: "Vay tiêu dùng linh hoạt, hạn mức cao",
    icon: "/image/search/loan-consumer.svg",
    enabled: false,
  },
  {
    id: "thanh-toan-khoan-vay",
    label: "Thanh Toán Khoản Vay",
    subtitle: "Thanh toán nhanh các khoản vay",
    icon: "/image/search/loan-payment.svg",
    enabled: false,
  },
  {
    id: "vi-tra-sau",
    label: "Ví Trả Sau",
    subtitle: "Mua trước, trả sau tiện lợi",
    icon: "/image/search/paylater.svg",
    enabled: false,
  },
  {
    id: "bao-hiem",
    label: "Bảo Hiểm",
    subtitle: "Bảo hiểm sức khỏe, xe, nhân thọ",
    icon: "/image/search/insurance.svg",
    enabled: false,
  },
  {
    id: "nap-tien-dien-thoai",
    label: "Nạp Tiền Điện Thoại",
    subtitle: "Nạp tiền tất cả các mạng di động",
    icon: "/image/search/topup.svg",
    enabled: false,
  },
  {
    id: "thanh-toan-hoa-don",
    label: "Thanh Toán Hóa Đơn",
    subtitle: "Điện, nước, internet, truyền hình",
    icon: "/image/search/bill.svg",
    enabled: false,
  },
  {
    id: "chuyen-tien",
    label: "Chuyển Tiền",
    subtitle: "Chuyển tiền miễn phí trong vài giây",
    icon: "/image/search/transfer.svg",
    enabled: false,
  },
  {
    id: "quet-qr",
    label: "Quét QR",
    subtitle: "Thanh toán nhanh bằng mã QR",
    icon: "/image/search/qr.svg",
    enabled: false,
  },
  {
    id: "dau-tu",
    label: "Đầu Tư",
    subtitle: "Đầu tư chứng khoán, quỹ mở",
    icon: "/image/search/investment.svg",
    enabled: false,
  },
  {
    id: "tiet-kiem",
    label: "Tiết Kiệm",
    subtitle: "Gửi tiết kiệm lãi suất cao",
    icon: "/image/search/saving.svg",
    enabled: false,
  },
  {
    id: "tai-chinh-ca-nhan",
    label: "Tài Chính Cá Nhân",
    subtitle: "Quản lý chi tiêu thông minh",
    icon: "/image/search/finance.svg",
    enabled: false,
  },
  {
    id: "mua-ve-xe",
    label: "Mua Vé Xe",
    subtitle: "Đặt vé xe khách, xe buýt",
    icon: "/image/search/ticket.svg",
    enabled: false,
  },
  {
    id: "du-lich",
    label: "Du Lịch",
    subtitle: "Đặt phòng, vé máy bay, tour",
    icon: "/image/search/travel.svg",
    enabled: false,
  },
  {
    id: "internet-4g-5g",
    label: "Internet 4G/5G",
    subtitle: "Mua gói data di động",
    icon: "/image/search/internet.svg",
    enabled: false,
  },
  {
    id: "dien-nuoc",
    label: "Điện Nước",
    subtitle: "Thanh toán tiền điện, nước",
    icon: "/image/search/electricity.svg",
    enabled: false,
  },
  {
    id: "hoc-phi",
    label: "Học Phí",
    subtitle: "Thanh toán học phí các trường",
    icon: "/image/search/school.svg",
    enabled: false,
  },
  {
    id: "benh-vien",
    label: "Bệnh Viện",
    subtitle: "Thanh toán viện phí, đặt khám",
    icon: "/image/search/hospital.svg",
    enabled: false,
  },
];
