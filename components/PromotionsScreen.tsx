"use client";
import { useState } from "react";

const VOUCHERS = [
  {
    id: "v1", brand: "MoMo", title: "Giảm 20.000đ",
    desc: "Cho lần nạp tiền điện thoại đầu tiên",
    color: "#EC407A", bg: "linear-gradient(135deg, #FCE4EC, #FFF0F5)",
    expiry: "31/12/2026", tag: "Nạp tiền", remaining: 142,
  },
  {
    id: "v2", brand: "Grab × MoMo", title: "Hoàn tiền 10%",
    desc: "Tối đa 30.000đ khi thanh toán GrabFood",
    color: "#00B14F", bg: "linear-gradient(135deg, #E8F5E9, #F1FFF4)",
    expiry: "30/06/2026", tag: "Ẩm thực", remaining: 58,
  },
  {
    id: "v3", brand: "CGV × MoMo", title: "Mua 2 tặng 1",
    desc: "Áp dụng khi mua vé qua MoMo thứ 4 hàng tuần",
    color: "#E53935", bg: "linear-gradient(135deg, #FFEBEE, #FFF5F5)",
    expiry: "31/07/2026", tag: "Giải trí", remaining: 23,
  },
  {
    id: "v4", brand: "Agoda × MoMo", title: "Giảm 15%",
    desc: "Đặt phòng khách sạn, tối thiểu 500.000đ",
    color: "#FF6B00", bg: "linear-gradient(135deg, #FFF3E0, #FFF8F0)",
    expiry: "31/08/2026", tag: "Du lịch", remaining: 99,
  },
  {
    id: "v5", brand: "Circle K × MoMo", title: "Giảm 5.000đ",
    desc: "Mỗi đơn hàng từ 50.000đ tại Circle K",
    color: "#1565C0", bg: "linear-gradient(135deg, #E3F2FD, #F0F8FF)",
    expiry: "15/06/2026", tag: "Mua sắm", remaining: 200,
  },
  {
    id: "v6", brand: "Shopee × MoMo", title: "Hoàn tiền 8%",
    desc: "Thanh toán đơn Shopee qua MoMo, tối đa 50K",
    color: "#EE4D2D", bg: "linear-gradient(135deg, #FFF0ED, #FFF5F2)",
    expiry: "30/06/2026", tag: "Mua sắm", remaining: 77,
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
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col animate-slideUp" style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #EC407A 0%, #C2185B 100%)" }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-2 border-white/10 pointer-events-none" />
        <div className="flex items-center gap-3 px-4 pt-14 pb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center active:bg-white/25"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-white">Ưu đãi cho bạn</h1>
            <p className="text-[12px] text-white/70">{VOUCHERS.length} ưu đãi đang áp dụng</p>
          </div>
        </div>

        {/* Category chips */}
        <div className="pb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex gap-2 px-4 w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-[#EC407A] shadow-md"
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
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-16 h-16 rounded-full bg-[#FCE4EC] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                <rect x="9" y="3" width="6" height="4" rx="1" stroke="#EC407A" strokeWidth="2"/>
              </svg>
            </div>
            <p className="text-[15px] font-bold text-[#333]">Không có ưu đãi</p>
            <p className="text-[13px] text-[#888] text-center">Chưa có ưu đãi nào trong danh mục này</p>
          </div>
        ) : (
          filtered.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            >
              {/* Top section — gradient bg */}
              <div className="px-4 pt-4 pb-3" style={{ background: v.bg }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white"
                        style={{ background: v.color }}
                      >
                        {v.tag}
                      </span>
                      <span className="text-[11px] text-[#888] font-medium">{v.brand}</span>
                    </div>
                    <p className="text-[22px] font-black" style={{ color: v.color }}>{v.title}</p>
                    <p className="text-[12px] text-[#666] mt-0.5 leading-relaxed">{v.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleSave(v.id)}
                    className="w-9 h-9 rounded-full flex items-center justify-center ml-3 flex-shrink-0 transition-all active:scale-90"
                    style={{ background: saved.has(v.id) ? v.color : "rgba(0,0,0,0.06)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={saved.has(v.id) ? "white" : "none"}>
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke={saved.has(v.id) ? "white" : "#888"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Divider with circles */}
              <div className="relative h-px bg-[#F0F0F0] mx-0 my-0">
                <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#F7F8FA]" />
                <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#F7F8FA]" />
              </div>

              {/* Bottom section */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-[#AAAAAA]">HSD: {v.expiry}</p>
                  <p className="text-[11px] text-[#AAAAAA] mt-0.5">Còn <span className="font-bold" style={{ color: v.remaining < 30 ? "#E53935" : "#555" }}>{v.remaining}</span> lượt</p>
                </div>
                <button
                  className="px-5 py-2.5 rounded-2xl text-[13px] font-bold text-white transition-all active:scale-95"
                  style={{ background: v.color, boxShadow: `0 4px 12px ${v.color}40` }}
                >
                  Dùng ngay
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
