"use client";
import { useState, useEffect } from "react";
import { usePayment } from "@/contexts/PaymentContext";

const REMAINDER = 5236;

function formatVND(n: number): string {
  return n.toLocaleString("vi-VN") + "đ";
}

function getTimeString(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

export default function Header() {
  const [showBalance, setShowBalance] = useState(false);
  const [time, setTime] = useState(getTimeString());
  const { isPaid, receivedAmount } = usePayment();

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeString()), 10000);
    return () => clearInterval(t);
  }, []);

  const computedBalance = (): string => {
    if (receivedAmount === null) return "*******";
    if (isPaid) return formatVND(REMAINDER);
    return formatVND(receivedAmount + REMAINDER);
  };

  const balanceText = showBalance ? computedBalance() : "*******";
  const hasAmount = receivedAmount !== null;

  return (
    <div className="relative overflow-hidden bg-white" style={{ minHeight: 195 }}>
      {/* Decorative gradient blobs */}
      <div className="absolute pointer-events-none" style={{ top:-50, right:-50, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, #FDEAF4 0%, transparent 65%)" }} />
      <div className="absolute pointer-events-none" style={{ bottom:-40, left:-40, width:160, height:160, borderRadius:"50%", background:"radial-gradient(circle, #FCE4EC 0%, transparent 65%)" }} />
      <div className="absolute pointer-events-none" style={{ top:"35%", left:"42%", width:120, height:120, borderRadius:"50%", background:"radial-gradient(circle, #FFF0F7 0%, transparent 65%)" }} />

      {/* Wave lines */}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none" height="55" viewBox="0 0 390 55" preserveAspectRatio="none">
        <path d="M0 35 Q50 15 100 30 T200 28 T300 32 T390 25" fill="none" stroke="#EC407A" strokeWidth="1" opacity="0.15"/>
        <path d="M0 45 Q60 25 120 40 T240 38 T390 35" fill="none" stroke="#EC407A" strokeWidth="0.8" opacity="0.08"/>
        <path d="M0 55 Q80 38 160 50 T320 48 T390 45" fill="none" stroke="#FCB0C8" strokeWidth="1.2" opacity="0.12"/>
      </svg>

      {/* Content */}
      <div className="relative z-10 px-4 pt-5 pb-6">

        {/* Row 1: time + notification */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 rounded-full bg-[#EC407A]" />
            <span className="text-[15px] font-bold text-[#1A1A2E]">{time}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Premium badge */}
            {hasAmount && (
              <div className="flex items-center gap-1 bg-[#FFF8E1] border border-[#FFD54F] px-2.5 py-0.5 rounded-full">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#FF8F00">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span className="text-[10px] font-bold text-[#FF8F00]">Vàng</span>
              </div>
            )}
            {/* Notification bell */}
            <button className="relative w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center active:bg-[#EEEEEE] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 bg-[#FF3B30] text-white text-[8px] font-bold px-1 py-0.5 rounded-full leading-none min-w-[16px] text-center">
                99+
              </span>
            </button>
          </div>
        </div>

        {/* Row 2: balance label */}
        <p className="text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
          Số dư ví MoMo
        </p>

        {/* Row 3: balance + eye */}
        <div className="flex items-center gap-3 mb-2">
          <span className={`font-black leading-none tracking-tight transition-all duration-300 ${
            showBalance && hasAmount ? "text-[28px] text-[#1A1A2E]" : "text-[34px] text-[#1A1A2E]"
          }`}>
            {balanceText}
          </span>
          <button
            onClick={() => setShowBalance((p) => !p)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F5F5F5] active:bg-[#EEEEEE] transition-colors"
          >
            {showBalance ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="#777" strokeWidth="2"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="1" y1="1" x2="23" y2="23" stroke="#777" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

        {/* Row 4: tagline */}
        <p className="text-[21px] italic text-[#EC407A]" style={{ fontFamily:"'Brush Script MT','Segoe Script',cursive" }}>
          Uống nước nhớ nguồn
        </p>
      </div>
    </div>
  );
}
