"use client";
import SafeImage from "./SafeImage";
import { usePayment, Transaction } from "@/contexts/PaymentContext";

interface HistoryScreenProps {
  onBack: () => void;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const yy = d.getFullYear();
  return `${hh}:${mm} · ${dd}/${mo}/${yy}`;
}

export default function HistoryScreen({ onBack }: HistoryScreenProps) {
  const { transactions } = usePayment();

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-screenIn">

      {/* Header */}
      <div className="bg-white flex-shrink-0" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-3 px-4 pt-12 pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center active:bg-[#EEEEEE]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-[18px] font-bold text-[#222]">Lịch sử GD</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
        {transactions.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="px-4 pt-4 pb-8 space-y-0">
            {/* Date group header */}
            <p className="text-[12px] font-semibold text-[#AAAAAA] uppercase mb-2 px-1">
              Gần đây
            </p>
            <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              {transactions.map((tx, idx) => (
                <div key={tx.id}>
                  <TxItem tx={tx} />
                  {idx < transactions.length - 1 && (
                    <div className="h-px bg-[#F5F5F5] ml-[72px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TxItem({ tx }: { tx: Transaction }) {
  return (
    <div className="flex items-center gap-3 px-4 py-4">
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-[#FCE4EC] flex items-center justify-center flex-shrink-0">
        <SafeImage src={tx.icon} alt={tx.type} width={32} height={32} className="w-8 h-8 object-contain" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[#222] truncate">{tx.type}</p>
        <p className="text-[12px] text-[#AAAAAA] mt-0.5">{formatTime(tx.time)}</p>
      </div>

      {/* Right side */}
      <div className="text-right flex-shrink-0">
        <p className="text-[15px] font-bold text-[#E53935]">{tx.amount}</p>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "#E8F5E9", color: "#2E7D32" }}
        >
          Thành công
        </span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center pt-24 px-8">
      {/* Illustration */}
      <div className="w-20 h-20 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-5">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <polyline points="12 8 12 12 14 14" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="text-[16px] font-bold text-[#555] mb-2">Chưa có giao dịch</p>
      <p className="text-[13px] text-[#AAAAAA] text-center leading-relaxed">
        Các giao dịch của bạn sẽ xuất hiện ở đây sau khi hoàn tất thanh toán.
      </p>
    </div>
  );
}
