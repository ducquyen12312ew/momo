"use client";
import { useState, useRef, useEffect } from "react";
import SafeImage from "./SafeImage";
import { SEARCH_SERVICES } from "@/constants/searchData";

interface SearchBarProps {
  onVayNhanhClick: () => void;
  onServiceClick?: (id: string) => void;
}

const TRENDING = ["Vay Nhanh", "Chuyển tiền", "Nạp tiền", "Thanh toán hóa đơn", "Túi Thần Tài"];
const RECENT = ["Vay Nhanh", "Data 4G/5G", "Nạp tiền điện thoại"];

const ENABLED_IDS = new Set([
  "vay-nhanh", "chuyen-tien", "nap-tien-dien-thoai",
  "thanh-toan-hoa-don", "internet-4g-5g", "du-lich",
]);

export default function SearchBar({ onVayNhanhClick, onServiceClick }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allServices = SEARCH_SERVICES.map((s) => ({
    ...s,
    enabled: ENABLED_IDS.has(s.id),
  }));

  const filtered =
    query.trim().length > 0
      ? allServices.filter(
          (s) =>
            s.label.toLowerCase().includes(query.toLowerCase()) ||
            s.subtitle.toLowerCase().includes(query.toLowerCase())
        )
      : allServices;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (id: string, enabled: boolean) => {
    if (!enabled) return;
    setIsOpen(false);
    setQuery("");
    if (id === "vay-nhanh") {
      onVayNhanhClick();
    } else {
      onServiceClick?.(id);
    }
  };

  const handleTrendingClick = (label: string) => {
    const svc = allServices.find((s) => s.label.toLowerCase() === label.toLowerCase());
    if (svc && svc.enabled) {
      handleItemClick(svc.id, true);
    } else {
      setQuery(label);
    }
  };

  return (
    <div ref={containerRef} className="px-4 py-2 relative z-30">
      {/* Input */}
      <div
        className={`flex items-center gap-2 h-[42px] px-3 transition-all duration-200 ${
          isOpen
            ? "rounded-t-[18px] bg-white border border-b-0 border-[#EEEEEE]"
            : "bg-[#F5F5F5] rounded-[18px]"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-40">
          <circle cx="11" cy="11" r="8" stroke="#555" strokeWidth="2"/>
          <path d="M21 21l-4.35-4.35" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Tìm số điện thoại chuyển tiền 📞"
          className="flex-1 bg-transparent text-[13px] text-[#333] placeholder:text-[#AAAAAA] outline-none"
        />
        {query.length > 0 && (
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              setQuery("");
              inputRef.current?.focus();
            }}
            className="w-[18px] h-[18px] rounded-full bg-[#CCCCCC] flex items-center justify-center flex-shrink-0"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 1l6 6M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute left-4 right-4 top-[50px] bg-white border border-t-0 border-[#EEEEEE] rounded-b-2xl z-50 animate-fadeIn"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)", maxHeight: 380, overflowY: "auto" }}
        >
          {query.trim().length === 0 ? (
            <>
              {/* Recent searches */}
              <div className="px-4 pt-3 pb-1">
                <p className="text-[11px] font-semibold text-[#AAAAAA] uppercase mb-2">Tìm gần đây</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {RECENT.map((r) => (
                    <button
                      key={r}
                      onMouseDown={() => handleTrendingClick(r)}
                      className="flex items-center gap-1.5 bg-[#F5F5F5] px-3 py-1.5 rounded-full active:bg-[#EEEEEE] transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <polyline points="12 8 12 12 14 14" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[12px] text-[#555]">{r}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending */}
              <div className="px-4 pb-2 border-t border-[#F5F5F5]">
                <p className="text-[11px] font-semibold text-[#AAAAAA] uppercase mb-2 mt-3">Xu hướng</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {TRENDING.map((t, i) => (
                    <button
                      key={t}
                      onMouseDown={() => handleTrendingClick(t)}
                      className="flex items-center gap-1.5 bg-[#FFF0F5] px-3 py-1.5 rounded-full active:bg-[#FCE4EC] transition-colors"
                    >
                      <span className="text-[10px] font-bold text-[#EC407A]">{i + 1}</span>
                      <span className="text-[12px] text-[#EC407A] font-medium">{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* All services */}
              <div className="border-t border-[#F5F5F5]">
                <p className="text-[11px] font-semibold text-[#AAAAAA] uppercase px-4 py-2">Tất cả dịch vụ</p>
                {filtered.slice(0, 6).map((item, index) => (
                  <div key={item.id}>
                    <button
                      onMouseDown={() => handleItemClick(item.id, item.enabled)}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                        item.enabled ? "active:bg-[#FFF0F5] cursor-pointer" : "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!item.enabled}
                    >
                      <div className="w-10 h-10 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F5F5F5]">
                        <SafeImage src={item.icon} alt={item.label} width={40} height={40} className="w-10 h-10 object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-semibold text-[#333] truncate">{item.label}</div>
                        <div className="text-[12px] text-[#888] truncate">{item.subtitle}</div>
                      </div>
                      {item.enabled ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                          <path d="M9 18l6-6-6-6" stroke="#BBBBBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <span className="text-[10px] text-[#AAAAAA] bg-[#F5F5F5] px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                          Sắp ra mắt
                        </span>
                      )}
                    </button>
                    {index < 5 && <div className="h-px bg-[#F8F8F8] ml-[68px]" />}
                  </div>
                ))}
              </div>
            </>
          ) : filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-[13px] text-[#AAAAAA]">
              Không tìm thấy kết quả
            </div>
          ) : (
            filtered.map((item, index) => (
              <div key={item.id}>
                <button
                  onMouseDown={() => handleItemClick(item.id, item.enabled)}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                    item.enabled ? "active:bg-[#FFF0F5] cursor-pointer" : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!item.enabled}
                >
                  <div className="w-10 h-10 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F5F5F5]">
                    <SafeImage src={item.icon} alt={item.label} width={40} height={40} className="w-10 h-10 object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-[#333] truncate">{item.label}</div>
                    <div className="text-[12px] text-[#888] truncate">{item.subtitle}</div>
                  </div>
                  {item.enabled ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                      <path d="M9 18l6-6-6-6" stroke="#BBBBBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span className="text-[10px] text-[#AAAAAA] bg-[#F5F5F5] px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                      Sắp ra mắt
                    </span>
                  )}
                </button>
                {index < filtered.length - 1 && <div className="h-px bg-[#F8F8F8] ml-[68px]" />}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
