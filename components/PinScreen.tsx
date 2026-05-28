"use client";
import { useState } from "react";

const CORRECT_PIN = "211104";
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

interface PinScreenProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function PinScreen({ onSuccess, onBack }: PinScreenProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleKey = (key: string) => {
    if (shake) return;
    if (key === "⌫") {
      setPin((p) => p.slice(0, -1));
      setError("");
      return;
    }
    if (pin.length >= 6) return;

    const next = pin + key;
    setPin(next);
    setError("");

    if (next.length === 6) {
      setTimeout(() => {
        if (next === CORRECT_PIN) {
          onSuccess();
        } else {
          setShake(true);
          setError("Mã PIN không chính xác");
          setTimeout(() => {
            setPin("");
            setShake(false);
          }, 600);
        }
      }, 150);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col animate-screenIn">
      {/* Header */}
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

      {/* Body */}
      <div className="flex-1 flex flex-col items-center px-6 pt-6">
        {/* Lock icon */}
        <div className="w-16 h-16 rounded-full bg-[#FCE4EC] flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="12" rx="3" stroke="#EC407A" strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="17" r="1.5" fill="#EC407A"/>
          </svg>
        </div>

        <h1 className="text-[22px] font-bold text-[#222222] mb-2">Xác thực giao dịch</h1>
        <p className="text-[14px] text-[#777777] text-center mb-10">
          Vui lòng nhập mã PIN để tiếp tục
        </p>

        {/* PIN dots */}
        <div className={`flex gap-5 mb-3 ${shake ? "animate-shake" : ""}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`w-[14px] h-[14px] rounded-full border-2 transition-all duration-150 ${
                pin.length > i
                  ? error
                    ? "bg-red-500 border-red-500 scale-110"
                    : "bg-[#EC407A] border-[#EC407A] scale-110"
                  : "bg-transparent border-[#DDDDDD]"
              }`}
            />
          ))}
        </div>

        {/* Error */}
        <div className="h-6 flex items-center justify-center">
          {error && (
            <p className="text-[13px] text-red-500 font-medium">{error}</p>
          )}
        </div>

        <div className="flex-1" />

        {/* Keypad */}
        <div className="w-full max-w-[300px] mb-10">
          <div className="grid grid-cols-3 gap-3">
            {KEYS.map((key, i) => {
              if (key === "") return <div key={i} />;
              return (
                <button
                  key={i}
                  onMouseDown={() => handleKey(key)}
                  onClick={() => handleKey(key)}
                  className={`h-[64px] rounded-2xl flex items-center justify-center transition-all active:scale-95 select-none ${
                    key === "⌫"
                      ? "bg-transparent"
                      : "bg-[#F5F5F5] active:bg-[#EAEAEA]"
                  }`}
                >
                  {key === "⌫" ? (
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                      <path d="M9 1H22C22.6 1 23 1.4 23 2V16C23 16.6 22.6 17 22 17H9L1 9L9 1Z" stroke="#555" strokeWidth="1.8" strokeLinejoin="round"/>
                      <path d="M14 6l-4 6M10 6l4 6" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <span className="text-[26px] font-semibold text-[#222222]">{key}</span>
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
