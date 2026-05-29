"use client";
import SafeImage from "./SafeImage";
import { usePayment, Transaction } from "@/contexts/PaymentContext";

interface HistoryScreenProps {
  onBack: () => void;
  onViewTransaction: (tx: Transaction) => void;
}

const MONTH_LABELS: Record<number, string> = {
  1:"Tháng 1",2:"Tháng 2",3:"Tháng 3",4:"Tháng 4",
  5:"Tháng 5",6:"Tháng 6",7:"Tháng 7",8:"Tháng 8",
  9:"Tháng 9",10:"Tháng 10",11:"Tháng 11",12:"Tháng 12",
};

function monthKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()+1}`;
}
function monthLabel(iso: string) {
  const d = new Date(iso);
  return `${MONTH_LABELS[d.getMonth()+1]} ${d.getFullYear()}`;
}
function formatTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")} · ${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
}
function groupByMonth(txs: Transaction[]) {
  const map = new Map<string, { label: string; items: Transaction[] }>();
  for (const tx of txs) {
    const k = monthKey(tx.time);
    if (!map.has(k)) map.set(k, { label: monthLabel(tx.time), items: [] });
    map.get(k)!.items.push(tx);
  }
  return Array.from(map.entries()).map(([key, val]) => ({ key, ...val }));
}

export default function HistoryScreen({ onBack, onViewTransaction }: HistoryScreenProps) {
  const { transactions } = usePayment();
  const groups = groupByMonth(transactions);

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col animate-slideUp" style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        className="flex-shrink-0"
        style={{ background: "linear-gradient(150deg, #EC407A 0%, #C2185B 100%)" }}
      >
        <div className="flex items-center gap-3 px-4 pt-14 pb-5">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center active:bg-white/25">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-white">Lịch sử giao dịch</h1>
            <p className="text-[12px] text-white/70">{transactions.length} giao dịch</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center active:bg-white/25">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <line x1="4" y1="6" x2="20" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="7" y1="12" x2="17" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="10" y1="18" x2="14" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling:"touch" }}>
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 px-8">
            <div className="w-20 h-20 rounded-full bg-[#FCE4EC] flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <polyline points="12 8 12 12 14 14" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[17px] font-bold text-[#1A1A2E]">Chưa có giao dịch</p>
            <p className="text-[13px] text-[#AAAAAA] text-center leading-relaxed">Các giao dịch của bạn sẽ xuất hiện ở đây sau khi thực hiện</p>
          </div>
        ) : (
          <div className="px-4 pt-5 pb-6 space-y-5">
            {groups.map((group) => (
              <div key={group.key}>
                {/* Month separator */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px flex-1 bg-[#E4E4E4]" />
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#EC407A" strokeWidth="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[11px] font-bold text-[#EC407A] uppercase tracking-wide">{group.label}</span>
                  </div>
                  <div className="h-px flex-1 bg-[#E4E4E4]" />
                </div>

                {/* Transaction cards */}
                <div className="space-y-2">
                  {group.items.map((tx) => (
                    <button
                      key={tx.id}
                      onClick={() => onViewTransaction(tx)}
                      className="w-full flex items-center gap-3.5 p-4 bg-white rounded-3xl text-left active:scale-[0.98] transition-all"
                      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                    >
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                        style={{ background: tx.isReceive ? "#F0FFF4" : tx.isLoan ? "#FFF3E0" : "#FCE4EC" }}
                      >
                        <SafeImage src={tx.icon} alt={tx.type} width={32} height={32} className="w-8 h-8 object-contain rounded-xl"/>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-[#1A1A2E] truncate">{tx.type}</p>
                        <p className="text-[11.5px] text-[#AAAAAA] mt-0.5">{formatTime(tx.time)}</p>
                      </div>

                      {/* Amount + badge */}
                      <div className="text-right flex-shrink-0">
                        <p className={`text-[15px] font-black ${
                          tx.isReceive ? "text-[#22C55E]" : "text-[#E53935]"
                        }`}>
                          {tx.amount}
                        </p>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 inline-block"
                          style={{
                            background: tx.isReceive ? "#F0FFF4" : "#E8F5E9",
                            color: tx.isReceive ? "#22C55E" : "#2E7D32",
                          }}
                        >
                          Thành công
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
