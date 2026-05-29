"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";

interface ReceiveAmountScreenProps {
  onBack: () => void;
  onConfirm: (amount: number) => void;
}

const QUICK_AMOUNTS = [500000, 1000000, 2000000, 3683000, 5000000];

function formatDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return parseInt(digits).toLocaleString("vi-VN");
}

export default function ReceiveAmountScreen({ onBack, onConfirm }: ReceiveAmountScreenProps) {
  const [rawInput, setRawInput] = useState("");

  const numericValue = parseInt(rawInput.replace(/\D/g, "") || "0");
  const displayValue = formatDisplay(rawInput);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setRawInput(digits);
  };

  const handleQuick = (amount: number) => {
    setRawInput(String(amount));
  };

  const handleConfirm = () => {
    if (numericValue > 0) onConfirm(numericValue);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp">
      {/* Header */}
      <div
        className="flex-shrink-0 pb-6"
        style={{ background: "linear-gradient(135deg, #ED1C24 0%, #B71C1C 100%)" }}
      >
        <div className="flex items-center gap-3 px-4 pt-14 pb-5">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-bold text-white flex-1">Nhận tiền Techcombank</h1>
        </div>

        {/* Bank info */}
        <div className="mx-4 bg-white/20 rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white overflow-hidden flex-shrink-0">
            <SafeImage src="/image/tcb.png" alt="TCB" width={40} height={40} className="w-10 h-10 object-cover" />
          </div>
          <div>
            <p className="text-white font-bold text-[14px]">Techcombank</p>
            <p className="text-white/80 text-[12px] font-mono">19036406475021</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 pt-5 pb-8 flex flex-col gap-4">
        {/* Amount input */}
        <div className="bg-white rounded-3xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <p className="text-[12px] text-[#AAAAAA] font-semibold uppercase mb-3">Số tiền nhận</p>
          <div className="flex items-baseline gap-2 mb-3">
            <input
              type="text"
              inputMode="numeric"
              value={displayValue}
              onChange={handleInput}
              placeholder="0"
              className="flex-1 text-[36px] font-black text-[#222] outline-none bg-transparent"
            />
            <span className="text-[20px] font-semibold text-[#AAAAAA]">đ</span>
          </div>
          <div className="h-px bg-[#F0F0F0] mb-3" />
          <p className="text-[12px] text-[#AAAAAA]">
            Từ: <span className="text-[#ED1C24] font-semibold">Phan Duc Quyen</span>
          </p>
        </div>

        {/* Quick amounts */}
        <div className="bg-white rounded-3xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <p className="text-[12px] text-[#AAAAAA] font-semibold uppercase mb-3">Chọn nhanh</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => handleQuick(a)}
                className={`px-3 py-2 rounded-2xl text-[13px] font-semibold transition-all active:scale-95 ${
                  numericValue === a
                    ? "bg-[#ED1C24] text-white"
                    : "bg-[#FFF0F0] text-[#ED1C24] border border-[#ED1C24]/20"
                }`}
              >
                {a.toLocaleString("vi-VN")}đ
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1" />

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          disabled={numericValue <= 0}
          className="w-full py-4 rounded-3xl text-white text-[15px] font-bold transition-all active:scale-[0.98] disabled:opacity-40"
          style={{
            background: numericValue > 0
              ? "linear-gradient(135deg, #ED1C24, #B71C1C)"
              : "#CCCCCC",
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
