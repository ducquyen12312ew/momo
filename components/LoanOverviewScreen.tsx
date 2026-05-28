"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";

interface LoanOverviewScreenProps {
  onBack: () => void;
  onViewDetail: () => void;
}

const INFO_ITEMS = [
  { icon: "/image/faq.svg", label: "Câu hỏi\nthường gặp", badge: true },
  { icon: "/image/feedback.svg", label: "Hướng dẫn\nphản hồi", badge: false },
  { icon: "/image/cic.svg", label: "Điểm tín\ndụng CIC", badge: false },
  { icon: "/image/news.svg", label: "Xem tin tức\n& Ưu đãi", badge: true },
];

export default function LoanOverviewScreen({
  onBack,
  onViewDetail,
}: LoanOverviewScreenProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "news">("overview");

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-screenIn">
      {/* ── Header ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #F8DCE8 0%, #FCE8D7 100%)",
        }}
        className="px-4 pt-3 pb-0 flex-shrink-0"
      >
        {/* Status bar */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold text-[#222]">23:59</span>
          <div className="flex items-center gap-[5px]">
            <SignalBars />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center active:bg-white/90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className="text-[17px] font-bold text-[#222]">Vay Nhanh</span>

          <div className="flex items-center gap-1.5">
            <button className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center active:bg-white/90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
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
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 space-y-3">

        {/* Notification card */}
        <div
          className="rounded-2xl p-4 flex gap-3"
          style={{ background: "#EEF6FF", border: "1px solid #B7D7FF" }}
        >
          <div className="flex-shrink-0 mt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#2196F3" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="#2196F3" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#1565C0] mb-1">Thông báo</p>
            <p className="text-[12.5px] text-[#444] leading-relaxed">
              Từ 21:50 đến 7:00 sáng mỗi ngày, đối tác Mcredit tạm ngừng hỗ trợ giao dịch tất toán. Bạn vui lòng quay lại sau thời gian này để tiếp tục nhé.
            </p>
          </div>
        </div>

        {/* Khoản vay card — clickable */}
        <button
          onClick={onViewDetail}
          className="w-full text-left bg-white rounded-3xl overflow-hidden active:scale-[0.99] transition-transform"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          {/* Top section: pink tint */}
          <div className="relative px-5 pt-5 pb-4" style={{ background: "#FFF8FB" }}>
            {/* Decorative image */}
            <div className="absolute left-3 top-2 opacity-80">
              <SafeImage
                src="/image/loan-card.png"
                alt="Khoản vay"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Content */}
            <div className="ml-16 flex items-start justify-between">
              <div>
                <p className="text-[13px] font-semibold text-[#555] mb-1">
                  Khoản vay của bạn
                </p>
                <p className="text-[30px] font-black text-[#111] leading-tight tracking-tight">
                  9.000.000đ
                </p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-1 flex-shrink-0">
                <path d="M9 18l6-6-6-6" stroke="#EC407A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Dashed divider */}
          <div className="mx-4">
            <div
              className="border-t border-dashed"
              style={{ borderColor: "#FFCCDD" }}
            />
          </div>

          {/* Bottom section */}
          <div className="grid grid-cols-2 divide-x divide-[#F0F0F0] px-0">
            <div className="px-4 py-3">
              <p className="text-[11px] text-[#999] mb-1">Mã khoản vay</p>
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-bold text-[#222]">MC14867545871</p>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex-shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="#EC407A" strokeWidth="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-[11px] text-[#999] mb-1">Hạn thanh toán</p>
              <p className="text-[13px] font-bold text-[#222]">Ngày 03 hằng tháng</p>
            </div>
          </div>
        </button>

        {/* Lịch sử khoản vay */}
        <div
          className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <span className="text-[15px] font-semibold text-[#222]">
            Lịch sử khoản vay (1)
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Thông tin thêm */}
        <div className="pt-1">
          <p className="text-[16px] font-bold text-[#222] mb-3">Thông tin thêm</p>
          <div
            className="bg-white rounded-2xl p-4"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="grid grid-cols-4 gap-2">
              {INFO_ITEMS.map((item) => (
                <button
                  key={item.label}
                  className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#F5F5F5] flex items-center justify-center">
                      <SafeImage
                        src={item.icon}
                        alt={item.label}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover"
                      />
                    </div>
                    {item.badge && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#FF6D00] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        Mới
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#555] text-center leading-tight whitespace-pre-line">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom nav (2 tabs) ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#EEEEEE]"
        style={{
          boxShadow: "0 -2px 10px rgba(0,0,0,0.04)",
          paddingBottom: "env(safe-area-inset-bottom, 8px)",
        }}
      >
        <div className="grid grid-cols-2">
          <button
            onClick={() => setActiveTab("overview")}
            className="flex flex-col items-center gap-1 pt-3 pb-2"
          >
            {activeTab === "overview" && (
              <div className="w-8 h-[3px] rounded-full bg-[#EC407A] mb-1" />
            )}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 12l9-9 9 9" stroke={activeTab === "overview" ? "#EC407A" : "#BDBDBD"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21V12h6v9" stroke={activeTab === "overview" ? "#EC407A" : "#BDBDBD"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span
              className="text-[11px] font-semibold"
              style={{ color: activeTab === "overview" ? "#EC407A" : "#BDBDBD" }}
            >
              Tổng quan
            </span>
          </button>

          <button
            onClick={() => setActiveTab("news")}
            className="flex flex-col items-center gap-1 pt-3 pb-2 relative"
          >
            {activeTab === "news" && (
              <div className="w-8 h-[3px] rounded-full bg-[#EC407A] mb-1" />
            )}
            <div className="relative">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="3" stroke={activeTab === "news" ? "#EC407A" : "#BDBDBD"} strokeWidth="2"/>
                <path d="M7 9h10M7 13h7" stroke={activeTab === "news" ? "#EC407A" : "#BDBDBD"} strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="absolute -top-2.5 -right-3 bg-[#FF6D00] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                Mới
              </span>
            </div>
            <span
              className="text-[11px] font-semibold"
              style={{ color: activeTab === "news" ? "#EC407A" : "#BDBDBD" }}
            >
              Tin & Ưu đãi
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Shared status bar icons ── */
function SignalBars() {
  return (
    <svg width="18" height="13" viewBox="0 0 18 13">
      <rect x="0" y="9" width="3.5" height="4" rx="0.5" fill="#333"/>
      <rect x="4.8" y="6" width="3.5" height="7" rx="0.5" fill="#333"/>
      <rect x="9.6" y="3" width="3.5" height="10" rx="0.5" fill="#333"/>
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
      <path d="M0.5 5C3 2.5 6.3 1 10 1s7 1.5 9.5 4" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="23" height="12" rx="2.5" stroke="#333" strokeWidth="1.2"/>
      <rect x="2" y="2" width="18" height="9" rx="1.5" fill="#4CAF50"/>
      <path d="M24.5 4.5v4" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
