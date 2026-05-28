import SafeImage from "./SafeImage";
import { SERVICES } from "@/constants";

export default function ServiceGrid() {
  return (
    <div className="px-3 py-2">
      <div className="grid grid-cols-4 gap-x-1 gap-y-4">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
          >
            <div className="relative">
              {/* Icon: 44px (was 52px) */}
              <div className="w-11 h-11 rounded-2xl overflow-hidden flex items-center justify-center bg-[#F5F5F5]">
                <SafeImage
                  src={service.icon}
                  alt={service.label}
                  width={44}
                  height={44}
                  className="w-11 h-11 object-cover"
                />
              </div>
              {service.badge && (
                <span className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {service.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#555] text-center leading-tight line-clamp-2 w-full px-0.5">
              {service.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
