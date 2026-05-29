"use client";
import SafeImage from "./SafeImage";
import { usePayment, Transaction } from "@/contexts/PaymentContext";

interface HistoryScreenProps {
  onBack: () => void;
  onViewTransaction: (tx: Transaction) => void;
}

const MONTH_LABELS: Record<number, string> = {
  1: "Tháng 1", 2: "Tháng 2", 3: "Tháng 3", 4: "Tháng 4",
  5: "Tháng 5", 6: "Tháng 6", 7: "Tháng 7", 8: "Tháng 8",
  9: "Tháng 9", 10: "Tháng 10", 11: "Tháng 11", 12: "Tháng 12",
};

function monthKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
}

function monthLabel(iso: string): string {
  const d = new Date(iso);
  return `${MONTH_LABELS[d.getMonth() + 1]} ${d.getFullYear()}`;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")} · ${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
}

function groupByMonth(txs: Transaction[]): { key: string; label: string; items: Transaction[] }[] {
  const map = new Map<string, { label: string; items: Transaction[] }>();
  for (const tx of txs) {
    const k = monthKey(tx.time);
    if (!map.has(k)) {
      map.set(k, { label: monthLabel(tx.time), items: [] });
    }
    map.get(k)!.items.push(tx);
  }
  return Array.from(map.entries()).map(([key, val]) => ({ key, ...val }));
}

export default function HistoryScreen({ onBack, onViewTransaction }: HistoryScreenProps) {
  const { transactions } = usePayment();
  const groups = groupByMonth(transactions);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp" style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div className="bg-white flex-shrink-0" style={{ boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-3 px-4 pt-12 pb-4">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center active:bg-[#EEEEEE]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[18px] font-bold text-[#222]">Lịch sử GD</span>
          <div className="flex-1" />
          <button className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center active:bg-[#EEEEEE]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <line x1="4" y1="6" x2="20" y2="6" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
              <line x1="7" y1="12" x2="17" y2="12" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
              <line x1="10" y1="18" x2="14" y2="18" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling:"touch" }}>
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 px-8">
            <div className="w-16 h-16 rounded-full bg-[#FCE4EC] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <polyline points="12 8 12 12 14 14" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[16px] font-bold text-[#333]">Chưa có giao dịch</p>
            <p className="text-[13px] text-[#AAAAAA] text-center">Các giao dịch của bạn sẽ hiển thị ở đây</p>
          </div>
        ) : (
          <div className="px-4 pt-4 pb-8 space-y-5">
            {groups.map((group) => (
              <div key={group.key}>
                {/* Month separator */}
                <div className="flex items-center gap-3 mb-2 px-1">
                  <div className="h-px flex-1 bg-[#E8E8E8]" />
                  <span className="text-[11px] font-bold text-[#BBBBBB] uppercase tracking-wider">{group.label}</span>
                  <div className="h-px flex-1 bg-[#E8E8E8]" />
                </div>

                {/* Transactions for this month */}
                <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
                  {group.items.map((tx, idx) => (
                    <div key={tx.id}>
                      <button
                        onClick={() => onViewTransaction(tx)}
                        className="flex items-center gap-3 px-4 py-4 w-full text-left active:bg-[#FFF5F8] transition-colors"
                      >
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          tx.isReceive ? "bg-[#F0FFF4]" : "bg-[#FCE4EC]"
                        }`}>
                          <SafeImage src={tx.icon} alt={tx.type} width={32} height={32} className="w-8 h-8 object-contain rounded-xl"/>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold text-[#222] truncate">{tx.type}</p>
                          <p className="text-[12px] text-[#AAAAAA] mt-0.5">{formatTime(tx.time)}</p>
                        </div>

                        {/* Amount + status */}
                        <div className="text-right flex-shrink-0">
                          <p className={`text-[15px] font-bold ${
                            tx.isReceive ? "text-[#22C55E]" : "text-[#E53935]"
                          }`}>
                            {tx.amount}
                          </p>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{
                            background: tx.isReceive ? "#F0FFF4" : "#E8F5E9",
                            color: tx.isReceive ? "#22C55E" : "#2E7D32",
                          }}>
                            Thành công
                          </span>
                        </div>
                      </button>
                      {idx < group.items.length - 1 && <div className="h-px bg-[#F5F5F5] ml-[72px]"/>}
                    </div>
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
