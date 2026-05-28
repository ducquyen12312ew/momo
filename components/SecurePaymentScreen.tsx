"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";

interface SecurePaymentScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

export default function SecurePaymentScreen({ onBack, onConfirm }: SecurePaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<"tcb" | "mbb">("tcb");

  return (
    <div className="min-h-screen flex flex-col animate-screenIn" style={{ background: "#F5F5F5" }}>

      {/* ── Header with wave pattern ── */}
      <div className="flex-shrink-0 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#F8DCE8 0%,#FDF0F5 100%)" }}>
        {/* Wave SVG pattern top-right */}
        <svg className="absolute right-0 top-0 opacity-40" width="160" height="80" viewBox="0 0 160 80" fill="none">
          <path d="M160 0 Q130 20 100 10 Q70 0 40 18 Q10 36 0 30" stroke="#EC407A" strokeWidth="1.5" fill="none"/>
          <path d="M160 12 Q130 32 100 22 Q70 12 40 30 Q10 48 0 42" stroke="#EC407A" strokeWidth="1.5" fill="none"/>
          <path d="M160 24 Q130 44 100 34 Q70 24 40 42 Q10 60 0 54" stroke="#EC407A" strokeWidth="1.5" fill="none"/>
          <path d="M160 36 Q130 56 100 46 Q70 36 40 54 Q10 72 0 66" stroke="#EC407A" strokeWidth="1.5" fill="none"/>
          <path d="M160 48 Q130 68 100 58 Q70 48 40 66 Q10 84 0 78" stroke="#EC407A" strokeWidth="1.5" fill="none"/>
        </svg>

        {/* Status bar */}
        <div className="relative z-10 flex items-center justify-between px-4 pt-3 mb-3">
          <span className="text-[15px] font-bold text-[#222]">00:02</span>
          <div className="flex items-center gap-[5px]"><SignalBars /><WifiIcon /><BatteryIcon /></div>
        </div>

        {/* Toolbar */}
        <div className="relative z-10 flex items-center justify-between px-4 pb-4">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center active:bg-white/90">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[17px] font-bold text-[#222]">Thanh toán an toàn</span>
          <div className="w-9" />
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-3" style={{ WebkitOverflowScrolling: "touch", paddingBottom: 160 }}>

        {/* ── Ticket payment card ── */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
          {/* Title row */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4">
            <div className="flex items-center gap-2.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#1976D2" strokeWidth="2"/>
                <path d="M7 8h10M7 12h10M7 16h6" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-[17px] font-bold text-[#222]">Vay Nhanh</span>
            </div>
            <button className="flex items-center gap-1 border border-[#DDDDDD] rounded-full px-3 py-1.5 active:bg-[#F5F5F5]">
              <span className="text-[13px] font-semibold text-[#555]">Chi tiết</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Dashed divider */}
          <div className="mx-5 border-t border-dashed border-[#DDDDDD]" />

          {/* Info rows */}
          <div className="px-5 pb-5 pt-3 space-y-3.5">
            {[
              { label: "Số hợp đồng/mã\nkhoản vay", value: "MC14867545871", bold: false },
              { label: "Họ tên", value: "Phan Duc Quyen", bold: true },
              { label: "Tạm tính", value: "3.683.000đ", bold: false },
            ].map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-3">
                <span className="text-[13px] text-[#888] leading-snug whitespace-pre-line flex-shrink-0" style={{ maxWidth: 140 }}>
                  {row.label}
                </span>
                <span className={`text-[14px] text-right ${row.bold ? "font-bold" : "font-semibold"} text-[#111]`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Ưu đãi card ── */}
        <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FFF8E1" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="7" width="20" height="13" rx="3" stroke="#F57F17" strokeWidth="2"/>
              <path d="M12 7V4M2 12h20" stroke="#F57F17" strokeWidth="2" strokeLinecap="round"/>
              <text x="12" y="19" textAnchor="middle" fontSize="7" fontWeight="900" fill="#F57F17">%</text>
            </svg>
          </div>
          <span className="flex-1 text-[15px] font-bold text-[#222]">Ưu đãi</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-[#888]">Đổi xu lấy</span>
            <div className="flex items-center gap-1 rounded-full px-2 py-1" style={{ background: "#FFF3E0", border: "1px solid #FFB300" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="13" rx="2" stroke="#FF8F00" strokeWidth="2"/><path d="M2 12h20" stroke="#FF8F00" strokeWidth="2"/></svg>
              <span className="text-[11px] font-bold" style={{ color: "#FF8F00" }}>Giảm 2K</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#BBBBBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* ── Trả ngay card ── */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
          {/* Card header */}
          <div className="flex items-center gap-2 px-5 pt-5 pb-3">
            <span className="text-[16px] font-bold text-[#222]">Trả ngay</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#555" strokeWidth="1.8"/>
              <circle cx="12" cy="12" r="3" stroke="#555" strokeWidth="1.8"/>
            </svg>
          </div>

          {/* TCB - selected */}
          <div className="mx-4 mb-2">
            <button
              onClick={() => setSelectedMethod("tcb")}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all"
              style={{
                borderColor: selectedMethod === "tcb" ? "#EC407A" : "#EEEEEE",
                background: selectedMethod === "tcb" ? "white" : "white",
              }}
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5F5F5] flex items-center justify-center">
                <SafeImage src="/image/tcb.png" alt="TCB" width={36} height={36} className="w-9 h-9 object-contain" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-bold text-[#222]">TCB</p>
                <p className="text-[12px] text-[#888]">Miễn phí</p>
              </div>
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: selectedMethod === "tcb" ? "#EC407A" : "#BBBBBB" }}
              >
                {selectedMethod === "tcb" && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EC407A" }} />}
              </div>
            </button>
          </div>

          {/* MBB - unselected */}
          <div className="mx-4 mb-3">
            <button
              onClick={() => setSelectedMethod("mbb")}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all"
              style={{ borderColor: selectedMethod === "mbb" ? "#EC407A" : "#EEEEEE" }}
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5F5F5] flex items-center justify-center">
                <SafeImage src="/image/mbb.png" alt="MBB" width={36} height={36} className="w-9 h-9 object-contain" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-bold text-[#222]">MBB</p>
                <button className="flex items-center gap-0.5">
                  <span className="text-[12px] font-medium" style={{ color: "#EC407A" }}>Đăng ký xem số dư</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#EC407A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: selectedMethod === "mbb" ? "#EC407A" : "#BBBBBB" }}
              >
                {selectedMethod === "mbb" && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EC407A" }} />}
              </div>
            </button>
          </div>

          {/* View all link */}
          <button className="w-full flex items-center justify-center gap-1 py-3.5 border-t border-[#F5F5F5] active:bg-[#FFF0F5]">
            <span className="text-[13px] font-semibold" style={{ color: "#EC407A" }}>Xem tất cả (6)</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#EC407A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

      </div>

      {/* ── Fixed bottom bar ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#EEEEEE] px-4 pt-3"
        style={{ boxShadow: "0 -2px 12px rgba(0,0,0,0.06)", paddingBottom: "max(env(safe-area-inset-bottom,0px),16px)" }}
      >
        {/* Total row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] text-[#666]">Tổng tiền</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[20px] font-semibold text-[#111]">3.683.000đ</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 15l-6-6-6 6" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={onConfirm}
          className="w-full h-[54px] rounded-2xl font-bold text-[17px] text-white flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
          style={{ background: "#EC407A", boxShadow: "0 4px 16px rgba(236,64,122,0.40)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="12" rx="3" stroke="white" strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Xác nhận
        </button>
      </div>
    </div>
  );
}

function SignalBars() {
  return (<svg width="18" height="13" viewBox="0 0 18 13"><rect x="0" y="9" width="3.5" height="4" rx="0.5" fill="#333"/><rect x="4.8" y="6" width="3.5" height="7" rx="0.5" fill="#333"/><rect x="9.6" y="3" width="3.5" height="10" rx="0.5" fill="#333"/><rect x="14.5" y="0" width="3.5" height="13" rx="0.5" fill="#333"/></svg>);
}
function WifiIcon() {
  return (<svg width="16" height="13" viewBox="0 0 20 16" fill="none"><circle cx="10" cy="14" r="1.8" fill="#333"/><path d="M6.5 11C7.5 10 8.7 9.4 10 9.4s2.5.6 3.5 1.6" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/><path d="M3.5 8C5.2 6.3 7.5 5.3 10 5.3s4.8 1 6.5 2.7" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/><path d="M0.5 5C3 2.5 6.3 1 10 1s7 1.5 9.5 4" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/></svg>);
}
function BatteryIcon() {
  return (<svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="23" height="12" rx="2.5" stroke="#333" strokeWidth="1.2"/><rect x="2" y="2" width="18" height="9" rx="1.5" fill="#4CAF50"/><path d="M24.5 4.5v4" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/></svg>);
}
