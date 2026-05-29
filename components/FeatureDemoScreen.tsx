"use client";

interface FeatureDemoScreenProps {
  title: string;
  onBack: () => void;
  description?: string;
}

export default function FeatureDemoScreen({ title, onBack, description }: FeatureDemoScreenProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col animate-slideUp">
      {/* Header */}
      <div className="bg-white flex-shrink-0" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-3 px-4 pt-14 pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center active:bg-[#EEEEEE] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-[18px] font-bold text-[#222]">{title}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Animated icon */}
        <div className="w-24 h-24 rounded-full bg-[#FCE4EC] flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-[#FCE4EC] animate-ping opacity-30" />
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12l10 5 10-5" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="text-[22px] font-bold text-[#222] mb-3">Tính năng đang phát triển</h2>
        <p className="text-[14px] text-[#777] leading-relaxed mb-2">
          {description ?? `${title} sẽ sớm ra mắt với nhiều tính năng hấp dẫn.`}
        </p>
        <p className="text-[13px] text-[#AAAAAA]">Cảm ơn bạn đã quan tâm!</p>

        <div className="mt-10 bg-white rounded-3xl p-5 w-full" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <p className="text-[13px] font-semibold text-[#333] mb-4">Nhận thông báo khi ra mắt</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Số điện thoại của bạn"
              className="flex-1 bg-[#F5F5F5] rounded-2xl px-4 py-3 text-[13px] text-[#333] outline-none placeholder:text-[#AAAAAA]"
            />
            <button className="px-5 py-3 bg-[#EC407A] rounded-2xl text-white text-[13px] font-bold active:bg-[#D81B60] transition-colors">
              Đăng ký
            </button>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-6 px-8 py-3.5 rounded-2xl bg-white border border-[#EEEEEE] text-[14px] font-semibold text-[#555] active:bg-[#F5F5F5] transition-colors"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
}
