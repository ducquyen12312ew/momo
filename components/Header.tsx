"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";
import { BALANCE_HIDDEN, BALANCE_VISIBLE } from "@/constants";

export default function Header() {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #7CB342 0%, #8BC34A 30%, #9CCC65 60%, #AED581 100%)",
        }}
      />

      {/* Contour / wave pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 390 220"
        preserveAspectRatio="xMidYMid slice"
      >
        <ellipse cx="350" cy="30" rx="120" ry="80" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <ellipse cx="350" cy="30" rx="90" ry="55" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
        <ellipse cx="350" cy="30" rx="60" ry="35" fill="none" stroke="white" strokeWidth="0.8" opacity="0.4"/>
        <ellipse cx="-20" cy="180" rx="130" ry="90" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
        <ellipse cx="-20" cy="180" rx="100" ry="65" fill="none" stroke="white" strokeWidth="1" opacity="0.4"/>
        <path d="M0 120 Q80 80 160 110 T320 100 T390 90" fill="none" stroke="white" strokeWidth="1" opacity="0.35"/>
        <path d="M0 140 Q100 110 200 130 T390 120" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3"/>
        <path d="M0 160 Q120 140 240 155 T390 145" fill="none" stroke="white" strokeWidth="0.7" opacity="0.25"/>
        <circle cx="180" cy="200" r="70" fill="none" stroke="white" strokeWidth="1" opacity="0.15"/>
        <circle cx="180" cy="200" r="45" fill="none" stroke="white" strokeWidth="0.8" opacity="0.12"/>
      </svg>

      {/* Content */}
      <div className="relative z-10 px-4 pt-4 pb-5">
        {/* Top row: time + notification */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-[15px] font-semibold text-[#333333]">15:33</div>
          </div>
          <div className="relative mt-0.5">
            <SafeImage
              src="/images/icon-notification.svg"
              alt="Thông báo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            {/* Badge */}
            <span className="absolute -top-1.5 -right-2 bg-[#FF3B30] text-white text-[9px] font-bold px-1 py-0.5 rounded-full leading-none min-w-[18px] text-center">
              99+
            </span>
          </div>
        </div>

        {/* Balance row */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[34px] font-bold text-[#222222] leading-tight tracking-tight">
            {showBalance ? BALANCE_VISIBLE : BALANCE_HIDDEN}
          </span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 active:bg-white/30"
          >
            <SafeImage
              src={showBalance ? "/images/icon-eye.svg" : "/images/icon-eye-off.svg"}
              alt={showBalance ? "Ẩn số dư" : "Hiện số dư"}
              width={18}
              height={18}
              className="w-[18px] h-[18px] opacity-80"
            />
          </button>
        </div>

        {/* Slogan */}
        <div
          className="text-[22px] italic font-handwritten text-[#EC407A]"
          style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
        >
          Uống nước nhớ nguồn
        </div>
      </div>
    </div>
  );
}
