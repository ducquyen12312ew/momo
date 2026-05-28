"use client";

interface LoanDetailScreenProps {
  onBack: () => void;
}

interface Installment {
  period: number;
  date: string;
  amount: string;
  rawAmount: number;
  status: "paid" | "overdue";
}

const INSTALLMENTS: Installment[] = [
  { period: 1, date: "03/06/2025", amount: "0đ", rawAmount: 0, status: "paid" },
  { period: 2, date: "03/07/2025", amount: "0đ", rawAmount: 0, status: "paid" },
  { period: 3, date: "03/08/2025", amount: "0đ", rawAmount: 0, status: "paid" },
  { period: 4, date: "03/09/2025", amount: "0đ", rawAmount: 0, status: "paid" },
  { period: 5, date: "03/10/2025", amount: "0đ", rawAmount: 0, status: "paid" },
  { period: 6, date: "03/11/2025", amount: "0đ", rawAmount: 0, status: "paid" },
  { period: 7, date: "03/12/2025", amount: "0đ", rawAmount: 0, status: "paid" },
  { period: 8, date: "03/01/2026", amount: "0đ", rawAmount: 0, status: "paid" },
  { period: 9, date: "03/02/2026", amount: "3.683.000đ", rawAmount: 3683000, status: "overdue" },
];

export default function LoanDetailScreen({ onBack }: LoanDetailScreenProps) {
  return (
    <div className="min-h-screen flex flex-col animate-screenIn" style={{ background: "#F5F5F5" }}>
      {/* ── Header ── */}
      <div
        style={{ background: "linear-gradient(180deg, #F8DCE8 0%, #FDF0F5 100%)" }}
        className="px-4 pt-3 pb-0 flex-shrink-0"
      >
        {/* Status bar */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold text-[#222]">00:00</span>
          <div className="flex items-center gap-[5px]">
            <SignalBars />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center active:bg-white/90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className="text-[17px] font-bold text-[#222]">Thông tin khoản vay</span>

          <button className="h-9 px-2.5 rounded-full bg-white/70 flex items-center gap-1.5 active:bg-white/90">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#555" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="w-px h-4 bg-[#CCC]" />
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke="#555" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto pb-28 px-4 pt-5">
        {/* Title */}
        <h1 className="text-[22px] font-bold text-[#111] mb-4">Lịch thanh toán</h1>

        {/* Table card */}
        <div
          className="bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          {/* Table header */}
          <div className="grid grid-cols-[2fr_2.5fr_2fr] border-b border-[#F0F0F0] px-4 py-3">
            <span className="text-[12px] font-semibold text-[#888]">Kỳ hạn</span>
            <span className="text-[12px] font-semibold text-[#888] text-center">Số tiền phải trả</span>
            <span className="text-[12px] font-semibold text-[#888] text-right">Trạng thái</span>
          </div>

          {/* Rows */}
          {INSTALLMENTS.map((item, idx) => (
            <div key={item.period}>
              <div className="grid grid-cols-[2fr_2.5fr_2fr] items-center px-4 py-3.5">
                {/* Period + date */}
                <div>
                  <p className="text-[14px] font-semibold text-[#222]">Kỳ {item.period}</p>
                  <p className="text-[11.5px] text-[#999] mt-0.5">{item.date}</p>
                </div>

                {/* Amount + info icon */}
                <div className="flex items-center justify-center gap-1.5">
                  <span
                    className={`text-[14px] font-bold ${
                      item.status === "overdue" ? "text-[#E53935]" : "text-[#222]"
                    }`}
                  >
                    {item.amount}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" stroke="#EC407A" strokeWidth="1.8"/>
                    <path d="M12 8v4M12 16h.01" stroke="#EC407A" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>

                {/* Status badge */}
                <div className="flex justify-end">
                  {item.status === "paid" ? (
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "#E8F5E9", color: "#2E7D32" }}
                    >
                      Đã thanh toán
                    </span>
                  ) : (
                    <span
                      className="text-[11px] font-semibold px-3 py-1 rounded-full"
                      style={{ background: "#FFEBEE", color: "#C62828" }}
                    >
                      Quá hạn
                    </span>
                  )}
                </div>
              </div>

              {/* Row divider */}
              {idx < INSTALLMENTS.length - 1 && (
                <div className="h-px bg-[#F5F5F5] mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Fixed bottom buttons ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#EEEEEE] px-4 pt-3 pb-8"
        style={{ boxShadow: "0 -2px 10px rgba(0,0,0,0.04)" }}
      >
        <div className="grid grid-cols-2 gap-3">
          <button
            className="h-[54px] rounded-2xl font-bold text-[16px] text-[#555] border-2 border-[#E0E0E0] bg-white active:bg-[#F5F5F5] transition-colors"
          >
            Tất toán
          </button>
          <button
            className="h-[54px] rounded-2xl font-bold text-[16px] text-white active:bg-[#D81B60] transition-colors"
            style={{
              background: "#EC407A",
              boxShadow: "0 4px 14px rgba(236,64,122,0.35)",
            }}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Status bar icons ── */
function SignalBars() {
  return (
    <svg width="18" height="13" viewBox="0 0 18 13">
      <rect x="0" y="9" width="3.5" height="4" rx="0.5" fill="#333"/>
      <rect x="4.8" y="6" width="3.5" height="7" rx="0.5" fill="#333"/>
      <rect x="9.6" y="3" width="3.5" height="10" rx="0.5" fill="#333"/>
      <rect x="14.5" y="0" width="3.5" height="13" rx="0.5" fill="#333"/>
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg width="16" height="13" viewBox="0 0 20 16" fill="none">
      <circle cx="10" cy="14" r="1.8" fill="#333"/>
      <path d="M6.5 11C7.5 10 8.7 9.4 10 9.4s2.5.6 3.5 1.6" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3.5 8C5.2 6.3 7.5 5.3 10 5.3s4.8 1 6.5 2.7" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M0.5 5C3 2.5 6.3 1 10 1s7 1.5 9.5 4" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="23" height="12" rx="2.5" stroke="#333" strokeWidth="1.2"/>
      <rect x="2" y="2" width="18" height="9" rx="1.5" fill="#4CAF50"/>
      <path d="M24.5 4.5v4" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
