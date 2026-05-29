import SafeImage from "./SafeImage";
import { QUICK_ACTIONS } from "@/constants";

interface QuickActionsProps {
  onReceiveClick?: () => void;
}

const ACTION_STYLES: Record<string, { bg: string; shadow: string }> = {
  deposit:  { bg: "linear-gradient(135deg, #FF8A65, #E64A19)", shadow: "rgba(230,74,25,0.3)" },
  receive:  { bg: "linear-gradient(135deg, #66BB6A, #2E7D32)", shadow: "rgba(46,125,50,0.3)" },
  qr:       { bg: "linear-gradient(135deg, #42A5F5, #1565C0)", shadow: "rgba(21,101,192,0.3)" },
  wallet:   { bg: "linear-gradient(135deg, #AB47BC, #6A1B9A)", shadow: "rgba(106,27,154,0.3)" },
};

export default function QuickActions({ onReceiveClick }: QuickActionsProps) {
  return (
    <div className="px-3 pt-4 pb-2">
      <div className="grid grid-cols-4 gap-1">
        {QUICK_ACTIONS.map((action) => {
          const style = ACTION_STYLES[action.id] ?? { bg: "linear-gradient(135deg, #EC407A, #C2185B)", shadow: "rgba(236,64,122,0.3)" };
          return (
            <button
              key={action.id}
              onClick={action.id === "receive" ? onReceiveClick : undefined}
              className="flex flex-col items-center gap-2 py-2 px-1 active:scale-95 transition-transform"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: style.bg,
                  boxShadow: `0 6px 16px ${style.shadow}`,
                }}
              >
                <SafeImage
                  src={action.icon}
                  alt={action.label}
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <span className="text-[11px] text-[#444] font-semibold text-center leading-tight">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
