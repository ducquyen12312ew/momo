"use client";
import SafeImage from "./SafeImage";

interface LoanScreenProps {
  onBack: () => void;
}

export default function LoanScreen({ onBack }: LoanScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col animate-screenIn">
      {/* ── Header ── */}
      <div className="bg-[#F8DCE8] px-4 pt-3 pb-0">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold text-[#222222]">23:59</span>
          <div className="flex items-center gap-[5px]">
            <SignalBars />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Nav bar */}
        <div className="flex items-center justify-between pb-4">
          {/* Back */}
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center active:bg-white/90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Title */}
          <span className="text-[17px] font-bold text-[#222222]">Vay Nhanh</span>

          {/* Right icons */}
          <div className="flex items-center gap-1.5">
            <button className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center active:bg-white/90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="h-9 px-2.5 rounded-full bg-white/70 flex items-center gap-1.5 active:bg-white/90">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#555" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="w-px h-4 bg-[#CCCCCC]" />
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9 22 9 12 15 12 15 22" stroke="#555" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 bg-white flex flex-col items-center px-6 pt-8 pb-36">
        {/* Mascot */}
        <div className="mb-6">
          <SafeImage
            src="/image/momo.png"
            alt="MoMo Mascot"
            width={140}
            height={140}
            className="w-[140px] h-[140px] object-contain"
          />
        </div>

        {/* Headline */}
        <h1 className="text-[24px] font-bold text-[#222222] text-center leading-snug mb-8 px-2">
          Vay tiền dễ dàng, nhanh chóng qua Vay Nhanh
        </h1>

        {/* Benefits */}
        <div className="w-full">
          <BenefitRow
            icon="/image/benefit-interest.svg"
            text="Lãi suất chỉ từ 1%/tháng"
            showDivider
          />
          <BenefitRow
            icon="/image/benefit-calendar.svg"
            text="Thời gian trả góp lên đến 48 tháng"
            showDivider
          />
          <BenefitRow
            icon="/image/benefit-fast.svg"
            text="Chỉ 1 phút phê duyệt"
            showDivider={false}
          />
        </div>
      </div>

      {/* ── Footer disclaimer ── */}
      <div className="bg-white px-8 pt-2 pb-28">
        <p className="text-[12px] text-[#AAAAAA] text-center leading-relaxed">
          Vay Nhanh được cung cấp và chịu trách nhiệm bởi các đối tác tài chính của MoMo, trên nền tảng ứng dụng MoMo
        </p>
      </div>

      {/* ── Fixed CTA button ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white px-4 pb-8 pt-3 border-t border-[#F5F5F5]"
      >
        <button
          className="w-full h-[58px] bg-[#EC407A] rounded-2xl text-white text-[17px] font-bold tracking-wide active:bg-[#D81B60] transition-colors"
          style={{ boxShadow: "0 6px 20px rgba(236,64,122,0.35)" }}
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
}

function BenefitRow({
  icon,
  text,
  showDivider,
}: {
  icon: string;
  text: string;
  showDivider: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-4 py-4">
        <SafeImage
          src={icon}
          alt={text}
          width={44}
          height={44}
          className="w-11 h-11 flex-shrink-0"
        />
        <span className="text-[16px] font-semibold text-[#333333]">{text}</span>
      </div>
      {showDivider && <div className="h-px bg-[#F0F0F0] ml-[60px]" />}
    </div>
  );
}

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
