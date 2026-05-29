"use client";
import { useState } from "react";
import { usePayment } from "@/contexts/PaymentContext";

const BALANCE_HIDDEN = "*******";
const REMAINDER = 5236; // remaining after loan payment

function formatVND(n: number): string {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function Header() {
  const [showBalance, setShowBalance] = useState(false);
  const { isPaid, receivedAmount } = usePayment();

  // Balance logic:
  // - no receive yet        → "*******"
  // - received, not paid    → receivedAmount + 5,236đ
  // - received and paid     → 5,236đ
  const computedBalance = (): string => {
    if (receivedAmount === null) return BALANCE_HIDDEN;
    if (isPaid) return formatVND(REMAINDER);
    return formatVND(receivedAmount + REMAINDER);
  };

  const balanceText = showBalance ? computedBalance() : BALANCE_HIDDEN;

  return (
    <div className="relative overflow-hidden bg-white" style={{ minHeight: 195 }}>

      {/* Decorative blobs */}
      <div className="absolute pointer-events-none" style={{ top:-40, right:-40, width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle, #FDEAF4 0%, transparent 70%)" }} />
      <div className="absolute pointer-events-none" style={{ bottom:-30, left:-30, width:140, height:140, borderRadius:"50%", background:"radial-gradient(circle, #FCE4EC 0%, transparent 70%)" }} />
      <div className="absolute pointer-events-none" style={{ top:"40%", left:"45%", width:100, height:100, borderRadius:"50%", background:"radial-gradient(circle, #FFF1F7 0%, transparent 70%)" }} />

      {/* Wave lines */}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none" height="55" viewBox="0 0 390 55" preserveAspectRatio="none">
        <path d="M0 35 Q50 15 100 30 T200 28 T300 32 T390 25" fill="none" stroke="#EC407A" strokeWidth="1" opacity="0.12"/>
        <path d="M0 45 Q60 25 120 40 T240 38 T390 35" fill="none" stroke="#EC407A" strokeWidth="0.8" opacity="0.08"/>
        <path d="M0 55 Q80 38 160 50 T320 48 T390 45" fill="none" stroke="#FCB0C8" strokeWidth="1" opacity="0.1"/>
      </svg>

      {/* Content */}
      <div className="relative z-10 px-4 pt-4 pb-6">

        {/* Row 1: time + notification */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-[15px] font-semibold text-[#333]">15:33</span>
          <div className="relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="absolute -top-1.5 -right-2 bg-[#FF3B30] text-white text-[9px] font-bold px-1 py-0.5 rounded-full leading-none min-w-[18px] text-center">
              99+
            </span>
          </div>
        </div>

        {/* Row 2: balance + eye toggle */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[34px] font-black text-[#111] leading-none tracking-tight">
            {balanceText}
          </span>
          <button
            onClick={() => setShowBalance((p) => !p)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F5F5] active:bg-[#EEEEEE] transition-colors"
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

        {/* Row 3: slogan */}
        <p className="text-[21px] italic text-[#EC407A]" style={{ fontFamily:"'Brush Script MT','Segoe Script',cursive" }}>
          Uống nước nhớ nguồn
        </p>
      </div>
    </div>
  );
}
