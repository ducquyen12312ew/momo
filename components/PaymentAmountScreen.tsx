"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";

interface PaymentAmountScreenProps {
  onBack: () => void;
  onPay: () => void;
}

export default function PaymentAmountScreen({ onBack, onPay }: PaymentAmountScreenProps) {
  const [selected, setSelected] = useState<"current" | "other">("current");

  return (
    <div className="min-h-screen flex flex-col animate-screenIn" style={{ background: "#F5F5F5" }}>

      {/* ── Header ── */}
      <div className="flex-shrink-0" style={{ background: "linear-gradient(180deg,#F8DCE8 0%,#FDF0F5 100%)" }}>
        <div className="flex items-center justify-between px-4 pt-3 mb-3">
          <span className="text-[15px] font-bold text-[#222]">00:02</span>
          <div className="flex items-center gap-[5px]"><SignalBars /><WifiIcon /><BatteryIcon /></div>
        </div>
        <div className="flex items-center justify-between px-4 pb-4">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center active:bg-white/90">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[17px] font-bold text-[#222]">Chi tiết khoản vay</span>
          <button className="h-9 px-2.5 rounded-full bg-white/70 flex items-center gap-1.5 active:bg-white/90">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#555" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#555" strokeWidth="2" strokeLinecap="round"/></svg>
            <div className="w-px h-4 bg-[#CCC]" />
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" stroke="#555" strokeWidth="2" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* ── Scroll body ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4" style={{ WebkitOverflowScrolling: "touch", paddingBottom: 120 }}>

        {/* Loan info card */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
          <div className="flex items-start gap-3 px-5 pt-5 pb-4">
            <div className="w-10 h-10 flex-shrink-0 mt-0.5">
              <SafeImage src="/image/loan-orange.png" alt="Vay Nhanh" width={40} height={40} className="w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="text-[16px] font-bold text-[#222]">Vay Nhanh</p>
              <p className="text-[13px] text-[#888] mt-0.5">PHAN DUC QUYEN</p>
              <p className="text-[12px] text-[#AAAAAA] mt-2">Số hợp đồng/Mã khoản vay:</p>
              <p className="text-[14px] font-bold text-[#222] mt-0.5">MC14867545871</p>
            </div>
          </div>
          {/* Pink footer */}
          <button className="w-full flex items-center justify-center gap-1.5 py-3.5 active:opacity-70" style={{ background: "#FDEAF4" }}>
            <span className="text-[14px] font-semibold" style={{ color: "#EC407A" }}>Hợp đồng &amp; Lịch thanh toán</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#EC407A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Thông tin thanh toán */}
        <div>
          <h2 className="text-[17px] font-bold text-[#111] mb-3">Thông tin thanh toán</h2>
          <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            {[
              { label: "Loại sản phẩm", value: "Vay Nhanh" },
              { label: "Ngày đến hạn", value: "03/02/2026" },
            ].map((row, i, arr) => (
              <div key={row.label}>
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-[14px] text-[#888]">{row.label}</span>
                  <span className="text-[14px] font-bold text-[#111]">{row.value}</span>
                </div>
                {i < arr.length - 1 && <div className="h-px bg-[#F5F5F5] mx-5" />}
              </div>
            ))}
          </div>
        </div>

        {/* Số tiền thanh toán */}
        <div>
          <h2 className="text-[17px] font-bold text-[#111] mb-3">Số tiền thanh toán</h2>

          {/* Blue info card */}
          <div className="rounded-2xl p-4 flex items-start gap-3 mb-3" style={{ background: "#EEF6FF", border: "1.5px solid #B7D7FF" }}>
            <div className="w-10 h-10 flex-shrink-0">
              <SafeImage src="/image/chart-info.png" alt="chart" width={40} height={40} className="w-10 h-10 object-contain" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-[#333] leading-relaxed">
                Tổng nợ tất toán sẽ tăng dần do lãi được tính theo số ngày vay thực tế
              </p>
              <div className="flex justify-end mt-1">
                <button className="text-[13px] font-semibold" style={{ color: "#1565C0" }}>Xem chi tiết</button>
              </div>
            </div>
          </div>

          {/* Payment options */}
          <div className="space-y-2.5 mb-3">
            {/* Option 1: current period */}
            <button
              onClick={() => setSelected("current")}
              className="w-full flex items-center justify-between px-4 py-4 rounded-2xl border-2 transition-all"
              style={{
                background: selected === "current" ? "#FFF4FA" : "white",
                borderColor: selected === "current" ? "#EC407A" : "#EEEEEE",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: selected === "current" ? "#EC407A" : "#BBBBBB" }}>
                  {selected === "current" && (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EC407A" }} />
                  )}
                </div>
                <span className="text-[15px] font-semibold text-[#222]">Nợ trong kỳ</span>
              </div>
              <span className="text-[15px] font-bold text-[#111]">3.683.000đ</span>
            </button>

            {/* Option 2: other */}
            <button
              onClick={() => setSelected("other")}
              className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl border-2 bg-white transition-all"
              style={{
                borderColor: selected === "other" ? "#EC407A" : "#EEEEEE",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: selected === "other" ? "#EC407A" : "#BBBBBB" }}>
                {selected === "other" && (
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EC407A" }} />
                )}
              </div>
              <span className="text-[15px] font-semibold text-[#333]">Thanh toán số tiền khác</span>
            </button>
          </div>

          {/* Blue info note */}
          <div className="rounded-2xl p-4 flex gap-2.5" style={{ background: "#EEF6FF", border: "1.5px solid #B7D7FF" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" stroke="#1976D2" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <p className="text-[12.5px] text-[#333] leading-relaxed">
                Gồm nợ gốc hàng kỳ, lãi hàng kỳ tới thời điểm hiện tại, phí thu hộ và lãi chậm trả (nếu có).
              </p>
              <p className="text-[12.5px] text-[#555] leading-relaxed mt-1">
                <span className="font-semibold">Lưu ý:</span> Đối tác không hỗ trợ tất toán trong khung giờ 21h50-7h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed bottom ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#EEEEEE] px-4 pt-3"
        style={{ boxShadow: "0 -2px 10px rgba(0,0,0,0.06)", paddingBottom: "max(env(safe-area-inset-bottom,0px),16px)" }}
      >
        <div className="grid grid-cols-[auto_1fr] gap-3 items-stretch">
          {/* Túi Thần Tài card */}
          <button
            className="flex items-center gap-2 px-3 py-2.5 rounded-2xl border"
            style={{ background: "#FFF5F0", borderColor: "#FFB088", minWidth: 148 }}
          >
            <SafeImage src="/image/tuithantai.png" alt="Túi Thần Tài" width={32} height={32} className="w-8 h-8 object-contain flex-shrink-0" />
            <div className="text-left">
              <p className="text-[10px] text-[#888] leading-tight">Thanh toán tiện lợi với</p>
              <p className="text-[13px] font-bold leading-tight" style={{ color: "#EC407A" }}>Túi Thần Tài</p>
            </div>
          </button>

          {/* Pay button */}
          <button
            onClick={onPay}
            className="h-[52px] rounded-2xl font-bold text-[16px] text-white active:opacity-90 transition-opacity"
            style={{ background: "#EC407A", boxShadow: "0 4px 14px rgba(236,64,122,0.35)" }}
          >
            Thanh toán
          </button>
        </div>
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
