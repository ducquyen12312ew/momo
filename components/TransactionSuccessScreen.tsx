"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";

interface TransactionSuccessScreenProps {
  onBack: () => void;
  amount: string;
  txTime: Date;
  txId: string;
}

function formatTime(d: Date): string {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const yy = d.getFullYear();
  return `${hh}:${mm} - ${dd}/${mo}/${yy}`;
}

export default function TransactionSuccessScreen({
  onBack,
  amount,
  txTime,
  txId,
}: TransactionSuccessScreenProps) {
  const [processOpen, setProcessOpen] = useState(true);
  const [spendToggle, setSpendToggle] = useState(true);
  const negAmount = `-${amount}`;

  return (
    <div className="min-h-screen flex flex-col animate-screenIn" style={{ background: "#F5F5F5" }}>

      {/* ── Header ── */}
      <div className="flex-shrink-0" style={{ background: "linear-gradient(180deg,#F8DCE8 0%,#FDF0F5 100%)" }}>
        <div className="flex items-center justify-between px-4 pt-3 mb-3">
          <span className="text-[15px] font-bold text-[#222]">00:02</span>
          <div className="flex items-center gap-[5px]"><SignalBars /><WifiIcon /><BatteryIcon /></div>
        </div>
        <div className="flex items-center justify-between px-4 pb-4">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center active:bg-white/90">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[17px] font-bold text-[#222]">Chi Tiết Giao Dịch</span>
          <button className="h-9 px-2.5 rounded-full bg-white/70 flex items-center gap-1.5 active:bg-white/90">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#555" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#555" strokeWidth="2" strokeLinecap="round"/></svg>
            <div className="w-px h-4 bg-[#CCC]" />
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" stroke="#555" strokeWidth="2" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-3" style={{ WebkitOverflowScrolling: "touch", paddingBottom: 120 }}>

        {/* ── Main transaction card ── */}
        <div
          className="bg-white rounded-3xl overflow-hidden relative"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1.5px solid #E8F5E9" }}
        >
          {/* Subtle watermark pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 358 160" preserveAspectRatio="xMidYMid slice">
            <circle cx="280" cy="80" r="80" fill="#EC407A"/>
            <circle cx="70" cy="130" r="60" fill="#EC407A"/>
          </svg>

          <div className="relative z-10 flex items-start gap-4 p-5">
            <div className="w-14 h-14 flex-shrink-0">
              <SafeImage src="/image/vay.png" alt="Vay Nhanh" width={56} height={56} className="w-14 h-14 object-contain" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#999] uppercase tracking-wide mb-1">
                Thanh toán vay nhanh
              </p>
              <p className="text-[30px] font-black text-[#111] leading-tight tracking-tight">
                {negAmount}
              </p>
            </div>
          </div>
        </div>

        {/* ── Main info card ── */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>

          {/* Success box */}
          <div className="mx-4 mt-4 rounded-2xl px-4 py-3 flex items-center gap-2.5" style={{ background: "#EEF6FF", border: "1px solid #B7D7FF" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10" stroke="#1976D2" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-[13px] text-[#1565C0] font-medium">Giao dịch thành công.</span>
          </div>

          {/* Status */}
          <InfoRow
            label="Trạng thái"
            value={
              <span className="text-[12px] font-bold px-3 py-1 rounded-full" style={{ background: "#E8F5E9", color: "#2E7D32" }}>
                Thành công
              </span>
            }
          />
          <Divider />

          {/* Time */}
          <InfoRow label="Thời gian" value={<span className="text-[14px] font-semibold text-[#111]">{formatTime(txTime)}</span>} />
          <Divider />

          {/* Quá trình giao dịch toggle */}
          <button
            onClick={() => setProcessOpen((p) => !p)}
            className="flex items-center justify-between w-full px-5 py-4"
          >
            <span className="text-[15px] font-bold text-[#222]">Quá trình giao dịch</span>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              style={{ transform: processOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
            >
              <path d="M6 9l6 6 6-6" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {processOpen && (
            <>
              <div className="mx-5 border-t border-dashed border-[#EEEEEE]" />

              {/* Mã giao dịch */}
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-[13.5px] text-[#777]">Mã giao dịch</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-semibold text-[#111]">{txId}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="#EC407A" strokeWidth="1.8"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#EC407A" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <Divider />

              {/* Tài khoản/thẻ */}
              <InfoRow label="Tài khoản/thẻ" value={<span className="text-[13.5px] font-bold text-[#111]">Ngân hàng liên kết</span>} />
              <Divider />

              {/* Tổng phí */}
              <InfoRow label="Tổng phí" value={<span className="text-[13.5px] font-bold text-[#111]">Miễn phí</span>} />
              <Divider />

              {/* Danh mục */}
              <div className="flex items-center justify-between px-5 py-3.5 mb-1">
                <span className="text-[13.5px] text-[#777]">Danh mục</span>
                <div className="flex items-center gap-1 rounded-full px-3 py-1.5 border" style={{ borderColor: "#FFAAC8", background: "#FFF0F7" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#EC407A" strokeWidth="2"/>
                    <path d="M12 8v4M12 16h.01" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[12px] font-semibold" style={{ color: "#EC407A" }}>Chưa phân loại</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="#EC407A" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Contract info card ── */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[13.5px] text-[#777]">Số hợp đồng/mã khoản vay</span>
            <span className="text-[13.5px] font-bold text-[#111]">MC14867545871</span>
          </div>
          <Divider />
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[13.5px] text-[#777]">Tên khách hàng</span>
            <span className="text-[14px] font-bold text-[#111]">Phan Duc Quyen</span>
          </div>
        </div>

        {/* ── Quản lý chi tiêu card ── */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          {/* Header */}
          <button className="flex items-center justify-between w-full px-5 py-4 active:bg-[#FFF5F8]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                <SafeImage src="/image/chitieu.png" alt="Chi tiêu" width={36} height={36} className="w-9 h-9 object-contain" />
              </div>
              <span className="text-[15px] font-bold text-[#222]">Quản lý chi tiêu</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#EC407A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Divider />

          {/* Tính vào chi tiêu */}
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[14px] text-[#555]">Tính vào chi tiêu</span>
            <button
              onClick={() => setSpendToggle((p) => !p)}
              className="w-12 h-7 rounded-full flex items-center transition-all duration-200 px-1"
              style={{ background: spendToggle ? "#4CAF50" : "#DDDDDD" }}
            >
              <div
                className="w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
                style={{ transform: spendToggle ? "translateX(20px)" : "translateX(0)" }}
              />
            </button>
          </div>
          <Divider />

          {/* Số tiền ghi nhận */}
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[14px] text-[#555]">Số tiền ghi nhận</span>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-[#111]">{negAmount}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <Divider />

          {/* Tần suất */}
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[14px] text-[#555]">Tần suất</span>
            <div className="flex items-center gap-1">
              <span className="text-[14px] font-semibold text-[#111]">Không lặp lại</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <Divider />

          {/* Ghi chú */}
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[14px] text-[#555]">Ghi chú</span>
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-[#BBBBBB]">Nhập nội dung</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* ── Fixed bottom ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#EEEEEE] px-4 pt-3"
        style={{ boxShadow: "0 -2px 10px rgba(0,0,0,0.05)", paddingBottom: "max(env(safe-area-inset-bottom,0px),16px)" }}
      >
        <div className="grid grid-cols-2 gap-3">
          <button className="h-[52px] rounded-2xl font-bold text-[15px] border-2 border-[#E0E0E0] bg-white text-[#555] active:bg-[#F5F5F5]">
            Liên hệ CSKH
          </button>
          <button
            className="h-[52px] rounded-2xl font-bold text-[15px] text-white active:opacity-90"
            style={{ background: "#EC407A", boxShadow: "0 4px 14px rgba(236,64,122,0.35)" }}
          >
            Khám phá ưu đãi
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-[13.5px] text-[#777]">{label}</span>
      {value}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[#F5F5F5] mx-5" />;
}

function SignalBars() {
  return (<svg width="18" height="13" viewBox="0 0 18 13"><rect x="0" y="9" width="3.5" height="4" rx="0.5" fill="#333"/><rect x="4.8" y="6" width="3.5" height="7" rx="0.5" fill="#333"/><rect x="9.6" y="3" width="3.5" height="10" rx="0.5" fill="#333"/><rect x="14.5" y="0" width="3.5" height="13" rx="0.5" fill="#333"/></svg>);
}
function WifiIcon() {
  return (<svg width="16" height="13" viewBox="0 0 20 16" fill="none"><circle cx="10" cy="14" r="1.8" fill="#333"/><path d="M6.5 11C7.5 10 8.7 9.4 10 9.4s2.5.6 3.5 1.6" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/><path d="M3.5 8C5.2 6.3 7.5 5.3 10 5.3s4.8 1 6.5 2.7" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/><path d="M0.5 5C3 2.5 6.3 1 10 1s7 1.5 9.5 4" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/></svg>);
}
function BatteryIcon() {
  return (<svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="23" height="12" rx="2.5" stroke="#333" strokeWidth="1.2"/><rect x="2" y="2" width="18" height="9" rx="1.5" fill="#4CAF50"/><path d="M24.5 4.5v4" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/></svg>);
}
