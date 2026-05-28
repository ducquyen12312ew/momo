import SafeImage from "./SafeImage";
import { WALLET_ITEMS } from "@/constants";

export default function WalletCard() {
  return (
    <div className="px-4 py-2">
      <div
        className="rounded-[18px] bg-white border border-[#EEEEEE]"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      >
        <div className="px-3 py-3">
          {WALLET_ITEMS.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2.5">
                  <SafeImage
                    src={item.icon}
                    alt={item.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-xl"
                  />
                  <div>
                    <div className="text-[13px] font-semibold text-[#333333]">{item.name}</div>
                    <div className="text-[12px] text-[#999999] mt-0.5">{item.balance}</div>
                  </div>
                </div>
                <ChevronRight />
              </div>
              {index < WALLET_ITEMS.length - 1 && (
                <div className="h-px bg-[#EEEEEE] ml-10" />
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#EEEEEE] mx-3" />

        {/* Footer */}
        <button className="flex items-center justify-between w-full px-3 py-3 active:bg-gray-50 rounded-b-[18px]">
          <span className="text-[13px] font-semibold text-[#EC407A]">Trung Tâm Tài Chính</span>
          <ChevronRight color="#EC407A" />
        </button>
      </div>
    </div>
  );
}

function ChevronRight({ color = "#BBBBBB" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
