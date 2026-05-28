"use client";
import { useState } from "react";
import SafeImage from "./SafeImage";
import { NAV_ITEMS } from "@/constants";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("qr");

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#EEEEEE] z-50"
      style={{
        boxShadow: "0 -2px 10px rgba(0,0,0,0.03)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}
    >
      <div className="flex items-end justify-around px-2 pt-2 pb-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center gap-1 -mt-5"
              >
                <div className="w-14 h-14 rounded-full bg-[#EC407A] flex items-center justify-center shadow-lg shadow-[#EC407A]/40">
                  <SafeImage
                    src={item.icon}
                    alt={item.label}
                    width={28}
                    height={28}
                    className="w-7 h-7"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: isActive ? "#EC407A" : "#BDBDBD" }}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center gap-1 relative py-0.5 px-3"
            >
              <div className="relative">
                <SafeImage
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  style={{
                    filter: isActive
                      ? "invert(30%) sepia(90%) saturate(700%) hue-rotate(305deg) brightness(90%)"
                      : "invert(80%) sepia(0%) saturate(0%) brightness(90%)",
                  }}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF3B30] rounded-full" />
                )}
              </div>
              <span
                className="text-[10px] font-medium"
                style={{ color: isActive ? "#EC407A" : "#BDBDBD" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
