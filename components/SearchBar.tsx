"use client";
import { useState, useRef, useEffect } from "react";
import SafeImage from "./SafeImage";
import { SEARCH_SERVICES } from "@/constants/searchData";

interface SearchBarProps {
  onVayNhanhClick: () => void;
}

export default function SearchBar({ onVayNhanhClick }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered =
    query.trim().length > 0
      ? SEARCH_SERVICES.filter(
          (s) =>
            s.label.toLowerCase().includes(query.toLowerCase()) ||
            s.subtitle.toLowerCase().includes(query.toLowerCase())
        )
      : SEARCH_SERVICES;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
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
    if (id === "vay-nhanh") onVayNhanhClick();
  };

  return (
    <div ref={containerRef} className="px-4 py-2 relative z-30">
      {/* Input row */}
      <div
        className={`flex items-center gap-2 bg-[#F5F5F5] h-[42px] px-3 transition-all duration-200 ${
          isOpen ? "rounded-t-[18px] bg-white border border-b-0 border-[#EEEEEE]" : "rounded-[18px]"
        }`}
      >
        <SafeImage
          src="/image/icon-search.png"
          alt="Tìm kiếm"
          width={18}
          height={18}
          className="w-[18px] h-[18px] flex-shrink-0 opacity-50"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Tìm số điện thoại chuyển tiền 📞"
          className="flex-1 bg-transparent text-[13px] text-[#333333] placeholder:text-[#AAAAAA] outline-none"
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
            <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
              <path d="M1 1l6 6M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute left-4 right-4 top-[50px] bg-white border border-t-0 border-[#EEEEEE] rounded-b-2xl z-50 animate-fadeSlideIn"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)", maxHeight: 340, overflowY: "auto" }}
        >
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-[13px] text-[#AAAAAA]">
              Không tìm thấy kết quả
            </div>
          ) : (
            filtered.map((item, index) => (
              <div key={item.id}>
                <button
                  onMouseDown={() => handleItemClick(item.id, item.enabled)}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                    item.enabled
                      ? "active:bg-[#FFF0F5] cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!item.enabled}
                >
                  <div className="w-10 h-10 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F5F5F5]">
                    <SafeImage
                      src={item.icon}
                      alt={item.label}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-[#333333] truncate">
                      {item.label}
                    </div>
                    <div className="text-[12px] text-[#888888] truncate">
                      {item.subtitle}
                    </div>
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
                {index < filtered.length - 1 && (
                  <div className="h-px bg-[#F8F8F8] ml-[68px]" />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
