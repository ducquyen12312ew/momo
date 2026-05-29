"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";

const BANNERS = [
  {
    id: "b1",
    src: "/image/banner.jpg",
    title: "Sự kiện đang diễn ra",
    tag: "HOT",
  },
  {
    id: "b2",
    src: "/image/banner.jpg",
    title: "Ưu đãi cuối tuần",
    tag: "MỚI",
  },
];

export default function BannerSection() {
  const [active, setActive] = useState(0);

  return (
    <div className="px-4 py-3">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-[#EC407A] rounded-full" />
          <span className="text-[14px] font-bold text-[#1A1A2E]">Sự kiện nổi bật</span>
        </div>
        <button className="text-[12px] text-[#EC407A] font-semibold bg-[#FFF0F5] px-3 py-1 rounded-full">
          Xem thêm
        </button>
      </div>

      {/* Banner image */}
      <div className="relative rounded-[20px] overflow-hidden" style={{ height: 120, boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
        <SafeImage
          src={BANNERS[active].src}
          alt={BANNERS[active].title}
          className="w-full h-full object-cover"
          width={358}
          height={120}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 60%)" }} />

        {/* Text overlay */}
        <div className="absolute bottom-3 left-4">
          <span className="text-[9px] font-black text-white bg-[#EC407A] px-2 py-0.5 rounded-full mr-2">
            {BANNERS[active].tag}
          </span>
          <span className="text-[13px] font-bold text-white drop-shadow">{BANNERS[active].title}</span>
        </div>

        {/* Page indicators */}
        <div className="absolute bottom-3 right-3 flex gap-1">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      {/* Quick promo chips */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {[
          { label: "Nạp tiền hoàn 20K", color: "#EC407A" },
          { label: "Vay lãi 0% tháng đầu", color: "#1565C0" },
          { label: "Tặng voucher ăn uống", color: "#2E7D32" },
          { label: "Giảm 15% du lịch", color: "#E65100" },
        ].map((chip) => (
          <button
            key={chip.label}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold active:scale-95 transition-transform"
            style={{ background: chip.color + "15", color: chip.color, border: `1px solid ${chip.color}30` }}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
