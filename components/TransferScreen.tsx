"use client";
import { useState } from "react";

interface TransferScreenProps {
  onBack: () => void;
}

const RECENTS = [
  { name: "Nguyễn Thị Lan", phone: "0912 345 678", avatar: "L" },
  { name: "Trần Văn Minh", phone: "0987 654 321", avatar: "M" },
  { name: "Lê Thị Hoa", phone: "0901 111 222", avatar: "H" },
  { name: "Phạm Quốc Bảo", phone: "0938 777 888", avatar: "B" },
];

const AVATARCOLORS = ["#FF6BA8", "#4CAF50", "#2196F3", "#FF9800"];

export default function TransferScreen({ onBack }: TransferScreenProps) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"input" | "amount" | "confirm">("input");
  const [amount, setAmount] = useState("");
  const [selectedRecent, setSelectedRecent] = useState<typeof RECENTS[0] | null>(null);

  const QUICK_AMOUNTS = ["50.000", "100.000", "200.000", "500.000"];

  const handleSelectRecent = (r: typeof RECENTS[0]) => {
    setSelectedRecent(r);
    setPhone(r.phone);
    setStep("amount");
  };

  const formatAmount = (raw: string) => {
    const num = raw.replace(/\D/g, "");
    return num ? parseInt(num).toLocaleString("vi-VN") : "";
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp">
      {/* Header */}
      <div
        className="flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #EC407A 0%, #D81B60 100%)" }}
      >
        <div className="flex items-center gap-3 px-4 pt-14 pb-4">
          <button
            onClick={step === "input" ? onBack : () => setStep("input")}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-bold text-white flex-1">Chuyển tiền</h1>
        </div>

        {step === "input" && (
          <div className="px-4 pb-4">
            <div className="bg-white/20 rounded-2xl flex items-center gap-2 px-3 py-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại hoặc tên"
                className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/60 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {step === "input" && (
        <div className="flex-1 overflow-y-auto">
          {/* Recents */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-3 px-1">Gần đây</p>
            <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              {RECENTS.map((r, idx) => (
                <div key={r.phone}>
                  <button
                    onClick={() => handleSelectRecent(r)}
                    className="flex items-center gap-3 px-4 py-3.5 w-full text-left active:bg-[#FFF5F8] transition-colors"
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[16px] font-bold flex-shrink-0"
                      style={{ background: AVATARCOLORS[idx % AVATARCOLORS.length] }}
                    >
                      {r.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#222]">{r.name}</p>
                      <p className="text-[12px] text-[#AAAAAA]">{r.phone}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="#DDDDDD" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  {idx < RECENTS.length - 1 && <div className="h-px bg-[#F8F8F8] ml-[68px]" />}
                </div>
              ))}
            </div>
          </div>

          {phone.trim().length > 0 && (
            <div className="px-4 pt-2">
              <button
                onClick={() => setStep("amount")}
                className="w-full py-4 bg-[#EC407A] rounded-3xl text-white text-[15px] font-bold active:bg-[#D81B60] transition-colors"
              >
                Tiếp tục
              </button>
            </div>
          )}
        </div>
      )}

      {step === "amount" && (
        <div className="flex-1 flex flex-col px-4 pt-6 pb-8">
          {/* Recipient */}
          <div className="bg-white rounded-3xl p-4 mb-4 flex items-center gap-3" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div className="w-12 h-12 rounded-full bg-[#EC407A] flex items-center justify-center text-white text-[18px] font-bold">
              {selectedRecent?.avatar ?? phone[0]?.toUpperCase() ?? "?"}
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#222]">{selectedRecent?.name ?? "Người dùng MoMo"}</p>
              <p className="text-[13px] text-[#AAAAAA]">{selectedRecent?.phone ?? phone}</p>
            </div>
          </div>

          {/* Amount input */}
          <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <p className="text-[12px] text-[#AAAAAA] mb-2">Số tiền</p>
            <div className="flex items-baseline gap-2">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(formatAmount(e.target.value))}
                placeholder="0"
                className="flex-1 text-[32px] font-bold text-[#222] outline-none bg-transparent"
              />
              <span className="text-[18px] font-semibold text-[#AAAAAA]">đ</span>
            </div>
            <div className="h-px bg-[#F0F0F0] mt-3 mb-3" />
            <p className="text-[12px] text-[#AAAAAA]">Số dư khả dụng: <span className="text-[#222] font-semibold">5.124.000đ</span></p>
          </div>

          {/* Quick amounts */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {QUICK_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                className={`py-2.5 rounded-2xl text-[13px] font-semibold transition-all active:scale-95 ${
                  amount === a ? "bg-[#EC407A] text-white" : "bg-white text-[#EC407A] border border-[#EC407A]/30"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {/* Note */}
          <input
            type="text"
            placeholder="Lời nhắn (tùy chọn)"
            className="bg-white rounded-2xl px-4 py-3.5 text-[13px] text-[#333] outline-none placeholder:text-[#AAAAAA] mb-6"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          />

          <div className="flex-1" />

          <button
            onClick={() => alert("Tính năng chuyển tiền đang phát triển!")}
            disabled={!amount}
            className="w-full py-4 rounded-3xl text-white text-[15px] font-bold transition-all active:scale-98 disabled:opacity-40"
            style={{ background: amount ? "linear-gradient(135deg, #EC407A, #D81B60)" : "#CCCCCC" }}
          >
            Chuyển tiền {amount ? `${amount}đ` : ""}
          </button>
        </div>
      )}
    </div>
  );
}
