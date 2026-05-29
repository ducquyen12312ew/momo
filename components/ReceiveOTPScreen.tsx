"use client";
import { useEffect, useState } from "react";

const AUTO_OTP = "847291";

interface ReceiveOTPScreenProps {
  amount: number;
  onSuccess: () => void;
}

export default function ReceiveOTPScreen({ amount, onSuccess }: ReceiveOTPScreenProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [filling, setFilling] = useState(false);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);

  // Slide-in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  // Auto-fill after 5s
  useEffect(() => {
    const startFill = setTimeout(() => {
      setFilling(true);
      AUTO_OTP.split("").forEach((digit, i) => {
        setTimeout(() => {
          setOtp((prev) => {
            const next = [...prev];
            next[i] = digit;
            return next;
          });
          if (i === AUTO_OTP.length - 1) {
            // All filled — close and proceed
            setTimeout(() => {
              setDone(true);
              setTimeout(onSuccess, 600);
            }, 400);
          }
        }, i * 220);
      });
    }, 5000);

    return () => clearTimeout(startFill);
  }, [onSuccess]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-5"
      style={{
        maxWidth: 390,
        left: "50%",
        transform: "translateX(-50%)",
        background: visible ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
        transition: "background 0.3s ease",
        backdropFilter: visible ? "blur(4px)" : "none",
        WebkitBackdropFilter: visible ? "blur(4px)" : "none",
      }}
    >
      <div
        className="w-full bg-white rounded-[32px] overflow-hidden"
        style={{
          transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(24px)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease",
          boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header stripe */}
        <div
          className="px-6 pt-6 pb-5 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #E53935, #C62828)" }}
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-[16px]">Xác thực SMS</p>
              <p className="text-white/70 text-[12px]">Techcombank · {amount.toLocaleString("vi-VN")}đ</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pt-5 pb-6">
          {done ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[16px] font-bold text-[#1A1A2E]">Xác thực thành công!</p>
              <p className="text-[13px] text-[#AAAAAA]">Đang xử lý giao dịch...</p>
            </div>
          ) : (
            <>
              <p className="text-[13px] text-[#555] text-center mb-1 leading-relaxed">
                Đang chờ mã xác thực từ ngân hàng
              </p>
              <p className="text-[12px] text-[#AAAAAA] text-center mb-6">
                Mã OTP sẽ tự động điền khi nhận được
              </p>

              {/* OTP cells */}
              <div className="flex gap-2.5 justify-center mb-6">
                {otp.map((digit, i) => (
                  <div
                    key={i}
                    className="w-[42px] h-[52px] rounded-2xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: digit
                        ? "linear-gradient(135deg, #E53935, #C62828)"
                        : "#F7F8FA",
                      border: digit ? "none" : "2px solid #EEEEEE",
                      boxShadow: digit ? "0 4px 12px rgba(229,57,53,0.3)" : "none",
                      transform: digit ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <span
                      className="text-[20px] font-black transition-all duration-200"
                      style={{ color: digit ? "white" : "#CCCCCC" }}
                    >
                      {digit || "·"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Loading spinner */}
              {!filling && (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#E53935]"
                        style={{
                          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[12px] text-[#AAAAAA]">Đang chờ tin nhắn SMS...</p>
                </div>
              )}

              {filling && (
                <div className="flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p className="text-[13px] text-[#E53935] font-semibold">Đang xác thực...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
