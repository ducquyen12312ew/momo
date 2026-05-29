"use client";
import { useState, useCallback } from "react";
import IOSNotification from "./IOSNotification";

interface TopupScreenProps {
  onBack: () => void;
  isData?: boolean;
}

const OPERATORS = [
  { id: "viettel", name: "Viettel", color: "#E53935" },
  { id: "mobifone", name: "MobiFone", color: "#1565C0" },
  { id: "vinaphone", name: "VinaPhone", color: "#2E7D32" },
  { id: "vietnamobile", name: "Vietnamobile", color: "#FF6B00" },
];

const TOPUP_AMOUNTS = [
  { label: "10.000", value: 10000 },
  { label: "20.000", value: 20000 },
  { label: "50.000", value: 50000 },
  { label: "100.000", value: 100000 },
  { label: "200.000", value: 200000 },
  { label: "500.000", value: 500000 },
];

const DATA_PACKAGES = [
  { name: "3GB/ngày", price: "15.000", valid: "1 ngày", color: "#1565C0" },
  { name: "1GB/ngày", price: "49.000", valid: "7 ngày", color: "#1565C0" },
  { name: "3GB/ngày", price: "79.000", valid: "30 ngày", color: "#1565C0" },
  { name: "Không giới hạn", price: "149.000", valid: "30 ngày", color: "#EC407A" },
];

function formatVND(value: number): string {
  return value.toLocaleString("vi-VN") + "đ";
}

export default function TopupScreen({ onBack, isData = false }: TopupScreenProps) {
  const [selectedOp, setSelectedOp] = useState("viettel");
  const [phone, setPhone] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<{ label: string; value: number } | null>(null);
  const [selectedPkg, setSelectedPkg] = useState("");
  const [notification, setNotification] = useState<{ key: number; amount: string } | null>(null);
  const [notifKey, setNotifKey] = useState(0);

  const op = OPERATORS.find((o) => o.id === selectedOp) ?? OPERATORS[0];

  const handleConfirm = useCallback(() => {
    if (isData) {
      // Data packages — just show generic message
      setNotifKey((k) => k + 1);
      setNotification({ key: notifKey + 1, amount: selectedPkg + "đ" });
      return;
    }
    if (!selectedAmount) return;
    const newKey = notifKey + 1;
    setNotifKey(newKey);
    setNotification({ key: newKey, amount: formatVND(selectedAmount.value) });
  }, [isData, selectedAmount, selectedPkg, notifKey]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp">
      {/* iOS-style notification */}
      {notification && (
        <IOSNotification
          key={notification.key}
          amount={notification.amount}
          onDismiss={() => setNotification(null)}
        />
      )}

      <div
        className="flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${op.color} 0%, ${op.color}CC 100%)` }}
      >
        <div className="flex items-center gap-3 px-4 pt-14 pb-5">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-bold text-white flex-1">
            {isData ? "Data 4G/5G" : "Nạp tiền điện thoại"}
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 space-y-4">
        {/* Operator selection */}
        <div className="bg-white rounded-3xl p-4" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-3">Nhà mạng</p>
          <div className="grid grid-cols-4 gap-2">
            {OPERATORS.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelectedOp(o.id)}
                className={`py-2.5 rounded-2xl text-[11px] font-semibold transition-all active:scale-95 ${
                  selectedOp === o.id ? "text-white" : "bg-[#F5F5F5] text-[#666]"
                }`}
                style={selectedOp === o.id ? { background: o.color } : {}}
              >
                {o.name}
              </button>
            ))}
          </div>
        </div>

        {/* Phone number */}
        <div className="bg-white rounded-3xl p-4" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-3">Số điện thoại</p>
          <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-2xl px-4 py-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="flex-1 bg-transparent text-[14px] text-[#333] outline-none placeholder:text-[#AAAAAA]"
            />
            {phone.length > 0 && (
              <button onClick={() => setPhone("")} className="w-5 h-5 rounded-full bg-[#CCCCCC] flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            )}
          </div>
          <button className="mt-2 text-[12px] text-[#EC407A] font-medium" onClick={() => setPhone("0901234567")}>
            Dùng số của tôi
          </button>
        </div>

        {/* Amount / Package */}
        {!isData ? (
          <div className="bg-white rounded-3xl p-4" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-3">Mệnh giá</p>
            <div className="grid grid-cols-3 gap-2">
              {TOPUP_AMOUNTS.map((a) => (
                <button
                  key={a.label}
                  onClick={() => setSelectedAmount(a)}
                  className={`py-3 rounded-2xl text-[13px] font-semibold transition-all active:scale-95 ${
                    selectedAmount?.label === a.label ? "text-white" : "bg-[#F5F5F5] text-[#333]"
                  }`}
                  style={selectedAmount?.label === a.label ? { background: op.color } : {}}
                >
                  {a.label}đ
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase px-1">Gói cước</p>
            {DATA_PACKAGES.map((pkg) => (
              <button
                key={pkg.name + pkg.price}
                onClick={() => setSelectedPkg(pkg.price)}
                className={`w-full bg-white rounded-3xl p-4 flex items-center gap-4 transition-all active:scale-[0.98] ${
                  selectedPkg === pkg.price ? "ring-2 ring-[#EC407A]" : ""
                }`}
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: pkg.color + "20" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1.5 8.5A15 15 0 0 1 22.5 8.5" stroke={pkg.color} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M5 12A11 11 0 0 1 19 12" stroke={pkg.color} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8.5 15.5A6 6 0 0 1 15.5 15.5" stroke={pkg.color} strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="19" r="1.5" fill={pkg.color}/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[15px] font-bold text-[#222]">{pkg.name}</p>
                  <p className="text-[12px] text-[#AAAAAA]">Hiệu lực {pkg.valid}</p>
                </div>
                <p className="text-[15px] font-bold" style={{ color: pkg.color }}>{pkg.price}đ</p>
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          disabled={!phone || (!isData ? !selectedAmount : !selectedPkg)}
          onClick={handleConfirm}
          className="w-full py-4 rounded-3xl text-white text-[15px] font-bold transition-all active:scale-[0.98] disabled:opacity-40"
          style={{ background: `linear-gradient(135deg, ${op.color}, ${op.color}CC)` }}
        >
          {!isData
            ? selectedAmount
              ? `Nạp ${selectedAmount.label}đ`
              : "Nạp tiền"
            : selectedPkg
            ? `Đăng ký ${selectedPkg}đ`
            : "Đăng ký gói"}
        </button>
      </div>
    </div>
  );
}
