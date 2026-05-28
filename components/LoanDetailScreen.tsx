"use client";
import SafeImage from "./SafeImage";

interface LoanDetailScreenProps {
  onBack: () => void;
  onPayment: () => void;
}

interface Installment {
  period: number;
  date: string;
  amount: string;
  status: "paid" | "overdue";
}

const INSTALLMENTS: Installment[] = [
  { period: 1, date: "03/06/2025", amount: "0đ", status: "paid" },
  { period: 2, date: "03/07/2025", amount: "0đ", status: "paid" },
  { period: 3, date: "03/08/2025", amount: "0đ", status: "paid" },
  { period: 4, date: "03/09/2025", amount: "0đ", status: "paid" },
  { period: 5, date: "03/10/2025", amount: "0đ", status: "paid" },
  { period: 6, date: "03/11/2025", amount: "0đ", status: "paid" },
  { period: 7, date: "03/12/2025", amount: "0đ", status: "paid" },
  { period: 8, date: "03/01/2026", amount: "0đ", status: "paid" },
  { period: 9, date: "03/02/2026", amount: "3.683.000đ", status: "overdue" },
];

const LOAN_INFO = [
  { label: "Trạng thái", value: "Đã giải ngân", badge: "green" as const },
  { label: "Thời gian nộp hồ sơ", value: "03/05/2025" },
  { label: "Khoản vay", value: "MC14867545871", copy: true },
  { label: "Người vay", value: "Phan Đức Quyền" },
  { label: "Số tiền vay", value: "9.000.000đ" },
  { label: "Thời hạn", value: "9 tháng" },
];

