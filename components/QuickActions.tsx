import SafeImage from "./SafeImage";
import { QUICK_ACTIONS } from "@/constants";

export default function QuickActions() {
  return (
    <div className="px-2 pt-4 pb-2">
      <div className="grid grid-cols-4 gap-1">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            className="flex flex-col items-center gap-1.5 py-2 px-1 active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#FCE4EC]">
              <SafeImage
                src={action.icon}
                alt={action.label}
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="text-[12px] text-[#555555] font-medium text-center leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
