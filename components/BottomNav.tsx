"use client";
import { useState } from "react";

interface BottomNavProps {
  onHistoryClick?: () => void;
}

const TABS = [
  { id: "home",    label: "MoMo" },
  { id: "gift",    label: "Ưu đãi",    badge: true },
  { id: "qr",      label: "Mã VietQR", isCenter: true },
  { id: "history", label: "Lịch sử GD" },
  { id: "user",    label: "Tôi" },
];

export default function BottomNav({ onHistoryClick }: BottomNavProps) {
  const [activeTab, setActiveTab] = useState("qr");

  const handleTab = (id: string) => {
    setActiveTab(id);
    if (id === "history") onHistoryClick?.();
  };

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#EEEEEE] z-50"
      style={{
        boxShadow: "0 -2px 10px rgba(0,0,0,0.04)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}
    >
      <div className="flex items-end justify-around px-2 pt-2 pb-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const color = isActive ? "#EC407A" : "#BDBDBD";

          if (tab.isCenter) {
            return (
              <button key={tab.id} onClick={() => handleTab(tab.id)} className="flex flex-col items-center gap-1 -mt-5">
                <div className="w-14 h-14 rounded-full bg-[#EC407A] flex items-center justify-center shadow-lg shadow-[#EC407A]/40">
                  <QRIcon />
                </div>
                <span className="text-[10px] font-semibold" style={{ color }}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              className="flex flex-col items-center gap-1 relative py-0.5 px-3"
            >
              <div className="relative">
                <TabIcon id={tab.id} color={color} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF3B30] rounded-full" />
                )}
              </div>
              <span className="text-[10px] font-medium" style={{ color }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TabIcon({ id, color }: { id: string; color: string }) {
  const props = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none" };
  if (id === "home") return (
    <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" stroke={color} strokeWidth="2" strokeLinejoin="round"/></svg>
  );
  if (id === "gift") return (
    <svg {...props}><polyline points="20 12 20 22 4 22 4 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="7" width="20" height="5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22V7" stroke={color} strokeWidth="2"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" stroke={color} strokeWidth="2"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke={color} strokeWidth="2"/></svg>
  );
  if (id === "history") return (
    <svg {...props}><polyline points="12 8 12 12 14 14" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  if (id === "user") return (
    <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2"/></svg>
  );
  return null;
}

function QRIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
      <rect x="5" y="5" width="3" height="3" fill="white"/>
      <rect x="16" y="5" width="3" height="3" fill="white"/>
      <rect x="5" y="16" width="3" height="3" fill="white"/>
      <rect x="14" y="14" width="3" height="3" fill="white"/>
      <rect x="18" y="14" width="3" height="3" fill="white"/>
      <rect x="14" y="18" width="3" height="3" fill="white"/>
      <rect x="18" y="18" width="3" height="3" fill="white"/>
    </svg>
  );
}
