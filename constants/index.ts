import { QuickAction, WalletItem, ServiceItem, NavItem } from "@/types";

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "deposit", label: "Nạp/Rút",       icon: "/image/generated/quick-deposit.svg" },
  { id: "receive", label: "Nhận tiền",      icon: "/image/generated/quick-receive.svg" },
  { id: "qr",      label: "QR Thanh toán",  icon: "/image/generated/quick-qr.svg" },
  { id: "wallet",  label: "Ví tiện ích",    icon: "/image/generated/quick-wallet.svg" },
];

export const WALLET_ITEMS: WalletItem[] = [
  { id: "momo",  name: "Ví MoMo",      icon: "/image/generated/wallet-momo.svg",   balance: "*******" },
  { id: "lucky", name: "Túi Thần Tài", icon: "/image/generated/wallet-saving.svg", balance: "*******" },
  { id: "kids",  name: "Ví Trẻ Em",    icon: "/image/generated/wallet-kid.svg",    balance: "*******" },
];

export const SERVICES: ServiceItem[] = [
  { id: "transfer",       label: "Chuyển tiền",            icon: "/image/chuyentien.png" },
  { id: "bill",           label: "Thanh toán hóa đơn",     icon: "/image/thanhtoanhoadon.png" },
  { id: "topup",          label: "Nạp tiền điện thoại",    icon: "/image/naptiendienthoai.png", badge: "HOT" },
  { id: "data",           label: "Data 4G/5G",              icon: "/image/data4g.png" },
  { id: "travel-finance", label: "Tài Chính Du Ký",         icon: "/image/taichinh.png", badge: "HOT" },
  { id: "gold",           label: "Túi Thần Tài",            icon: "/image/tuithantai.png" },
  { id: "paylater",       label: "Ví Trả Sau",              icon: "/image/vitrasau.png" },
  { id: "loan",           label: "Thanh toán khoản vay",    icon: "/image/thanhtoankhoanvay.png" },
  { id: "movie",          label: "Mua vé xem phim",         icon: "/image/muavexemphim.png", badge: "HOT" },
  { id: "toll",           label: "Thu phí không dừng...",   icon: "/image/thuphi.png" },
  { id: "more",           label: "Xem thêm dịch vụ",        icon: "/image/xemthemdichvu.png" },
];

export const NAV_ITEMS: NavItem[] = [
  { id: "home",    label: "MoMo",       icon: "/image/nav-home.png",    },
  { id: "gift",    label: "Ưu đãi",     icon: "/image/nav-gift.png",    badge: true },
  { id: "qr",      label: "Mã VietQR",  icon: "/image/nav-qr.png",      isCenter: true },
  { id: "history", label: "Lịch sử GD", icon: "/image/nav-history.png", },
  { id: "user",    label: "Tôi",        icon: "/image/nav-user.png",    },
];

export const BALANCE_HIDDEN  = "*******";
export const BALANCE_VISIBLE = "5.124đ";
