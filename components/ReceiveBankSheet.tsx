"use client";
import { useEffect, useState } from "react";
import SafeImage from "./SafeImage";

interface ReceiveBankSheetProps {
  onSelectBank: (bank: "tcb") => void;
  onClose: () => void;
}

const BANKS = [
  {
    id: "tcb",
    name: "Techcombank",
    account: "19036406475021",
    logo: "/image/tcb.png",
    color: "#ED1C24",
    enabled: true,
  },
  {
    id: "mb",
    name: "MB Bank",
    account: "0982495562",
    logo: null,
    color: "#7B2D8B",
    enabled: false,
  },
] as const;

export default function ReceiveBankSheet({ onSelectBank, onClose }: ReceiveBankSheetProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  const handleSelect = (id: "tcb") => {
    setVisible(false);
    setTimeout(() => onSelectBank(id), 350);
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col justify-end" style={{ maxWidth: 390, left: "50%", transform: "translateX(-50%)" }}>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: visible ? 0.45 : 0 }}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className="relative bg-white rounded-t-[28px] overflow-hidden"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.34,1.1,0.64,1)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-[#E0E0E0] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-4">
          <div>
            <h2 className="text-[18px] font-bold text-[#222]">Nhận tiền</h2>
            <p className="text-[13px] text-[#AAAAAA]">Chọn tài khoản nhận</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center active:bg-[#EEEEEE]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Bank options */}
        <div className="px-4 pb-8 space-y-3">
          {BANKS.map((bank) => (
            <button
              key={bank.id}
              onClick={bank.enabled ? () => handleSelect("tcb") : undefined}
              disabled={!bank.enabled}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                bank.enabled
                  ? "border-[#E8E8E8] active:border-[#EC407A] active:bg-[#FFF5F8] cursor-pointer"
                  : "border-[#F0F0F0] opacity-50 cursor-not-allowed"
              }`}
              style={{ background: bank.enabled ? "white" : "#FAFAFA" }}
            >
              {/* Logo */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ background: bank.color + "15", border: `1.5px solid ${bank.color}30` }}
              >
                {bank.logo ? (
                  <SafeImage src={bank.logo} alt={bank.name} width={48} height={48} className="w-12 h-12 object-cover rounded-2xl" />
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke={bank.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-left min-w-0">
                <p className="text-[15px] font-bold text-[#222]">{bank.name}</p>
                <p className="text-[13px] text-[#AAAAAA] mt-0.5 font-mono tracking-wide">{bank.account}</p>
              </div>

              {/* State indicator */}
              {bank.enabled ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="#EC407A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="12" rx="3" stroke="#CCCCCC" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
