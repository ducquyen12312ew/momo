"use client";
import { useEffect, useState } from "react";
import SafeImage from "./SafeImage";

interface ReceiveLoadingScreenProps {
  amount: number;
  onComplete: () => void;
}

export default function ReceiveLoadingScreen({ amount, onComplete }: ReceiveLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const DURATION = 5000;
    const INTERVAL = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += INTERVAL;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= DURATION) {
        clearInterval(timer);
        setDone(true);
        setTimeout(onComplete, 600);
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 animate-fadeIn">
      {/* TCB logo ring */}
      <div className="relative w-24 h-24 mb-8">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="42" fill="none" stroke="#F5F5F5" strokeWidth="6"/>
          <circle
            cx="48" cy="48" r="42" fill="none"
            stroke={done ? "#22C55E" : "#ED1C24"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
            style={{ transition: "stroke-dashoffset 0.05s linear, stroke 0.3s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {done ? (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#FFF0F0]">
              <SafeImage src="/image/tcb.png" alt="TCB" width={56} height={56} className="w-14 h-14 object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Status text */}
      <h2 className="text-[20px] font-bold text-[#222] mb-2 text-center">
        {done ? "Nhận tiền thành công!" : "Đang xử lý giao dịch..."}
      </h2>
      <p className="text-[14px] text-[#AAAAAA] text-center mb-6">
        {done
          ? `+${amount.toLocaleString("vi-VN")}đ đã được ghi nhận`
          : "Techcombank đang chuyển tiền về ví MoMo của bạn"}
      </p>

      {/* Amount */}
      <div
        className="px-8 py-4 rounded-3xl mb-8"
        style={{ background: done ? "#F0FFF4" : "#FFF0F0" }}
      >
        <p
          className="text-[28px] font-black text-center"
          style={{ color: done ? "#22C55E" : "#ED1C24" }}
        >
          +{amount.toLocaleString("vi-VN")}đ
        </p>
      </div>

      {/* Progress bar */}
      {!done && (
        <div className="w-full max-w-[280px]">
          <div className="h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ED1C24] rounded-full"
              style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
            />
          </div>
          <p className="text-[11px] text-[#CCCCCC] text-center mt-2">{Math.round(progress)}%</p>
        </div>
      )}

      {/* Steps */}
      <div className="mt-8 space-y-2 w-full max-w-[300px]">
        {[
          { label: "Xác thực giao dịch", done: progress > 20 },
          { label: "Kết nối Techcombank", done: progress > 50 },
          { label: "Chuyển tiền về ví MoMo", done: progress > 80 },
          { label: "Hoàn tất", done: done },
        ].map((step) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${step.done ? "bg-[#22C55E]" : "bg-[#F0F0F0]"}`}>
              {step.done && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className={`text-[13px] transition-colors duration-300 ${step.done ? "text-[#333] font-semibold" : "text-[#CCCCCC]"}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
