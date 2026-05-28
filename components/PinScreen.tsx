"use client";
import { useState, useRef } from "react";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

interface PinScreenProps {
  onSuccess: () => void;
  onBack: () => void;
  title?: string;
  subtitle?: string;
}

export default function PinScreen({
  onSuccess,
  onBack,
  title = "Xác thực giao dịch",
  subtitle = "Vui lòng nhập mã PIN để tiếp tục",
}: PinScreenProps) {
  const [pin, setPin] = useState("");
  // Cooldown ref to prevent double-fire on mobile (onClick fires after touch events)
  const lastTap = useRef(0);

  const handleKey = (key: string) => {
    // Debounce: ignore taps within 120ms of the previous one
    const now = Date.now();
    if (now - lastTap.current < 120) return;
    lastTap.current = now;

    if (key === "⌫") {
      setPin((p) => p.slice(0, -1));
      return;
    }

    setPin((prev) => {
      if (prev.length >= 6) return prev;
      const next = prev + key;
      if (next.length === 6) {
        // Any 6-digit PIN is accepted — navigate after brief visual feedback
        setTimeout(onSuccess, 180);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col animate-screenIn">
      {/* Back button */}
      <div className="flex items-center px-4 pt-14 pb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center active:bg-[#EEEEEE]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pt-6">
        {/* Lock icon */}
        <div className="w-16 h-16 rounded-full bg-[#FCE4EC] flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="12" rx="3" stroke="#EC407A" strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="17" r="1.5" fill="#EC407A"/>
          </svg>
        </div>

        <h1 className="text-[22px] font-bold text-[#222] mb-2">{title}</h1>
        <p className="text-[14px] text-[#777] text-center mb-10">{subtitle}</p>

        {/* PIN dots */}
        <div className="flex gap-5 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`w-[14px] h-[14px] rounded-full border-2 transition-all duration-150 ${
                pin.length > i
                  ? "bg-[#EC407A] border-[#EC407A] scale-110"
                  : "bg-transparent border-[#DDDDDD]"
              }`}
            />
          ))}
        </div>

        <div className="flex-1" />

        {/* Keypad — onClick only, no onMouseDown/onTouchStart */}
        <div className="w-full max-w-[300px] mb-10">
          <div className="grid grid-cols-3 gap-3">
            {KEYS.map((key, i) => {
              if (key === "") return <div key={i} />;
              return (
                <button
                  key={i}
                  onClick={() => handleKey(key)}
                  className={`h-[64px] rounded-2xl flex items-center justify-center transition-all active:scale-95 select-none ${
                    key === "⌫" ? "bg-transparent" : "bg-[#F5F5F5] active:bg-[#EAEAEA]"
                  }`}
                >
                  {key === "⌫" ? (
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                      <path d="M9 1H22C22.6 1 23 1.4 23 2V16C23 16.6 22.6 17 22 17H9L1 9L9 1Z" stroke="#555" strokeWidth="1.8" strokeLinejoin="round"/>
                      <path d="M14 6l-4 6M10 6l4 6" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <span className="text-[26px] font-semibold text-[#222]">{key}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
