"use client";
import { useState } from "react";

interface BillScreenProps {
  onBack: () => void;
}

const BILL_TYPES = [
  { id: "electric", label: "Điện", icon: "⚡", color: "#FF9800", provider: "EVN TP.HCM", amount: "485.000", due: "15/06/2026" },
  { id: "water", label: "Nước", icon: "💧", color: "#2196F3", provider: "SAWACO", amount: "120.000", due: "20/06/2026" },
  { id: "internet", label: "Internet", icon: "🌐", color: "#4CAF50", provider: "FPT Telecom", amount: "220.000", due: "10/06/2026" },
  { id: "tv", label: "Truyền hình", icon: "📺", color: "#9C27B0", provider: "VTVcab", amount: "165.000", due: "25/06/2026" },
];

export default function BillScreen({ onBack }: BillScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [paid, setPaid] = useState<Set<string>>(new Set());

  const selectedBill = BILL_TYPES.find((b) => b.id === selected);

  if (selected && selectedBill) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp">
        <div className="bg-white flex-shrink-0" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-3 px-4 pt-14 pb-4">
            <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center active:bg-[#EEEEEE]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span className="text-[18px] font-bold text-[#222]">Thanh toán {selectedBill.label}</span>
          </div>
        </div>

        <div className="flex-1 px-4 pt-6 pb-8 space-y-4">
          <div className="bg-white rounded-3xl p-5" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px]" style={{ background: selectedBill.color + "20" }}>
                {selectedBill.icon}
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#222]">{selectedBill.provider}</p>
                <p className="text-[13px] text-[#AAAAAA]">Mã KH: 7821 0094 2137</p>
              </div>
            </div>

            {[
              { label: "Kỳ thanh toán", value: "Tháng 5/2026" },
              { label: "Hạn thanh toán", value: selectedBill.due },
              { label: "Số tiền", value: `${selectedBill.amount}đ` },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2.5 border-b border-[#F5F5F5] last:border-0">
                <span className="text-[13px] text-[#777]">{row.label}</span>
                <span className="text-[14px] font-semibold text-[#222]">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-5" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <p className="text-[12px] text-[#AAAAAA] mb-1">Thanh toán từ</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FCE4EC] flex items-center justify-center">
                <span className="text-[#EC407A] text-[12px] font-bold">M</span>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#222]">Ví MoMo</p>
                <p className="text-[12px] text-[#AAAAAA]">Số dư: 5.124.000đ</p>
              </div>
            </div>
          </div>

          {paid.has(selected) ? (
            <div className="w-full py-4 rounded-3xl bg-[#E8F5E9] text-[#2E7D32] text-[15px] font-bold text-center">
              ✓ Đã thanh toán
            </div>
          ) : (
            <button
              onClick={() => {
                setPaid((p) => { const n = new Set(p); n.add(selected); return n; });
              }}
              className="w-full py-4 rounded-3xl text-white text-[15px] font-bold transition-all active:scale-98"
              style={{ background: `linear-gradient(135deg, ${selectedBill.color}, ${selectedBill.color}CC)` }}
            >
              Thanh toán {selectedBill.amount}đ
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp">
      <div className="bg-white flex-shrink-0" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-3 px-4 pt-14 pb-4">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center active:bg-[#EEEEEE]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[18px] font-bold text-[#222]">Thanh toán hóa đơn</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8">
        <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-3 px-1">Hóa đơn của bạn</p>
        <div className="space-y-3">
          {BILL_TYPES.map((bill) => (
            <button
              key={bill.id}
              onClick={() => setSelected(bill.id)}
              className="w-full bg-white rounded-3xl p-4 flex items-center gap-4 text-left active:scale-98 transition-all"
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[22px] flex-shrink-0" style={{ background: bill.color + "20" }}>
                {bill.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-[#222]">{bill.provider}</p>
                <p className="text-[12px] text-[#AAAAAA]">HSD: {bill.due}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[15px] font-bold" style={{ color: bill.color }}>{bill.amount}đ</p>
                {paid.has(bill.id) ? (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32]">Đã TT</span>
                ) : (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF3E0] text-[#E65100]">Chưa TT</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
