"use client";
import { useState, useEffect, useRef } from "react";
import SafeImage from "./SafeImage";

const MESSAGES = [
  "Đang xác thực ngân hàng",
  "Đang xử lý giao dịch",
  "Kiểm tra thông tin khoản vay",
  "Đồng bộ thanh toán",
  "Hoàn tất giao dịch",
];

interface PaymentLoadingScreenProps {
  onComplete: () => void;
}

export default function PaymentLoadingScreen({ onComplete }: PaymentLoadingScreenProps) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const doneRef = useRef(false);
  const duration = useRef(5000 + Math.floor(Math.random() * 3001));

  useEffect(() => {
    const interval = duration.current / MESSAGES.length;

    const msgTimer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex((p) => (p + 1) % MESSAGES.length);
        setFade(true);
      }, 250);
    }, interval);

    const done = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        clearInterval(msgTimer);
        onComplete();
      }
    }, duration.current);

    return () => {
      clearInterval(msgTimer);
      clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 animate-screenIn">

      {/* Premium gradient spinner */}
      <div className="relative w-24 h-24 mb-7">
        {/* Track */}
        <svg className="w-24 h-24" viewBox="0 0 96 96" fill="none">
          <circle cx="48" cy="48" r="40" stroke="#F5F5F5" strokeWidth="8"/>
        </svg>
        {/* Spinning arc */}
        <svg
          className="w-24 h-24 absolute inset-0 animate-spin"
          viewBox="0 0 96 96"
          fill="none"
          style={{ animationDuration: "0.9s" }}
        >
          <defs>
            <linearGradient id="spinGrad" x1="48" y1="8" x2="88" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EC407A"/>
              <stop offset="1" stopColor="#FF8FB0" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path
            d="M48 8 A40 40 0 0 1 88 48"
            stroke="url(#spinGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FCE4EC] flex items-center justify-center">
            <SafeImage
              src="/image/vay.png"
              alt="Thanh toán"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>
      </div>

      <h2 className="text-[19px] font-bold text-[#222] mb-2">Đang xử lý thanh toán</h2>

      {/* Animated message */}
      <p
        className="text-[14px] font-medium text-center min-h-[22px] transition-opacity duration-300"
        style={{ color: "#EC407A", opacity: fade ? 1 : 0 }}
      >
        {MESSAGES[msgIndex]}
      </p>

      <p className="text-[12px] text-[#AAAAAA] text-center mt-5">
        Vui lòng không tắt ứng dụng
      </p>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-8">
        {MESSAGES.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-400"
            style={{
              width: i === msgIndex ? 20 : 8,
              height: 8,
              background: i === msgIndex ? "#EC407A" : "#EEEEEE",
            }}
          />
        ))}
      </div>
    </div>
  );
}
