"use client";
import { useEffect, useState } from "react";
import SafeImage from "./SafeImage";

interface IOSNotificationProps {
  amount: string;
  onDismiss: () => void;
}

export default function IOSNotification({ amount, onDismiss }: IOSNotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in on next frame
    const t1 = setTimeout(() => setVisible(true), 20);
    // Auto-dismiss after 8s
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 400);
    }, 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDismiss]);

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-[9999] px-3 pointer-events-none"
      style={{ paddingTop: "env(safe-area-inset-top, 12px)" }}
    >
      <div
        onClick={() => {
          setVisible(false);
          setTimeout(onDismiss, 400);
        }}
        className="pointer-events-auto cursor-pointer"
        style={{
          transform: visible ? "translateY(8px)" : "translateY(-120%)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.45s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease",
        }}
      >
        <div
          className="rounded-[22px] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
            border: "1px solid rgba(255,255,255,0.6)",
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3.5">
            {/* TCB logo */}
            <div className="w-11 h-11 rounded-[12px] overflow-hidden flex-shrink-0 bg-[#ED1C24] flex items-center justify-center" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
              <SafeImage
                src="/image/tcb.png"
                alt="Techcombank"
                width={44}
                height={44}
                className="w-11 h-11 object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[12px] font-semibold text-[#1A1A1A]">Techcombank</span>
                <span className="text-[11px] text-[#8E8E93]">{timeStr}</span>
              </div>
              <p className="text-[13px] text-[#1A1A1A] leading-snug">
                <span className="font-bold text-[#00875A]">+{amount}</span>
                {" "}Phan Duc Quyen chuyển khoản thành công
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
