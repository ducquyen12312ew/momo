import SafeImage from "./SafeImage";
import { QUICK_ACTIONS } from "@/constants";

interface QuickActionsProps {
  onReceiveClick?: () => void;
}

const ACTION_STYLES: Record<string, { bg: string; shadow: string; label: string }> = {
  deposit:  { bg: "linear-gradient(145deg, #FF8A65 0%, #E64A19 100%)", shadow: "rgba(230,74,25,0.28)", label: "Nạp/Rút" },
  receive:  { bg: "linear-gradient(145deg, #66BB6A 0%, #2E7D32 100%)", shadow: "rgba(46,125,50,0.28)", label: "Nhận tiền" },
  qr:       { bg: "linear-gradient(145deg, #42A5F5 0%, #1565C0 100%)", shadow: "rgba(21,101,192,0.28)", label: "QR Thanh toán" },
  wallet:   { bg: "linear-gradient(145deg, #AB47BC 0%, #6A1B9A 100%)", shadow: "rgba(106,27,154,0.28)", label: "Ví tiện ích" },
};

export default function QuickActions({ onReceiveClick }: QuickActionsProps) {
  return (
    <div className="px-4 pt-4 pb-2">
      <div className="grid grid-cols-4 gap-1">
        {QUICK_ACTIONS.map((action) => {
          const style = ACTION_STYLES[action.id] ?? {
            bg: "linear-gradient(145deg, #EC407A, #C2185B)",
            shadow: "rgba(236,64,122,0.28)",
            label: action.label,
          };
          return (
            <button
              key={action.id}
              onClick={action.id === "receive" ? onReceiveClick : undefined}
              className="flex flex-col items-center gap-2 py-2 px-1 active:scale-90 transition-transform"
            >
              {/* Icon container */}
              <div
                className="w-[52px] h-[52px] rounded-[18px] flex items-center justify-center"
                style={{
                  background: style.bg,
                  boxShadow: `0 6px 18px ${style.shadow}, 0 2px 6px rgba(0,0,0,0.08)`,
                }}
              >
                <SafeImage
                  src={action.icon}
                  alt={action.label}
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] object-contain"
                />
              </div>
              <span className="text-[11px] text-[#444] font-semibold text-center leading-tight">
                {style.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
