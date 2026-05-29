"use client";
import { useState } from "react";

interface ProfileScreenProps {
  onBack: () => void;
}

const MENU_ITEMS = [
  {
    section: "Tài khoản",
    color: "#EC407A",
    items: [
      { icon: "shield", label: "Bảo mật tài khoản", desc: "PIN, xác thực 2 lớp", badge: null },
      { icon: "bell", label: "Thông báo", desc: "Quản lý thông báo", badge: "3" },
      { icon: "link", label: "Liên kết ngân hàng", desc: "3 tài khoản đã liên kết", badge: null },
    ],
  },
  {
    section: "Cài đặt",
    color: "#1565C0",
    items: [
      { icon: "settings", label: "Cài đặt chung", desc: "Ngôn ngữ, giao diện", badge: null },
      { icon: "smartphone", label: "Thiết bị đăng nhập", desc: "iPhone 12 (Thiết bị này)", badge: null },
      { icon: "fingerprint", label: "Sinh trắc học", desc: "Face ID đã bật", badge: null },
    ],
  },
  {
    section: "Hỗ trợ",
    color: "#2E7D32",
    items: [
      { icon: "help", label: "Trung tâm hỗ trợ", desc: "Câu hỏi thường gặp", badge: null },
      { icon: "chat", label: "Chat với MoMo", desc: "Hỗ trợ 24/7", badge: null },
      { icon: "doc", label: "Điều khoản & Chính sách", desc: "Điều khoản sử dụng dịch vụ", badge: null },
    ],
  },
];

const ICON_BG: Record<string, string> = {
  "Tài khoản": "#FCE4EC",
  "Cài đặt": "#E3F2FD",
  "Hỗ trợ": "#E8F5E9",
};
const ICON_COLOR: Record<string, string> = {
  "Tài khoản": "#EC407A",
  "Cài đặt": "#1565C0",
  "Hỗ trợ": "#2E7D32",
};

export default function ProfileScreen({ onBack }: ProfileScreenProps) {
  const [verified] = useState(true);

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col animate-slideUp" style={{ paddingBottom: 80 }}>
      {/* Hero header */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #EC407A 0%, #C2185B 60%, #AD1457 100%)" }}
      >
        {/* Decorative rings */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-2 border-white/10 pointer-events-none" />
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border border-white/8 pointer-events-none" />

        <div className="flex items-center gap-3 px-4 pt-14 pb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center active:bg-white/25"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-bold text-white flex-1">Trang cá nhân</h1>
          <button className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center active:bg-white/25">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1.5" fill="white"/>
              <circle cx="12" cy="12" r="1.5" fill="white"/>
              <circle cx="12" cy="19" r="1.5" fill="white"/>
            </svg>
          </button>
        </div>

        {/* Avatar row */}
        <div className="px-5 pb-7">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-[72px] h-[72px] rounded-[22px] border-[3px] border-white/40 overflow-hidden shadow-xl" style={{ background: "linear-gradient(135deg, #FF6BA8, #EC407A)" }}>
                <div className="w-full h-full flex items-center justify-center text-[30px] font-black text-white">Q</div>
              </div>
              {verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#22C55E] border-2 border-white flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-[20px] font-black text-white leading-tight">Phan Đức Quyền</p>
              <p className="text-[13px] text-white/70 mt-0.5">0901 234 567</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex items-center gap-1 bg-yellow-400/20 px-2.5 py-0.5 rounded-full border border-yellow-400/30">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFD700">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span className="text-[11px] font-bold text-yellow-300">Hội viên Vàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats card — overlapping */}
      <div className="px-4 -mt-1 mb-4">
        <div
          className="bg-white rounded-3xl p-4 grid grid-cols-3 divide-x divide-[#F0F0F0]"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
        >
          {[
            { label: "Điểm thưởng", value: "1.240", color: "#EC407A" },
            { label: "Hoàn tiền", value: "85K", color: "#2E7D32" },
            { label: "Giao dịch", value: "47", color: "#1565C0" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5 px-2">
              <span className="text-[18px] font-black" style={{ color: stat.color }}>{stat.value}</span>
              <span className="text-[10.5px] text-[#AAAAAA] text-center leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {MENU_ITEMS.map((section) => (
          <div key={section.section}>
            <div className="flex items-center gap-2 mb-2.5 px-1">
              <div className="w-1 h-3.5 rounded-full" style={{ background: section.color }} />
              <p className="text-[12px] font-bold text-[#888] uppercase tracking-wider">{section.section}</p>
            </div>
            <div
              className="bg-white rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
            >
              {section.items.map((item, idx) => {
                const bg = ICON_BG[section.section];
                const color = ICON_COLOR[section.section];
                return (
                  <div key={item.label}>
                    <button className="flex items-center gap-4 px-4 py-3.5 w-full text-left active:bg-[#FAFAFA] transition-colors">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                        <MenuIcon id={item.icon} color={color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-semibold text-[#1A1A2E]">{item.label}</p>
                        <p className="text-[11.5px] text-[#AAAAAA] mt-0.5">{item.desc}</p>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-bold text-white bg-[#EC407A] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center mr-1">
                          {item.badge}
                        </span>
                      )}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="#D0D0D0" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                    {idx < section.items.length - 1 && <div className="h-px bg-[#F7F7F7] ml-[72px]" />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          className="w-full py-4 rounded-3xl text-[#E53935] text-[15px] font-bold active:bg-[#FFF5F5] transition-colors"
          style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
        >
          Đăng xuất
        </button>
        <p className="text-center text-[11px] text-[#CCCCCC] pb-2">Phiên bản 3.8.5 (2026) · MoMo Corp</p>
      </div>
    </div>
  );
}

function MenuIcon({ id, color }: { id: string; color: string }) {
  const p = { width: 19, height: 19, viewBox: "0 0 24 24", fill: "none" };
  if (id === "shield") return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (id === "bell") return <svg {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>;
  if (id === "link") return <svg {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (id === "settings") return <svg {...p}><circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={color} strokeWidth="2"/></svg>;
  if (id === "smartphone") return <svg {...p}><rect x="5" y="2" width="14" height="20" rx="2" stroke={color} strokeWidth="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>;
  if (id === "fingerprint") return <svg {...p}><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 0 0 8 11a4 4 0 1 1 8 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0 0 15.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 0 0 8 4.07" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (id === "help") return <svg {...p}><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>;
  if (id === "chat") return <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (id === "doc") return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  return null;
}
