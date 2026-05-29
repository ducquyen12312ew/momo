import SafeImage from "./SafeImage";
import { SERVICES } from "@/constants";

interface ServiceGridProps {
  onServiceClick?: (id: string) => void;
}

// Subtle background tints per service for visual variety
const SERVICE_TINTS: Record<string, string> = {
  transfer:       "#FFF0F5",
  bill:           "#FFF8E1",
  topup:          "#E8F5E9",
  data:           "#E3F2FD",
  "travel-finance":"#EDE7F6",
  gold:           "#FFF8E1",
  paylater:       "#FCE4EC",
  loan:           "#FFF3E0",
  movie:          "#FFEBEE",
  toll:           "#E0F7FA",
  more:           "#F5F5F5",
};

export default function ServiceGrid({ onServiceClick }: ServiceGridProps) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-[#EC407A] rounded-full" />
          <span className="text-[14px] font-bold text-[#1A1A2E]">Dịch vụ</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-2 gap-y-5">
        {SERVICES.map((service) => {
          const tint = SERVICE_TINTS[service.id] ?? "#F5F5F5";
          return (
            <button
              key={service.id}
              onClick={() => onServiceClick?.(service.id)}
              className="flex flex-col items-center gap-2 active:scale-90 transition-transform"
            >
              <div className="relative">
                <div
                  className="w-[52px] h-[52px] rounded-[16px] overflow-hidden flex items-center justify-center"
                  style={{ background: tint, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                >
                  <SafeImage
                    src={service.icon}
                    alt={service.label}
                    width={52}
                    height={52}
                    className="w-[52px] h-[52px] object-cover"
                  />
                </div>
                {service.badge && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FF3B30] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full leading-none shadow-sm">
                    {service.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#444] text-center leading-tight line-clamp-2 w-full px-0.5 font-medium">
                {service.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
