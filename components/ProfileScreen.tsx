"use client";

interface ProfileScreenProps {
  onBack: () => void;
}

const MENU_ITEMS = [
  {
    section: "Tài khoản",
    items: [
      { icon: "shield", label: "Bảo mật tài khoản", desc: "PIN, xác thực 2 lớp" },
      { icon: "bell", label: "Thông báo", desc: "Quản lý thông báo" },
      { icon: "link", label: "Liên kết ngân hàng", desc: "3 tài khoản đã liên kết" },
    ],
  },
  {
    section: "Cài đặt",
    items: [
      { icon: "settings", label: "Cài đặt chung", desc: "Ngôn ngữ, giao diện" },
      { icon: "smartphone", label: "Thiết bị đăng nhập", desc: "iPhone 12 (Thiết bị này)" },
      { icon: "fingerprint", label: "Sinh trắc học", desc: "Face ID đã bật" },
    ],
  },
  {
    section: "Hỗ trợ",
    items: [
      { icon: "help", label: "Trung tâm hỗ trợ", desc: "Câu hỏi thường gặp" },
      { icon: "chat", label: "Chat với MoMo", desc: "Hỗ trợ 24/7" },
      { icon: "doc", label: "Điều khoản & Chính sách", desc: "Điều khoản sử dụng dịch vụ" },
    ],
  },
];

export default function ProfileScreen({ onBack }: ProfileScreenProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp">
      {/* Header with gradient */}
      <div
        className="flex-shrink-0 pb-6"
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
          <span className="text-[20px] font-bold text-white flex-1">Tôi</span>
          <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1.5" fill="white"/>
              <circle cx="12" cy="12" r="1.5" fill="white"/>
              <circle cx="12" cy="19" r="1.5" fill="white"/>
            </svg>
          </button>
        </div>

        {/* Avatar card */}
        <div className="mx-4 bg-white/20 rounded-3xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white/30 flex items-center justify-center flex-shrink-0 border-2 border-white/50">
            <div
              className="w-full h-full flex items-center justify-center text-[28px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #FF6BA8, #EC407A)" }}
            >
              Q
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[18px] font-bold text-white">Phan Đức Quyền</p>
            <p className="text-[13px] text-white/80">0901 234 567</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <span className="text-[12px] font-semibold text-white">Hội viên Vàng</span>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-4 -mt-0 mb-4">
        <div
          className="bg-white rounded-3xl p-4 grid grid-cols-3 divide-x divide-[#F5F5F5]"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
        >
          {[
            { label: "Điểm thưởng", value: "1.240" },
            { label: "Hoàn tiền", value: "85.000đ" },
            { label: "Giao dịch", value: "47" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-[16px] font-bold text-[#EC407A]">{stat.value}</span>
              <span className="text-[11px] text-[#AAAAAA]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-4">
        {MENU_ITEMS.map((section) => (
          <div key={section.section}>
            <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-2 px-1">{section.section}</p>
            <div
              className="bg-white rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            >
              {section.items.map((item, idx) => (
                <div key={item.label}>
                  <button className="flex items-center gap-4 px-4 py-3.5 w-full text-left active:bg-[#FFF5F8] transition-colors">
                    <div className="w-10 h-10 rounded-2xl bg-[#FCE4EC] flex items-center justify-center flex-shrink-0">
                      <MenuIcon id={item.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#222]">{item.label}</p>
                      <p className="text-[12px] text-[#AAAAAA]">{item.desc}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="#DDDDDD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {idx < section.items.length - 1 && <div className="h-px bg-[#F8F8F8] ml-[72px]" />}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className="w-full py-4 rounded-3xl bg-white text-[#E53935] text-[15px] font-semibold active:bg-[#FFF5F5] transition-colors" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          Đăng xuất
        </button>
        <p className="text-center text-[11px] text-[#CCCCCC] mt-1">Phiên bản 3.8.5 (2026)</p>
      </div>
    </div>
  );
}

function MenuIcon({ id }: { id: string }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none" };
  if (id === "shield") return (
    <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  if (id === "bell") return (
    <svg {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/></svg>
  );
  if (id === "link") return (
    <svg {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  if (id === "settings") return (
    <svg {...p}><circle cx="12" cy="12" r="3" stroke="#EC407A" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#EC407A" strokeWidth="2"/></svg>
  );
  if (id === "smartphone") return (
    <svg {...p}><rect x="5" y="2" width="14" height="20" rx="2" stroke="#EC407A" strokeWidth="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/></svg>
  );
  if (id === "fingerprint") return (
    <svg {...p}><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 0 0 8 11a4 4 0 1 1 8 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0 0 15.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 0 0 8 4.07" stroke="#EC407A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  if (id === "help") return (
    <svg {...p}><circle cx="12" cy="12" r="10" stroke="#EC407A" strokeWidth="2"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/></svg>
  );
  if (id === "chat") return (
    <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  if (id === "doc") return (
    <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  return null;
}
