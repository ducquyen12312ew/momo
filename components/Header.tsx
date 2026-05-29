"use client";
import { useState } from "react";
import { usePayment } from "@/contexts/PaymentContext";

const REMAINDER = 5236;

function formatVND(n: number): string {
  return n.toLocaleString("vi-VN") + "đ";
}

interface HeaderProps {
  onTopupClick?: () => void;
}

export default function Header({ onTopupClick }: HeaderProps) {
  const [showBalance, setShowBalance] = useState(false);
  const { isPaid, receivedAmount } = usePayment();

  const computedBalance = (): string => {
    if (receivedAmount === null) return "• • • • • •";
    if (isPaid) return formatVND(REMAINDER);
    return formatVND(receivedAmount + REMAINDER);
  };

  const balanceText = showBalance ? computedBalance() : "• • • • • •";
  const hasAmount = receivedAmount !== null;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #FFF5FA 0%, #FDEAF4 45%, #FFF0F8 70%, #FFFFFF 100%)",
        minHeight: 220,
      }}
    >
      {/* ── Decorative radial glows ── */}
      <div className="absolute pointer-events-none" style={{ top: -70, right: -70, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,64,122,0.12) 0%, transparent 60%)" }} />
      <div className="absolute pointer-events-none" style={{ top: 40, left: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(252,180,200,0.18) 0%, transparent 65%)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: -20, right: 40, width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(253,234,244,0.9) 0%, transparent 70%)" }} />
      <div className="absolute pointer-events-none" style={{ top: "30%", left: "50%", width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,241,247,0.8) 0%, transparent 70%)" }} />

      {/* ── Blur floating circles ── */}
      <div className="absolute pointer-events-none" style={{ top: 20, right: 30, width: 48, height: 48, borderRadius: "50%", background: "rgba(236,64,122,0.07)", filter: "blur(12px)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: 30, left: 24, width: 36, height: 36, borderRadius: "50%", background: "rgba(236,64,122,0.09)", filter: "blur(8px)" }} />
      <div className="absolute pointer-events-none" style={{ top: "55%", right: "38%", width: 28, height: 28, borderRadius: "50%", background: "rgba(252,176,200,0.25)", filter: "blur(6px)" }} />

      {/* ── Subtle dot pattern ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#EC407A"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      </svg>

      {/* ── Soft wave at bottom ── */}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none" height="40" viewBox="0 0 390 40" preserveAspectRatio="none">
        <path d="M0 30 Q60 10 130 22 T260 20 T390 16 L390 40 L0 40Z" fill="rgba(236,64,122,0.04)"/>
        <path d="M0 38 Q80 20 170 30 T340 28 T390 24 L390 40 L0 40Z" fill="rgba(252,180,200,0.06)"/>
      </svg>

      {/* ── Content ── */}
      <div className="relative z-10 px-4 pt-12 pb-5">

        {/* Row 1: greeting + notification */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[12px] font-semibold text-[#C2185B]/70 uppercase tracking-widest mb-0.5">Xin chào 👋</p>
            <p className="text-[17px] font-bold text-[#1A1A2E]">Phan Đức Quyền</p>
          </div>

          <div className="flex items-center gap-2">
            {hasAmount && (
              <div className="flex items-center gap-1.5 bg-white border border-[#FFD54F]/60 px-2.5 py-1 rounded-full shadow-sm">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#FF8F00">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span className="text-[11px] font-bold text-[#FF8F00]">Vàng</span>
              </div>
            )}
            <button className="relative w-10 h-10 rounded-2xl bg-white flex items-center justify-center active:bg-[#F5F5F5] transition-colors" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[8px] font-black px-1 py-0.5 rounded-full leading-none min-w-[16px] text-center border-2 border-white">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Balance card */}
        <div
          className="rounded-3xl p-4"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 4px 24px rgba(236,64,122,0.10), 0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          <p className="text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-2">
            Số dư khả dụng
          </p>

          <div className="flex items-center justify-between">
            {/* Balance + eye */}
            <div className="flex items-center gap-2.5">
              <span
                className="leading-none tracking-tight transition-all duration-300"
                style={{
                  fontSize: showBalance && hasAmount ? "24px" : "28px",
                  fontWeight: 600,
                  color: "#1A1A2E",
                  letterSpacing: showBalance ? "-0.3px" : "0px",
                }}
              >
                {balanceText}
              </span>
              <button
                onClick={() => setShowBalance((p) => !p)}
                className="w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all"
                style={{ background: "#FCE4EC" }}
              >
                {showBalance ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#EC407A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="#EC407A" strokeWidth="2.2"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#EC407A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="#EC407A" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Nạp tiền quick action */}
            <button
              onClick={onTopupClick}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl active:scale-95 transition-all"
              style={{
                background: "linear-gradient(135deg, #EC407A, #C2185B)",
                boxShadow: "0 4px 12px rgba(236,64,122,0.30)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span className="text-white text-[12px] font-bold">Nạp tiền</span>
            </button>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="mt-3 text-center text-[14px] italic"
          style={{
            fontFamily: "'Brush Script MT','Segoe Script',cursive",
            color: "#EC407A",
            opacity: 0.55,
          }}
        >
          Uống nước nhớ nguồn
        </p>
      </div>
    </div>
  );
}
