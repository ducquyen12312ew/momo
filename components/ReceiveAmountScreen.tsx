"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";

interface ReceiveAmountScreenProps {
  onBack: () => void;
  onConfirm: (amount: number) => void;
}

const QUICK_AMOUNTS = [
  { label: "100K", value: 100000 },
  { label: "500K", value: 500000 },
  { label: "1 triệu", value: 1000000 },
  { label: "2 triệu", value: 2000000 },
  { label: "5 triệu", value: 5000000 },
];

function formatDisplay(digits: string): string {
  if (!digits) return "";
  return parseInt(digits).toLocaleString("vi-VN");
}

export default function ReceiveAmountScreen({ onBack, onConfirm }: ReceiveAmountScreenProps) {
  const [rawInput, setRawInput] = useState("");

  const numericValue = parseInt(rawInput || "0");
  const displayValue = formatDisplay(rawInput);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawInput(e.target.value.replace(/\D/g, ""));
  };

  const handleQuick = (amount: number) => setRawInput(String(amount));

  const handleConfirm = () => {
    if (numericValue > 0) onConfirm(numericValue);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col animate-slideUp">
      {/* ── Header ── */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #E53935 0%, #C62828 100%)" }}
      >
        {/* Blur glow */}
        <div className="absolute pointer-events-none" style={{ top:-40, right:-40, width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }} />
        <div className="absolute pointer-events-none" style={{ bottom:-20, left:-30, width:120, height:120, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />

        {/* Dot pattern */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="rdots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="white"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#rdots)"/>
        </svg>

        <div className="relative z-10">
          <div className="flex items-center gap-3 px-4 pt-14 pb-5">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center active:bg-white/25 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div>
              <h1 className="text-[19px] font-bold text-white">Nhận tiền</h1>
              <p className="text-[12px] text-white/65">Xác nhận số tiền muốn nhận</p>
            </div>
          </div>

          {/* Bank info card */}
          <div className="mx-4 mb-5">
            <div
              className="flex items-center gap-4 p-4 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.30)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}
            >
              {/* TCB logo */}
              <div
                className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-white"
                style={{ boxShadow: "0 3px 10px rgba(0,0,0,0.15)" }}
              >
                <SafeImage src="/image/tcb.png" alt="TCB" width={56} height={56} className="w-14 h-14 object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-[16px] mb-0.5">Techcombank</p>
                <p className="text-white/75 text-[13px] font-mono tracking-wider">1903 6406 4750 21</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#4CAF50]" />
                  <span className="text-white/70 text-[11px] font-semibold">Tài khoản hoạt động</span>
                </div>
              </div>

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-10 flex flex-col gap-4">

        {/* Amount input card */}
        <div
          className="bg-white rounded-[28px] p-5"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-[#E53935] rounded-full" />
            <p className="text-[11px] font-bold text-[#999] uppercase tracking-widest">Số tiền nhận</p>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[26px] font-black text-[#E53935]">₫</span>
            <input
              type="text"
              inputMode="numeric"
              value={displayValue}
              onChange={handleInput}
              placeholder="0"
              className="flex-1 text-[38px] font-black text-[#1A1A2E] outline-none bg-transparent leading-none"
              style={{ caretColor: "#E53935" }}
            />
          </div>

          <div className="h-px bg-gradient-to-r from-[#E53935]/30 via-[#E53935]/10 to-transparent mb-3" />

          <div className="flex items-center justify-between">
            <p className="text-[12px] text-[#AAAAAA]">
              Từ: <span className="font-bold text-[#E53935]">Phan Duc Quyen</span>
            </p>
            {numericValue > 0 && (
              <p className="text-[12px] text-[#AAAAAA]">
                ≈ <span className="font-semibold text-[#333]">{numericValue.toLocaleString("vi-VN")}đ</span>
              </p>
            )}
          </div>
        </div>

        {/* Quick amount cards */}
        <div>
          <p className="text-[11px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-3 px-1">Chọn nhanh</p>
          <div className="grid grid-cols-3 gap-2.5">
            {QUICK_AMOUNTS.slice(0, 3).map((a) => {
              const isSelected = numericValue === a.value;
              return (
                <button
                  key={a.value}
                  onClick={() => handleQuick(a.value)}
                  className="flex flex-col items-center py-3.5 rounded-[16px] transition-all active:scale-95"
                  style={isSelected ? {
                    background: "linear-gradient(135deg, #E53935, #C62828)",
                    boxShadow: "0 6px 16px rgba(229,57,53,0.35)",
                  } : {
                    background: "white",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  <span className={`text-[14px] font-black ${isSelected ? "text-white" : "text-[#1A1A2E]"}`}>{a.label}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? "text-white/75" : "text-[#AAAAAA]"}`}>
                    {a.value.toLocaleString("vi-VN")}đ
                  </span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2.5 mt-2.5">
            {QUICK_AMOUNTS.slice(3).map((a) => {
              const isSelected = numericValue === a.value;
              return (
                <button
                  key={a.value}
                  onClick={() => handleQuick(a.value)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-[16px] transition-all active:scale-95"
                  style={isSelected ? {
                    background: "linear-gradient(135deg, #E53935, #C62828)",
                    boxShadow: "0 6px 16px rgba(229,57,53,0.35)",
                  } : {
                    background: "white",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  <div>
                    <p className={`text-[14px] font-black ${isSelected ? "text-white" : "text-[#1A1A2E]"}`}>{a.label}</p>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? "text-white/75" : "text-[#AAAAAA]"}`}>{a.value.toLocaleString("vi-VN")}đ</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke={isSelected ? "rgba(255,255,255,0.7)" : "#DDDDDD"} strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1" />

        {/* Summary */}
        {numericValue > 0 && (
          <div className="bg-[#FFF5F5] rounded-2xl px-4 py-3.5 flex items-center justify-between border border-[#E53935]/10">
            <span className="text-[13px] text-[#777]">Tổng nhận về ví</span>
            <span className="text-[17px] font-black text-[#E53935]">+{numericValue.toLocaleString("vi-VN")}đ</span>
          </div>
        )}

        {/* Confirm CTA */}
        <button
          onClick={handleConfirm}
          disabled={numericValue <= 0}
          className="w-full py-4 rounded-3xl text-white text-[16px] font-bold transition-all active:scale-[0.98] disabled:opacity-40"
          style={{
            background: numericValue > 0
              ? "linear-gradient(135deg, #E53935 0%, #C62828 100%)"
              : "#CCCCCC",
            boxShadow: numericValue > 0 ? "0 8px 24px rgba(229,57,53,0.35)" : "none",
          }}
        >
          {numericValue > 0
            ? `Xác nhận nhận ${numericValue.toLocaleString("vi-VN")}đ`
            : "Nhập số tiền"}
        </button>
      </div>
    </div>
  );
}
