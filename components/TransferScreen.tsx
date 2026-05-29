"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";

interface TransferScreenProps {
  onBack: () => void;
}

const RECENTS = [
  {
    id: "r1",
    name: "Phan Đức Quyền",
    account: "19036406475021",
    bank: "Techcombank",
    logo: "/image/tcb.png",
    bankColor: "#ED1C24",
    initial: "Q",
    avatarColor: "#EC407A",
  },
  {
    id: "r2",
    name: "Dưa Hấu",
    account: "3928458682",
    bank: "Techcombank",
    logo: "/image/tcb.png",
    bankColor: "#ED1C24",
    initial: "D",
    avatarColor: "#9C27B0",
  },
];

const QUICK_AMOUNTS = [
  { label: "50K", value: 50000 },
  { label: "100K", value: 100000 },
  { label: "200K", value: 200000 },
  { label: "500K", value: 500000 },
  { label: "1 triệu", value: 1000000 },
  { label: "2 triệu", value: 2000000 },
];

type Step = "input" | "amount";
type Recent = typeof RECENTS[number];

function formatVND(n: number): string {
  return n.toLocaleString("vi-VN");
}

export default function TransferScreen({ onBack }: TransferScreenProps) {
  const [query, setQuery] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [rawAmount, setRawAmount] = useState("");
  const [selectedContact, setSelectedContact] = useState<Recent | null>(null);
  const [note, setNote] = useState("");

  const filtered = query.trim()
    ? RECENTS.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.account.includes(query) ||
          r.bank.toLowerCase().includes(query.toLowerCase())
      )
    : RECENTS;

  const numericAmount = parseInt(rawAmount.replace(/\D/g, "") || "0");
  const displayAmount = numericAmount > 0 ? formatVND(numericAmount) : "";

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setRawAmount(digits);
  };

  const handleSelectContact = (r: Recent) => {
    setSelectedContact(r);
    setStep("amount");
  };

  const handleBack = () => {
    if (step === "amount") {
      setStep("input");
      setRawAmount("");
    } else {
      onBack();
    }
  };

  /* ─── STEP: INPUT ─── */
  if (step === "input") {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex flex-col animate-slideUp">
        {/* Header */}
        <div style={{ background: "linear-gradient(150deg, #EC407A 0%, #C2185B 100%)" }}>
          <div className="flex items-center gap-3 px-4 pt-14 pb-5">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center active:bg-white/25 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div>
              <h1 className="text-[20px] font-bold text-white leading-tight">Chuyển tiền</h1>
              <p className="text-[12px] text-white/70">Miễn phí · Tức thì · An toàn</p>
            </div>
          </div>

          {/* Premium search bar */}
          <div className="px-4 pb-5">
            <div
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm theo tên, số tài khoản hoặc ngân hàng"
                className="flex-1 bg-transparent text-[13.5px] text-white placeholder:text-white/60 outline-none"
              />
              {query.length > 0 && (
                <button
                  onClick={() => setQuery("")}
                  className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1l6 6M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pt-5 pb-10 space-y-5">
          {/* Frequent contacts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-bold text-[#1A1A2E] tracking-wide uppercase">Gần đây</p>
              <button className="text-[12px] text-[#EC407A] font-semibold">Xem tất cả</button>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-3" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <div className="w-14 h-14 rounded-full bg-[#FCE4EC] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#EC407A" strokeWidth="2"/>
                    <path d="M21 21l-4.35-4.35" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[14px] font-semibold text-[#333]">Không tìm thấy</p>
                <p className="text-[12px] text-[#AAAAAA] text-center">Thử tìm theo tên hoặc số tài khoản khác</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelectContact(r)}
                    className="w-full flex items-center gap-4 p-4 bg-white rounded-3xl text-left transition-all active:scale-[0.98]"
                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.03)" }}
                  >
                    {/* Bank logo */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#FFF5F5]">
                        <SafeImage src={r.logo} alt={r.bank} width={56} height={56} className="w-14 h-14 object-cover" />
                      </div>
                      {/* Small avatar badge */}
                      <div
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-black"
                        style={{ background: r.avatarColor }}
                      >
                        {r.initial}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-bold text-[#1A1A2E] mb-0.5">{r.name}</p>
                      <p className="text-[12px] text-[#AAAAAA] font-mono tracking-wide">{r.account}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: r.bankColor }} />
                        <p className="text-[11px] font-semibold" style={{ color: r.bankColor }}>{r.bank}</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="w-9 h-9 rounded-full bg-[#FFF0F5] flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="#EC407A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Transfer methods */}
          <div>
            <p className="text-[13px] font-bold text-[#1A1A2E] tracking-wide uppercase mb-3">Phương thức khác</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "bank", label: "Tài khoản\nngân hàng", color: "#1565C0" },
                { icon: "qr", label: "Quét\nmã QR", color: "#2E7D32" },
                { icon: "phone", label: "Số điện\nthoại", color: "#EC407A" },
              ].map((m) => (
                <button
                  key={m.label}
                  className="bg-white rounded-2xl p-3.5 flex flex-col items-center gap-2 active:scale-95 transition-transform"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: m.color + "15" }}>
                    <MethodIcon id={m.icon} color={m.color} />
                  </div>
                  <p className="text-[10.5px] font-semibold text-[#555] text-center leading-tight whitespace-pre-line">{m.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Fee notice */}
          <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="22 4 12 14.01 9 11.01" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[12px] text-[#555] flex-1">
              Chuyển tiền <span className="font-bold text-[#22C55E]">miễn phí</span> 24/7, nhận tiền ngay lập tức
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ─── STEP: AMOUNT ─── */
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col animate-slideUp">
      {/* Header */}
      <div style={{ background: "linear-gradient(150deg, #EC407A 0%, #C2185B 100%)" }}>
        <div className="flex items-center gap-3 px-4 pt-14 pb-5">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center active:bg-white/25"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-bold text-white flex-1">Nhập số tiền</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-10 space-y-4">
        {/* Recipient card */}
        {selectedContact && (
          <div
            className="bg-white rounded-3xl p-5 flex items-center gap-4"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
          >
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#FFF5F5]">
                <SafeImage src={selectedContact.logo} alt={selectedContact.bank} width={56} height={56} className="w-14 h-14 object-cover" />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-black"
                style={{ background: selectedContact.avatarColor }}
              >
                {selectedContact.initial}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-[#1A1A2E]">{selectedContact.name}</p>
              <p className="text-[12px] text-[#AAAAAA] font-mono">{selectedContact.account}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: selectedContact.bankColor }} />
                <p className="text-[11px] font-semibold" style={{ color: selectedContact.bankColor }}>{selectedContact.bank}</p>
              </div>
            </div>
            <button onClick={handleBack} className="text-[12px] text-[#EC407A] font-semibold bg-[#FFF0F5] px-3 py-1.5 rounded-xl">
              Đổi
            </button>
          </div>
        )}

        {/* Amount input */}
        <div className="bg-white rounded-3xl p-5" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
          <p className="text-[11px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-4">Số tiền chuyển</p>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[28px] font-black text-[#EC407A]">₫</span>
            <input
              type="text"
              inputMode="numeric"
              value={displayAmount}
              onChange={handleAmountInput}
              placeholder="0"
              className="flex-1 text-[38px] font-black text-[#1A1A2E] outline-none bg-transparent"
            />
          </div>
          <div className="h-px bg-gradient-to-r from-[#EC407A]/30 via-[#EC407A]/10 to-transparent mb-4" />
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-[#AAAAAA]">Số dư khả dụng</p>
            <p className="text-[13px] font-bold text-[#333]">5.236đ</p>
          </div>
        </div>

        {/* Quick amounts */}
        <div className="grid grid-cols-3 gap-2.5">
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a.label}
              onClick={() => setRawAmount(String(a.value))}
              className={`py-3 rounded-2xl text-[13px] font-bold transition-all active:scale-95 ${
                numericAmount === a.value
                  ? "text-white shadow-lg"
                  : "bg-white text-[#EC407A] border border-[#EC407A]/20"
              }`}
              style={
                numericAmount === a.value
                  ? { background: "linear-gradient(135deg, #EC407A, #C2185B)", boxShadow: "0 4px 12px rgba(236,64,122,0.35)" }
                  : { boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }
              }
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Note */}
        <div className="bg-white rounded-3xl px-4 py-3.5" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Lời nhắn (tùy chọn)"
              className="flex-1 bg-transparent text-[13px] text-[#333] outline-none placeholder:text-[#AAAAAA]"
            />
          </div>
        </div>

        {/* Summary row */}
        {numericAmount > 0 && (
          <div className="bg-[#FFF5F8] rounded-2xl px-4 py-3.5 flex items-center justify-between border border-[#EC407A]/10">
            <span className="text-[13px] text-[#777]">Tổng chuyển</span>
            <span className="text-[16px] font-black text-[#EC407A]">{formatVND(numericAmount)}đ</span>
          </div>
        )}

        {/* CTA */}
        <button
          disabled={numericAmount <= 0}
          onClick={() => alert("Tính năng chuyển tiền đang phát triển!")}
          className="w-full py-4 rounded-3xl text-white text-[16px] font-bold transition-all active:scale-[0.98] disabled:opacity-40"
          style={{
            background: numericAmount > 0
              ? "linear-gradient(135deg, #EC407A 0%, #C2185B 100%)"
              : "#CCCCCC",
            boxShadow: numericAmount > 0 ? "0 8px 24px rgba(236,64,122,0.35)" : "none",
          }}
        >
          {numericAmount > 0 ? `Chuyển ${formatVND(numericAmount)}đ` : "Nhập số tiền"}
        </button>
      </div>
    </div>
  );
}

function MethodIcon({ id, color }: { id: string; color: string }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none" };
  if (id === "bank") return (
    <svg {...p}><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  if (id === "qr") return (
    <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/><rect x="5" y="5" width="3" height="3" fill={color}/><rect x="16" y="5" width="3" height="3" fill={color}/><rect x="5" y="16" width="3" height="3" fill={color}/></svg>
  );
  if (id === "phone") return (
    <svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  return null;
}
