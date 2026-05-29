"use client";
import { useState } from "react";

const VOUCHERS = [
  {
    id: "v1",
    brand: "MoMo",
    title: "Giảm 20.000đ",
    desc: "Cho lần nạp tiền điện thoại đầu tiên",
    color: "#EC407A",
    bg: "#FFF0F5",
    expiry: "31/12/2026",
    tag: "Nạp tiền",
    tagColor: "#EC407A",
  },
  {
    id: "v2",
    brand: "Grab × MoMo",
    title: "Hoàn tiền 10%",
    desc: "Tối đa 30.000đ khi thanh toán GrabFood",
    color: "#00B14F",
    bg: "#F0FFF4",
    expiry: "30/06/2026",
    tag: "Ẩm thực",
    tagColor: "#00B14F",
  },
  {
    id: "v3",
    brand: "CGV × MoMo",
    title: "Mua 2 tặng 1",
    desc: "Áp dụng khi mua vé qua MoMo thứ 4 hàng tuần",
    color: "#E53935",
    bg: "#FFF5F5",
    expiry: "31/07/2026",
    tag: "Giải trí",
    tagColor: "#E53935",
  },
  {
    id: "v4",
    brand: "Agoda × MoMo",
    title: "Giảm 15%",
    desc: "Đặt phòng khách sạn, tối thiểu 500.000đ",
    color: "#FF6B00",
    bg: "#FFF8F0",
    expiry: "31/08/2026",
    tag: "Du lịch",
    tagColor: "#FF6B00",
  },
  {
    id: "v5",
    brand: "Circle K × MoMo",
    title: "Giảm 5.000đ",
    desc: "Mỗi đơn hàng từ 50.000đ tại Circle K",
    color: "#1565C0",
    bg: "#F0F4FF",
    expiry: "15/06/2026",
    tag: "Mua sắm",
    tagColor: "#1565C0",
  },
  {
    id: "v6",
    brand: "Shopee × MoMo",
    title: "Hoàn tiền 8%",
    desc: "Thanh toán đơn Shopee qua MoMo, tối đa 50K",
    color: "#EE4D2D",
    bg: "#FFF5F2",
    expiry: "30/06/2026",
    tag: "Mua sắm",
    tagColor: "#EE4D2D",
  },
];

const CATEGORIES = ["Tất cả", "Ẩm thực", "Mua sắm", "Du lịch", "Giải trí", "Nạp tiền"];

interface PromotionsScreenProps {
  onBack: () => void;
}

export default function PromotionsScreen({ onBack }: PromotionsScreenProps) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const filtered =
    activeCategory === "Tất cả"
      ? VOUCHERS
      : VOUCHERS.filter((v) => v.tag === activeCategory);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp">
      {/* Header */}
      <div
        className="flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #EC407A 0%, #D81B60 100%)",
          paddingTop: "env(safe-area-inset-top, 48px)",
        }}
      >
        <div className="flex items-center gap-3 px-4 pt-12 pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-white">Ưu đãi</h1>
            <p className="text-[12px] text-white/70">Khám phá hàng trăm ưu đãi hấp dẫn</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Category filter */}
        <div className="pb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex gap-2 px-4 w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-[#EC407A]"
                    : "bg-white/20 text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Voucher list */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-16 h-16 rounded-full bg-[#FCE4EC] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                <rect x="9" y="3" width="6" height="4" rx="1" stroke="#EC407A" strokeWidth="2"/>
              </svg>
            </div>
            <p className="text-[15px] font-semibold text-[#333]">Không có ưu đãi</p>
            <p className="text-[13px] text-[#888] text-center">Chưa có ưu đãi nào trong danh mục này</p>
          </div>
        ) : (
          filtered.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div className="flex">
                {/* Color stripe */}
                <div className="w-2 flex-shrink-0" style={{ background: v.color }} />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: v.bg, color: v.color }}
                        >
                          {v.tag}
                        </span>
                        <span className="text-[11px] text-[#AAAAAA]">{v.brand}</span>
                      </div>
                      <p className="text-[18px] font-bold" style={{ color: v.color }}>{v.title}</p>
                      <p className="text-[12px] text-[#777] mt-0.5 leading-relaxed">{v.desc}</p>
                      <p className="text-[11px] text-[#AAAAAA] mt-2">HSD: {v.expiry}</p>
                    </div>
                    <button
                      onClick={() => toggleSave(v.id)}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 flex-shrink-0"
                      style={{ background: saved.has(v.id) ? v.bg : "#F5F5F5" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={saved.has(v.id) ? v.color : "none"}>
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke={saved.has(v.id) ? v.color : "#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <button
                    className="mt-3 w-full py-2.5 rounded-2xl text-[13px] font-bold text-white transition-all active:scale-98"
                    style={{ background: v.color }}
                    onClick={() => {}}
                  >
                    Dùng ngay
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
