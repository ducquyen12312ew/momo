import SafeImage from "./SafeImage";
import { QUICK_ACTIONS } from "@/constants";

interface QuickActionsProps {
  onReceiveClick?: () => void;
}

export default function QuickActions({ onReceiveClick }: QuickActionsProps) {
  return (
    <div className="px-2 pt-3 pb-1">
      <div className="grid grid-cols-4 gap-0.5">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={action.id === "receive" ? onReceiveClick : undefined}
            className="flex flex-col items-center gap-1.5 py-2 px-1 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#FCE4EC]">
              <SafeImage
                src={action.icon}
                alt={action.label}
                width={40}
                height={40}
                className="w-10 h-10 rounded-2xl"
              />
            </div>
            <span className="text-[11.5px] text-[#555] font-medium text-center leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
