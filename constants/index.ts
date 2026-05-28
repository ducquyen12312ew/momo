import { QuickAction, WalletItem, ServiceItem, NavItem } from "@/types";

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "deposit", label: "Nạp/Rút", icon: "/images/action-deposit.svg" },
  { id: "receive", label: "Nhận tiền", icon: "/images/action-receive.svg" },
  { id: "qr", label: "QR Thanh toán", icon: "/images/action-qr.svg" },
  { id: "wallet", label: "Ví tiện ích", icon: "/images/action-wallet.svg" },
];

export const WALLET_ITEMS: WalletItem[] = [
  { id: "momo", name: "Ví MoMo", icon: "/images/wallet-momo.svg", balance: "*******" },
  { id: "lucky", name: "Túi Thần Tài", icon: "/images/wallet-lucky.svg", balance: "*******" },
  { id: "kids", name: "Ví Trẻ Em", icon: "/images/wallet-kids.svg", balance: "*******" },
];

export const SERVICES: ServiceItem[] = [
  { id: "transfer", label: "Chuyển tiền", icon: "/images/service-transfer.svg" },
  { id: "bill", label: "Thanh toán hóa đơn", icon: "/images/service-bill.svg" },
  { id: "topup", label: "Nạp tiền điện thoại", icon: "/images/service-topup.svg", badge: "HOT" },
  { id: "data", label: "Data 4G/5G", icon: "/images/service-data.svg" },
  { id: "travel-finance", label: "Tài Chính Du Ký", icon: "/images/service-travel-finance.svg", badge: "HOT" },
  { id: "gold", label: "Túi Thần Tài", icon: "/images/service-gold.svg" },
  { id: "paylater", label: "Ví Trả Sau", icon: "/images/service-paylater.svg" },
  { id: "loan", label: "Thanh toán khoản vay", icon: "/images/service-loan.svg" },
  { id: "movie", label: "Mua vé xem phim", icon: "/images/service-movie.svg", badge: "HOT" },
  { id: "travel", label: "Du lịch - Đi lại", icon: "/images/service-travel.svg" },
  { id: "toll", label: "Thu phí không dừng", icon: "/images/service-toll.svg" },
  { id: "more", label: "Xem thêm dịch vụ", icon: "/images/service-more.svg" },
];

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "MoMo", icon: "/images/nav-home.svg" },
  { id: "gift", label: "Ưu đãi", icon: "/images/nav-gift.svg", badge: true },
  { id: "qr", label: "Mã VietQR", icon: "/images/nav-qr.svg", isCenter: true },
  { id: "history", label: "Lịch sử GD", icon: "/images/nav-history.svg" },
  { id: "user", label: "Tôi", icon: "/images/nav-user.svg" },
];

export const BALANCE_HIDDEN = "*******";
export const BALANCE_VISIBLE = "5.124đ";
