"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";
import { WALLET_ITEMS } from "@/constants";

export default function WalletCard() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="px-4 py-3">
      {/* Wallet switcher tabs */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {WALLET_ITEMS.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActiveIdx(i)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all flex-shrink-0 ${
              activeIdx === i
                ? "bg-[#EC407A] text-white shadow-md shadow-[#EC407A]/30"
                : "bg-[#F5F5F5] text-[#777]"
            }`}
          >
            <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
              <SafeImage src={item.icon} alt={item.name} width={16} height={16} className="w-4 h-4 object-cover" />
            </div>
            {item.name}
          </button>
        ))}
      </div>

      {/* Active wallet card */}
      <div
        className="rounded-[22px] overflow-hidden relative"
        style={{
          background: activeIdx === 0
            ? "linear-gradient(135deg, #FF6BA8 0%, #EC407A 50%, #C2185B 100%)"
            : activeIdx === 1
            ? "linear-gradient(135deg, #FFD54F 0%, #FF8F00 60%, #E65100 100%)"
            : "linear-gradient(135deg, #64B5F6 0%, #1976D2 60%, #0D47A1 100%)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
          minHeight: 110,
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/8 pointer-events-none" />
        <div className="absolute top-4 left-1/2 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/70 text-[11px] font-semibold uppercase tracking-wider mb-0.5">
                {WALLET_ITEMS[activeIdx].name}
              </p>
              <p className="text-white text-[28px] font-black tracking-tight leading-none">
                {WALLET_ITEMS[activeIdx].balance}
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
              <SafeImage
                src={WALLET_ITEMS[activeIdx].icon}
                alt={WALLET_ITEMS[activeIdx].name}
                width={44}
                height={44}
                className="w-11 h-11 object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>
            <button className="flex items-center gap-1.5 bg-white/20 rounded-xl px-3 py-1.5 active:bg-white/30 transition-colors">
              <span className="text-white text-[12px] font-semibold">Trung Tâm Tài Chính</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