export default function LoanDetailScreen({ onBack, onPayment }: LoanDetailScreenProps) {
  return (
    <div className="min-h-screen flex flex-col animate-screenIn" style={{ background: "#F5F5F5" }}>

      {/* ── Fixed Header ── */}
      <div
        className="flex-shrink-0"
        style={{ background: "linear-gradient(180deg, #F8DCE8 0%, #FDF0F5 100%)" }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-3 mb-3">
          <span className="text-[15px] font-bold text-[#222]">00:01</span>
          <div className="flex items-center gap-[5px]">
            <SignalBars />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center active:bg-white/90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-[17px] font-bold text-[#222]">Thông tin khoản vay</span>
          <button className="h-9 px-2.5 rounded-full bg-white/70 flex items-center gap-1.5 active:bg-white/90">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#555" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="w-px h-4 bg-[#CCC]" />
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke="#555" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          paddingBottom: 140,
        }}
      >
        <div className="px-4 pt-5 space-y-3">

          {/* Title */}
          <h1 className="text-[22px] font-bold text-[#111]">Lịch thanh toán</h1>

          {/* ── Installment table card ── */}
          <div
            className="bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            {/* Table header */}
            <div className="grid grid-cols-[2fr_2.5fr_2fr] border-b border-[#F0F0F0] px-4 py-3">
              <span className="text-[12px] font-semibold text-[#888]">Kỳ hạn</span>
              <span className="text-[12px] font-semibold text-[#888] text-center">Số tiền phải trả</span>
              <span className="text-[12px] font-semibold text-[#888] text-right">Trạng thái</span>
            </div>

            {/* Rows */}
            {INSTALLMENTS.map((item, idx) => (
              <div key={item.period}>
                <div className="grid grid-cols-[2fr_2.5fr_2fr] items-center px-4 py-3.5">
                  <div>
                    <p className="text-[14px] font-semibold text-[#222]">Kỳ {item.period}</p>
                    <p className="text-[11.5px] text-[#999] mt-0.5">{item.date}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className={`text-[14px] font-bold ${item.status === "overdue" ? "text-[#E53935]" : "text-[#222]"}`}>
                      {item.amount}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="10" stroke="#EC407A" strokeWidth="1.8"/>
                      <path d="M12 8v4M12 16h.01" stroke="#EC407A" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex justify-end">
                    {item.status === "paid" ? (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#E8F5E9", color: "#2E7D32" }}>
                        Đã thanh toán
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: "#FFEBEE", color: "#C62828" }}>
                        Quá hạn
                      </span>
                    )}
                  </div>
                </div>
                {idx < INSTALLMENTS.length - 1 && <div className="h-px bg-[#F5F5F5] mx-4" />}
              </div>
            ))}

            {/* ── "Thêm ngày đến hạn vào lịch" footer ── */}
            <button
              className="w-full flex items-center justify-center gap-2 py-4 active:opacity-70 transition-opacity"
              style={{ background: "#FDEAF4" }}
            >
              <span className="text-[14px] font-semibold" style={{ color: "#EC407A" }}>
                Thêm ngày đến hạn vào lịch
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="3" stroke="#EC407A" strokeWidth="1.8"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="#EC407A" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M8 15h.01M12 15h.01M16 15h.01" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* ── Mẹo thanh toán card ── */}
          <div
            className="bg-white rounded-3xl p-5"
            style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 flex-shrink-0">
                <SafeImage
                  src="/image/payment-tip.png"
                  alt="Mẹo thanh toán"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-[#222] mb-1">Mẹo thanh toán</p>
                <p className="text-[13px] text-[#555] leading-relaxed">
                  Hãy thanh toán đúng hạn để tránh các khoản phí phát sinh và bảo vệ lịch sử tín dụng của bạn.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-[13px] font-bold active:opacity-60" style={{ color: "#EC407A" }}>
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* ── Thông tin khoản vay ── */}
          <div className="pt-1">
            <h2 className="text-[18px] font-bold text-[#111] mb-3">Thông tin khoản vay</h2>
            <div
              className="bg-white rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            >
              {LOAN_INFO.map((row, idx) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[14px] text-[#777]">{row.label}</span>
                    <div className="flex items-center gap-2">
                      {row.badge === "green" ? (
                        <span
                          className="text-[12px] font-semibold px-3 py-1 rounded-full"
                          style={{ background: "#E8F5E9", color: "#2E7D32" }}
                        >
                          {row.value}
                        </span>
                      ) : (
                        <span className="text-[14px] font-semibold text-[#111]">{row.value}</span>
                      )}
                      {row.copy && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                          <rect x="9" y="9" width="13" height="13" rx="2" stroke="#EC407A" strokeWidth="1.8"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#EC407A" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  {idx < LOAN_INFO.length - 1 && <div className="h-px bg-[#F5F5F5] mx-5" />}
                </div>
              ))}
            </div>
          </div>

          {/* ── Thông tin hợp đồng ── */}
          <div className="pt-1">
            <h2 className="text-[18px] font-bold text-[#111] mb-3">Thông tin hợp đồng</h2>
            <button
              className="w-full bg-white rounded-2xl flex items-center justify-between px-5 active:bg-[#F9F9F9] transition-colors"
              style={{ height: 72, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            >
              <span className="text-[15px] font-semibold text-[#222]">Hợp đồng tín dụng</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#BBBBBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* ── Fixed bottom buttons ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#EEEEEE] px-4 pt-3"
        style={{
          boxShadow: "0 -2px 10px rgba(0,0,0,0.04)",
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 20px)",
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <button className="h-[54px] rounded-2xl font-bold text-[16px] text-[#555] border-2 border-[#E0E0E0] bg-white active:bg-[#F5F5F5] transition-colors">
            Tất toán
          </button>
          <button
            onClick={onPayment}
            className="h-[54px] rounded-2xl font-bold text-[16px] text-white active:opacity-90 transition-opacity"
            style={{ background: "#EC407A", boxShadow: "0 4px 14px rgba(236,64,122,0.35)" }}
          >
            Thanh toán
          </button>
        </div>
      </div>

    </div>
  );
}

/* ── Status bar icons ── */
function SignalBars() {
  return (
    <svg width="18" height="13" viewBox="0 0 18 13">
      <rect x="0"    y="9" width="3.5" height="4"  rx="0.5" fill="#333"/>
      <rect x="4.8"  y="6" width="3.5" height="7"  rx="0.5" fill="#333"/>
      <rect x="9.6"  y="3" width="3.5" height="10" rx="0.5" fill="#333"/>
      <rect x="14.5" y="0" width="3.5" height="13" rx="0.5" fill="#333"/>
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg width="16" height="13" viewBox="0 0 20 16" fill="none">
      <circle cx="10" cy="14" r="1.8" fill="#333"/>
      <path d="M6.5 11C7.5 10 8.7 9.4 10 9.4s2.5.6 3.5 1.6" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3.5 8C5.2 6.3 7.5 5.3 10 5.3s4.8 1 6.5 2.7" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M0.5 5C3 2.5 6.3 1 10 1s7 1.5 9.5 4"           stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="23" height="12" rx="2.5" stroke="#333" strokeWidth="1.2"/>
      <rect x="2"   y="2"   width="18" height="9"  rx="1.5" fill="#4CAF50"/>
      <path d="M24.5 4.5v4" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
