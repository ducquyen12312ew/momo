import SafeImage from "./SafeImage";
import { WALLET_ITEMS } from "@/constants";

export default function WalletCard() {
  return (
    <div className="px-4 py-2">
      <div
        className="rounded-[18px] bg-white border border-[#F0F0F0]"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      >
        <div className="px-3 py-2">
          {WALLET_ITEMS.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  {/* Icon: 30px (was 32px) */}
                  <SafeImage
                    src={item.icon}
                    alt={item.name}
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-xl flex-shrink-0"
                  />
                  <div>
                    <div className="text-[13px] font-semibold text-[#333]">{item.name}</div>
                    <div className="text-[11.5px] text-[#AAAAAA] mt-0.5">{item.balance}</div>
                  </div>
                </div>
                <ChevronRight />
              </div>
              {index < WALLET_ITEMS.length - 1 && (
                <div className="h-px bg-[#F5F5F5] ml-10" />
              )}
            </div>
          ))}
        </div>

        <div className="h-px bg-[#F0F0F0] mx-3" />

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
