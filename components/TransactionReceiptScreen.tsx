"use client";
import SafeImage from "./SafeImage";
import { Transaction } from "@/contexts/PaymentContext";

interface Props {
  tx: Transaction;
  onBack: () => void;
}

function fmt(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")} - ${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
}

export default function TransactionReceiptScreen({ tx, onBack }: Props) {
  return (
    <div className="min-h-screen flex flex-col animate-screenIn" style={{ background:"#F5F5F5" }}>
      {/* Header */}
      <div className="flex-shrink-0" style={{ background:"linear-gradient(180deg,#F8DCE8 0%,#FDF0F5 100%)" }}>
        <div className="flex items-center justify-between px-4 pt-3 mb-3">
          <span className="text-[15px] font-bold text-[#222]">
            {String(new Date(tx.time).getHours()).padStart(2,"0")}:{String(new Date(tx.time).getMinutes()).padStart(2,"0")}
          </span>
          <div className="flex items-center gap-[5px]"><SBars/><SWifi/><SBatt/></div>
        </div>
        <div className="flex items-center justify-between px-4 pb-4">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center active:bg-white/90">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[17px] font-bold text-[#222]">Chi Tiết Giao Dịch</span>
          <div className="w-9"/>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-3 pb-10" style={{ WebkitOverflowScrolling:"touch" }}>
        {/* Main card */}
        <div className="bg-white rounded-3xl p-5 flex items-center gap-4" style={{ boxShadow:"0 2px 12px rgba(0,0,0,0.07)", border:"1.5px solid #E8F5E9" }}>
          <div className="w-14 h-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
            <SafeImage src={tx.icon} alt={tx.type} width={40} height={40} className="w-10 h-10 object-contain"/>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#999] uppercase tracking-wide mb-1">{tx.type}</p>
            <p className="text-[28px] font-bold text-[#111] leading-tight">{tx.amount}</p>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
          {/* Success box */}
          <div className="mx-4 mt-4 rounded-2xl px-4 py-3 flex items-center gap-2.5 mb-1" style={{ background:"#EEF6FF", border:"1px solid #B7D7FF" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10" stroke="#1976D2" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-[13px] text-[#1565C0] font-medium">Giao dịch thành công.</span>
          </div>

          <Row label="Trạng thái" value={
            <span className="text-[12px] font-bold px-3 py-1 rounded-full" style={{ background:"#E8F5E9", color:"#2E7D32" }}>Thành công</span>
          }/>
          <Hr/>
          <Row label="Thời gian" value={<span className="text-[13.5px] font-semibold text-[#111]">{fmt(tx.time)}</span>}/>
          <Hr/>
          <Row label="Mã giao dịch" value={<span className="text-[13.5px] font-semibold text-[#111]">{tx.id.replace("h","20260")}</span>}/>
          <Hr/>
          <Row label="Tài khoản/thẻ" value={<span className="text-[13.5px] font-bold text-[#111]">Ngân hàng liên kết</span>}/>
          <Hr/>
          <Row label="Tổng phí" value={<span className="text-[13.5px] font-bold text-[#111]">Miễn phí</span>}/>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-[13.5px] text-[#777]">{label}</span>
      {value}
    </div>
  );
}
function Hr() { return <div className="h-px bg-[#F5F5F5] mx-5"/>; }

function SBars() { return (<svg width="18" height="13" viewBox="0 0 18 13"><rect x="0" y="9" width="3.5" height="4" rx="0.5" fill="#333"/><rect x="4.8" y="6" width="3.5" height="7" rx="0.5" fill="#333"/><rect x="9.6" y="3" width="3.5" height="10" rx="0.5" fill="#333"/><rect x="14.5" y="0" width="3.5" height="13" rx="0.5" fill="#333"/></svg>); }
function SWifi() { return (<svg width="16" height="13" viewBox="0 0 20 16" fill="none"><circle cx="10" cy="14" r="1.8" fill="#333"/><path d="M6.5 11C7.5 10 8.7 9.4 10 9.4s2.5.6 3.5 1.6" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/><path d="M3.5 8C5.2 6.3 7.5 5.3 10 5.3s4.8 1 6.5 2.7" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/><path d="M0.5 5C3 2.5 6.3 1 10 1s7 1.5 9.5 4" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/></svg>); }
function SBatt() { return (<svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="23" height="12" rx="2.5" stroke="#333" strokeWidth="1.2"/><rect x="2" y="2" width="18" height="9" rx="1.5" fill="#4CAF50"/><path d="M24.5 4.5v4" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/></svg>); }
