"use client";
import { useState } from "react";

interface QRCodeScreenProps {
  onBack: () => void;
}

export default function QRCodeScreen({ onBack }: QRCodeScreenProps) {
  const [tab, setTab] = useState<"qr" | "scan">("qr");

  return (
    <div className="min-h-screen bg-white flex flex-col animate-slideUp">
      {/* Header */}
      <div
        className="flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #EC407A 0%, #D81B60 100%)" }}
      >
        <div className="flex items-center gap-3 px-4 pt-14 pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-bold text-white flex-1">Mã VietQR</h1>
          <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Tab toggle */}
        <div className="flex mx-4 mb-4 bg-white/20 rounded-2xl p-1">
          <button
            onClick={() => setTab("qr")}
            className={`flex-1 py-2 rounded-xl text-[13px] font-semibold transition-all ${tab === "qr" ? "bg-white text-[#EC407A]" : "text-white"}`}
          >
            Mã của tôi
          </button>
          <button
            onClick={() => setTab("scan")}
            className={`flex-1 py-2 rounded-xl text-[13px] font-semibold transition-all ${tab === "scan" ? "bg-white text-[#EC407A]" : "text-white"}`}
          >
            Quét mã
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
        {tab === "qr" ? (
          <>
            <p className="text-[14px] text-[#777] mb-6 text-center">Dùng mã này để nhận tiền từ bất kỳ ai</p>

            {/* QR code placeholder */}
            <div
              className="w-[220px] h-[220px] rounded-3xl bg-white p-4 mb-6"
              style={{ boxShadow: "0 8px 32px rgba(236,64,122,0.15)" }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                {/* Simulated QR pattern */}
                <div className="w-full h-full grid" style={{ gridTemplateColumns: "repeat(11, 1fr)", gap: 2, padding: 4 }}>
                  {Array.from({ length: 121 }).map((_, i) => {
                    const row = Math.floor(i / 11);
                    const col = i % 11;
                    const isCorner =
                      (row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3);
                    const isDark = isCorner || Math.random() > 0.55;
                    return (
                      <div
                        key={i}
                        className="rounded-[1px]"
                        style={{ background: isDark ? "#222" : "white", aspectRatio: "1" }}
                      />
                    );
                  })}
                </div>
                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-[#EC407A] flex items-center justify-center shadow-lg">
                    <span className="text-white text-[10px] font-black">M</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[17px] font-bold text-[#222] mb-1">Phan Đức Quyền</p>
            <p className="text-[13px] text-[#AAAAAA] mb-6">0901 234 567</p>

            <button className="flex items-center gap-2 bg-[#FCE4EC] px-6 py-3 rounded-2xl active:bg-[#F8BBD0] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="7 10 12 15 17 10" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="15" x2="12" y2="3" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-[14px] font-semibold text-[#EC407A]">Lưu & Chia sẻ</span>
            </button>
          </>
        ) : (
          <>
            <p className="text-[14px] text-[#777] mb-6 text-center">Đưa camera vào mã QR để thanh toán</p>

            <div
              className="w-[240px] h-[240px] rounded-3xl overflow-hidden relative mb-6"
              style={{ background: "#1A1A2E", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
            >
              {/* Camera viewfinder effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[180px] h-[180px]">
                  {/* Corner markers */}
                  {[
                    "top-0 left-0",
                    "top-0 right-0 rotate-90",
                    "bottom-0 left-0 -rotate-90",
                    "bottom-0 right-0 rotate-180",
                  ].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-8 h-8`}>
                      <div className="absolute top-0 left-0 w-8 h-1.5 bg-[#EC407A] rounded-full" />
                      <div className="absolute top-0 left-0 w-1.5 h-8 bg-[#EC407A] rounded-full" />
                    </div>
                  ))}
                  {/* Scan line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#EC407A] opacity-70"
                    style={{ animation: "scanLine 2s ease-in-out infinite" }} />
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <span className="text-white/60 text-[11px]">Đang tìm mã QR...</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                    <polyline points="17 8 12 3 7 8" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="12" y1="3" x2="12" y2="15" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[12px] text-[#555]">Thư viện</span>
              </button>
              <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" stroke="#555" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[12px] text-[#555]">Lịch sử</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
